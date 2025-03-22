const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    ticket : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Ticket',
        required : true
    },
    note : {
        type : String,
        required : [true, "Please leave a note!"]
    },
    isStaff : {
        type : Boolean,
        default : false,
        required : true
    },
    staffId : {
        type : String
    }
},
{
    timestamps : true
});

module.exports = mongoose.model('Note', noteSchema)