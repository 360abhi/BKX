const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const user = require('../models/User');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
require('dotenv').config()

//Register
router.post(
    '/register',
    [
        check('name','Name is required').not().isEmpty(),
        check('email','Please include a valid email').isEmail(),
        check('password','Please enter a password with 6 or more characters').isLength({min: 6}),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const { name, email, password} = req.body;

        try{
            let user = await User.findOne({email});
            if (user){
                return res.status(400).json({msg: "User already exists"});
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password,salt);

            await user.save();

            const payload = {
                user : {
                    id : user.id,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: 3600
                },
                (err,token) =>{
                    if (err) throw err
                    res.json({token});
                }
            );
        } catch (err){
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
);


//Login
router.post(
    '/login',
    [
        check('email','Please include a valid email').isEmail(),
        check('password','Password is required').exists(),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {email,password} = req.body;

        try{
            let user = await User.findOne({email});

            if (!user){
                return res.status(400).json({msg: 'Invalid Credentials'});
            }
            
            const isMatch = await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.status(400).json({msg:"Invalid credentials"});
            }

            const payload = {
                user : {
                    id : user.id,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

//Get user Data
router.get('/',auth, async (req,res)=>{
    try {
        const user = User.findById(req.user.id).select('--password');
        res.json(user);
    } catch (err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;