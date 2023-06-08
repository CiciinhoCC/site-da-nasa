import React, { Component } from 'react';
import { Text, View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity,
Image, ImageBackground, Alert, FlatList} from 'react-native';
import { StretchInY } from 'react-native-reanimated';
import axios from 'axios';

export default class MeteorScreen extends Component {
    constructor(){
        super()
        this.state = {
            meteors: {},
        }
    }


    componentDidMount(){
        this.pegarMeteoro();
    }

    pegarMeteoro = () => {
        axios.get('https://api.nasa.gov/neo/rest/v1/feed?api_key=QFSwHSQ9zvaejbzAcHKsk17bTzUOeXdX394JbTIv').then((api) => {
            this.setState({
                meteors: api.data.near_earth_objects
            })
        }).catch((erro) => {Alert.alert(erro.message)})
    }

    renderItem = ({item}) => {
        var bgImg, gif, size;

        if(item.score <= 30){
            bgImg = require("../assets/meteor_bg1.png");
            gif = require("../assets/meteor_speed1.gif");
            size = 100;
        }
        else if(item.score <= 75){
            bgImg = require("../assets/meteor_bg2.png");
            gif = require("../assets/meteor_speed2.gif");
            size = 150;
        }
        else{
            bgImg = require("../assets/meteor_bg3.png");
            gif = require("../assets/meteor_speed3.gif");
            size = 200;
        }
        return(
            <View>
                <ImageBackground source={bgImg} style={styles.backgroundImage}>
                    <View style={styles.gifContainer}>
                        <Image source={gif} style={{
                            length: size,
                            width: size,
                            alignSelf: 'center'
                        }}/>
                        <View>
                            <Text style={[styles.cardTitle,{marginTop: 400, marginLeft: 50}]}>{item.name}</Text>
                            <Text style={[styles.cardText,{marginTop: 20, marginLeft: 50}]}>Data mais próximo: {item.close_approach_data[0].close_approach_date_full}</Text>
                            <Text style={[styles.cardText,{marginTop: 10, marginLeft: 50}]}>Diâmetro: {item.estimated_diameter.kilometers.estimated_diameter_min} - {item.estimated_diameter.kilometers.estimated_diameter_max} km</Text>
                            <Text style={[styles.cardText,{marginTop: 20, marginLeft: 50}]}>Velocidade: {item.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</Text>
                            <Text style={[styles.cardText,{marginTop: 20, marginLeft: 50}]}>Distância: {item.close_approach_data[0].miss_distance.kilometers} km</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    render() {
        if(Object.keys(this.state.meteors).length === 0){
            return (
                <View style={styles.viewExterna}>
                    <SafeAreaView style={styles.safeView} />
                    <ImageBackground source={require("../assets/iss_bg.jpg")} style={{flex: 1, resizeMode: 'cover'}}>
                        <View>
                            <Text>Carregando...</Text>
                        </View>
                    </ImageBackground>
                </View>
            )
        }
        else{
            var meteoroMatriz = Object.keys(this.state.meteors).map((date) => {
                return(this.state.meteors[date])
            });
            var meteoros = [].concat.apply([],meteoroMatriz);
            meteoros.forEach(element => {
                var diametro = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max)/2;
                var score = (diametro*1000000000)/element.close_approach_data[0].miss_distance.kilometers;
                element.score = score;
            });
            meteoros.sort(function(a,b){
                return b.score - a.score
            })
            meteoros = meteoros.slice(0,5)
            return (
                <View style={styles.viewExterna}>
                    <SafeAreaView style={styles.safeView} />
                    <FlatList data = {meteoros} renderItem={this.renderItem} keyExtractor={(item,index) => {
                        index.toString();
                    }} horizontal={true}/>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    viewExterna: {
        flex: 1
    },
    safeView: {
        marginTop: 5
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white"
    },
    cardText: {
        color: "white"
    },
})