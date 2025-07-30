const express = require('express');
const router = express.Router();
const faqController = require('../controllers/v1/faqController');

router.get('/', faqController.getAllFaqs);
router.post('/', faqController.createFaq);
router.patch('/:id', faqController.updateFaq);
router.delete('/:id', faqController.deleteFaq);

module.exports = router;
