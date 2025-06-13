import { Loader2, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
export default function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  const { isUpdatingProfile, updateProfile } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile(formData);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 mt-12 space-y-4">
      <div className="p-8 rounded-xl shadow-lg flex flex-col items-center space-y-4 max-w-xl w-full">
        <h1 className="text-xl m-4 text-white">Profile</h1>
        <p className="">Your profile information</p>

        <img
          src="https://images.unsplash.com/photo-1594751543129-6701ad444259?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
          alt="profile-pic"
          className="w-32 h-32 rounded-full"
        />
        <p>click the camera icon to update your photo</p>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
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
                placeholder="abduselam"
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

      <div className="p-8 rounded-xl shadow-lg flex flex-col items-start space-y-4 max-w-xl w-full">
        <h1>account information</h1>

        <h2>Memeber since</h2>
        <h2>Account status</h2>
      </div>
    </div>
  );
}
