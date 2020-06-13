// 包含项目中所有接口的ajax请求函数
// 函数需要返回一个promise，函数内部调用ajax模块发送请求
// 根据接口文档，定义接口请求

import ajax from './ajax'
import mockAjax from './mockAjax'

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

// 定义访问mock接口的接口请求函数
export const reqBanners = () => mockAjax('/banners')
export const reqFloors = () => mockAjax('/floors')
export const reqRecommends = () => mockAjax('/recommends')

// 获取商品列表
// searchParams 包含所有需要传递的搜索参数的对象
export const reqProductionList = (searchParams) => ajax.post('/list', searchParams)

// 获取商品详情信息
export const reqDetailInfo = (skuId) => ajax(`/item/${skuId}`)


// 获取购物车列表
export const reqCartList = () => ajax(`/cart/cartlist`)
// 添加到购物车
export const reqAddToCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
// 切换商品选中状态  skuID:商品ID   isChecked:商品选中状态，'0'不选中，'1'选中
export const reqCheckCartItem = (skuID, isChecked) => ajax.post(`/cart/checkCart/${skuID}/${isChecked}`)
// 删除某个商品项
export const reqDeleteCartItem = (skuId) => ajax.post(`/cart/deleteCart/${skuId}`)
