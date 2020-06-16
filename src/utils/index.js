// 包含一些工具函数的模块

import { v4 as uuidv4 } from 'uuid'


// 得到一个用户临时ID
// 1.从localStorage中读取，如果有则返回结果 
export function getUserTempId() {
    let userTempId = localStorage.getItem("USER_TEMP_ID_KEY")
    // 2.如果没有，则使用uuid生成一个新的，保存到localStorage中并返回
    if (!userTempId) {
        userTempId = uuidv4()
        localStorage.setItem('USER_TEMP_ID_KEY', userTempId)
    }
    return userTempId
}


// 保存用户信息到localStorage中
export function saveUserInfo(userInfo) {
    localStorage.setItem('USER_INFO_KEY', JSON.stringify(userInfo))
}
// 读取localStorage中保存的用户信息 返回userInfo对象或者空对象
export function getUserInfo() {
    return JSON.parse(localStorage.getItem('USER_INFO_KEY')) || {}
}
//删除localStorage中保存的用户信息
export function removeUserInfo() {
    localStorage.removeItem('USER_INFO_KEY')
}
