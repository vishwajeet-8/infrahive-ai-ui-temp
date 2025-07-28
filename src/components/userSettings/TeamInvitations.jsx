import React, { useEffect, useState } from "react";
import { Mail, Users, Clock, CheckCircle, Trash2 } from "lucide-react";
import SendInvite from "@/invite/SendInvite";
import api from "@/utils/api";
import UserManagement from "./UserManagement";

export default function TeamInvitations() {
  const [invitations, setInvitations] = useState([
    {
      id: 1,
      email: "john@example.com",
      role: "Admin",
      status: "Accepted",
      sentAt: "Jun 25, 2024, 10:30 AM",
    },
    {
      id: 2,
      email: "sarah@example.com",
      role: "Editor",
      status: "Pending",
      sentAt: "Jun 26, 2024, 02:15 PM",
    },
    {
      id: 3,
      email: "mike@example.com",
      role: "Viewer",
      status: "Expired",
      sentAt: "Jun 20, 2024, 09:45 AM",
    },
  ]);

  //   const handleDeleteInvitation = (id) => {
  //     setInvitations(invitations.filter((inv) => inv.id !== id));
  //   };

  const getStatusBadge = (status) => {
    const styles = {
      Accepted: "bg-green-100 text-green-800 border-green-200",
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Expired: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  const totalInvites = invitations.length;
  const pendingInvites = invitations.filter(
    (inv) => inv.status === "Pending"
  ).length;
  const acceptedInvites = invitations.filter(
    (inv) => inv.status === "Accepted"
  ).length;

  useEffect(() => {
    const fetchAllInvites = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await api.get("/all-invites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setInvitations(res.data);
        console.log(res);
      } catch (error) {}
    };
    fetchAllInvites();
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-8 text-center border-b">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Team Invitations
            </h1>
            <p className="text-gray-600">
              Invite team members to collaborate and manage their access levels
            </p>
          </div>

          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Send Invitation Form */}
              <SendInvite />

              {/* Sent Invitations */}
              <div className="lg:w-2/3 overflow-y-scroll h-80">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Sent Invitations ({invitations.length})
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Manage your team invitations and their status
                </p>

                {invitations.length === 0 ? (
                  <h2 className="text-lg font-semibold text-gray-900 text-center">
                    Send Invitations To Your Teammates
                  </h2>
                ) : (
                  <>
                    {/* Table Header */}
                    <div className="bg-gray-50 rounded-t-lg px-4 py-3 flex items-center text-sm font-medium text-gray-700 border">
                      <div className="flex-1 min-w-0">Email</div>
                      <div className="w-24 text-center">Role</div>
                      <div className="w-24 text-center">Status</div>
                      <div className="w-40 text-center">Sent At</div>
                      {/* <div className="w-16 text-center">Actions</div> */}
                    </div>

                    {/* Table Rows */}
                    <div className="border-l border-r border-b rounded-b-lg">
                      {invitations.map((invitation) => (
                        <div
                          key={invitation.id}
                          className="px-4 py-4 flex items-center border-b last:border-b-0 hover:bg-gray-50"
                        >
                          <div className="flex-1 min-w-0 text-sm text-gray-900 truncate pr-4">
                            {invitation.email}
                          </div>
                          <div className="w-24 text-sm text-gray-600 text-center">
                            {invitation.role}
                          </div>
                          <div className="w-24 flex justify-center">
                            {getStatusBadge(invitation.status)}
                          </div>
                          <div className="w-40 text-sm text-gray-600 text-center">
                            {new Date(invitation.sentAt).toLocaleString(
                              "en-IN",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }
                            )}
                          </div>
                          {/* <div className="w-16 flex justify-center">
                        <button
                          onClick={() => handleDeleteInvitation(invitation.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div> */}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-col md:flex-row gap-6 mt-8">
              <div className="flex-1 bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">
                      Total Invites
                    </p>
                    <p className="text-2xl font-bold text-blue-900">
                      {totalInvites}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="flex-1 bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 text-sm font-medium">
                      Pending
                    </p>
                    <p className="text-2xl font-bold text-yellow-900">
                      {pendingInvites}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </div>

              <div className="flex-1 bg-green-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">
                      Accepted
                    </p>
                    <p className="text-2xl font-bold text-green-900">
                      {acceptedInvites}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <UserManagement />
      </div>
    </>
  );
}
