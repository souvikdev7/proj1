import fetch from 'node-fetch';

let url = 'https://jsonplaceholder.typicode.com/todos/1';

//let url = 'https://randomuser.me/api/';

/**
 * Promisify Function
 */

let f1 = ()=>{
    return new Promise((resolve,reject)=>{
        const response =  fetch(url).then(res => res.text()).then((text) => {  

            //let data1 = text;
            let data1 = {};
            
            if(Object.keys(data1).length === 0) {
                reject("No records found.");
            } else {
                resolve(text);
            } 
        });            
    });
}

let f2 = (c)=>console.log(c);

f1().then(f2).catch(f2);

