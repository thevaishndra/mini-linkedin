import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profilePicture: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Set form values on load
  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.fullName || "",
        bio: authUser.bio || "",
        profilePic: authUser.profilePic || "",
      });
    }
  }, [authUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64Image = reader.result;
        setFormData((prev) => ({ ...prev, profilePic: base64Image }));
      } catch (error) {
        toast.error("Error processing image");
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      toast.error("Error reading image file");
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateProfile({
        fullName: formData.name,
        bio: formData.bio,
        profilePic: formData.profilePic,
      });
      toast.success("Profile updated successfully!");
      navigate("/HomePage");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderCircle className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 pt-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl  p-6 sm:p-8 rounded-xl shadow-lg space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Edit Profile</h1>
          <p className="text-gray-500">Update your information below</p>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="relative">
            <img
              src={formData.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-28 sm:size-32 md:size-36 rounded-full object-cover border-4 border-primary"
              onError={(e) => {
                e.target.src = "/avatar.png";
              }}
            />

            <button
              type="button"
              className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 hover:bg-primary-focus transition-all"
              onClick={() => fileInputRef.current.click()}
              disabled={isLoading}
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center mt-1">
            {isLoading ? "Uploading..." : "Click camera icon to change photo"}
          </p>
        </div>

        {/* Name Field */}
        <div className="form-control">
          <label className="label text-sm flex gap-2 items-center text-gray-600">
            <User className="w-4 h-4" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>

        {/* Email Field (readonly) */}
        <div className="form-control">
          <label className="label text-sm flex gap-2 items-center text-gray-600">
            <Mail className="w-4 h-4" />
            Email Address
          </label>
          <input
            type="text"
            className="input input-bordered w-full bg-gray-100"
            value={authUser.email}
            readOnly
            disabled
          />
        </div>

        {/* Bio Field */}
        <div className="form-control">
          <label className="label text-sm text-gray-600">Bio</label>
          <textarea
            name="bio"
            className="textarea textarea-bordered w-full"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isSaving}
        >
          {isSaving ? (
            <LoaderCircle className="animate-spin w-5 h-5" />
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
