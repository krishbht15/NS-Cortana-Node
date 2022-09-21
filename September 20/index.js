const http=require('http');
const express=require('express');
const { readSync } = require('fs');
const app=express()
const server=http.createServer(app);
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(log)
app.use(cookieParser())
app.post('/login',validatePhoneNumber,middlewareTemp,(req,res)=>{
    const body=req.body;
    console.log('I got this data: ',body.phoneNumber );
    console.log("You have been signedup");
    res.cookie('secret_code','1234');
    res.json({
        message:"Successfully Signed up"
    });
})
app.get('/isLogin',(req,res)=>{
    const cookie=req.cookies
    console.log('cookie is ',cookie)
    if(cookie.secret_code) res.status(200).send({message:"Successful"})
    else res.status(400).send({message:"Something went wrong."})
})
app.get('/random',(req,res)=>{
    console.log('Random request')
    res.send({message:"Successful"})
})
function middlewareTemp(req,res,next){
    console.log("Iam temp")
    next()
}
function validatePhoneNumber(req,res,next){
    const body=req.body;
    if(!body.phoneNumber){
        throw new Error("Phone number is absent.")
    }
    next();
}

function log(req,res,next){
    console.log('path:',req.path,'body:',req.body,'header: ',req.headers);
    next();
}

server.listen(8080,'127.0.0.1',()=>{
    console.log("My  Express server is live.");
})