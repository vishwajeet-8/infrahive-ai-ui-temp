import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  ExternalLink,
  AlertTriangle,
  Star,
  ShoppingCart,
} from "lucide-react";
import api from "@/utils/api";
import { useParams } from "react-router-dom";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const bgColor =
    status === "COMPLETED" || status === "DISPOSED"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
      {status}
    </span>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);

// Cart Component (unchanged)
const Cart = ({ followedCases, onUnfollow, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "followedAt",
    direction: "desc",
  });

  const filteredCases = Object.entries(followedCases).filter(
    ([id, caseData]) => {
      const searchIn = [
        caseData.title,
        caseData.caseNumber,
        caseData.cnr,
        caseData.petitioner,
        caseData.respondent,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchIn.includes(searchQuery.toLowerCase());
    }
  );

  const sortedCases = [...filteredCases].sort((a, b) => {
    const aValue = a[1][sortConfig.key];
    const bValue = b[1][sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key)
      return sortConfig.direction === "asc" ? "↑" : "↓";
    return "";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold mr-2">Followed Cases</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {Object.keys(followedCases).length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 border-b flex items-center justify-between gap-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search followed cases..."
              className="w-64 border border-gray-300 rounded-md pl-10 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-500" />
            </div>
          </div>
        </div>
        <div className="p-4">
          {Object.keys(followedCases).length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700 text-center">
              No followed cases yet.
            </div>
          ) : sortedCases.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
              No cases match your search.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th
                      onClick={() => requestSort("title")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    >
                      Case Title {getSortIndicator("title")}
                    </th>
                    <th
                      onClick={() => requestSort("caseNumber")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    >
                      Case Number {getSortIndicator("caseNumber")}
                    </th>
                    <th
                      onClick={() => requestSort("cnr")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    >
                      CNR {getSortIndicator("cnr")}
                    </th>
                    <th
                      onClick={() => requestSort("status")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    >
                      Status {getSortIndicator("status")}
                    </th>
                    <th
                      onClick={() => requestSort("followedAt")}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    >
                      Followed On {getSortIndicator("followedAt")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Unfollow
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedCases.map(([id, caseData]) => (
                    <tr key={id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">
                        {caseData.title || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {caseData.caseNumber || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {caseData.cnr || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <StatusBadge status={caseData.status} />
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(caseData.followedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm"></td>
                      {/* Empty Actions column */}
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => onUnfollow(id)}
                          className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
                        >
                          <span>Unfollow</span>
                          <X size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const HighCourtSearchPage = ({
  court,
  partyNameInput,
  setPartyNameInput,
  handlePartySearch,
}) => {
  const { workspaceId } = useParams();
  const [stage, setStage] = useState("BOTH");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [benchId, setBenchId] = useState("0ba5ccaf");
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [caseDetails, setCaseDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [loadingDetailId, setLoadingDetailId] = useState(null);
  const [detailsError, setDetailsError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [followedCases, setFollowedCases] = useState(() => {
    const savedCases = localStorage.getItem("followedCases");
    return savedCases ? JSON.parse(savedCases) : {};
  });
  const [showCart, setShowCart] = useState(false);
  const [followLoading, setFollowLoading] = useState(null);
  const [unfollowCaseId, setUnfollowCaseId] = useState();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) =>
    (currentYear - i).toString()
  );

  useEffect(() => {
    localStorage.setItem("followedCases", JSON.stringify(followedCases));
    fetchFollowedCases();
  }, []);

  const fetchFollowedCases = async () => {
    try {
      const response = await api.get(
        `/get-followed-cases?workspaceId=${workspaceId}`
      ); // Axios automatically sets headers
      const data = response.data;

      if (data.success) {
        setFollowedCases(
          data.cases.reduce((acc, caseData) => {
            acc[caseData.caseId] = caseData;
            return acc;
          }, {})
        );
      }
    } catch (err) {
      console.error("Error fetching followed cases:", err.message);
    }
  };

  const filteredResults = searchResults
    ? searchResults.filter((result) =>
        Object.values(result).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSearchResults(null); // Reset searchResults to null

    try {
      const response = await api.post(
        "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/search/party/",
        {
          name: partyNameInput,
          stage,
          year,
          benchId,
        }
      );

      const data = response.data;

      if (data.error) {
        throw new Error(data.error);
      }

      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        throw new Error("Unexpected response format: Data is not an array");
      }
    } catch (err) {
      setError(err.message || "An error occurred during search");
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? "N/A"
        : date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
    } catch {
      return "N/A";
    }
  };

  const handleViewDetails = async (cnr, rowIndex) => {
    setIsLoadingDetails(true);
    setLoadingDetailId(rowIndex);
    setDetailsError(null);
    setActiveTab("overview");

    try {
      const response = await api.post(
        "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/",
        { cnr }
      );

      const data = response.data;

      if (data.error) {
        throw new Error(data.error);
      }

      setCaseDetails(data);
      setShowCaseDetails(true);
    } catch (err) {
      setDetailsError(err.message || "Failed to fetch case details");
      setShowCaseDetails(true);
    } finally {
      setIsLoadingDetails(false);
      setLoadingDetailId(null);
    }
  };

  const handleFollowCase = async (caseData, rowIndex) => {
    setFollowLoading(rowIndex);
    const caseId = caseData.cnr;
    setUnfollowCaseId(caseId);

    try {
      const caseToSave = {
        case_id: caseId,
        cnr: caseData.cnr,
        title: caseData.title || "N/A",
        case_number:
          `${caseData.type || ""} ${caseData.caseNumber || ""}` || "N/A",
        petitioner: caseData.petitioner || "Unknown",
        respondent: caseData.respondent || "Unknown",
        status: caseData.status || "PENDING",
        court: "High Court",
        workspace_id: workspaceId,
        followed_at: new Date().toISOString(),
      };

      if (followedCases[caseId]) {
        const response = await api.delete("/unfollow-case", {
          data: { caseId },
        });
        const data = response.data;

        if (!data.success) {
          throw new Error(data.error || "Failed to unfollow case");
        }

        const updatedFollowedCases = { ...followedCases };
        delete updatedFollowedCases[caseId];
        setFollowedCases(updatedFollowedCases);
        showToast(`Case ${caseId} removed from followed cases`);
      } else {
        const response = await api.post("/follow-case", { ...caseToSave });
        const data = response.data;

        if (!data.success) {
          throw new Error(data.error || "Failed to follow case");
        }

        setFollowedCases({ ...followedCases, [caseId]: caseToSave });
        showToast(`Case ${caseId} added to followed cases`);
      }
    } catch (err) {
      showToast(`Error: ${err.message}`);
    } finally {
      setFollowLoading(null);
    }
  };

  const handleUnfollowCase = async (caseId) => {
    console.log(caseId);
    try {
      const response = await api.delete("/unfollow-case", {
        data: { caseId },
      });
      const data = response.data;

      if (!data.success) {
        throw new Error(data.error || "Failed to unfollow case");
      }

      const updatedFollowedCases = { ...followedCases };
      delete updatedFollowedCases[caseId];
      setFollowedCases(updatedFollowedCases);
      showToast(`Case ${caseId} removed from followed cases`);
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const [toast, setToast] = useState(null);
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const closeDetailsPopup = () => {
    setShowCaseDetails(false);
    setCaseDetails(null);
    setDetailsError(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        High Court Cases by Party Name
      </h2>
      <div className="bg-white p-6 rounded-md border border-gray-200 max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="col-span-2">
              <label
                htmlFor="party-input"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Party Name
              </label>
              <input
                type="text"
                id="party-input"
                value={partyNameInput}
                onChange={(e) => setPartyNameInput(e.target.value)}
                className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Enter party name"
                required
              />
              <div className="text-sm text-gray-500 mt-1">Example: ASHOK</div>
            </div>
            <div>
              <label
                htmlFor="stage-select"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Stage
              </label>
              <select
                id="stage-select"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="BOTH">BOTH</option>
                <option value="PENDING">PENDING</option>
                <option value="DISPOSED">DISPOSED</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="year-select"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Year
              </label>
              <select
                id="year-select"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="bench-select"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Bench ID
              </label>
              <input
                type="text"
                id="bench-select"
                value={benchId}
                onChange={(e) => setBenchId(e.target.value)}
                className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="md:col-start-2 md:flex md:justify-end items-end">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {isLoading && (
        <div className="mt-6 flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          {error}
        </div>
      )}

      {!isLoading && searchResults && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-medium">Search Results</h3>
              <button
                className="relative flex items-center justify-center rounded-full p-2 bg-blue-100 hover:bg-blue-200"
                onClick={() => setShowCart(true)}
              >
                <ShoppingCart size={20} className="text-blue-600" />
                {Object.keys(followedCases).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {Object.keys(followedCases).length}
                  </span>
                )}
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Data..."
                className="w-64 border border-black shadow-md rounded-md pl-10 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-900" />
              </div>
            </div>
          </div>

          {filteredResults.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
              No results found for your search criteria.
            </div>
          ) : (
            <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden border-4 border-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white bg-gray-300">
                    <th className="px-6 py-4 text-sm font-medium text-black text-left">
                      CNR
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-black text-left">
                      CASE NUMBER
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-black text-left">
                      TITLE
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-black text-left">
                      DECISION DATE
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-black text-left">
                      FOLLOW
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-black text-left">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((result, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 last:border-b-0"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {result.cnr}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{`${
                        result.type || ""
                      } ${result.caseNumber || ""}`}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {result.title || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {formatDate(result.decisionDate)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className={`flex items-center justify-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm ${
                            followedCases[result.cnr]
                              ? "text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                              : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                          }`}
                          onClick={() => handleFollowCase(result, index)}
                          disabled={followLoading === index}
                        >
                          {followLoading === index ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                          ) : (
                            <>
                              <Star
                                size={16}
                                className={
                                  followedCases[result.cnr]
                                    ? "text-yellow-600 fill-yellow-500"
                                    : ""
                                }
                              />
                              <span>
                                {followedCases[result.cnr]
                                  ? "Following"
                                  : "Follow"}
                              </span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="flex items-center justify-center w-32 h-10 space-x-2 px-5 py-2 text-sm text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                          onClick={() => handleViewDetails(result.cnr, index)}
                          disabled={loadingDetailId === index}
                        >
                          {loadingDetailId === index ? (
                            <div className="flex items-center space-x-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                              <span>Loading...</span>
                            </div>
                          ) : (
                            <span className="flex items-center space-x-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path
                                  fillRule="evenodd"
                                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>Details</span>
                            </span>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showCaseDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold">Case Details</h3>
              <button
                onClick={closeDetailsPopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              {isLoadingDetails ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                </div>
              ) : detailsError ? (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
                  {detailsError}
                </div>
              ) : caseDetails ? (
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold mb-2">{`${
                        caseDetails.filing?.number || ""
                      } - ${
                        caseDetails.parties?.petitioners?.[0] || "Unknown"
                      } vs. ${
                        caseDetails.parties?.respondents?.[0] || "Unknown"
                      }`}</h2>
                      <button
                        className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm ${
                          followedCases[caseDetails.cnr]
                            ? "text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                            : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() =>
                          handleFollowCase({
                            cnr: caseDetails.cnr,
                            title: `${
                              caseDetails.parties?.petitioners?.[0] || "Unknown"
                            } vs. ${
                              caseDetails.parties?.respondents?.[0] || "Unknown"
                            }`,
                            caseNumber: caseDetails.filing?.number,
                            status: caseDetails.status?.caseStage,
                          })
                        }
                      >
                        <Star
                          size={16}
                          className={
                            followedCases[caseDetails.cnr]
                              ? "text-yellow-600 fill-yellow-500"
                              : ""
                          }
                        />
                        <span>
                          {followedCases[caseDetails.cnr]
                            ? "Following"
                            : "Follow"}
                        </span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-black text-sm font-medium">
                        CNR: {caseDetails.cnr || "N/A"}
                      </span>
                      <span className="text-black text-sm mx-2 font-medium">
                        |
                      </span>
                      <span className="text-black text-sm font-medium">
                        Filed: {formatDate(caseDetails.filing?.date)}
                      </span>
                      <span className="text-black text-sm mx-2 font-medium">
                        |
                      </span>
                      <StatusBadge
                        status={caseDetails.status?.caseStage || "PENDING"}
                      />
                    </div>
                  </div>
                  <div className="border-b mb-4">
                    <div className="flex overflow-x-auto">
                      {[
                        "overview",
                        "parties",
                        "status",
                        "orders",
                        "acts",
                        "subMatters",
                        "ia",
                        "documents",
                        "objections",
                        "history",
                      ].map((tab) => (
                        <button
                          key={tab}
                          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                            activeTab === tab
                              ? "text-blue-600 border-b-2 border-blue-600"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    {activeTab === "overview" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              label: "Filing Number",
                              value: caseDetails.filing?.number || "N/A",
                            },
                            {
                              label: "Filing Date",
                              value: formatDate(caseDetails.filing?.date),
                            },
                            {
                              label: "Registration Number",
                              value: caseDetails.registration?.number || "N/A",
                            },
                            {
                              label: "Registration Date",
                              value: formatDate(caseDetails.registration?.date),
                            },
                          ].map((item, index) => (
                            <div key={index}>
                              <h3 className="text-sm font-medium text-gray-500 mb-1">
                                {item.label}
                              </h3>
                              <p className="text-sm">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeTab === "parties" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Petitioners</h3>
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.parties.petitioners.map(
                              (petitioner, index) => (
                                <li key={index} className="text-sm">
                                  {petitioner}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Respondents</h3>
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.parties.respondents.map(
                              (respondent, index) => (
                                <li key={index} className="text-sm">
                                  {respondent}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">
                            Petitioner Advocates
                          </h3>
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.parties.petitionerAdvocates.map(
                              (advocate, index) => (
                                <li key={index} className="text-sm">
                                  {advocate}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">
                            Respondent Advocates
                          </h3>
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.parties.respondentAdvocates.map(
                              (advocate, index) => (
                                <li key={index} className="text-sm">
                                  {advocate}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeTab === "status" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              label: "Case Stage",
                              value: caseDetails.status?.caseStage || "N/A",
                            },
                            {
                              label: "First Hearing Date",
                              value: formatDate(
                                caseDetails.status?.firstHearingDate
                              ),
                            },
                            {
                              label: "Next Hearing Date",
                              value: formatDate(
                                caseDetails.status?.nextHearingDate
                              ),
                            },
                            {
                              label: "Decision Date",
                              value: formatDate(
                                caseDetails.status?.decisionDate
                              ),
                            },
                            {
                              label: "Nature of Disposal",
                              value:
                                caseDetails.status?.natureOfDisposal || "N/A",
                            },
                            {
                              label: "Court Number and Judge",
                              value:
                                caseDetails.status?.courtNumberAndJudge ||
                                "N/A",
                            },
                          ].map((item, index) => (
                            <div key={index}>
                              <h3 className="text-sm font-medium text-gray-500 mb-1">
                                {item.label}
                              </h3>
                              <p className="text-sm">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeTab === "orders" && (
                      <div className="space-y-4">
                        <h3 className="font-medium mb-2">Orders</h3>
                        {caseDetails.orders && caseDetails.orders.length > 0 ? (
                          <div className="space-y-3">
                            {caseDetails.orders.map((order, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                              >
                                <span className="text-sm font-medium">{`Order #${
                                  order.number
                                } - ${formatDate(order.date)}`}</span>
                                <a
                                  href={order.orderURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  <span>{order.name}</span>
                                  <ExternalLink size={14} />
                                </a>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                            No orders available for this case.
                          </div>
                        )}
                      </div>
                    )}
                    {/* {activeTab === 'acts' && (
                      <div className="space-y-6">
                        <h3 className="font-medium mb-2">Acts</h3>
                        {caseDetails.acts.length > 0 ? (
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.acts.map((act, index) => (
                              <li key={index} className="text-sm">{act || 'N/A'}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">No acts associated with this case.</div>
                        )}
                      </div>
                    )} */}

                    {activeTab === "acts" && (
                      <div className="space-y-6">
                        <h3 className="font-medium mb-2">Acts</h3>
                        {caseDetails.acts.length > 0 ? (
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.acts.map((act, index) => (
                              <li key={index} className="text-sm">
                                {act.act
                                  ? `${act.act}${
                                      act.section
                                        ? `, Section ${act.section}`
                                        : ""
                                    }`
                                  : "N/A"}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                            No acts associated with this case.
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "subMatters" && (
                      <div className="space-y-6">
                        <h3 className="font-medium mb-2">Sub Matters</h3>
                        {caseDetails.subMatters.length > 0 ? (
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.subMatters.map((subMatter, index) => (
                              <li key={index} className="text-sm">
                                {subMatter || "N/A"}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                            No sub matters associated with this case.
                          </div>
                        )}
                      </div>
                    )}
                    {activeTab === "ia" && (
                      <div className="space-y-6">
                        <h3 className="font-medium mb-2">
                          Interlocutory Applications (IA)
                        </h3>
                        {caseDetails.iaDetails &&
                        caseDetails.iaDetails.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse bg-gray-50 rounded-md">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border border-gray-300 p-2 text-left text-xs font-medium text-black">
                                    IA Number
                                  </th>
                                  <th className="border border-gray-300 p-2 text-left text-xs font-medium text-black">
                                    Party
                                  </th>
                                  <th className="border border-gray-300 p-2 text-left text-xs font-medium text-black">
                                    Filing Date
                                  </th>
                                  <th className="border border-gray-300 p-2 text-left text-xs font-medium text-black">
                                    Next Date
                                  </th>
                                  <th className="border border-gray-300 p-2 text-left text-xs font-medium text-black">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {caseDetails.iaDetails.map((ia, index) => (
                                  <tr
                                    key={index}
                                    className="hover:bg-gray-100 even:bg-white odd:bg-gray-50"
                                  >
                                    <td className="border border-gray-300 p-2 text-sm">
                                      {ia.iaNumber || "N/A"}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm">
                                      {ia.party || "N/A"}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm">
                                      {formatDate(ia.dateOfFiling)}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm">
                                      {formatDate(ia.nextDate)}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm">
                                      {ia.status || "N/A"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                            No IA details available for this case.
                          </div>
                        )}
                      </div>
                    )}
                    {activeTab === "documents" && (
                      <div className="space-y-6">
                        <h3 className="font-medium mb-2">Documents</h3>
                        {caseDetails.documentDetails.length > 0 ? (
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.documentDetails.map((doc, index) => (
                              <li key={index} className="text-sm">
                                {doc || "N/A"}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                            No documents available for this case.
                          </div>
                        )}
                      </div>
                    )}
                    {activeTab === "objections" && (
                      <div className="space-y-6">
                        <h3 className="font-medium mb-2">Objections</h3>
                        {caseDetails.objections.length > 0 ? (
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.objections.map((objection, index) => (
                              <li key={index} className="text-sm">
                                {objection || "N/A"}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                            No objections associated with this case.
                          </div>
                        )}
                      </div>
                    )}
                    {activeTab === "history" && (
                      <div className="space-y-6">
                        <h3 className="font-medium mb-2">Case History</h3>
                        {caseDetails.history.length > 0 ? (
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.history.map((event, index) => (
                              <li key={index} className="text-sm">
                                {event || "N/A"}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                            No history available for this case.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                  No case details available.
                </div>
              )}
            </div>
            <div className="border-t p-4 flex justify-end">
              <button
                onClick={closeDetailsPopup}
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <Cart
          followedCases={followedCases}
          onUnfollow={() => handleUnfollowCase(unfollowCaseId)}
          onClose={() => setShowCart(false)}
        />
      )}

      {toast && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 flex items-center space-x-2 z-50">
          <Star size={16} className="text-yellow-300" />
          <p>{toast}</p>
        </div>
      )}
    </div>
  );
};

export default HighCourtSearchPage;
