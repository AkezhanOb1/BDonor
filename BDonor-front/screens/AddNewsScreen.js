import React from 'react';
import {
        StyleSheet,
        View,
        StatusBar,
        Text,
        TextInput,
        ScrollView,
        Animated,
        TouchableOpacity,
        Keyboard,
        KeyboardAvoidingView,
        Platform,
} from 'react-native';
import { Header } from 'react-native-elements';
import firebase from '../firebase/FireBase'


export default class AddNewsScreen extends React.Component {
    static navigationOptions = {
        title: 'Add News',
        headerStyle: {
            backgroundColor: '#2cc7b8',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    state = {
        title: '',
        shortDescr: '',
        fullDescr: '',
    }


    titleHandler = (title) => {
        this.setState({title})

    }

    shortDescrHandler = (shortDescr) => {
        this.setState({shortDescr})
    }

    fullDescrHandler = (fullDescr) => {
        this.setState({fullDescr})
        console.log(fullDescr)
    }

    submitHandler = () => {
        const database = firebase.database()
        const newsRef = database.ref('trainings/')
        let author = firebase.auth().currentUser.uid
        let title = this.state.title
        let shortDescr = this.state.shortDescr
        let fullDescr = this.state.fullDescr
        let image = "https://i.ytimg.com/vi/obXjlquHlhE/maxresdefault.jpg"
        console.log(firebase.auth().currentUser.providerData[0].email)

        if (this.state.fullDescr || this.state.shortDescr || this.state.title) {
            let result = newsRef.push({
                Desc: shortDescr,
                Title: title,
                FullDesc: fullDescr,
                Url: image,
                User: author,
            })
            console.log("SUCCESS")
            this.props.navigation.navigate("Main")
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={"light-content"}/>
                <Header
                    leftComponent={{
                        icon: 'arrow-back',
                        color: '#fff',
                        onPress: ()=>{ this.props.navigation.navigate("Main")},
                        underlayColor: '#2cc7b8'
                    }}
                    centerComponent={{ text: 'Add News', style: { color: '#fff', fontWeight: 'bold', fontSize: 16, } }}
                    backgroundColor="#2cc7b8"
                />
                <ScrollView style={{flex:1}}>
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior="padding">

                        <TextInput
                            placeholder="Title"
                            returnKeyType="next"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            style={styles.input}
                            onSubmitEditing={() => this.shortDesc.focus()}
                            onChangeText={this.titleHandler}/>

                        <TextInput
                            placeholder=" Write short description"
                            returnKeyType="next"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            style={styles.input}
                            ref={(input) => this.shortDesc = input}
                            onSubmitEditing={() => this.fullDesc.focus()}
                            onChangeText={this.shortDescrHandler}/>

                        <TextInput
                            placeholder="Write full description"
                            returnKeyType="next"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            style={styles.input}
                            ref={(input) => this.fullDesc = input}
                            onChangeText={this.fullDescrHandler}/>

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.submitHandler()}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginHorizontal: 10,
        marginVertical: 10,
        width: window.width - 30,
        height: 40,
        backgroundColor: 'rgb(86, 210, 199)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        width: window.width - 30,
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
