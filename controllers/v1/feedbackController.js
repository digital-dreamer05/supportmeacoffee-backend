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

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("خطا در دریافت فیدبک‌ها:", err);
    res
      .status(500)
      .json({ message: "خطا در دریافت فیدبک‌ها", error: err.message });
  }
};
