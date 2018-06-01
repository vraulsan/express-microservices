const mongoose = require("mongoose");
// pass our mongoose instance to the mongoose-sequence instantiation
const autoIncrement = require('mongoose-sequence')(mongoose);

// come back here if we need to change or add fields to the schema
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

// create the mongoose document
module.exports = mongoose.model('Ticket', ticketSchema);
