const express = require("express");
const submitFeedback = require("../controllers/v1/feedbackController");
const authController = require("../middlewares/authMiddleware");

const router = express.Router();

// router.use(authController.protect);

// router.use(authController.restrictTo("admin"));

router.post("/", submitFeedback.submitFeedback);

router.get("/", submitFeedback.getAllFeedbacks);

module.exports = router;
