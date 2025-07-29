import { useRef, useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  File as FileIcon,
} from "lucide-react";

export const AIFloatingWindow = ({ isOpen, onClose, onInsert }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Common prompts for quick selection
  const quickPrompts = [
    "Draft an NDA",
    "Create a project proposal",
    "Write a meeting agenda",
    "Generate a product requirements document",
    "Create a marketing brief",
    "Write a press release",
    "Draft a job description",
    "Create a project timeline",
    "Write a user story",
    "Generate a business plan outline",
  ];

  const handleFileSelection = (id) => {
    setSelectedFiles((prev) => {
      if (prev.includes(id)) {
        return prev.filter((fileId) => fileId !== id);
      } else if (prev.length < 2) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []).slice(
      0,
      2 - uploadedFiles.length
    );
    const newFiles = files.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      file: file,
      mimeType: file.type,
    }));

    setUploadedFiles((prev) => {
      const updatedFiles = [...prev, ...newFiles].slice(0, 2);
      return updatedFiles;
    });
    setSelectedFiles((prev) => {
      const updatedSelection = [
        ...prev,
        ...newFiles.map((file) => file.id),
      ].slice(0, 2);
      return updatedSelection;
    });
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    setSelectedFiles((prev) => prev.filter((fileId) => fileId !== id));
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError("");
    setGeneratedContent("");

    try {
      // Step 1: Upload files to backend for conversion and Gemini URI
      const filesToUpload = selectedFiles
        .map((id) => uploadedFiles.find((f) => f.id === id)?.file)
        .filter(Boolean);

      let geminiUris = [];
      if (filesToUpload.length > 0) {
        const formData = new FormData();
        filesToUpload.forEach((file, index) => {
          formData.append("files", file);
        });

        const uploadResponse = await fetch(
          `${import.meta.env.VITE_NODE_SERVER}/gemini-uri`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          console.error("Upload error response:", errorData);
          throw new Error(errorData.message || "Failed to process files");
        }

        const uploadData = await uploadResponse.json();
        geminiUris = uploadData.files.map(
          (file) =>
            `https://generativelanguage.googleapis.com/v1beta/${file.uri}`
        );
      }

      // Step 2: Call /draft endpoint with JSON payload
      const draftPayload = {
        user_prompt: prompt,
        files: geminiUris,
      };

      const draftResponse = await fetch(
        `${import.meta.env.VITE_PY_LEGAL_API}/draft`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(draftPayload),
        }
      );

      if (!draftResponse.ok) {
        const errorData = await draftResponse.json();
        console.error("Draft error response:", errorData);
        throw new Error(
          errorData.error?.message || "Failed to generate content"
        );
      }

      const reader = draftResponse.body.getReader();
      const decoder = new TextDecoder();
      let contentMap = new Map();
      let buffer = ""; // Buffer to handle incomplete JSON

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        buffer += chunk;

        const lines = buffer.split("\n");
        buffer = lines.pop(); // Keep last (potentially incomplete) line in buffer

        for (const line of lines) {
          if (line.trim()) {
            try {
              const parsed = JSON.parse(line);

              if (parsed.sequence !== undefined && parsed.content) {
                contentMap.set(parsed.sequence, parsed.content);
                const sortedContent = Array.from(contentMap.entries())
                  .sort(([seqA], [seqB]) => seqA - seqB)
                  .map(([, content]) => content)
                  .join("\n\n");
                setGeneratedContent(sortedContent);
              } else if (parsed.error) {
                throw new Error(
                  parsed.error.message || "Server error in stream"
                );
              }
            } catch (e) {
              console.error("Error parsing JSON chunk:", e, "Raw line:", line);
            }
          }
        }
      }

      // Try parsing any remaining buffered data
      if (buffer.trim()) {
        try {
          const parsed = JSON.parse(buffer);

          if (parsed.sequence !== undefined && parsed.content) {
            contentMap.set(parsed.sequence, parsed.content);
            const sortedContent = Array.from(contentMap.entries())
              .sort(([seqA], [seqB]) => seqA - seqB)
              .map(([, content]) => content)
              .join("\n\n");
            setGeneratedContent(sortedContent);
          }
        } catch (e) {
          console.error(
            "Error parsing final buffer:",
            e,
            "Raw buffer:",
            buffer
          );
        }
      }

      if (contentMap.size === 0) {
        throw new Error("No valid content received from the server");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInsert = () => {
    if (generatedContent.trim()) {
      onInsert(generatedContent);
      handleClose();
    }
  };

  const handleClose = () => {
    setPrompt("");
    setGeneratedContent("");
    setError("");
    setSelectedFiles([]);
    setUploadedFiles([]);
    setIsGenerating(false);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000]">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-300 w-[640px] max-h-[550px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
              <Sparkles size={14} className="text-blue-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Ask AI</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close AI Assistant"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content - Two Column Layout */}
        <div className="grid grid-cols-2 h-[450px]">
          {/* Left Column - Input */}
          <div className="p-4 space-y-4 overflow-y-auto">
            {/* File Upload */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Upload Files (up to 2)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  disabled={uploadedFiles.length >= 2}
                  className="hidden"
                  aria-label="Upload files"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadedFiles.length >= 2}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FileIcon size={12} />
                  Choose Files
                </button>
                <span className="text-xs text-gray-500">
                  {uploadedFiles.length}/2 file(s) selected
                </span>
              </div>
            </div>

            {/* File Selection */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Select Files (up to 2)
              </label>
              <div className="bg-gray-50 p-2 rounded-lg max-h-20 overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 py-1 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      value={file.id}
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleFileSelection(file.id)}
                      disabled={
                        !selectedFiles.includes(file.id) &&
                        selectedFiles.length >= 2
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      aria-checked={selectedFiles.includes(file.id)}
                      aria-label={`Select ${file.name}`}
                    />
                    <span className="truncate flex-1">{file.name}</span>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                {uploadedFiles.length === 0 && (
                  <p className="text-xs text-gray-500">No files uploaded</p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Select up to 2 uploaded files
              </p>
            </div>

            {/* Prompt Input */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                What would you like me to write?
              </label>
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="E.g., Draft an NDA for a software company..."
                className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-16 text-xs"
                aria-label="Enter your prompt"
              />
              <p className="text-xs text-gray-500 mt-1">
                Press Cmd/Ctrl + Enter to generate
              </p>
            </div>

            {/* Quick Prompts */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Quick Prompts
              </label>
              <div className="bg-gray-100 p-2 rounded-lg space-y-1 max-h-20 overflow-y-auto">
                {quickPrompts.slice(0, 4).map((quickPrompt, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(quickPrompt)}
                    className="w-full text-left px-2 py-1 text-xs text-gray-700 hover:bg-gray-200 rounded transition-colors"
                  >
                    {quickPrompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-4">
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-medium"
                aria-label="Generate content"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send size={12} />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Generated Content */}
          <div className="p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-gray-700">
                Generated Content
              </label>
              {generatedContent && !isGenerating && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle size={10} />
                  <span className="text-xs">Ready</span>
                </div>
              )}
            </div>

            {/* Content Display */}
            <div className="flex-1 overflow-y-auto h-[calc(100%-2rem)] border border-gray-300 bg-gray-50 rounded-lg p-3">
              {error ? (
                <div className="flex items-start gap-2 text-red-600">
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium">Error</p>
                    <p className="text-xs text-red-500">{error}</p>
                  </div>
                </div>
              ) : generatedContent ? (
                <div className="whitespace-pre-wrap text-xs text-gray-800 leading-relaxed overflow-y-auto h-[360px]">
                  {generatedContent}
                  {isGenerating && (
                    <span className="inline-block w-1 h-3 bg-blue-600 animate-pulse ml-1"></span>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    <Sparkles size={16} className="text-gray-400" />
                  </div>
                  <p className="text-xs">Generated content will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="text-xs text-gray-500">AI-generated content</div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              aria-label="Cancel"
            >
              Cancel
            </button>
            <button
              onClick={handleInsert}
              disabled={!generatedContent.trim() || isGenerating}
              className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Insert content"
            >
              Insert Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
