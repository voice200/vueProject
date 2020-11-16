import fb from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"


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
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
       async registerUser ({commit}, {email, password}) {
            commit('clearError')
            commit('setLoading', true)
           try {
               const user = await fb.auth().createUserWithEmailAndPassword(email, password)
               commit('setUser', new User(user. uid))
               commit('setLoading', false)
           } catch (e) {
               commit('setLoading', false)
               commit('setError', e.message)
               throw e
           }
        },
        async loginUser ({commit}, {email, password}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const user = await fb.auth().signInWithEmailAndPassword(email, password)
                commit('setUser', new User(user. uid))
                commit('setLoading', false)
            } catch (e) {
                commit('setLoading', false)
                commit('setError', e.message)
                throw e
            }
        }

    },
    getters: {
        getUser (state) {
            return state.user
        }
    }
}