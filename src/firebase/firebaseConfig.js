import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
var firebaseConfig = {
    apiKey: "AIzaSyBWv4P_gveY9kNFNS0iBlAvPlSwJPHnRYY",
    authDomain: "stepdemy.firebaseapp.com",
    databaseURL: "https://stepdemy.firebaseio.com",
    projectId: "stepdemy",
    storageBucket: "stepdemy.appspot.com",
    messagingSenderId: "772950602466",
    appId: "1:772950602466:web:190da94a530c0bf61824bb",
    measurementId: "G-V6N93MXXHZ"
  };
firebase.initializeApp(firebaseConfig)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('Users')
const coursesCollection = db.collection('Courses')
const storage = firebase.storage()

export {
    db,
    auth,
    currentUser,
    usersCollection,
    coursesCollection,
    storage
}