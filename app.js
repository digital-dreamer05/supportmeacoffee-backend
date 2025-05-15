const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const userRoutes = require("./routes/userRoutes");
const donationRoutes = require("./routes/donationRoutes");
const globalErrorHandler = require("./controllers/v1/errorController");

const app = express();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 MIN
  max: 100,
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/", (req, res) => {
  res.render("home");
});

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/donations", donationRoutes);

// Global error handler (must be last)
app.use(globalErrorHandler);

module.exports = app;
