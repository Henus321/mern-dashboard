// eslint-disable-next-line
const colors = require("colors");
// eslint-disable-next-line
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Any unhandled error/heroku daily maintence
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
