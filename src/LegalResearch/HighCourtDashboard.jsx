// import React, { useState } from 'react';
// import { Search, ChevronDown, ChevronRight, X, Calendar, FileText, MapPin, User, Clock } from 'lucide-react';

// // Mock data - would be replaced with actual API calls
// const mockCourts = [
//   { id: 1, name: 'Supreme Court of India', location: 'New Delhi', benches: 15, type: 'supreme', description: 'Apex judicial forum and final court of appeal under the Constitution of India' },
//   { id: 2, name: 'Delhi High Court', location: 'New Delhi', benches: 10, type: 'high', description: 'High Court of Delhi with jurisdiction over the Union Territory of Delhi' },
//   { id: 3, name: 'Bombay High Court', location: 'Mumbai', benches: 8, type: 'high', description: 'High Court with jurisdiction over Maharashtra, Goa, Dadra and Nagar Haveli and Daman and Diu' },
//   { id: 4, name: 'Calcutta High Court', location: 'Kolkata', benches: 7, type: 'high', description: 'Oldest High Court in India with jurisdiction over West Bengal and Andaman and Nicobar Islands' },
//   { id: 5, name: 'Madras High Court', location: 'Chennai', benches: 6, type: 'high', description: 'One of the three High Courts established at the Presidency Towns under the Indian High Courts Act 1861' }
// ];

// const mockBenches = {
//   1: [
//     { id: 101, number: 1, judges: ['Chief Justice D.Y. Chandrachud', 'Justice Sanjiv Khanna'], cases: 45 },
//     { id: 102, number: 2, judges: ['Justice B.R. Gavai', 'Justice J.K. Maheshwari'], cases: 38 },
//     { id: 103, number: 3, judges: ['Justice Surya Kant', 'Justice K.V. Viswanathan'], cases: 42 }
//   ],
//   2: [
//     { id: 201, number: 1, judges: ['Chief Justice Satish Chandra Sharma', 'Justice Sanjeev Narula'], cases: 35 },
//     { id: 202, number: 2, judges: ['Justice Rajiv Shakdher', 'Justice Prathiba M. Singh'], cases: 30 }
//   ]
// };

// const mockCaseResults = [
//   { 
//     diaryNumber: 'CRLP/1234/2024', 
//     title: 'Prakash Sharma vs State of Maharashtra', 
//     courtId: 3, 
//     bench: 2, 
//     filingDate: '12-01-2024', 
//     status: 'Pending',
//     hearingDate: '15-03-2025'
//   },
//   { 
//     diaryNumber: 'WP/5678/2024', 
//     title: 'Sunita Patel vs Union of India', 
//     courtId: 2, 
//     bench: 1, 
//     filingDate: '05-02-2024', 
//     status: 'Listed',
//     hearingDate: '20-02-2025'
//   }
// ];

// const mockCaseDetails = {
//   'CRLP/1234/2024': {
//     diaryNumber: 'CRLP/1234/2024',
//     title: 'Prakash Sharma vs State of Maharashtra',
//     courtId: 3,
//     courtName: 'Bombay High Court',
//     bench: 2,
//     caseType: 'Criminal Leave Petition',
//     filingDate: '12-01-2024',
//     status: 'Pending',
//     hearingDate: '15-03-2025',
//     petitioners: ['Prakash Sharma'],
//     respondents: ['State of Maharashtra', 'Commissioner of Police, Mumbai'],
//     advocates: {
//       petitioner: 'Adv. Rajesh Tiwari',
//       respondent: 'Adv. Sunil Gondhali (State Advocate)'
//     },
//     lastOrder: {
//       date: '10-01-2025',
//       text: 'Matter to be listed on 15-03-2025. Respondents to file reply within 4 weeks.'
//     },
//     history: [
//       { date: '12-01-2024', event: 'Case Filed' },
//       { date: '15-02-2024', event: 'Notice Issued' },
//       { date: '10-04-2024', event: 'First Hearing' },
//       { date: '10-01-2025', event: 'Subsequent Hearing' }
//     ]
//   },
//   'WP/5678/2024': {
//     diaryNumber: 'WP/5678/2024',
//     title: 'Sunita Patel vs Union of India',
//     courtId: 2,
//     courtName: 'Delhi High Court',
//     bench: 1,
//     caseType: 'Writ Petition',
//     filingDate: '05-02-2024',
//     status: 'Listed',
//     hearingDate: '20-02-2025',
//     petitioners: ['Sunita Patel'],
//     respondents: ['Union of India', 'Ministry of Home Affairs'],
//     advocates: {
//       petitioner: 'Adv. Manish Singhvi',
//       respondent: 'Adv. Tushar Mehta (Solicitor General)'
//     },
//     lastOrder: {
//       date: '10-12-2024',
//       text: 'Matter to be listed on 20-02-2025. Additional documents to be submitted by petitioner.'
//     },
//     history: [
//       { date: '05-02-2024', event: 'Case Filed' },
//       { date: '20-03-2024', event: 'Notice Issued' },
//       { date: '15-05-2024', event: 'First Hearing' },
//       { date: '10-12-2024', event: 'Subsequent Hearing' }
//     ]
//   }
// };

