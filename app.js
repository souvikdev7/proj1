const express = require("express");
const app = express();
var port = process.env.PORT || 3000;
const Logger = require('./helper/logger');
const Handler = require('./helper/handler');

const mongoose = require('mongoose');
var dbUrl =  "mongodb://127.0.0.1:27017/mydb"; 
mongoose.connect(dbUrl, {   
  useUnifiedTopology: true,
  useNewUrlParser: true    
}).then(() => {
  console.log("Database connected successfully!");
}).catch((error) => {
  console.log(error);
})




const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');




const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
    servers:[{url : "http://localhost:3000/"}],
   /* securityDefinitions: {
      bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'bearer',
          in: 'header',
      },
    security: [ { bearerAuth: [] } ],  
  }*/
  },
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));





/**
 * @swagger
 *  components:
 *      schemas:
 *          data1:
 *              type : object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *   
 */

 /**
 * @swagger
 *  components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *      schemas:
 *          data2:
 *              type : object
 *              properties:
 *                  a:
 *                      type: integer
 *                  b:
 *                      type: integer
 *   
 */


/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger
 *     responses:
 *       200:
 *         description: Returns a  string.
 */

app.get('/',(req,res) => res.send("Hello Souvik"));



app.get('/users',(req,res) => res.json({"name":"Shyam","email":"shyamjaiswal@gmail.com"}));



/**
 * @swagger
 * /allusers:
 *   get:
 *     summary :  yyyyyy
 *     description: aaa
 *     responses:
 *       200:
 *         description: this is a api
 *         content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#components/schemas/data1'
 *                      
 */



app.get('/allusers',(req,res) => res.json([{"name":"Shyam","email":"shyamjaiswal@gmail.com"},{"name":"Anil","email":"anil88@gmail.com"}]));


/**
 * @swagger
 * /allusers1/{id}:
 *   get:
 *     summary :  eeeee
 *     description: hhhhh
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        descreiption: Numeric value
 *        schema:
 *          type: integer 
 *     responses:
 *       200:
 *         description: this is a api
 *         content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#components/schemas/data1'
 *                      
 */

app.get('/allusers1/:id',(req,res) => res.json([{"name":"Anil","email":"anil88@gmail.com"}]));



/**
 * POST
 */

 //app.use(bodyParser.json());   // Depricated
 //app.use(bodyParser.urlencoded({ extended: true }));  // Depricated

 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

 
 /**
 * @swagger
 * /sum:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary :  llllll
 *     description: pppppppp  
 *     requestBody : 
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#components/schemas/data2'
 *     responses:
 *       200:
 *         description: this is a api
 *         
 *                      
 */
 app.post('/sum',(req, res) => {
     let a = req.body.a;
     let b = req.body.b; 
     let c = parseInt(a) + parseInt(b);
     res.json(c);
     console.log('Result : '+c);
     Logger.write('Result : '+c);
     console.log(req.headers.authorization); // <-- token
 });


  /**
 * @swagger
 * /check/{id}:
 *   put:
 *     summary :  dddd
 *     description: uuuuuu
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        descreiption: Numeric value
 *        schema:
 *          type: integer 
 *     requestBody : 
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#components/schemas/data2'
 *     responses:
 *       200:
 *         description: this is a api
 *         
 *                      
 */
 app.put('/check/:id',(req, res) => {
    let a = req.body.a;
    let b = req.body.b; 
    let c = 'updated';
    res.json(c);
    console.log('Result : '+c);
});




const empModel = require('./models/employee');
const { reserved } = require("mongoose/lib/schema");

app.get('/getdata', async (req,res) => {
    
  await empModel.Employee.find()
  .then(response => {    
      res.json({ response });      
  })
  .catch(error => {
      console.log(error);
      res.json({ message : "Error Occurred" });  
  });
  
});


const returnSet  = {"status":true,data:""};
const returnErrorSet  = {"status":false,"error":""};



app.post('/registerUser', async(req, res) => {
  try {   
    await Handler.registerUser(req,res);        
  } 
  catch(err) {    
    console.log(err);
    returnErrorSet.error = err;
		return res.status(500).send(returnErrorSet);
  }
});

app.post('/loginUser', async(req, res) => {
  try {    
    await Handler.checkLogin (req,res);      
  } 
  catch(err) {    
    returnErrorSet.error = err;
		return res.status(500).send(returnErrorSet);
  }
});


app.get('/getDetails',Handler.chkAuthToken,async(req, res) => {

  try {
    let result= await empModel.Employee.find();
    returnSet.data = result;
    res.status(200).json(returnSet);
  } 
  catch(err) {
    returnErrorSet.error = err;
		return res.status(500).send(returnErrorSet);
  }
});









app.listen(port,()=> console.log("Server running on port"+port));
