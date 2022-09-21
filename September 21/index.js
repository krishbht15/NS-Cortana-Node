const express= require('express');
const app=express();
// const homeRouter=express.Router();
// const portfolioRouter=express.Router()
app.set('views','./viewss');
app.set('view engine','ejs');
app.use('/',require('./home/index'))
app.use('/',require('./portfolio/index'))
app.get('/',(req,res,next)=>{
    console.log('second')
    // res.send({message:"Success 2"})
    next()
})
app.get('/',(req,res)=>{
    console.log("first");
    res.send({message:"Success"});
})

app.listen(8080, (err)=>{
    if(err)console.log("Error is",err);
    console.log("Server is up.")
})