import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as firebase from 'firebase'
// import 'firebase/firestore'
// import 'firebase/auth'
import 'video.js/dist/video-js.css'

Vue.config.productionTip = false
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
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),

 created() {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
    firebase.auth().onAuthStateChanged(
      user=>{
        if(user){
          store.dispatch('autoLoginUser',user)
        }
      }
    )

  },
}).$mount('#app')
const fb  = firebase.firestore()
const auth = firebase.auth()

// export const fb = firebase.initializeApp(firebaseConfig);
//export const fb = firebase.firestore();
export{
  fb,
  auth
}
//firestore
 //auth
