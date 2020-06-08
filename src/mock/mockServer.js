// 使用mockjs模拟mock接口
import Mock from "mockjs"
import banners from './banners.json' // 引入的是json文件(json数组)，得到的是对应的js数组(会自动给解析)
import floors from "./floors.json"


// 模拟返回banners数据接口
Mock.mock('/mock/banners', { code: 200, data: banners })

// 模拟返回floors数据接口
Mock.mock('/mock/floors', { code: 200, data: floors })

// 不需要写暴露的代码
// 只要加载运行一次，这个文件就可以被访问了(在main.js中引入即可)