import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import store from './store'
import fb from 'firebase/app'
import buyModal from "@/views/buyModal";
// import thanksModal from "@/views/thanks";

Vue.config.productionTip = false
Vue.component('app-buy-modal',buyModal)
// Vue.component('app-thanks-modal', thanksModal)

new Vue({
  vuetify,
  router,
  store,
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyDXZgrb-dQokOtl_08PjSkJhNgLuC1188k",
      authDomain: "ads-vue-968bb.firebaseapp.com",
      databaseURL: "https://ads-vue-968bb.firebaseio.com",
      projectId: "ads-vue-968bb",
      storageBucket: "ads-vue-968bb.appspot.com",
      messagingSenderId: "47974017599",
      appId: "1:47974017599:web:5f6b583f8f8e96a964a68a",
      measurementId: "G-70YXPNWBKK"
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLogUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  },

  render: h => h(App)
}).$mount('#app')
