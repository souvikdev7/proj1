const postModel = require('../models/post');
const usrModel = require('../models/user');

const getQueryData = () => {
    

    //let data = postModel.find(); 
    /*let data =  postModel.aggregate([
        {$group:{_id:"$age",Names:{$push:"$name"},TotalMarks:{$sum:"$marks"}}}
        ]);*/

    /*let data = postModel.aggregate([
            {$group:{_id:"$class",Names:{$push:"$name"},TotalMarks:{$sum:"$marks"}}}
            ]);*/

    /*let data =  postModel.aggregate([
                {$group : {_id:{age:"$age", class:"$class"}, count:{$sum:1},Names:{$push:"$name"}}}
                ]);*/
                        
   let data = postModel.aggregate([
                {$group : {_id:{age:"$age", class:"$class"}, count:{$sum:1},Names:{$push:"$name"}}},
                {$unwind:"$Names"}
                ]);   
                
    
    return data;
}

const getResults = (d1) => {
   let data = postModel.aggregate([
                {$match:{ age:d1}}
                ]);
    return data;
}



module.exports = {getQueryData,getResults}