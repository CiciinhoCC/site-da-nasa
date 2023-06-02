import React, { Component } from 'react';
import { Text, View } from 'react-native';
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
                    <ImageBackground source={require("../assets/iss_bg.jpg")} style={{flex: 1, resizeMode: 'cover'}}>
                        <View>
                            <Text>Carregou</Text>
                        </View>
                    </ImageBackground>
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
        marginTop: Platform.OS === "android"? StatusBar.currentHeight : 0
    },
})