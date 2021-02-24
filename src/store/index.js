import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

// 用常量接收防止报错
const TOUTIAO_USER = 'TOUTIAO_KEY'

export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
    user: getItem(TOUTIAO_USER)
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(user))
      setItem(TOUTIAO_USER, state.user)
    }
  },
  actions: {},
  modules: {}
})
