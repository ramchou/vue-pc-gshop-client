import Home from '../pages/Home'
import Search from '../pages/Search'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'

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
        }
    },
    {
        name:'detail',
        path: '/detail/:id',
        component: Detail
    },
    {
        name:'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess
    },
    {
        name:'shopcart',
        path: '/shopcart',
        component: ShopCart
    },

]