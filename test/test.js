var assert = require('assert');
const { log } = require('console');
const { devNull } = require('os');
var expect = require('chai').expect;

//const url = 'https://gorest.co.in/public/v2/';
//const token  = '17a529e5f18f0396ccb3a3e366efbc14b693107e36ad79b8e26ff61051acab95';

const url = "http://localhost:3000/";
const token  = "1234";
var supertest = require('supertest');
var request= supertest.agent(url);

//const pUrl  = 'users/5';
const pUrl  = 'users';
const apiUrl  = pUrl+'?access-token=${token}';



/**
 * 
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
*/



describe('Users',()=>{


    it.only('GET/users',()=>{
        return request.get(apiUrl).then((res)  => {
            //console.log(err);
            //onsole.log(res.body);
            //console.log(res.text);

            //expect(res.body).to.not.be.empty;
            //expect(res.body).to.be.empty;
            //expect(res.body).to.be.a('array');



            
            let data1 = JSON.parse([res.text]);

             console.log(data1);


            //expect(data1).to.not.be.empty;
            //expect(data1).to.be.empty;
            //expect(data1).to.have.lengthOf(3);
            //expect(data1).to.have.lengthOf.above(146);
            //expect(data1).to.have.lengthOf.at.least(2);
            //expect(data1).to.have.property('email');
            //expect(data1).to.have.property('name');            
            //expect(data1).to.have.any.keys('name');
            expect(data1).to.have.deep.property('name');


            
            
        });
    });

    it('GET/users/:id',()=>{
      return request.get(apiUrl).then((res)  => {        
             
          let data1 = JSON.parse([res.text]);
           //console.log(data1.email);         
          expect(data1).to.have.any.keys('name');          
          
      });
    });


    
    it('POST/sum',()=>{
      let myjson = {"a":10,"b":20};
      return request
        .post('sum')
        .set("Authorization","Bearer ${token}")
        .send(myjson)
        .then((res)  => {        
             
         let data1 = parseInt(res.text);      
         
         //expect(data1).to.eq(30);       
         //expect(data1).to.eq(3);      
         //expect(data1).to.be.true;
         //expect(data1).to.not.be.undefined; 
         //expect(data1).to.be.above(10); 
         expect(data1).to.be.below(50); 
        });
    });
    /*
    it('PUT/check',()=>{
      let myjson = {"a":2,"b":5};
      return request
        .put('check')
        .set("Authorization","Bearer ${token}")
        .send(myjson)
        .then((res)  => {        
             
         let data1 = parseInt(res.text);      
     
         expect(data1).to.not.be.undefined; 
       
        });
    });*/



    it.only('PUT/check', async ()=>{
      let myjson = {"a":2,"b":5};
      let ret2 = await request.put('check').set("Authorization","Bearer ${token}").send(myjson);

        expect(ret2.text).to.be.undefined;   
       
    });

});


/*

  Examples:-


    expect(response.status).to.eql(200);
    expect(response.body.data.length).to.eql(30); 

    const attributes = response.body.data.attributes;
    expect(attributes).to.include.keys("kilometers", "miles", "nautical_miles");
    expect(attributes.kilometers).to.eql(8692.066508240026);
    expect(attributes.miles).to.eql(5397.239853492001);
    expect(attributes.nautical_miles).to.eql(4690.070954910584);
    expect(response.status).to.eql(401);

    


 */

