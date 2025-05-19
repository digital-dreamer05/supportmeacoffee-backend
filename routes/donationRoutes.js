const express = require("express");
const donationController = require("../controllers/v1/donationController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// router.use(authMiddleware.protect);

router.post("/", donationController.createDonation);
router.get("/my-donations", donationController.getMyDonations);

// router.use(authMiddleware.restrictTo("admin"));
router.get("/", donationController.getAllDonations);
router.patch("/:id/status", donationController.updateDonationStatus);

module.exports = router;
