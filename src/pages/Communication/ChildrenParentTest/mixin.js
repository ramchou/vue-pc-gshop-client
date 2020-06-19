export const cpMixin = {// 组件的配置对象
    methods: {
        // 主动给钱
        spendMoney(count) {
            this.money -= count;
        },
        // 给父组件指定数量的钱
        lendToPapa(count) {
            // 更新父组件的钱
            this.$parent.money += count
            // this.$parent.$parent.money += count // 可以往上找多层祖先组件
            // 更新自己的钱
            this.money -= count
        }
    }
}


// 扩展:
// 问题: 多个组件有部分相同的js代码 ?
//     如何实现vue组件中js代码的复用呢 ? 利用vue的mixin技术实现
//         什么时候使用: 当多个组件的JS配置部分有一些相同重复的代码时
// 本质: 实现Vue组件的JS代码复用, 简化编码的一种技术