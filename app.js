// 引入express框架
const express = require('express')
// 引入path模块
const path = require('path')
// 连接数据库
const db = require('./db/connect')
// 引入token
const {verToken} = require('./utils/token')
// 引入跨域解决库cors
const cors = require('cors')
// 引入配置文件
const config = require('./config/config')
// 引入post-body解析
const bodypraser = require('body-parser')
// 引入自定义中间件
const {rizhiMF, notFoundMF, handlerErrorMF} = require("./middleware/middleware")
// 引入时间处理工具函数
const {getCurrentDate} = require("./utils/dateTime")
// 引入路由
const userRouter = require('./router/userRouter')
// 实例化app对象
const app = express()

// 设置允许跨域访问该服务
app.use(cors())
// 解析post body
app.use(bodypraser.urlencoded({extended: true}));
app.use(bodypraser.json())
// 日志中间件
app.use(rizhiMF(path.resolve(__dirname, `./logs/info/${getCurrentDate()}.txt`)))
// 暴漏静态资源
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/', express.static(path.join(__dirname, '/apidoc')))
// 使用路由
app.use('/user', userRouter)

// 404中间件
app.use(notFoundMF(path.resolve(__dirname, "./defaultPages/404.ejs")))
// 错误处理中间件
app.use(handlerErrorMF(path.resolve(__dirname, `./logs/errors/${getCurrentDate()}.txt`), path.resolve(__dirname, "./defaultPages/500.html")))
// 启动应用服务器
const version = config.Version //版本号
const port = config.Port //端口
app.listen(port, function () {
    console.log(`Node服务启动成功，版本号:${version}，服务器地址http://localhost:${port}/`);
})
