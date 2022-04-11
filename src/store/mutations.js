export const state={
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{},
}
export const getters={
    userInfo(state){
        return state.userInfo
    },
}
export const mutations={
    changeUserInfo(state,userInfo){
        state.userInfo=userInfo
    }
}