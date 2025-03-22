const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require('../model/userModel')

const adminProtect = expressAsyncHandler(async(req, res, next) => {

    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ){
    try {
         // Get token from headers
         token = req.headers.authorization.split(" ")[1]
         // Verify token
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
         // Get user from token
         req.user = await User.findById(decoded.id).select('-password')
 
         if(!req.user){
             res.status(401)
             throw new Error('Unauthorized User!')
         }

         if(req.user.isAdmin){
            next()
         }else{
            res.status(401)
            throw new Error('Unauthorized User!')
         }

        } catch (error) {
        res.status(401)
        throw new Error('Unauthorized User!')
       }
    }

    if(!token){
        res.status(401)
        throw new Error("Unauthorized User! || You're not admin ")
    }

})

module.exports = {adminProtect};