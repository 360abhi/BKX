//Route parameters are used to capture values from the route

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 4000;

//Middleware to parse Json bodies
app.use(bodyParser.json());

//Route params are found using the : parameter
app.get('/user/:id',(req,res)=>{
    const userId = req.params.id;
    res.send(`User id is ${userId}`);
});

// Start the server
app.listen(port,()=>{
    console.log(`Server is running on localhost on port ${port}`);
});