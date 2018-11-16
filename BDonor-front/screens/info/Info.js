import React, {Component} from 'react'
import {View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image} from 'react-native'
import DonationInfo from '../../components/dontaionInfo/DonationInfo'
import { Constants } from 'expo';
import Swiper from 'react-native-swiper';

const window = Dimensions.get('window')

class Info extends Component {

    agreementHandler = () => {
 
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle={"light-content"}/>
                <Swiper style={styles.wrapper} showsButtons={true}>
                    <View style={styles.slide1}>
                        <Image source={require("../../assets/images/introSection/first2.png")}
                               style={{width: '100%', height: 300}} />
                        <Text style={styles.text}>Сдать кровь легко!</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Image source={require("../../assets/images/introSection/diary.png")}
                               style={{width: '100%', height: 350}} />
                        <Text style={styles.text}>Веди дневник донации</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Image source={require("../../assets/images/introSection/bonus.png")}
                               style={{width: '100%', height: 350}} />
                        <Text style={styles.text}>Получай бонусы</Text>
                    </View>
                    <View style={styles.slide4}>
                        <Image source={require("../../assets/images/introSection/last.png")}
                               style={{width: '100%', height: 400}} />
                        <Text style={styles.text} onPress={() => this.agreementHandler()}>Начать!</Text>
                    </View>
                </Swiper>
            </View>
        )
    }
}

export default Info



const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(244, 244, 255, 1.0)',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(231, 253, 255, 1.0)',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(213, 252, 253, 1.0)',
    },
    slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(246, 255, 255, 1.0)',
    },
    text: {
        color: '#2cc7b8',
        fontSize: 20,
        marginTop: 10,
        fontStyle: 'italic',
        fontWeight: 'bold',
    }
})