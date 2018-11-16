import React from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, RefreshControl, Switch, Image, ScrollView, TextInput } from 'react-native';
import firebase from "../firebase/FireBase";

export default class ProfileScreen extends React.Component {

    static navigationOptions = () => ({
        title: 'Profile',
        headerStyle: {
            backgroundColor: '#2cc7b8',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    })



    state = {
        user: '',
        donationAmount: 0,
        bonuses: 0,
        name: '',
        surname: '',
        city: '',
        age: '',
        email: '',
        weight: '',
        gender: '',
        refreshing: false,
    }


    componentDidMount = () => {
       // let userId = "wIp2lTPYPrbviCI5HSMSjCEfbN72"
     //   let user = "w@gmail.com";
        let userId = firebase.auth().currentUser.uid;
       let user = firebase.auth().currentUser.email;
        firebase
            .database()
            .ref('users')
            .orderByChild('userEmail')
            .equalTo(user)
            .once('value', snap => {
                if(snap.val()) {

                    userInfo = Object.keys(snap.val()).map(i => snap.val()[i])
                    this.setState({
                        name: userInfo[0].userName,
                        surname: userInfo[0].userSurname,
                        city: userInfo[0].userCity,
                        age: userInfo[0].userAge,
                        email: userInfo[0].userEmail ,
                        weight: userInfo[0].userWeight,
                        gender: userInfo[0].userGender,
                    })
                }
            });

        firebase
            .database()
            .ref('bonuses')
            .orderByChild('userId')
            .equalTo(userId)
            .once('value', snap => {
                if(snap.val()) {

                    bonuses = snap.val()[Object.keys(snap.val())[Object.keys(snap.val()).length - 1]].bonus
                    this.setState({
                        bonuses: bonuses,
                    })
                }
            });

        firebase
            .database()
            .ref('donations')
            .orderByChild('userId')
            .equalTo(userId)
            .once('value', snap => {
                if(snap.val()) {

                    aamount = Object.keys(snap.val()).length
                    this.setState({
                        donationAmount: aamount,
                    })
                }
            });
    }

    _onRefresh = () => {
        //let userId = "wIp2lTPYPrbviCI5HSMSjCEfbN72"
        //let user = "w@gmail.com";
        let userId = firebase.auth().currentUser.uid;
        let user = firebase.auth().currentUser.email;


        let userHistory = null
        this.setState({refreshing: true});
        firebase
            .database()
            .ref('users')
            .orderByChild('userEmail')
            .equalTo(user)
            .once('value', snap => {
                if(snap.val()) {

                    userInfo = Object.keys(snap.val()).map(i => snap.val()[i])
                    this.setState({
                        name: userInfo[0].userName,
                        surname: userInfo[0].userSurname,
                        city: userInfo[0].userCity,
                        age: userInfo[0].userAge,
                        email: userInfo[0].userEmail ,
                        weight: userInfo[0].userWeight,
                        gender: userInfo[0].userGender,
                    })
                }
            })

        firebase
            .database()
            .ref('bonuses')
            .orderByChild('userId')
            .equalTo(userId)
            .once('value', snap => {
                if(snap.val()) {

                    bonuses = snap.val()[Object.keys(snap.val())[Object.keys(snap.val()).length - 1]].bonus
                    this.setState({
                        bonuses: bonuses,
                    })
                }
            });

        firebase
            .database()
            .ref('donations')
            .orderByChild('userId')
            .equalTo(userId)
            .once('value', snap => {
                if(snap.val()) {

                    aamount = Object.keys(snap.val()).length
                    this.setState({
                        donationAmount: aamount,
                    })
                }
            }).then(() => {
            this.setState({refreshing: false});
        });
    }



    render() {
        console.log(this.state.user)
        console.log(this.state.bonuses, "bonus")
        console.log(this.state.donationAmount, "donations")

        return (
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}/>
            }>

                <View style={styles.userInfo}>
                    <View style={styles.doubleItem}>
                        <Text style={styles.leftDateHistory}>Name</Text>
                        <Text style={styles.rightDateHistory}>{this.state.name}</Text>
                    </View>
                    <View style={styles.doubleItem}>
                        <Text style={styles.leftDateHistory}>Surname</Text>
                        <Text style={styles.rightDateHistory}>{this.state.surname}</Text>
                    </View>
                    <View style={styles.doubleItem}>
                        <Text style={styles.leftDateHistory}>Email</Text>
                        <Text style={styles.rightDateHistory}>{this.state.email}</Text>
                    </View>
                    <View style={styles.doubleItem}>
                        <Text style={styles.leftDateHistory}>City</Text>
                        <Text style={styles.rightDateHistory}>{this.state.city}</Text>
                    </View>
                    <View style={styles.doubleItem}>
                        <Text style={styles.leftDateHistory}>Age</Text>
                        <Text style={styles.rightDateHistory}>{this.state.age}</Text>
                    </View>
                    <View style={styles.doubleItem}>
                        <Text style={styles.leftDateHistory}>Donation Amount</Text>
                        <Text style={styles.rightDateHistory}>{this.state.donationAmount}</Text>
                    </View>
                    <View style={styles.doubleItem}>
                        <Text style={styles.leftDateHistory}>Bonuses</Text>
                        <Text style={styles.rightDateHistory}>{this.state.bonuses}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    doubleItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15,
    },
    leftDateHistory:{
        width: '50%',
        fontWeight: "500",
        fontSize: 17,
        marginLeft: 10,
    },
    rightDateHistory:{
        marginLeft:'auto',
        fontWeight: "500",
        fontSize: 17,
        marginRight: 10,
        color: "#000000",
    },
});
