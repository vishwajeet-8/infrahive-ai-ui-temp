import React, { useEffect, useState } from "react";
import { Trash2, Crown, User, X, AlertTriangle } from "lucide-react";
import api from "@/utils/api";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 17,
      email: "vishwajeetrout8@gmail.com",
      role: "Member",
      created_at: "2025-06-29T13:02:32.315Z",
    },
    {
      id: 16,
      email: "vishwajeet@infrahive.ai",
      role: "Member",
      created_at: "2025-06-29T11:57:04.422Z",
    },
    {
      id: 14,
      email: "admin@infrahive.ai",
      role: "Owner",
      created_at: "2025-06-29T10:19:30.237Z",
    },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Sort users: Owner first, then Members
  const sortedUsers = [...users].sort((a, b) => {
    if (a.role === "Owner" && b.role !== "Owner") return -1;
    if (b.role === "Owner" && a.role !== "Owner") return 1;
    return 0;
  });

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (userId) => {
    if (userToDelete) {
      const token = localStorage.getItem("token");
      try {
        const res = await api.delete(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setUsers(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="mx-auto p-6 bg-white mt-2">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          User Management
        </h1>
        <p className="text-gray-600">Manage your team members</p>
      </div>

      <div className="space-y-4">
        {sortedUsers.map((user) => (
          <div
            key={user.id}
            className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-md ${
              user.role === "Owner"
                ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 shadow-sm"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-full ${
                    user.role === "Owner"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role === "Owner" ? (
                    <Crown className="w-6 h-6" />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-3">
                    <h3
                      className={`text-lg ${
                        user.role === "Owner"
                          ? "font-extrabold text-gray-900"
                          : "font-semibold text-gray-800"
                      }`}
                    >
                      {user.email}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role === "Owner"
                          ? "bg-amber-200 text-amber-800 font-bold"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <p
                    className={`text-sm mt-1 ${
                      user.role === "Owner"
                        ? "text-gray-700 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    Joined on {formatDate(user.created_at)}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      user.role === "Owner"
                        ? "text-gray-600 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    ID: {user.id}
                  </p>
                </div>
              </div>

              {user.role === "Member" && (
                <button
                  onClick={() => handleDeleteClick(user)}
                  className="p-2 rounded-lg transition-all duration-200 text-gray-400 hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  title="Delete user"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No users found
          </h3>
          <p className="text-gray-500">All users have been removed.</p>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-semibold">ℹ</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              User Management Info
            </h4>
            <p className="text-sm text-blue-700">
              Click the trash icon to remove users from your organization.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Remove Member
                </h3>
              </div>
              <button
                onClick={handleCancelDelete}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-3">
                Are you sure you want to remove this member from your workspace?
              </p>
              {userToDelete && (
                <div className="bg-gray-50 p-3 rounded-lg border">
                  <p className="font-medium text-gray-900">
                    {userToDelete.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    Member since {formatDate(userToDelete.created_at)}
                  </p>
                </div>
              )}
              <p className="text-sm text-red-600 mt-3 font-medium">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(userToDelete.id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Remove Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
