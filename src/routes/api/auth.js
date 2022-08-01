const express = require('express');
const router = express.Router()
const authController = require('../../Backend/controllers/authController');

router.post('/',authController.handleLogin);

module.exports = router;