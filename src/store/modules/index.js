// 收集所有的vuex模块，并暴露出去

import home from './home'
import users from './users'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'

export default {
    search,
    home,
    users,
    detail,
    shopCart
}