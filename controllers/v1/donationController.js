const Donation = require("../models/donationModel");
const { sendDonationEmail } = require("../utils/email");

exports.createDonation = async (req, res, next) => {
  try {
    const donation = await Donation.create({
      user: req.user.id,
      coffeeType: req.body.coffeeType,
      quantity: req.body.quantity,
      message: req.body.message,
    });

    await sendDonationEmail(req.user.email, req.user.name, donation);

    res.status(201).json({
      status: "success",
      data: { donation },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find().populate({
      path: "user",
      select: "name email",
    });

    res.status(200).json({
      status: "success",
      results: donations.length,
      data: { donations },
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ user: req.user.id });

    res.status(200).json({
      status: "success",
      results: donations.length,
      data: { donations },
    });
  } catch (err) {
    next(err);
  }
};

// به‌روزرسانی وضعیت اهدا
exports.updateDonationStatus = async (req, res, next) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!donation) {
      return next(new Error("اهدای مورد نظر یافت نشد"));
    }

    res.status(200).json({
      status: "success",
      data: { donation },
    });
  } catch (err) {
    next(err);
  }
};
