const express = require('express');
const User = require('../models/User');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

const JWT = require('jsonwebtoken');
const fetchUser = require('../middlewares/fetchUser');
const JWT_SECRET = '!@#$%'



// Route 1: /api/auth/create-user  //No login required
router.post('/create-user',
    // Giving details to Validate req
    [body('name', 'Name must be atleast of 3 characters').isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be atleast of 5 characters').isLength({ min: 5 })],
    
    
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        // If errors return bad request and error message
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Check whether user exist or not
            let user = await User.findOne({email: req.body.email})
            if(user){
                return res.status(400).json({success, error: `User already exist with ${req.body.email}`})
            }
            const pass = req.body.password;

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)
    
            user = await User.create({
                name : req.body.name,
                email : req.body.email,
                password : secPass,
                pass: pass
            })
            
            const data = {
                user : {
                    id : user.id
                }
            }
            

            const authToken = JWT.sign(data, JWT_SECRET)

            // res.json(user)
            success = true;
            res.json({success, authToken})
            
        }  catch(err) {
            res.status(500).json({error: "Something went wrong"})
        }

})


// Route 2: /api/auth/login  // No login required
router.post('/login',
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password cannot be empty').exists(),


    async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    // If errors return bad request and error message
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const {email, password} = req.body;

        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success, error : 'Invalid Credentials'})
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password)
        
        if(!passwordCompare){
            return res.status(400).json({success, error: "Invalid Credentials"})
        }

        const data = {
            user : {
                id : user.id
            }
        }

        const authToken = JWT.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authToken})

        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error ", error})
    }

})

// Route 3 : api/auth/get-user // Login required

router.post('/get-user', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password -pass")  
        res.send(user)     
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
        
    }
})

module.exports = router