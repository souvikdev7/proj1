  const express = require("express");  
  const app = express();
  const Handler = require('./helper/handler');
  const cModel = require('./models/col');

  const mongoose = require('mongoose');
  var dbUrl = "mongodb+srv://souvik123:hari_1567@cluster1.ceho8gi.mongodb.net/mydb"; 
  mongoose.connect(dbUrl, {   
    useUnifiedTopology: true,
    useNewUrlParser: true    
  }).then(() => {
    console.log("Database connected successfully!");
  }).catch((error) => {
    console.log(error);
  })


  
 
//console.log(Handler.createUID());

app.get('/getdata', async (req,res) => {

  /*let obj = new cModel({
    name: "Rohit",
    lname: "Sharma"    
  });

  let saveData = await obj.save(function(error, data){
    if(error) {   
        console.log(error.message);
    }    
  });*/

  let result = await cModel.find();
  //console.log(result);    
  res.json(result);
});


var port = process.env.PORT || 3002;
app.listen(port,()=> console.log("Server running on port"+port));












