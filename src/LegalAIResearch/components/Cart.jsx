import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  ArrowLeft,
  Trash2,
  Star,
  ExternalLink,
  FileText,
  Flag,
  User,
  Clock,
  Briefcase,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DistrictCaseDetailsModal from "./DistrictCaseDetailsModal";
import HighCaseDetailsModal from "./HighCaseDetailsModal";
import NcltCaseDetailsModal from "./NcltCaseDetailsModal";
import api from "@/utils/api";

// Status Badge Component
const StatusBadge = ({ status }) => {
  let bgColor = "bg-yellow-100 text-yellow-800"; // Default for "PENDING" or unknown
  if (
    status === "COMPLETED" ||
    status === "DISPOSED" ||
    status === "REGISTERED"
  ) {
    bgColor = "bg-green-100 text-green-800";
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
      {status || "N/A"}
    </span>
  );
};

// Error Message Component
const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border border-red-200 rounded-md p-4">
    <p className="text-sm text-red-700">{message}</p>
  </div>
);

const CartPage = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { role } = JSON.parse(localStorage.getItem("user"));

  // State for tab selection
  const [activeCourtTab, setActiveCourtTab] = useState("supreme");

  // State for all followed cases (Supreme Court)
  const [allFollowedCases, setAllFollowedCases] = useState({});
  const [isLoadingAll, setIsLoadingAll] = useState(true);
  const [allError, setAllError] = useState(null);
  const [hasFetchedAll, setHasFetchedAll] = useState(false);

  // State for High Court followed cases
  const [highCourtCases, setHighCourtCases] = useState({});
  const [isLoadingHigh, setIsLoadingHigh] = useState(true);
  const [highError, setHighError] = useState(null);
  const [hasFetchedHigh, setHasFetchedHigh] = useState(false);

  // State for District Court followed cases
  const [districtCourtCases, setDistrictCourtCases] = useState({});
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(true);
  const [districtError, setDistrictError] = useState(null);
  const [hasFetchedDistrict, setHasFetchedDistrict] = useState(false);

  // State for CAT followed cases
  const [catCases, setCatCases] = useState({});
  const [isLoadingCat, setIsLoadingCat] = useState(true);
  const [catError, setCatError] = useState(null);
  const [hasFetchedCat, setHasFetchedCat] = useState(false);

  // State for NCLT followed cases
  const [ncltCases, setNcltCases] = useState({});
  const [isLoadingNclt, setIsLoadingNclt] = useState(true);
  const [ncltError, setNcltError] = useState(null);
  const [hasFetchedNclt, setHasFetchedNclt] = useState(false);

  // State for Consumer Forum followed cases
  const [consumerCases, setConsumerCases] = useState({});
  const [isLoadingConsumer, setIsLoadingConsumer] = useState(true);
  const [consumerError, setConsumerError] = useState(null);
  const [hasFetchedConsumer, setHasFetchedConsumer] = useState(false);

  // State for search and sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "followedAt",
    direction: "desc",
  });

  // State for case details modal
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [caseDetails, setCaseDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loadingDetailId, setLoadingDetailId] = useState(null);

  // State for followed cases (for the Follow button)
  const [followedCases, setFollowedCases] = useState({});

  // Fetch all followed cases (Supreme Court)
  useEffect(() => {
    if (hasFetchedAll) return;
    const fetchAllFollowedCases = async () => {
      try {
        setIsLoadingAll(true);
        const response = await api.get(`/get-followed-cases-by-court`, {
          params: {
            court: "Supreme Court",
            workspaceId,
          },
        });
        const data = response.data;
        if (data.success) {
          const allCases = data.cases.reduce((acc, caseData) => {
            const { id, ...cleanedCaseData } = caseData;
            acc[caseData.case_id] = cleanedCaseData;
            return acc;
          }, {});
          setAllFollowedCases(allCases);
          const followed = Object.keys(allCases).reduce((acc, case_id) => {
            acc[allCases[case_id].cnr || case_id] = true;
            return acc;
          }, {});
          setFollowedCases(followed);
        } else {
          throw new Error(
            data.error || "Failed to fetch Supreme Court followed cases"
          );
        }
      } catch (err) {
        setAllError(err.message);
      } finally {
        setIsLoadingAll(false);
        setHasFetchedAll(true);
      }
    };

    fetchAllFollowedCases();
  }, [hasFetchedAll]);

  // Fetch High Court followed cases
  useEffect(() => {
    if (hasFetchedHigh) return;

    const fetchHighCourtCases = async () => {
      try {
        setIsLoadingHigh(true);

        const response = await api.get(`/get-followed-cases-by-court`, {
          params: {
            court: "High Court",
            workspaceId,
          },
        });

        const data = response.data;

        if (data.success) {
          const highCases = data.cases.reduce((acc, caseData) => {
            const { id, ...cleanedCaseData } = caseData;
            acc[caseData.case_id] = cleanedCaseData;
            return acc;
          }, {});
          setHighCourtCases(highCases);
        } else {
          throw new Error(
            data.error || "Failed to fetch High Court followed cases"
          );
        }
      } catch (err) {
        setHighError(err.message);
      } finally {
        setIsLoadingHigh(false);
        setHasFetchedHigh(true);
      }
    };

    fetchHighCourtCases();
  }, [hasFetchedHigh]);

  // Fetch District Court followed cases
  useEffect(() => {
    if (hasFetchedDistrict) return;

    const fetchDistrictCourtCases = async () => {
      try {
        setIsLoadingDistrict(true);
        const response = await api.get(`/get-followed-cases-by-court`, {
          params: {
            court: "District Court",
            workspaceId,
          },
        });
        const data = response?.data;
        if (data.success) {
          const districtCases = data.cases.reduce((acc, caseData) => {
            // console.log(caseData);
            const { id, ...cleanedCaseData } = caseData;
            acc[caseData.case_id] = cleanedCaseData;
            return acc;
          }, {});
          setDistrictCourtCases(districtCases);
        } else {
          throw new Error(
            data.error || "Failed to fetch District Court followed cases"
          );
        }
      } catch (err) {
        setDistrictError(err.message);
      } finally {
        setIsLoadingDistrict(false);
        setHasFetchedDistrict(true);
      }
    };

    fetchDistrictCourtCases();
  }, [hasFetchedDistrict]);

  // Fetch CAT followed cases
  useEffect(() => {
    if (hasFetchedCat) return;

    const fetchCatCases = async () => {
      try {
        setIsLoadingCat(true);
        const response = await api.get(`/get-followed-cases-by-court`, {
          params: {
            court: "Central Administrative Tribunal (CAT)",
            workspaceId,
          },
        });
        const data = response.data;
        if (data.success) {
          const catCasesData = data.cases.reduce((acc, caseData) => {
            const { id, ...cleanedCaseData } = caseData;
            acc[caseData.case_id] = cleanedCaseData;
            return acc;
          }, {});
          setCatCases(catCasesData);
        } else {
          throw new Error(data.error || "Failed to fetch CAT followed cases");
        }
      } catch (err) {
        setCatError(err.message);
      } finally {
        setIsLoadingCat(false);
        setHasFetchedCat(true);
      }
    };

    fetchCatCases();
  }, [hasFetchedCat]);

  // Fetch NCLT followed cases
  useEffect(() => {
    if (hasFetchedNclt) return;

    const fetchNcltCases = async () => {
      try {
        setIsLoadingNclt(true);
        const response = await api.get(`/get-followed-cases-by-court`, {
          params: {
            court: "National Company Law Tribunal (NCLT)",
            workspaceId,
          },
        });
        const data = response.data;
        if (data.success) {
          const ncltCasesData = data.cases.reduce((acc, caseData) => {
            const { id, ...cleanedCaseData } = caseData;
            acc[caseData.case_id] = cleanedCaseData;
            return acc;
          }, {});
          setNcltCases(ncltCasesData);
        } else {
          throw new Error(data.error || "Failed to fetch NCLT followed cases");
        }
      } catch (err) {
        setNcltError(err.message);
      } finally {
        setIsLoadingNclt(false);
        setHasFetchedNclt(true);
      }
    };

    fetchNcltCases();
  }, [hasFetchedNclt]);

  // Fetch Consumer Forum followed cases
  useEffect(() => {
    if (hasFetchedConsumer) return;

    const fetchConsumerCases = async () => {
      try {
        setIsLoadingConsumer(true);
        const response = await api.get(`/get-followed-cases-by-court`, {
          params: {
            court: "Consumer Forum",
            workspaceId,
          },
        });
        const data = response.data;

        if (data.success) {
          const consumerCasesData = data.cases.reduce((acc, caseData) => {
            const { id, ...cleanedCaseData } = caseData;
            acc[caseData.case_id] = cleanedCaseData;
            return acc;
          }, {});
          setConsumerCases(consumerCasesData);
        } else {
          throw new Error(
            data.error || "Failed to fetch Consumer Forum followed cases"
          );
        }
      } catch (err) {
        setConsumerError(err.message);
      } finally {
        setIsLoadingConsumer(false);
        setHasFetchedConsumer(true);
      }
    };

    fetchConsumerCases();
  }, [hasFetchedConsumer]);

  // Filter and sort cases based on active tab
  const currentCases =
    activeCourtTab === "supreme"
      ? allFollowedCases
      : activeCourtTab === "high"
      ? highCourtCases
      : activeCourtTab === "district"
      ? districtCourtCases
      : activeCourtTab === "cat"
      ? catCases
      : activeCourtTab === "nclt"
      ? ncltCases
      : consumerCases;

  const filteredCases = Object.entries(currentCases).filter(
    ([id, caseData]) => {
      const searchIn =
        activeCourtTab === "consumer"
          ? Object.values(caseData.details || {})
              .join(" ")
              .toLowerCase()
          : Object.values(caseData).join(" ").toLowerCase();
      return searchIn.includes(searchQuery.toLowerCase());
    }
  );

  const sortedCases = [...filteredCases].sort((a, b) => {
    const aValue =
      activeCourtTab === "consumer"
        ? (a[1].details && a[1].details[sortConfig.key]) ||
          a[1][sortConfig.key] ||
          ""
        : a[1][sortConfig.key] || "";
    const bValue =
      activeCourtTab === "consumer"
        ? (b[1].details && b[1].details[sortConfig.key]) ||
          b[1][sortConfig.key] ||
          ""
        : b[1][sortConfig.key] || "";
    if (aValue === "") return sortConfig.direction === "asc" ? 1 : -1;
    if (bValue === "") return sortConfig.direction === "asc" ? -1 : 1;
    if (new Date(aValue) && new Date(bValue)) {
      return sortConfig.direction === "asc"
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }
    return sortConfig.direction === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "";
  };

  // Function to unfollow a case
  const handleUnfollow = async (caseId) => {
    try {
      const endpoint =
        activeCourtTab === "supreme"
          ? "/unfollow-case"
          : activeCourtTab === "high"
          ? "/unfollow-case"
          : activeCourtTab === "district"
          ? "/unfollow-case"
          : activeCourtTab === "cat"
          ? "/unfollow-case"
          : activeCourtTab === "nclt"
          ? "/unfollow-case"
          : "/unfollow-case";
      const response = await api.delete(`${endpoint}`, {
        data: { caseId },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        const updatedCases = { ...currentCases };
        delete updatedCases[caseId];
        if (activeCourtTab === "supreme") {
          setAllFollowedCases(updatedCases);
          setFollowedCases((prev) => {
            const updated = { ...prev };
            delete updated[currentCases[caseId].cnr];
            return updated;
          });
        } else if (activeCourtTab === "high") {
          setHighCourtCases(updatedCases);
        } else if (activeCourtTab === "district") {
          setDistrictCourtCases(updatedCases);
        } else if (activeCourtTab === "cat") {
          setCatCases(updatedCases);
        } else if (activeCourtTab === "nclt") {
          setNcltCases(updatedCases);
        } else {
          setConsumerCases(updatedCases);
        }
      } else {
        throw new Error(data.error || "Failed to unfollow case");
      }
    } catch (err) {
      activeCourtTab === "supreme"
        ? setAllError(err.message)
        : activeCourtTab === "high"
        ? setHighError(err.message)
        : activeCourtTab === "district"
        ? setDistrictError(err.message)
        : activeCourtTab === "cat"
        ? setCatError(err.message)
        : activeCourtTab === "nclt"
        ? setNcltError(err.message)
        : setConsumerError(err.message);
    }
  };

  // Function to unfollow all cases for the active tab
  const handleUnfollowAll = async () => {
    if (
      window.confirm(
        `Are you sure you want to unfollow all ${
          activeCourtTab === "supreme"
            ? "Supreme Court"
            : activeCourtTab === "high"
            ? "High Court"
            : activeCourtTab === "district"
            ? "District Court"
            : activeCourtTab === "cat"
            ? "CAT"
            : activeCourtTab === "nclt"
            ? "NCLT"
            : "Consumer Forum"
        } cases?`
      )
    ) {
      try {
        const caseIds = Object.keys(currentCases);
        for (const caseId of caseIds) {
          const endpoint =
            activeCourtTab === "supreme"
              ? "/unfollow-case"
              : activeCourtTab === "high"
              ? "/unfollow-case"
              : activeCourtTab === "district"
              ? "/unfollow-case"
              : activeCourtTab === "cat"
              ? "/unfollow-case"
              : activeCourtTab === "nclt"
              ? "/unfollow-case"
              : "/unfollow-case";
          await api.delete(`${endpoint}`, {
            data: { caseId },
          });
        }
        if (activeCourtTab === "supreme") {
          setAllFollowedCases({});
          setFollowedCases({});
        } else if (activeCourtTab === "high") {
          setHighCourtCases({});
        } else if (activeCourtTab === "district") {
          setDistrictCourtCases({});
        } else if (activeCourtTab === "cat") {
          setCatCases({});
        } else if (activeCourtTab === "nclt") {
          setNcltCases({});
        } else {
          setConsumerCases({});
        }
      } catch (err) {
        activeCourtTab === "supreme"
          ? setAllError(err.message)
          : activeCourtTab === "high"
          ? setHighError(err.message)
          : activeCourtTab === "district"
          ? setDistrictError(err.message)
          : activeCourtTab === "cat"
          ? setCatError(err.message)
          : activeCourtTab === "nclt"
          ? setNcltError(err.message)
          : setConsumerError(err.message);
      }
    }
  };

  // Function to fetch case details
  const handleViewDetails = async (caseData, index) => {
    setIsLoadingDetails(true);
    setLoadingDetailId(index);
    setDetailsError(null);
    setActiveTab("overview");
    setCaseDetails(null);

    try {
      if (activeCourtTab === "supreme") {
        const diaryNumber = caseData.diaryNumber || caseData.cnr;
        const year =
          diaryNumber.split("/")[1] || new Date().getFullYear().toString();
        const diaryNumberOnly = diaryNumber.split("/")[0];

        const response = await fetch(
          "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/supreme-court/case/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ diaryNumber: diaryNumberOnly, year }),
          }
        );

        const data = await response.json();
        if (response.ok && !data.error) {
          setCaseDetails(data);
          setShowCaseDetails(true);
        } else {
          throw new Error(
            data.error || "Failed to fetch Supreme Court case details"
          );
        }
      } else if (activeCourtTab === "high") {
        const response = await fetch(
          "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/high-court/case/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cnr: caseData.cnr }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          setCaseDetails(data);
          setShowCaseDetails(true);
        } else {
          throw new Error(
            data.error || "Failed to fetch High Court case details"
          );
        }
      } else if (activeCourtTab === "district") {
        const response = await fetch(
          "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/district-court/case/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cnr: caseData.cnr }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          setCaseDetails(data);
          setShowCaseDetails(true);
        } else {
          throw new Error(
            data.error || "Failed to fetch District Court case details"
          );
        }
      } else if (activeCourtTab === "nclt") {
        const response = await fetch(
          "https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/national-company-law-tribunal/filing-number/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25",
            },
            body: JSON.stringify({
              filingNumber: caseData.filingNumber || caseData.caseId,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          setCaseDetails(data);
          setShowCaseDetails(true);
        } else {
          throw new Error(data.error || "Failed to fetch NCLT case details");
        }
      } else if (activeCourtTab === "consumer") {
        setCaseDetails(caseData.details); // Use details from the case object
        setShowCaseDetails(true);
      } else {
        // CAT - No details fetching needed
        setShowCaseDetails(false);
      }
    } catch (err) {
      setDetailsError(err.message);
      setShowCaseDetails(true);
    } finally {
      setIsLoadingDetails(false);
      setLoadingDetailId(null);
    }
  };

  // Function to handle follow/unfollow in the modal (for Supreme Court)
  const handleFollowCase = async (caseData) => {
    const cnr = caseData.diaryNumber || caseData.cnr;
    if (followedCases[cnr]) {
      await handleUnfollow(caseData.caseId || cnr);
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_FOLLOW_API_URL}/api/follow-supreme-case`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              caseId: cnr,
              cnr,
              title: caseData.title,
              caseNumber: caseData.caseNumber,
              status: caseData.status,
            }),
          }
        );
        const data = await response.json();
        if (response.ok && data.success) {
          setFollowedCases((prev) => ({ ...prev, [cnr]: true }));
          setAllFollowedCases((prev) => ({
            ...prev,
            [cnr]: {
              caseId: cnr,
              cnr,
              title: caseData.title,
              caseNumber: caseData.caseNumber,
              status: caseData.status,
            },
          }));
        } else {
          throw new Error(data.error || "Failed to follow case");
        }
      } catch (err) {
        setDetailsError(err.message);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const closeDetailsPopup = () => setShowCaseDetails(false);

  const goBack = () => navigate(-1);

  // Define headers based on active tab
  const supremeHeaders = [
    "caseId",
    "title",
    "caseNumber",
    "diaryNumber",
    "petitioner",
    "respondent",
    "status",
    "court",
    "followedAt",
  ];
  const highHeaders = [
    "caseId",
    "cnr",
    "title",
    "caseNumber",
    "petitioner",
    "respondent",
    "status",
    "court",
    "followedAt",
  ];
  const districtHeaders = [
    "caseId",
    "cnr",
    "title",
    "caseNumber",
    "petitioner",
    "respondent",
    "status",
    "court",
    "followedAt",
  ];
  const catHeaders = [
    "caseId",
    "caseNumber",
    "diaryNumber",
    "court",
    "followedAt",
  ];
  const ncltHeaders = [
    "caseId",
    "filingNumber",
    "caseNumber",
    "title",
    "bench",
    "courtNumber",
    "filedOn",
    "nextDate",
    "status",
    "court",
    "followedAt",
  ];
  const consumerHeaders = [
    "caseNumber",
    "filing.number",
    "commission",
    "parties.complainant",
    "parties.respondent",
    "status.stage",
    "status.nextHearing",
    "court",
    "followedAt",
  ];

  const headers =
    activeCourtTab === "supreme"
      ? supremeHeaders
      : activeCourtTab === "high"
      ? highHeaders
      : activeCourtTab === "district"
      ? districtHeaders
      : activeCourtTab === "cat"
      ? catHeaders
      : activeCourtTab === "nclt"
      ? ncltHeaders
      : consumerHeaders;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Followed Cases</h1>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {Object.keys(currentCases).length}
          </span>
        </div>
        {role === "Owner" && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleUnfollowAll}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={Object.keys(currentCases).length === 0}
            >
              <Trash2 size={18} />
              <span>Unfollow All</span>
            </button>
          </div>
        )}
      </div>

      {/* Search */}
      {!(activeCourtTab === "supreme"
        ? isLoadingAll
        : activeCourtTab === "high"
        ? isLoadingHigh
        : activeCourtTab === "district"
        ? isLoadingDistrict
        : activeCourtTab === "cat"
        ? isLoadingCat
        : activeCourtTab === "nclt"
        ? isLoadingNclt
        : isLoadingConsumer) &&
        Object.keys(currentCases).length > 0 && (
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${
                  activeCourtTab === "supreme"
                    ? "Supreme Court"
                    : activeCourtTab === "high"
                    ? "High Court"
                    : activeCourtTab === "district"
                    ? "District Court"
                    : activeCourtTab === "cat"
                    ? "CAT"
                    : activeCourtTab === "nclt"
                    ? "NCLT"
                    : "Consumer Forum"
                } followed cases...`}
                className="w-full border border-gray-300 rounded-md pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
            </div>
          </div>
        )}

      {/* Tabs */}
      <div className="mb-6 border-b">
        <div className="flex overflow-x-auto">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeCourtTab === "supreme"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveCourtTab("supreme")}
          >
            Supreme Court
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeCourtTab === "high"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveCourtTab("high")}
          >
            High Court
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeCourtTab === "district"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveCourtTab("district")}
          >
            District Court
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeCourtTab === "cat"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveCourtTab("cat")}
          >
            CAT
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeCourtTab === "nclt"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveCourtTab("nclt")}
          >
            NCLT
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeCourtTab === "consumer"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveCourtTab("consumer")}
          >
            Consumer Forum
          </button>
        </div>
      </div>

      {/* Error Message */}
      {(activeCourtTab === "supreme"
        ? allError
        : activeCourtTab === "high"
        ? highError
        : activeCourtTab === "district"
        ? districtError
        : activeCourtTab === "cat"
        ? catError
        : activeCourtTab === "nclt"
        ? ncltError
        : consumerError) && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-sm text-red-700">
            {activeCourtTab === "supreme"
              ? allError
              : activeCourtTab === "high"
              ? highError
              : activeCourtTab === "district"
              ? districtError
              : activeCourtTab === "cat"
              ? catError
              : activeCourtTab === "nclt"
              ? ncltError
              : consumerError}
          </p>
        </div>
      )}

      {/* Loading State */}
      {(activeCourtTab === "supreme"
        ? isLoadingAll
        : activeCourtTab === "high"
        ? isLoadingHigh
        : activeCourtTab === "district"
        ? isLoadingDistrict
        : activeCourtTab === "cat"
        ? isLoadingCat
        : activeCourtTab === "nclt"
        ? isLoadingNclt
        : isLoadingConsumer) && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Case List */}
      {!(activeCourtTab === "supreme"
        ? isLoadingAll
        : activeCourtTab === "high"
        ? isLoadingHigh
        : activeCourtTab === "district"
        ? isLoadingDistrict
        : activeCourtTab === "cat"
        ? isLoadingCat
        : activeCourtTab === "nclt"
        ? isLoadingNclt
        : isLoadingConsumer) && Object.keys(currentCases).length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <X size={48} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              No Followed{" "}
              {activeCourtTab === "supreme"
                ? "Supreme Court"
                : activeCourtTab === "high"
                ? "High Court"
                : activeCourtTab === "district"
                ? "District Court"
                : activeCourtTab === "cat"
                ? "CAT"
                : activeCourtTab === "nclt"
                ? "NCLT"
                : "Consumer Forum"}{" "}
              Cases
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              You haven't followed any{" "}
              {activeCourtTab === "supreme"
                ? "Supreme Court"
                : activeCourtTab === "high"
                ? "High Court"
                : activeCourtTab === "district"
                ? "District Court"
                : activeCourtTab === "cat"
                ? "CAT"
                : activeCourtTab === "nclt"
                ? "NCLT"
                : "Consumer Forum"}{" "}
              cases yet.
            </p>
            <button
              onClick={goBack}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <ArrowLeft size={18} />
              <span>Back to Search</span>
            </button>
          </div>
        </div>
      ) : !(activeCourtTab === "supreme"
          ? isLoadingAll
          : activeCourtTab === "high"
          ? isLoadingHigh
          : activeCourtTab === "district"
          ? isLoadingDistrict
          : activeCourtTab === "cat"
          ? isLoadingCat
          : activeCourtTab === "nclt"
          ? isLoadingNclt
          : isLoadingConsumer) && sortedCases.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
          No{" "}
          {activeCourtTab === "supreme"
            ? "Supreme Court"
            : activeCourtTab === "high"
            ? "High Court"
            : activeCourtTab === "district"
            ? "District Court"
            : activeCourtTab === "cat"
            ? "CAT"
            : activeCourtTab === "nclt"
            ? "NCLT"
            : "Consumer Forum"}{" "}
          cases match your search criteria. Try a different search term.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {headers.map((header) => (
                    <th
                      key={header}
                      onClick={() => requestSort(header.split(".")[0])}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    >
                      <div className="flex items-center space-x-1">
                        <span>{header.split(".").pop()}</span>
                        <span>{getSortIndicator(header.split(".")[0])}</span>
                      </div>
                    </th>
                  ))}
                  {activeCourtTab !== "cat" && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                  {role === "Owner" && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Unfollow
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedCases.map(([id, caseData], index) => (
                  <tr key={id} className="hover:bg-blue-50 transition-colors">
                    {headers.map((header) => {
                      const keys = header.split(".");
                      let value =
                        activeCourtTab === "consumer"
                          ? caseData.details
                          : caseData;
                      for (const key of keys) {
                        value = value ? value[key] : null;
                      }
                      return (
                        <td
                          key={header}
                          className="px-6 py-4 text-sm text-gray-700"
                        >
                          {header === "status" || header === "status.stage" ? (
                            <StatusBadge
                              status={
                                activeCourtTab === "consumer"
                                  ? caseData.details?.status?.stage
                                  : caseData.status
                              }
                            />
                          ) : header === "followedAt" ||
                            header === "filing.date" ||
                            header === "status.nextHearing" ? (
                            formatDate(value)
                          ) : Array.isArray(value) ? (
                            value.join(", ") || "N/A"
                          ) : (
                            value || "N/A"
                          )}
                        </td>
                      );
                    })}
                    {activeCourtTab !== "cat" && (
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleViewDetails(caseData, index)}
                          className="bg-blue-100 text-blue-700 w-24 hover:bg-blue-200 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
                          disabled={loadingDetailId === index}
                        >
                          {loadingDetailId === index ? (
                            <div className="flex items-center space-x-1">
                              <span>Loading..</span>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
                            </div>
                          ) : (
                            <>
                              <span>Details</span>
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
                            </>
                          )}
                        </button>
                      </td>
                    )}
                    {role === "Owner" && role === "Owner" && (
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleUnfollow(id)}
                          className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
                        >
                          <span>Unfollow</span>
                          <X size={12} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Case Details Modal */}
      {showCaseDetails && activeCourtTab === "district" && (
        <DistrictCaseDetailsModal
          caseDetails={caseDetails}
          isLoading={isLoadingDetails}
          error={detailsError}
          onClose={closeDetailsPopup}
        />
      )}

      {showCaseDetails && activeCourtTab === "supreme" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold">Case Details</h3>
              <button
                onClick={closeDetailsPopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {isLoadingDetails ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                </div>
              ) : detailsError ? (
                <ErrorMessage message={detailsError} />
              ) : caseDetails ? (
                <div>
                  {/* Case Title Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold mb-2">
                        {caseDetails.title || "N/A"}
                      </h2>
                      {/* Follow Button in Case Details */}
                      <button
                        className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm ${
                          followedCases[caseDetails.cnr]
                            ? "text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                            : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() =>
                          handleFollowCase({
                            caseId: caseDetails.cnr,
                            cnr: caseDetails.cnr,
                            title: caseDetails.title,
                            caseNumber: caseDetails.details?.caseNumber,
                            status: caseDetails.status?.stage,
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
                      <span className="text-gray-600 text-sm">
                        CNR: {caseDetails.cnr || "N/A"}
                      </span>
                      <span className="text-gray-600 text-sm mx-2">|</span>
                      <span className="text-gray-600 text-sm">
                        Filed: {formatDate(caseDetails.details?.filedOn)}
                      </span>
                      <span className="text-gray-600 text-sm mx-2">|</span>
                      <StatusBadge status={caseDetails.status?.stage} />
                    </div>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="border-b mb-4">
                    <div className="flex overflow-x-auto">
                      {[
                        "overview",
                        "parties",
                        "history",
                        "orders",
                        "defects",
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

                  {/* Tab Content */}
                  <div className="mb-4">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                      <div className="space-y-6">
                        {/* Case Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">
                              Case Number
                            </h3>
                            <p className="text-sm">
                              {caseDetails.details?.caseNumber || "N/A"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">
                              Category
                            </h3>
                            <p className="text-sm">
                              {caseDetails.details?.category || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Status Information */}
                        <div>
                          <h3 className="font-medium mb-2">
                            Status Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                            <div>
                              <p className="text-sm text-gray-500">
                                Current Status
                              </p>
                              <p className="text-sm">
                                {caseDetails.status?.status || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Last Listed On
                              </p>
                              <p className="text-sm">
                                {formatDate(caseDetails.status?.lastListedOn)}
                              </p>
                            </div>
                            {caseDetails.status?.nextDate && (
                              <div>
                                <p className="text-sm text-gray-500">
                                  Next Date
                                </p>
                                <p className="text-sm">
                                  {formatDate(caseDetails.status?.nextDate)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Recent Hearing */}
                        {caseDetails.history &&
                          caseDetails.history.length > 0 && (
                            <div>
                              <h3 className="font-medium mb-2">
                                Recent Hearing
                              </h3>
                              <div className="bg-gray-50 p-4 rounded-md">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Date
                                    </p>
                                    <p className="text-sm">
                                      {formatDate(caseDetails.history[0].date)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Type
                                    </p>
                                    <p className="text-sm">
                                      {caseDetails.history[0].type || "N/A"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Stage
                                    </p>
                                    <p className="text-sm">
                                      {caseDetails.history[0].stage || "N/A"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Purpose
                                    </p>
                                    <p className="text-sm">
                                      {caseDetails.history[0].purpose || "N/A"}
                                    </p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-sm text-gray-500">
                                      Bench
                                    </p>
                                    <p className="text-sm">
                                      {caseDetails.history[0].judge || "N/A"}
                                    </p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-sm text-gray-500">
                                      Remarks
                                    </p>
                                    <p className="text-sm font-medium">
                                      {caseDetails.history[0].remarks || "N/A"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    )}

                    {/* Parties Tab */}
                    {activeTab === "parties" && (
                      <div className="space-y-6">
                        {/* Petitioners */}
                        <div>
                          <h3 className="font-medium mb-2">Petitioners</h3>
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.parties?.petitioners?.map(
                              (petitioner, index) => (
                                <li key={index} className="text-sm">
                                  {petitioner || "N/A"}
                                </li>
                              )
                            ) || <li className="text-sm">N/A</li>}
                          </ul>
                        </div>

                        {/* Respondents */}
                        <div>
                          <h3 className="font-medium mb-2">Respondents</h3>
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.parties?.respondents?.map(
                              (respondent, index) => (
                                <li key={index} className="text-sm">
                                  {respondent || "N/A"}
                                </li>
                              )
                            ) || <li className="text-sm">N/A</li>}
                          </ul>
                        </div>

                        {/* Advocates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium mb-2">
                              Petitioner Advocates
                            </h3>
                            <p className="bg-gray-50 p-4 rounded-md text-sm">
                              {caseDetails.parties?.petitionerAdvocates ||
                                "N/A"}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">
                              Respondent Advocates
                            </h3>
                            <p className="bg-gray-50 p-4 rounded-md text-sm">
                              {caseDetails.parties?.respondentAdvocates ||
                                "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* History Tab */}
                    {activeTab === "history" && (
                      <div>
                        <h3 className="font-medium mb-4">Case History</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-black p-2 text-left text-xs font-medium text-black">
                                  Date
                                </th>
                                <th className="border border-black p-2 text-left text-xs font-medium text-black">
                                  Type
                                </th>
                                <th className="border border-black p-2 text-left text-xs font-medium text-black">
                                  Stage
                                </th>
                                <th className="border border-black p-2 text-left text-xs font-medium text-black">
                                  Purpose
                                </th>
                                <th className="border border-black p-2 text-left text-xs font-medium text-black">
                                  Judge
                                </th>
                                <th className="border border-black p-2 text-left text-xs font-medium text-black">
                                  Remarks
                                </th>
                              </tr>
                            </thead>
                            edits
                            <tbody>
                              {caseDetails.history?.map((item, index) => (
                                <tr
                                  key={index}
                                  className="hover:bg-blue-100 even:bg-[#FEFCE8] odd:bg-white"
                                >
                                  <td className="border border-black p-2 text-sm">
                                    {formatDate(item.date)}
                                  </td>
                                  <td className="border border-black p-2 text-sm">
                                    {item.type || "N/A"}
                                  </td>
                                  <td className="border border-black p-2 text-sm">
                                    {item.stage || "N/A"}
                                  </td>
                                  <td className="border border-black p-2 text-sm">
                                    {item.purpose || "N/A"}
                                  </td>
                                  <td className="border border-black p-2 text-sm">
                                    {item.judge || "N/A"}
                                  </td>
                                  <td className="border border-black p-2 text-sm">
                                    {item.remarks || "N/A"}
                                  </td>
                                </tr>
                              )) || (
                                <tr>
                                  <td
                                    colSpan={6}
                                    className="border border-black p-2 text-sm text-center"
                                  >
                                    No history available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === "orders" && (
                      <div>
                        <h3 className="font-medium mb-4">Orders</h3>
                        {caseDetails.orders && caseDetails.orders.length > 0 ? (
                          <div className="space-y-3">
                            {caseDetails.orders.map((order, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                              >
                                <span className="text-sm font-medium">
                                  {formatDate(order.date)}
                                </span>
                                <a
                                  href={order.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  <span>View Order</span>
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

                    {/* Defects Tab */}
                    {activeTab === "defects" && (
                      <div>
                        <h3 className="font-medium mb-4">Defects</h3>
                        {caseDetails.defects &&
                        caseDetails.defects.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border border-black p-2 text-left text-xs font-medium text-black">
                                    S.No
                                  </th>
                                  <th className="border border-black p-2 text-left text-xs font-medium text-black">
                                    Defect
                                  </th>
                                  <th className="border border-black p-2 text-left text-xs font-medium text-black">
                                    Remarks
                                  </th>
                                  <th className="border border-black p-2 text-left text-xs font-medium text-black">
                                    Notification Date
                                  </th>
                                  <th className="border border-black p-2 text-left text-xs font-medium text-black">
                                    Removal Date
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {caseDetails.defects.map((defect, index) => (
                                  <tr
                                    key={index}
                                    className="hover:bg-blue-100 even:bg-[#FEFCE8] odd:bg-white"
                                  >
                                    <td className="border border-black p-2 text-sm">
                                      {defect.serialNumber || "N/A"}
                                    </td>
                                    <td className="border border-black p-2 text-sm">
                                      {defect.default || "N/A"}
                                    </td>
                                    <td className="border border-black p-2 text-sm">
                                      {defect.remarks || "N/A"}
                                    </td>
                                    <td className="border border-black p-2 text-sm">
                                      {formatDate(defect.notificationDate)}
                                    </td>
                                    <td className="border border-black p-2 text-sm">
                                      {formatDate(defect.removalDate)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                            No defects found for this case.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="border-t p-4 flex justify-end">
              <button
                onClick={closeDetailsPopup}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showCaseDetails && activeCourtTab === "high" && (
        <HighCaseDetailsModal
          caseDetails={caseDetails}
          isLoadingDetails={isLoadingDetails}
          detailsError={detailsError}
          closeDetailsPopup={closeDetailsPopup}
        />
      )}
      {showCaseDetails && activeCourtTab === "nclt" && (
        <NcltCaseDetailsModal
          caseDetails={caseDetails}
          isLoading={isLoadingDetails}
          error={detailsError}
          onClose={closeDetailsPopup}
        />
      )}
      {showCaseDetails && activeCourtTab === "consumer" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Case Header */}
            <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  {caseDetails?.caseNumber || "N/A"}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Commission: {caseDetails?.commission || "N/A"}
                </p>
              </div>
              <button
                onClick={closeDetailsPopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Case Details */}
            {isLoadingDetails ? (
              <div className="p-4 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-2 text-gray-600">Loading details...</p>
              </div>
            ) : detailsError ? (
              <div className="p-4">
                <ErrorMessage message={detailsError} />
              </div>
            ) : caseDetails ? (
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
                                {complainant}
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
                                {respondent}
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
                              {event.proceeding}
                            </div>
                          )}
                          {event.nextDate && (
                            <div className="mt-2 text-sm">
                              <span className="text-gray-500">Next Date:</span>{" "}
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
                                {app.type || "N/A"}
                              </td>
                              <td className="px-3 py-2 text-sm text-gray-800">
                                {formatDate(app.filedOn)}
                              </td>
                              <td className="px-3 py-2 text-sm text-gray-800">
                                {app.status || "N/A"}
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
                              {lowerCase.court || "N/A"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ) : null}
          </div>
        </div>
      )}
      {showCaseDetails && activeCourtTab === "cat" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold">CAT Case Details</h3>
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
                <ErrorMessage message={detailsError} />
              ) : caseDetails ? (
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    {caseDetails.caseNumber || "N/A"}
                  </h2>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-gray-600 text-sm">
                      Diary No: {caseDetails.diaryNumber || "N/A"}
                    </span>
                  </div>
                </div>
              ) : null}
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
    </div>
  );
};

export default CartPage;

// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   X,
//   ArrowLeft,
//   Trash2,
//   Star,
//   ExternalLink,
//   FileText,
//   Flag,
//   User,
//   Clock,
//   Briefcase,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import DistrictCaseDetailsModal from "./DistrictCaseDetailsModal";
// import HighCaseDetailsModal from "./HighCaseDetailsModal";
// import NcltCaseDetailsModal from "./NcltCaseDetailsModal";
// import followedCases from "@/utils/dummyFollowedCases";

// // Dummy data (your provided JSON)

// // Preprocess dummy data by court type
// const preprocessDummyData = () => {
//   const groupedSupremeCases = {};
//   const groupedHighCourtCases = {};
//   const groupedDistrictCourtCases = {};
//   const groupedCatCases = {};
//   const groupedNcltCases = {};
//   const groupedConsumerCases = {};

//   followedCases.forEach((caseData) => {
//     const { _id, __v, ...cleanedCaseData } = caseData;
//     const caseId = caseData.caseId;

//     switch (caseData.court) {
//       case "High Court":
//         groupedHighCourtCases[caseId] = cleanedCaseData;
//         break;
//       case "District Court":
//         groupedDistrictCourtCases[caseId] = cleanedCaseData;
//         break;
//       case "Central Administrative Tribunal (CAT)":
//         groupedCatCases[caseId] = cleanedCaseData;
//         break;
//       case "National Company Law Tribunal (NCLT)":
//         groupedNcltCases[caseId] = cleanedCaseData;
//         break;
//       case "Consumer Forum":
//         groupedConsumerCases[caseId] = cleanedCaseData;
//         break;
//       default:
//         groupedSupremeCases[caseId] = cleanedCaseData; // Default to Supreme Court if no match
//         break;
//     }
//   });

//   return {
//     groupedSupremeCases,
//     groupedHighCourtCases,
//     groupedDistrictCourtCases,
//     groupedCatCases,
//     groupedNcltCases,
//     groupedConsumerCases,
//   };
// };

// // Status Badge Component
// const StatusBadge = ({ status }) => {
//   let bgColor = "bg-yellow-100 text-yellow-800"; // Default for "PENDING" or unknown
//   if (
//     status === "COMPLETED" ||
//     status === "DISPOSED" ||
//     status === "REGISTERED"
//   ) {
//     bgColor = "bg-green-100 text-green-800";
//   }
//   return (
//     <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
//       {status || "N/A"}
//     </span>
//   );
// };

// // Error Message Component
// const ErrorMessage = ({ message }) => (
//   <div className="bg-red-50 border border-red-200 rounded-md p-4">
//     <p className="text-sm text-red-700">{message}</p>
//   </div>
// );

// const CartPage = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   // State for tab selection
//   const [activeCourtTab, setActiveCourtTab] = useState("supreme");

//   // State for all followed cases (Supreme Court)
//   const [allFollowedCases, setAllFollowedCases] = useState({});
//   const [isLoadingAll, setIsLoadingAll] = useState(true);
//   const [allError, setAllError] = useState(null);
//   const [hasFetchedAll, setHasFetchedAll] = useState(false);

//   // State for High Court followed cases
//   const [highCourtCases, setHighCourtCases] = useState({});
//   const [isLoadingHigh, setIsLoadingHigh] = useState(true);
//   const [highError, setHighError] = useState(null);
//   const [hasFetchedHigh, setHasFetchedHigh] = useState(false);

//   // State for District Court followed cases
//   const [districtCourtCases, setDistrictCourtCases] = useState({});
//   const [isLoadingDistrict, setIsLoadingDistrict] = useState(true);
//   const [districtError, setDistrictError] = useState(null);
//   const [hasFetchedDistrict, setHasFetchedDistrict] = useState(false);

//   // State for CAT followed cases
//   const [catCases, setCatCases] = useState({});
//   const [isLoadingCat, setIsLoadingCat] = useState(true);
//   const [catError, setCatError] = useState(null);
//   const [hasFetchedCat, setHasFetchedCat] = useState(false);

//   // State for NCLT followed cases
//   const [ncltCases, setNcltCases] = useState({});
//   const [isLoadingNclt, setIsLoadingNclt] = useState(true);
//   const [ncltError, setNcltError] = useState(null);
//   const [hasFetchedNclt, setHasFetchedNclt] = useState(false);

//   // State for Consumer Forum followed cases
//   const [consumerCases, setConsumerCases] = useState({});
//   const [isLoadingConsumer, setIsLoadingConsumer] = useState(true);
//   const [consumerError, setConsumerError] = useState(null);
//   const [hasFetchedConsumer, setHasFetchedConsumer] = useState(false);

//   // State for search and sorting
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortConfig, setSortConfig] = useState({
//     key: "followedAt",
//     direction: "desc",
//   });

//   // State for case details modal
//   const [showCaseDetails, setShowCaseDetails] = useState(false);
//   const [caseDetails, setCaseDetails] = useState(null);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);
//   const [detailsError, setDetailsError] = useState(null);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [loadingDetailId, setLoadingDetailId] = useState(null);

//   // State for followed cases (for the Follow button)
//   const [followedCases, setFollowedCases] = useState({});

//   // Initialize dummy data
//   const {
//     groupedSupremeCases,
//     groupedHighCourtCases,
//     groupedDistrictCourtCases,
//     groupedCatCases,
//     groupedNcltCases,
//     groupedConsumerCases,
//   } = preprocessDummyData();

//   // Set Supreme Court cases
//   useEffect(() => {
//     if (hasFetchedAll) return;

//     setIsLoadingAll(true);
//     setAllFollowedCases(groupedSupremeCases);
//     const followed = Object.keys(groupedSupremeCases).reduce((acc, caseId) => {
//       acc[groupedSupremeCases[caseId].cnr || caseId] = true;
//       return acc;
//     }, {});
//     setFollowedCases(followed);
//     setIsLoadingAll(false);
//     setHasFetchedAll(true);
//   }, [hasFetchedAll]);

//   // Set High Court cases
//   useEffect(() => {
//     if (hasFetchedHigh) return;

//     setIsLoadingHigh(true);
//     setHighCourtCases(groupedHighCourtCases);
//     setIsLoadingHigh(false);
//     setHasFetchedHigh(true);
//   }, [hasFetchedHigh]);

//   // Set District Court cases
//   useEffect(() => {
//     if (hasFetchedDistrict) return;

//     setIsLoadingDistrict(true);
//     setDistrictCourtCases(groupedDistrictCourtCases);
//     setIsLoadingDistrict(false);
//     setHasFetchedDistrict(true);
//   }, [hasFetchedDistrict]);

//   // Set CAT cases
//   useEffect(() => {
//     if (hasFetchedCat) return;

//     setIsLoadingCat(true);
//     setCatCases(groupedCatCases);
//     setIsLoadingCat(false);
//     setHasFetchedCat(true);
//   }, [hasFetchedCat]);

//   // Set NCLT cases
//   useEffect(() => {
//     if (hasFetchedNclt) return;

//     setIsLoadingNclt(true);
//     setNcltCases(groupedNcltCases);
//     setIsLoadingNclt(false);
//     setHasFetchedNclt(true);
//   }, [hasFetchedNclt]);

//   // Set Consumer Forum cases
//   useEffect(() => {
//     if (hasFetchedConsumer) return;

//     setIsLoadingConsumer(true);
//     setConsumerCases(groupedConsumerCases);
//     setIsLoadingConsumer(false);
//     setHasFetchedConsumer(true);
//   }, [hasFetchedConsumer]);

//   // Filter and sort cases based on active tab
//   const currentCases =
//     activeCourtTab === "supreme"
//       ? allFollowedCases
//       : activeCourtTab === "high"
//       ? highCourtCases
//       : activeCourtTab === "district"
//       ? districtCourtCases
//       : activeCourtTab === "cat"
//       ? catCases
//       : activeCourtTab === "nclt"
//       ? ncltCases
//       : consumerCases;

//   const filteredCases = Object.entries(currentCases).filter(
//     ([id, caseData]) => {
//       const searchIn =
//         activeCourtTab === "consumer"
//           ? Object.values(caseData.details || {})
//               .join(" ")
//               .toLowerCase()
//           : Object.values(caseData).join(" ").toLowerCase();
//       return searchIn.includes(searchQuery.toLowerCase());
//     }
//   );

//   const sortedCases = [...filteredCases].sort((a, b) => {
//     const aValue =
//       activeCourtTab === "consumer"
//         ? (a[1].details && a[1].details[sortConfig.key]) ||
//           a[1][sortConfig.key] ||
//           ""
//         : a[1][sortConfig.key] || "";
//     const bValue =
//       activeCourtTab === "consumer"
//         ? (b[1].details && b[1].details[sortConfig.key]) ||
//           b[1][sortConfig.key] ||
//           ""
//         : b[1][sortConfig.key] || "";
//     if (aValue === "") return sortConfig.direction === "asc" ? 1 : -1;
//     if (bValue === "") return sortConfig.direction === "asc" ? -1 : 1;
//     if (new Date(aValue) && new Date(bValue)) {
//       return sortConfig.direction === "asc"
//         ? new Date(aValue) - new Date(bValue)
//         : new Date(bValue) - new Date(aValue);
//     }
//     return sortConfig.direction === "asc"
//       ? aValue.localeCompare(bValue)
//       : bValue.localeCompare(bValue);
//   });

//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIndicator = (key) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === "asc" ? "↑" : "↓";
//     }
//     return "";
//   };

//   // Function to unfollow a case (mocked for dummy data)
//   const handleUnfollow = (caseId) => {
//     const updatedCases = { ...currentCases };
//     delete updatedCases[caseId];
//     if (activeCourtTab === "supreme") {
//       setAllFollowedCases(updatedCases);
//       setFollowedCases((prev) => {
//         const updated = { ...prev };
//         delete updated[currentCases[caseId].cnr];
//         return updated;
//       });
//     } else if (activeCourtTab === "high") {
//       setHighCourtCases(updatedCases);
//     } else if (activeCourtTab === "district") {
//       setDistrictCourtCases(updatedCases);
//     } else if (activeCourtTab === "cat") {
//       setCatCases(updatedCases);
//     } else if (activeCourtTab === "nclt") {
//       setNcltCases(updatedCases);
//     } else {
//       setConsumerCases(updatedCases);
//     }
//   };

//   // Function to unfollow all cases for the active tab (mocked for dummy data)
//   const handleUnfollowAll = () => {
//     if (
//       window.confirm(
//         `Are you sure you want to unfollow all ${
//           activeCourtTab === "supreme"
//             ? "Supreme Court"
//             : activeCourtTab === "high"
//             ? "High Court"
//             : activeCourtTab === "district"
//             ? "District Court"
//             : activeCourtTab === "cat"
//             ? "CAT"
//             : activeCourtTab === "nclt"
//             ? "NCLT"
//             : "Consumer Forum"
//         } cases?`
//       )
//     ) {
//       if (activeCourtTab === "supreme") {
//         setAllFollowedCases({});
//         setFollowedCases({});
//       } else if (activeCourtTab === "high") {
//         setHighCourtCases({});
//       } else if (activeCourtTab === "district") {
//         setDistrictCourtCases({});
//       } else if (activeCourtTab === "cat") {
//         setCatCases({});
//       } else if (activeCourtTab === "nclt") {
//         setNcltCases({});
//       } else {
//         setConsumerCases({});
//       }
//     }
//   };

//   // Function to fetch case details (mocked for dummy data)
//   const handleViewDetails = (caseData, index) => {
//     setIsLoadingDetails(true);
//     setLoadingDetailId(index);
//     setDetailsError(null);
//     setActiveTab("overview");
//     setCaseDetails(null);

//     // Simulate fetching details by using the existing case data
//     setTimeout(() => {
//       if (activeCourtTab === "consumer") {
//         setCaseDetails(caseData.details);
//       } else {
//         setCaseDetails(caseData); // Use the case data directly for other court types
//       }
//       setShowCaseDetails(true);
//       setIsLoadingDetails(false);
//       setLoadingDetailId(null);
//     }, 500); // Simulate network delay
//   };

//   // Function to handle follow/unfollow in the modal (mocked for dummy data)
//   const handleFollowCase = (caseData) => {
//     const cnr = caseData.diaryNumber || caseData.cnr;
//     if (followedCases[cnr]) {
//       handleUnfollow(caseData.caseId || cnr);
//     } else {
//       setFollowedCases((prev) => ({ ...prev, [cnr]: true }));
//       setAllFollowedCases((prev) => ({
//         ...prev,
//         [cnr]: {
//           caseId: cnr,
//           cnr,
//           title: caseData.title,
//           caseNumber: caseData.caseNumber,
//           status: caseData.status,
//         },
//       }));
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const closeDetailsPopup = () => setShowCaseDetails(false);

//   const goBack = () => navigate(-1);

//   // Define headers based on active tab
//   const supremeHeaders = [
//     "caseId",
//     "title",
//     "caseNumber",
//     "diaryNumber",
//     "petitioner",
//     "respondent",
//     "status",
//     "court",
//     "followedAt",
//   ];
//   const highHeaders = [
//     "caseId",
//     "cnr",
//     "title",
//     "caseNumber",
//     "petitioner",
//     "respondent",
//     "status",
//     "court",
//     "followedAt",
//   ];
//   const districtHeaders = [
//     "caseId",
//     "cnr",
//     "title",
//     "caseNumber",
//     "petitioner",
//     "respondent",
//     "status",
//     "court",
//     "followedAt",
//   ];
//   const catHeaders = [
//     "caseId",
//     "caseNumber",
//     "diaryNumber",
//     "court",
//     "followedAt",
//   ];
//   const ncltHeaders = [
//     "caseId",
//     "filingNumber",
//     "caseNumber",
//     "title",
//     "bench",
//     "courtNumber",
//     "filedOn",
//     "nextDate",
//     "status",
//     "court",
//     "followedAt",
//   ];
//   const consumerHeaders = [
//     "caseNumber",
//     "filing.number",
//     "commission",
//     "parties.complainant",
//     "parties.respondent",
//     "status.stage",
//     "status.nextHearing",
//     "court",
//     "followedAt",
//   ];

//   const headers =
//     activeCourtTab === "supreme"
//       ? supremeHeaders
//       : activeCourtTab === "high"
//       ? highHeaders
//       : activeCourtTab === "district"
//       ? districtHeaders
//       : activeCourtTab === "cat"
//       ? catHeaders
//       : activeCourtTab === "nclt"
//       ? ncltHeaders
//       : consumerHeaders;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
//         <div className="flex items-center gap-4">
//           <h1 className="text-2xl font-bold">Followed Cases</h1>
//           <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//             {Object.keys(currentCases).length}
//           </span>
//         </div>
//         {user?.role === "Owner" && (
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={handleUnfollowAll}
//               className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={Object.keys(currentCases).length === 0}
//             >
//               <Trash2 size={18} />
//               <span>Unfollow All</span>
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Search */}
//       {!(activeCourtTab === "supreme"
//         ? isLoadingAll
//         : activeCourtTab === "high"
//         ? isLoadingHigh
//         : activeCourtTab === "district"
//         ? isLoadingDistrict
//         : activeCourtTab === "cat"
//         ? isLoadingCat
//         : activeCourtTab === "nclt"
//         ? isLoadingNclt
//         : isLoadingConsumer) &&
//         Object.keys(currentCases).length > 0 && (
//           <div className="mb-6">
//             <div className="relative max-w-md">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder={`Search ${
//                   activeCourtTab === "supreme"
//                     ? "Supreme Court"
//                     : activeCourtTab === "high"
//                     ? "High Court"
//                     : activeCourtTab === "district"
//                     ? "District Court"
//                     : activeCourtTab === "cat"
//                     ? "CAT"
//                     : activeCourtTab === "nclt"
//                     ? "NCLT"
//                     : "Consumer Forum"
//                 } followed cases...`}
//                 className="w-full border border-gray-300 rounded-md pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
//               />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search size={18} className="text-gray-500" />
//               </div>
//             </div>
//           </div>
//         )}

//       {/* Tabs */}
//       <div className="mb-6 border-b">
//         <div className="flex overflow-x-auto">
//           <button
//             className={`px-4 py-2 font-medium text-sm ${
//               activeCourtTab === "supreme"
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setActiveCourtTab("supreme")}
//           >
//             Supreme Court
//           </button>
//           <button
//             className={`px-4 py-2 font-medium text-sm ${
//               activeCourtTab === "high"
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setActiveCourtTab("high")}
//           >
//             High Court
//           </button>
//           <button
//             className={`px-4 py-2 font-medium text-sm ${
//               activeCourtTab === "district"
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setActiveCourtTab("district")}
//           >
//             District Court
//           </button>
//           <button
//             className={`px-4 py-2 font-medium text-sm ${
//               activeCourtTab === "cat"
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setActiveCourtTab("cat")}
//           >
//             CAT
//           </button>
//           <button
//             className={`px-4 py-2 font-medium text-sm ${
//               activeCourtTab === "nclt"
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setActiveCourtTab("nclt")}
//           >
//             NCLT
//           </button>
//           <button
//             className={`px-4 py-2 font-medium text-sm ${
//               activeCourtTab === "consumer"
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setActiveCourtTab("consumer")}
//           >
//             Consumer Forum
//           </button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {(activeCourtTab === "supreme"
//         ? allError
//         : activeCourtTab === "high"
//         ? highError
//         : activeCourtTab === "district"
//         ? districtError
//         : activeCourtTab === "cat"
//         ? catError
//         : activeCourtTab === "nclt"
//         ? ncltError
//         : consumerError) && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
//           <p className="text-sm text-red-700">
//             {activeCourtTab === "supreme"
//               ? allError
//               : activeCourtTab === "high"
//               ? highError
//               : activeCourtTab === "district"
//               ? districtError
//               : activeCourtTab === "cat"
//               ? catError
//               : activeCourtTab === "nclt"
//               ? ncltError
//               : consumerError}
//           </p>
//         </div>
//       )}

//       {/* Loading State */}
//       {(activeCourtTab === "supreme"
//         ? isLoadingAll
//         : activeCourtTab === "high"
//         ? isLoadingHigh
//         : activeCourtTab === "district"
//         ? isLoadingDistrict
//         : activeCourtTab === "cat"
//         ? isLoadingCat
//         : activeCourtTab === "nclt"
//         ? isLoadingNclt
//         : isLoadingConsumer) && (
//         <div className="flex justify-center items-center py-20">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
//         </div>
//       )}

//       {/* Case List */}
//       {!(activeCourtTab === "supreme"
//         ? isLoadingAll
//         : activeCourtTab === "high"
//         ? isLoadingHigh
//         : activeCourtTab === "district"
//         ? isLoadingDistrict
//         : activeCourtTab === "cat"
//         ? isLoadingCat
//         : activeCourtTab === "nclt"
//         ? isLoadingNclt
//         : isLoadingConsumer) && Object.keys(currentCases).length === 0 ? (
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
//           <div className="flex flex-col items-center justify-center py-8">
//             <div className="bg-blue-100 p-4 rounded-full mb-4">
//               <X size={48} className="text-blue-600" />
//             </div>
//             <h2 className="text-xl font-semibold mb-2">
//               No Followed
//               {activeCourtTab === "supreme"
//                 ? "Supreme Court"
//                 : activeCourtTab === "high"
//                 ? "High Court"
//                 : activeCourtTab === "district"
//                 ? "District Court"
//                 : activeCourtTab === "cat"
//                 ? "CAT"
//                 : activeCourtTab === "nclt"
//                 ? "NCLT"
//                 : "Consumer Forum"}
//               Cases
//             </h2>
//             <p className="text-gray-600 mb-6 max-w-md">
//               You haven't followed any
//               {activeCourtTab === "supreme"
//                 ? "Supreme Court"
//                 : activeCourtTab === "high"
//                 ? "High Court"
//                 : activeCourtTab === "district"
//                 ? "District Court"
//                 : activeCourtTab === "cat"
//                 ? "CAT"
//                 : activeCourtTab === "nclt"
//                 ? "NCLT"
//                 : "Consumer Forum"}
//               cases yet.
//             </p>
//             <button
//               onClick={goBack}
//               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
//             >
//               <ArrowLeft size={18} />
//               <span>Back to Search</span>
//             </button>
//           </div>
//         </div>
//       ) : !(activeCourtTab === "supreme"
//           ? isLoadingAll
//           : activeCourtTab === "high"
//           ? isLoadingHigh
//           : activeCourtTab === "district"
//           ? isLoadingDistrict
//           : activeCourtTab === "cat"
//           ? isLoadingCat
//           : activeCourtTab === "nclt"
//           ? isLoadingNclt
//           : isLoadingConsumer) && sortedCases.length === 0 ? (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//           No
//           {activeCourtTab === "supreme"
//             ? "Supreme Court"
//             : activeCourtTab === "high"
//             ? "High Court"
//             : activeCourtTab === "district"
//             ? "District Court"
//             : activeCourtTab === "cat"
//             ? "CAT"
//             : activeCourtTab === "nclt"
//             ? "NCLT"
//             : "Consumer Forum"}
//           cases match your search criteria. Try a different search term.
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-300">
//               <thead>
//                 <tr className="bg-gray-100">
//                   {headers.map((header) => (
//                     <th
//                       key={header}
//                       onClick={() => requestSort(header.split(".")[0])}
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
//                     >
//                       <div className="flex items-center space-x-1">
//                         <span>{header.split(".").pop()}</span>
//                         <span>{getSortIndicator(header.split(".")[0])}</span>
//                       </div>
//                     </th>
//                   ))}
//                   {activeCourtTab !== "cat" && (
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   )}
//                   {user?.role === "Owner" && (
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                       Unfollow
//                     </th>
//                   )}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {sortedCases.map(([id, caseData], index) => (
//                   <tr key={id} className="hover:bg-blue-50 transition-colors">
//                     {headers.map((header) => {
//                       const keys = header.split(".");
//                       let value =
//                         activeCourtTab === "consumer"
//                           ? caseData.details
//                           : caseData;
//                       for (const key of keys) {
//                         value = value ? value[key] : null;
//                       }
//                       return (
//                         <td
//                           key={header}
//                           className="px-6 py-4 text-sm text-gray-700"
//                         >
//                           {header === "status" || header === "status.stage" ? (
//                             <StatusBadge
//                               status={
//                                 activeCourtTab === "consumer"
//                                   ? caseData.details?.status?.stage
//                                   : caseData.status
//                               }
//                             />
//                           ) : header === "followedAt" ||
//                             header === "filing.date" ||
//                             header === "status.nextHearing" ? (
//                             formatDate(value)
//                           ) : Array.isArray(value) ? (
//                             value.join(", ") || "N/A"
//                           ) : (
//                             value || "N/A"
//                           )}
//                         </td>
//                       );
//                     })}
//                     {activeCourtTab !== "cat" && (
//                       <td className="px-6 py-4 text-sm">
//                         <button
//                           onClick={() => handleViewDetails(caseData, index)}
//                           className="bg-blue-100 text-blue-700 w-24 hover:bg-blue-200 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
//                           disabled={loadingDetailId === index}
//                         >
//                           {loadingDetailId === index ? (
//                             <div className="flex items-center space-x-1">
//                               <span>Loading..</span>
//                               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
//                             </div>
//                           ) : (
//                             <>
//                               <span>Details</span>
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                                 className="w-4 h-4"
//                               >
//                                 <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             </>
//                           )}
//                         </button>
//                       </td>
//                     )}
//                     <td className="px-6 py-4 text-sm">
//                       {user?.role === "Owner" && (
//                         <button
//                           onClick={() => handleUnfollow(id)}
//                           className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
//                         >
//                           <span>Unfollow</span>
//                           <X size={12} />
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Case Details Modal */}
//       {showCaseDetails && activeCourtTab === "district" && (
//         <DistrictCaseDetailsModal
//           caseDetails={caseDetails}
//           isLoading={isLoadingDetails}
//           error={detailsError}
//           onClose={closeDetailsPopup}
//         />
//       )}
//       {showCaseDetails && activeCourtTab === "supreme" && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
//               <h3 className="text-lg font-semibold">Case Details</h3>
//               <button
//                 onClick={closeDetailsPopup}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Modal Content */}
//             <div className="p-4">
//               {isLoadingDetails ? (
//                 <div className="flex justify-center items-center py-20">
//                   <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
//                 </div>
//               ) : detailsError ? (
//                 <ErrorMessage message={detailsError} />
//               ) : caseDetails ? (
//                 <div>
//                   {/* Case Title Section */}
//                   <div className="mb-6">
//                     <div className="flex justify-between items-start">
//                       <h2 className="text-xl font-bold mb-2">
//                         {caseDetails.title || "N/A"}
//                       </h2>
//                       {/* Follow Button in Case Details */}
//                       <button
//                         className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm ${
//                           followedCases[caseDetails.cnr]
//                             ? "text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
//                             : "text-gray-700 bg-gray-100 hover:bg-gray-200"
//                         }`}
//                         onClick={() =>
//                           handleFollowCase({
//                             caseId: caseDetails.cnr,
//                             cnr: caseDetails.cnr,
//                             title: caseDetails.title,
//                             caseNumber: caseDetails.details?.caseNumber,
//                             status: caseDetails.status?.stage,
//                           })
//                         }
//                       >
//                         <Star
//                           size={16}
//                           className={
//                             followedCases[caseDetails.cnr]
//                               ? "text-yellow-600 fill-yellow-500"
//                               : ""
//                           }
//                         />
//                         <span>
//                           {followedCases[caseDetails.cnr]
//                             ? "Following"
//                             : "Follow"}
//                         </span>
//                       </button>
//                     </div>
//                     <div className="flex flex-wrap gap-2 items-center">
//                       <span className="text-gray-600 text-sm">
//                         CNR: {caseDetails.cnr || "N/A"}
//                       </span>
//                       <span className="text-gray-600 text-sm mx-2">|</span>
//                       <span className="text-gray-600 text-sm">
//                         Filed: {formatDate(caseDetails.details?.filedOn)}
//                       </span>
//                       <span className="text-gray-600 text-sm mx-2">|</span>
//                       <StatusBadge status={caseDetails.status?.stage} />
//                     </div>
//                   </div>

//                   {/* Tabs Navigation */}
//                   <div className="border-b mb-4">
//                     <div className="flex overflow-x-auto">
//                       {[
//                         "overview",
//                         "parties",
//                         "history",
//                         "orders",
//                         "defects",
//                       ].map((tab) => (
//                         <button
//                           key={tab}
//                           className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
//                             activeTab === tab
//                               ? "text-blue-600 border-b-2 border-blue-600"
//                               : "text-gray-500 hover:text-gray-700"
//                           }`}
//                           onClick={() => setActiveTab(tab)}
//                         >
//                           {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Tab Content */}
//                   <div className="mb-4">
//                     {/* Overview Tab */}
//                     {activeTab === "overview" && (
//                       <div className="space-y-6">
//                         {/* Case Information */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">
//                               Case Number
//                             </h3>
//                             <p className="text-sm">
//                               {caseDetails.details?.caseNumber || "N/A"}
//                             </p>
//                           </div>
//                           <div>
//                             <h3 className="text-sm font-medium text-gray-500 mb-1">
//                               Category
//                             </h3>
//                             <p className="text-sm">
//                               {caseDetails.details?.category || "N/A"}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Status Information */}
//                         <div>
//                           <h3 className="font-medium mb-2">
//                             Status Information
//                           </h3>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
//                             <div>
//                               <p className="text-sm text-gray-500">
//                                 Current Status
//                               </p>
//                               <p className="text-sm">
//                                 {caseDetails.status?.status || "N/A"}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">
//                                 Last Listed On
//                               </p>
//                               <p className="text-sm">
//                                 {formatDate(caseDetails.status?.lastListedOn)}
//                               </p>
//                             </div>
//                             {caseDetails.status?.nextDate && (
//                               <div>
//                                 <p className="text-sm text-gray-500">
//                                   Next Date
//                                 </p>
//                                 <p className="text-sm">
//                                   {formatDate(caseDetails.status?.nextDate)}
//                                 </p>
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Recent Hearing */}
//                         {caseDetails.history &&
//                           caseDetails.history.length > 0 && (
//                             <div>
//                               <h3 className="font-medium mb-2">
//                                 Recent Hearing
//                               </h3>
//                               <div className="bg-gray-50 p-4 rounded-md">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div>
//                                     <p className="text-sm text-gray-500">
//                                       Date
//                                     </p>
//                                     <p className="text-sm">
//                                       {formatDate(caseDetails.history[0].date)}
//                                     </p>
//                                   </div>
//                                   <div>
//                                     <p className="text-sm text-gray-500">
//                                       Type
//                                     </p>
//                                     <p className="text-sm">
//                                       {caseDetails.history[0].type || "N/A"}
//                                     </p>
//                                   </div>
//                                   <div>
//                                     <p className="text-sm text-gray-500">
//                                       Stage
//                                     </p>
//                                     <p className="text-sm">
//                                       {caseDetails.history[0].stage || "N/A"}
//                                     </p>
//                                   </div>
//                                   <div>
//                                     <p className="text-sm text-gray-500">
//                                       Purpose
//                                     </p>
//                                     <p className="text-sm">
//                                       {caseDetails.history[0].purpose || "N/A"}
//                                     </p>
//                                   </div>
//                                   <div className="col-span-2">
//                                     <p className="text-sm text-gray-500">
//                                       Bench
//                                     </p>
//                                     <p className="text-sm">
//                                       {caseDetails.history[0].judge || "N/A"}
//                                     </p>
//                                   </div>
//                                   <div className="col-span-2">
//                                     <p className="text-sm text-gray-500">
//                                       Remarks
//                                     </p>
//                                     <p className="text-sm font-medium">
//                                       {caseDetails.history[0].remarks || "N/A"}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                       </div>
//                     )}

//                     {/* Parties Tab */}
//                     {activeTab === "parties" && (
//                       <div className="space-y-6">
//                         {/* Petitioners */}
//                         <div>
//                           <h3 className="font-medium mb-2">Petitioners</h3>
//                           <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                             {caseDetails.parties?.petitioners?.map(
//                               (petitioner, index) => (
//                                 <li key={index} className="text-sm">
//                                   {petitioner || "N/A"}
//                                 </li>
//                               )
//                             ) || <li className="text-sm">N/A</li>}
//                           </ul>
//                         </div>

//                         {/* Respondents */}
//                         <div>
//                           <h3 className="font-medium mb-2">Respondents</h3>
//                           <ul className="bg-gray-50 p-4 rounded-md space-y-2">
//                             {caseDetails.parties?.respondents?.map(
//                               (respondent, index) => (
//                                 <li key={index} className="text-sm">
//                                   {respondent || "N/A"}
//                                 </li>
//                               )
//                             ) || <li className="text-sm">N/A</li>}
//                           </ul>
//                         </div>

//                         {/* Advocates */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div>
//                             <h3 className="font-medium mb-2">
//                               Petitioner Advocates
//                             </h3>
//                             <p className="bg-gray-50 p-4 rounded-md text-sm">
//                               {caseDetails.parties?.petitionerAdvocates ||
//                                 "N/A"}
//                             </p>
//                           </div>
//                           <div>
//                             <h3 className="font-medium mb-2">
//                               Respondent Advocates
//                             </h3>
//                             <p className="bg-gray-50 p-4 rounded-md text-sm">
//                               {caseDetails.parties?.respondentAdvocates ||
//                                 "N/A"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* History Tab */}
//                     {activeTab === "history" && (
//                       <div>
//                         <h3 className="font-medium mb-4">Case History</h3>
//                         <div className="overflow-x-auto">
//                           <table className="min-w-full border-collapse">
//                             <thead>
//                               <tr className="bg-gray-100">
//                                 <th className="border border-black p-2 text-left text-xs font-medium text-black">
//                                   Date
//                                 </th>
//                                 <th className="border border-black p-2 text-left text-xs font-medium text-black">
//                                   Type
//                                 </th>
//                                 <th className="border border-black p-2 text-left text-xs font-medium text-black">
//                                   Stage
//                                 </th>
//                                 <th className="border border-black p-2 text-left text-xs font-medium text-black">
//                                   Purpose
//                                 </th>
//                                 <th className="border border-black p-2 text-left text-xs font-medium text-black">
//                                   Judge
//                                 </th>
//                                 <th className="border border-black p-2 text-left text-xs font-medium text-black">
//                                   Remarks
//                                 </th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {caseDetails.history?.map((item, index) => (
//                                 <tr
//                                   key={index}
//                                   className="hover:bg-blue-100 even:bg-[#FEFCE8] odd:bg-white"
//                                 >
//                                   <td className="border border-black p-2 text-sm">
//                                     {formatDate(item.date)}
//                                   </td>
//                                   <td className="border border-black p-2 text-sm">
//                                     {item.type || "N/A"}
//                                   </td>
//                                   <td className="border border-black p-2 text-sm">
//                                     {item.stage || "N/A"}
//                                   </td>
//                                   <td className="border border-black p-2 text-sm">
//                                     {item.purpose || "N/A"}
//                                   </td>
//                                   <td className="border border-black p-2 text-sm">
//                                     {item.judge || "N/A"}
//                                   </td>
//                                   <td className="border border-black p-2 text-sm">
//                                     {item.remarks || "N/A"}
//                                   </td>
//                                 </tr>
//                               )) || (
//                                 <tr>
//                                   <td
//                                     colSpan={6}
//                                     className="border border-black p-2 text-sm text-center"
//                                   >
//                                     No history available
//                                   </td>
//                                 </tr>
//                               )}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     )}

//                     {/* Orders Tab */}
//                     {activeTab === "orders" && (
//                       <div>
//                         <h3 className="font-medium mb-4">Orders</h3>
//                         {caseDetails.orders && caseDetails.orders.length > 0 ? (
//                           <div className="space-y-3">
//                             {caseDetails.orders.map((order, index) => (
//                               <div
//                                 key={index}
//                                 className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
//                               >
//                                 <span className="text-sm font-medium">
//                                   {formatDate(order.date)}
//                                 </span>
//                                 <a
//                                   href={order.url}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
//                                 >
//                                   <span>View Order</span>
//                                   <ExternalLink size={14} />
//                                 </a>
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No orders available for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* Defects Tab */}
//                     {activeTab === "defects" && (
//                       <div>
//                         <h3 className="font-medium mb-4">Defects</h3>
//                         {caseDetails.defects &&
//                         caseDetails.defects.length > 0 ? (
//                           <div className="overflow-x-auto">
//                             <table className="min-w-full border-collapse">
//                               <thead>
//                                 <tr className="bg-gray-100">
//                                   <th className="border border-black p-2 text-left text-xs font-medium text-black">
//                                     S.No
//                                   </th>
//                                   <th className="border border-black p-2 text-left text-xs font-medium text-black">
//                                     Defect
//                                   </th>
//                                   <th className="border border-black p-2 text-left text-xs font-medium text-black">
//                                     Remarks
//                                   </th>
//                                   <th className="border border-black p-2 text-left text-xs font-medium text-black">
//                                     Notification Date
//                                   </th>
//                                   <th className="border border-black p-2 text-left text-xs font-medium text-black">
//                                     Removal Date
//                                   </th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {caseDetails.defects.map((defect, index) => (
//                                   <tr
//                                     key={index}
//                                     className="hover:bg-blue-100 even:bg-[#FEFCE8] odd:bg-white"
//                                   >
//                                     <td className="border border-black p-2 text-sm">
//                                       {defect.serialNumber || "N/A"}
//                                     </td>
//                                     <td className="border border-black p-2 text-sm">
//                                       {defect.default || "N/A"}
//                                     </td>
//                                     <td className="border border-black p-2 text-sm">
//                                       {defect.remarks || "N/A"}
//                                     </td>
//                                     <td className="border border-black p-2 text-sm">
//                                       {formatDate(defect.notificationDate)}
//                                     </td>
//                                     <td className="border border-black p-2 text-sm">
//                                       {formatDate(defect.removalDate)}
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         ) : (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
//                             No defects found for this case.
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : null}
//             </div>

//             {/* Modal Footer */}
//             <div className="border-t p-4 flex justify-end">
//               <button
//                 onClick={closeDetailsPopup}
//                 className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showCaseDetails && activeCourtTab === "high" && (
//         <HighCaseDetailsModal
//           caseDetails={caseDetails}
//           isLoadingDetails={isLoadingDetails}
//           detailsError={detailsError}
//           closeDetailsPopup={closeDetailsPopup}
//         />
//       )}
//       {showCaseDetails && activeCourtTab === "nclt" && (
//         <NcltCaseDetailsModal
//           caseDetails={caseDetails}
//           isLoading={isLoadingDetails}
//           error={detailsError}
//           onClose={closeDetailsPopup}
//         />
//       )}
//       {showCaseDetails && activeCourtTab === "consumer" && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             {/* Case Header */}
//             <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
//               <div>
//                 <h3 className="text-lg font-semibold">
//                   {caseDetails?.caseNumber || "N/A"}
//                 </h3>
//                 <p className="text-gray-600 text-sm mt-1">
//                   Commission: {caseDetails?.commission || "N/A"}
//                 </p>
//               </div>
//               <button
//                 onClick={closeDetailsPopup}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Case Details */}
//             {isLoadingDetails ? (
//               <div className="p-4 text-center">
//                 <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
//                 <p className="mt-2 text-gray-600">Loading details...</p>
//               </div>
//             ) : detailsError ? (
//               <div className="p-4">
//                 <ErrorMessage message={detailsError} />
//               </div>
//             ) : caseDetails ? (
//               <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Filing Information */}
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
//                     <FileText size={16} className="mr-2" />
//                     Filing Information
//                   </h4>
//                   <div className="space-y-2">
//                     <div className="flex">
//                       <span className="text-gray-500 w-32">Filing Number:</span>
//                       <span>{caseDetails.filing?.number || "N/A"}</span>
//                     </div>
//                     <div className="flex">
//                       <span className="text-gray-500 w-32">Filing Date:</span>
//                       <span>{formatDate(caseDetails.filing?.date)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Status Information */}
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
//                     <Flag size={16} className="mr-2" />
//                     Current Status
//                   </h4>
//                   <div className="space-y-2">
//                     <div className="flex">
//                       <span className="text-gray-500 w-32">Stage:</span>
//                       <span>{caseDetails.status?.stage || "N/A"}</span>
//                     </div>
//                     <div className="flex">
//                       <span className="text-gray-500 w-32">Purpose:</span>
//                       <span>{caseDetails.status?.purpose || "N/A"}</span>
//                     </div>
//                     <div className="flex">
//                       <span className="text-gray-500 w-32">Next Hearing:</span>
//                       <span>{formatDate(caseDetails.status?.nextHearing)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Parties Information */}
//                 <div className="md:col-span-2">
//                   <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
//                     <User size={16} className="mr-2" />
//                     Parties
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <h5 className="text-xs uppercase text-gray-500 mb-2">
//                         Complainant(s)
//                       </h5>
//                       {caseDetails.parties?.complainant?.length ? (
//                         <ul className="list-disc list-inside space-y-1">
//                           {caseDetails.parties.complainant.map(
//                             (complainant, index) => (
//                               <li key={index} className="text-gray-800">
//                                 {complainant}
//                               </li>
//                             )
//                           )}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-500 text-sm">
//                           No complainant information available
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <h5 className="text-xs uppercase text-gray-500 mb-2">
//                         Respondent(s)
//                       </h5>
//                       {caseDetails.parties?.respondent?.length ? (
//                         <ul className="list-disc list-inside space-y-1">
//                           {caseDetails.parties.respondent.map(
//                             (respondent, index) => (
//                               <li key={index} className="text-gray-800">
//                                 {respondent}
//                               </li>
//                             )
//                           )}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-500 text-sm">
//                           No respondent information available
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Case History */}
//                 {caseDetails.history && caseDetails.history.length > 0 && (
//                   <div className="md:col-span-2 mt-2">
//                     <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
//                       <Clock size={16} className="mr-2" />
//                       Case History
//                     </h4>
//                     <div className="space-y-4">
//                       {caseDetails.history.map((event, index) => (
//                         <div
//                           key={index}
//                           className="border border-gray-200 rounded-md p-3"
//                         >
//                           <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
//                             <div className="flex items-center">
//                               <span className="text-gray-700 font-medium">
//                                 {formatDate(event.date)}
//                               </span>
//                               {event.dailyOrder && (
//                                 <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
//                                   Daily Order
//                                 </span>
//                               )}
//                             </div>
//                             <div className="text-sm text-gray-500 mt-1 md:mt-0">
//                               Stage: {event.stage || "N/A"}
//                             </div>
//                           </div>
//                           {event.proceeding && (
//                             <div className="mt-2 bg-gray-50 p-3 rounded text-gray-700 text-sm whitespace-pre-line">
//                               {event.proceeding}
//                             </div>
//                           )}
//                           {event.nextDate && (
//                             <div className="mt-2 text-sm">
//                               <span className="text-gray-500">Next Date:</span>
//                               <span className="text-gray-700">
//                                 {formatDate(event.nextDate)}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Applications */}
//                 {caseDetails.applications &&
//                   caseDetails.applications.length > 0 && (
//                     <div className="md:col-span-2 mt-2">
//                       <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
//                         <Briefcase size={16} className="mr-2" />
//                         Applications
//                       </h4>
//                       <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                           <tr>
//                             <th
//                               scope="col"
//                               className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
//                             >
//                               Type
//                             </th>
//                             <th
//                               scope="col"
//                               className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
//                             >
//                               Filed On
//                             </th>
//                             <th
//                               scope="col"
//                               className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase"
//                             >
//                               Status
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                           {caseDetails.applications.map((app, index) => (
//                             <tr key={index}>
//                               <td className="px-3 py-2 text-sm text-gray-800">
//                                 {app.type || "N/A"}
//                               </td>
//                               <td className="px-3 py-2 text-sm text-gray-800">
//                                 {formatDate(app.filedOn)}
//                               </td>
//                               <td className="px-3 py-2 text-sm text-gray-800">
//                                 {app.status || "N/A"}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}

//                 {/* Lower Court Cases */}
//                 {caseDetails.lowerCourtCases &&
//                   caseDetails.lowerCourtCases.length > 0 && (
//                     <div className="md:col-span-2 mt-2">
//                       <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
//                         <Briefcase size={16} className="mr-2" />
//                         Lower Court Cases
//                       </h4>
//                       <div className="space-y-2">
//                         {caseDetails.lowerCourtCases.map((lowerCase, index) => (
//                           <div
//                             key={index}
//                             className="p-3 border border-gray-200 rounded-md"
//                           >
//                             <p className="font-medium">
//                               {lowerCase.caseNumber || "N/A"}
//                             </p>
//                             <p className="text-sm text-gray-600 mt-1">
//                               {lowerCase.court || "N/A"}
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//               </div>
//             ) : null}
//           </div>
//         </div>
//       )}
//       {showCaseDetails && activeCourtTab === "cat" && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
//             <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
//               <h3 className="text-lg font-semibold">CAT Case Details</h3>
//               <button
//                 onClick={closeDetailsPopup}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="p-4">
//               {isLoadingDetails ? (
//                 <div className="flex justify-center items-center py-20">
//                   <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
//                 </div>
//               ) : detailsError ? (
//                 <ErrorMessage message={detailsError} />
//               ) : caseDetails ? (
//                 <div>
//                   <h2 className="text-xl font-bold mb-2">
//                     {caseDetails.caseNumber || "N/A"}
//                   </h2>
//                   <div className="flex flex-wrap gap-2 items-center">
//                     <span className="text-gray-600 text-sm">
//                       Diary No: {caseDetails.diaryNumber || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//             <div className="border-t p-4 flex justify-end">
//               <button
//                 onClick={closeDetailsPopup}
//                 className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
