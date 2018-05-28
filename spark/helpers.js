module.exports ={
  // this will add the commons propety details to the bot instance and
  // the functionality for reminding the user to mention the bot in group spaces
  prepareSparkBot: (sparkbot) => {

    sparkbot.commons = {};
    sparkbot.commons["healthcheck"] = process.env.NGROK + "/spark-api";
    sparkbot.commons["up-since"] = new Date(Date.now()).toGMTString();
    sparkbot.commons["version"] = "v" + require("./package.json").version;
    sparkbot.commons["owner"] = 'Victor';
    sparkbot.commons["support"] = 'support@support.com';
    sparkbot.commons["platform"] = 'Node.JS';
    sparkbot.commons["nickname"] = process.env.BOT_NICKNAME
    sparkbot.commons["code"] = process.env.REPO;

    sparkbot.addMention =  (message, word) => {
        if ("group" == message.data.roomType) {
            return "`@boilerplate " + word + "`";
        }
        if (message.raw_message) {
            if ("group" == message.raw_message.data.roomType) {
                return "`@boilerplate " + word + "`";
            }
        }

        return "`" + word + "`";
    }
    return sparkbot
  },

  // check on spark webhook, if it exists then update, if it doesn't exist then create it
  checkSparkWebhooks: (controller) => {

    var list = controller.api.webhooks.list().then( (list) => {
        var hook_id = null;
        for (var i = 0; i < list.items.length; i++) {
            if (list.items[i].name == 'Spark API Webhook') {
                hook_id = list.items[i].id;
            }
        }

        var hook_url = process.env.NGROK + '/spark-api'

        if (hook_id) {
            controller.api.webhooks.update({
                id: hook_id,
                resource: 'all',
                targetUrl: hook_url,
                event: 'all',
                name: 'Spark API Webhook'
            }).then( (res, err) => {
                if (err) {
                    console.log('*** There was an error updating the spark webhook ***\n\n', err);
                    process.exit(1);
                };
                console.log('Spark webhook has been updated !');
            })
        } else {
            controller.api.webhooks.create({
                id: hook_id,
                resource: 'all',
                targetUrl: hook_url,
                event: 'all',
                name: 'Spark API Webhook'
            }).then( (res, err) => {
                if (err) {
                    console.log ('*** There was an error creating the spark webhook ***\n\n', err);
                    process.exit(1);
                }
                console.log('Spark webhook has been created !');
            });
        }
    });
  },

  // load spark skills, we call this in app.js
  loadSparkSkills: (file, sparkController) => {
    try {
        require("./skills/" + file)(sparkController);
        console.log("Sparkbot skill loaded: " + file);
    }
    catch (err) {
        console.log ('ERROR LOADING SPARK SKILL: ', err)
        if (err.code == "MODULE_NOT_FOUND") {
            if (file != "utils") {
                console.log("Sparkbot could not load skill: " + file);
            }
        }
    }
  }

}