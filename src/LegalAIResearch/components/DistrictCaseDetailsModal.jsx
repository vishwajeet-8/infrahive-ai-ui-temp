import React, { useState } from "react";
import { X, ExternalLink } from "lucide-react";

// Status badge component
const StatusBadge = ({ status }) => {
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-800";

  if (status) {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("dispos")) {
      bgColor = "bg-green-100";
      textColor = "text-green-800";
    } else if (statusLower.includes("pending")) {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
    } else if (
      statusLower.includes("evidence") ||
      statusLower.includes("fresh")
    ) {
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
    }
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {status || "Unknown"}
    </span>
  );
};

const DistrictCaseDetailsModal = ({
  caseDetails,
  isLoading,
  error,
  onClose,
}) => {
  console.log(caseDetails);
  const [activeTab, setActiveTab] = useState("overview");

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString || dateString === "1970-01-01T00:00:00.000Z") return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Function to get available tabs based on data
  const getAvailableTabs = () => {
    if (!caseDetails) return ["overview"];

    const tabs = ["overview", "parties"];

    if (caseDetails.actsAndSections) tabs.push("acts");
    if (caseDetails.history && caseDetails.history.length > 0)
      tabs.push("history");
    if (caseDetails.orders && caseDetails.orders.length > 0)
      tabs.push("orders");
    if (caseDetails.transfer && caseDetails.transfer.length > 0)
      tabs.push("transfer");
    if (
      caseDetails.firstInformationReport &&
      Object.keys(caseDetails.firstInformationReport).length > 0
    )
      tabs.push("fir");

    return tabs;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold">Case Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
              {error}
            </div>
          ) : caseDetails ? (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">
                  {caseDetails.title || caseDetails.cnr}
                </h2>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-black text-sm font-medium">
                    CNR: {caseDetails.cnr}
                  </span>
                  <span className="text-black text-sm mx-2 font-medium">|</span>
                  <span className="text-black text-sm font-medium">
                    Filed: {formatDate(caseDetails.details?.filingDate)}
                  </span>
                  <span className="text-black text-sm mx-2 font-medium">|</span>
                  <StatusBadge
                    status={caseDetails.status?.caseStage || "PENDING"}
                  />
                </div>
              </div>

              <div className="border-b mb-4">
                <div className="flex overflow-x-auto">
                  {getAvailableTabs().map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === "fir"
                        ? "FIR"
                        : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          label: "Case Type",
                          value: caseDetails.details?.type || "N/A",
                        },
                        {
                          label: "Filing Number",
                          value: caseDetails.details?.filingNumber || "N/A",
                        },
                        {
                          label: "Filing Date",
                          value: formatDate(caseDetails.details?.filingDate),
                        },
                        {
                          label: "Registration Number",
                          value:
                            caseDetails.details?.registrationNumber || "N/A",
                        },
                        {
                          label: "Registration Date",
                          value: formatDate(
                            caseDetails.details?.registrationDate
                          ),
                        },
                      ].map((item, index) => (
                        <div key={index}>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            {item.label}
                          </h3>
                          <p className="text-sm">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Status Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                        {[
                          {
                            label: "Case Stage",
                            value: caseDetails.status?.caseStage || "N/A",
                          },
                          {
                            label: "First Hearing Date",
                            value: formatDate(
                              caseDetails.status?.firstHearingDate
                            ),
                          },
                          {
                            label: "Next Hearing Date",
                            value: formatDate(
                              caseDetails.status?.nextHearingDate
                            ),
                          },
                          {
                            label: "Decision Date",
                            value: formatDate(caseDetails.status?.decisionDate),
                          },
                          {
                            label: "Nature of Disposal",
                            value: caseDetails.status?.natureOfDisposal,
                          },
                          {
                            label: "Court and Judge",
                            value:
                              caseDetails.status?.courtNumberAndJudge || "N/A",
                          },
                        ].map(
                          (item, index) =>
                            item.value && (
                              <div key={index}>
                                <p className="text-sm text-gray-500">
                                  {item.label}
                                </p>
                                <p className="text-sm">{item.value}</p>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "parties" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Petitioners</h3>
                      <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                        {caseDetails.parties?.petitioners?.length > 0 ? (
                          caseDetails.parties.petitioners.map(
                            (petitioner, index) => (
                              <li key={index} className="text-sm">
                                {petitioner}
                              </li>
                            )
                          )
                        ) : (
                          <li className="text-sm text-gray-500">
                            No petitioner information available
                          </li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Respondents</h3>
                      <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                        {caseDetails.parties?.respondents?.length > 0 ? (
                          caseDetails.parties.respondents.map(
                            (respondent, index) => (
                              <li key={index} className="text-sm">
                                {respondent}
                              </li>
                            )
                          )
                        ) : (
                          <li className="text-sm text-gray-500">
                            No respondent information available
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">
                          Petitioner Advocates
                        </h3>
                        {caseDetails.parties?.petitionerAdvocates?.length >
                        0 ? (
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.parties.petitionerAdvocates.map(
                              (advocate, index) => (
                                <li key={index} className="text-sm">
                                  {advocate}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">
                            No advocate information available
                          </p>
                        )}
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">
                          Respondent Advocates
                        </h3>
                        {caseDetails.parties?.respondentAdvocates?.length >
                        0 ? (
                          <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                            {caseDetails.parties.respondentAdvocates.map(
                              (advocate, index) => (
                                <li key={index} className="text-sm">
                                  {advocate}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">
                            No advocate information available
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "acts" && (
                  <div>
                    <h3 className="font-medium mb-4">Acts and Sections</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      {caseDetails.actsAndSections ? (
                        <div className="space-y-3">
                          <div className="border-b pb-3">
                            <p className="text-sm text-gray-500">Acts</p>
                            <p className="text-sm font-medium">
                              {caseDetails.actsAndSections.acts || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Sections</p>
                            <p className="text-sm font-medium">
                              {caseDetails.actsAndSections.sections || "N/A"}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">
                          No acts and sections information available
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "history" && (
                  <div>
                    <h3 className="font-medium mb-4">Case History</h3>
                    {caseDetails.history?.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">
                                Business Date
                              </th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">
                                Next Date
                              </th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">
                                Purpose
                              </th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">
                                Judge
                              </th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {caseDetails.history.map((item, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2 text-sm">
                                  {formatDate(item.businessDate)}
                                </td>
                                <td className="border border-gray-300 p-2 text-sm">
                                  {formatDate(item.nextDate)}
                                </td>
                                <td className="border border-gray-300 p-2 text-sm">
                                  {item.purpose || "N/A"}
                                </td>
                                <td className="border border-gray-300 p-2 text-sm">
                                  {item.judge || "N/A"}
                                </td>
                                <td className="border border-gray-300 p-2 text-sm">
                                  {item.url ? (
                                    <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                      <span>View</span>
                                      <ExternalLink
                                        size={14}
                                        className="ml-1"
                                      />
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                        No history records available for this case.
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "orders" && (
                  <div>
                    <h3 className="font-medium mb-4">Orders</h3>
                    {caseDetails.orders?.length > 0 ? (
                      <div className="space-y-3">
                        {caseDetails.orders.map((order, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                          >
                            <div className="flex items-center space-x-4">
                              <span className="text-sm font-medium">
                                Order {order.number}
                              </span>
                              <span className="text-sm text-gray-600">
                                {order.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {formatDate(order.date)}
                              </span>
                            </div>
                            {order.url && (
                              <a
                                href={order.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                              >
                                <span>View Order</span>
                                <ExternalLink size={14} />
                              </a>
                            )}
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

                {activeTab === "transfer" && (
                  <div>
                    <h3 className="font-medium mb-4">Case Transfer History</h3>
                    {caseDetails.transfer?.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">
                                Date
                              </th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">
                                From
                              </th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">
                                To
                              </th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">
                                Reason
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {caseDetails.transfer.map((item, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2 text-sm">
                                  {formatDate(item.date)}
                                </td>
                                <td className="border border-gray-300 p-2 text-sm">
                                  {item.from || "N/A"}
                                </td>
                                <td className="border border-gray-300 p-2 text-sm">
                                  {item.to || "N/A"}
                                </td>
                                <td className="border border-gray-300 p-2 text-sm">
                                  {item.reason || "N/A"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                        No transfer records available for this case.
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "fir" && (
                  <div>
                    <h3 className="font-medium mb-4">
                      First Information Report
                    </h3>
                    {caseDetails.firstInformationReport &&
                    Object.keys(caseDetails.firstInformationReport).length >
                      0 ? (
                      <div className="bg-gray-50 p-4 rounded-md space-y-4">
                        {Object.entries(caseDetails.firstInformationReport).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="border-b pb-3 last:border-b-0 last:pb-0"
                            >
                              <p className="text-sm text-gray-500 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </p>
                              <p className="text-sm">{value || "N/A"}</p>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                        No FIR information available for this case.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-gray-600">No case details available.</p>
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

export default DistrictCaseDetailsModal;
