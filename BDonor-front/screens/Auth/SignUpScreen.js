import React, { Component } from 'react'
import {
    View,
    TextInput,
    Text,
    ScrollView,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';  // has several bugs
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from '../../screens/Auth/styles/styles'
import logo from '../../assets/images/logo.png'


class SignUpScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            cities: [
                {
                    label: 'Almaty',
                    value: 'Almaty',
                },
                {
                    label: 'Astana',
                    value: 'Astana',
                },
                {
                    label: 'Shymkent',
                    value: 'Shymkent',
                },
            ]
        }
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT)
    }

    componentWillMount () {
        if (Platform.OS ==='ios'){
            this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
            this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
        }else{
            this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
            this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
        }

    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (event) => {
        Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: IMAGE_HEIGHT_SMALL,
        }).start();
    }

    keyboardWillHide = (event) => {
        Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: IMAGE_HEIGHT,
        }).start();
    }

    keyboardDidShow = (event) => {
        Animated.timing(this.imageHeight, {
            toValue: IMAGE_HEIGHT_SMALL,
        }).start()
    }

    keyboardDidHide = (event) => {
        Animated.timing(this.imageHeight, {
            toValue: IMAGE_HEIGHT,
        }).start()
    }

    signUpHandler = () => {
        this.props.navigation.navigate("Info")
    }

    logInHandler = () => {
      this.props.navigation.navigate("Login")
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#2cc7b8',alignItems:'center'}}>
                <StatusBar barStyle={"light-content"}/>
                <View style={styles.logoContainer}>
                    <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
                </View>
                <ScrollView style={{flex:1}}>

                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior="padding">

                        <TextInput
                            placeholder="Name"
                            returnKeyType="next"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            style={styles.input}
                            onSubmitEditing={() => this.surnameInput.focus()}/>

                        <TextInput
                            placeholder="Surname"
                            returnKeyType="next"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            style={styles.input}
                            ref={(input) => this.surnameInput = input}
                            onSubmitEditing={() => this.emailInput.focus()}/>

                        <View style={styles.double}>

                            <TextInput
                                placeholder={"Enter Email"}
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                returnKeyType="next"
                                onSubmitEditing={() => this.passwordInput.focus()}
                                keyboardType={"email-address"}
                                autoCapitalize={"none"}
                                style={[styles.input, styles.longInput]}
                                onChangeText={this.emailHandler}
                                ref={(input) => this.emailInput = input} />

                            <TextInput
                                placeholder={"Age"}
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                returnKeyType="next"
                                onSubmitEditing={() => this.passwordInput.focus()}
                                keyboardType='number-pad'
                                autoCapitalize={"none"}
                                maxLength={3}
                                autoCorrect={false}
                                style={[styles.input, styles.shortInput]}
                                onChangeText={this.emailHandler} />

                        </View>

                        <View style={styles.double}>

                            <TextInput
                                placeholder={"Enter Password"}
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                returnKeyType="go"
                                secureTextEntry
                                autoCapitalize={"none"}
                                style={[styles.input, styles.longInput]}
                                onChangeText={this.passwordHandler}
                                ref={(input) => this.passwordInput = input} />

                            <TextInput
                                placeholder={"Weight"}
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                returnKeyType="next"
                                onSubmitEditing={() => this.passwordInput.focus()}
                                keyboardType='number-pad'
                                maxLength={3}
                                style={[styles.input, styles.shortInput]}
                                onChangeText={this.emailHandler} />

                        </View>

                        <RNPickerSelect
                                    items={this.state.cities}
                                    placeholder={{}}
                                    hideIcon={true}
                                    onValueChange={(value) => {
                                        this.setState({
                                            city: value,
                                        });
                                     }}
                                    style={{...pickerSelectStyles}}/>

                    </KeyboardAvoidingView>

                </ScrollView>
                // Delete in future
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.logInHandler()}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.signUpHandler()}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default SignUpScreen

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginHorizontal: 10,
        marginVertical: 5,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        width: window.width - 30,
        height: 40,
        backgroundColor: 'rgb(86, 210, 199)',
        color: 'rgba(255, 255, 255, 0.7)',
    },
})
