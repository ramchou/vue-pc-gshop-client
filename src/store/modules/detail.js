import { reqDetailInfo } from '@/api'

export default {
    state: {
        detailInfo: {}
    },
    mutations: {
        RECEIVE_DETAIL_INFO(state, detailInfo) {
            state.detailInfo = detailInfo
        }
    },
    actions: {
        async getDetailInfo({ commit }, skuId) {
            const result = await reqDetailInfo(skuId)
            if (result.code === 200) {
                const detailInfo = result.data
                commit('RECEIVE_DETAIL_INFO', detailInfo)
            }
        }
    },
    getters: {
        // 包含3个分类名称的对象
        categoryView(state) {
            return state.detailInfo.categoryView ? state.detailInfo.categoryView : {}
        },

        // 包含商品信息对象
        skuInfo(state) {
            return state.detailInfo.skuInfo ? state.detailInfo.skuInfo : {}
        },
        // 商品筛选条件信息
        spuSaleAttrList(state) { 
            return state.detailInfo.spuSaleAttrList ? state.detailInfo.spuSaleAttrList : {}
        },
        // 商品图片列表
        skuImageList(state) { 
            const skuInfo = state.detailInfo.skuInfo
            return skuInfo ? skuInfo.skuImageList : []
        }
    }
}