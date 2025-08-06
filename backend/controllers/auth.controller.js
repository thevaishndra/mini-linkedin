import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/token.js';
import cloudinary from '../lib/cloudinary.js';


//signup
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
      //validation
      if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be atleast 6 characters long" });
      }

      //check if email already exists
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ message: "User already exists with this email" });
      }

      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //new user
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });

      if (newUser) {
        generateToken(newUser._id, res);
        await newUser.save();

        //return user details
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          bio: newUser.bio,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({message : "Invalid user data"});
      }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(400).json({message : "Internal server error"});
    }
};


//login
export const login = async (req, res) => {
    const {email, password} = req.body();

    try {
      //find user email
      const user = await User.findOne({email});
      if(!user) {
        return res.status(400).json({message : "Invalid credentials"});
      }

      //validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(!isPasswordValid) {
        return res.status(400).json({message : "Invalid credentials"});
      }

      //jwt token
      generateToken(user._id, res);

      //return user details
      res.status(201).json({
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          bio: user.bio,
          profilePic: user.profilePic,
      });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(400).json({ message: "Internal server error" });
    }
};


//logout
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge : 0}),
        res.status(200).json({message : "User logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}


//profile updation
export const updateProfile = async (req, res) => {
  try {
    const {profilePic, bio} = req.body;
    const userId = req.user._id;

    const updateData = {};

    // Upload profile pic to Cloudinary if provided
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updateData.profilePic = uploadResponse.secure_url;
    }

    // Update bio if provided
    if (bio) {
      updateData.bio = bio;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//Check user authentication
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}
