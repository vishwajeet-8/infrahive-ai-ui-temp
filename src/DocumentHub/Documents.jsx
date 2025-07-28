import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "@/utils/api";
import { Trash2 } from "lucide-react";

const Icons = {
  Folder: () => <span style={{ fontSize: "24px" }}>📁</span>,
  FileText: () => <span style={{ fontSize: "24px" }}>📄</span>,
  Home: () => <span style={{ fontSize: "16px" }}>🏠</span>,
  ChevronRight: () => <span style={{ fontSize: "16px" }}>▶</span>,
  Search: () => <span style={{ fontSize: "16px" }}>🔍</span>,
  Upload: () => <span style={{ fontSize: "48px" }}>⬆️</span>,
  X: () => <span style={{ fontSize: "20px" }}>✕</span>,
  Plus: () => <span style={{ fontSize: "16px" }}>➕</span>,
};

const Documents = () => {
  const { workspaceId } = useParams();
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadArea, setShowUploadArea] = useState(false);

  // Fetch files from server
  const fetchFiles = async () => {
    try {
      const response = await api.get(`/list-documents/${workspaceId}`);
      setFiles(response.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [workspaceId]);

  const handleFileUpload = async (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("files", file); // "files" matches multer.array("files")
    }
    formData.append("workspaceId", workspaceId);

    const token = localStorage.getItem("token");
    setIsUploading(true);

    try {
      await api.post("/upload-documents", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchFiles(); // ✅ Refetch all files after upload
      setShowUploadArea(false);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/delete-document/${item.id}`);

      await fetchFiles(); // Refresh file list after deletion
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete file.");
    }
  };

  const handleFileInputChange = (e) => {
    handleFileUpload(e.target.files);
    e.target.value = ""; // reset input
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const getFileIcon = (item) =>
    item.type === "folder" ? <Icons.Folder /> : <Icons.FileText />;

  const filteredItems = files.filter((item) =>
    (item.filename || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-5 h-screen mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-1 text-sm">
            <Icons.Home style={{ cursor: "pointer" }} />
            <Icons.ChevronRight />
            <span className="text-gray-700">My Files</span>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setShowUploadArea(!showUploadArea)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Icons.Plus />
            <span>Upload Files</span>
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icons.Search />
          </div>
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Upload Area */}
        {showUploadArea && (
          <div className="mt-4">
            <div className="relative">
              <button
                onClick={() => setShowUploadArea(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
              >
                <Icons.X />
              </button>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragOver
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-50"
                } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
              >
                <Icons.Upload />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {isUploading ? "Uploading..." : "Upload Files"}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isUploading ? "Uploading..." : "Choose Files"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileInputChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 overflow-auto">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <span style={{ fontSize: "64px" }}>📁</span>
            <p>No files found</p>
            {!showUploadArea && (
              <button
                onClick={() => setShowUploadArea(true)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Upload Your First File
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group"
              >
                {getFileIcon(item)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.filename}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                      className="text-red-500 hover:text-red-700 ml-2"
                      title="Delete"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
        <p className="text-sm text-gray-500">
          {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default Documents;
