const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    }
})

const usermodel=mongoose.model('user',userschema)

module.exports=usermodel