const Ticket = require("./models/ticket");

module.exports = {

  getTickets: (n) => {
    return new Promise((resolve, reject) => {
      let ticketQuery = Ticket.find({completed: false}).sort({_id: 'desc'}).limit(parseInt(n));
      ticketQuery.exec((err,tickets) => {
        if (err) {
          reject(err)
        }
        resolve(tickets)
      });
    });
  },
  
  createTicket: (ticket) => {
    return new Promise((resolve, reject) => {
      let newTicket = new Ticket(ticket)
      newTicket.save((err, ticket) => {
        if (err) {
          reject(err)
        }
        resolve(ticket)
      });
    });
  }

}
