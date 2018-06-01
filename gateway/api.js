// require our ticket model
const Ticket = require("./models/ticket");

module.exports = {
  // n is the number of documents to return from the query
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
  // save a new ticket
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
