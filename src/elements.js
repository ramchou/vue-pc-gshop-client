// element-ui的组件注册

import Vue from 'vue'
import { Pagination, MessageBox, Message } from 'element-ui';

// Vue.component(Button.name, Button); //  Button.name→ el-button
// Vue.component(Select.name, Select); //  Select.name→ el-select
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

// 注册全局组件
Vue.component(Pagination.name, Pagination); //  Select.name→ el-select

// 函数/对象组件
Vue.prototype.$msgbox = MessageBox; // 函数  this.msgbox()  显示对话框
Vue.prototype.$alert = MessageBox.alert; // 方法  this.alert()   $msgbox的包装函数，用来显示alert弹框
Vue.prototype.$confirm = MessageBox.confirm; // 方法 this.$confirm()  $msgbox的包装函数，用来显示confirm弹框
Vue.prototype.$message = Message; // 函数  this.$message()

// 两种UI组件
// 1、标签组件  写对应的标签就产生对应的界面效果
// 2、函数/对象组件  执行函数或者调用对象的方法时就产生对应的效果

