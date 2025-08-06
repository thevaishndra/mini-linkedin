import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { usePostStore } from "../store/usePostStore";

const CreatePost = () => {
  const { authUser } = useAuthStore();
  const { createPost, getAllPosts } = usePostStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (!content.trim()) return;

    try {
      await createPost({ content }); // <-- send object not string
      await getAllPosts(); // <-- refresh posts after posting
      setContent("");
      setIsExpanded(false);
    } catch (error) {
      // error toast already handled inside the store
    }
  };

  return (
    <div className="bg-base-100 p-4 rounded-xl shadow-md mb-6">
      <div className="flex items-start gap-4">
        {/* Profile Picture */}
        <div className="avatar">
          <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={authUser?.profilePicture || "/default-avatar.png"}
              alt="profile"
            />
          </div>
        </div>

        {/* Post Input Area */}
        <div className="flex-1">
          {!isExpanded ? (
            <div
              className="btn btn-sm btn-outline w-full text-left text-gray-500"
              onClick={() => setIsExpanded(true)}
            >
              Start a post...
            </div>
          ) : (
            <>
              <textarea
                className="textarea textarea-bordered w-full resize-none"
                rows={3}
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              <div className="mt-2 flex justify-end gap-2">
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => {
                    setIsExpanded(false);
                    setContent("");
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-sm btn-primary" onClick={handlePost}>
                  Post
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
