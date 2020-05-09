import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import messagePlugin from '@/plugins/message'
import 'video.js/dist/video-js.css'

Vue.use(messagePlugin)

const fb = require('./firebase/firebaseConfig')
Vue.config.productionTip = false
let app

fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            vuetify,
            render: h => h(App)
        })
        if(user){
          console.log(user);
          store.dispatch('autoLoginUser',user)
        }
    }
})
