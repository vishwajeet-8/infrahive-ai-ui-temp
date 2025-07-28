
import React, { useState } from "react";
import {
  ChevronRight,
  MessageCircle,
  Loader2,
  X,
  FileText,
  Download,
  Database,
  Eye,
  Search,
  ChevronLeft,
} from "lucide-react";
import FloatingChatBot from "./FloatingChatBot";
import { DummyDataView } from "@/components/DummyDataView";
import dummyDocuments from "@/utils/dummyDocuments";

const ChatButton = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 min-w-[140px] justify-center ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg hover:scale-105 active:scale-95"
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <MessageCircle className="w-4 h-4" />
          <span>Chat with Doc</span>
        </>
      )}
    </button>
  );
};

const DataView = ({
  extractedData = [],
  onBack,
  onDocumentSelect,
  uploadedFiles = [],
  onChatOpen,
  onChatClose,
}) => {
  const [selectedDoc, setSelectedDoc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Format the data to match expected structure
  const formattedData = extractedData.map((item) => ({
    fileName: item.fileName,
    extractedData: item.extractedData || {},
    usage: item.usage,
  }));

  // Get all unique keys from extracted data
  const allKeys = [
    ...new Set(
      formattedData.flatMap((data) =>
        data.extractedData ? Object.keys(data.extractedData) : []
      )
    ),
  ];

  const formatValue = (value, key) => {
    if (!value) return "-";

    // Handle address fields differently
    const addressFields = [
      "address",
      "location",
      "premises",
      "property",
      "site",
    ];
    const isAddressField = addressFields.some((field) =>
      key.toLowerCase().includes(field)
    );

    if (Array.isArray(value)) {
      return value.join(", ");
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return isAddressField ? (
      <div
        className="max-h-[4.5em] overflow-hidden text-ellipsis"
        style={{
          WebkitLineClamp: 3,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
        }}
      >
        {String(value)}
      </div>
    ) : (
      String(value)
    );
  };

  const cleanFileName = (fileName) => {
    return fileName ? fileName.replace(/\.[^/.]+$/, "") : "";
  };

  const handleDocSelect = (value) => {
    setSelectedDoc(value);
    if (showChat) {
      handleChatClose();
    }
    if (onDocumentSelect) {
      onDocumentSelect(value);
    }
  };

  const handleChatClose = () => {
    setShowChat(false);
    onChatClose?.();
  };

  const chatWithDoc = async () => {
    if (!selectedDoc) {
      alert("Please select a document first");
      return;
    }

    const selectedFile = uploadedFiles.find(
      (file) => file.name === selectedDoc
    );
    if (!selectedFile) {
      alert("File not found in uploaded files");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("files", selectedFile);

      const response = await fetch(
        "https://legal-ai-backend-draft-drh9bmergvh7a4a9.southeastasia-01.azurewebsites.net/legal/process-document/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to process document");
      }

      const data = await response.json();
      if (data.status === "success") {
        handleChatClose();
        setTimeout(() => {
          setShowChat(true);
          onChatOpen?.();
        }, 100);
      }
    } catch (error) {
      console.error("Error processing document:", error);
      alert("Failed to process document. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = () => {
    try {
      if (!formattedData || formattedData.length === 0) {
        console.warn("No data to export");
        return;
      }

      const headers = ["Document Name", ...allKeys];
      const rows = [
        headers.join(","),
        ...formattedData.map(({ fileName, extractedData }) => {
          const rowData = [
            `"${cleanFileName(fileName)}"`,
            ...allKeys.map((key) => {
              const value = extractedData?.[key];
              return `"${value ? String(value).replace(/"/g, '""') : ""}"`;
            }),
          ];
          return rowData.join(",");
        }),
      ];

      const csvContent = "data:text/csv;charset=utf-8," + rows.join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "extracted_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  const exportDummyData = () => {
    if (!dummyDocuments || dummyDocuments.length === 0) return;

    const headers = [
      "Name",
      "Recognition",
      "Payment",
      "Pricing",
      "Renewal",
      "Termination",
    ];

    const rows = [
      headers.join(","),
      ...dummyDocuments.map((doc) =>
        [
          `"${doc.name}"`,
          `"${doc.recognition}"`,
          `"${doc.payment}"`,
          `"${doc.pricing}"`,
          `"${doc.renewal}"`,
          `"${doc.termination}"`,
        ].join(",")
      ),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dummy_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!Array.isArray(formattedData) || formattedData.length === 0) {
    return (
      <div className="space-y-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-yellow-900">Demo Mode</h3>
              <p className="text-yellow-700 text-sm">
                Showing sample extracted data for demonstration
              </p>
            </div>
          </div>
        </div>

        <DummyDataView />

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-sm font-medium"
          >
            <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Configuration
          </button>
          <button
            onClick={exportDummyData}
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-sm font-medium"
          >
            Export to CSV
            <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Modern Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Extracted Data
            </h2>
            <p className="text-gray-500">
              Review and interact with your processed documents
            </p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                className="pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-w-[250px] appearance-none"
                onChange={(e) => handleDocSelect(e.target.value)}
                value={selectedDoc}
              >
                <option value="">Select a document to analyze</option>
                {uploadedFiles.map((file, index) => (
                  <option
                    key={index}
                    value={file.name}
                    title={cleanFileName(file.name)}
                  >
                    {cleanFileName(file.name)}
                  </option>
                ))}
              </select>
            </div>

            {selectedDoc && (
              <div className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                Selected:{" "}
                <span className="font-medium text-gray-700">
                  {cleanFileName(selectedDoc)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <ChatButton
              onClick={chatWithDoc}
              isLoading={isLoading}
              disabled={!selectedDoc}
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Document Name</span>
                  </div>
                </th>
                {allKeys.map((key) => (
                  <th
                    key={key}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {key
                      .replace(/_/g, " ")
                      .replace(/([A-Z])/g, " $1")
                      .toLowerCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {formattedData.map(({ fileName, extractedData }, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-normal break-words text-sm font-medium text-gray-900">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="max-w-[200px] break-words">
                        {cleanFileName(fileName)}
                      </div>
                    </div>
                  </td>

                  {allKeys.map((key) => (
                    <td
                      key={`${index}-${key}`}
                      className="px-6 py-4 text-sm text-gray-700"
                    >
                      <div className="max-w-xs">
                        {formatValue(extractedData?.[key], key)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-sm font-medium"
        >
          <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
          Back to Configuration
        </button>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {formattedData.length} document
            {formattedData.length !== 1 ? "s" : ""} processed
          </div>
          <button
            onClick={exportData}
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 text-sm font-medium"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      <FloatingChatBot
        documentName={selectedDoc}
        onClose={handleChatClose}
        isOpen={showChat}
      />
    </div>
  );
};

export default DataView;
