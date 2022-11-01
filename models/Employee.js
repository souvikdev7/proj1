const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
      type: String
    },
    designation: {
      type: String
    }    
  });
  
  let Employee = mongoose.model('Employee', employeeSchema,'Employees');
  module.exports = {Employee};