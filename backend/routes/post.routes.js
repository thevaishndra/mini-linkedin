import express from 'express';
import { createPost, getAllPublicPosts, getUserPosts } from '../controllers/post.controller.js';
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/", getAllPublicPosts);
router.get("/user/:userId", getUserPosts);

export default router;
