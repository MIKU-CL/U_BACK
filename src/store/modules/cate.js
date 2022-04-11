import { reqcatelist } from "../../http/api";
const state = {
    list: [],
}
const getters = {
    list(state) {
        return state.list
    }
}
const mutations = {
    changeList(state, list) {
        state.list = list
    }
}
const actions = {
    reqList(context) {
        reqcatelist({ istree: true }).then(res => {
            if (res.data.code == 200) {
                context.commit("changeList", res.data.list ? res.data.list : [])
            }
        })
    }
}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}