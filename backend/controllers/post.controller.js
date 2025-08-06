  import Post from '../models/post.model.js';
  import User from '../models/user.model.js';

  //create a post
  export const createPost = async (req, res) => {
    const {content, userId} = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const post = new Post ({
            content,
            author : userId,
        })
        await post.save();
        res.status(201).json({
            message : "Post created successfully",
            post : post,
        });
    } catch (error) {
        console.log("Error in createPost controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
  };


  //get all public posts
  export const getAllPublicPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        .populate('author', 'name profilePicture')
        .sort({ createdAt: -1 });

        res.status(200).json({
            message: "All public posts fetched successfully",
            posts: posts,
        });
    } catch (error) {
        console.log("Error in getAllPublicPosts controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
  }


  //get a post from specific user
  export const getUserPosts = async (req, res) => {
    const {userId} = req.params;

    try {
        const posts = await Post.find({ author: userId })
          .populate("author", "name profilePicture")
          .sort({ createdAt: -1 });

        res.status(200).json({
            message: "User posts fetched successfully",
            posts: posts,
        });
    } catch (error) {
         console.log("Error in getUserPosts controller", error.message);
         res.status(500).json({ message: "Internal server error" });
    }
  }