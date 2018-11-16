import React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import firebase from '../firebase/FireBase'

export default class EachHistoryScreen extends React.Component {
    static navigationOptions = {
        title: '',
        headerStyle: {
            backgroundColor: '#40E0D0',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: '500'
        },
    };

    recipe = this.props.navigation.getParam("element")

    deleteHandler = () => {
        const recipe = this.props.navigation.getParam("element")
        let user = firebase.auth().currentUser.uid;
      //  let user = firebase.auth().currentUser.email;
      //  let user = "wIp2lTPYPrbviCI5HSMSjCEfbN72"
        let ref = firebase.database().ref('donations');
        ref
            .orderByChild("userId")
            .equalTo(user)
            .once('value', snap => {
                if(snap.val()) {
                    let userHistory = Object.keys(snap.val()).map(i => snap.val()[i])
                    let correctIndex = 0
                    let findIndex = userHistory.forEach((el, index) => {
                        if(el.bdate === recipe.bdate) {
                            if(el.component === recipe.component){
                                correctIndex = index
                            }
                        }
                    })
                    ref.child(Object.keys(snap.val())[correctIndex]).remove()
                    this.props.navigation.navigate('Settings', {show: false, rend: "yes"})
                }
            });
    }

    render() {
        return (
            <View style={styles.containerHistory}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="light-content"
                />
                {/* <Text>{list}</Text> */}
                <View style={styles.historyList}>
                    <View style={styles.userData}>
                        <View style={styles.seperator}>
                            <Text style={styles.leftDateHistory}>Дата донации: </Text>
                            <Text style={styles.rightDateHistory}>{this.recipe.day + "/" + this.recipe.month + "/" + this.recipe.year}</Text>
                        </View>
                        <View style={styles.seperator2}>
                            <Text style={styles.leftDateHistory}>Компонент: </Text>
                            <Text style={styles.rightDateHistory}>{this.recipe.component}</Text>
                        </View>
                        <View style={styles.seperator2}>
                            <Text style={styles.leftDateHistory}>Объем, мл: </Text>
                            <Text style={styles.rightDateHistory}>{this.recipe.volume}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.submitView}>
                    <TouchableOpacity
                        style={styles.delete}
                        onPress={() => this.deleteHandler()}
                    >
                        <Text style={styles.buttonText}>Удалить историю</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    container2:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    inputRectangle:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        marginTop: 5,
        width: '95%',
    },
    rectangleOne:{
        width:'25%',
        height:50,
        backgroundColor: '#40E0D0',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20
    },
    whiteText: {
        color: '#ffffff',
    },
    textinput:{
        paddingLeft: 20,
        color: '#fff',
        width: '100%',
    },
    rectangleTwo:{
        backgroundColor:'#2CC7B8',
        width:'75%',
        height:50,
        alignItems: 'flex-start',
        justifyContent:'center',
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20
    },
    modal: {
        width: '100%'
    },
    buttonView:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    button:{
        backgroundColor:'#2CC7B8',
        borderRadius: 20,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitView:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        width: '85%',
        marginBottom: 20
    },
    submit:{
        backgroundColor:'#2CC7B8',
        borderRadius: 20,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        textAlign:'center',
        fontSize: 20,
        color: "white"
    },
    noAccount:{
        textAlign: 'right',
        alignSelf:'stretch',
        marginRight: 25,
        marginTop: 10,
        color: '#ffffff',
    },
    forgotPassword:{
        textAlign: 'right',
        alignSelf:'stretch',
        marginRight: 25,
        marginTop: 10,
        color: 'black',
    },
    inputs: {
        marginTop: 100
    },
    logoView:{
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
    checkboxes:{
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    seperator:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 70,
        width: '97%',
        borderColor: '#ccc'
    },
    seperator2:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        borderBottomWidth: 1,
        height: 70,
        width: '97%',
        borderColor: '#ccc'
    },
    title:{
        marginRight: 'auto',
        fontSize: 16
    },
    svg:{
        width: '20%'
    },
    question:{
        fontSize: 16,
    },
    questionView:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginTop: 20
    },
    personData: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    formTitle:{
        fontSize: 30,
        paddingBottom: 20
    },
    userData:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftSide:{
        fontSize: 15,
        fontWeight: '700'
    },
    rightSide:{
        marginRight:'auto',
        fontSize: 15
    },
    historyList:{
        alignItems: 'center',
        width:'100%',
        marginTop: 20,
        backgroundColor:'#fff'
    },
    leftDateHistory:{
        width: '50%'
    },
    rightDateHistory:{
        marginLeft:'auto'
    },
    containerHistory:{
        flex: 1,
        justifyContent:'flex-start',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    delete:{
        backgroundColor:'#ff0c0c',
        borderRadius: 20,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userIcon:{
        width: '10%'
    },
    exit:{
        color:'#fff',
        paddingLeft: 10
    },

    actionText: {
        textAlign: 'right',
        marginRight: 25,
        marginTop: 10,
        color: '#57e5dd',
    }
});
