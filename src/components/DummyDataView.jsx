// dummy data for frontend demo

import { useState } from "react";
import { X, FileText, MoreHorizontal } from "lucide-react";
import dummyDocuments from "@/utils/dummyDocuments";

export const DummyDataView = () => {
  const [documents, setDocuments] = useState(dummyDocuments);

  const removeDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium text-gray-900">
              Extract the financial terms from these customer agreements
            </h1>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                {documents.length} documents
              </span>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div className="col-span-3">Document</div>
            <div className="col-span-2">Recognition</div>
            <div className="col-span-2">Payment</div>
            <div className="col-span-2">Pricing</div>
            <div className="col-span-1">Renewal</div>
            <div className="col-span-2">Termination</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {documents.map((doc, index) => (
              <div
                key={doc.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
              >
                {/* Document Column */}
                <div className="col-span-3 flex items-center space-x-3">
                  <span className="text-sm text-gray-500 font-medium w-4">
                    {index + 1}
                  </span>
                  <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-900 truncate flex-1">
                    {doc.name}
                  </span>
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Recognition Column */}
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-700">
                    {doc.recognition}
                  </span>
                </div>

                {/* Payment Column */}
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-700">{doc.payment}</span>
                </div>

                {/* Pricing Column */}
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-700">{doc.pricing}</span>
                </div>

                {/* Renewal Column */}
                <div className="col-span-1 flex items-center">
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      doc.renewal
                        ? "text-gray-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {doc.renewal ? "True" : "False"}
                  </span>
                </div>

                {/* Termination Column */}
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-700">
                    {doc.termination}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Responsive View */}
        <div className="lg:hidden bg-white">
          {documents.map((doc, index) => (
            <div key={doc.id} className="border-b border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 font-medium">
                    {index + 1}
                  </span>
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {doc.name}
                  </span>
                </div>
                <button
                  onClick={() => removeDocument(doc.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Recognition:</span>
                  <div className="text-gray-900">{doc.recognition}</div>
                </div>
                <div>
                  <span className="text-gray-500">Payment:</span>
                  <div className="text-gray-900">{doc.payment}</div>
                </div>
                <div>
                  <span className="text-gray-500">Pricing:</span>
                  <div className="text-gray-900">{doc.pricing}</div>
                </div>
                <div>
                  <span className="text-gray-500">Renewal:</span>
                  <div
                    className={doc.renewal ? "text-gray-900" : "text-gray-500"}
                  >
                    {doc.renewal ? "True" : "False"}
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Termination:</span>
                  <div className="text-gray-900">{doc.termination}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {documents.length === 0 && (
          <div className="bg-white text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No documents remaining
            </h3>
            <p className="text-gray-500">
              All customer agreements have been removed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
