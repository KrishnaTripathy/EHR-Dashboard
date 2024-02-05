const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  age: Number,
  gender: String,
  role: String,
  // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
