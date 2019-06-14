const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const passport = require('passport');
// 实例化app
const app = express();
// 引入user.jd
const users = require('./router/api/users');
const infos = require('./router/api/infos');

// 链接数据库
const db = require('./config/index').mongoURI;
mongoose.set('useFindAndModify', false);
mongoose.connect(db).then(()=>{
    console.log('链接成功')
}).catch(err=>{
    console.log(err,'鏈接失敗');
})


// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// passport初始化
app.use(passport.initialize());

// 配置passport
require ('./config/passport')(passport);
// 使用routes
app.use('/api/users',users);
app.use('/api/infos',infos);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server run http://localhost:${port}`)
    
})