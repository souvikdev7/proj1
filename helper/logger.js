const fs = require("fs");
const write = function (str) {   
    const logpath = "./logs/new.log";
    var str = "\n"+ new Date().toLocaleString()+' =========================>'+"\n"+str+"\n";    
    fs.appendFile(logpath,str,()=>{}); 
}


module.exports = {write};