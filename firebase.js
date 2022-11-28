/**
 * FOR FIRE BASE ONLY
 */



//const express = require('express');
const firebase = require('firebase/compat/app');
require("firebase/compat/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyCOpsbG-WnM3OFPKwDKFFAVJ_TY_vKr1tc",  
    authDomain: "projs22-86c68.firebaseapp.com",  
    projectId: "projs22-86c68",  
    storageBucket: "projs22-86c68.appspot.com",  
    messagingSenderId: "821057573423",  
    appId: "1:821057573423:web:48ab69ee3adefe0474acda",  
    measurementId: "G-HYL80JJK84"  
  };
  


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const Empl = db.collection("Employee");


//console.log(Empl);

let create = async (v)=>{
    try {
        let res = await Empl.add(v);
        console.log("User created.");
    }
    catch(e){
        console.log(e);
    }
}

let getData = async ()=>{
    try {
        let res = await Empl.get();
        let list = res.docs.map((r)=>{            
            //console.log(r.id);
            //console.log(r.data());
            let dd = {"id":r.id,...r.data()};
            //console.log(dd);
            return dd;
        })
        console.log(list);
    }
    catch(e){
        console.log(e);
    }
}


let update = async (v)=>{
    try {
        let id = v.id;
        delete v.id;
        let res = await Empl.doc(id).update(v);
        console.log("User updated.");
    }
    catch(e){
        console.log(e);
    }
}

let remove = async (v)=>{
    try {        
        let res = await Empl.doc(v.id).delete(v);
        console.log("User removed.");
    }
    catch(e){
        console.log(e);
    }
}


//create({"name":"Rajesh",age:9});
//getData();
//update({"id":"pDysMTPc2hpSb69y4Rpd","age":20,"name":"Aman"});
//remove({"id":"bJcsvlqzJeVoCAayNCGY"}); 




 

 