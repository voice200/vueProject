import Vue from 'vue'
import Vuex from 'vuex'
import ads from './ads'
import user from "@/store/user";
import common from "@/store/common";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ads,
    user,
    common
  }
})
