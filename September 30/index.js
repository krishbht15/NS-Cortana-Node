const express= require('express');
const app=express();
const url="mongodb://localhost:27017/cortana_db"
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const tokenVerification=require('./tokenVerification')
mongoose.connect(url).then((value)=>{
    console.log("Sucessfully Connected to DB")
}).catch((e)=>{
    console.log('error is -',e)
})
const UserSchema=require('./UserSchema');
const secretKey="NewtonSchoolSecretNewtonSchoolSecretNewtonSchoolSecretNewtonSchoolSecret"
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
    body.password=await bcrypt.hash(body.password,6)
    await UserSchema.create(body);
    res.status(201).json({message:"Registration is completed"});
    return;
})

app.post('/login',async(req,res)=>{
    const body=req.body
    if(!body.email || !body.password){
        res.status(400).json({message:"Login Data is invalid."});
        return;
    }
    const isUserExists= 
        await UserSchema.findOne({email:body.email});
    if(!isUserExists){
        res.status(404).json({message:"User not found"});
        return;
    }
    const isPasswordCorrect=
    await bcrypt.compare(body.password,isUserExists.password)
    if(!isPasswordCorrect){
        res.status(401).json(
            {message:"Username/Password is incorrect"});
        return;
    }
    const userToken= jwt.sign({email:body.email},secretKey,{expiresIn:"1d"});
    res.status(200).json({token:userToken})
})

app.get('/crucial-data',tokenVerification,async(req,res)=>{
    console.log("Verification completed")
    res.json({message:"Verification Completed"})
})

app.listen(8080, (err)=>{
    if(err)console.log("Error is",err);
    console.log("Server is up.")
})