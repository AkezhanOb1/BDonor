import React, {Component} from 'react'
import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, Alert} from 'react-native'
import firebase from '../../firebase/FireBase'



class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        trainings: [],
    }


    emailHandler = (email) => {
        this.setState({email})
    }

    passwordHandler = (password) => {
        this.setState({password})
    }

    signInHandler = () => {

        let userEmail = this.state.email
        let userPassword = this.state.password

        if(userEmail === '' || userPassword === '') {
            if(userEmail === '' && userPassword !== '') {
                Alert.alert("Enter your email")
                return
            }else if(userEmail !== '' && userPassword === ''){
                Alert.alert("Enter your password")
                return
            }else {
                Alert.alert("Enter email and password")
                return
            }
        }


        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(  () => {
            this.props.props.navigation.navigate("Main")
        })



        .catch((error)=> {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    signUpHandler = () => {
        this.props.props.navigation.navigate("SignUp")
    }

    render() {


        return (
            <View style={styles.container}>
                <StatusBar barStyle={"light-content"}/>
                <TextInput
                    placeholder={"Enter Email"}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType={"email-address"}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    style={styles.input}
                    onChangeText={this.emailHandler} />

                <TextInput
                    placeholder={"Enter Password"}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    returnKeyType="go"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={this.passwordHandler}
                    ref={(input) => this.passwordInput = input} />

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.signInHandler()}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonContainer, styles.buttonLastContainer]} onPress={() => this.signUpHandler()}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default LoginForm

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 10,
        color: "#fff",
        paddingHorizontal: 10,
    },
    buttonContainer: {
        backgroundColor: 'rgba(43, 175, 199, 0.7)',
        paddingVertical:15,
        marginBottom: 10
    },
    buttonLastContainer: {
        marginBottom: 0
    },
    buttonText: {
        textAlign: 'center',
        color: "#fff",
        fontWeight: '700',
    }

})
