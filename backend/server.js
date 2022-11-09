const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const PORT = process.env.PORT || 5000;

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

connectDB();

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1/users", userRouter);

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
