import { reqCategories, reqBanners, reqFloors, reqRecommends } from '@/api'


export default {
    state: {
        categoryList: [],
        banners: [], // 广告轮播列表数据
        floors: [],  // 楼层轮播列表数据
        recommends: {}  // 今日推荐
    },
    mutations: { // 当前子模块的mutations

        // 接收保存分类列表的mutations
        RECEIVE_CATEGORY_LIST(state, categoryList) {
            state.categoryList = categoryList
        },

        // 接收保存广告轮播列表的mutations
        RECEIVE_BANNERS(state, banners) {
            state.banners = banners
        },

        // 接收保存楼层轮播列表的mutations
        RECEIVE_FLOORS(state, floors) {
            state.floors = floors
        },

        // 今日推荐
        RECEIVE_RECOMMENDS(state, recommends) {
            state.recommends = recommends
        }

    },
    actions: {// 当前子模块的actions
        // 请求获取分类列表的异步action
        async getCategoryList({ commit }) {
            // 调用接口请求函数发异步ajax请求
            const result = await reqCategories()
            // console.log(result);

            // 请求成功后，取出响应数据提交给mutations保存，保存到state中去
            if (result.code === 200) {
                const categoryList = result.data.filter((item, index) => index < 15)
                commit('RECEIVE_CATEGORY_LIST', categoryList)
            }
        },

        // 请求获取广告轮播列表的异步actions
        async getBanners({ commit }) {
            const result = await reqBanners()
            if (result.code === 200) {
                const banners = result.data
                commit('RECEIVE_BANNERS', banners)
            }
        },
        // 请求获取楼层轮播列表的异步actions
        async getFloors({ commit }) {
            const result = await reqFloors()
            if (result.code === 200) {
                const floors = result.data
                commit('RECEIVE_FLOORS', floors)
            }
        },


        // 今日推荐
        async getRecommends({ commit }) {
            const result = await reqRecommends()
            if (result.code === 200) {
                const recommends = result.data
                commit('RECEIVE_RECOMMENDS', recommends)
            }
        }



    },
    getters: {// 当前子模块的getters

    }
}