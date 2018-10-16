import React, {Component} from 'react'
import {View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import DonationInfo from '../../components/dontaionInfo/DonationInfo'
import { Constants } from 'expo';
const window = Dimensions.get('window')

class Info extends Component {

    agreementHandler = () => {
        alert("Success")
        this.props.navigation.navigate('Main')
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={"light-content"}/>
                <ScrollView style={{flex:1}}>
                    <View style={styles.caption}>
                        <Text style={styles.containerTitle}>Полезная информация о донорстве крови</Text>
                    </View>
                    <DonationInfo
                                header={"ДОНОРСТВО КРОВИ:"}
                                paragraph={"это добровольная сдача своей крови или её" +
                    " компонентов для последующего переливания, нуждающимся больным, в ходе короткой несложной" +
                    " процедуры из вены у донора берут 450 мл цельной крови."}/>

                    <DonationInfo
                                header={"КТО МОЖЕТ СТАТЬ ДОНОРОМ?:"}
                                paragraph={"Стать донором может практически любой" +
                                " здоровый человек, если он старше 18 лет, не имеет противопоказаний к " +
                                "донорству, а его вес больше 50 кг"}/>

                    <DonationInfo
                                header={"КАК ПРАВИЛЬНО ПИТАТЬСЯ:"}
                                paragraph={"Перед сдачей крови умеренно позавтракайте: выпейте чашку сладкого " +
                                "чая с печеньем или сушками, можно с вареньем, или стакан сока, морса," +
                                " минеральной воды."}/>

                    <DonationInfo
                        header={"ДОНОРСТВО КРОВИ:"}
                        paragraph={"это добровольная сдача своей крови или её" +
                        " компонентов для последующего переливания, нуждающимся больным, в ходе короткой несложной" +
                        " процедуры из вены у донора берут 450 мл цельной крови."}/>

                    <DonationInfo
                        header={"КТО МОЖЕТ СТАТЬ ДОНОРОМ?:"}
                        paragraph={"Стать донором может практически любой" +
                        " здоровый человек, если он старше 18 лет, не имеет противопоказаний к " +
                        "донорству, а его вес больше 50 кг"}/>

                    <DonationInfo
                        header={"КАК ПРАВИЛЬНО ПИТАТЬСЯ:"}
                        paragraph={"Перед сдачей крови умеренно позавтракайте: выпейте чашку сладкого " +
                        "чая с печеньем или сушками, можно с вареньем, или стакан сока, морса," +
                        " минеральной воды."}/>

                    <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => this.agreementHandler()}>

                        <Text style={styles.buttonText}>Agree</Text>

                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

export default Info


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2cc7b8',
        paddingTop: Constants.statusBarHeight + 10,
    },
    caption: {
        alignItems: 'center'
    },
    containerTitle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '700',
        marginBottom: Constants.statusBarHeight + 5,
        width: '80%',
    },
    buttonContainer: {
        width: window.width - 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'rgba(43, 175, 199, 0.7)',
        paddingVertical:15,
        marginBottom: 10
    },

    buttonText: {
        textAlign: 'center',
        color: "#fff",
        fontWeight: '700',
    },

});
