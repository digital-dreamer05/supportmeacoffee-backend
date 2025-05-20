const Feedback = require("../../models/feedbackModel");

exports.submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "فیدبک با موفقیت ثبت شد", feedback });
  } catch (err) {
    console.error("خطا در ذخیره فیدبک:", err);
    res.status(400).json({ message: "خطا در ثبت فیدبک", error: err.message });
  }
};
