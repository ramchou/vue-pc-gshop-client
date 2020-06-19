// import Home from '../pages/Home'
// import Search from '../pages/Search'
// import Detail from '../pages/Detail'

// 1.import引入的模块会被拆分出去、单独打包，当访问该路由时才会加载该组件、生成xx.js
// 2.配置的路由组件是一个返回import()的动态打包模块函数，函数只有在请求对应的路径时才会执行，从而请求加载（只有第一次）对应的打包文件
const Home = () => import('../pages/Home')
const Search = () => import('../pages/Search')
const Detail = () => import('../pages/Detail')


import Register from '../pages/Register'
import Login from '../pages/Login'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'

import Trade from '@/pages/Trade'
import Center from '@/pages/Center'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import MyOrder from '@/pages/Center/MyOrder'
import GroupBuy from '@/pages/Center/GroupBuy'

import store from '@/store'

export default [
    {
        path: '/',
        component: Home
    },
    {
        name: "search",
        path: '/search/:keyword?',
        component: Search,
        // 将路由参数映射成props传递给路由组件对象
        props: route => ({
            keyword3: route.params.keyword,
            keyword4: route.query.keyword2
        })
    },
    {
        path: '/register',
        component: Register,
        meta: {
            isHideFooter: true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isHideFooter: true
        },
        // 只有未登录状态下才能看到登录页面
        // beforeEnter: (to, from, next) => {
        //     const token = store.state.users.userInfo.token
        //     if (token) {
        //         // 如果已经登录，强制跳转到首页
        //         next('/')
        //     } else {
        //         next()
        //     }
        // }
    },
    {
        name: 'detail',
        path: '/detail/:id',
        component: Detail
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        // 只有携带skuNum以及seaaionStorage中有skuInfo数据时，才能查看添加购物车成功的页面
        beforeEnter: (to, from, next) => {
            // query参数skuNum
            const skuNum = to.query.skuNum
            // sessionStorage中有skuInfo参数
            const skuInfo = JSON.parse(window.sessionStorage.getItem("SKU_INFO_KEY"));
            if (skuNum && skuInfo instanceof Object) {
                next()
            } else {
                next('/shopcart')
            }
        }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart
    },
    {
        path: '/trade',
        component: Trade,
        // 只有从购物车页面跳转过来才放行
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopcart') {
                next()
            } else {
                next('/shopcart')
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        // 只有从trade页面跳转过来才放行
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else {
                next('/trade')
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        // 只有从pay页面跳转过来才放行
        beforeEnter: (to, from, next) => {
            if (from.path === '/pay') {
                next()
            } else {
                next('/pay')
            }
        }
    },
    {
        path: '/center',
        component: Center,
        children: [
            {
                path: '/center/myorder',
                component: MyOrder
            },
            {
                path: 'groupbuy',
                component: GroupBuy
            },
            {
                path: '',
                redirect: '/center/myorder'
            }
        ]
    },




    {
        path: '/communication',
        component: () => import('@/pages/Communication/Communication'),
        children: [
            {
                path: 'event',
                component: () => import('@/pages/Communication/EventTest/EventTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'model',
                component: () => import('@/pages/Communication/ModelTest/ModelTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'sync',
                component: () => import('@/pages/Communication/SyncTest/SyncTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'attrs-listeners',
                component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'children-parent',
                component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
                meta: {
                    isHideFooter: true
                },
            },
            {
                path: 'scope-slot',
                component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
                meta: {
                    isHideFooter: true
                },
            }
        ],
    },
]

