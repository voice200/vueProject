import fb from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

class Ad {
    constructor(title,
                description,
                ownerId,
                imageSrc = '',
                promo = false,
                id=null
                ) {
        this.title = title
        this.description = description
        this.ownerId = ownerId
        this.imageSrc = imageSrc
        this.promo = promo
        this.id = id

    }
}

export default {
    state: {
        ads: []
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload)
        },
        loadAds (state, payload) {
            state.ads = payload
        },
        updateAd (state, payload) {
          const ad = state.ads.find(ad => {
                return ad.id === payload.id
            })
            ad.title = payload.title
            ad.description = payload.description
            ad.promo = payload.promo
            if (payload.imageSrc) {
                ad.imageSrc = payload.imageSrc
            }
        }
    },
    actions: {
        async createAd ({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true)

            const image = payload.image

            try {
                const newAd = new Ad(
                    payload.title,
                    payload.description,
                    getters.getUser.id,
                    payload.promo)

                const ad = await fb.database().ref('ads').push(newAd)
                const imageExt = image.name. slice(image.name.lastIndexOf('.'))
                const path = `${ad.key}${imageExt}`
                const storageRef = fb.storage().ref('ads')
                await storageRef.child(path).put(image)
                const imageSrc = await storageRef.child(path).getDownloadURL()
                const adAgain = {...newAd, id: ad.key, imageSrc}
                await fb.database().ref(`ads/${ad.key}`).update(adAgain)

                commit('createAd', adAgain)
                commit('setLoading', false)

            } catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                console.log(e.message)
                throw e
            }
        },
        async fetchAds ({commit}) {
            commit('clearError')
            commit('setLoading', true)
            const  resultAds = []

            try {
              const fbVal = await fb.database().ref('ads').once('value')
                const ads = fbVal.val()
                Object.keys(ads).forEach(key =>{
                    const ad = ads[key]
                    resultAds.push(
                        new Ad(ad.title, ad.description, ad.ownerId, ad.imageSrc, ad.promo, key)
                    )
                })
                commit('loadAds', resultAds)

                commit('setLoading', false)
            } catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
            }
        },
        async updateAd ({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true)
            let newAd
            console.log('update', payload, getters)
            try {
                if (payload.image) {
                    console.log('есть картинка', payload)
                    const image = payload.image
                  const preNewAd = new Ad(
                        payload.title,
                        payload.description,
                        getters.getUser.id,
                        payload.imageSrc,
                        payload.promo,
                        payload.id)

                    const imageExt = image.name. slice(image.name.lastIndexOf('.'))
                    const path = `${preNewAd.id}${imageExt}`
                    const storageRef = fb.storage().ref('ads')
                    await storageRef.child(path).delete()
                    await storageRef.child(path).put(image)
                    const imageSrc = await storageRef.child(path).getDownloadURL()
                    newAd = {...preNewAd}
                    newAd.imageSrc = imageSrc

                } else {
                        newAd = new Ad(
                        payload.title,
                        payload.description,
                        getters.getUser.id,
                        payload.imageSrc,
                        payload.promo,
                        payload.id)
                }
                await fb.database().ref(`ads/${newAd.id}`).update(newAd)
                commit('updateAd', newAd)
                commit('setLoading', false)
            } catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
            }
        }
    },
    getters: {

        ads (state) {
            return state.ads
        },
        promoAds (state) {
            return state.ads.filter(ad => {
                return ad.promo
            })
        },
        myAds (state, getters) {
            return state.ads.filter( ad => {
               return  ad.ownerId === getters.getUser.id
            })
        },
        adById (state) {
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    }
}