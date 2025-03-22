const express = require('express')
const {adminProtect} = require('../middleware/adminMiddleware')
const { getUsers, getTickets } = require('../controllers/adminController')

const router = express.Router()

router.get('/users', adminProtect, getUsers)
router.get('/tickets', adminProtect, getTickets)

module.exports = router