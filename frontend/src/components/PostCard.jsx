import { formatDistanceToNow } from "date-fns";

const PostCard = ({ post }) => {
  const { author, content, createdAt } = post;

  return (
    <div className="bg-base-100 p-4 rounded-xl shadow-md mb-4">
      <div className="flex items-start gap-4">
        {/* Profile Picture */}
        <div className="avatar">
          <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={post.author?.profilePicture || "/default-avatar.png"}
              alt="profile"
            />
          </div>
        </div>

        {/* Post Info */}
        <div className="flex-1">
          {/* Name, Bio, Timestamp */}
          <div className="mb-1">
            <h2 className="font-semibold text-lg">
              {post.author?.fullName || "Unknown"}
            </h2>
            <p className="text-sm text-gray-400">
              {author?.bio || "No bio provided"}
            </p>
            <p className="text-xs text-gray-300">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </p>
          </div>

          {/* Content */}
          <p className="text-base text-gray-300 mt-2">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
