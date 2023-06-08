import React, { Component } from 'react';
import { Text, View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity,
Image, ImageBackground, Alert} from 'react-native';
import { StretchInY } from 'react-native-reanimated';
import MapView, {Marker} from 'react-native-maps'
import axios from 'axios';

export default class HomeScreen extends Component {
    constructor(){
        super();
        this.state = {
            local: {}
        }
    }

    componentDidMount(){
        this.pegarLocal();
    }

    pegarLocal = () => {
        axios.get('https://api.wheretheiss.at/v1/satellites/25544').then((api) => {
            this.setState({
                local: api.data
            })
        }).catch((erro) => {Alert.alert(erro.message)})
    }
    
    render() {
        if(this.state.local !== {}){    
            return (
                <View style={styles.viewExterna}>
                    <SafeAreaView style={styles.safeView} />
                    <ImageBackground source={require("../assets/iss_bg.jpg")} style={{flex: 1, resizeMode: 'cover'}}>
                        <View style={styles.mapaView}>
                            <MapView style = {styles.mapa} region={{
                                latitude: this.state.local.latitude,
                                longitude: this.state.local.longitude,
                                latitudeDelta: 100,
                                longitudeDelta: 100,
                            }}>
                                <Marker coordinate={{
                                latitude: this.state.local.latitude,
                                longitude: this.state.local.longitude,
                                }}>
                                    <Image src={require('../assets/iss_icon.png')} style = {{
                                        height: 50,
                                        width: 50,
                                    }}/>
                                </Marker>
                            </MapView>
                        </View>
                    </ImageBackground>
                </View>
            )
        }
        else {
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
    }
}

const styles = StyleSheet.create({
    viewExterna: {
        flex: 1
    },
    safeView: {
        marginTop: 5
    },
    mapa: {
        width: '100%',
        height: '100%'
    },
    mapaView: {
        flex: 0.6
    }
})