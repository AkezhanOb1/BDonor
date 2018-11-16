import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'

const Feed = (props) => {

    return(
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.newsTitle}>{props.title}</Text>
              <Text style={styles.newsDate}>{props.date}</Text>
          </View>
          <Image source={{uri: props.img}}
                 style={{width: "100%", height: 200}} />
          <Text style={styles.newsDescription}>{props.description}</Text>
          <TouchableOpacity onPress={() => props.info()}>
              <Text style={styles.fullInfo}>Expand text...</Text>
          </TouchableOpacity>
      </View>
    )
}

fullInfo = () => {
    alert("GOOD GAME WELL PLAYED")
}

export default Feed

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 20,
        borderBottomColor: '#47315a',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },

    newsTitle: {
        color: "#2cc7b8",
        fontSize: 18,
        fontWeight: '600',
        fontStyle: 'italic',
        marginBottom: 10,
    },

    newsDate: {
        marginBottom: 10,
        fontStyle: 'italic',
    },

    newsDescription: {
        marginTop: 10,
        fontSize: 12,
    },

    fullInfo: {
        textAlign: 'right',
        color: 'rgb(211,211,211)'
    }
})
