import store from "../src/store"
export default async  (to, from, next) => {
    store.dispatch('setLoading',true)
    await store.dispatch('getTopLessons')
    store.dispatch('setLoading',false)
    next()  
    
}