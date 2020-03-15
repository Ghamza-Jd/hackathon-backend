const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
