import store from "../src/store"
import firebase from 'firebase'
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
export const lessonResolver = async  (to, from, next) => {
    store.dispatch('setLoading',true)
   
      if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
       firebase.auth().onAuthStateChanged(
        user=>{
          if(user){
            store.dispatch('autoLoginUser',user)
          }
        }
      )
    }
  
    store.dispatch('setLoading',false)
    while(firebase.apps){
        console.log('not created')
        if(firebase.apps.length > 0){
            next()
            break;
            
        }
    }

    
}