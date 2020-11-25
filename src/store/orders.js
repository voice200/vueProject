import fb from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

class Order {
    constructor(nameClient, adId, ownerId, phoneClient, isDone= false, id=null ) {
        this.adId = adId
        this.nameClient = nameClient
        this.ownerId = ownerId
        this.phoneClient = phoneClient
        this.isDone = isDone
        this.id = id
    }
}

export default {
    state: {
        orders:[]
    },
    mutations: {
        createAd(state, payload) {
            state.orders.push(payload)
        },
        loadOrders (state, payload) {
            state.orders = payload
        },
        markDone(state, payload) {
        return state.orders.forEach(order => {
                payload.forEach(ord => {
                    if (ord === order.id) {
                       order.isDone = true
                    }
                    return order.isDone
                })
            })
        }

    },
    actions: {
        async createOrder({commit}, payload) {
            const order = new Order(
                payload.nameClient,
                payload.adId,
                payload.ownerId,
                payload.phoneClient)

            commit('clearError')
            commit('setLoading', true)

            try {
                const ord = await fb.database().ref('orders').push(order)
                await fb.database().ref(`orders/${ord.key}`).update({id: ord.key})
                commit('createAd', {...order, id: ord.key })
                commit('setLoading', false)
                console.log('заказ записан')
            }catch (e) {
                commit('setLoading', false)
                commit('setError', e.message)
            }

        },
        async fetchOrders ({commit}) {
            commit('clearError')
            commit('setLoading', true)
            const  resultOrders = []

            try {
                const fbVal = await fb.database().ref('orders').once('value')
                const orders = fbVal.val()
                Object.keys(orders).forEach(key =>{
                    const ord = orders[key]
                    resultOrders.push(
                     new Order(ord.nameClient, ord.adId, ord.ownerId, ord.phoneClient, ord.isDone, key)
                    )
                })
                commit('loadOrders', resultOrders)
                commit('setLoading', false)
            } catch (e) {
                commit('setLoading', false)
                commit('setError', e.message)
                console.log(e.message)
                throw e
            }
        },
        async markDone ({commit}, payload) {
            commit('clearError')
            commit('setLoading', true)
            const  resultOrders = []
            try {
                const fbVal = await fb.database().ref('orders').once('value')
                const orders = fbVal.val()
                Object.keys(orders).filter(key =>{
                    const ord = orders[key]
                    payload.forEach(id => {
                        if (id === key) {
                            const orderIsDone = new Order(ord.nameClient, ord.adId, ord.ownerId, ord.phoneClient, ord.isDone, key)
                            fb.database().ref(`orders/${orderIsDone.id}`).update({isDone: true})
                            orderIsDone.isDone = true
                            resultOrders.push(orderIsDone)
                        }
                        return resultOrders
                    })
                })
                commit('markDone', payload)
                commit('setLoading', false)
            }catch (e) {
                commit('setLoading', false)
                commit('setError', e.message)
                throw e
            }
        }
    },
    getters: {
        ordersAreDone (state, getters) {
           let ordersUsers = []
            ordersUsers = state.orders.filter( ord => {
                return  ord.ownerId === getters.getUser.id
            })
            return ordersUsers.filter( o => {
                return o.isDone === true
            })

        },
        ordersNotDone(state, getters) {
            let ordersUsers = []
             ordersUsers = state.orders.filter( ord => {
                return  ord.ownerId === getters.getUser.id
            })
            return ordersUsers.filter( o => {
                return  o.isDone === false
            })
        }
    }


}