const mongoose = require('mongoose')

// const UserSchema = new mongoose.Schema({
//     name:String,
//     age: Number,
//     gender:String,
//     address:String,
//     phoneNumber:Number,
//     email:String

// })
// const UserModel = mongoose.model("users",UserSchema)
// module.exports = UserModel


const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' } // Default role is 'user'
  });
  
  // Create User model
  const User = mongoose.model('User', userSchema);
  module.exports = User 
  