// const HighCourtDashboard = () => {
//   const [activeView, setActiveView] = useState('courts');
//   const [courtType, setCourtType] = useState('all'); // 'all', 'supreme', 'high'
//   const [selectedCourt, setSelectedCourt] = useState(null);
//   const [searchType, setSearchType] = useState('partyName');
//   const [partyName, setPartyName] = useState('');
//   const [searchYear, setSearchYear] = useState(new Date().getFullYear().toString());
//   const [diaryNumber, setDiaryNumber] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedCase, setSelectedCase] = useState(null);
//   const [jsonView, setJsonView] = useState(false);
  
//   const handleCourtSelect = (court) => {
//     setSelectedCourt(court);
//     setActiveView('benches');
//   };
  
//   const handleSearch = () => {
//     if (searchType === 'partyName' && partyName) {
//       // Simulate API search by party name
//       setSearchResults(mockCaseResults);
//       setActiveView('searchResults');
//     } else if (searchType === 'diaryNumber' && diaryNumber) {
//       // Simulate API search by diary number
//       const caseDetail = mockCaseDetails[diaryNumber];
//       if (caseDetail) {
//         setSelectedCase(caseDetail);
//         setActiveView('caseDetail');
//       }
//     }
//   };
  
//   const handleCaseSelect = (caseItem) => {
//     setSelectedCase(mockCaseDetails[caseItem.diaryNumber]);
//     setActiveView('caseDetail');
//   };
  
//   const getCourtTypeLabel = (type) => {
//     return type === 'supreme' ? 'Supreme Court' : 'High Court';
//   };
  
//   const resetSearch = () => {
//     setPartyName('');
//     setDiaryNumber('');
//     setSearchResults([]);
//     setSelectedCase(null);
//   };
  
//   const renderNavigation = () => (
//     <div className="bg-gray-100 p-3 rounded-md mb-4">
//       <div className="flex items-center text-sm text-gray-600">
//         <button 
//           className="hover:text-blue-600 font-medium"
//           onClick={() => {
//             setActiveView('courts');
//             setSelectedCourt(null);
//             resetSearch();
//           }}
//         >
//           Dashboard
//         </button>
        
//         {courtType !== 'all' && (
//           <>
//             <ChevronRight className="h-4 w-4 mx-1" />
//             <button 
//               className="hover:text-blue-600 font-medium"
//               onClick={() => {
//                 setCourtType('all');
//               }}
//             >
//               {courtType === 'supreme' ? 'Supreme Court' : 'High Courts'}
//             </button>
//           </>
//         )}
        
//         {selectedCourt && (
//           <>
//             <ChevronRight className="h-4 w-4 mx-1" />
//             <button 
//               className="hover:text-blue-600 font-medium"
//               onClick={() => setActiveView('benches')}
//             >
//               {selectedCourt.name}
//             </button>
//           </>
//         )}
        
//         {activeView === 'searchResults' && (
//           <>
//             <ChevronRight className="h-4 w-4 mx-1" />
//             <span>Search Results</span>
//           </>
//         )}
        
//         {activeView === 'caseDetail' && (
//           <>
//             {activeView === 'searchResults' ? (
//               <>
//                 <ChevronRight className="h-4 w-4 mx-1" />
//                 <button 
//                   className="hover:text-blue-600 font-medium"
//                   onClick={() => setActiveView('searchResults')}
//                 >
//                   Search Results
//                 </button>
//               </>
//             ) : null}
//             <ChevronRight className="h-4 w-4 mx-1" />
//             <span className="truncate max-w-xs">{selectedCase.diaryNumber}</span>
//           </>
//         )}
//       </div>
//     </div>
//   );
  
