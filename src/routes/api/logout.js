const express = require('express');
const router = express.Router()
const logoutController = require('../../Backend/controllers/logoutController');

router.get('/',logoutController.handleLogout);

module.exports = router;