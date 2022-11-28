const mongoose = require('mongoose');

  const cSchema = new mongoose.Schema({
    name: { type: String, required:true,max:255,min:2},
    lname: { type: String,required:true,max:255,min:2}    
  });


  module.exports = mongoose.model("Col", cSchema,'col1');