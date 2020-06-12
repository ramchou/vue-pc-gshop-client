// 收集所有的vuex模块，并暴露出去

import home from './home'
import users from './users'
import search from './search'
import detail from './detail'

export default {
    search,
    home,
    users,
    detail
}