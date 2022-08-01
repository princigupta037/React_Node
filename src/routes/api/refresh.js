const express = require('express');
const router = express.Router()
const refreshTokenController = require('../../Backend/controllers/refreshTokenController');

router.get('/',refreshTokenController.handleRefreshToken);

module.exports = router;