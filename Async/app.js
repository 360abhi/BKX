  //Node js uses an event driven and Non blocking I/O model 
  //Promise: A promise is an object representing the eventual completion or failure of an asynchronous event

  const express = require('express');
  const app = express();
  const bodyparser = require('body-parser');
  const port = 3000;

  const doSomething = () =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Async operation completed");
        },2000);
    });
  };

  doSomething.then((result) => {
    console.log(result); // Async operation completed
  }).catch((err) => {
    console.error(error);
  });


  //Using the async await method
  const main = async () =>{
    try{
        const result = await doSomething();
        console.log(result)// Asycn operation completed
    } catch (error) {
        console.error(error);
    }
  };

  main();



  //////////////////////////////////
//Real life 

function fetchData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Data Fetched");
        },1000);
    });
}

fetchData.then(data=>{
    console.log(data); //Data Fetched
}).catch(error=>{
    console.error(error);
});

//here resolves is what returns the data in then call back function

//Using async await

async function fetchDataAsync(){
    try{
        let data = await fetchData();
        console.log(data); //Data Fetched
    } catch(error){
        console.error(error);
    }
};

fetchDataAsync();


///////////////

fetch('https:/jsontypcode/posts/1')
.then(response=>response.json())
.then(data=>console.log(data))
.catch(error=>console.error(error));

async function fetchPosts(){
    try{
        let response = await fetch('https//jsontypce/posts/1');
        let data= await response.json();
        console.log(data);
    }catch(error){
        console.error(error);
    }
}

fetchPosts();

//Use then() to handles resolved values and catch() for errors