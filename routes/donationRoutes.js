const express = require('express');
const router = express.Router();
const donationController = require('../controllers/v1/donationController');

router.post('/:username', donationController.createDonation);

module.exports = router;
