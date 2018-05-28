//* This is the line or queue intent
//* Displays tickets in the line/queue
const axios = require('axios');

module.exports = (controller) => {

  controller.hears(["queue", "line"], 'direct_message,direct_mention', (bot, message) => {
    console.log('requested tickets through spark');
    // i will only query for uncompleted tickets
    axios.get('http://gatewayservice:3000/tickets?n=5')
    .then( tickets => {
      // check if there are uncompleted tickets and generate output text
      if (tickets.data.length != 0) {
        let text = '### Here are the 5 most current tickets:\n\n```\n'
        tickets.data.forEach( ticket => {
          text +=
            'Ticket ID: ' + ticket._id + '\n' +
            'Color: ' + ticket.color + '\n' +
            'Email: ' + ticket.email + '\n' +
            'Created: ' + ticket.create_date + '\n' +
            '---------------------------------------------\n'
        });
        text += '\n\n```'
        return bot.reply(message, text);
      }
      return bot.reply(message, 'Looks like there are no tickets in the queue');
    })
    .catch( err => {
      console.log(err)
      return bot.reply(message, 'Sorry, something went wrong with mongoose');
    })

  });

}
