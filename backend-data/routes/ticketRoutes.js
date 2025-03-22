const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { getTicket, getTickets, addTicket, updateTicket } = require('../controllers/ticketController');

const router = express.Router()

router.route('/').get(protect, getTickets).post(protect, addTicket);
router.route('/:id').get(protect, getTicket).put(protect, updateTicket)

router.use('/:ticketId/note', require('./noteRoutes'))

module.exports = router