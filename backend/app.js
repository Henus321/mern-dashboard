const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const hpp = require("hpp");
const compression = require("compression");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorsController");
const profileAuthRouter = require("./routes/profileAuthRoutes");
const ordersRouter = require("./routes/ordersRoutes");
const productsRouter = require("./routes/productsRoutes");
const customersRouter = require("./routes/customersRoutes");

const app = express();

// Security HTTP headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "*.unsplash.com"],
    },
  })
);

// Logging in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Request limit
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Compress text on response
app.use(compression());

// Routes
app.use("/api/v1/profile-auth", profileAuthRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/customers", customersRouter);

// Static files
app.use("/uploads", express.static("../frontend/public/uploads"));

if (process.env.NODE_ENV === "production") {
  // Set static folder up in production
  app.use(express.static("../frontend/dist"));
  app.get("/*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
  );
}

// Errors
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
