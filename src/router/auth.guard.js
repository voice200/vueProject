import store from '../store'

export default function (to, from, next) {
    if (store.getters.getUser) {
        next()
    } else {
        next('/login?loginError=true')
    }
}