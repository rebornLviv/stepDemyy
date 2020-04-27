import store from "../src/store"
import firebase from 'firebase'

export const courseResolver = async  (to, from, next) => {
    let course =   to.params.id
    store.dispatch('setLoading',true)
    store.dispatch('setCourse',course)
    store.dispatch('setLoading',false)
      next()
    
}