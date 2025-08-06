import { create } from "zustand";
import API from "../lib/axios.js";
import toast from "react-hot-toast";

export const usePostStore = create((set) => ({
  posts: [],
  userPosts: [],
  isLoadingPosts: false,
  isLoadingPost: false,
  isCreatingPost: false,

  // Create a new post
  createPost: async (data) => {
    set({ isCreatingPost: true });
    try {
      const res = await API.post("/posts", data);
      set((state) => ({ posts: [res.data, ...state.posts] }));
      toast.success("Post created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create post");
    } finally {
      set({ isCreatingPost: false });
    }
  },


  // Get all public posts
  getAllPosts: async () => {
    set({ isLoadingPosts: true });
    try {
      const res = await API.get("/posts");
      set({ posts: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch posts");
    } finally {
      set({ isLoadingPosts: false });
    }
  },


  // Get posts by specific user
  getPostsByUser: async (userId) => {
    set({ isLoadingPost: true });
    try {
      const res = await API.get(`/posts/user/${userId}`);
      set({ userPosts: res.data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch user's posts"
      );
    } finally {
      set({ isLoadingPost: false });
    }
  },
}));
