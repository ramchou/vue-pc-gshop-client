// 管理订单支付相关数据的vuex模块

import { reqTradeInfo, reqPayInfo } from '@/api'

export default {
    state: {
        tradeInfo: {},// 交易信息对象
        payInfo: {} // 支付信息对象
    },
    mutations: {
        RECEIVE_TRADE_INFO(state, { tradeInfo }) {// 这里必须使用解构的写法，取出tradeInfo对象
            state.tradeInfo = tradeInfo
        },
        RECEIVE_PAY_INFO(state, payInfo) {
            state.payInfo = payInfo
        },
    },
    actions: {
        // 请求获取交易信息
        async getTradeInfo({ commit }) {
            const result = await reqTradeInfo()
            if (result.code === 200) {
                const tradeInfo = result.data
                commit('RECEIVE_TRADE_INFO', { tradeInfo })// 提交给mutation的是包含tradeInfo的对象，不一定要使用这种写法
            }
        },

        // 请求获取支付信息
        async getPayInfo({ commit }, orderId) {
            const result = await reqPayInfo(orderId)
            if (result.code === 200) {
                const payInfo = result.data
                commit('RECEIVE_PAY_INFO', payInfo)
            }
        }
    },
    getters: {

    }
}