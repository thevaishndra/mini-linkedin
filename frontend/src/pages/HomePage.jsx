import React, { useEffect } from "react";
import { usePostStore } from "../store/usePostStore";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderCircle } from "lucide-react";
import { Navbar } from "../components/Navbar.jsx";
import { CreatePost } from "../components/CreatePost";
import { PostCard } from "../components/PostCard";

const Home = () => {
  const { getAllPublicPosts, publicPosts, isLoadingPosts } = usePostStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getAllPublicPosts();
  }, [getAllPublicPosts]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Navbar */}
      <Navbar />

      {/* Main Feed */}
      <main className="max-w-2xl mx-auto mt-6 px-4 pb-10 space-y-6">
        {/* Create Post */}
        {authUser && <CreatePost />}

        {/* Loading Indicator */}
        {isLoadingPosts ? (
          <div className="flex justify-center items-center mt-10">
            <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          // Public Posts
          <div className="space-y-4">
            {publicPosts.length > 0 ? (
              publicPosts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <p className="text-center text-gray-500">No posts yet.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
