const express = require("express");
const userController = require("../controllers/v1/userController");
const authenticate = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post(
  "/complete-profile",
  authenticate,
  upload.single("profileImage"),
  userController.completeProfile
);
module.exports = router;
