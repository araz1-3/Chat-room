import firebase from "firebase/app";
import "firebase/auth"

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCWmZmxRDBw029lY0rkhu3xB5wO5dZJoAI",
    authDomain: "botochat-b9d4b.firebaseapp.com",
    projectId: "botochat-b9d4b",
    storageBucket: "botochat-b9d4b.appspot.com",
    messagingSenderId: "488858170836",
    appId: "1:488858170836:web:daabd90816d75b8450d241"
}).auth();