//   const renderSearchBar = () => (
//     <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//       <div className="flex flex-wrap items-center gap-4 mb-4">
//         <div className="flex rounded-md overflow-hidden border border-gray-300">
//           <button
//             className={`px-4 py-2 ${searchType === 'partyName' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
//             onClick={() => setSearchType('partyName')}
//           >
//             Search by Party Name
//           </button>
//           <button
//             className={`px-4 py-2 ${searchType === 'diaryNumber' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
//             onClick={() => setSearchType('diaryNumber')}
//           >
//             Search by Diary Number
//           </button>
//         </div>
        
//         <div className="ml-auto">
//           <select 
//             className="px-4 py-2 border border-gray-300 rounded-md bg-white"
//             value={courtType !== 'all' ? courtType : ''}
//             onChange={(e) => {
//               if (e.target.value === '') {
//                 setCourtType('all');
//               } else {
//                 setCourtType(e.target.value);
//               }
//             }}
//           >
//             <option value="">All Courts</option>
//             <option value="supreme">Supreme Court Only</option>
//             <option value="high">High Courts Only</option>
//           </select>
//         </div>
//       </div>
      
//       {searchType === 'partyName' ? (
//         <div className="flex flex-wrap gap-4">
//           <div className="flex-1 min-w-64">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Party Name</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={partyName}
//                 onChange={(e) => setPartyName(e.target.value)}
//                 placeholder="e.g. Sharma, Patel"
//                 className="w-full px-4 py-2 border rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>
          
//           <div className="w-32">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchYear}
//                 onChange={(e) => setSearchYear(e.target.value)}
//                 placeholder="YYYY"
//                 className="w-full px-4 py-2 border rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Diary Number</label>
//           <div className="relative max-w-md">
//             <input
//               type="text"
//               value={diaryNumber}
//               onChange={(e) => setDiaryNumber(e.target.value)}
//               placeholder="e.g. CRLP/1234/2024"
//               className="w-full px-4 py-2 border rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//           </div>
//         </div>
//       )}
      
//       <div className="mt-4 flex space-x-2">
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           onClick={handleSearch}
//         >
//           Search
//         </button>
//         <button
//           className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//           onClick={resetSearch}
//         >
//           Clear
//         </button>
//       </div>
//     </div>
//   );
  
//   const renderCourts = () => {
//     // Filter courts based on selected court type
//     const filteredCourts = courtType === 'all' 
//       ? mockCourts 
//       : mockCourts.filter(court => court.type === courtType);
    
//     const headerText = courtType === 'supreme' 
//       ? 'Supreme Court' 
//       : courtType === 'high' 
//         ? 'High Courts' 
//         : 'All Courts';
    
//     return (
//       <div className="bg-white rounded-lg shadow-md">
//         <h2 className="text-xl font-bold p-4 border-b">{headerText}</h2>
//         {filteredCourts.length > 0 ? (
//           <div className="divide-y">
//             {filteredCourts.map(court => (
//               <div 
//                 key={court.id}
//                 className="p-4 hover:bg-gray-50 cursor-pointer"
//                 onClick={() => handleCourtSelect(court)}
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <div className="flex items-center">
//                       <h3 className="font-medium text-lg">{court.name}</h3>
//                       {court.type === 'supreme' && (
//                         <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
//                           Apex Court
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-600 mt-1">{court.description}</p>
//                     <div className="flex items-center text-gray-500 mt-2">
//                       <MapPin className="h-4 w-4 mr-1" />
//                       <span className="text-sm">{court.location}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="text-gray-600 mr-3">
//                       <span className="font-semibold">{court.benches}</span> {court.benches === 1 ? 'Bench' : 'Benches'}
//                     </div>
//                     <ChevronRight className="h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="p-8 text-center text-gray-500">
//             No courts found for the selected filter.
//           </div>
//         )}
//       </div>
//     );
//   };
  
//   const renderBenches = () => {
//     if (!selectedCourt) return null;
    
//     const benches = mockBenches[selectedCourt.id] || [];
    
