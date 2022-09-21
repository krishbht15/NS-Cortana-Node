const express= require('express');
const app=express();
const ejs=require('ejs');

app.get('/food',(req,res)=>{
    ejs.renderFile('./food.ejs',null,null,(err,ejsFile)=>{
        if(err){
            console.log("error is",err)
        }else{
            res.send(ejsFile)
        }
    })
})

app.listen(8080, (err)=>{
    if(err)console.log("Error is",err);
    console.log("Server is up.")
})