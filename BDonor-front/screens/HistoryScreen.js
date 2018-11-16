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
    Keyboard,
    RefreshControl
} from 'react-native';
import firebase from '../firebase/FireBase'

export default class HistoryScreen extends React.Component {
    static navigationOptions = () => ({
        title: 'History',
        headerStyle: {
            backgroundColor: '#2cc7b8',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    })


    state = {
        show: false,
        userHistory: [],
        refreshing: false,
    }

    _onRefresh = () => {
       // let user = "wIp2lTPYPrbviCI5HSMSjCEfbN72"
        let user = firebase.auth().currentUser.uid;
        let userHistory = null
        this.setState({refreshing: true});
        firebase
            .database()
            .ref('donations')
            .orderByChild('userId')
            .equalTo(user)
            .once('value', snap => {
                if(snap.val()) {

                    userHistory = Object.keys(snap.val()).map(i => snap.val()[i])
                    this.setState({
                        userHistory: userHistory,
                        show: true
                    })
                }
            }).then(() => {
            this.setState({refreshing: false});
        });
    }


    getDataHandler =() => {
       let user = firebase.auth().currentUser.uid;
     //   let user = "wIp2lTPYPrbviCI5HSMSjCEfbN72"
        let userHistory = null
        firebase
            .database()
            .ref('donations')
            .orderByChild('userId')
            .equalTo(user)
            .once('value', snap => {
                if(snap.val()) {

                    userHistory = Object.keys(snap.val()).map(i => snap.val()[i])
                    this.setState({
                        userHistory: userHistory,
                        show: true
                    })
                }
            });
    }



    componentWillReceiveProps = () => {
        this.setState({
            show: this.props.navigation.getParam("show"),
            makeRender: this.props.navigation.getParam("rend")
        })

        this.getDataHandler()
    }

    componentDidMount = () => {
        this.getDataHandler()
    }



    render() {

        const res  = this.state.userHistory.map(el => {
            donationDate = el.day + "/" + el.month + "/" + el.year
            return (
                <View style={styles.historyList} key={el.component + el.day + el.year + el.month + Math.random()}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('EachHistory', {element: el})}>
                        <View style={styles.doubleItem}>
                            <Text style={styles.leftDateHistory}>{el.component}</Text>
                            <Text style={styles.rightDateHistory}>{donationDate}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        })

        return (
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />
            }>
                {this.state.show  === true  ?
                    <View style={styles.containerHistory}>
                        <StatusBar
                            backgroundColor="white"
                            barStyle="light-content"
                        />
                        {/* <Text>{list}</Text> */}
                        {res}

                    </View>

                    : null
                }
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
    leftDateHistory:{
        width: '50%',
        fontWeight: "500",
        fontSize: 17,
        marginLeft: 10,
        paddingBottom: 20,
    },
    rightDateHistory:{
        marginLeft:'auto',
        fontWeight: "500",
        fontSize: 17,
        marginRight: 10,
        paddingBottom: 20,
    },
    doubleItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15,

    },
    historyList: {
        borderBottomWidth: 3,
        borderBottomColor: "#2cc7b8",
        marginBottom: 15,
        borderTopWidth: 3,
        borderTopColor: "#2cc7b8",
    }
});
