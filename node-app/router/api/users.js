/** 用户登录和注册 */
const express = require('express');
const router = express.Router();
// 加密
const bcrypt = require('bcrypt');
const User = require('./../../models/User');
// token
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar');

const passport = require('passport')
/**
 * $route GET api/users/test
 * desc 返回的请求的json数据
 * access 是否公开的数据
 */
// router.get("/test",(req,res)=>{
//     res.json({msg:"登录成功"})
// })

/**注册 */
router.post('/register',(req,res)=>{
    console.log(req.body)
    // 当获取数据以后，判断数据库中是否存在
    User.findOne({email:req.body.email})
    .then( user => {
        if(user){
            return res.json({msg:'邮箱已被注册！',code:400})
        }else{
            let avatar = gravatar.url(req.body.email, {s: '200', r: 'pg',d:'mm'});
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar, // 使用头像第三方工具 gravatar
                identity:req.body.identity
            })

            // 处理密码加密
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    // 如果加密成功以后
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then( user=>res.json({
                        // user,
                        msg:'注册成功',
                        code:200
                    }))
                    .catch( err=>console.log(err))
                });
            });
        }
    })
})

// 登录接口
router.post('/login',(req,res) =>{
    // 首先获取登录的邮箱，如果数据库没有就提示注册
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    User.findOne({email}).then(user => {
        if(!user){
            return res.json({msg:'用户不存在！',code:400})
        }

        // 密码匹配
        console.log(password,user.password)
        bcrypt.compare(password,user.password)
        .then(isMatch => {
            if(isMatch){
                // 处理token
                // jwt.sign("规则","加密名字","过期时间","箭头函数")
                const rule = {
                    id:user.id,
                    name:user.name,
                    // avatar:user.avatar,
                    // identity:user.identity,
                };
                jwt.sign(rule,'secret',{ expiresIn: 60*60 },(err,token)=>{
                    if(err) throw err;
                    res.json({
                        success:true,
                        token:'Bearer ' + token // Authorization请求头
                    })
                })
                // // 当前密码匹配成功
                // res.json({msg: 'success'});
            }else{
                res.json({msg:'密码错误！',code:400})
            }
        })
    })
})

/** 验证token */
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    // res.json(req.user)
    res.json({
        id:req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity:req.user.identity
    })
})
module.exports = router;