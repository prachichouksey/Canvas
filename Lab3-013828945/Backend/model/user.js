const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: Number, required: true }
});

module.exports = User = mongoose.model("users", UserSchema);
