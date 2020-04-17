import store from "../src/store"
import firebase from 'firebase'

export const homeResolver = async  (to, from, next) => {
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
    await store.dispatch('setCat');
    await  store.dispatch('getAllLessons')
    await   store.dispatch('getTopLessons')
    store.dispatch('setLoading',false)
    next()  
    
}