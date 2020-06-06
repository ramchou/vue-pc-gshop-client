import axios from 'axios'
import NProgress  from 'nprogress'
// import { Promise } from 'core-js'

// 1.配置通用的基础路径和超时
// instance 是一个与axios功能类似的ajax请求函数，不是一个实例对象
const instance = axios.create({
    baseURL: '/api', // 设置了代理就直接设置'/api'即可
    // baseURL: 'http://182.92.128.115/api', //不设置代理时需要这样设置baseurl 
    timeout: 15000
})

// 2.显示/隐藏进度条
// 注册请求拦截器
// 在请求拦截器的回调中执行：Nprogress.start()
axios.interceptors.request.use(config => { 
    NProgress.start()
    return config
})
// 注册响应拦截器
// 在请求完成后的成功/失败回调中执行：Nprogress.done()
axios.interceptors.response.use(
    response => { // 请求成功的回调
        NProgress.done()
        // 3.如果请求成功，则返回响应体的data数据，而不是response
        return response.data
    },
    error => { // 请求失败的回调
        NProgress.done()  
        
        // 4.统一处理请求错误
        // 4.1 显示一个统一的提示
        alert(error.message || "未知错误")
        // 4.2 具体的请求可以选择处理或者不处理:抛出错误 或者 返回一个失败的promise对象
        // throw error
        return Promise.reject(error)
    }
)


// 向外暴露的必须是instance，不能是axios
export default instance