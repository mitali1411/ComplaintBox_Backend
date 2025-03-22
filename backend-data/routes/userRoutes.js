const express = require('express');
const { registerUser, loginUser, privateController } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', registerUser)
router.post('/login', loginUser)

router.get('/private',protect, privateController)

module.exports = router