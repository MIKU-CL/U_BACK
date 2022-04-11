import axios from "axios"
import Vue from "vue"
import querystring from "querystring"
import { errorAlert } from "../utils/alert"
import store from "../store"
import router from "../router"

// 1.环境配置
if (process.env.NODE_ENV === "development") {
    Vue.prototype.$pre = "http://localhost:2000"
}
if (process.env.NODE_ENV === "production") {
    Vue.prototype.$pre = ""
}

// 2.请求拦截
axios.interceptors.request.use(config => {
    //每次请求都要执行的逻辑
    if (config.url !== '/api/userLogin') {
        config.headers.authorization = store.getters.userInfo.token
    }
    return config;
})

// 3.响应拦截 
axios.interceptors.response.use(res => {
    // 每次响应都要执行的逻辑
    // 统一打印
    console.group("本次请求地址：" + res.config.url)
    console.log(res);
    console.groupEnd()

    // 错误处理
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }
    //掉线处理
    if(res.data.mag==='登录已过期或访问权限受限'){
        store.dispatch('changeUserInfo',{})
        router.push('/login')
    }
    return res;
})

// 4.封装get 
/**
 * 
 * @param {*} url 请求地址
 * @param {*} params 请求参数,默认值是{}
 * @returns axios()
 * 
 * get("/login",{a:1,b:2})
 */
export const get = (url, params = {}) => {
    return axios({
        url,
        method: "get",
        params
    })
}

/**
 * 
 * @param {*} url 请求地址
 * @param {*} params 请求参数
 * @param {*} haveFile 判断是否有文件，有就传true,没有文件，不用传，默认是false
 * @returns axios()
 */
export const post = (url, params, haveFile = false) => {
    let data = null;
    if (haveFile) {
        // 有文件
        data = new FormData()
        for (let i in params) {
            data.append(i, params[i])
        }
    } else {
        // 无文件
        data = querystring.stringify(params)
    }
    return axios({
        url,
        method: "post",
        data
    })
}


