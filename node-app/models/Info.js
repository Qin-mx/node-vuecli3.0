const   mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建一个模型
const InfoSchema = new Schema({
    type:{
        type: String,
        require:true,
    },
    describe:{
        type: String,
    },
    income:{
        type: String,
        required: true
    },
    expend:{
        type: String, // 支出
        required: true
    },
    cash:{
        type: String, 
        required: true
    },
    remark:{
        type: String, 
    },
    date:{
        type: Date,
        default: Date.now // 当前时间
    },
})

module.exports = Infos = mongoose.model('infos',InfoSchema);