//     return (
//       <div className="bg-white rounded-lg shadow-md">
//         <h2 className="text-xl font-bold p-4 border-b flex items-center justify-between">
//           <span>{selectedCourt.name} - Benches</span>
//           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//             selectedCourt.type === 'supreme' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
//           }`}>
//             {selectedCourt.type === 'supreme' ? 'Supreme Court' : 'High Court'}
//           </span>
//         </h2>
        
//         {benches.length > 0 ? (
//           <div className="divide-y">
//             {benches.map(bench => (
//               <div key={bench.id} className="p-4 hover:bg-gray-50">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="font-medium text-lg">Bench {bench.number}</h3>
//                     <div className="mt-1 text-gray-600">
//                       {bench.judges.join(' & ')}
//                     </div>
//                   </div>
//                   <div className="text-gray-600">
//                     <span className="font-semibold">{bench.cases}</span> Active Cases
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="p-8 text-center text-gray-500">
//             No bench information available for this court.
//           </div>
//         )}
//       </div>
//     );
//   };
  
//   const renderSearchResults = () => (
//     <div className="bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold p-4 border-b flex items-center justify-between">
//         <span>Search Results</span>
//         <span className="text-sm font-normal text-gray-500">Found {searchResults.length} cases</span>
//       </h2>
      
//       {searchResults.length > 0 ? (
//         <div className="divide-y">
//           {searchResults.map(caseItem => (
//             <div 
//               key={caseItem.diaryNumber}
//               className="p-4 hover:bg-gray-50 cursor-pointer"
//               onClick={() => handleCaseSelect(caseItem)}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-medium text-lg">{caseItem.title}</h3>
//                   <div className="flex items-center mt-2 text-sm text-gray-600">
//                     <FileText className="h-4 w-4 mr-1" />
//                     <span>{caseItem.diaryNumber}</span>
//                     <span className="mx-2">•</span>
//                     <Calendar className="h-4 w-4 mr-1" />
//                     <span>Filed: {caseItem.filingDate}</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <div className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     caseItem.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                     caseItem.status === 'Listed' ? 'bg-green-100 text-green-800' : 
//                     'bg-gray-100 text-gray-800'
//                   }`}>
//                     {caseItem.status}
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-2 text-sm">
//                 <div className="flex items-center text-blue-600">
//                   <Clock className="h-4 w-4 mr-1" />
//                   <span>Next Hearing: {caseItem.hearingDate}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="p-8 text-center text-gray-500">
//           No results found. Please try a different search.
//         </div>
//       )}
//     </div>
//   );
  
//   const renderCaseDetail = () => {
//     if (!selectedCase) return null;
    
//     if (jsonView) {
//       return (
//         <div className="bg-white rounded-lg shadow-md">
//           <div className="p-4 border-b flex justify-between items-center">
//             <h2 className="text-xl font-bold">Case Details (JSON)</h2>
//             <button
//               className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
//               onClick={() => setJsonView(false)}
//             >
//               View UI
//             </button>
//           </div>
//           <div className="p-4 overflow-auto" style={{ maxHeight: '70vh' }}>
//             <pre className="text-sm bg-gray-50 p-4 rounded-md">
//               {JSON.stringify(selectedCase, null, 2)}
//             </pre>
//           </div>
//         </div>
//       );
//     }
    
//     return (
//       <div className="bg-white rounded-lg shadow-md">
//         <div className="p-4 border-b flex justify-between items-center">
//           <h2 className="text-xl font-bold">{selectedCase.title}</h2>
//           <button
//             className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
//             onClick={() => setJsonView(true)}
//           >
//             View JSON
//           </button>
//         </div>
        
