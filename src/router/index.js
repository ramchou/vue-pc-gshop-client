import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
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



export default new VueRouter({
    mode: 'history',
    routes
})