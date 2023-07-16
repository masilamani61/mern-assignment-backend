const express=require('express')
const route=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const user=require('./model')
const bodyParser = require('body-parser')


route.post('/create',async(req,res)=>{
    const {name,password,email}=req.body
    console.log(password)
    const saltround=10
    if (password){
    bcrypt.hash(password,saltround).then(async(hash)=>{
        try{
            const ans=new user({
                name,password:hash,email
            })
            await ans.save()
            let token
        try{
            token=jwt.sign({name,password:hash},'secretkey',{expiresIn:'5days'})
            res.send({data:{name:ans.name,id:ans._id},token})

        }
        catch(err){
            console.log(err)
        }
            
        }
        catch(err){
            console.log(err)
        }
        
    })  }
})

route.put('/update/:id',async(req,res)=>{
    const {name,email}=req.body
    const {id}=req.params
    try{
        const ans=await user.findById(id)
        if (ans){
            ans.name=name
            ans.email=email
            await ans.save()
            try{
                token=jwt.sign({name,password:ans.password},'secretkey',{expiresIn:'5days'})
                res.send({data:{name:ans.name,id:ans._id},token})
    
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            res.send('no user found')
        }
    
    }
    catch(err){
        res.send(err)
    }


})
route.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params
    try{
    const ans=await user.findByIdAndDelete(id)
    if (ans){
        res.send('id deleted')
    }
    else{
        res.send('no user found')
    }
    }
    catch{

    }
})
route.get('/alluser',async(req,res)=>{
    const pagelimit=5
    const page=req.query.page || 1
    const key=req.query.key 
    try{
    const name=(key!=='undefined') ?{name:{$regex:key,$options:'i'}}:{}
    console.log(name,key)
    const num=await user.countDocuments({...name})
   
    const ans=await user.find({...name}).limit(pagelimit).skip(pagelimit*(page-1))
    res.send({user:ans,count:Math.ceil(num/pagelimit)})
}
    catch(err){
        console.log(err)
    }
})


module.exports=route