const expres=require('express')
const route=expres.Router()
const user=require('./model')

route.get('/:id',async(req,res)=>{
    const {id}=req.params
    try{
        const ans=await user.findById(id)
        res.send(ans)
    }
    catch(err){
        console.log(err)

    }

})
module.exports=route