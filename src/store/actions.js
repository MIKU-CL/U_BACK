export const actions = {
    changeUserInfo(context, userInfo) {
        context.commit("changeUserInfo", userInfo);

        //存本地存储
        if (userInfo.token) {
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        }else{
            //清除本地存储
            sessionStorage.removeItem("userInfo");
        }

    }
}