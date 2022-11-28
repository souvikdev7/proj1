const jwt = require('jsonwebtoken');
const SECRET = 'bGEyYWF2dnQ1Zm5ncWp0ZmZxcQ==';
const bcrypt = require('bcrypt');
const SALT = 10;
const process = require('process');
const usrModel = require('../models/user');
const postModel = require('../models/post');
const Execute = require('../models/execute');
const Joi = require("joi");
const { log } = require('console');
const crypto = require('crypto');


const getPreviousDate = function (diff) {    
    let date = new Date();
    let newDate = new Date(date.setMonth(date.getMonth()-diff));
    return newDate;
}

const createUID = () => {
    let head = Date.now().toString(36);
    let tail  = Math.random().toString(36).substring(2);
    let full  = head+tail;
    const plain = Buffer.from(full, 'utf8').toString('base64');
    return plain;
}

const createNewUUID = () => {    
    return crypto.randomUUID();
}


const createToken = (id,name) => {    
    let token = jwt.sign(
    { id: id, name : name}, 
    SECRET, 
    { algorithm:'HS384',expiresIn:'1h'}
    );
    return token;
}

const chkAuthToken = async(req, res, next) => {
    try {
        let headerToken = req.headers.authorization;
        let tokens = headerToken.split(" ");
        let jwtToken = tokens[1];    
        if (!jwtToken) {            
            return res.status(401).send({ "status":false,"error":"Invalid Token"});
        }
        let payload = await jwt.verify(jwtToken, SECRET);  
        next();
    } 
    catch(err) {       
        return res.status(401).send({ "status":false,"error":"Token Expired"});
    }    
}

const registerUser = async(req,res) => {    
    try {    

        const registerSchema = Joi.object({ 
            fname: Joi.string().alphanum().min(3).max(30).required(),
            lname: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
            password : Joi.string().required()
        });         
        const { value, error }   = registerSchema.validate(req.body);         
        if(error)
        {            
            return res.status(401).json({"status":false,"data":{"msg":error.details[0].message}});
        }

        const hasspass = await bcrypt.hash(req.body.password, SALT) + '';    
        let usr = new usrModel({
            first_name: req.body.fname,
            last_name: req.body.lname,    
            email: req.body.email,
            password: hasspass
        });  
        let cnt = await usrModel.find({email:req.body.email}).count();        
        if(cnt>0){
            return res.status(401).json({"status":false,"data":{"msg":"Email already registered with us"}});
        }
        let saveData = await usr.save(function(error, data){
            if(error) {   
                //console.log(error.message);              
                return res.status(200).json({"status":false,"error":"Sorry unable to save data."}); 
            }    
            return res.status(200).json({"status":true,"data":{"msg":"Registered Successfully"}});
        });        
    }
    catch(err) {       
        throw new Error(err);
    }
}


const checkLogin = async(req,res) => {
    
    /*if (req.body.email.trim() === "" || req.body.password.trim()==="") {
        return res.status(401).json({"status":false,"data":{"msg":"Invalid Credentials"}});
    }*/

    const loginSchema = Joi.object({       
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password : Joi.string().required()
    });         
    const { value, error }   = loginSchema.validate(req.body);             
    if(error)
    {            
        return res.status(401).json({"status":false,"data":{"msg":error.details[0].message}});
    }
    
    let userData = await usrModel.find({email:req.body.email}); 
    if(userData.length===0)
    {
        return res.status(401).json({"status":false,"data":{"msg":"Invalid Email / Invalid Credentials"}});
    }
    let userPass = userData[0].password;
    const validate = await bcrypt.compare(req.body.password,userPass); 
    if(validate)
    {
        //console.log(userData[0]._id+'');      
        let id = userData[0]._id+'';
        let name = userData[0].first_name+' '+ userData[0].last_name;
        let token = await createToken(id,name);
        return res.status(200).json({"status":true,"data":{"token":token}});
    } 
    else {
        return res.status(401).json({"status":false,"data":{"msg":"Invalid Password / Invalid Credentials"}}); 
    }    
}

const getData = () => {                
    //return Execute.getQueryData();
    return Execute.getResults(5);
}


module.exports = {getPreviousDate,createUID,createToken,chkAuthToken,registerUser,checkLogin,getData};