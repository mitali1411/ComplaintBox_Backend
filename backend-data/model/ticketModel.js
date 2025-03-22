const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    product : {
        type : String,
        enum : ["iPhone", "iPad", "iMac", "iPod", "AirPods", "iWatch"],
        required : true
    },
    description : {
        type : String,
        required : [true, "Please give description here"]
    },
    status : {
        type : String,
        enum : ["new", "Open", "Closed"],
        required : true
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Ticket', ticketSchema)