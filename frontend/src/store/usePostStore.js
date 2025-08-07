import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const usePostStore = create((set) => ({
  posts: [], // This is your public posts array
  userPosts: [],
  isLoadingPosts: false,
  isLoadingPost: false,
  isCreatingPost: false,

  // Create a new post
  createPost: async (data) => {
    set({ isCreatingPost: true });
    try {
      const res = await axiosInstance.post("/posts", data);

      set((state) => ({
        posts: Array.isArray(state.posts)
          ? [res.data.post, ...state.posts]
          : [res.data.post],
      }));

      toast.success("Post created successfully");
    } catch (error) {
      console.error("Error while creating post:", error);
      toast.error(error?.response?.data?.message || "Failed to create post");
    } finally {
      set({ isCreatingPost: false });
    }
  },

  // Get all public posts (renamed from getAllPosts to getAllPublicPosts)
  getAllPublicPosts: async () => {
    set({ isLoadingPosts: true });
    try {
      const res = await axiosInstance.get("/posts");
      set({ posts: res.data.posts });
    } catch (error) {
      console.error("Error while fetching public posts:");
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Status:", error.response.status);
      } else {
        console.error("Error while creating post:", error);
      }

    } finally {
      set({ isLoadingPosts: false });
    }
  },

  // Get posts by specific user
  getPostsByUser: async (userId) => {
    set({ isLoadingPost: true });
    try {
      const res = await axiosInstance.get(`/posts/user/${userId}`);
      set({ userPosts: res.data });
    } catch (error) {
      console.error("Error while fetching user posts:");
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Status:", error.response.status);
      } else {
        console.error("Error Message:", error.message);
      }
    } finally {
      set({ isLoadingPost: false });
    }
  },
}));
