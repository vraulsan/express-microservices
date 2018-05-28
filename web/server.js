const express = require("express")
const bodyParser = require("body-parser-json")
const axios = require('axios');
server = express()
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}));

// fire up server
server.listen(3002, console.log('Web service is now up on port 3002'))

server.use(express.static(__dirname + '/public'));

server.set('view engine', 'ejs');

server.get('/', (req,res) => {
  axios.get('http://gatewayservice:3000/tickets?n=5')
  .then ( tickets => {
    res.render('index', {tickets: tickets.data});
  })
  .catch ( err => {
    console.log(err);
    res.status(500).send('Sorry, there may be something wrong with the mongo service');
  })
})

server.post('/save_ticket', (req,res) => {
  axios.post('http://gatewayservice:3000/save_ticket', {
    email: req.body.email,
    color: req.body.color
  })
  .then( ticket => {res.redirect('/')})
  .catch( err => {res.status(500).send('Sorry, there may be something wrong with the mongo service')})
})

