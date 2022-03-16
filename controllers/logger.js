const path = require("path");
const bunyan = require("bunyan");


// favour using env variables to provide your code with external configs
// it makes it a lot simpler when you want to change the configs
//const level = process.env.NODE_LOGGING_LEVEL || "info";

exports.log = bunyan.createLogger({
  name:'Request Log',
  streams: [{
          level: 'info',
          path: path.resolve(__dirname, "..", "logs.json")
      }]


});

