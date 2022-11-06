const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
    first_name: { type: String, required:true,max:255,min:2},
    last_name: { type: String,required:true,max:255,min:2},
    email: { type: String, unique: true,required:true,max:255,min:6 },
    password: { type: String,required:true,max:1024,min:6 },
    token: { type: String,default:null,max:1024,min:6 },
    date : {type: Date, default: Date.now()}
  });
  
  //let Employee = mongoose.model('Employee', employeeSchema,'Employees');
  //module.exports = {Employee};

  module.exports = mongoose.model("User", userSchema,'Users');