import React from 'react';
import {
    Text,
    Image,
    ScrollView,
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    Alert,
    Button,
} from 'react-native';

import { Icon } from 'react-native-elements';
import Feed from '../components/feed/Feed'
import firebase from '../firebase/FireBase'
import Modal from "react-native-modal";


const window = Dimensions.get('window');

export default class HomeScreen extends React.Component {

    state = {
        trainings: [],
        addNewsVisibl: false,
        isModalVisible: false,
        photo: '',
        title: '',
        desc:'',
        fullDesc: '',
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Feed',
        headerStyle: {
            backgroundColor: '#2cc7b8',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerRight: <Icon
                            name="library-add"
                            color='#fff'
                            style={styles.headerIcon}
                            onPress={()=>{ navigation.navigate("addNews")}} // WARNING MEMORY LEAK
                            underlayColor={'#2cc7b8'}
                        />,

    })

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    componentDidMount = () => {
        let trainings = null

        firebase
            .database()
            .ref('trainings')
            .on('value', snap => {
                if(snap.val()) {
                    trainings = Object.keys(snap.val()).map(i => snap.val()[i])
                    this.setState({
                        trainings: trainings
                    })
                }
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            })
    }

    detailedInfo = async (el) => {
        await this.setState({
            photo: el.Url,
            title: el.Title,
            fullDesc: el.FullDesc,

        })
        this._toggleModal()
    }


  render()  {
    return (
      <View style={styles.container}>
          <StatusBar barStyle={"light-content"}/>
          {

              this.state.trainings.length > 0 ?
                  <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                      <View style={{ flex: 1 }}>
                          {this.state.trainings.slice(0).reverse().map(el => (

                              <Feed key={el.Title.length + el.Url.length + el.Desc.length}
                                    title={el.Title}
                                    date={el.Date}
                                    img={el.Url}
                                    description={el.Desc}
                                    info={() => this.detailedInfo(el)}/>

                          ))}

                          <Modal isVisible={this.state.isModalVisible}>
                              <ScrollView style={{ flex: 1 }}>
                                  <View style={styles.header}>
                                      <Text style={styles.newsTitle}>{this.state.title}</Text>
                                  </View>
                                  <Image source={{uri: this.state.photo}}
                                         style={{width: "100%", height: 200}} />
                                  <Text style={styles.description}>{this.state.fullDesc}</Text>
                                  <TouchableOpacity onPress={this._toggleModal} style={styles.hideButton}>
                                      <Text style={styles.fullInfo}>Hide me!</Text>
                                  </TouchableOpacity>
                              </ScrollView>
                          </Modal>
                      </View>
                  </ScrollView>

                  : <Image
                      style={{width: 300, height: 200}}
                      source={require('../assets/images/spinner.gif')} />
          }
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

    header: {
        marginTop: 15,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    headerIcon: {
        marginRight: 40,
    },
    newsTitle: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: '700',
        fontStyle: 'italic',
        marginBottom: 10,
    },


    description: {
        marginTop: 10,
        fontSize: 13,
        fontWeight: '600',
        color: '#ffffff'
    },

    fullInfo: {
        textAlign: 'right',
        color: '#ffffff',
    },

    hideButton: {
        alignItems: 'center',
        marginTop: 15,
        width: window.width - 30,
        backgroundColor: '#2cc7b8',
        paddingVertical:15,
        marginBottom: 10,
    },



});
