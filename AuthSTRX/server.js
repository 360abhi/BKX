const express = require('express');
const connectDB = require('./config/db');
const { connect } = require('mongoose');
require('dotenv').config();

const app = express();

connectDB();

//Middlware
app.use(express.json({extended: false}))

//Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`)
});