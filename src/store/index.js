import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import courses from './courses'
import lessons from './lessons'


Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    user,
    shared,
    courses,
    lessons
  }
})
