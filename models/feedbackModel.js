const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    unresolvedProblem: {
      type: String,
    },
    dashboardFrequency: {
      type: String,
      enum: ["هر روز", "هفتگی", "ماهانه", "به ندرت", "اصلا"],
      required: true,
    },
    featureSuggestions: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    fullName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
