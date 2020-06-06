import { reqCategories } from '@/api'


export default {
    state: {
        categoryList: []
    },
    mutations: { // 当前子模块的mutations

        // 接收保存分类列表的mutations
        RECEIVE_CATEGORY_LIST(state, categoryList) {
            state.categoryList = categoryList
        }

    },
    actions: {// 当前子模块的actions
        // 请求获取分类列表的异步action
        async getCategoryList({ commit }) {
            // 调用接口请求函数发异步ajax请求
            const result = await reqCategories()
            console.log(result);
            
            // 请求成功后，取出响应数据提交给mutations保存，保存到state中去
            if (result.code === 200) {
                const categoryList = result.data.filter((item, index) => index < 15)
                commit('RECEIVE_CATEGORY_LIST', categoryList)
            }
        }



    },
    getters: {// 当前子模块的getters

    }
}