  let p1 = new Promise((resolve,reject)=>{ 
    setTimeout(()=>{
      let d = {a:10};
      resolve(d);
    },15000);
    
  });

  let p2 = new Promise((resolve,reject)=>{ 
    let f = {h:50};
    //resolve(f);
    setTimeout(()=>{
      reject("exception occured");
    },8000);
  });

  let p3 = new Promise((resolve,reject)=>{ 
    setTimeout(()=>{
      let k = {v:90};
      resolve(k);
      //reject("error occured");
    },10000);
  });

//Promise.allSettled([p1,p2,p3]).then((result)=>{ console.log(result)});

Promise.race([p1,p2,p3]).then((result)=>{ console.log(result)}).catch((e)=> {console.log(e)});





