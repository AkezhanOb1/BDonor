import React from 'react';
import { StyleSheet, View, StatusBar, Text} from 'react-native';
import { MapView } from 'expo';


export default class AddressScreen extends React.Component {
    static navigationOptions = {
        title: 'Blood Banks',
        headerStyle: {
            backgroundColor: '#2cc7b8',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    state = {
        location: {
            first: { latitude: 43.21922379999999, longitude: 76.90135899999996 },
            second:{ latitude: 43.2316551, longitude: 76.91215139999997 }
        },
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={"light-content"}/>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 43.238949,
                        longitude: 76.889709,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <MapView.Marker
                        coordinate={this.state.location.first}
                        title="Республиканский центр крови"
                        description="Центр сдачи крови"
                    />
                    <MapView.Marker
                        coordinate={this.state.location.second}
                        title="Городской центр крови"
                        description="Центр сдачи крови"
                    />
                </MapView>
            </View>
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

   map: {
        flex: 1,
    },

    cityPicker: {
        zIndex: 5,
    }
});
