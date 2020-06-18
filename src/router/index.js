import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)

// VueRouter原型对象上的push()方法有问题：如果没有指定回调函数，重复传参会报错
// 情况：①如果没有指定回调函数，则需要调用原本的push()后catch()来处理返回的错误的promise（检测如果路径+参数相同就会抛出错误）
// ②如果传入了回调函数，则就没啥问题了，直接调用原本的push()即可
// 解决:①保存原有push对象  ②修改原型上的push方法
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onComplete, onAbort) {
    // ①如果没有指定回调函数，则需要通过catch()来处理返回的错误的promise
    if (!onComplete && !onAbort) {
        // 注意点：①使用call来指定this   ②使用return返回产生的promise对象(在外部处理push()产生的promise对象)
        return originPush.call(this, location).catch(() => { })
    } else { // ②如果传入了回调函数，则就没啥问题了，直接调用原本的push()即可(在内部就把push()产生的promise处理掉了)
        originPush.call(this, location, onComplete, onAbort)
    }
}
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
    if (!onComplete && !onAbort) {
        return originReplace.call(this, location).catch(() => { })
    } else {
        originReplace.call(this, location, onComplete, onAbort)
    }
}



const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) { // to代表目标路由信息对象，from代表当前路由信息对象
        // return 期望滚动到哪个位置
        return { x: 0, y: 0 } // 跳转路由时，滚动条自动滚动到x轴和y轴的起始位置
    }
})


// 注册全局前置守卫(任意路由跳转都能监视到)
// to  目标路由对象
// from 当前路由对象 对应的就是#route
// next 控制路由跳转的函数
    // next()  放行，请求的路由组件才能显示
    // 不执行   不放行，不会跳转到目标路由
    // next(path)   强制跳转到指定路由去

// 功能：只有登录了，才能查看交易/支付/个人中心页面
const checkPaths = ['/trade', '/pay', '/center']

router.beforeEach((to, from, next) => { // 监视的回调函数
    // 得到目标路径
    const targetPath = to.path
    // 判断目标路径是否需要检查 为真则需要坚持、为假则不需要坚持
    // needcheck为布尔值   如果能找到对应的路径(也即!!后面的表达式有返回值)则needCheck为true，如果找不到(也即!!后面的表达式没有返回值)则needCheck为false
    const needCheck = !!checkPaths.find(path => targetPath.indexOf(path) === 0)
    if (needCheck) {
        // 判断如果需要登陆检查的路径
        const token = store.state.users.userInfo.token
        // 已登录，放行
        if (token) {
            next()
        } else {        
            // 如果未登录，强制跳转到login页面，携带上目标路径的redirect query路径
            next('/login?redirect='+targetPath)
        }
    } else {
        // 如果不需要登录检查，直接放行
        next()
    }
})
export default router