//         <div className="p-4 grid grid-cols-2 gap-6">
//           <div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h3 className="text-sm text-gray-500 mb-1">Diary Number</h3>
//                 <p className="font-medium">{selectedCase.diaryNumber}</p>
//               </div>
//               <div>
//                 <h3 className="text-sm text-gray-500 mb-1">Case Type</h3>
//                 <p className="font-medium">{selectedCase.caseType}</p>
//               </div>
//               <div>
//                 <h3 className="text-sm text-gray-500 mb-1">Filing Date</h3>
//                 <p className="font-medium">{selectedCase.filingDate}</p>
//               </div>
//               <div>
//                 <h3 className="text-sm text-gray-500 mb-1">Status</h3>
//                 <p className={`px-2 py-0.5 rounded-full text-xs font-medium inline-block ${
//                   selectedCase.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                   selectedCase.status === 'Listed' ? 'bg-green-100 text-green-800' : 
//                   'bg-gray-100 text-gray-800'
//                 }`}>
//                   {selectedCase.status}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-sm text-gray-500 mb-1">Court</h3>
//                 <div className="flex items-center">
//                   <p className="font-medium">{selectedCase.courtName}</p>
//                   <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
//                     selectedCase.courtId === 1 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
//                   }`}>
//                     {selectedCase.courtId === 1 ? 'Supreme Court' : 'High Court'}
//                   </span>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-sm text-gray-500 mb-1">Bench</h3>
//                 <p className="font-medium">Bench {selectedCase.bench}</p>
//               </div>
//               <div>
//                 <h3 className="text-sm text-gray-500 mb-1">Next Hearing</h3>
//                 <p className="font-medium text-blue-600">{selectedCase.hearingDate}</p>
//               </div>
//             </div>
            
//             <div className="mt-6">
//               <h3 className="font-medium text-gray-800 mb-2">Parties</h3>
//               <div className="bg-gray-50 p-3 rounded-md">
//                 <div className="mb-4">
//                   <h4 className="text-sm text-gray-500 mb-1">Petitioner(s)</h4>
//                   <ul className="list-disc list-inside">
//                     {selectedCase.petitioners.map((petitioner, index) => (
//                       <li key={index} className="font-medium">{petitioner}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className="text-sm text-gray-500 mb-1">Respondent(s)</h4>
//                   <ul className="list-disc list-inside">
//                     {selectedCase.respondents.map((respondent, index) => (
//                       <li key={index} className="font-medium">{respondent}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-6">
//               <h3 className="font-medium text-gray-800 mb-2">Advocates</h3>
//               <div className="bg-gray-50 p-3 rounded-md">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <h4 className="text-sm text-gray-500 mb-1">Petitioner Side</h4>
//                     <p className="font-medium">{selectedCase.advocates.petitioner}</p>
//                   </div>
//                   <div>
//                     <h4 className="text-sm text-gray-500 mb-1">Respondent Side</h4>
//                     <p className="font-medium">{selectedCase.advocates.respondent}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div>
//             <div>
//               <h3 className="font-medium text-gray-800 mb-2">Last Order</h3>
//               <div className="bg-gray-50 p-3 rounded-md">
//                 <p className="text-sm text-gray-500 mb-1">Date: {selectedCase.lastOrder.date}</p>
//                 <p className="text-sm">{selectedCase.lastOrder.text}</p>
//               </div>
//             </div>
            
//             <div className="mt-6">
//               <h3 className="font-medium text-gray-800 mb-2">Case History</h3>
//               <div className="bg-gray-50 p-3 rounded-md">
//                 <div className="space-y-3">
//                   {selectedCase.history.map((event, index) => (
//                     <div key={index} className="flex">
//                       <div className="w-24 shrink-0 text-sm text-gray-500">{event.date}</div>
//                       <div className="text-sm">{event.event}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Indian Courts Dashboard</h1>
//         <div className="flex bg-white rounded-lg shadow-sm">
//           <button 
//             className={`px-4 py-2 text-sm font-medium ${courtType === 'all' ? 'bg-blue-600 text-white rounded-l-lg' : 'text-gray-700 hover:bg-gray-50 rounded-l-lg'}`}
//             onClick={() => setCourtType('all')}
//           >
//             All Courts
//           </button>
//           <button 
//             className={`px-4 py-2 text-sm font-medium ${courtType === 'supreme' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
//             onClick={() => setCourtType('supreme')}
//           >
//             Supreme Court
//           </button>
//           <button 
//             className={`px-4 py-2 text-sm font-medium ${courtType === 'high' ? 'bg-blue-600 text-white rounded-r-lg' : 'text-gray-700 hover:bg-gray-50 rounded-r-lg'}`}
//             onClick={() => setCourtType('high')}
//           >
//             High Courts
//           </button>
//         </div>
//       </div>
        
//       {renderNavigation()}
//       {renderSearchBar()}
        
//         <div className="mt-6">
//           {activeView === 'courts' && renderCourts()}
//           {activeView === 'benches' && renderBenches()}
//           {activeView === 'searchResults' && renderSearchResults()}
//           {activeView === 'caseDetail' && renderCaseDetail()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HighCourtDashboard;



