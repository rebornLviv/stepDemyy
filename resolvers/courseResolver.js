import store from "../src/store"
import firebase from 'firebase'

export const courseResolver = async (to, from, next) => {
  let course = to.params.id
  store.dispatch('setLoading', true)
  await store.dispatch('setCourse', course)
  await store.dispatch('getJoined', course)
  store.dispatch('setLoading', false)
  next()

}