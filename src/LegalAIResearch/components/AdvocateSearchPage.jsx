import React, { useState, useMemo, useEffect } from "react";
import HighCaseDetailsModal from "./HighCaseDetailsModal";
import { X, Search, AlertTriangle, Star, ShoppingCart } from "lucide-react";
import api from "@/utils/api";
import { useParams } from "react-router-dom";

// Status Badge Component (Reused from FilingNumberSearchPage)
const StatusBadge = ({ status }) => {
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-800";

  if (status === "PENDING" || status === "Pending") {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-800";
  } else if (status === "DISPOSED" || status === "Disposed") {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  } else if (status === "FOR DIRECTION") {
    bgColor = "bg-blue-100";
    textColor = "text-blue-800";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {status}
    </span>
  );
};

// Cart Component (Reused from FilingNumberSearchPage)
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

const AdvocateSearchPage = ({ court }) => {
  const { workspaceId } = useParams();
  const [name, setName] = useState(null); // Advocate name
  const [stage, setStage] = useState(null); // Case stage
  const [benchId, setBenchId] = useState(null); // Bench ID
  const [results, setResults] = useState([]); // API response data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [selectedCase, setSelectedCase] = useState(null); // Selected case for details
  const [showCaseDetails, setShowCaseDetails] = useState(false); // Modal visibility
  const [loadingCnr, setLoadingCnr] = useState(null); // Loading state for specific case
  const [detailsError, setDetailsError] = useState(null); // Error message
  const [tableSearchQuery, setTableSearchQuery] = useState(""); // Search query for table results
  const [followedCases, setFollowedCases] = useState(() => {
    const savedCases = localStorage.getItem("followedCases");
    return savedCases ? JSON.parse(savedCases) : {};
  }); // Followed cases state
  const [showCart, setShowCart] = useState(false); // Cart visibility
  const [followLoading, setFollowLoading] = useState(null); // Follow button loading state
  const [toast, setToast] = useState(null); // Toast notification
  const [unfollowCaseId, setUnfollowCaseId] = useState();

  const courtNames = {
    supreme: "Supreme Court",
    high: "High Court",
    district: "District Court",
    nclt: "NCLT",
  };
  const courtName = courtNames[court] || "Court";

  // Persist followed cases to localStorage and fetch initial followed cases
  useEffect(() => {
    localStorage.setItem("followedCases", JSON.stringify(followedCases));
    fetchFollowedCases();
  }, []);

  // const fetchFollowedCases = async () => {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_FOLLOW_API_URL}/api/get-followed-cases`, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     const data = await response.json();
  //     if (response.ok && data.success) {
  //       setFollowedCases(data.cases.reduce((acc, caseData) => {
  //         acc[caseData.caseId] = caseData;
  //         return acc;
  //       }, {}));
  //     }
  //   } catch (err) {
  //     console.error('Error fetching followed cases:', err.message);
  //   }
  // };
  const fetchFollowedCases = async () => {
    try {
      const response = await api.get(
        `/get-followed-cases?workspaceId=${workspaceId}`
      );
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
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // const handleFollowCase = async (caseData, rowIndex) => {
  //   setFollowLoading(rowIndex);
  //   const caseId = caseData.cnr;

  //   try {
  //     const caseToSave = {
  //       caseId,
  //       cnr: caseData.cnr,
  //       title: caseData.title || 'N/A',
  //       caseNumber: caseData.caseNumber || 'N/A',
  //       petitioner: caseData.petitioner || 'Unknown',
  //       respondent: caseData.respondent || 'Unknown',
  //       status: caseData.status || 'PENDING',
  //       court: courtName,
  //       followedAt: new Date().toISOString(),
  //     };

  //     if (followedCases[caseId]) {
  //       const response = await fetch(`${import.meta.env.VITE_FOLLOW_API_URL}/api/unfollow-case`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ caseId }),
  //       });
  //       const data = await response.json();
  //       if (!response.ok) throw new Error(data.error || 'Failed to unfollow case');

  //       const updatedFollowedCases = { ...followedCases };
  //       delete updatedFollowedCases[caseId];
  //       setFollowedCases(updatedFollowedCases);
  //       showToast(`Case ${caseId} removed from followed cases`);
  //     } else {
  //       const response = await fetch(`${import.meta.env.VITE_FOLLOW_API_URL}/api/follow-case`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(caseToSave),
  //       });
  //       const data = await response.json();
  //       if (!response.ok) throw new Error(data.error || 'Failed to follow case');

  //       setFollowedCases({ ...followedCases, [caseId]: caseToSave });
  //       showToast(`Case ${caseId} added to followed cases`);
  //     }
  //   } catch (err) {
  //     showToast(`Error: ${err.message}`);
  //   } finally {
  //     setFollowLoading(null);
  //   }
  // };
  const handleFollowCase = async (caseData, rowIndex) => {
    setFollowLoading(rowIndex);
    const caseId = caseData.cnr;
    setUnfollowCaseId(caseId);
    try {
      const caseToSave = {
        case_id: caseId,
        cnr: caseData.cnr,
        title: caseData.title || "N/A",
        caseNumber: caseData.caseNumber || "N/A",
        petitioner: caseData.petitioner || "Unknown",
        respondent: caseData.respondent || "Unknown",
        status: caseData.status || "PENDING",
        court: courtName,
        workspace_id: workspaceId,
        followedAt: new Date().toISOString(),
      };

      if (followedCases[caseId]) {
        const response = await api.delete("/unfollow-case", {
          data: { caseId },
        });
        const data = response.data;

        if (!data.success)
          throw new Error(data.error || "Failed to unfollow case");

        const updatedFollowedCases = { ...followedCases };
        delete updatedFollowedCases[caseId];
        setFollowedCases(updatedFollowedCases);
        showToast(`Case ${caseId} removed from followed cases`);
      } else {
        const response = await api.post("/follow-case", { ...caseToSave });
        const data = response.data;

        if (!data.success)
          throw new Error(data.error || "Failed to follow case");

        setFollowedCases({ ...followedCases, [caseId]: caseToSave });
        showToast(`Case ${caseId} added to followed cases`);
      }
    } catch (err) {
      showToast(`Error: ${err.message}`);
    } finally {
      setFollowLoading(null);
    }
  };

  // const handleUnfollowCase = async (caseId) => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_FOLLOW_API_URL}/api/unfollow-case`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ caseId }),
  //       }
  //     );
  //     const data = await response.json();
  //     if (!response.ok)
  //       throw new Error(data.error || "Failed to unfollow case");

  //     const updatedFollowedCases = { ...followedCases };
  //     delete updatedFollowedCases[caseId];
  //     setFollowedCases(updatedFollowedCases);
  //     showToast(`Case ${caseId} removed from followed cases`);
  //   } catch (err) {
  //     showToast(`Error: ${err.message}`);
  //   }
  // };

  const handleUnfollowCase = async (caseId) => {
    try {
      const response = await api.delete("/unfollow-case", {
        data: { caseId },
      });
      const data = response.data;

      if (!data.success)
        throw new Error(data.error || "Failed to unfollow case");

      const updatedFollowedCases = { ...followedCases };
      delete updatedFollowedCases[caseId];
      setFollowedCases(updatedFollowedCases);
      showToast(`Case ${caseId} removed from followed cases`);
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true); // Start loading
  //   try {
  //     const response = await fetch(
  //       "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/search/advocate-name/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
  //         },
  //         body: JSON.stringify({
  //           name,
  //           stage,
  //           benchId,
  //         }),
  //       }
  //     );
  //     if (!response.ok)
  //       throw new Error(`Error ${response.status}: ${response.statusText}`);
  //     const data = await response.json();
  //     setResults(data); // Set the results
  //     setTableSearchQuery(""); // Reset search query
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setIsLoading(false); // Stop loading
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post(
        "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/search/advocate-name/",
        {
          name,
          stage,
          benchId,
        },
        {
          headers: {
            Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
          },
        }
      );

      const data = response.data;
      setResults(data);
      setTableSearchQuery("");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setName(null);
    setStage(null);
    setBenchId(null);
    setResults([]);
    setTableSearchQuery("");
  };

  // const handleViewDetails = async (cnr) => {
  //   setLoadingCnr(cnr);
  //   setDetailsError(null);
  //   try {
  //     const response = await fetch(
  //       "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
  //         },
  //         body: JSON.stringify({ cnr }),
  //       }
  //     );
  //     if (!response.ok)
  //       throw new Error(`Error ${response.status}: ${response.statusText}`);
  //     const data = await response.json();
  //     setSelectedCase(data);
  //     setShowCaseDetails(true);
  //   } catch (error) {
  //     console.error("Error fetching case details:", error);
  //     setDetailsError("Failed to load case details. Please try again.");
  //   } finally {
  //     setLoadingCnr(null);
  //   }
  // };

  const handleViewDetails = async (cnr) => {
    setLoadingCnr(cnr);
    setDetailsError(null);

    try {
      const response = await api.post(
        "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/",
        { cnr },
        {
          headers: {
            Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
          },
        }
      );

      const data = response.data;
      setSelectedCase(data);
      setShowCaseDetails(true);
    } catch (error) {
      console.error("Error fetching case details:", error);
      setDetailsError("Failed to load case details. Please try again.");
    } finally {
      setLoadingCnr(null);
    }
  };

  const closeDetailsPopup = () => {
    setShowCaseDetails(false);
    setSelectedCase(null);
    setDetailsError(null);
  };

  const filteredResults = useMemo(() => {
    if (!tableSearchQuery) return results;

    const searchQueryLower = tableSearchQuery.toLowerCase();
    return results.filter(
      (result) =>
        (result.cnr && result.cnr.toLowerCase().includes(searchQueryLower)) ||
        (result.caseNumber &&
          result.caseNumber.toLowerCase().includes(searchQueryLower)) ||
        (result.title &&
          result.title.toLowerCase().includes(searchQueryLower)) ||
        (result.type && result.type.toLowerCase().includes(searchQueryLower))
    );
  }, [results, tableSearchQuery]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 w-[40vw]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Search {courtName} by Advocate Name
          </h2>
          <p className="text-gray-600 mt-2">
            Find cases by entering advocate details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Advocate Name
              </label>
              <input
                type="text"
                id="name"
                value={name || ""}
                onChange={(e) => setName(e.target.value || null)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter advocate name"
              />
              <div className="text-sm text-gray-500 mt-1">
                Example: Kunal Sharma
              </div>
            </div>

            <div>
              <label
                htmlFor="stage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Case Stage
              </label>
              <select
                id="stage"
                value={stage || ""}
                onChange={(e) => setStage(e.target.value || null)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select stage</option>
                <option value="PENDING">Pending</option>
                <option value="DISPOSED">Disposed</option>
                <option value="BOTH">Both</option>
              </select>
              <div className="text-sm text-gray-500 mt-1">Example: BOTH</div>
            </div>

            <div>
              <label
                htmlFor="benchId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bench ID
              </label>
              <input
                type="text"
                id="benchId"
                value={benchId || ""}
                onChange={(e) => setBenchId(e.target.value || null)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Bench ID"
              />
              <div className="text-sm text-gray-500 mt-1">
                Example: 0ba5ccaf
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </>
              ) : (
                "Search Cases"
              )}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {results.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800">
                Search Results:
              </h2>
              {/* <button
                className="relative flex items-center justify-center rounded-full p-2 bg-blue-100 hover:bg-blue-200"
                onClick={() => setShowCart(true)}
              >
                <ShoppingCart size={20} className="text-blue-600" />
                {Object.keys(followedCases).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {Object.keys(followedCases).length}
                  </span>
                )}
              </button> */}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Data..."
                value={tableSearchQuery}
                onChange={(e) => setTableSearchQuery(e.target.value)}
                className="w-64 p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                size={18}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <div className="overflow-x-auto p-2 bg-white rounded-md">
            <div className="shadow-md rounded-md overflow-hidden border border-gray-200">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase text-gray-700 tracking-wider">
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">
                      CNR
                    </th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">
                      Case Number
                    </th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">
                      Title
                    </th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">
                      Type
                    </th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">
                      Decision Date
                    </th>
                    <th className="py-3 px-6 border-b border-gray-200 text-center font-medium">
                      Follow
                    </th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((result, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-6 border-b border-gray-200 font-mono text-sm">
                        {result.cnr}
                      </td>
                      <td className="py-3 px-6 border-b border-gray-200">
                        {result.caseNumber || "N/A"}
                      </td>
                      <td className="py-3 px-6 border-b border-gray-200 font-medium">
                        {result.title || "N/A"}
                      </td>
                      <td className="py-3 px-6 border-b border-gray-200">
                        <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 rounded-full">
                          {result.type || "N/A"}
                        </span>
                      </td>
                      <td className="py-3 px-6 border-b border-gray-200">
                        {result.decisionDate &&
                        result.decisionDate !== "1970-01-01T00:00:00.000Z"
                          ? new Date(result.decisionDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-3 px-6 border-b border-gray-200 text-center">
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
                      <td className="py-3 px-6 border-b border-gray-200">
                        <button
                          onClick={() => handleViewDetails(result.cnr)}
                          className="px-4 w-24 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm transition-colors"
                          disabled={loadingCnr === result.cnr}
                        >
                          {loadingCnr === result.cnr ? "Loading..." : "Details"}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredResults.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-4 text-gray-500"
                      >
                        No results found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Case Details Modal with Follow Button */}
      {showCaseDetails && (
        <HighCaseDetailsModal
          caseDetails={selectedCase}
          isLoadingDetails={loadingCnr !== null}
          detailsError={detailsError}
          closeDetailsPopup={closeDetailsPopup}
          handleFollowCase={(caseData) => handleFollowCase(caseData, "modal")} // Pass follow handler
          followedCases={followedCases} // Pass followed cases to check state
          followLoading={followLoading === "modal"} // Pass loading state for modal
        />
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
    </>
  );
};

// Modified HighCaseDetailsModal to include Follow button (example implementation)
const ModifiedHighCaseDetailsModal = ({
  caseDetails,
  isLoadingDetails,
  detailsError,
  closeDetailsPopup,
  handleFollowCase,
  followedCases,
  followLoading,
}) => {
  return (
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
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0 text-red-600" />
                <div className="flex-1 text-red-700">
                  <p className="font-medium">{detailsError}</p>
                </div>
              </div>
            </div>
          ) : caseDetails ? (
            <div>
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    {caseDetails.title || "N/A"}
                  </h2>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-black text-sm font-medium">
                      CNR: {caseDetails.cnr}
                    </span>
                  </div>
                </div>
                <button
                  className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm ${
                    followedCases[caseDetails.cnr]
                      ? "text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                      : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    handleFollowCase({
                      cnr: caseDetails.cnr,
                      title: caseDetails.title,
                      caseNumber: caseDetails.caseNumber,
                      status: caseDetails.status?.caseStage,
                    })
                  }
                  disabled={followLoading}
                >
                  {followLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  ) : (
                    <>
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
                    </>
                  )}
                </button>
              </div>
              {/* Rest of the modal content */}
              <div>
                <p>
                  <strong>Filing Number:</strong>
                  {caseDetails.filing?.number || "N/A"}
                </p>
                <p>
                  <strong>Filing Date:</strong>
                  {caseDetails.filing?.date
                    ? new Date(caseDetails.filing.date).toLocaleDateString()
                    : "N/A"}
                </p>
                {/* Add more case details as per your original HighCaseDetailsModal */}
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
  );
};

export default AdvocateSearchPage;
