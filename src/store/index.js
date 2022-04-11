import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { state, getters, mutations } from './mutations'
import { actions } from './actions'
import cate from './modules/cate'
import specs from "./modules/specs"
import goods from "./modules/goods"
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    cate,
    specs,
    goods
  }
})
