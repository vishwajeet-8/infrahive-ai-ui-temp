import { contentContext } from "@/context/contentContext";
import React, { useState } from "react";
import { useContext } from "react";
import { businessServiceAgreement } from "@/utils/businessServiceAgreement";
import { variableContext } from "@/context/variableContext";
import { useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const DocumentForm = () => {
  const { fileContent, handleFileChange, setFileContent, fileName } =
    useContext(contentContext);
  const { focusedVariable } = useContext(variableContext);
  const [formValues, setFormValues] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const inputRefs = useRef({});

  // Focus the corresponding input field when focusedVariable changes
  useEffect(() => {
    if (focusedVariable && inputRefs.current[focusedVariable]) {
      inputRefs.current[focusedVariable].focus();
    }
  }, [focusedVariable]);

  const handleInputChange = (uniqueId, value) => {
    // Update form values
    const newFormValues = {
      ...formValues,
      [uniqueId]: value,
    };

    // Update form values state
    setFormValues(newFormValues);
  };

  const replaceVariablesInContent = (content, values) => {
    let newContent = content;
    // Iterate through all variables in the values object
    Object.entries(values).forEach(([key, value]) => {
      // Create a regex for each variable
      const regex = new RegExp(`{{${key}}}`, "g");
      // Replace the variable with its value, or keep the placeholder if empty
      newContent = newContent.replace(regex, value || `{{${key}}}`);
    });
    return newContent;
  };

  const fetchDocuments = [
    "Business Services Agreement",
    "Lease Deed Agreement",
    "Loan Agreement",
  ];

  const handleUpdate = () => {
    setFileContent((prev) => ({
      ...prev,
      content: replaceVariablesInContent(prev.content, formValues),
    }));
    setFormValues({});
  };

  return (
    <div className="min-h-screen max-w-md bg-white px-6 py-12 flex flex-col justify-between">
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Document Title</h2>
        </div>

        {/* document input  */}
        {/* <label
          htmlFor="fileInput"
          className="w-full mb-10 block border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
        >
          {fileName || `Select Document`}
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.doc,.docx"
          placeholder="Untitled Document"
          onChange={handleFileChange}
          className="hidden"
        /> */}

        <div className="w-full relative inline-block text-left">
          {/* Main Trigger Button */}
          <button
            className="w-full border rounded-lg p-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left pl-4 flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {fileName || "Select Document"}
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown Container */}
          {isOpen && (
            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                onMouseLeave={() => setIsOpen(false)}
              >
                {fetchDocuments.map((document, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setActiveSubmenu(index)}
                    // onMouseLeave={() => setIsOpen(false)}
                  >
                    {/* First Level Item */}
                    {/* <button
                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left"
                      role="menuitem"
                      onChange={handleFileChange}
                    >
                      {document}
                    </button> */}
                    <label
                      htmlFor="fileInput"
                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left"
                    >
                      {document}
                      <ChevronRight className="w-4 h-4" />
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      placeholder="Untitled Document"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-[26rem] mb-4 p-6 overflow-y-auto scrollbar-hidden m-auto ">
        {fileContent?.type === "file"
          ? businessServiceAgreement.variables.map((val) => {
              return (
                <div key={val.unique_id}>
                  <div>
                    <p className="text-lg">{val.unique_id}</p>
                    <p className="font-normal text-sm">{val.label}</p>
                  </div>
                  <input
                    type={val.type}
                    className="w-full mb-10 block border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ref={(el) => (inputRefs.current[val.unique_id] = el)}
                    value={formValues[val.unique_id] || ""}
                    onChange={(e) =>
                      handleInputChange(val.unique_id, e.target.value)
                    }
                  />
                </div>
              );
            })
          : ""}
      </div>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={handleUpdate}
      >
        Continue
      </button>
    </div>
  );
};

export default DocumentForm;
