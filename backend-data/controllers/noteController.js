const expressAsyncHandler = require("express-async-handler");
const User = require('../model/userModel')
const Note = require('../model/noteModel') 
const Ticket = require('../model/ticketModel')

const addNotes = expressAsyncHandler(async(req, res) => {
    const {note} = req.body;
    if(!note){
        res.status(400)
        throw new Error('Please enter your note or comment!')
    };
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(400)
        throw new Error('Invalid User Request')
    };
    const newNote = await Note.create({
        user : req.user.id,
        ticket : req.params.ticketId,
        note,
    });
    if(!note){
        res.status(400)
        throw new Error('Note cannot created!')
    };
    res.status(201).json(newNote)
})

const getNotes = expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("Invalid User Data");
  }

  const notes = await Note.find({ user: req.user._id });

  if (!notes) {
    res.status(404);
    throw new Error("Notes Not Found");
  }

  res.status(200).json(notes);
})

module.exports = {addNotes, getNotes}