//* This is the help intent
//* Displays sample utterances to activate the spark skills

module.exports = (controller) => {

  controller.hears(['help', 'what do you do'], 'direct_message,direct_mention', (bot, message) => {

      let text = "Hello there\n\n" +
                  "You can show my details by saying " + bot.addMention(message, `.about`) + "\n\n" +
                  "Please say one of the following: \n\n";

      text += "\n- " + bot.addMention(message, "support") + ": Conversation example with variables and external requests";
      text += "\n- " + bot.addMention(message, "queue") + ": Simple hear request ";
      text += "\n- " + bot.addMention(message, ".about") + ": Shows metadata about myself";

      bot.reply(message, text);

  });

}


