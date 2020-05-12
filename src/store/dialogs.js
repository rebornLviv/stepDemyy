export default {
    state: {
        register: false,
        login: true,
        trigger: false

    },
    mutations: {
        setRegister(state) {
            state.register = !state.register
        },
        setLogin(state) {
            state.login = !state.login
        },
        setTrigger(state, payload) {
            state.trigger = payload
        }

    },
    actions: {
        setRegister({ commit }) {
            console.log('set reg')
            commit('setRegister')

        },
        setLogin({ commit }) {
            console.log('set login')
            commit('setLogin')

        },
        setTrigger({ commit }, payload) {
            console.log('trigger')
            commit('setTrigger', payload)

        },
        swap({ commit }) {
            commit('setLogin')
            commit('setRegister')
        }

    },
    getters: {
        dialog(state) {
            return state.login
        },
        registerD(state) {
            return state.register
        },
        trigger(state) {
            return state.trigger
        }


    }




}