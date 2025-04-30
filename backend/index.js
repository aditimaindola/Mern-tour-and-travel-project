import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import packageRoute from "./routes/package.route.js";
import ratingRoute from "./routes/rating.route.js";
import bookingRoute from "./routes/booking.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import braintree from "braintree";

// Importing the connection function
import connectDB from "./db.js";  // New import for DB connection

dotenv.config();
const app = express();
const __dirname = path.resolve();

// ✅ Connect to MongoDB using the connectDB function
connectDB();

// ✅ Middleware
app.use(
  cors({
    origin: process.env.SERVER_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/package", packageRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/booking", bookingRoute);

// ✅ Production Static Files
if (process.env.NODE_ENV_CUSTOM === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Welcome to travel and tourism app 🌍");
  });
}

// Braintree Payment Gateway Setup
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Optional Debug Log
console.log("🟢 Braintree Public Key Loaded:", process.env.BRAINTREE_PUBLIC_KEY);

// ✅ Server Start
app.listen(8000, () => {
  console.log("🚀 Server is running on http://localhost:8000");
});
