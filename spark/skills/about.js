//* This is the about intent
//* Displays bot information

module.exports = (controller) => {

  controller.hears(["^ping", "about", "commons", "^\.bot"], 'direct_message,direct_mention', function (bot, message) {

      let metadata = '{\n'
          + '   "owner"       : "' + bot.commons["owner"] + '",\n'
          + '   "support"     : "' + bot.commons["support"] + '",\n'
          + '   "up-since"    : "' + bot.commons["up-since"] + '",\n'
          + '   "healthcheck" : "' + bot.commons["healthcheck"] + '",\n'
          + '   "version"     : "' + bot.commons["version"] + '",\n'
          + '   "code"        : "' + bot.commons["code"] + '"\n'
          + '   "platform"    : "' + bot.commons["platform"] + '"\n'
          + '}\n';
      bot.reply(message, '```json\n' + metadata + '\n```');

  });

}


