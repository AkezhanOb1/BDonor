import React from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity, Switch, Image, ScrollView, TextInput } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Modal from "react-native-modal";
import RNPickerSelect from 'react-native-picker-select';
import firebase from "../firebase/FireBase";


export default class DonationScreen extends React.Component {
    static navigationOptions = () => ({
        title: 'Donation',
        headerStyle: {
            backgroundColor: '#2cc7b8',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    })

    state = {
        hasCameraPermission: null,
        lastScannedUrl: null,
        isModalVisible: false,
        correctQRCode: false,
        switchNuts: false,
        switchAlcohol: false,
        switchMayo: false,
        switchButter: false,
        switchBeverages: false,
        success: "fail",
        volume: 0,
        component: "Цельная кровь",
        bloodComponents: [
            {
                label: 'Цельная кровь', //1000
                value: 'Цельная кровь',
            },
            {
                label: 'Тромбоциты', // 1200
                value: 'Тромбоциты',
            },
            {
                label: 'Плазма', // 1200
                value: 'Плазма',
            },
            {
                label: 'Эритроциты', // 1200
                value: 'Эритроциты',
            },
            {
                label: 'Гранулоциты', // 1200
                value: 'Гранулоциты',
            },
            {
                label: 'Лейкоциты', // 1200
                value: 'Лейкоциты',
            },
        ],

    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = async (result) => {
        if (result.data !== this.state.lastScannedUrl) {
            LayoutAnimation.spring();
            this.setState({lastScannedUrl: result.data});
            if (result.data === "BDonor") {
                await this.setState({
                    correctQRCode: true
                })

                // if (this.state.isModalVisible) {
                //     await this._toggleModal()
                // }
                // ////Object.keys(snap.val())[0]
            } else {
                await this.setState({
                    correctQRCode: false
                })
            }
        }
    };


    _toggleModal = async () => {
        await this.setState({
            isModalVisible: !this.state.isModalVisible,
            correctQRCode: false,
            lastScannedUrl: null,
        });
    }



    volumeHandler = (volume) => {
        this.setState({
            volume: volume
        })
    }

    donationHandler = async () => {
        let component = this.state.component
        let volume = this.state.volume
        let alco = this.state.switchAlcohol
        let mayo = this.state.switchMayo
        let butter = this.state.switchButter
        let beverages = this.state.switchBeverages
        let nuts = this.state.switchNuts

        let user = firebase.auth().currentUser.uid;
     //  let user = "wIp2lTPYPrbviCI5HSMSjCEfbN72"

        const database = firebase.database()
        const donationRef = database.ref('donations/')
        const bonusRef = database.ref('bonuses/')
        if(component && volume && !alco && !mayo && !butter && !beverages && !nuts) {


            this.donationDataBasePush(component, volume, user, donationRef)
            this.bonusesDataBasePush(user, component ,bonusRef)


            this.props.navigation.navigate("HistoryStack")
        }else {
            Alert.alert("Fill out inputs")
        }
    }

    donationDataBasePush(component, volume, user, db) {

        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()

        let result = db.push({
            userId: user,
            component: component,
            volume: volume,
            year: year,
            month: month,
            day: day,
        })

    }

    bonusesDataBasePush(user, component, db) {
        let userBonuses  = 0
        let addBonus = 0
        firebase
            .database()
            .ref('bonuses')
            .orderByChild('userId')
            .equalTo(user)
            .once('value', snap => {
                if(snap.val()) {
                    if (snap.val()[Object.keys(snap.val())[0]].bonus) {
                        userBonuses = snap.val()[Object.keys(snap.val())[Object.keys(snap.val()).length - 1]].bonus
                        if (component === "Цельная кровь") {
                            addBonus = 1000
                        }else {
                            addBonus = 1200
                        }
                        let result = db.push({
                            userId: user,
                            bonus: userBonuses + addBonus
                        })
                    }
                }else {
                    if (component === "Цельная кровь") {
                        userBonuses = 1000
                    }else {
                        userBonuses = 1200
                    }
                    let result = db.push({
                        userId: user,
                        bonus: userBonuses
                    })
                }
            });
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={"light-content"}/>


                <View style={styles.inputRectangle}>
                    <View style={styles.rectangleOne}>
                    </View>
                    <View style={styles.rectangleTwo}>
                        <RNPickerSelect
                            items={this.state.bloodComponents}
                            placeholder={{}}
                            onValueChange={(component) => {
                                this.setState({
                                    component: component,
                                });
                            }}
                            style={{...pickerSelectStyles}}/>
                    </View>
                </View>


                <View style={styles.inputRectangle}>
                    <View style={styles.rectangleOne}>
                    </View>
                    <View style={styles.rectangleTwo}>
                        <TextInput  placeholder={"Объем, мл"}
                                    keyboardType = 'numeric'
                                    maxLength = {5}
                                    style={styles.inputStyle}
                                    placeholderTextColor="white"
                                    value={this.state.value}
                                    onChangeText={this.volumeHandler}
                                    underlineColorAndroid='transparent'/>
                    </View>
                </View>



                <ScrollView style={{flex:1}}>
                    <View style={styles.containerScroller}>
                        <View style={styles.cautionBlock}>
                            <Text style={styles.cautionText}>Что вы употребляли за последние 3 дня?</Text>
                        </View>

                        <View style={styles.doubleItem}>
                            <Image style={styles.switchImage} source={require("../assets/images/donationSection/nuts.png")}/>
                            <Switch style={styles.switch}
                                    onValueChange={(switchNuts)=>this.setState({switchNuts})}
                                    value={this.state.switchNuts}/>
                            <Text style={styles.switchTitle}>Nuts</Text>
                        </View>

                        <View style={styles.doubleItem}>
                            <Image style={styles.switchImage} source={require("../assets/images/donationSection/alcohol.png")}/>
                            <Switch style={styles.switch}
                                    onValueChange={(switchAlcohol)=>this.setState({switchAlcohol})}
                                    value={this.state.switchAlcohol}/>
                            <Text style={styles.switchTitle}>Alcohol</Text>
                        </View>

                        <View style={styles.doubleItem}>
                            <Image style={styles.switchImage} source={require("../assets/images/donationSection/mayo.png")}/>
                            <Switch style={styles.switch}
                                    onValueChange={(switchMayo)=>this.setState({switchMayo})}
                                    value={this.state.switchMayo}/>
                            <Text style={styles.switchTitle}>Mayo</Text>
                        </View>

                        <View style={styles.doubleItem}>
                            <Image style={styles.switchImage} source={require("../assets/images/donationSection/butter.png")}/>
                            <Switch style={styles.switch}
                                    onValueChange={(switchButter)=>this.setState({switchButter})}
                                    value={this.state.switchButter}/>
                            <Text style={styles.switchTitle}>Butter</Text>
                        </View>

                        <View style={styles.doubleItem}>
                            <Image style={styles.switchImage} source={require("../assets/images/donationSection/beverages.png")}/>
                            <Switch style={styles.switch}
                                    onValueChange={(switchBeverages)=>this.setState({switchBeverages})}
                                    value={this.state.switchBeverages}/>
                            <Text style={styles.switchTitle}>Beverages</Text>
                        </View>
                    </View>
                </ScrollView>




                <TouchableOpacity onPress={this._toggleModal} style={styles.scanButton}>
                    <Text style={styles.scanButtonText}>Scan QR</Text>
                </TouchableOpacity>

                <Modal isVisible={this.state.isModalVisible}>
                    {this.state.hasCameraPermission === null
                        ? <Text>Requesting for camera permission</Text>
                        : this.state.hasCameraPermission === false
                            ? <Text style={{ color: '#fff' }}>
                                Camera permission is not granted
                            </Text>
                            :
                            <View>
                                <BarCodeScanner
                                    onBarCodeRead={this._handleBarCodeRead}
                                    style={{
                                        height: Dimensions.get('window').height / 2,
                                        width: Dimensions.get('window').width - 30,
                                    }}
                                />
                                <TouchableOpacity onPress={this._toggleModal} style={styles.hideButton}>
                                    <Text style={styles.fullInfo}>Hide me!</Text>
                                </TouchableOpacity>

                            </View>


                    }
                    {this._maybeRenderUrl()}
                </Modal>


                <StatusBar hidden />
            </View>
        );
    }

    _handlePressUrl = () => {
        Alert.alert(
            'Open this URL?',
            this.state.lastScannedUrl,
            [
                {
                    text: 'Yes',
                    onPress: () => Linking.openURL(this.state.lastScannedUrl),
                },
                { text: 'No', onPress: () => {} },
            ],
            { cancellable: false }
        );
    };

    _handlePressCancel = () => {
        this.setState({ lastScannedUrl: null });
    };

    allHandler = () => {
        this._toggleModal()
        this.donationHandler()
    }

    _donationHandler = () => {
        if(this.state.correctQRCode) {
            if(this.state.volume > 100) {
                Alert.alert(
                    'SUCCESS',
                    "",
                    [
                        {text: 'Cancel', onPress: () =>  this._toggleModal()},
                        {text: 'OK', onPress: () => this.allHandler()},
                    ],
                    { cancelable: false }
                )
            }else {
                Alert.alert(
                    "FILL ALL THE FIELDS",
                    "",
                    [
                        {text: 'OK', onPress: () => this._toggleModal()},
                    ],
                    { cancelable: false }
                )

            }

        }
    }

    _maybeRenderUrl = () => {

        if (!this.state.lastScannedUrl) {
            return;
        }


        return (
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}/>
                <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
                    <Text numberOfLines={1} style={styles.urlText} onPress={this._donationHandler}>
                        {this.state.correctQRCode ? "Make Donation" : "FAIL"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={this._handlePressCancel}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        )

    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 15,
    },

    scanButton: {
        alignItems: 'center',
        marginTop: 15,
        width: window.width - 30,
        backgroundColor: '#2cc7b8',
        paddingVertical:15,
        marginBottom: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    scanButtonText: {
        color: "#ffffff",
        fontSize: 15,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        flexDirection: 'row',
    },
    url: {
        flex: 1,
    },
    urlText: {
        color: '#fff',
        fontSize: 20,
    },
    cancelButton: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
    },
    hideButton: {
        alignItems: 'center',
        marginTop: 15,
        width: window.width - 30,
        backgroundColor: '#2cc7b8',
        paddingVertical:15,
        marginBottom: 10,
    },
    fullInfo: {
        textAlign: 'right',
        color: '#ffffff',
    },

    doubleItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15,

    },
    switchTitle: {
        color: "#000000",
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "600",
    },


    inputRectangle:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        marginTop: 5,
        width: '100%',
    },
    rectangleOne:{
        width:'25%',
        height:50,
        backgroundColor: '#40E0D0',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    rectangleTwo:{
        backgroundColor: 'rgb(86, 210, 199)',
        width:'75%',
        height:50,
        alignItems: 'flex-start',
        justifyContent:'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },

    cautionBlock: {
        marginTop: 15,

    },

    cautionText: {
        color: "#000000",
        fontSize: 15,
        fontWeight: "600",
        textAlign: "center",
    },

    switchImage: {
        width: 75,
        height: 75,
    },

    containerScroller: {
        flex: 1,
        justifyContent: 'center',
    },

    inputStyle: {
        marginHorizontal: 10,
        marginBottom: 5,
        marginVertical: 5,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        width: window.width - 30,
        height: 40,
        backgroundColor: 'rgb(86, 210, 199)',
        color: 'rgb(255, 255, 255)',
    }
});


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
        color: 'rgb(255, 255, 255)',
    },

})
