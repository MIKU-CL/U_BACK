import { reqgoodscount, reqgoodslist} from "../../http/api"
const state = {
    // 1.初始化数据
    list: [],
    //分页的总数
    total: 0,
    // 分页的一页的个数
    size: 2,
    //当前页码
    page: 1

}
const getters = {
    // 2.导出list
    list(state) {
        return state.list
    },
    // 2.导出total
    total(state) {
        return state.total
    },
    // 2.导出size
    size(state) {
        return state.size
    },
}
const mutations = {
    // 3.修改list 
    changeList(state, list) {
        state.list = list;
    },
    // 3.修改total 
    changeTotal(state, total) {
        state.total = total;
    },
    //修改页码
    changePage(state, page) {
        state.page = page;
    }
}
const actions = {
    // 4.list逻辑 
  

    async reqList({ state: { page, size }, commit, dispatch },) {
      
      
        let res = await reqgoodslist({page,size})
        if (res.data.code == 200) {
            var arr = res.data.list ? res.data.list : [];
            // 如果arr是空数组，并且当前不是第1页，这时候应该page--，再请列表
            if (arr.length == 0 && page != 1) {
                commit("changePage", page - 1)
                dispatch("reqList")
                return;
            }
            //修改list
            commit("changeList", arr)
        }
    },
    //请求总数
    async reqTotal({ commit }) {
        let res = await reqgoodscount()
        if (res.data.code === 200) {
            // 修改total 
            commit("changeTotal", res.data.list[0].total)
        }
    },
    // 修改页码
    changePage({ commit, dispatch }, page) {
        //修改页码
        commit("changePage", page);
        // 请求列表
        dispatch("reqList");
    }
}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}


// function fn({ a, b,c:{d,f} }) {
//     let c = a + b;
//     return c;
// }

// fn({ a: 1, b: 2 ,c:{d:1,f:2}})