import React, { useState } from 'react';
import {
  Search, ChevronDown, ChevronRight, X, Calendar, FileText, MapPin, User, Clock
} from 'lucide-react';
import CourtList from './components/CourtList';
import BenchList from './components/BenchList';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import CaseDetail from './components/CaseDetail';
import Navigation from './components/Navigation';

// Mock data - would be replaced with actual API calls
const mockCourts = [
  { id: 1, name: 'Supreme Court of India', location: 'New Delhi', benches: 15, type: 'supreme', description: 'Apex judicial forum and final court of appeal under the Constitution of India' },
  { id: 2, name: 'Delhi High Court', location: 'New Delhi', benches: 10, type: 'high', description: 'High Court of Delhi with jurisdiction over the Union Territory of Delhi' },
  { id: 3, name: 'Bombay High Court', location: 'Mumbai', benches: 8, type: 'high', description: 'High Court with jurisdiction over Maharashtra, Goa, Dadra and Nagar Haveli and Daman and Diu' },
  { id: 4, name: 'Calcutta High Court', location: 'Kolkata', benches: 7, type: 'high', description: 'Oldest High Court in India with jurisdiction over West Bengal and Andaman and Nicobar Islands' },
  { id: 5, name: 'Madras High Court', location: 'Chennai', benches: 6, type: 'high', description: 'One of the three High Courts established at the Presidency Towns under the Indian High Courts Act 1861' }
];

const mockBenches = {
  1: [
    { id: 101, number: 1, judges: ['Chief Justice D.Y. Chandrachud', 'Justice Sanjiv Khanna'], cases: 45 },
    { id: 102, number: 2, judges: ['Justice B.R. Gavai', 'Justice J.K. Maheshwari'], cases: 38 },
    { id: 103, number: 3, judges: ['Justice Surya Kant', 'Justice K.V. Viswanathan'], cases: 42 }
  ],
  2: [
    { id: 201, number: 1, judges: ['Chief Justice Satish Chandra Sharma', 'Justice Sanjeev Narula'], cases: 35 },
    { id: 202, number: 2, judges: ['Justice Rajiv Shakdher', 'Justice Prathiba M. Singh'], cases: 30 }
  ]
};

const mockCaseResults = [
  { 
    diaryNumber: 'CRLP/1234/2024', 
    title: 'Prakash Sharma vs State of Maharashtra', 
    courtId: 3, 
    bench: 2, 
    filingDate: '12-01-2024', 
    status: 'Pending',
    hearingDate: '15-03-2025'
  },
  { 
    diaryNumber: 'WP/5678/2024', 
    title: 'Sunita Patel vs Union of India', 
    courtId: 2, 
    bench: 1, 
    filingDate: '05-02-2024', 
    status: 'Listed',
    hearingDate: '20-02-2025'
  }
];

const mockCaseDetails = {
  'CRLP/1234/2024': {
    diaryNumber: 'CRLP/1234/2024',
    title: 'Prakash Sharma vs State of Maharashtra',
    courtId: 3,
    courtName: 'Bombay High Court',
    bench: 2,
    caseType: 'Criminal Leave Petition',
    filingDate: '12-01-2024',
    status: 'Pending',
    hearingDate: '15-03-2025',
    petitioners: ['Prakash Sharma'],
    respondents: ['State of Maharashtra', 'Commissioner of Police, Mumbai'],
    advocates: {
      petitioner: 'Adv. Rajesh Tiwari',
      respondent: 'Adv. Sunil Gondhali (State Advocate)'
    },
    lastOrder: {
      date: '10-01-2025',
      text: 'Matter to be listed on 15-03-2025. Respondents to file reply within 4 weeks.'
    },
    history: [
      { date: '12-01-2024', event: 'Case Filed' },
      { date: '15-02-2024', event: 'Notice Issued' },
      { date: '10-04-2024', event: 'First Hearing' },
      { date: '10-01-2025', event: 'Subsequent Hearing' }
    ]
  },
  'WP/5678/2024': {
    diaryNumber: 'WP/5678/2024',
    title: 'Sunita Patel vs Union of India',
    courtId: 2,
    courtName: 'Delhi High Court',
    bench: 1,
    caseType: 'Writ Petition',
    filingDate: '05-02-2024',
    status: 'Listed',
    hearingDate: '20-02-2025',
    petitioners: ['Sunita Patel'],
    respondents: ['Union of India', 'Ministry of Home Affairs'],
    advocates: {
      petitioner: 'Adv. Manish Singhvi',
      respondent: 'Adv. Tushar Mehta (Solicitor General)'
    },
    lastOrder: {
      date: '10-12-2024',
      text: 'Matter to be listed on 20-02-2025. Additional documents to be submitted by petitioner.'
    },
    history: [
      { date: '05-02-2024', event: 'Case Filed' },
      { date: '20-03-2024', event: 'Notice Issued' },
      { date: '15-05-2024', event: 'First Hearing' },
      { date: '10-12-2024', event: 'Subsequent Hearing' }
    ]
  }
};

