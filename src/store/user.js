import * as fb from 'firebase'
import courses from './courses'


class User {
    constructor(id) {
        this.id = id
    }
}
export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        async registerUser({
            commit
        }, {
            email,
            password
        }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const user = await fb.auth().createUserWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                console.log(error)
                throw error


            }

        },
        async loginUser({
            commit
        }, {
            email,
            password
        }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const user = await fb.auth().signInWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                console.log(error)
                throw error

            }

        },
        autoLoginUser({
            commit
        }, payload) {
            commit('setUser', new User(payload.uid))
        },
        logoutUser({
            commit
        }) {
            fb.auth().signOut().then(
                    () => {
                        commit('setUser', null)
                    }
                )
                .catch(err => {
                    commit('setError', err.message)
                })

        },
        recoverUser({
            commit
        }, email) {
            console.log('wwww')
            commit('clearError')
            commit('setLoading', true)

            fb.auth().sendPasswordResetEmail(email)
                .then(() => {

                    commit('setLoading', false)
                })
                .catch((error) => {
                    commit('setLoading', false)
                    commit('setError', error.message)
                })


        },
        saveProgress() {

        },
    },
    getters: {
        user(state) {
            return state.user
        },
        isUserLoggedIn(state) {
            return state.user != null
        }
    }


}