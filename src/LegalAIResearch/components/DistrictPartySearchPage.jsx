import React, { useState, useEffect, useMemo } from "react";
import { AlertTriangle, Star, ShoppingCart, X, Search } from "lucide-react";
import DistrictCaseDetailsModal from "./DistrictCaseDetailsModal";
import api from "@/utils/api";
import { useParams } from "react-router-dom";

// Status Badge Component
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

// Cart Component
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

const DistrictPartySearchPage = ({ court }) => {
  const { workspaceId } = useParams();
  const [name, setName] = useState("");
  const [stage, setStage] = useState("");
  const [year, setYear] = useState("");
  const [complexId, setComplexId] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableSearchQuery, setTableSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(null);
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [selectedCnr, setSelectedCnr] = useState(null);
  const [caseDetails, setCaseDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [unfollowCaseId, setUnfollowCaseId] = useState();
  const [followedCases, setFollowedCases] = useState(() => {
    const savedCases = localStorage.getItem("followedCases");
    return savedCases ? JSON.parse(savedCases) : {};
  });
  const [showCart, setShowCart] = useState(false);
  const [followLoading, setFollowLoading] = useState(null);
  const [toast, setToast] = useState(null);

  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let y = currentYear; y >= 1900; y--) {
    yearOptions.push(y);
  }

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
  //       title: caseData.title || "N/A",
  //       caseNumber: caseData.caseNumber || "N/A",
  //       petitioner: caseData.parties?.petitioners?.[0] || "Unknown",
  //       respondent: caseData.parties?.respondents?.[0] || "Unknown",
  //       status: caseData.status?.caseStage || "PENDING",
  //       court: court.charAt(0).toUpperCase() + court.slice(1) + " Court",
  //       followedAt: new Date().toISOString(),
  //     };

  //     if (followedCases[caseId]) {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_FOLLOW_API_URL}/api/unfollow-case`,
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ caseId }),
  //         }
  //       );
  //       const data = await response.json();
  //       if (!response.ok)
  //         throw new Error(data.error || "Failed to unfollow case");

  //       const updatedFollowedCases = { ...followedCases };
  //       delete updatedFollowedCases[caseId];
  //       setFollowedCases(updatedFollowedCases);
  //       showToast(`Case ${caseId} removed from followed cases`);
  //     } else {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_FOLLOW_API_URL}/api/follow-case`,
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(caseToSave),
  //         }
  //       );
  //       const data = await response.json();
  //       if (!response.ok)
  //         throw new Error(data.error || "Failed to follow case");

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
        petitioner: caseData.parties?.petitioners?.[0] || "Unknown",
        respondent: caseData.parties?.respondents?.[0] || "Unknown",
        status: caseData.status?.caseStage || "PENDING",
        court: court.charAt(0).toUpperCase() + court.slice(1) + " Court",
        workspace_id: workspaceId,
        followedAt: new Date().toISOString(),
      };

      if (followedCases[caseId]) {
        const { data } = await api.delete("/unfollow-case", {
          data: { caseId },
        });
        if (!data.success)
          throw new Error(data.error || "Failed to unfollow case");

        const updatedFollowedCases = { ...followedCases };
        delete updatedFollowedCases[caseId];
        setFollowedCases(updatedFollowedCases);
        showToast(`Case ${caseId} removed from followed cases`);
      } else {
        const { data } = await api.post("/follow-case", { ...caseToSave });
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
      const { data } = await api.delete("/unfollow-case", {
        data: { caseId },
      });
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

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError(null);
  //   setTableSearchQuery("");
  //   setSearchResults(null);
  //   setFilteredResults(null);

  //   try {
  //     const response = await fetch(
  //       "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/district-court/search/party/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
  //         },
  //         body: JSON.stringify({
  //           name,
  //           stage,
  //           year,
  //           complexId,
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (!response.ok) {
  //       if (response.status === 403) {
  //         throw new Error(
  //           "Access denied. Your session may have expired or you don't have permission to access this resource."
  //         );
  //       } else if (data && data.error) {
  //         throw new Error(data.error);
  //       } else {
  //         throw new Error(`Error ${response.status}: ${response.statusText}`);
  //       }
  //     }

  //     if (data && data.error) {
  //       throw new Error(data.error);
  //     }

  //     const resultsArray = Array.isArray(data) ? data : [];
  //     setSearchResults(resultsArray);
  //     setFilteredResults(resultsArray);
  //   } catch (err) {
  //     setError(err.message || "An error occurred during search");
  //     console.error("Search error:", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTableSearchQuery("");
    setSearchResults(null);
    setFilteredResults(null);

    try {
      const { data } = await api.post(
        "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/district-court/search/party/",
        { name, stage, year, complexId },
        {
          headers: {
            Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
          },
        }
      );

      if (data?.error) throw new Error(data.error);

      const resultsArray = Array.isArray(data) ? data : [];
      setSearchResults(resultsArray);
      setFilteredResults(resultsArray);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "An error occurred during search");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetrySearch = () => {
    handleSearch(new Event("submit"));
  };

  const handleTableSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setTableSearchQuery(query);

    if (!query.trim() || !Array.isArray(searchResults)) {
      setFilteredResults(searchResults);
      return;
    }

    const filtered = searchResults
      .map((court) => {
        const filteredCases = court.cases.filter(
          (caseItem) =>
            (caseItem.cnr && caseItem.cnr.toLowerCase().includes(query)) ||
            (caseItem.title && caseItem.title.toLowerCase().includes(query)) ||
            (caseItem.caseNumber &&
              caseItem.caseNumber.toLowerCase().includes(query)) ||
            (caseItem.type && caseItem.type.toLowerCase().includes(query)) ||
            (caseItem.filing &&
              `${caseItem.filing.number}/${caseItem.filing.year}`
                .toLowerCase()
                .includes(query))
        );

        return {
          ...court,
          cases: filteredCases,
        };
      })
      .filter((court) => court.cases.length > 0);

    setFilteredResults(filtered);
  };

  // const handleViewDetails = async (cnr) => {
  //   setDetailsLoading(true);
  //   setDetailsError(null);
  //   setSelectedCnr(cnr);

  //   try {
  //     const response = await fetch(
  //       "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/district-court/case/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
  //         },
  //         body: JSON.stringify({
  //           cnr,
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (!response.ok) {
  //       if (response.status === 403) {
  //         throw new Error(
  //           "Access denied. Your session may have expired or you don't have permission to access this resource."
  //         );
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
  //     setShowCaseDetails(true);
  //   } catch (err) {
  //     setDetailsError(err.message || "Failed to fetch case details");
  //     console.error("Details fetch error:", err);
  //   } finally {
  //     setDetailsLoading(false);
  //   }
  // };
  const handleViewDetails = async (cnr) => {
    setDetailsLoading(true);
    setDetailsError(null);
    setSelectedCnr(cnr);

    try {
      const { data } = await api.post(
        "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/district-court/case/",
        { cnr },
        {
          headers: {
            Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
          },
        }
      );

      if (data?.error) throw new Error(data.error);

      setCaseDetails(data);
      setShowCaseDetails(true);
    } catch (err) {
      console.error("Details fetch error:", err);
      setDetailsError(err.message || "Failed to fetch case details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleRetryDetails = () => {
    if (selectedCnr) {
      handleViewDetails(selectedCnr);
    }
  };

  const closeDetailsModal = () => {
    setShowCaseDetails(false);
    setCaseDetails(null);
    setSelectedCnr(null);
    setDetailsError(null);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString.includes("1970-01-01"))
      return "Not Available";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Not Available";
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (err) {
      return "Not Available";
    }
  };

  const filteredResultsMemo = useMemo(() => {
    if (!tableSearchQuery) return searchResults;

    const searchQueryLower = tableSearchQuery.toLowerCase();
    return (
      searchResults
        ?.map((court) => ({
          ...court,
          cases: court.cases.filter(
            (caseItem) =>
              (caseItem.cnr &&
                caseItem.cnr.toLowerCase().includes(searchQueryLower)) ||
              (caseItem.title &&
                caseItem.title.toLowerCase().includes(searchQueryLower)) ||
              (caseItem.caseNumber &&
                caseItem.caseNumber.toLowerCase().includes(searchQueryLower)) ||
              (caseItem.type &&
                caseItem.type.toLowerCase().includes(searchQueryLower)) ||
              (caseItem.filing &&
                `${caseItem.filing.number}/${caseItem.filing.year}`
                  .toLowerCase()
                  .includes(searchQueryLower))
          ),
        }))
        .filter((court) => court.cases.length > 0) || []
    );
  }, [searchResults, tableSearchQuery]);

  return (
    <>
      <div className="bg-white rounded-md shadow-sm w-[40vw]">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Search {court.charAt(0).toUpperCase() + court.slice(1)} Court by
            Party Name
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            Enter the party name and other details to find relevant cases
          </p>
        </div>

        <div className="p-4">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Party Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter party name"
                  required
                />
                <div className="text-xs text-gray-500 mt-1">
                  Example: Gaurav
                </div>
              </div>

              <div>
                <label
                  htmlFor="stage"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Case Stage
                </label>
                <select
                  id="stage"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select case stage</option>
                  <option value="BOTH">BOTH</option>
                  <option value="PENDING">PENDING</option>
                  <option value="DISPOSED">DISPOSED</option>
                </select>
                <div className="text-xs text-gray-500 mt-1">Example: BOTH</div>
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Year
                </label>
                <select
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select year</option>
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-gray-500 mt-1">Example: 2024</div>
              </div>

              <div>
                <label
                  htmlFor="complexId"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Complex ID
                </label>
                <input
                  id="complexId"
                  type="text"
                  value={complexId}
                  onChange={(e) => setComplexId(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter complex ID"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Example: 5f5f010a
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-3 w-3 text-white"
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
                  </span>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="p-3 mx-4 mb-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0 text-red-600" />
              <div className="flex-1">
                <p className="text-xs text-red-600 font-medium">{error}</p>
                {error.includes("403") && (
                  <p className="mt-1 text-xs text-red-500">
                    This could be due to an expired session or authentication
                    issue.
                  </p>
                )}
                <div className="mt-2">
                  <button
                    onClick={handleRetrySearch}
                    className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs hover:bg-red-200 transition-colors"
                  >
                    Retry Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {searchResults && (
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
                onChange={handleTableSearch}
                className="w-64 p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                size={18}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-max p-2 bg-white rounded-md shadow-md overflow-hidden border border-gray-200">
              <table className="min-w-max w-full">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase text-gray-700 tracking-wider">
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">
                      CNR
                    </th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">
                      Case Title
                    </th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">
                      Case Number
                    </th>
                    <th className="py-3 px-6 border-b border-gray-200 text-left font-medium">
                      Filing No/Year
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
                  {filteredResultsMemo.map((court, courtIndex) =>
                    court.cases.map((caseItem, caseIndex) => (
                      <tr
                        key={`${courtIndex}-${caseIndex}`}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-6 border-b border-gray-200 font-mono text-sm">
                          {caseItem.cnr}
                        </td>
                        <td className="py-3 px-6 border-b border-gray-200 font-medium">
                          {caseItem.title || "N/A"}
                        </td>
                        <td className="py-3 px-6 border-b border-gray-200">
                          {caseItem.caseNumber || "N/A"}
                        </td>
                        <td className="py-3 px-6 border-b border-gray-200">
                          {caseItem.filing
                            ? `${caseItem.filing.number || ""}/${
                                caseItem.filing.year || ""
                              }`
                            : "N/A"}
                        </td>
                        <td className="py-3 px-6 border-b border-gray-200">
                          <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 rounded-full">
                            {caseItem.type || "N/A"}
                          </span>
                        </td>
                        <td className="py-3 px-6 border-b border-gray-200">
                          {formatDate(caseItem.dateOfDecision)}
                        </td>
                        <td className="py-3 px-6 border-b border-gray-200 text-center">
                          <button
                            className={`flex items-center justify-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm ${
                              followedCases[caseItem.cnr]
                                ? "text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() =>
                              handleFollowCase(
                                caseItem,
                                `${courtIndex}-${caseIndex}`
                              )
                            }
                            disabled={
                              followLoading === `${courtIndex}-${caseIndex}`
                            }
                          >
                            {followLoading === `${courtIndex}-${caseIndex}` ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                            ) : (
                              <>
                                <Star
                                  size={16}
                                  className={
                                    followedCases[caseItem.cnr]
                                      ? "text-yellow-600 fill-yellow-500"
                                      : ""
                                  }
                                />
                                <span>
                                  {followedCases[caseItem.cnr]
                                    ? "Following"
                                    : "Follow"}
                                </span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-6 border-b border-gray-200">
                          <button
                            onClick={() => handleViewDetails(caseItem.cnr)}
                            className="px-4 w-24 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm transition-colors"
                            disabled={
                              detailsLoading && selectedCnr === caseItem.cnr
                            }
                          >
                            {detailsLoading && selectedCnr === caseItem.cnr
                              ? "Loading..."
                              : "Details"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                  {filteredResultsMemo.length === 0 && (
                    <tr>
                      <td
                        colSpan="8"
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

      {showCaseDetails && (
        <DistrictCaseDetailsModal
          caseDetails={caseDetails}
          isLoading={detailsLoading}
          error={detailsError}
          onClose={closeDetailsModal}
          onRetry={handleRetryDetails}
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

export default DistrictPartySearchPage;
