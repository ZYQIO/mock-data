const Mock = require('mockjs');

const express = require('express');

const app = express();

// 根据传入的参数 num, 生成 num 条模拟的数据列表
function generatorList(num) {
    return Mock.mock({
        [`list|${num}`]: [{
            // 模拟 id , 自增方式增加
            'id|+1': 1,
            // 模拟标题, 中文字符串长度为 15 位到 25 位
            title: "@ctitle(15,25)",
            // 模拟图片索引, 自然数从0 到 15
            image: "@natural(0,15)",
            // 模拟访问人数, 自然数从0 到 99999
            reads: "@natural(0,99999)",
            // 模拟新闻来源, 中文字符串长度为 3 到 10 位
            from: "@ctitle(3,10)",
            // 模拟发布时间, 时间格式
            date: "@date('yyyy-MM-dd')"

        }]
    })
}

// 允许跨域请求返回数据
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // 设置允许来自哪里的跨域请求访问（req.headers.origin为当前访问来源的域名与端口）
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"); // 设置允许接收的请求类型
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); // 设置请求头中允许携带的参数
    res.header("Access-Control-Allow-Headers", "Content-Type"); // 设置请求头中允许携带的参数
    next();
})

// 获取路由并返回数据
app.get('/', function (req, res) {
    
    return res.send(generatorList(10));

})

// 获取路由并返回数据
app.get('/data', function (req, res) {
    
    // 获取 get 请求数据参数 num
    const { num } = req.query;

    return res.send(generatorList(num));

})


// 设置端口
app.listen('3000', function () {
    console.log('运行在 http://localhost:3000/data?num=请求数量');
})


