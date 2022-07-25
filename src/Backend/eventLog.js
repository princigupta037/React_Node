

const logEvents = require('./middleware/eventEmitter');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter { };

const myEmitter = new MyEmitter();

myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(()=>{
    myEmitter.emit('log', 'Log Event Emitted!')
},2000);
