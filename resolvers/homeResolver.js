import store from "../src/store"
import firebase from 'firebase'

export const homeResolver = async  (to, from, next) => {
    store.dispatch('setLoading',true)
    await  store.dispatch('getAllLessons')
    await   store.dispatch('getTopLessons')
    store.dispatch('setLoading',false)
    next()  
    
}