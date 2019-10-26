const mongoose = require('mongoose');
const config = require('../config.json')
// Should this eventually become a singleton class?

//export this function and imported by server.js
module.exports = (function(){
  try {
    mongoose.connect('mongodb://'+config.db_addr+':'+config.db_port+'/test', { 
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });
    
    mongoose.connection.on('error', console.error.bind(console, 'connection error'))

    mongoose.connection.on('connected', function() {
      console.log("Mongoose connected");
    });

    mongoose.connection.on('disconnected', function(){
      console.log("Mongoose default connection is disconnected");
    });

    // process.on('SIGINT', function(){
    //   mongoose.connection.close(function(){
    //       console.log(termination("Mongoose default connection is disconnected due to application termination"));
    //       process.exit(0)
    //   });
    // });

    return mongoose;
  } catch (error) {
    console.error(error);
    return false;
  }
})()