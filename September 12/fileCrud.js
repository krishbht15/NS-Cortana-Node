const fs=require('fs');
const pathofNewFile = __dirname+'/crud.txt';

function createFile(){
    fs.writeFileSync(pathofNewFile,'This is the initial message.');
}

function updateFile(data){
    fs.appendFile(pathofNewFile,data,(err)=>{
        if(err) console.log("Error Occurred -",err);
        else console.log("File got updated");
    })
}

function deleteFile(){
    fs.unlinkSync(pathofNewFile);
    console.log("File got deleted")
}
module.exports={createFile,updateFile,deleteFile}


