// Middleware functions have access to the req,res object and the next function
//they can modify the req object,ending the req-res cycle,calling next middleware function

const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 4000;

//Custom middleware to log request details
app.use((req,res,next)=>{
    console.log(`${req.method} for ${req.url}`);
    next(); // Pass the control to the next middleware, if not , to the next router
});

//Route handlers: they are specific function that handle specific routes,(get,post,put)
//they define what happens when a request is made to a specific endpoint

app.get('/',(req,res)=>{
    res.send("Home Page");
});

app.get('/about',(req,res)=>{
    res.send("About page");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});