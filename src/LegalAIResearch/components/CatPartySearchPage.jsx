import React, { useState, useEffect } from "react";
import { AlertTriangle, Search, Star, ShoppingCart, X } from "lucide-react";
import { useParams } from "react-router-dom";
import api from "@/utils/api";

const CatPartySearchPage = ({ court }) => {
  const { workspaceId } = useParams();
  // Existing state declarations
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [benchId, setBenchId] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableSearchQuery, setTableSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(null);
  const [unfollowCaseId, setUnfollowCaseId] = useState();
  // New state for follow feature
  const [followedCases, setFollowedCases] = useState(() => {
    const savedCases = localStorage.getItem("followedCases");
    return savedCases ? JSON.parse(savedCases) : {};
  });
  const [showCart, setShowCart] = useState(false);
  const [followLoading, setFollowLoading] = useState(null);
  const [toast, setToast] = useState(null);

  // Save followed cases to localStorage and fetch initial followed cases
  useEffect(() => {
    localStorage.setItem("followedCases", JSON.stringify(followedCases));
    fetchFollowedCases();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

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

  const handleFollowCase = async (caseData, rowIndex) => {
    setFollowLoading(rowIndex);
    const caseId =
      caseData.diaryNumber || caseData.caseNumber || `case-${rowIndex}`;

    setUnfollowCaseId(caseId);
    try {
      const caseToSave = {
        case_id: caseId,
        diaryNumber: caseData.diaryNumber || "N/A",
        caseNumber: caseData.caseNumber || "N/A",
        applicantName: caseData.applicantName || "N/A",
        defendantName: caseData.defendantName || "N/A",
        court: "Central Administrative Tribunal (CAT)",
        partyName: name,
        type: type || "N/A",
        benchId: benchId || "N/A",
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

  // Existing handleSearch function (unchanged)
  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError(null);
  //   setTableSearchQuery('');
  //   setSearchResults(null);
  //   setFilteredResults(null);

  //   try {
  //     const response = await fetch("https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/central-administrative-tribunal/search-party/", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25',
  //       },
  //       body: JSON.stringify({
  //         name,
  //         type,
  //         benchId
  //       }),
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

  //     const resultsArray = Array.isArray(data) ? data : [];
  //     setSearchResults(resultsArray);
  //     setFilteredResults(resultsArray);
  //   } catch (err) {
  //     setError(err.message || 'An error occurred during search');
  //     console.error('Search error:', err);
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
        "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/central-administrative-tribunal/search-party/",
        {
          name,
          type,
          benchId,
        },
        {
          headers: {
            Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
          },
        }
      );

      const resultsArray = Array.isArray(data) ? data : [];
      setSearchResults(resultsArray);
      setFilteredResults(resultsArray);
    } catch (err) {
      if (err.response?.status === 403) {
        setError(
          "Access denied. Your session may have expired or you lack permission."
        );
      } else {
        const message = err.response?.data?.error || err.message;
        setError(message);
      }
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetrySearch = () => {
    handleSearch(new Event("submit"));
  };

  // Existing handleTableSearch function (unchanged)
  const handleTableSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setTableSearchQuery(query);

    if (!query.trim() || !Array.isArray(searchResults)) {
      setFilteredResults(searchResults);
      return;
    }

    const filtered = searchResults.filter(
      (caseItem) =>
        (caseItem.diaryNumber &&
          caseItem.diaryNumber.toLowerCase().includes(query)) ||
        (caseItem.caseNumber &&
          caseItem.caseNumber.toLowerCase().includes(query)) ||
        (caseItem.applicantName &&
          caseItem.applicantName.toLowerCase().includes(query)) ||
        (caseItem.defendantName &&
          caseItem.defendantName.toLowerCase().includes(query))
    );

    setFilteredResults(filtered);
  };

  // Cart Component
  const Cart = ({ followedCases, onUnfollow, onClose }) => {
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
          <div className="p-4">
            {Object.keys(followedCases).length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700 text-center">
                No followed cases yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Diary Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Case Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Applicant Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Defendant Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Party Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Followed On
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Unfollow
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(followedCases).map(([id, caseData]) => (
                      <tr key={id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">
                          {caseData.diaryNumber || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {caseData.caseNumber || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {caseData.applicantName || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {caseData.defendantName || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {caseData.partyName || "N/A"}
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

  return (
    <div className="space-y-4">
      {/* Search Form Card (unchanged) */}
      <div className="bg-white rounded-md shadow-sm w-[40vw]">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Search CAT Court by Party Name
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
                <p className="text-xs text-gray-500 mt-1">Example: Rakesh</p>
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Case Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select case type</option>
                  <option value="BOTH">BOTH</option>
                  <option value="PENDING">PENDING</option>
                  <option value="DISPOSED">DISPOSED</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Example: BOTH</p>
              </div>
              <div>
                <label
                  htmlFor="benchId"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Bench ID
                </label>
                <input
                  id="benchId"
                  type="text"
                  value={benchId}
                  onChange={(e) => setBenchId(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter bench ID"
                />
                <p className="text-xs text-gray-500 mt-1">Example: ad573668</p>
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

      {/* Search Results Card with Follow Feature */}
      {searchResults && (
        <div className="bg-white rounded-md shadow-sm">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h3 className="text-md font-medium text-gray-800">
                Search Results
              </h3>
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
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search in results..."
                value={tableSearchQuery}
                onChange={handleTableSearch}
              />
            </div>
          </div>

          <div className="p-4">
            {!filteredResults || filteredResults.length === 0 ? (
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-sm text-gray-600">
                  {!searchResults || searchResults.length === 0
                    ? "No records found matching your search criteria."
                    : "No records match your filter criteria."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 shadow-md shadow-slate-600">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Diary Number
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Case Number
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Applicant Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Defendant Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Follow
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredResults.map((caseItem, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-blue-50 transition-colors duration-150`}
                      >
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {caseItem["#"] || index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {caseItem.diaryNumber || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {caseItem.caseNumber || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {caseItem.applicantName || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {caseItem.defendantName || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          <button
                            className={`flex items-center justify-center space-x-1 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                              followedCases[
                                caseItem.diaryNumber ||
                                  caseItem.caseNumber ||
                                  `case-${index}`
                              ]
                                ? "text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => handleFollowCase(caseItem, index)}
                            disabled={followLoading === index}
                          >
                            {followLoading === index ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                            ) : (
                              <>
                                <Star
                                  size={14}
                                  className={
                                    followedCases[
                                      caseItem.diaryNumber ||
                                        caseItem.caseNumber ||
                                        `case-${index}`
                                    ]
                                      ? "text-yellow-600 fill-yellow-500"
                                      : ""
                                  }
                                />
                                <span>
                                  {followedCases[
                                    caseItem.diaryNumber ||
                                      caseItem.caseNumber ||
                                      `case-${index}`
                                  ]
                                    ? "Following"
                                    : "Follow"}
                                </span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {tableSearchQuery &&
              filteredResults &&
              searchResults &&
              filteredResults.length !== searchResults.length && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => {
                      setTableSearchQuery("");
                      setFilteredResults(searchResults);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Clear search filter
                  </button>
                </div>
              )}
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <Cart
          followedCases={followedCases}
          onUnfollow={() => handleUnfollowCase(unfollowCaseId)}
          onClose={() => setShowCart(false)}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 flex items-center space-x-2 z-50">
          <Star size={16} className="text-yellow-300" />
          <p>{toast}</p>
        </div>
      )}
    </div>
  );
};

export default CatPartySearchPage;
