import React, {Component} from 'react'
import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar} from 'react-native'

class LoginForm extends Component {

    state = {
        email: '',
        password: ''
    }

    emailHandler = (email) => {
        this.setState({email})
    }

    passwordHandler = (password) => {
        this.setState({password})
    }

    signInHandler = () => {
        alert(`Confirmation email has been sent to ${this.state.email}`);
    }

    signUpHandler = () => {
        alert(`Confirmation email has been sent to ${this.state.password}`);
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
