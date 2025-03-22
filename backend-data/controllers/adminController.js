const expressAsyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const Ticket = require('../model/ticketModel')

const getUsers = expressAsyncHandler(async(req, res) => {
    const users = await User.find();

    if(!users){
        res.status(404)
        throw new Error("User Not Found!")
    }
    res.status(200).json(users)
});

const getTickets = expressAsyncHandler(async(req,res) => {
    const tickets = await Ticket.find();

    if(!tickets){
        res.status(404);
        throw new Error("Tickets not Found!")
    }
    res.status(200).json(tickets)
})

module.exports = {getUsers,getTickets}