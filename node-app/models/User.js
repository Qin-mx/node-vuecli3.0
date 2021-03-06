const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建一个模型
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        
    },
    date:{
        type: Date,
        default: Date.now // 当前时间
    },
    identity:{
        type:Number, // 默认是管理员
        required: true
    }
    
})

module.exports = User = mongoose.model('users',UserSchema);