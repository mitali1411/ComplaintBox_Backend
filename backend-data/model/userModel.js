const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please fill name']
    }, 
    email : {
        type : String,
        unique : true,
        required : [true, 'Please fill email']
    },
    password : {
        type : String,
        required : [true, 'Please fill password']
    },
    isAdmin : {
        type : Boolean,
        required : false
    }
},
{
    timestamps : true
});

module.exports = mongoose.model('User', userSchema)