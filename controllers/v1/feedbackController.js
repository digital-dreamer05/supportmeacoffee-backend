const Feedback = require("../../models/feedbackModel");
const messages = require("../../utils/messages/fa");

exports.submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res
      .status(201)
      .json({ message: messages.feedback.submit_success, feedback });
  } catch (err) {
    console.error("Error saving feedback:", err);
    res
      .status(400)
      .json({ message: messages.feedback.submit_error, error: err.message });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res
      .status(500)
      .json({ message: messages.feedback.fetch_error, error: err.message });
  }
};
