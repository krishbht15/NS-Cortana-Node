const express= require('express');
const router=express.Router();

router.get('/home',(req,res)=>{
    res.render('home')
    res.end()
})
router.get('/promise',(req,res)=>{
    console.log('This is a promise request.')
    const p=new Promise((resolve,reject)=>{
        console.log("Promise has initiated.")
        setTimeout( reject,5000);
    })
    p.then(()=>{
        console.log("Promise Completed")
        res.status(200).send({message:"Promise Completed"})
    }).catch(()=>{
        console.log("Something went wrong")
        res.status(400).send({message:"Something went wrong"})
    })
})

router.get('/async-await',async (req,res)=>{
    const data=await timeConsumingProcess()
    console.log("Data is",data)
   res.send( data);
})

async function timeConsumingProcess(){
     return new Promise((resolve,reject)=>{
        setTimeout(resolve,4000);
    }).then(()=>{
        return "Everything went well."
    })
}
module.exports=router