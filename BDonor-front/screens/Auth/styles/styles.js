import { StyleSheet, Dimensions } from 'react-native'

const window = Dimensions.get('window')

export const IMAGE_HEIGHT = window.width / 2.5
export const IMAGE_HEIGHT_SMALL = window.width / 6

export default StyleSheet.create({
    container: {
        backgroundColor: '#2cc7b8',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: IMAGE_HEIGHT,
        resizeMode: 'contain',
        marginBottom: 15,
        marginTop:40
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
    longInput: {
        width: window.width - 100,
    },
    shortInput: {
        width: window.width - 270,
        paddingHorizontal: 0,
        textAlign: 'center'
    },
    double: {
        justifyContent: 'space-between',
        flexDirection: 'row',
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
