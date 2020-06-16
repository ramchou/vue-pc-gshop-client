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
        },

        // 是否勾选购物车的某个商品项
        async checkCartItem({ commit }, { skuId, isChecked }) {
            const result = await reqCheckCartItem(skuId, isChecked)
            if (result.code !== 200) {
                throw new Error(result.message || "勾选失败了~")
            }
        },

        // 全选按钮的设置  是否被勾选→checked为布尔值
        // 1.如果商品项的勾选状态与全选按钮的勾选状态一致，则不操作它，如果与全选按钮状态不一致，则发请求改变其状态
        // 2.针对每个需要发请求的item商品项去触发checkCartItem调用  dispatch
        // 3.content对象中包含dispatch方法
        // 4.Promise.all
        async checkAllCartItems({ commit, dispatch, state }, checked) {
            // 确定全选按钮的状态
            const isChecked = checked ? '1' : '0'

            let promises = []
            // 遍历每个商品项
            state.cartList.forEach(item => {
                // 判断商品项的状态是否与全选按钮一致  不一致则发请求
                if (item.isChecked !== isChecked * 1) {
                    // 分发给checkCartItem，保存其返回的promise对象
                    const promise = dispatch('checkCartItem', { skuId: item.skuId, isChecked })
                    // 保存到数组中
                    promises.push(promise)
                }
            })
            // 此时请求已经发出去了
            // 返回一个promise对象
            return Promise.all(promises)
        },

        // 删除某个商品项
        async deleteCartItem({ commit }, skuId) {
            const result = await reqDeleteCartItem(skuId)
            if (result.code !== 200) {
                throw new Error(result.message || "删除失败了~")
            }
        },
        // 删除选中商品项
        async deleteChecked({ commit, dispatch, state }) {
            let promises = []
            state.cartList.forEach(item => {
                if (item.isChecked !== 0) {
                    const promise = dispatch('deleteCartItem', item.skuId)
                    promises.push(promise)
                }
            })
            return Promise.all(promises)
        }


    },
    getters: {
        // 选中的总数量
        totalCount(state) {
            // reduce() 
            return state.cartList.reduce((preTotal, item, index) => preTotal + (item.isChecked === 1 ? item.skuNum : 0), 0)
        },
        // 选中商品的总价格
        totalPrice(state) {
            return state.cartList.reduce((pre, item) => pre + (item.isChecked === 1 ? item.skuNum : 0) * item.cartPrice, 0)
        },

        // 是否全部选中
        isAllChecked(state) {
            // every()  如果每个都被选中了才返回true
            return state.cartList.length > 0 && state.cartList.every(item => item.isChecked === 1)
        }

    }
}