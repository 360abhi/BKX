const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//Middleware to parse Json bodies
app.use(bodyParser.json());

//Sample Data (NO DB)
let users = [
    {id:1, name:"Abhishek", email:"abhishekch360@gmail.com"},
    {id:2, name:"John Doe", email:"johndoe@example.com"},
    {id:3, name:"Jane Smith", email:"janesmith@example.com"}
]

//Get all users
app.get('/user',(req,res)=>{
    res.json(users);
});

//Get specifi user by its 
app.get('/user/:id',(req,res)=>{
    const user = users.find(u=>u.id == parseInt(req.params.id));
    if(user){
        res.json(user);
    }else{
        res.status(404).send("User Not found");
    }
});

//Create new user
app.post('/user',(req,res)=>{
    const newUser = {
        id : users.length + 1,
        name : req.body.name,
        email : req.body.email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

//Update existing user
app.put('/user/:id',(req,res)=>{
    const user = users.find(u=>u.id == parseInt(req.params.id));
    if(user){
        user.name = req.body.name;
        user.email = req.body.email;
        res.json(user);
    }else{
        res.status(404).send("User not Found");
    }
});

//Delete a user
app.delete('/user/:id',(req,res)=>{
    const userIndex = users.findIndex(u=>u.id === parseInt(req.params.id));
    if (userIndex != -1){
        users.splice(userIndex,1);
        res.status(204).send();
    }else{
        res.status(404).send("User not Found");
    }
});


// Basic Route
app.get("/",(req,res)=>{
    res.send("Welcome to the REST API");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});