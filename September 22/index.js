const express= require('express');
const app=express();
const mongoose=require('mongoose')
const url="mongodb://localhost:27017/cortana_db"
mongoose.connect(url).then((value)=>{
    console.log("Sucessfully Connected to DB")
}).catch((e)=>{
    console.log('error is -',e)
})
const Schema= mongoose.Schema;
const cs=new Schema({
    name:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    }
}, { versionKey: false })
const userDetails=mongoose.model("user_details",cs);
userDetails.create( {
    name:"Krish Bhatia"
}).then((value)=>{
    console.log("Data is - ",value)
}).catch((e)=>{
    console.log("This went wrong - ",e)
})

app.listen(8080, (err)=>{
    if(err)console.log("Error is",err);
    console.log("Server is up.")
})