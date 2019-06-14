const express = require('express');
const router = express.Router();
// 引入数据列表
const Infos = require('./../../models/Info');

const jwt = require('jsonwebtoken')
const passport = require('passport')

// 获取列表数据
router.get('/list',passport.authenticate('jwt',{session:false}),(req,res)=>{
    // 获取当前列表
    Infos.find().then( data => {
        if(data){
            return res.status(200).json(data)
        }
        res.json.status(404).json('没有任何内容')
        
    }).catch(err=>{
        res.status(404).json(err)
    })
})

// 获取d单个数据
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    // 获取当前列表
    Infos.findOne({_id:req.params.id}).then( data => {
        if(data){
            return res.status(200).json(data)
        }
        res.json.status(404).json('没有任何内容')
        
    }).catch(err=>{
        res.status(404).json(err)
    })
})

// 添加
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res)=>{
const info = {};
if(req.body.type) info.type = req.body.type;
if(req.body.describe) info.describe = req.body.describe;
if(req.body.income) info.income = req.body.income;
if(req.body.expend) info.expend = req.body.expend;
if(req.body.cash) info.cash = req.body.cash;
if(req.body.remark) info.remark = req.body.remark;
   new Infos(info).save().then( info =>{
    res.status(200).json('成功！');
   })
   .catch(err => {console.log(err)})
})
// 编辑
router.post('/edit/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
//    获取发生改变的数据；更新数据库 
const info = {};
if(req.body.type) info.type = req.body.type;
if(req.body.describe) info.describe = req.body.describe;
if(req.body.income) info.income = req.body.income;
if(req.body.expend) info.expend = req.body.expend;
if(req.body.cash) info.cash = req.body.cash;
if(req.body.remark) info.remark = req.body.remark;
Infos.findOneAndUpdate(
    {_id: req.params.id},
    {$set:info},
    {new:true} // 新的东西
    ).then(data=>{
        if(data){
           return res.status(200).json('成功')
        }
        res.status(404).json('当前数据不存在！')
    }).catch(err=>{
        res.status(404).json(err)
    })
})
// 删除
router.post('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    //    获取id
    const _id = req.params.id;
    Infos.findByIdAndRemove({_id}).then(data=>{
        data.save().then(data=>{
            if(data){
                return res.status(200).json('成功')
            }
            res.status(404).json('当前数据不存在！')
        })
       
    }).catch(err=>{
        res.status(404).json(err)
    })
})


module.exports = router;