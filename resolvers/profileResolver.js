import store from "../src/store"
import firebase from 'firebase'
export default async (to, from, next) => {
    store.dispatch('setLoading',true)
    await store.dispatch('getUserPhoto')
    await store.dispatch('getUserName')
    await store.dispatch('getUserBirthDay')
    await store.dispatch('getMyCourses')
    store.dispatch('setLoading',false)
    next()
  }