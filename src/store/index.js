import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import courses from './courses'
import lessons from './lessons'
import dialogs from './dialogs'

Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    user,
    shared,
    courses,
    lessons,
    dialogs
  }
})
