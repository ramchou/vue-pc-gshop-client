import { reqCartList, reqAddToCart, reqCheckCartItem, reqDeleteCartItem } from '@/api'

export default {
    state: {
        cartList: [] // 购物车列表项
    },
    mutations: {
        RECEIVE_CART_LIST(state, cartList) {
            state.cartList = cartList
        }
    },
    actions: {
        // 获取购物车列表
        async getCartList({ commit }) {
            const result = await reqCartList()
            if (result.code === 200) {
                const cartList = result.data
                commit('RECEIVE_CART_LIST', cartList)
            }
        },
        // 添加到购物车
        // 方法一对应的发请求方式
        // async addToCart({ commit }, { skuId, skuNum, callback }) {
        //     const result = await reqAddToCart(skuId, skuNum)
        //     if (result.code === 200) {
        //         callback()
        //     } else {
        //         callback('添加到购物车失败了~')
        //     }
        // }
        // 方法二对应的请求方式
        // async函数执行的返回值是一个promise，且promise的结果由函数体的结果决定
        async addToCart({ commit }, { skuId, skuNum }) {
            const result = await reqAddToCart(skuId, skuNum)
            if (result.code !== 200) { // 如果请求失败，则抛出错误（如果请求成功则不做处理）
                throw new Error("添加到购物车失败了~") // actions函数的promise失败了，value为：添加到购物车失败了~
            }
        }

    },
    getters: {

    }
}