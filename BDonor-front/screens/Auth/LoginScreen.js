import React, {Component} from 'react'
import { Text, KeyboardAvoidingView, View, StyleSheet, Image, Alert}from 'react-native'
import logo from '../../assets/images/logo.png'
import LoginForm from '../../components/LoginForm/LoginForm'



class LoginScreen extends Component {

    render() {
        return (
           <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}/>
                    <Text style={styles.title}>App for promoting donations</Text>
                </View>
               <View style={styles.formContainer}>
                    <LoginForm props={this.props}/>
               </View>
           </KeyboardAvoidingView>
        )
    }
}

export default LoginScreen



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2cc7b8',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    }
    ,
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: "#fff",
        marginTop: 10,
        width: 140,
        textAlign: 'center',
        opacity: 0.9,
    }
});