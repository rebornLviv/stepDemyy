import store from "../src/store"
import firebase from 'firebase'
export default async (to, from, next) => {
    store.dispatch('setLoading',true)
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
    if (firebase.apps.length === 0) {
     await   firebase.initializeApp(firebaseConfig)
    }
    await store.dispatch('getUserPhoto')
    await store.dispatch('getUserName')
    await store.dispatch('getUserBirthDay')
    await store.dispatch('getMyCourses')
    store.dispatch('setLoading',false)
    next()
  }