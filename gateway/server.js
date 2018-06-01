const express = require("express")
const bodyParser = require("body-parser-json")
const mongoose = require('mongoose');

server = express()
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}));

// fire up server
server.listen(3000, console.log('Gateway service is now up on port 3000'))

// require the main routes function passing the server as argument
require("./routes")(server)

// connect to the mongodb
mongoose.connect('mongodb://mongoservice:27017/microservices', err => {
  if (err) {
    console.log('*** Unable to connect with mongoose: ***\n\n' + err);
    process.exit(1);
  }
  console.log('Mongoose is now connected to the mongo service.')
});

