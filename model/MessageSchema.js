const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  contactmessage: {
    required: true,
    type: String,
  },
  timeSent: { type: String },
});

module.exports = mongoose.model("Message", Message);
