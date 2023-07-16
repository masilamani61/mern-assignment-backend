const express= require('express')
const mongoose=require('mongoose')
const userroute=require('./useroute')
const userid=require('./userid')
const bodyparser=require('body-parser')
const cors=require('cors')
const app=express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors())
var connectionn='mongodb://127.0.0.1:27017/user'
mongoose.connect(connectionn).then(()=>{
    console.log('connected')
})


app.get('/',(req,res)=>[
     res.send('running')
])
app.use('/user',userroute)
app.use('/userid',userid)

app.listen(5000,()=>{console.log('running')})