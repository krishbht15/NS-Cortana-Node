const fs=require('fs');

function readFullFile(){
    const start=Date.now();
     fs.readFile('./info.txt','utf-8',(err,data)=>{
        console.log('time taken is ',Date.now()-start);
        // console.log('Here is the output =',data)
    })
}
function readFileInParts(){
   const stream= fs.createReadStream('./info.txt','utf-8')
   stream.on('data',(partialInfo)=>{
    // console.log(partialInfo);
    console.log("Partial read",partialInfo.length)
   })
   stream.on('end',()=>{
    console.log("Read Successfully.");
   })
   stream.on('error',(err)=>{
    console.log("Error Occurred -",err);
   })
}

module.exports={readFullFile,readFileInParts}