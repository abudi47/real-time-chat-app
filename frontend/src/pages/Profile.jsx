import { Camera, Loader2, Mail, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
export default function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    profilePic: null,
  });

  const { isUpdatingProfile, updateProfile, authUser, uploadProgress } =
    useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
      });
    }
  }, [authUser]);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setSelectedImg(URL.createObjectURL(file));
    }
  };
  console.log("authe userr", authUser);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log("update form data", formData);
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);

    if (formData.profilePic) {
      data.append("profilePic", formData.profilePic);
    }

    updateProfile(data);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 mt-12 space-y-4">
      <div className="p-8 rounded-xl shadow-lg flex flex-col items-center space-y-4 max-w-xl w-full">
        <div className="text-center">
          <h1 className="text-2xl font-semibold ">Profile</h1>
          <p className="mt-2">Your profile information</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <div className="text-sm text-zinc-400">
              {isUpdatingProfile ? (
                <div className="w-32 mt-2">
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all text-center"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-center">
                    {uploadProgress}%
                  </p>
                </div>
              ) : (
                <div>
                  <span>
                    Click the image icon to update your profile picture
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <User className="w-5 h-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Mail className="w-5 h-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? (
              <>
                <Loader2 className="size-5 animate-spin " />
                Loading...
              </>
            ) : (
              <>Update</>
            )}
          </button>
        </form>
      </div>

      <div className="p-8 rounded-xl shadow-lg flex  flex-col items-start space-y-4 max-w-xl w-full">
        <h1>account information</h1>

        <div className="flex items-center justify-between w-full py-2 border-b border-zinc-700">
          <span>Memeber since </span>
          <span className="text-green-500" >
            {authUser.createdAt?.split("T")[0]}
          </span>
        </div>
        <div className="flex items-center justify-between w-full py-2 border-b border-zinc-700">
          <span>Account Status</span>
          <span className="text-green-500">Active</span>
        </div>
      </div>
    </div>
  );
}
