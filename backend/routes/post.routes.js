import express from 'express';
import { createPost, getAllPublicPosts, getUserPosts } from '../controllers/post.controller';
import { protectRoute } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/", getAllPublicPosts);
router.get("/user/:userId", getUserPosts);

export default router;
