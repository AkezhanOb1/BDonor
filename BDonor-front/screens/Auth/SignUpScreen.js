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
    Alert
} from 'react-native'
import firebase from '../../firebase/FireBase'
import RNPickerSelect from 'react-native-picker-select';  // has several bugs
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from '../../screens/Auth/styles/styles'
import logo from '../../assets/images/logo.png'



class SignUpScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userSurname: '',
            userEmail: '',
            userAge: 0,
            userPassword: '',
            userWeight: 0,
            userGender: 'Male',
            gender: [
                {
                    label: 'Male',
                    value: 'Male',
                },
                {
                    label: 'Female',
                    value: 'Female',
                },
            ],

            userCity: 'Almaty',
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


    /*----------------------------------------- Handlers--------------------------------------------------------*/


    userNameHandler = (userName) => {
        this.setState({userName})
        console.log(userName)
    }

    userSurnameHandler = (userSurname) => {
        this.setState({userSurname})
    }

    userEmailHandler = (userEmail) => {
        this.setState({userEmail})
    }

    userAgeHandler = (userAge) => {
        this.setState({userAge})
    }

    userPasswordHandler = (userPassword) => {
        this.setState({userPassword})
    }

    userWeightHandler = (userWeight) => {
        this.setState({userWeight})
    }


    signUpHandler = () => {
        let name = this.state.userName
        let surname = this.state.userSurname
        let email = this.state.userEmail
        let password = this.state.userPassword
        let age = this.state.userAge
        let weight = this.state.userWeight
        let gender = this.state.userGender
        let city = this.state.userCity
        let donationAmount = 0
        const database = firebase.database()
        const userRef = database.ref('users/')


        if(name || surname || email || password || age || weight || gender || city) {


            try{
                let result = userRef.push({
                    userName: name,
                    userSurname: surname,
                    userEmail: email,
                    userAge: age,
                    userWeight: weight,
                    userGender: gender,
                    userCity: city,
                    donationAmount: donationAmount,
                })

                firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                    this.props.navigation.navigate("Info")
                    Alert.alert("Success")
                }).catch(function(error) {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                })
            }catch(e)
            {
                Alert("Что то пошло не так")
            }
        }

    }

    logInHandler = () => {
        this.props.navigation.navigate("Login")
    }

    /*-------------------------------------------Handlers End-----------------------------------------------------*/
    /*-------------------------------------------Data checker-----------------------------------------------------*/






    /*-------------------------------------------Data checker end-------------------------------------------------*/

    render() {


        const options = [
            "Male",
            "Female"
        ];

        function setSelectedOption(gender){
            this.setState({
                gender
            });
        }


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
                            onSubmitEditing={() => this.surnameInput.focus()}
                            onChangeText={this.userNameHandler}/>

                        <TextInput
                            placeholder="Surname"
                            returnKeyType="next"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            style={styles.input}
                            ref={(input) => this.surnameInput = input}
                            onSubmitEditing={() => this.emailInput.focus()}
                            onChangeText={this.userSurnameHandler}/>

                        <View style={styles.double}>

                            <TextInput
                                placeholder={"Enter Email"}
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                returnKeyType="next"
                                onSubmitEditing={() => this.passwordInput.focus()}
                                keyboardType={"email-address"}
                                autoCapitalize={"none"}
                                style={[styles.input, styles.longInput]}
                                onChangeText={this.userEmailHandler}
                                ref={(input) => this.emailInput = input}
                            />

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
                                onChangeText={this.userAgeHandler} />

                        </View>

                        <View style={styles.double}>

                            <TextInput
                                placeholder={"Enter Password"}
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                returnKeyType="go"
                                secureTextEntry
                                autoCapitalize={"none"}
                                style={[styles.input, styles.longInput]}
                                onChangeText={this.userPasswordHandler}
                                ref={(input) => this.passwordInput = input} />

                            <TextInput
                                placeholder={"Weight"}
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                returnKeyType="next"
                                onSubmitEditing={() => this.passwordInput.focus()}
                                keyboardType='number-pad'
                                autoCapitalize={"none"}
                                maxLength={3}
                                autoCorrect={false}
                                style={[styles.input, styles.shortInput]}
                                onChangeText={this.userWeightHandler} />

                        </View>


                        <RNPickerSelect
                            items={this.state.gender}
                            placeholder={{}}
                            hideIcon={true}
                            onValueChange={(value) => {
                                this.setState({
                                    userGender: value,
                                });
                            }}
                            style={{...pickerSelectStyles}}/>

                        <RNPickerSelect
                            items={this.state.cities}
                            placeholder={{}}
                            hideIcon={true}
                            onValueChange={(value) => {
                                this.setState({
                                    userCity: value,
                                });
                            }}
                            style={{...pickerSelectStyles}}/>


                        {/*Delete in future */}
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.logInHandler()}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.signUpHandler()}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>

                </ScrollView>

            </View>
        )
    }
}

export default SignUpScreen

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginHorizontal: 10,
        marginBottom: 5,
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
