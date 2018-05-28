const express = require("express")
const bodyParser = require("body-parser-json")

server = express()
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}));

// fire up server
server.listen(3001, console.log('Spark service is now up on port 3001'))

module.exports = (sparkController) => {

  let sparkbot = require('./helpers').prepareSparkBot(sparkController.spawn({}));
  
  // POST method where we handoff logic to botkit controller
  server.post('/spark-api', (req,res) => {
  
    sparkController.handleWebhookPayload(req,res,sparkbot)
  
  })

}


