import { getUserTempId } from '@/utils'
import { saveUserInfo, getUserInfo, removeUserInfo } from '@/utils'
import { reqLogin, reqRegister, reqLogout } from "@/api"

export default {
    state: {
        userInfo: getUserInfo(), // 如果为空则未登录，如果有值则可以实现自动登录
        userTempId: getUserTempId()
    },
    mutations: {
        RECEIVE_USER_INFO(state, userInfo) {
            state.userInfo = userInfo
        },
        RESET_USER_INFO(state) {
            state.userInfo = {}
        }
    },
    actions: {
        // 注册 完成后不用更新state
        async register({ commit }, userInfo) {
            const result = await reqRegister(userInfo)
            if (result.code !== 200) {
                throw new Error(result.message || "注册失败了~")
            }
        },
        // 登陆 需要更新state&并将userInfo保存到localStorage
        async login({ commit }, { mobile, password }) {
            const result = await reqLogin(mobile, password)
            if (result.code === 200) {
                const userInfo = result.data
                commit('RECEIVE_USER_INFO', userInfo)
                // 将userInfo存到localStorage中  来实现自动登录
                saveUserInfo(userInfo)
            } else {
                throw new Error(result.message || "登陆失败了~")
            }
        },
        // 退出登录
        async logout({ commit }) {
            const result = await reqLogout()
            if (result.code === 200) {
                // 清除state中的userInfo
                commit('RESET_USER_INFO')
                // 清除localStorage中保存的userInfo
                removeUserInfo()
            } else {
                throw new Error(result.message || "退出登录失败了~")
            }
        }
    },
    getters: {

    }
}