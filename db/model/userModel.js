const mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    username: {type: String, required: true}, //账号
    password: {type: String, required: true}, //密码
    createtime: {type: Number, required: true}, //用户创建时间
    roleId: {type:Number,default:1}, //用户绑定的角色Id
    userId: {type: Number, default: 1} //用户Id
})

var User = mongoose.model('users', userSchema)

module.exports = User;