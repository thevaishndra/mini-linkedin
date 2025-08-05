import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';

dotenv.config();

const PORT = process.env.PORT;

//
app.use(express.json());
app.use(cors());

//API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//start server
server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
  connectDB();
});
