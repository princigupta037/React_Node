const express = require('express');
const router = express.Router()
const registerController = require('../../Backend/controllers/registerController');

router.post('/',registerController.handleNewUser);

module.exports = router;