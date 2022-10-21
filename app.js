const express = require("express");
const app = express();
var port = process.env.PORT || 3000;
app.get('/',(req,res) => res.send("Hello Souvik"));
app.listen(port,()=> console.log("Server running on port"+port));
