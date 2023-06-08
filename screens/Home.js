import React, { Component } from 'react';
import { Text, View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity,
Image, ImageBackground} from 'react-native';
import { StretchInY } from 'react-native-reanimated';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.viewExterna}>
                <SafeAreaView style={styles.safeView} />
                <ImageBackground source={require("../assets/bg_image.png")} style={{flex: 1, resizeMode: 'cover'}}>
                    <View>
                        <Text>Site da Nasa</Text>
                        <TouchableOpacity style={styles.botao} onPress = {() => {
                            this.props.navigation.navigate("ISS");
                        }} >
                            <Text style={styles.textTitle} >ISS 🛰</Text>
                            <Text style={styles.textSaibaMais} >Saiba Mais</Text>
                            <Text style={styles.textNum} >1</Text>
                            <Image source={require("../assets/iss_icon.png")} style={styles.img} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botao} onPress = {() => {
                            this.props.navigation.navigate("Meteoro");
                        }} >
                            <Text style={styles.textTitle} >Meteoro ☄</Text>
                            <Text style={styles.textSaibaMais} >Saiba Mais</Text>
                            <Text style={styles.textNum} >2</Text>
                            <Image source={require("../assets/meteor_icon.png")} style={styles.img} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewExterna: {
        flex: 1
    },
    safeView: {
        marginTop: 5
    },
    viewTexto: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center",
    },
    botao: {
        flex: 0.25,
        margin: 50,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    textTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: "black",
        marginTop: 75,
        paddingLeft: 30,
    },
    textSaibaMais: {
        fontSize: 15,
        color: "red",
        paddingLeft: 30,
    },
    textNum: {
        position: 'absolute',
        color: "rgba(183, 183, 183, 0.5)",
        right: 20,
        bottom: -15,
        zIndex: -1,
        fontSize: 150,
    },
    img: {
        position: 'absolute',
        width: 200,
        height: 200,
        resizeMode: 'contain',
        right: 20,
        top: -80,
    }
})