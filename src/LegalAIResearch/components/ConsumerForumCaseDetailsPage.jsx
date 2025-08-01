import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  FileText,
  Clock,
  User,
  Briefcase,
  Flag,
  X,
  ExternalLink,
  AlertTriangle,
  Star,
} from "lucide-react";
import api from "@/utils/api";
import { useParams } from "react-router-dom";

const ConsumerForumCaseDetails = () => {
  const { workspaceId } = useParams();
  // State for input field
  const [caseNumber, setCaseNumber] = useState("");

  // State for results and UI states
  const [caseDetails, setCaseDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // State for follow functionality
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // // Fetch case details
  // const fetchCaseDetails = async () => {
  //   if (!caseNumber.trim()) return;

  //   setIsLoading(true);
  //   setError(null);
  //   setCaseDetails(null);
  //   setIsFollowing(false);

  //   try {
  //     const response = await fetch(`https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/consumer-forum/case/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
  //       },
  //       body: JSON.stringify({ caseNumber }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       if (response.status === 403) {
  //         throw new Error('Access denied. Your session may have expired or you don\'t have permission to access this resource.');
  //       } else if (data && data.error) {
  //         throw new Error(data.error);
  //       } else {
  //         throw new Error(`Error ${response.status}: ${response.statusText}`);
  //       }
  //     }

  //     if (data && data.error) {
  //       throw new Error(data.error);
  //     }

  //     setCaseDetails(data);
  //     setSearchPerformed(true);

  //     // Check if the case is already followed
  //     const followCheckResponse = await fetch(`${import.meta.env.VITE_FOLLOW_API_URL}/api/get-followed-cases`, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     const followData = await followCheckResponse.json();
  //     if (followData.success && followData.cases.some(c => c.caseId === data.caseNumber)) {
  //       setIsFollowing(true);
  //     }
  //   } catch (err) {
  //     setError(err.message || "An error occurred during search");
  //     setCaseDetails(null);
  //     setSearchPerformed(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // // Handle follow/unfollow
  // const handleFollowToggle = async () => {
  //   if (!caseDetails) return;

  //   setFollowLoading(true);
  //   const caseId = caseDetails.caseNumber;

  //   try {
  //     if (isFollowing) {
  //       // Unfollow
  //       const response = await fetch(`${import.meta.env.VITE_FOLLOW_API_URL}/api/unfollow-case`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ caseId }),
  //       });
  //       const data = await response.json();
  //       if (!response.ok || !data.success) {
  //         throw new Error(data.error || 'Failed to unfollow case');
  //       }
  //       setIsFollowing(false);
  //     } else {
  //       // Follow
  //       const caseData = {
  //         caseId: caseDetails.caseNumber,
  //         caseNumber: caseDetails.caseNumber,
  //         commission: caseDetails.commission,
  //         status: caseDetails.status?.stage,
  //         court: 'Consumer Forum',
  //         filingNumber: caseDetails.filing?.number,
  //         filingDate: caseDetails.filing?.date,
  //         complainant: caseDetails.parties?.complainant?.join(', '),
  //         respondent: caseDetails.parties?.respondent?.join(', '),
  //         followedAt: new Date().toISOString(),
  //         details: caseDetails, // Store all details as-is
  //       };

  //       const response = await fetch(`${import.meta.env.VITE_FOLLOW_API_URL}/api/follow-case`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(caseData),
  //       });
  //       const data = await response.json();
  //       if (!response.ok || !data.success) {
  //         throw new Error(data.error || 'Failed to follow case');
  //       }
  //       setIsFollowing(true);
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setFollowLoading(false);
  //   }
  // };

  // Fetch case details
  const fetchCaseDetails = async () => {
    if (!caseNumber.trim()) return;

    setIsLoading(true);
    setError(null);
    setCaseDetails(null);
    setIsFollowing(false);

    try {
      // Call external API for case details
      const response = await api.post(
        "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/consumer-forum/case/",
        { caseNumber },
        {
          headers: {
            Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
          },
        }
      );

      const data = response.data;

      setCaseDetails(data);
      setSearchPerformed(true);

      // Check if already followed
      const followCheckResponse = await api.get(
        `/get-followed-cases?workspaceId=${workspaceId}`
      );
      const followData = followCheckResponse.data;

      if (
        followData.success &&
        followData.cases.some((c) => c.caseId === data.caseNumber)
      ) {
        setIsFollowing(true);
      }
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "An error occurred during search";
      setError(message);
      setCaseDetails(null);
      setSearchPerformed(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle follow/unfollow
  const handleFollowToggle = async () => {
    if (!caseDetails) return;

    setFollowLoading(true);
    const caseId = caseDetails.caseNumber;

    try {
      if (isFollowing) {
        // Unfollow
        const response = await api.delete("/unfollow-case", {
          data: { caseId },
        });
        const data = response.data;

        if (!data.success) {
          throw new Error(data.error || "Failed to unfollow case");
        }

        setIsFollowing(false);
      } else {
        // Follow
        const caseData = {
          case_id: caseDetails.caseNumber,
          caseNumber: caseDetails.caseNumber,
          commission: caseDetails.commission,
          status: caseDetails.status?.stage,
          court: "Consumer Forum",
          filingNumber: caseDetails.filing?.number,
          filingDate: caseDetails.filing?.date,
          complainant: caseDetails.parties?.complainant?.join(", "),
          respondent: caseDetails.parties?.respondent?.join(", "),
          followedAt: new Date().toISOString(),
          details: caseDetails,
          workspace_id: workspaceId,
        };

        const response = await api.post("/follow-case", caseData);
        const data = response.data;

        if (!data.success) {
          throw new Error(data.error || "Failed to follow case");
        }

        setIsFollowing(true);
      }
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "Failed to toggle follow state";
      setError(message);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCaseDetails();
  };

  const handleRetry = () => {
    fetchCaseDetails();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  // Safe render function for potentially complex objects
  const safeRender = (data) => {
    if (data === null || data === undefined) return "N/A";
    if (typeof data === "object") return JSON.stringify(data);
    return data;
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Consumer Forum - Case Details
      </h2>
      <div className="bg-white p-6 rounded-md border border-gray-200 max-w-xl shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="case-number"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Case Number
              </label>
              <input
                type="text"
                id="case-number"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="e.g. DC/83/CC/332/2024"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter the complete case number (Example:- DC/83/CC/332/2024)
              </p>
            </div>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setCaseNumber("");
                  setCaseDetails(null);
                  setSearchPerformed(false);
                  setError(null);
                  setIsFollowing(false);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                disabled={isLoading || !caseNumber.trim()}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Get Case Details</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Enhanced Error Message */}
      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-md">
          <div className="p-4 flex items-start">
            <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0 text-red-600" />
            <div className="flex-1 text-red-700">
              <p className="font-medium">{error}</p>
              {error.includes("403") && (
                <p className="mt-1 text-sm">
                  This could be due to an expired session or authentication
                  issue.
                </p>
              )}
              <div className="mt-3">
                <button
                  onClick={handleRetry}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                >
                  Retry Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="mt-6 p-4 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Fetching case details...</p>
        </div>
      )}

      {caseDetails && (
        <div className="mt-6">
          <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
            {/* Case Header */}
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h3 className="text-lg font-semibold">
                    {caseDetails.caseNumber || "N/A"}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Commission: {caseDetails.commission || "N/A"}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center gap-4">
                  {caseDetails.status && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {caseDetails.status.stage || "UNKNOWN"}
                    </span>
                  )}
                  <button
                    onClick={handleFollowToggle}
                    disabled={followLoading}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isFollowing
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {followLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                    ) : (
                      <>
                        <Star
                          size={16}
                          className={
                            isFollowing ? "text-yellow-600 fill-yellow-500" : ""
                          }
                        />
                        <span>{isFollowing ? "Following" : "Follow"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Case Details */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Filing Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FileText size={16} className="mr-2" />
                  Filing Information
                </h4>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-500 w-32">Filing Number:</span>
                    <span>{caseDetails.filing?.number || "N/A"}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-32">Filing Date:</span>
                    <span>{formatDate(caseDetails.filing?.date)}</span>
                  </div>
                </div>
              </div>

              {/* Status Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Flag size={16} className="mr-2" />
                  Current Status
                </h4>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-500 w-32">Stage:</span>
                    <span>{caseDetails.status?.stage || "N/A"}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-32">Purpose:</span>
                    <span>{caseDetails.status?.purpose || "N/A"}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-32">Next Hearing:</span>
                    <span>{formatDate(caseDetails.status?.nextHearing)}</span>
                  </div>
                </div>
              </div>

              {/* Parties Information */}
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <User size={16} className="mr-2" />
                  Parties
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs uppercase text-gray-500 mb-2">
                      Complainant(s)
                    </h5>
                    {caseDetails.parties?.complainant?.length ? (
                      <ul className="list-disc list-inside space-y-1">
                        {caseDetails.parties.complainant.map(
                          (complainant, index) => (
                            <li key={index} className="text-gray-800">
                              {safeRender(complainant)}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No complainant information available
                      </p>
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs uppercase text-gray-500 mb-2">
                      Respondent(s)
                    </h5>
                    {caseDetails.parties?.respondent?.length ? (
                      <ul className="list-disc list-inside space-y-1">
                        {caseDetails.parties.respondent.map(
                          (respondent, index) => (
                            <li key={index} className="text-gray-800">
                              {safeRender(respondent)}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No respondent information available
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Case History */}
              {caseDetails.history && caseDetails.history.length > 0 && (
                <div className="md:col-span-2 mt-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Clock size={16} className="mr-2" />
                    Case History
                  </h4>
                  <div className="space-y-4">
                    {caseDetails.history.map((event, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-md p-3"
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                          <div className="flex items-center">
                            <span className="text-gray-700 font-medium">
                              {formatDate(event.date)}
                            </span>
                            {event.dailyOrder && (
                              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                Daily Order
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 mt-1 md:mt-0">
                            Stage: {event.stage || "N/A"}
                          </div>
                        </div>
                        {event.proceeding && (
                          <div className="mt-2 bg-gray-50 p-3 rounded text-gray-700 text-sm whitespace-pre-line">
                            {typeof event.proceeding === "object"
                              ? JSON.stringify(event.proceeding)
                              : event.proceeding}
                          </div>
                        )}
                        {event.nextDate && (
                          <div className="mt-2 text-sm">
                            <span className="text-gray-500">Next Date:</span>
                            <span className="text-gray-700">
                              {formatDate(event.nextDate)}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {caseDetails.applications &&
                caseDetails.applications.length > 0 && (
                  <div className="md:col-span-2 mt-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <Briefcase size={16} className="mr-2" />
                      Applications
                    </h4>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            Filed On
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {caseDetails.applications.map((app, index) => (
                          <tr key={index}>
                            <td className="px-3 py-2 text-sm text-gray-800">
                              {safeRender(app.type)}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-800">
                              {formatDate(app.filedOn)}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-800">
                              {safeRender(app.status)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              {/* Lower Court Cases */}
              {caseDetails.lowerCourtCases &&
                caseDetails.lowerCourtCases.length > 0 && (
                  <div className="md:col-span-2 mt-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <Briefcase size={16} className="mr-2" />
                      Lower Court Cases
                    </h4>
                    <div className="space-y-2">
                      {caseDetails.lowerCourtCases.map((lowerCase, index) => (
                        <div
                          key={index}
                          className="p-3 border border-gray-200 rounded-md"
                        >
                          <p className="font-medium">
                            {lowerCase.caseNumber || "N/A"}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {safeRender(lowerCase.court)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {searchPerformed && !caseDetails && !isLoading && !error && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
          No case details found for the provided case number. Please verify and
          try again.
        </div>
      )}
    </div>
  );
};

export default ConsumerForumCaseDetails;
