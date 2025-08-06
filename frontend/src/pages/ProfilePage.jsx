import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, LoaderCircle, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [isSavingBio, setIsSavingBio] = useState(false);
  const [isSavingName, setIsSavingName] = useState(false);
  const fileInputRef = React.useRef(null);

  // Initialize form fields with user data
  useEffect(() => {
    if (authUser) {
      setName(authUser.name || "");
      setBio(authUser.bio || "");
    }
  }, [authUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image size (e.g., 2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      try {
        const base64Image = reader.result;
        setSelectedImg(base64Image);
        await updateProfile({ profilePic: base64Image });
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to update profile picture"
        );
      }
    };

    reader.onerror = () => {
      toast.error("Error reading image file");
    };
  };

  const handleBioSave = async () => {
    if (!bio.trim()) return;

    setIsSavingBio(true);
    try {
      await updateProfile({ bio });
      toast.success("Bio updated successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update bio");
    } finally {
      setIsSavingBio(false);
    }
  };

  const handleNameSave = async () => {
    if (!name.trim()) return;

    setIsSavingName(true);
    try {
      await updateProfile({ name });
      toast.success("Name updated successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update name");
    } finally {
      setIsSavingName(false);
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
    <div className="min-h-screen bg-base-100 flex flex-col items-center px-4 py-10">
      {/* Profile Picture Section */}
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary relative">
          <img
            src={selectedImg || authUser.profilePic || "/avatar.png"}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/avatar.png";
            }}
          />

          {/* Camera overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <label className="flex flex-col items-center justify-center text-white">
              <Camera className="w-6 h-6" />
              <span className="text-xs mt-1">Change Photo</span>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center mt-2">
          {isUpdatingProfile ? (
            <span className="flex items-center justify-center gap-1">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Uploading...
            </span>
          ) : (
            "Hover to change your photo"
          )}
        </p>
      </div>

      {/* Profile Information */}
      <div className="mt-8 w-full max-w-md space-y-6">
        {/* Editable Name Field */}
        <div className="space-y-1">
          <label className="text-sm text-gray-500">Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <button
              className="btn btn-primary"
              onClick={handleNameSave}
              disabled={isSavingName || name === authUser.name}
            >
              {isSavingName ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>

        {/* Non-editable Email */}
        <div className="space-y-1">
          <label className="text-sm text-gray-500">Email</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={authUser.email}
            readOnly
            disabled
          />
        </div>

        {/* Editable Bio */}
        <div className="space-y-1">
          <label className="text-sm text-gray-500">Bio</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
          />
          <button
            className="btn btn-primary mt-2"
            onClick={handleBioSave}
            disabled={isSavingBio || bio === authUser.bio}
          >
            {isSavingBio ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              "Save Bio"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
