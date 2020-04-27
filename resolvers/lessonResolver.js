import store from "../src/store"
import firebase from 'firebase'

export const lessonResolver = async  (to, from, next) => {
    store.dispatch('setLoading',true)
    console.log(to.params)
   let course = to.params.cid
   let lesson = to.params.lid
   console.log(course,lesson)
    store.dispatch('setLessons',{course,lesson})
    store.dispatch('setLoading',false)
    next()

    
}