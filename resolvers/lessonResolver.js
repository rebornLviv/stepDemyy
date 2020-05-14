import store from "../src/store"
export const lessonResolver = async  (to, from, next) => {
    store.dispatch('setLoading',true)
    console.log(to.params)
   let course = to.params.cid
   let lesson = to.params.lid
   console.log('C---------L',course,lesson)
  await  store.dispatch('setLessons',{course,lesson})
  await  store.dispatch('getCurrentLesson',course)
    store.dispatch('setLoading',false)
    
    next()

    
}