// import React from 'react';

// const NcltCaseDetailsModal = ({ caseDetails, isLoading, error, onClose }) => {
//   // Format date string to more readable format
//   const formatDate = (dateString) => {
//     if (!dateString || dateString.includes('1970-01-01')) return 'Not Available';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   return (
//     <>
//       {/* Modal Backdrop */}
//       <div 
//         className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex justify-center items-center"
//         onClick={onClose}
//       >
//         {/* Modal Content */}
//         <div 
//           className="bg-white rounded-lg shadow-xl w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto z-50"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Modal Header */}
//           <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
//             <h2 className="text-lg font-semibold text-gray-800">
//               NCLT Case Details
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 focus:outline-none"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {/* Modal Body */}
//           <div className="px-6 py-4">
//             {isLoading && (
//               <div className="text-center py-12">
//                 <svg className="animate-spin h-8 w-8 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <p className="mt-2 text-gray-600">Loading case details...</p>
//               </div>
//             )}

//             {error && (
//               <div className="p-4 bg-red-50 border border-red-200 rounded-md">
//                 <p className="text-sm text-red-600">{error}</p>
//               </div>
//             )}

//             {!isLoading && !error && caseDetails && (
//               <div className="space-y-6">
//                 {/* Filing Details */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-1">Filing Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-xs text-gray-500">Filing Number</p>
//                       <p className="text-sm font-medium">{caseDetails.filing?.number || 'N/A'}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Case Type</p>
//                       <p className="text-sm">{caseDetails.filing?.caseType || 'N/A'}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Bench</p>
//                       <p className="text-sm">{caseDetails.filing?.bench || 'N/A'}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Filing Date</p>
//                       <p className="text-sm">{formatDate(caseDetails.filing?.date)}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Registration Details */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-1">Registration Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-xs text-gray-500">Registration Number</p>
//                       <p className="text-sm font-medium">{caseDetails.registration?.number || 'N/A'}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Registration Date</p>
//                       <p className="text-sm">{formatDate(caseDetails.registration?.date)}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Filing Method</p>
//                       <p className="text-sm">{caseDetails.registration?.method || 'N/A'}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Status Information */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-1">Status Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-xs text-gray-500">Defects Issued On</p>
//                       <p className="text-sm">{formatDate(caseDetails.status?.defectsIssuedOn)}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Refiled On</p>
//                       <p className="text-sm">{formatDate(caseDetails.status?.refiledOn)}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Next Date</p>
//                       <p className="text-sm font-medium">{formatDate(caseDetails.status?.nextDate)}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Defect Free</p>
//                       <p className="text-sm">
//                         {caseDetails.status?.defectFree ? (
//                           <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Yes</span>
//                         ) : (
//                           <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">No</span>
//                         )}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Stage</p>
//                       <p className="text-sm">
//                         <span className={`px-2 py-1 text-xs rounded-full ${
//                           caseDetails.status?.stage === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                           caseDetails.status?.stage === 'Disposed' ? 'bg-green-100 text-green-800' : 
//                           'bg-gray-100 text-gray-800'
//                         }`}>
//                           {caseDetails.status?.stage || 'N/A'}
//                         </span>
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Court Number</p>
//                       <p className="text-sm">{caseDetails.status?.courtNumber || 'N/A'}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Parties */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-1">Parties Information</h3>
                  
//                   {/* Petitioners */}
//                   <div className="mb-4">
//                     <h4 className="text-xs font-medium text-gray-600 mb-2">Petitioners:</h4>
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full divide-y divide-gray-200 text-xs">
//                         <thead className="bg-gray-100">
//                           <tr>
//                             <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                             <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advocate</th>
//                             <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                             <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                           </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                           {caseDetails.parties?.petitioners && caseDetails.parties.petitioners.length > 0 ? (
//                             caseDetails.parties.petitioners.map((petitioner, index) => (
//                               <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                 <td className="px-3 py-2 whitespace-nowrap">{petitioner.name || 'N/A'}</td>
//                                 <td className="px-3 py-2 whitespace-nowrap">{petitioner.advocate === 'NA' ? 'N/A' : petitioner.advocate || 'N/A'}</td>
//                                 <td className="px-3 py-2 whitespace-nowrap">{petitioner.email || 'N/A'}</td>
//                                 <td className="px-3 py-2 whitespace-nowrap">{petitioner.phone || 'N/A'}</td>
//                               </tr>
//                             ))
//                           ) : (
//                             <tr>
//                               <td colSpan="4" className="px-3 py-2 text-center text-gray-500">No petitioners found</td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>

