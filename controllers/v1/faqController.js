const Faq = require('../../models/faqModel');
const messages = require('../../utils/messages/fa');

exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ order: 1 });
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json({ message: messages.common.server_error });
  }
};

exports.createFaq = async (req, res) => {
  const { question, answer, order } = req.body;

  try {
    const orderValue =
      order !== undefined ? order : (await Faq.countDocuments()) + 1;

    const newFaq = new Faq({ question, answer, order: orderValue });
    await newFaq.save();
    res.status(201).json({ message: messages.faq.submit_success });
  } catch (err) {
    res.status(400).json({ message: messages.common.bad_request });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, order } = req.body;

    const updatedFaq = await Faq.findByIdAndUpdate(
      id,
      { question, answer, order },
      { new: true, runValidators: true }
    );

    if (!updatedFaq) {
      return res.status(404).json({ message: messages.faq.not_found });
    }

    res.json(updatedFaq);
  } catch (err) {
    res
      .status(500)
      .json({ message: messages.common.server_error, error: err.message });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFaq = await Faq.findByIdAndDelete(id);

    if (!deletedFaq) {
      return res.status(404).json({ message: messages.faq.not_found });
    }

    res.json({ message: messages.faq.delete_success });
  } catch (err) {
    res
      .status(500)
      .json({ message: messages.common.server_error, error: err.message });
  }
};
