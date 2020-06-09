import Vue from 'vue'
import Vuex from 'vuex'
// import home from './modules/home'
// import users from './modules/users'
// import search from './modules/search'
import modules from './modules/index'
Vue.use(Vuex)


// const state = {}
const mutations = {

}
const actions = {

}

const getters = {

}


export default new Vuex.Store({
    // state, // state一般不用
    mutations, // 总的mutations
    actions, // 总的actions
    getters, // 总的getters
    // modules: {// 指定vuex管理所有子模块
    //     home: home, // 标识名称:子模块
    //     users,
    //     search
    // }
    modules
})

// vue管理的总state的结构：（是个对象）
// {
//     home: {
//         categoryList: [], // 分类列表
//             xxx: { },
//         yyy: 'atguigu'
//     }
//     user: {
//         userInfo: { }
//     }
// }