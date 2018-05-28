// load Botkit core requirement and mongoose
const Botkit = require('botkit');

if (!(process.env.NGROK || process.env.URL)) {
  console.log('You need to pass an NGROK or publicly accessible URL, terminating app...');
  process.exit(1)
}

if (!process.env.SPARK_TOKEN) {
  console.log('You need to pass your SPARK BOT TOKEN, terminating app...');
  process.exit(1)
}
// initialize spark botkit controller as sparkController
// I will export this, then import it in the routes definition
const sparkController = Botkit.sparkbot({
  log: true,
  public_address: (process.env.NGROK || process.env.URL) +'/spark-api',
  ciscospark_access_token: process.env.SPARK_TOKEN,
  webhook_name: process.env.WEBHOOK_NAME
});

exports.sparkController = sparkController

// check spark webhooks and update or create as needed
require('./helpers').checkSparkWebhooks(sparkController)

// start the server
require('./server')(sparkController);

// load the sparkbot skills
require("fs").readdirSync('./skills').forEach(file => {
  require('./helpers').loadSparkSkills(file, sparkController)
});