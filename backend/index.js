import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import categoryRoute from "./routes/category.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

console.log("Origin:", process.env.FRONTEND_URL);

const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => res.send("Hi there."));
app.use("/api/v1/user", userRoute);
//http://localhost:8000/api/v1/user/register
//http://localhost:8000/api/v1/user/login
//http://localhost:8000/api/v1/user/profile/update

app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/category", categoryRoute);

app.listen(PORT, "0.0.0.0", async () => {
  await connectDB();
  console.log(`server running at port ${PORT}`);
});
