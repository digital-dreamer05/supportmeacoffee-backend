const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 4002;
const dbUrl = process.env.DATABASE_LOCAL;

(async () => {
  await mongoose.connect(dbUrl);
  console.log("MongoDB Connected :)");
})();

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

// This code listens for uncaught exceptions in the Node.js process.
// Uncaught exceptions are errors that are not handled by try...catch blocks.
// If such an error occurs, the callback function logs an error message and details,
// then gracefully shuts down the process by exiting with a status code of 1 (indicating failure).
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1); // Exit the process with a failure code (1)
});

// Listens for unhandled promise rejections (rejected promises without proper error handling)
// When an unhandled rejection occurs, the process logs the error details and shuts down the server
// to prevent potential issues in the application.
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Listens for the SIGTERM signal, which is used to request graceful shutdown of the process
// When the signal is received, the server stops accepting new requests, closes all connections,
// and after the server shuts down, the process exits gracefully.
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
