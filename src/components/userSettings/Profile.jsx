import api from "@/utils/api.js";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setName(response.data.name || response.data.email.split("@")[0]);
      setPreviewUrl(response.data.profile_picture_url || null); // ✅ only this
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) formData.append("profile_picture", profilePhoto);

    try {
      setUpdating(true);
      await api.patch("/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchUser(); // This will update all state variables
      setIsEditing(false);
      setPreviewUrl(null);
    } catch (err) {
      console.error("Profile update failed", err);
      alert("Update failed. Try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset name to current user data
    setName(user.name || user.email.split("@")[0]);
    setProfilePhoto(null);
    setPreviewUrl(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "owner":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "admin":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "user":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getInitials = (email) => {
    return email?.split("@")[0]?.charAt(0)?.toUpperCase() || "U";
  };

  // Credits Overview Component
  const CreditsOverview = () => {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Credits Overview
            </h2>
            <p className="text-gray-600">
              Credits are assigned to each account and used across workspaces
              for all users
            </p>
          </div>

          {/* Main Credit Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Research Queries Card */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-600">
                  Research Queries/Credits
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                User searches for Supreme Court cases. Successful results (not
                empty) count as 1 credit.
              </p>

              <div className="mb-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    84,580
                  </span>
                  <span className="text-gray-500">/ 100,000 per year</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                  <span>Used: 15,420</span>
                  <span>15.4%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "15.4%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Definition</h4>
                <p className="text-blue-800 text-sm">
                  A user search for a Supreme Court case that returns successful
                  results (not empty) counts as 1 credit.
                </p>
              </div>
            </div>

            {/* Extraction Queries Card */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">📄</span>
                </div>
                <h3 className="text-lg font-semibold text-green-600">
                  Extraction Queries/Credits
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                Document processing and AI extraction with word-based usage
                tracking.
              </p>

              <div className="mb-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    76,850
                  </span>
                  <span className="text-gray-500">/ 100,000 words per day</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                  <span>Used: 23,150 words</span>
                  <span>23.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "23.2%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">
                  Definition
                </h4>
                <p className="text-green-800 text-sm">
                  Users process documents through AI extraction. Each word in
                  the extracted results counts toward the daily limit.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">📅</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Reset Period</h4>
              <p className="text-sm text-gray-600 mb-2">
                Research: Yearly Reset
                <br />
                Extraction: Daily Reset
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 text-xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Total Usage</h4>
              <p className="text-sm text-gray-600 mb-2">38,570 credits used</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">🔍</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Account Scope
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Credits shared across all workspaces and users
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 font-medium">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">😔</div>
          <div className="text-red-500 text-lg font-medium mb-4">
            Failed to load user data
          </div>
          <button
            onClick={fetchUser}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 h-24 relative">
            {/* Edit Button */}
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all font-medium border border-white/30"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all font-medium border border-white/30"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={updating}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-12 mb-6">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : user.profile_picture_url ? (
                  <img
                    src={user.profile_picture_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-gray-700">
                    {getInitials(user.email)}
                  </span>
                )}
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>

              {/* Photo Upload Button (only in edit mode) */}
              {isEditing && (
                <div className="absolute -bottom-2 -right-2">
                  <label className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <span className="text-sm">📷</span>
                  </label>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="space-y-6">
              <div>
                {isEditing ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {user.name || user.email.split("@")[0]}
                  </h1>
                )}
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                  <span className="text-gray-500">ID: {user.id}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">✉️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-lg">📅</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Member Since
                    </p>
                    <p className="text-gray-900">
                      {formatDate(user.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {user.id}
                  </div>
                  <div className="text-sm text-gray-500">User ID</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">Active</div>
                  <div className="text-sm text-gray-500">Status</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credits Overview - Only show for owners */}
        {user.role?.toLowerCase() === "owner" && <CreditsOverview />}
      </div>
    </div>
  );
};

export default Profile;
