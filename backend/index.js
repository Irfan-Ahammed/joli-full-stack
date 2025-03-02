import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import categoryRoute from "./routes/category.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config(); // Load environment variables

const app = express();


const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://joli-india.vercel.app", // Make sure this matches your frontend domain
  credentials: true, // Allow cookies & authentication headers
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Cookie"], // Allow 'Cookie'
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions)); // Apply updated CORS settings
app.options("*", cors(corsOptions)); // Handle preflight requests

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hi there."));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/category", categoryRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});