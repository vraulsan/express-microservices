const api = require('./api');

module.exports = (server) => {
  // GET method used to fetch support tickets, returns "n" number of results
  server.get('/tickets', (req,res) => {
    api.getTickets(req.query.n || 10)
    .then(tickets => {
      res.status(200).send(tickets)
    })
    .catch(err => {
      res.status(500).send('Unable to fetch the database, please try again later');
      console.log(err)
    })

  })
  // POST method used to create support tickets
  server.post('/save_ticket', (req,res) => {
    if (req.body.color) {
      api.createTicket(req.body)
      .then(ticket => {
        res.status(200).send(ticket)
      })
      .catch(err => {
        res.status(500).send('Unable to fetch the database, please try again later');
        console.log(err)
      })
    }
    else {res.send('Please provide a valid body')}
  })
}