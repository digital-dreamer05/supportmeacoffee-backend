const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  numberOfCoffees: { type: Number, required: true, min: 1 },
  supporterNameOrLink: { type: String, default: '' },
  message: { type: String, default: '' },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'approved', 'failed'],
    default: 'pending',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Donation = mongoose.model('Donation', DonationSchema);

module.exports = Donation;
