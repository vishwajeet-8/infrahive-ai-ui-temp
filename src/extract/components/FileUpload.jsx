import React, { useState } from "react";
import { Upload, X, FileText, ChevronRight, Plus, Folder } from "lucide-react";
import { useParams } from "react-router-dom";
import api from "@/utils/api";

const FileUpload = ({ files, setFiles, onNext }) => {
  const { workspaceId } = useParams();
  const [isDragging, setIsDragging] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFilesAdded(droppedFiles);
  };

  // File Upload Handlers
  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    handleFilesAdded(newFiles);
  };



  const handleFilesAdded = async (selectedFiles) => {
    const newFilesWithUrls = selectedFiles.map((file) => ({
      file,
      pdf: null,
    }));

    setFiles((prev) => [...prev, ...newFilesWithUrls]);
  };

  const fetchDocumentFiles = async () => {
    try {
      const response = await api.get(`/list-documents/${workspaceId}`);
      setDocumentFiles(response.data);
    } catch (err) {
      console.error("Error fetching document files:", err);
    }
  };

  const openDocumentModal = async () => {
    await fetchDocumentFiles();
    setShowDocumentModal(true);
  };

  const importDocuments = async () => {
    if (selectedDocuments.length === 0) return;
    const token = localStorage.getItem("token");

    try {
      const documentsToImport = documentFiles.filter((doc) =>
        selectedDocuments.includes(doc.id)
      );

      const importedFiles = await Promise.all(
        documentsToImport.map(async (doc) => {
          console.log(doc);
          const response = await api.get(
            `/get-signed-url?key=${encodeURIComponent(doc.s3_key_original)}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const signedUrl = response.data.url;

          const fileResponse = await fetch(signedUrl);
          const blob = await fileResponse.blob();

          const file = new File([blob], doc.filename, {
            type: blob.type || "application/octet-stream",
          });

          return file;
        })
      );

      await handleFilesAdded(importedFiles);
      setShowDocumentModal(false);
      setSelectedDocuments([]);
    } catch (error) {
      console.error("Error importing documents:", error);
    }
  };

  // File Management
  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header and description */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Upload Your Documents
        </h2>
        <p className="text-gray-500">
          Select or drag and drop your files to get started
        </p>
      </div>

      {/* Upload and Import buttons */}
      <div className="flex space-x-4">
        {/* Drag and Drop Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 flex-1 ${
            isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".pdf,.doc,.docx,.txt,.xlsx,.xls"
          />
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                isDragging ? "bg-blue-100" : "bg-white"
              }`}
            >
              <Upload
                className={`w-8 h-8 ${
                  isDragging ? "text-blue-500" : "text-gray-400"
                }`}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">
                {isDragging
                  ? "Drop your files here"
                  : "Choose files or drag & drop"}
              </h3>
              <p className="text-sm text-gray-500">
                Supports PDF, DOC, DOCX, TXT, XLS, XLSX up to 10MB each
              </p>
            </div>
            <button
              type="button"
              className="mt-6 inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Browse Files
            </button>
          </div>
        </div>

        {/* Import from Documents Button */}
        <button
          onClick={openDocumentModal}
          className="flex items-center justify-center px-6 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-50 flex-1"
        >
          <Folder className="w-5 h-5 mr-2" />
          Import from Documents
        </button>
      </div>

      {/* Selected Files List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-900">
            Selected Files ({files.length})
          </h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="group flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Select Files from Documents
              </h3>
              <button
                onClick={() => {
                  setShowDocumentModal(false);
                  setSelectedDocuments([]);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {documentFiles.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${
                    selectedDocuments.includes(file.id)
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setSelectedDocuments((prev) =>
                      prev.includes(file.id)
                        ? prev.filter((id) => id !== file.id)
                        : [...prev, file.id]
                    );
                  }}
                >
                  <FileText className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="flex-1 text-sm font-medium text-gray-900">
                    {file.filename}
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(file.id)}
                    onChange={() => {}}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDocumentModal(false);
                  setSelectedDocuments([]);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={importDocuments}
                disabled={selectedDocuments.length === 0}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedDocuments.length === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Import Selected ({selectedDocuments.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-gray-500">
          {files.length > 0 && (
            <span>
              {files.length} file{files.length !== 1 ? "s" : ""} selected
            </span>
          )}
        </div>
        <button
          onClick={onNext}
          disabled={files.length === 0}
          className={`inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium ${
            files.length === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:scale-105 active:scale-95"
          }`}
        >
          Continue
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
