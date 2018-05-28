//* This is the "Support Request" conversation
//* User will request assistance with one of our Managed Services Teams
//* The conversation will prompt the user for basic information before team engagement
const axios = require('axios');

module.exports = (controller) => {

  controller.hears(["support", "^ticket"], 'direct_message,direct_mention', (bot, message) => {

    let ticket = {};

    bot.createConversation(message, (err, convo) => {

      convo.addQuestion(firstQuestion, [

        {
          pattern: 'yes',
          callback: (response, convo) => {
            convo.setVar('email', response.data.personEmail)
            ticket.email = response.data.personEmail
            convo.gotoThread('second-question-thread');
          }
        },
        {
          pattern: 'no',
          callback: (response, convo) => {
            convo.gotoThread('exit-thread');
          }
        },
        {
          default: true,
          callback: (response, convo) => {
            convo.say('I did not get that !');
            convo.gotoThread('default');

          }
        }

      ],{},'default');

      convo.addQuestion(secondQuestion, [

        {
          pattern: 'blue|red|yellow|pink|purple|black|white|brown|green|gray|orange',
          callback: (response, convo) => {
            convo.setVar('color', response.match[0]);
            ticket.color = response.match[0]
            axios.post('http://gatewayservice:3000/save_ticket', ticket)
            .then( ticket => {
              convo.setVar("id", ticket.data._id);
              convo.gotoThread('all-done-thread');
            })
            .catch( err => {
              console.log(err);
              convo.gotoThread('exit-thread')
            })
          }
        },
        {
          default: true,
          callback: (response, convo) => {
            convo.say('I did not get that !');
            convo.gotoThread('second-question-thread');

          }
        }

      ], {}, 'second-question-thread');

      convo.addMessage({
        text: 'Thank you, please see your ticket below:\
          \n\
          Ticket #{{vars.id}}\n\
          Color: {{vars.color}}\n\
          Email: {{vars.email}}\n'
      }, 'all-done-thread');

      convo.addMessage({
        text: 'Alright, see you next time.'
      }, 'exit-thread');

      convo.activate();

    });

  });
}

// define prompt questions
const firstQuestion = "Do you want me to generate a support ticket for you?\n\nSay **yes** or **no**"

const secondQuestion = "Excellent, now give me a color.\n\n" +
"You can say something like **blue** **red** **yellow**."


