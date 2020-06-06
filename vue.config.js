module.exports = {
    // linkOnSave: false,
    linkOnSave:'warning', 

    devServer: {
        proxy: {
            '/api': {
                target: 'http://182.92.128.115',
                changeOrigin: true, // 支持跨域
                // pathRewrite: { // 如果后台接口没有/api就需要加上这条设置
                //     '^/api':''
                // }
            }
        }
    }
}