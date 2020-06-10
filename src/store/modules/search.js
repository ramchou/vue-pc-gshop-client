// 管理搜索模块相关数据的vuex子模块
import { reqProductionList } from '@/api'


export default {
    state: {
        // 包含搜索到的
        productionList: {}
    },
    mutations: { // 当前子模块的mutations
        RECEIVE_PRODUCTION_LIST(state, productionList) {
            state.productionList = productionList
        }
    },
    actions: {// 当前子模块的actions
        async getProductionList({ commit }, searchParams) {
            const result = await reqProductionList(searchParams)
            if (result.code === 200) {
                const productionList = result.data
                commit('RECEIVE_PRODUCTION_LIST', productionList)
            }
        }
    },
    getters: {// 当前子模块的getters
        trademarkList(state) {
            return state.productionList.trademarkList || []
        },
        attrsList(state) {
            return state.productionList.attrsList || []
        }
    }
}