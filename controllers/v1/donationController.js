const Donation = require('../../models/donationModel');
const User = require('../../models/userModel');
const messages = require('../../utils/messages/fa');

exports.createDonation = async (req, res) => {
  try {
    const { username } = req.params;
    const {
      numberOfCoffees,
      supporterNameOrLink = '',
      message = '',
    } = req.body;

    if (!numberOfCoffees || numberOfCoffees < 1) {
      return res
        .status(400)
        .json({ message: messages.donation.number_coffees });
    }

    const creator = await User.findOne({ username });
    if (!creator) {
      return res.status(404).json({ message: messages.donation.not_found });
    }

    const coffeePrice = 30000;
    const totalAmount = numberOfCoffees * coffeePrice;

    const donation = await Donation.create({
      numberOfCoffees,
      supporterNameOrLink,
      message,
      totalAmount,
      creator: creator._id,
    });

    return res.status(201).json({
      message: messages.donation.donation_seccess,
      donationId: donation._id,
      amount: totalAmount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.common.server_error });
  }
};
