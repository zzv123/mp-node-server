const express = require('express')
const router = express.Router()
const User = require('../db/model/userModel')
const {
    setToken,
    getTokenInfo
} = require('../utils/token')
const {
    getCounter
} = require('../utils/counter')
const WXBizDataCrypt = require('../utils/WXBizDataCrypt')
const axios = require('axios')
const config = require('../config/config')

var appId = config.WxOpenAppId
var sessionKey = ''

/**
 * @api {post} /user/register 用户注册
 * @apiName 用户注册
 * @apiGroup User
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": "200",
 *       "msg": "注册成功"
 *     }
 */
router.post('/register', (req, res) => {
    let {
        username,
        password
    } = req.body
    if (!username || !password) return res.send({
        code: 500,
        msg: '缺少参数'
    })
    User.find({
        username
    })
        .then((data) => {
            if (data.length === 0) {
                const createtime = (new Date()).getTime()
                return User.insertMany({
                    username,
                    password,
                    createtime
                })
            } else {
                res.send({
                    code: 500,
                    msg: '用户名已存在'
                })
            }
        })
        .then(() => {
            res.send({
                code: 200,
                msg: '注册成功'
            })
        })
        .catch(() => {
            res.send({
                code: 500,
                msg: '注册失败'
            })
        })
})

/**
 * @api {post} /user/login 用户名密码登录
 * @apiName 用户登录
 * @apiGroup User
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 用户密码
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": "200",
 *       "msg": "登录成功"
 *     }
 */
router.post('/login', function (req, res) {
    let {
        username,
        password
    } = req.body
    if (!username || !password) return res.send({
        code: 500,
        msg: '缺少参数'
    })
    User.find({
        username,
        password
    })
        .then((data) => {
            if (data.length > 0) {
                let token = setToken({
                    login: true,
                    name: username,
                    roleId: data[0].roleId
                })
                res.send({
                    code: 200,
                    msg: '登录成功',
                    token
                })
            } else {
                res.send({
                    code: 500,
                    msg: '账号或密码不正确'
                })
            }
        })
        .catch(() => {
            res.send({
                code: 500,
                msg: '登录失败'
            })
        })
})

/**
 * @api {post} /user/authorize 微信验证授权
 * @apiName 微信验证授权
 * @apiGroup User
 *
 * @apiParam {String} wxCode 小程序授权Code
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": "200",
 *       "msg": "获取授权成功",
 *       "data": "data"
 *     }
 */
router.post('/authorize', function (req, res) {
    console.log(req.body)
    let code = req.body.wxCode
    if (!code) {
        return res.send({
            code: 500,
            msg: '缺少参数'
        })
    } else {
        axios
            .get('https://api.weixin.qq.com/sns/jscode2session?appid=' + config.WxOpenAppId + '&secret=' + config.WxOpenAppSecret + '&js_code=' + code + '&grant_type=authorization_code')
            .then((response) => {
                console.log(response.data);
                if (response.data.errcode) {
                    return res.send({
                        code: 500,
                        msg: '获取授权失败',
                        data: response.data
                    })
                } else {
                    sessionKey = response.data.session_key
                    let token = setToken({
                        session_key: response.data.session_key
                    })
                    return res.send({
                        code: 200,
                        msg: '获取授权成功',
                        data: {
                            openid: response.data.openid,
                            session_key: response.data.session_key,
                            unionid: response.data.unionid,
                            userToken: token
                        }
                    })
                }
            })
            .catch((error) => {
                console.log(error.data);
                return res.send({
                    code: 500,
                    msg: '获取授权失败'
                })
            })
    }
})

/**
 * @api {post} /user/decrypt 解密微信用户手机号
 * @apiName 解密微信用户手机号
 * @apiGroup User
 *
 * @apiParam {String} userToken 用户令牌
 * @apiParam {String} encryptedData 加密数据
 * @apiParam {String} iv iv
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": "200",
 *       "msg": "解密微信用户信息成功",
 *       "data": "data"
 *     }
 */
router.post('/decrypt', function (req, res) {
    console.log(req.body)
    let userToken = req.body.userToken
    let encryptedData = req.body.encryptedData
    let iv = req.body.iv
    if (!userToken || !encryptedData || !iv) {
        return res.send({
            code: 500,
            msg: '缺少参数'
        })
    } else {
        let pc = new WXBizDataCrypt(appId, sessionKey)
        let data = pc.decryptData(encryptedData, iv)
        return res.send({
            "code": "200",
            "msg": "解密微信用户信息成功",
            "data": data
        })
    }
})

module.exports = router