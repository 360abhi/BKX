//Error handling middleware will have four args req,res,next,err so that express will recognize due to the err argument

const express = require('expres');
const app = express();
const bodyparser = require('body-parser');
const { log } = require('console');
const port = 4000;

//Middleware function to log details
app.use((req,res,next)=>{
    console.log(`${req.method} for ${req.url}`);
    next(); // pass the control to the next middleware
});

//Basic get route
app.get('/',(req,res)=>{
    res.send("Home Page");
});

//Route handler to the GET request in /error that intentionally throws error
app.get('/error',(req,res,next)=>{
    const err = new Error('Intentional Error');
    next(err); // Passing the control to the error handler middlware
});

//Error handling middleware function
app.use((err,req,res,next)=>{
    console.error(err.stack); //log the error stack to the console
    res.status(500).send("Something went wrong"); // Sending internal server error response
});
// One of the reason why error handler does not use the next function is typically it wants to end the req-response cycle when the error is encountered

//Starting the server
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});