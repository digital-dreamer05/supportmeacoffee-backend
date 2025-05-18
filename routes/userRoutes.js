const express = require("express");
const userController = require("../controllers/v1/userController");

const router = express.Router();

router.post("/complete-profile", userController.completeProfile);

module.exports = router;
