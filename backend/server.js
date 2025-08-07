import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js'

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


//API routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

//server connection test
app.get("/", (request, response) => {
  return response.status(200).send("Backend running");
});

//start server
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
  connectDB();
});
