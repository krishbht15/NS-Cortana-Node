const UserSchema=require('./UserSchema');
const jwt=require('jsonwebtoken');
const secretKey="NewtonSchoolSecretNewtonSchoolSecretNewtonSchoolSecretNewtonSchoolSecret"

const verifyToken=(req,res,next)=>{
    const token= req.headers.authorization;
    if(!token){
        res.status(401).json({message:"Token is absent"})
        return;
    }
   try{ const isVerified=jwt.verify(token,secretKey);
    if(!isVerified.email){
        res.status(401).json({message:"Authentication failed"})
        return;
    }
    req.userEmail=isVerified.email;
    next();
    }catch(err){
        console.log(err);
        res.status(401).json({message:"Authentication failed"})
        return;
    }
}
module.exports=verifyToken;