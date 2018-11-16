import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyA-4VAoYdl7Oo8PuMQuaT7t1iwLU4jVvj0",
    authDomain: "bfit-23ce6.firebaseapp.com",
    databaseURL: "https://bfit-23ce6.firebaseio.com",
    projectId: "bfit-23ce6",
    storageBucket: "bfit-23ce6.appspot.com",
    messagingSenderId: "189218813019"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();