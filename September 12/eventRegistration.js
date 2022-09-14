const EventEmitter= require('events');
const eventEmitterObject=new EventEmitter();

function registerEvent(eventName){
    console.log('Registering',eventName)
    eventEmitterObject.on(eventName,()=>{
        console.log(eventName,' is triggered.');
    })
}

module.exports={registerEvent,eventEmitterObject};