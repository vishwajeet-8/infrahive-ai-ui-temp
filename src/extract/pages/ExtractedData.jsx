// import api from "@/utils/api";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const ExtractedData = () => {
//   const { workspaceId, id } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchExtractedData = async () => {
//       try {
//         const res = await api.get(`/extracted-data-id/${id}`);
//         setData(res.data);
//       } catch (err) {
//         console.error("Error fetching extracted data:", err);
//         setError("Failed to fetch data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchExtractedData();
//     }
//   }, [id]);

//   if (loading) return <div className="p-6">Loading...</div>;
//   if (error) return <div className="p-6 text-red-600">{error}</div>;
//   if (!data) return <div className="p-6">No data found.</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//       <h1 className="text-xl font-semibold mb-4">Extracted Data</h1>

//       <div className="mb-4">
//         <strong>File Name:</strong> <span>{data.file_name}</span>
//       </div>

//       <div className="mb-4">
//         <strong>Created At:</strong>{" "}
//         <span>{new Date(data.created_at).toLocaleString()}</span>
//       </div>

//       <div className="mb-4">
//         <strong>Usage:</strong>
//         <pre className="bg-gray-100 p-2 mt-1 rounded text-sm text-gray-700">
//           {JSON.stringify(data.usage, null, 2)}
//         </pre>
//       </div>

//       <div className="mb-4">
//         <strong>Extracted Data:</strong>
//         <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
//           {JSON.stringify(data.extracted_data, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// };

// export default ExtractedData;

import api from "@/utils/api";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Download,
  FileText,
  Clock,
  Info,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Tag,
  MessageSquare,
} from "lucide-react";

const ExtractedData = () => {
  const { workspaceId, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("data");

  useEffect(() => {
    const fetchExtractedData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/extracted-data-id/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching extracted data:", err);
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExtractedData();
    }
  }, [id]);

  const handleCopy = (content) => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const downloadAsJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `extraction_${data.file_name.replace(
      /\.[^/.]+$/,
      ""
    )}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-medium">Error Loading Data</h3>
          </div>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-800 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-800">
            <Info className="w-5 h-5" />
            <h3 className="font-medium">No Data Found</h3>
          </div>
          <p className="mt-2 text-sm text-blue-700">
            The requested extraction data could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to extractions
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                {data.file_name}
              </h1>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Clock className="w-4 h-4 mr-1" />
                Extracted on {new Date(data.created_at).toLocaleString()}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={downloadAsJson}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
              >
                <Download className="w-4 h-4" />
                Download JSON
              </button>
              <button
                onClick={() => handleCopy(data)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
              >
                {copySuccess ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copySuccess ? "Copied!" : "Copy All"}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("data")}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === "data"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Extracted Data
            </button>
            <button
              onClick={() => setActiveTab("metadata")}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === "metadata"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Metadata
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "data" ? (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Extracted Fields
                </h3>
                {data.extracted_data ? (
                  <div className="space-y-4">
                    {Object.entries(data.extracted_data).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-100 pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">{key}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {value || (
                                <span className="text-gray-400">Empty</span>
                              )}
                            </p>
                          </div>
                          <button
                            onClick={() => handleCopy({ [key]: value })}
                            className="text-gray-400 hover:text-gray-600"
                            title="Copy value"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No data extracted</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Extraction Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Workspace
                      </p>
                      <p className="mt-1">{workspaceId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Extraction ID
                      </p>
                      <p className="mt-1">{id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Created At
                      </p>
                      <p className="mt-1">
                        {new Date(data.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        File Name
                      </p>
                      <p className="mt-1">{data.file_name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {data.tags && data.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    <Tag className="w-5 h-5 inline mr-1" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data.user_instructions && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    <MessageSquare className="w-5 h-5 inline mr-1" />
                    User Instructions
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap">
                      {data.user_instructions}
                    </p>
                  </div>
                </div>
              )}

              {data.usage && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Usage Statistics
                  </h3>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                    {JSON.stringify(data.usage, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtractedData;
