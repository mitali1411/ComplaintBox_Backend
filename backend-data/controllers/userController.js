const expressAsyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')


const registerUser = expressAsyncHandler(async(req, res) => {

    // User details from User Model
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please Fill All Details')
    }


    // Find if User already exist
    const userExist = await User.findOne({email: email})
    if(userExist){
        res.status(400);
        throw new Error('User Already Exist!')
    }

    // Hashed Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)

    // User create
    const user = await User.create({
        name, email, password : hashedPassword
    })
    if(!user){
        res.status(400);
        throw new Error('Invalid ')
    }
    res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        // password : hashedPassword,
        token : generateToken(user._id)
    })

})

const loginUser = expressAsyncHandler(async(req, res) => {

    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('Please Fill All Details')
    }

    const user = await User.findOne({email : email})
    if(user && bcrypt.compareSync(password, user.password)){
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token : generateToken(user._id)
        })
    }
    res.status(400)
    throw new Error('Invalid Credentials')
})


// Private Controller
const privateController = expressAsyncHandler(async(req, res) => {
    res.json(req.user);
})

// Generate Token
const generateToken = (id) => {
    let token = jwt.sign({id : id}, process.env.JWT_SECRET, {expiresIn : '30d'});
    return token;
}

module.exports = {loginUser, registerUser, privateController}