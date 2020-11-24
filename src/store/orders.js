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
                console.log(e.message)
                commit('setError', e.message)
            }

        }
    },
    getters: {
        ordersIsDone () {

        },
        ordersNotDone() {

        },
        allOrder () {

        }
    }


}