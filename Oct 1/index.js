const express= require('express');
const app=express();
const url="mongodb://localhost:27017/cortana_db"
const mongoose=require('mongoose')
const UserSchema = require('./UserSchema')
const passport= require('./passportAuth')
const jwt=require('jsonwebtoken')
const secretKey="NewtonSchoolSecretNewtonSchoolSecretNewtonSchoolSecretNewtonSchoolSecret"
passport.initialize()
// app.use(passport.session())    
mongoose.connect(url).then((value)=>{
    console.log("Sucessfully Connected to DB")
}).catch((e)=>{
    console.log('error is -',e)
})

app.use(express.json())
app.post('/register',async(req,res)=>{
    const body=req.body;
    if(!body.name || !body.email || !body.password){
        res.status(400).json({message:"Data is invalid."});
        return;
    }
    const emailAlreadyExists=
    await UserSchema.findOne({email:body.email});
    if(emailAlreadyExists) {
        res.status(400).json(
            {message:"Email is already registered"});
        return;
    }
    await UserSchema.create(body);
    res.status(201).json({message:"Registration is completed"});
    return;
})

app.post('/login',passport.authenticate('local',{session:false}),async(req,res)=>{
        const token= jwt.sign(req.user,secretKey);
        res.json({token});
        return
})

app.get('/crucial-data',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    console.log("Success")
    res.send("Success")
})

app.listen(8080, (err)=>{
    if(err)console.log("Error is",err);
    console.log("Server is up.")
})