const mongoose = require("mongoose");
// pass our mongoose instance to the mongoose-sequence instantiation
const autoIncrement = require('mongoose-sequence')(mongoose);

// our ticket collection schema
let ticketSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true
  },
  email: String,
  completed: {
    type: Boolean,
    default: false
  },
  create_date: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

// plug the autoIncrement plugin into the schema
ticketSchema.plugin(autoIncrement);

// create the mongoose model
module.exports = mongoose.model('Ticket', ticketSchema);