//                   {/* Respondents */}
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-600 mb-2">Respondents:</h4>
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full divide-y divide-gray-200 text-xs">
//                         <thead className="bg-gray-100">
//                           <tr>
//                             <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                             <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advocate</th>
//                             <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                             <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                           </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                           {caseDetails.parties?.respondents && caseDetails.parties.respondents.length > 0 ? (
//                             caseDetails.parties.respondents.map((respondent, index) => (
//                               <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                 <td className="px-3 py-2 whitespace-nowrap">{respondent.name || 'N/A'}</td>
//                                 <td className="px-3 py-2 whitespace-nowrap">{respondent.advocate === 'NA' ? 'N/A' : respondent.advocate || 'N/A'}</td>
//                                 <td className="px-3 py-2 whitespace-nowrap">{respondent.email || 'N/A'}</td>
//                                 <td className="px-3 py-2 whitespace-nowrap">{respondent.phone || 'N/A'}</td>
//                               </tr>
//                             ))
//                           ) : (
//                             <tr>
//                               <td colSpan="4" className="px-3 py-2 text-center text-gray-500">No respondents found</td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Case History */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-1">Case History</h3>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200 text-xs">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bench</th>
//                           <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listing Date</th>
//                           <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Date</th>
//                           <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
//                           <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//                           <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Purpose</th>
//                           <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                           <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {caseDetails.history && caseDetails.history.length > 0 ? (
//                           caseDetails.history.map((item, index) => (
//                             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                               <td className="px-3 py-2 whitespace-nowrap">{item.bench || 'N/A'}</td>
//                               <td className="px-3 py-2 whitespace-nowrap">{formatDate(item.listingDate)}</td>
//                               <td className="px-3 py-2 whitespace-nowrap">{formatDate(item.nextDate)}</td>
//                               <td className="px-3 py-2 whitespace-nowrap">{item.purpose || 'N/A'}</td>
//                               <td className="px-3 py-2 whitespace-nowrap">{item.action || 'N/A'}</td>
//                               <td className="px-3 py-2 whitespace-nowrap">{item.nextPurpose || 'N/A'}</td>
//                               <td className="px-3 py-2 whitespace-nowrap">
//                                 <span className={`px-2 py-1 text-xs rounded-full ${
//                                   item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                                   item.status === 'Disposed' ? 'bg-green-100 text-green-800' : 
//                                   'bg-gray-100 text-gray-800'
//                                 }`}>
//                                   {item.status || 'N/A'}
//                                 </span>
//                               </td>
//                               <td className="px-3 py-2 whitespace-nowrap">
//                                 {item.url ? (
//                                   <a 
//                                     href={item.url} 
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-600 hover:text-blue-800 flex items-center"
//                                   >
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                                     </svg>
//                                     View
//                                   </a>
//                                 ) : (
//                                   <span className="text-gray-400 text-xs">Not available</span>
//                                 )}
//                               </td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="8" className="px-3 py-2 text-center text-gray-500">No case history found</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>

//                 {/* Applications */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-1">Applications</h3>
//                   {caseDetails.applications && caseDetails.applications.length > 0 ? (
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full divide-y divide-gray-200 text-xs">
//                         <thead className="bg-gray-100">
//                           <tr>
//                             <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application</th>
//                             <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filed By</th>
//                             <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filed On</th>
//                             <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                           </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                           {caseDetails.applications.map((app, index) => (
//                             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                               <td className="px-3 py-2 whitespace-nowrap">{app.applicationNumber || 'N/A'}</td>
//                               <td className="px-3 py-2 whitespace-nowrap">{app.filedBy || 'N/A'}</td>
//                               <td className="px-3 py-2 whitespace-nowrap">{formatDate(app.filedOn)}</td>
//                               <td className="px-3 py-2 whitespace-nowrap">
//                                 <span className={`px-2 py-1 text-xs rounded-full ${
//                                   app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                                   app.status === 'Disposed' ? 'bg-green-100 text-green-800' : 
//                                   'bg-gray-100 text-gray-800'
//                                 }`}>
//                                   {app.status || 'N/A'}
//                                 </span>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   ) : (
//                     <p className="text-sm text-gray-500 text-center py-2">No applications found</p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Modal Footer */}
//           <div className="px-6 py-4 border-t text-right">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-150"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NcltCaseDetailsModal;


