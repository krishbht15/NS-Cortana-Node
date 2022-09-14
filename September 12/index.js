//  const EventEmitter= require('events');
//  const eventEmitterObject=new EventEmitter();
 const {registerEvent,eventEmitterObject}=require('./eventRegistration');
 const {readFullFile,readFileInParts}=require('./streams')
 const {createFile,updateFile,deleteFile}=require('./fileCrud')
// import {createFile,updateFile,deleteFile} from './fileCrud'
 registerEvent('newEvent');
 eventEmitterObject.emit('newEvent');
//  readFullFile()
// readFileInParts();
// createFile();
// updateFile("\nThis is a new data");
// deleteFile();
