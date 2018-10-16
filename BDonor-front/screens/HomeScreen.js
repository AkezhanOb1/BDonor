import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import Feed from '../components/feed/Feed'


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Feed',
        headerStyle: {
            backgroundColor: '#2cc7b8',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

  render()  {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"}/>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Feed
                title={"Damasya I need your help"}
                date={"19.08  20:00"}
                img={'https://images.pexels.com/photos/271955/pexels-photo-271955.jpeg?auto=compress&cs=tinysrgb&h=350'}
                description={"Help me if you can, I'm feeling down And I do appreciate you being 'round" +
                "Help me get my feet back on the ground" +
                "Won't you please, please help me?" +
                "My independence seems to vanish in the haze" +
                "(But) but every now and then (now and then) I feel so insecure (I know that I)" +
                "I know that I just need you like I never done before..."}/>

            <Feed
                title={"Damasya I need your help"}
                date={"19.08  20:00"}
                img={'https://images.pexels.com/photos/271955/pexels-photo-271955.jpeg?auto=compress&cs=tinysrgb&h=350'}
                description={"Help me if you can, I'm feeling down And I do appreciate you being 'round" +
                "Help me get my feet back on the ground" +
                "Won't you please, please help me?" +
                "My independence seems to vanish in the haze" +
                "(But) but every now and then (now and then) I feel so insecure (I know that I)" +
                "I know that I just need you like I never done before..."}/>

            <Feed
                title={"Damasya I need your help"}
                date={"19.08  20:00"}
                img={'https://images.pexels.com/photos/271955/pexels-photo-271955.jpeg?auto=compress&cs=tinysrgb&h=350'}
                description={"Help me if you can, I'm feeling down And I do appreciate you being 'round" +
                "Help me get my feet back on the ground" +
                "Won't you please, please help me?" +
                "My independence seems to vanish in the haze" +
                "(But) but every now and then (now and then) I feel so insecure (I know that I)" +
                "I know that I just need you like I never done before..."}/>

        </ScrollView>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },


  // contentContainer: {
  //   paddingTop: 10,
  // },

});