import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

// Status badge component
const StatusBadge = ({ status }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';
  
  if (status) {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('dispos')) {
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
    } else if (statusLower.includes('pending')) {
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
    } else if (statusLower.includes('evidence') || statusLower.includes('fresh')) {
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
    }
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status || 'Unknown'}
    </span>
  );
};

const NcltCaseDetailsModal = ({ caseDetails, isLoading, error, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString || dateString === '1970-01-01T00:00:00.000Z') return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Function to get available tabs based on data
  const getAvailableTabs = () => {
    if (!caseDetails) return ['overview'];
    
    const tabs = ['overview', 'parties'];
    
    if (caseDetails.applications && caseDetails.applications.length > 0) tabs.push('applications');
    if (caseDetails.history && caseDetails.history.length > 0) tabs.push('history');
    
    return tabs;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold">NCLT Case Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">{error}</div>
          ) : caseDetails ? (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">
                  {caseDetails.registration?.number || caseDetails.filing?.number || 'NCLT Case'}
                </h2>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-black text-sm font-medium">Filing No: {caseDetails.filing?.number || 'N/A'}</span>
                  <span className="text-black text-sm mx-2 font-medium">|</span>
                  <span className="text-black text-sm font-medium">
                    Filed: {formatDate(caseDetails.filing?.date)}
                  </span>
                  <span className="text-black text-sm mx-2 font-medium">|</span>
                  <StatusBadge status={caseDetails.status?.stage || 'PENDING'} />
                </div>
              </div>
              
              <div className="border-b mb-4">
                <div className="flex overflow-x-auto">
                  {getAvailableTabs().map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Filing Information */}
                    <div>
                      <h3 className="font-medium mb-2">Filing Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                        {[
                          { label: 'Filing Number', value: caseDetails.filing?.number || 'N/A' },
                          { label: 'Case Type', value: caseDetails.filing?.caseType || 'N/A' },
                          { label: 'Bench', value: caseDetails.filing?.bench || 'N/A' },
                          { label: 'Filing Date', value: formatDate(caseDetails.filing?.date) }
                        ].map((item, index) => (
                          <div key={index}>
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="text-sm">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Registration Information */}
                    <div>
                      <h3 className="font-medium mb-2">Registration Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                        {[
                          { label: 'Registration Number', value: caseDetails.registration?.number || 'N/A' },
                          { label: 'Registration Date', value: formatDate(caseDetails.registration?.date) },
                          { label: 'Filing Method', value: caseDetails.registration?.method || 'N/A' }
                        ].map((item, index) => (
                          <div key={index}>
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="text-sm">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Status Information */}
                    <div>
                      <h3 className="font-medium mb-2">Status Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                        {[
                          { label: 'Defects Issued On', value: formatDate(caseDetails.status?.defectsIssuedOn) },
                          { label: 'Refiled On', value: formatDate(caseDetails.status?.refiledOn) },
                          { label: 'Next Date', value: formatDate(caseDetails.status?.nextDate) },
                          { label: 'Stage', value: caseDetails.status?.stage },
                          { label: 'Court Number', value: caseDetails.status?.courtNumber || 'N/A' },
                          { 
                            label: 'Defect Free', 
                            value: caseDetails.status?.defectFree !== undefined ? 
                              (caseDetails.status.defectFree ? 'Yes' : 'No') : 'N/A' 
                          }
                        ].map((item, index) => item.value && item.value !== 'N/A' && (
                          <div key={index}>
                            <p className="text-sm text-gray-500">{item.label}</p>
                            {item.label === 'Stage' ? (
                              <StatusBadge status={item.value} />
                            ) : item.label === 'Defect Free' ? (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.value === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {item.value}
                              </span>
                            ) : (
                              <p className="text-sm">{item.value}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'parties' && (
                  <div className="space-y-6">
                    {/* Petitioners */}
                    <div>
                      <h3 className="font-medium mb-2">Petitioners</h3>
                      {caseDetails.parties?.petitioners?.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Name</th>
                                <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Advocate</th>
                                <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Email</th>
                                <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Phone</th>
                              </tr>
                            </thead>
                            <tbody>
                              {caseDetails.parties.petitioners.map((petitioner, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="border border-gray-300 p-2 text-sm">{petitioner.name || 'N/A'}</td>
                                  <td className="border border-gray-300 p-2 text-sm">
                                    {petitioner.advocate === 'NA' ? 'N/A' : petitioner.advocate || 'N/A'}
                                  </td>
                                  <td className="border border-gray-300 p-2 text-sm">{petitioner.email || 'N/A'}</td>
                                  <td className="border border-gray-300 p-2 text-sm">{petitioner.phone || 'N/A'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                          No petitioner information available
                        </div>
                      )}
                    </div>
                    
                    {/* Respondents */}
                    <div>
                      <h3 className="font-medium mb-2">Respondents</h3>
                      {caseDetails.parties?.respondents?.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Name</th>
                                <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Advocate</th>
                                <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Email</th>
                                <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Phone</th>
                              </tr>
                            </thead>
                            <tbody>
                              {caseDetails.parties.respondents.map((respondent, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="border border-gray-300 p-2 text-sm">{respondent.name || 'N/A'}</td>
                                  <td className="border border-gray-300 p-2 text-sm">
                                    {respondent.advocate === 'NA' ? 'N/A' : respondent.advocate || 'N/A'}
                                  </td>
                                  <td className="border border-gray-300 p-2 text-sm">{respondent.email || 'N/A'}</td>
                                  <td className="border border-gray-300 p-2 text-sm">{respondent.phone || 'N/A'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                          No respondent information available
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {activeTab === 'applications' && (
                  <div>
                    <h3 className="font-medium mb-4">Applications</h3>
                    {caseDetails.applications?.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Application</th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Filed By</th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Filed On</th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {caseDetails.applications.map((app, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="border border-gray-300 p-2 text-sm">{app.applicationNumber || 'N/A'}</td>
                                <td className="border border-gray-300 p-2 text-sm">{app.filedBy || 'N/A'}</td>
                                <td className="border border-gray-300 p-2 text-sm">{formatDate(app.filedOn)}</td>
                                <td className="border border-gray-300 p-2 text-sm">
                                  <StatusBadge status={app.status || 'N/A'} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
                        No applications available for this case.
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'history' && (
                  <div>
                    <h3 className="font-medium mb-4">Case History</h3>
                    {caseDetails.history?.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Bench</th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Listing Date</th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Next Date</th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Purpose</th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Action</th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Next Purpose</th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Status</th>
                              <th className="border border-gray-300 p-2 text-left text-xs font-medium text-gray-500">Order</th>
                            </tr>
                          </thead>
                          <tbody>
                            {caseDetails.history.map((item, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="border border-gray-300 p-2 text-sm">{item.bench || 'N/A'}</td>
                                <td className="border border-gray-300 p-2 text-sm">{formatDate(item.listingDate)}</td>
                                <td className="border border-gray-300 p-2 text-sm">{formatDate(item.nextDate)}</td>
                                <td className="border border-gray-300 p-2 text-sm">{item.purpose || 'N/A'}</td>
                                <td className="border border-gray-300 p-2 text-sm">{item.action || 'N/A'}</td>
                                <td className="border border-gray-300 p-2 text-sm">{item.nextPurpose || 'N/A'}</td>
                                <td className="border border-gray-300 p-2 text-sm">
                                  <StatusBadge status={item.status || 'N/A'} />
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
                                      <ExternalLink size={14} className="ml-1" />
                                    </a>
                                  ) : (
                                    'N/A'
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

export default NcltCaseDetailsModal;