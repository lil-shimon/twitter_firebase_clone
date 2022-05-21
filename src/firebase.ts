import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

// initialize firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

// firestore
export const db = firebaseApp.firestore()

// firebase auth
export const auth = firebaseApp.auth()

// firebase storage
export const storage = firebaseApp.storage()

// for Google auth
export const provider = new firebase.auth.GoogleAuthProvider()