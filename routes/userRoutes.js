const express = require("express");
const userController = require("../controllers/v1/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(authMiddleware.protect);
router.get("/me", userController.getMe);

module.exports = router;
