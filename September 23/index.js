const express= require('express');
const app=express();
const mongoose=require('mongoose')
const url="mongodb://localhost:27017/cortana_db"
mongoose.connect(url).then((value)=>{
    console.log("Sucessfully Connected to DB")
}).catch((e)=>{
    console.log('error is -',e)
})
const Schema=mongoose.Schema
const cs=new Schema({
    NAME:{
        type:String
    },
    SUBJECT:{
        type:String
    },
    MARKS:{
        type:Number
    },
    IS_DELETED:{
        type:Boolean,
        default:false
    }
}, { versionKey: false })
const marksSchema=mongoose.model('marks',cs);

const rateLimiter=require('express-rate-limit')
const apiLimiter=rateLimiter({
    max:5,
    windowMs:20000,
    message:"Please try again later."
})

app.use(express.json())
app.use(apiLimiter)

app.get('/marks',async(req,res)=>{
    const id=req.query.id
    if(id){
        const marks=await marksSchema.findById(id)
        res.status(200).json(marks)
        return;
    }
    const marks=await marksSchema.find()
    res.status(200).json(marks)
    return;
})

app.post('/marks-with-filters',async(req,res)=>{
    const body=req.body;
    console.log(body)
    if(body.NAME || body.MARKS || body.SUBJECT){
        console.log('using body')
        const marks=await marksSchema.find(body)
        res.status(200).json(marks)
        return;
    }
    res.status(400).json({message:"Filter not found"})
    return;
})

app.post('/add-marks',async(req,res)=>{
    const body=req.body;
    console.log('Incoming data is ',body)
    if(!body.NAME || !body.MARKS || !body.SUBJECT){
        res.status(400).json({message:"Data is invalid"})
        return;
    }
    await marksSchema.create(body);
    res.status(201).json({message:"Data Successfully Created"})
})

app.put('/update-marks',async(req,res)=>{
    const body=req.body;
    console.log('/update-marks has this ',body)
    if(!body.id){
        res.status(400).json({message:"ID is absent"})
        return;
    }
    const id=body.id;
    const updatedMarskEntity = await marksSchema.findByIdAndUpdate(id,body)
    if(!updatedMarskEntity){
        res.status(400).json({message:"entity is not present into DB"})
        return;
    }
    res.status(200).json({message:"Data Successfully Updated"});
    return;
})

app.delete('/delete',async(req,res)=>{
    const id=req.query.id;
    if(!id){
        res.status(404).json({message:"Id is not present in body"})
        return;
    }
    console.log("Deletion for this id: ",id)
    const deletedEntity=await marksSchema.findByIdAndDelete(id);
    if(!deletedEntity){
        res.status(400).json({message:"entity is not present into DB"})
        return;
    }
    res.status(200).json(deletedEntity);
})

app.delete('/delete-soft',async(req,res)=>{
    const id=req.query.id;
    if(!id){
        res.status(404).json({message:"Id is not present in body"})
        return;
    }
    console.log("Deletion for this id: ",id)
    const updatedEntity=await marksSchema.findByIdAndUpdate(id,{IS_DELETED:true})
    res.status(200).json({message:"Data got deleted"});
})

app.get('/marks-pages',async(req,res)=>{
    const page_num=req.query.page_num;
    if(!page_num){
        res.status(400).json({message:"Page Number is required."});
        return;
    }
    const marks= await marksSchema.find().limit(10).skip((page_num-1)*10).exec()
    if(marks.length===0){
        res.status(400).json({message:"Page number is invalid"});
        return;
    }
    const total_records=await marksSchema.count()
    res.json({total_records,marks})
 })


app.listen(8080, (err)=>{
    if(err)console.log("Error is",err);
    console.log("Server is up.")
})