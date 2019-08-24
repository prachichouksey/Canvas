const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const userCounterSchema = new Schema({
  _id: { type: String },
  seq: { type: Number, default: 12345 }
});

module.exports = UserCounter = mongoose.model("userCounter", userCounterSchema);
