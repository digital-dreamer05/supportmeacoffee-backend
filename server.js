const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 4002;
const dbUrl = process.env.DATABASE_LOCAL;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

(async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB Connected :)");

    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });

    process.on("unhandledRejection", (err) => {
      console.log("UNHANDLED REJECTION! 💥 Shutting down...");
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on("SIGTERM", () => {
      console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
      server.close(() => {
        console.log("💥 Process terminated!");
      });
    });
  } catch (err) {
    console.log("❌ Failed to connect to DB:", err);
  }
})();

////////// ⚠️⚠️⚠️NEED TO CHANGE! /////////
