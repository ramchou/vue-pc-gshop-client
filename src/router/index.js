import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Home from '../pages/Home'
import Search from '../pages/Search'
import Register from '../pages/Register'
import Login from '../pages/Login'
export default new VueRouter({
    mode:'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/login',
            component: Login
        }
    ]
})