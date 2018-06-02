const express = require("express")
const bodyParser = require("body-parser-json")

server = express()
server.use(bodyParser.json());

// fire up server
server.listen(3001, console.log('Spark service is now up on port 3001'))

module.exports = (sparkController) => {

  // spawn a bot instance while passing it through our prepareSparkBot function
  let sparkbot = require('./helpers').prepareSparkBot(sparkController.spawn({}));
  
  // POST method where we handoff logic to botkit controller
  server.post('/spark-api', (req,res) => {
    
    sparkController.handleWebhookPayload(req,res,sparkbot)
  
  })

}


