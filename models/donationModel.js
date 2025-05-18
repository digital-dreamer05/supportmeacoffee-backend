const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "اهدای قهوه باید متعلق به یک کاربر باشد"],
  },
  quantity: {
    type: Number,
    required: [true, "لطفا تعداد قهوه را مشخص کنید"],
    min: [1, "تعداد قهوه باید حداقل 1 باشد"],
  },
  message: {
    type: String,
    trim: true,
    maxlength: [200, "پیام نمی‌تواند بیشتر از 200 کاراکتر باشد"],
  },
  status: {
    type: String,
    enum: ["در انتظار", "تایید شده", "رد شده"],
    default: "در انتظار",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

donationSchema.index({ user: 1, createdAt: -1 });

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
