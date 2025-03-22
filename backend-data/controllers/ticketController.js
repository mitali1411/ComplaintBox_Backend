const expressAsyncHandler = require("express-async-handler");
const User = require('../model/userModel')
const Ticket = require('../model/ticketModel')

const getTickets = expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if(!user){
        res.status(404)
        throw new Error('Invalid User Request')
    }
    const tickets = await Ticket.find({user : req.user._id})
    if(!tickets){
        res.status(400)
        throw new Error('Cannot find tickets!')
    }
    res.status(200).json(tickets)
});

const getTicket = expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if(!user){
        res.status(400)
        throw new Error('Invalid User Request')
    }
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(400)
        throw new Error('Ticket Not Found!')
    }
    res.status(200).json(ticket)
});

const addTicket = expressAsyncHandler(async(req, res) => {

    const {product, description} = req.body;
    if(!product || !description){
        res.status(400)
        throw new Error('Please Fill All Details!')
    }

    const user = await User.findById(req.user._id);
    if(!user){
        res.status(400)
        throw new Error('Invalid User Request')
    }

    const ticket = await Ticket.create({
        user : user._id,
        product,
        description,
        status : 'new'
    })
    if(!ticket){
        res.status(400)
        throw new Error('Cannot Create Ticket!')
    }
    res.status(201).json(ticket)
});

const updateTicket = expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if(!user){
        res.status(400)
        throw new Error('Invalid User Request')
    }

    const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    if(!ticket){
        res.status(400)
        throw new Error('Cannot Update Ticket!')
    }
    res.status(200).json(ticket)
});

module.exports = {getTicket, getTickets, addTicket, updateTicket}