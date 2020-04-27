export default {


state:{
    register:false,
    login:false

},  
mutations:{
setRegister(state){
    state.register = ! state.register
},
setLogin(state){
    state.login = !state.login
}

},  
actions:{
setRegister({commit}){
    console.log('set reg')
commit('setRegister')

},
setLogin({commit}){
    console.log('set login')
    commit('setLogin')

},
swap({commit}){
    commit('setLogin')
    commit('setRegister')
}

},
getters:{
    loginD(state){
        return state.login
    },
    registerD(state){
        return state.register
    }


}




}