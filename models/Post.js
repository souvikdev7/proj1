const mongoose = require('mongoose');

  const postSchema = new mongoose.Schema({
    name: { type: String, required:true,max:255,min:2},
    title: { type: String,required:true,max:255,min:2},
    age: { type: Number,default:1},
    class: { type: String,required:true},
    marks: { type: String,required:true}    
  });

 

  const getData = () => {
    return postSchema.aggregate([
      {$group : {_id:{age:"$age", class:"$class"}, count:{$sum:1},Names:{$push:"$name"}}},
      {$unwind:"$Names"}
      ]);  
  }


module.exports = mongoose.model("Post", postSchema,'posts');