const HighCourtDashboard = () => {
  const [activeView, setActiveView] = useState('courts');
  const [courtType, setCourtType] = useState('all'); // 'all', 'supreme', 'high'
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [searchType, setSearchType] = useState('partyName');
  const [partyName, setPartyName] = useState('');
  const [searchYear, setSearchYear] = useState(new Date().getFullYear().toString());
  const [diaryNumber, setDiaryNumber] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  
  const handleCourtSelect = (court) => {
    setSelectedCourt(court);
    setActiveView('benches');
  };
  
  const handleSearch = () => {
    if (searchType === 'partyName' && partyName) {
      // Simulate API search by party name
      setSearchResults(mockCaseResults);
      setActiveView('searchResults');
    } else if (searchType === 'diaryNumber' && diaryNumber) {
      // Simulate API search by diary number
      const caseDetail = mockCaseDetails[diaryNumber];
      if (caseDetail) {
        setSelectedCase(caseDetail);
        setActiveView('caseDetail');
      }
    }
  };
  
  const handleCaseSelect = (caseItem) => {
    setSelectedCase(mockCaseDetails[caseItem.diaryNumber]);
    setActiveView('caseDetail');
  };
  
  const resetSearch = () => {
    setPartyName('');
    setDiaryNumber('');
    setSearchResults([]);
    setSelectedCase(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Indian Courts Dashboard</h1>
        <div className="flex bg-white rounded-lg shadow-sm">
          <button 
            className={`px-4 py-2 text-sm font-medium ${courtType === 'all' ? 'bg-blue-600 text-white rounded-l-lg' : 'text-gray-700 hover:bg-gray-50 rounded-l-lg'}`}
            onClick={() => setCourtType('all')}
          >
            All Courts
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${courtType === 'supreme' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setCourtType('supreme')}
          >
            Supreme Court
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${courtType === 'high' ? 'bg-blue-600 text-white rounded-r-lg' : 'text-gray-700 hover:bg-gray-50 rounded-r-lg'}`}
            onClick={() => setCourtType('high')}
          >
            High Courts
          </button>
        </div>
      </div>
        
      <Navigation 
        activeView={activeView}
        setActiveView={setActiveView}
        courtType={courtType}
        setCourtType={setCourtType}
        selectedCourt={selectedCourt}
        setSelectedCourt={setSelectedCourt}
        selectedCase={selectedCase}
        resetSearch={resetSearch}
      />
      <SearchBar
        searchType={searchType}
        setSearchType={setSearchType}
        courtType={courtType}
        setCourtType={setCourtType}
        partyName={partyName}
        setPartyName={setPartyName}
        searchYear={searchYear}
        setSearchYear={setSearchYear}
        diaryNumber={diaryNumber}
        setDiaryNumber={setDiaryNumber}
        handleSearch={handleSearch}
        resetSearch={resetSearch}
      />
        
        <div className="mt-6">
          {activeView === 'courts' && (
            <CourtList
              courts={mockCourts.filter(court => courtType === 'all' || court.type === courtType)}
              handleCourtSelect={handleCourtSelect}
            />
          )}
          {activeView === 'benches' && (
            <BenchList
              court={selectedCourt}
              benches={mockBenches[selectedCourt.id] || []}
            />
          )}
          {activeView === 'searchResults' && (
            <SearchResults
              searchResults={searchResults}
              handleCaseSelect={handleCaseSelect}
            />
          )}
          {activeView === 'caseDetail' && (
            <CaseDetail selectedCase={selectedCase} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HighCourtDashboard;