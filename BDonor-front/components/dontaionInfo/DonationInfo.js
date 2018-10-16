import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


const DonationInfo = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.caption}>{props.header}</Text>
            <Text style={styles.information}>{props.paragraph}</Text>
        </View>
    )
}

export default DonationInfo


const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
    },

    caption: {
        color: '#197168',
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 10,
        fontStyle: 'italic'
    },
    information: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '500',
        fontStyle: 'italic'
    }
});
