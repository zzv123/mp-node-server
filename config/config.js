// Node.js微信服务端配置文件
module.exports = {
    /**
     * 通用配置
     */
    Version: '1.0.20210705', //版本号
    Port: 4321, //端口
    DataBase: 'wxserverdb', //数据库（MongoDB）
    /**
     * 公众号
     */
     WeixinToken: 'WXServer_WeiXin', //应用服务器（开发者服务器）URL对应的Token
     WeixinEncodingAESKey: 'NC2Y948DDfY8m7ZMCe45GnpwKkZJd86wb2DqlTzYFDh', //应用服务器（开发者服务器）URL对应的消息加解密密钥
     WeixinAppId: 'wx7b21d18b83eff6bc', //微信公众号APPID
     WeixinAppSecret: '0987cb50cab0ceae16f1f2a76df55168', //微信AppSecret
     WeixinAppSubscribeMessage: '你好，感谢关注山东顺迪信息科技股份有限公司！', //微信公众号欢迎消息
    /**
     * 小程序
     */
     WxOpenAppId: 'wx8a880a8c44cdd375', //微信小程序APPID
     WxOpenAppSecret: 'dd8c2e99b7d98ed2d6f61dbb896ff0d9', //微信小程序AppSecret
    /**
     * 微信支付
     */
    MchId: '', //微信支付商户号
    APIKey: '', //微信支付密钥
    APIv3Key: '', //微信支付APIv3密钥
}
