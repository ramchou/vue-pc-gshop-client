// 包含项目中所有接口的ajax请求函数
// 函数需要返回一个promise，函数内部调用ajax模块发送请求
// 根据接口文档，定义接口请求

import ajax from './ajax'

// 定义登录接口
export function reqLogin(mobile, password) {
    // 将ajax当函数使用
    // return ajax({ // 返回promise
    //     method: 'POST',
    //     url: '/user/passport/login',
    //     data: { mobile, password }
    // })

    // 将ajax当对象使用
    return ajax.post('/user/passport/login', { mobile, password })
}


// 定义首页三级分类
export const reqCategories = () => ajax('/product/getBaseCategoryList')
