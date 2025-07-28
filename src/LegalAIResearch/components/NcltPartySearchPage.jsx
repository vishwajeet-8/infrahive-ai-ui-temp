import React, { useState, useEffect } from "react";
import { Star, ShoppingCart, X } from "lucide-react";
import NcltCaseDetailsModal from "./NcltCaseDetailsModal";
import { useParams } from "react-router-dom";
import api from "@/utils/api";

const NcltPartySearchPage = () => {
  const { workspaceId } = useParams();
  // Existing state declarations
  const [benchId, setBenchId] = useState("");
  const [partyType, setPartyType] = useState("");
  const [stage, setStage] = useState("PENDING");
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableSearchQuery, setTableSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(null);
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [selectedFilingNumber, setSelectedFilingNumber] = useState(null);
  const [caseDetails, setCaseDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [unfollowCaseId, setUnfollowCaseId] = useState();
  // New state for follow feature
  const [followedCases, setFollowedCases] = useState(() => {
    const savedCases = localStorage.getItem("followedCases");
    return savedCases ? JSON.parse(savedCases) : {};
  });
  const [showCart, setShowCart] = useState(false);
  const [followLoading, setFollowLoading] = useState(null);
  const [toast, setToast] = useState(null);

  // Generate year options from 2016 (NCLT establishment) to current year
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let y = currentYear; y >= 2016; y--) {
    yearOptions.push(y);
  }

  // Party type options
  const partyTypeOptions = [
    { value: "PETITIONER", label: "Petitioner" },
    { value: "RESPONDENT", label: "Respondent" },
    { value: "APPLICANT", label: "Applicant" },
    { value: "APPELLANT", label: "Appellant" },
    { value: "DEFENDANT", label: "Defendant" },
  ];

  // Case stage options
  const stageOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "DISPOSED", label: "Disposed" },
    { value: "BOTH", label: "Both" },
  ];

  // Format date string to more readable format
  const formatDate = (dateString) => {
    if (!dateString || dateString.includes("1970-01-01"))
      return "Not Available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
      const { data } = await api.get(
        `/get-followed-cases?workspaceId=${workspaceId}`
      );
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
    const caseId = caseData.filingNumber;
    setUnfollowCaseId(caseId);
    try {
      const caseToSave = {
        case_id: caseId,
        filingNumber: caseData.filingNumber || "N/A",
        caseType: caseData.caseType || "N/A",
        caseNumber: caseData.caseNumber || "N/A",
        title: caseData.title || "N/A",
        bench: caseData.bench || "N/A",
        courtNumber: caseData.courtNumber || "N/A",
        filedOn: formatDate(caseData.filedOn),
        nextDate: formatDate(caseData.nextDate),
        status: caseData.status || "N/A",
        court: "National Company Law Tribunal (NCLT)",
        partyName: name,
        partyType: partyType || "N/A",
        benchId: benchId,
        year: year || "N/A",
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

  //   if (!benchId || !name) {
  //     setError("Please enter bench ID and party name");
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError(null);
  //   setTableSearchQuery("");

  //   try {
  //     const requestBody = {
  //       benchId,
  //       partyType: partyType || "PETITIONER",
  //       stage: stage || "PENDING",
  //       year,
  //       name,
  //     };

  //     const response = await fetch(
  //       "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/national-company-law-tribunal/search/party/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
  //         },
  //         body: JSON.stringify(requestBody),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     const resultsArray = Array.isArray(data) ? data : [];
  //     setSearchResults(resultsArray);
  //     setFilteredResults(resultsArray);
  //   } catch (err) {
  //     setError(err.message);
  //     console.error("Search error:", err);
  //     setSearchResults([]);
  //     setFilteredResults([]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!benchId || !name) {
      setError("Please enter bench ID and party name");
      return;
    }

    setIsLoading(true);
    setError(null);
    setTableSearchQuery("");

    try {
      const requestBody = {
        benchId,
        partyType: partyType || "PETITIONER",
        stage: stage || "PENDING",
        year,
        name,
      };

      const { data } = await api.post(
        "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/national-company-law-tribunal/search/party/",
        requestBody,
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
      setError(err.message);
      console.error("Search error:", err);
      setSearchResults([]);
      setFilteredResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Existing handleViewDetails function (unchanged)
  // const handleViewDetails = async (filingNumber) => {
  //   setDetailsLoading(true);
  //   setDetailsError(null);
  //   setSelectedFilingNumber(filingNumber);

  //   try {
  //     const response = await fetch(
  //       "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/national-company-law-tribunal/filing-number/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
  //         },
  //         body: JSON.stringify({
  //           filingNumber,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setCaseDetails(data);
  //     setShowCaseDetails(true);
  //   } catch (err) {
  //     setDetailsError(err.message);
  //     console.error("Details fetch error:", err);
  //   } finally {
  //     setDetailsLoading(false);
  //   }
  // };

  const handleViewDetails = async (filingNumber) => {
    setDetailsLoading(true);
    setDetailsError(null);
    setSelectedFilingNumber(filingNumber);

    try {
      const { data } = await api.post(
        "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/national-company-law-tribunal/filing-number/",
        { filingNumber },
        {
          headers: {
            Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
          },
        }
      );

      setCaseDetails(data);
      setShowCaseDetails(true);
    } catch (err) {
      setDetailsError(err.message);
      console.error("Details fetch error:", err);
    } finally {
      setDetailsLoading(false);
    }
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
      (result) =>
        (result.filingNumber &&
          result.filingNumber.toLowerCase().includes(query)) ||
        (result.caseType && result.caseType.toLowerCase().includes(query)) ||
        (result.caseNumber &&
          result.caseNumber.toLowerCase().includes(query)) ||
        (result.title && result.title.toLowerCase().includes(query)) ||
        (result.bench && result.bench.toLowerCase().includes(query)) ||
        (result.courtNumber && result.courtNumber.toString().includes(query)) ||
        (result.status && result.status.toLowerCase().includes(query))
    );

    setFilteredResults(filtered);
  };

  // Existing closeDetailsModal function (unchanged)
  const closeDetailsModal = () => {
    setShowCaseDetails(false);
    setCaseDetails(null);
    setSelectedFilingNumber(null);
    setDetailsError(null);
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
                        Filing Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Case Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Party Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Status
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
                          {caseData.filingNumber || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {caseData.caseNumber || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {caseData.title || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {caseData.partyName || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {caseData.status || "N/A"}
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
            Search NCLT Cases by Party Name
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            Search cases in the National Company Law Tribunal by party name
          </p>
        </div>

        <div className="p-4">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="benchId"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Bench ID *
                </label>
                <input
                  id="benchId"
                  type="text"
                  value={benchId}
                  onChange={(e) => setBenchId(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter bench ID (e.g., 4a44dc15)"
                  required
                />
                <div className="text-xs text-gray-500 mt-1">
                  Example: 4a44dc15
                </div>
              </div>
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
                  Example: Manish
                </div>
              </div>
              <div>
                <label
                  htmlFor="partyType"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Party Type
                </label>
                <select
                  id="partyType"
                  value={partyType}
                  onChange={(e) => setPartyType(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select party type</option>
                  {partyTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-gray-500 mt-1">
                  Example: PETITIONER
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
                  {stageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-gray-500 mt-1">
                  Example: PENDING
                </div>
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
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}
      </div>

      {/* Search Results Card with Follow Feature */}
      {searchResults && (
        <div className="bg-white rounded-md shadow-sm">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-md font-medium text-gray-800">
                  Search Results
                </h3>
                <p className="mt-1 text-xs text-gray-600">
                  Found
                  {Array.isArray(searchResults) ? searchResults.length : 0}
                  cases
                </p>
              </div>
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
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
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
                <table className="w-auto divide-y divide-gray-200 shadow-md shadow-slate-600 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Filing No.
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Case Type
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Case No.
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Bench
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Court
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Filed On
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Next Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Follow
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(filteredResults) &&
                      filteredResults.map((result, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-blue-50 transition-colors duration-150`}
                        >
                          <td className="px-3 py-2 text-xs text-gray-900">
                            {result.filingNumber || "N/A"}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-900">
                            {result.caseType || "N/A"}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-900 font-medium">
                            {result.caseNumber || "N/A"}
                          </td>
                          <td
                            className="px-3 py-2 text-xs text-gray-900 max-w-[200px] truncate"
                            title={result.title}
                          >
                            {result.title || "N/A"}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-900">
                            {result.bench || "N/A"}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-900">
                            {result.courtNumber || "N/A"}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-900">
                            {formatDate(result.filedOn)}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-900">
                            {formatDate(result.nextDate)}
                          </td>
                          <td className="px-3 py-2 text-xs">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                                result.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : result.status === "Disposed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {result.status || "N/A"}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-900">
                            <button
                              className={`flex items-center justify-center space-x-1 px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                                followedCases[result.filingNumber]
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
                                    size={14}
                                    className={
                                      followedCases[result.filingNumber]
                                        ? "text-yellow-600 fill-yellow-500"
                                        : ""
                                    }
                                  />
                                  <span>
                                    {followedCases[result.filingNumber]
                                      ? "Following"
                                      : "Follow"}
                                  </span>
                                </>
                              )}
                            </button>
                          </td>
                          <td className="px-3 py-2 text-xs">
                            <button
                              onClick={() =>
                                handleViewDetails(result.filingNumber)
                              }
                              disabled={
                                detailsLoading &&
                                selectedFilingNumber === result.filingNumber
                              }
                              className="flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
                            >
                              {detailsLoading &&
                              selectedFilingNumber === result.filingNumber ? (
                                "Loading..."
                              ) : (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  Details
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
              Array.isArray(filteredResults) &&
              Array.isArray(searchResults) &&
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

      {/* Case Details Modal */}
      {showCaseDetails && (
        <NcltCaseDetailsModal
          caseDetails={caseDetails}
          isLoading={detailsLoading}
          error={detailsError}
          onClose={closeDetailsModal}
        />
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

export default NcltPartySearchPage;
