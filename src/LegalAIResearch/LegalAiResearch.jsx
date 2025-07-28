


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import HomePage from './components/HomePage';
// import DateSearchPage from './components/DateSearchPage';
// import PartySearchPage from './components/PartySearchPage';
// import FilingNumberSearchPage from './components/FilingNumberSearchPage';
// import AdvocateSearchPage from './components/AdvocateSearchPage';
// import DistrictPartySearchPage from './components/DistrictPartySearchPage';
// import DistrictFilingNumberSearchPage from './components/DistrictFilingNumberSearchPage';
// import DistrictAdvocateSearchPage from './components/DistrictAdvocateSearchPage';
// import AdvocateNumberSearchPage from './components/AdvocateNumberSearchPage';
// import CauseListPage from './components/CauseListPage';
// import HighCourtPartySearchPage from './components/HighCourtPartySearchPage';
// import CatPartySearchPage from './components/CatPartySearchPage';
// import CatAdvocateSearchPage from './components/CatAdvocateSearchPage';
// import ConsumerForumCaseDetailsPage from './components/ConsumerForumCaseDetailsPage';
// import NcltPartySearchPage from './components/NcltPartySearchPage';
// import KnowledgeCards from './components/HomePage';



// const LegalAiResearch = () => {
//   const navigate = useNavigate();
  
//   // State for tracking which dropdown is open
//   const [openDropdown, setOpenDropdown] = useState(null);
//   // State for tracking which page to show
//   const [activePage, setActivePage] = useState('home');
//   // State for date input
//   const [dateInput, setDateInput] = useState('');
//   // State for party name input
//   const [partyNameInput, setPartyNameInput] = useState('');
//   // State for filing number input
//   const [filingNumberInput, setFilingNumberInput] = useState('');
//   // State for advocate name input
//   const [advocateNameInput, setAdvocateNameInput] = useState('');
//   // State for advocate number input
//   const [advocateNumberInput, setAdvocateNumberInput] = useState('');
//   // State for case details input
//   const [caseDetailsInput, setCaseDetailsInput] = useState('');
  
//   // Court options for sidebar
//   const courts = [
//     { id: 'supreme', name: 'Supreme Court' },
//     { id: 'high', name: 'High Court' },
//     { id: 'district', name: 'District Court' },
//     { id: 'cat', name: 'Central Administrative Tribunal' },
//     { id: 'nclt', name: 'NCLT' },
//     { id: 'consumer', name: 'Consumer Forum' },
//   ];

//   // Toggle dropdown menu
//   const toggleDropdown = (court) => {
//     setOpenDropdown(openDropdown === court ? null : court);
//   };

//   // Handle submitting date search
//   const handleDateSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} orders on date: ${dateInput}`);
//     // Here you would make your POST request with the date
//   };

//   // Handle submitting party name search
//   const handlePartySearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} by party name: ${partyNameInput}`);
//     // Here you would make your POST request with the party name
//   };

//   // Handle submitting filing number search
//   const handleFilingNumberSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} by filing number: ${filingNumberInput}`);
//     // Here you would make your POST request with the filing number
//   };

//   // Handle submitting advocate name search
//   const handleAdvocateSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} by advocate name: ${advocateNameInput}`);
//     // Here you would make your POST request with the advocate name
//   };

//   // Handle submitting advocate number search
//   const handleAdvocateNumberSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} by advocate number: ${advocateNumberInput}`);
//     // Here you would make your POST request with the advocate number
//   };

//   // Handle submitting case details search
//   const handleCaseDetailsSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} case details: ${caseDetailsInput}`);
//     // Here you would make your POST request for case details
//   };

//   // Handle submitting cause list search
//   const handleCauseListSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} cause list`);
//     // Here you would make your POST request for cause list
//   };

//   // Navigate to dashboard
//   const handleNavigateToDashboard = () => {
//     navigate('/dashboard');
//   };

//   // Show welcome page
//   const handleShowWelcomePage = () => {
//     setActivePage('welcome');
//   };

//   // Render appropriate content based on activePage
//   const renderContent = () => {
//     if (activePage === 'welcome') {
//       return (
//         <div className="p-6">
//           <h1 className="text-2xl font-bold mb-4">Welcome to Legal Case Dashboard</h1>
//           <div className="bg-white p-6 rounded-md border border-gray-200">
//             <p className="text-gray-700 mb-4">Select a court from the sidebar to begin searching for cases and orders.</p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//               {courts.map((court) => (
//                 <div 
//                   key={court.id} 
//                   className="bg-gray-50 p-4 rounded-md border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors" 
//                   onClick={() => toggleDropdown(court.id)}
//                 >
//                   <h3 className="font-medium text-gray-800 mb-2">{court.name}</h3>
//                   <p className="text-sm text-gray-600">Access orders and case information</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       );
//     }
    
//     if (activePage === 'home') {
//       return (
//         // <HomePage 
//         //   // courts={courts}
//         //   // toggleDropdown={toggleDropdown}
//         // />

//         <KnowledgeCards />
        
//       );
//     }
    
//     if (activePage.includes('date')) {
//       const court = activePage.split('-')[0];
//       return (
//         <DateSearchPage 
//           court={court} 
//           dateInput={dateInput} 
//           setDateInput={setDateInput} 
//           handleDateSearch={handleDateSearch} 
//         />
//       );
//     }
    
//     if (activePage.includes('party')) {
//       const court = activePage.split('-')[0];
      
//       // Use different components for specific courts
//       if (court === 'high') {
//         return (
//           <HighCourtPartySearchPage
//             court={court}
//             partyNameInput={partyNameInput}
//             setPartyNameInput={setPartyNameInput}
//             handlePartySearch={handlePartySearch}
//           />
//         );
//       } else if (court === 'district') {
//         return (
//           <DistrictPartySearchPage
//             court={court}
//             partyNameInput={partyNameInput}
//             setPartyNameInput={setPartyNameInput}
//             handlePartySearch={handlePartySearch}
//           />
//         );
//       } else if (court === 'cat') {
//         return (
//           <CatPartySearchPage
//             court={court}
//             partyNameInput={partyNameInput}
//             setPartyNameInput={setPartyNameInput}
//             handlePartySearch={handlePartySearch}
//           />
//         );
//       } else if (court === 'nclt') {
//         return (
//           <NcltPartySearchPage
//             court={court}
//             partyNameInput={partyNameInput}
//             setPartyNameInput={setPartyNameInput}
//             handlePartySearch={handlePartySearch}
//           />
//         );
//       }
      
//       // Use regular component for other courts
//       return (
//         <PartySearchPage 
//           court={court} 
//           partyNameInput={partyNameInput} 
//           setPartyNameInput={setPartyNameInput} 
//           handlePartySearch={handlePartySearch} 
//         />
//       );
//     }
    
//     if (activePage.includes('filing')) {
//       const court = activePage.split('-')[0];
      
//       // Use different component for district court
//       if (court === 'district') {
//         return (
//           <DistrictFilingNumberSearchPage
//             court={court}
//             filingNumberInput={filingNumberInput}
//             setFilingNumberInput={setFilingNumberInput}
//             handleFilingNumberSearch={handleFilingNumberSearch}
//           />
//         );
//       }
      
//       // Use regular component for other courts
//       return (
//         <FilingNumberSearchPage
//           court={court}
//           filingNumberInput={filingNumberInput}
//           setFilingNumberInput={setFilingNumberInput}
//           handleFilingNumberSearch={handleFilingNumberSearch}
//         />
//       );
//     }
    
//     if (activePage.includes('advocate-name')) {
//       const court = activePage.split('-')[0];
      
//       // Use different component for district court or CAT
//       if (court === 'district') {
//         return (
//           <DistrictAdvocateSearchPage
//             court={court}
//             advocateNameInput={advocateNameInput}
//             setAdvocateNameInput={setAdvocateNameInput}
//             handleAdvocateSearch={handleAdvocateSearch}
//           />
//         );
//       } else if (court === 'cat') {
//         return (
//           <CatAdvocateSearchPage
//             court={court}
//             advocateNameInput={advocateNameInput}
//             setAdvocateNameInput={setAdvocateNameInput}
//             handleAdvocateSearch={handleAdvocateSearch}
//           />
//         );
//       }
      
//       // Use regular component for other courts
//       return (
//         <AdvocateSearchPage
//           court={court}
//           advocateNameInput={advocateNameInput}
//           setAdvocateNameInput={setAdvocateNameInput}
//           handleAdvocateSearch={handleAdvocateSearch}
//         />
//       );
//     }
    
//     if (activePage.includes('advocate-number')) {
//       const court = activePage.split('-')[0];
//       return (
//         <AdvocateNumberSearchPage
//           court={court}
//           advocateNumberInput={advocateNumberInput}
//           setAdvocateNumberInput={setAdvocateNumberInput}
//           handleAdvocateNumberSearch={handleAdvocateNumberSearch}
//         />
//       );
//     }
    
//     if (activePage.includes('case-details')) {
//       const court = activePage.split('-')[0];
//       return (
//         <ConsumerForumCaseDetailsPage
//           court={court}
//           caseDetailsInput={caseDetailsInput}
//           setCaseDetailsInput={setCaseDetailsInput}
//           handleCaseDetailsSearch={handleCaseDetailsSearch}
//         />
//       );
//     }
    
//     if (activePage.includes('cause-list')) {
//       const court = activePage.split('-')[0];
//       return (
//         <CauseListPage
//           court={court}
//           dateInput={dateInput}
//           setDateInput={setDateInput}
//           handleCauseListSearch={handleCauseListSearch}
//         />
//       );
//     }
    
//     return null;
//   };

//   // Generate court dropdown items based on court ID
//   const renderCourtDropdownItems = (courtId) => {
//     // Special case for District Court with the requested buttons
//     if (courtId === 'district') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-party`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search by Party Name</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-filing` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-filing`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-filing` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Filing Number</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-name` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-advocate-name`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-name` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Advocate Name</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-number` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-advocate-number`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-number` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Advocate Number</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-cause-list` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-cause-list`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-cause-list` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Cause List</span>
//           </button>
//         </div>
//       );
//     }

//     // Special case for High Court with four search options
//     if (courtId === 'high') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           {/* <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-date` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-date`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-date` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Orders on Date</span>
//           </button> */}
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-party`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search by Party Name</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-filing` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-filing`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-filing` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Filing Number</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-name` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-advocate-name`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-name` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Advocate Name</span>
//           </button>
//         </div>
//       );
//     }
    
//     // Special case for Central Administrative Tribunal (CAT)
//     if (courtId === 'cat') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-party`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search by Party Name</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-name` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-advocate-name`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-name` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Advocate Name</span>
//           </button>
//         </div>
//       );
//     }
    
//     // Special case for NCLT with only party name search
//     if (courtId === 'nclt') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-party`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search by Party Name</span>
//           </button>
//         </div>
//       );
//     }
    
//     // Special case for Consumer Forum with only case details
//     if (courtId === 'consumer') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-case-details` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-case-details`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-case-details` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Case Details</span>
//           </button>
//         </div>
//       );
//     }
    
//     // Default case for other courts (just date and party name search)
//     return (
//       <div className="bg-gray-50 overflow-hidden ml-2">
//         <button 
//           className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-date` ? 'text-blue-600' : 'text-gray-600'}`}
//           onClick={() => setActivePage(`${courtId}-date`)}
//         >
//           <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-date` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//           <span>Orders on Date</span>
//         </button>
//         <button 
//           className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//           onClick={() => setActivePage(`${courtId}-party`)}
//         >
//           <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//           <span>Search by Party Name</span>
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="w-64 bg-white flex flex-col shadow-md">
//         {/* App title */}
//         <div className="bg-blue-600 p-4 flex items-center justify-center">
//           <h1 className="font-bold text-lg text-white">LEGAL Ai Research</h1>
//         </div>
        
//         {/* Home button - navigates to dashboard */}
//         <button 
//           className="flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 text-gray-700"
//           onClick={handleNavigateToDashboard}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//           </svg>
//           <span className="font-medium">Home</span>
//         </button>

//         {/* Welcome button - shows welcome page */}
//         <button 
//           className={`flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${activePage === 'welcome' ? 'text-blue-600 bg-gray-50' : 'text-gray-700'}`}
//           onClick={handleShowWelcomePage}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//           </svg>
//           <span className="font-medium">Welcome</span>
//         </button>

//         {/* Divider */}
//         <div className="mx-4 my-2 border-b border-gray-100"></div>
        
//         {/* Court navigation */}
//         <div className="flex-1 overflow-y-auto px-2">
//           {courts.map((court) => (
//             <div key={court.id} className="mb-1 overflow-hidden">
//               <button 
//                 className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 text-left transition-colors duration-200 ${openDropdown === court.id ? 'bg-gray-50 text-blue-600' : 'text-gray-700'}`}
//                 onClick={() => toggleDropdown(court.id)}
//               >
//                 <span className={`font-medium ${openDropdown === court.id ? 'text-blue-600' : ''}`}>{court.name}</span>
//                 {openDropdown === court.id ? 
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg> : 
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                   </svg>
//                 }
//               </button>
              
//               {/* Dynamic dropdown menu based on court */}
//               {openDropdown === court.id && renderCourtDropdownItems(court.id)}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-y-auto p-4">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default LegalAiResearch;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import DateSearchPage from './components/DateSearchPage';
// import PartySearchPage from './components/PartySearchPage';
// import FilingNumberSearchPage from './components/FilingNumberSearchPage';
// import AdvocateSearchPage from './components/AdvocateSearchPage';
// import DistrictPartySearchPage from './components/DistrictPartySearchPage';
// import DistrictFilingNumberSearchPage from './components/DistrictFilingNumberSearchPage';
// import DistrictAdvocateSearchPage from './components/DistrictAdvocateSearchPage';
// import AdvocateNumberSearchPage from './components/AdvocateNumberSearchPage';
// import CauseListPage from './components/CauseListPage';
// import HighCourtPartySearchPage from './components/HighCourtPartySearchPage';
// import CatPartySearchPage from './components/CatPartySearchPage';
// import CatAdvocateSearchPage from './components/CatAdvocateSearchPage';
// import ConsumerForumCaseDetailsPage from './components/ConsumerForumCaseDetailsPage';
// import NcltPartySearchPage from './components/NcltPartySearchPage';
// import KnowledgePage from './components/KnowledgePage'; // Import the new KnowledgePage component
// import KnowledgeData from './components/Welcome';

// const LegalAiResearch = () => {
//   const navigate = useNavigate();
  
//   // State for tracking which dropdown is open
//   const [openDropdown, setOpenDropdown] = useState(null);
//   // State for tracking which page to show
//   const [activePage, setActivePage] = useState('home');
//   // State for date input
//   const [dateInput, setDateInput] = useState('');
//   // State for party name input
//   const [partyNameInput, setPartyNameInput] = useState('');
//   // State for filing number input
//   const [filingNumberInput, setFilingNumberInput] = useState('');
//   // State for advocate name input
//   const [advocateNameInput, setAdvocateNameInput] = useState('');
//   // State for advocate number input
//   const [advocateNumberInput, setAdvocateNumberInput] = useState('');
//   // State for case details input
//   const [caseDetailsInput, setCaseDetailsInput] = useState('');
  
//   // Court options for sidebar
//   const courts = [
//     { id: 'supreme', name: 'Supreme Court' },
//     { id: 'high', name: 'High Court' },
//     { id: 'district', name: 'District Court' },
//     { id: 'cat', name: 'Central Administrative Tribunal' },
//     { id: 'nclt', name: 'NCLT' },
//     { id: 'consumer', name: 'Consumer Forum' },
//   ];

//   // Toggle dropdown menu
//   const toggleDropdown = (court) => {
//     setOpenDropdown(openDropdown === court ? null : court);
//   };

//   // Handle submitting date search
//   const handleDateSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} orders on date: ${dateInput}`);
//     // Here you would make your POST request with the date
//   };

//   // Handle submitting party name search
//   const handlePartySearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} by party name: ${partyNameInput}`);
//     // Here you would make your POST request with the party name
//   };

//   // Handle submitting filing number search
//   const handleFilingNumberSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} by filing number: ${filingNumberInput}`);
//     // Here you would make your POST request with the filing number
//   };

//   // Handle submitting advocate name search
//   const handleAdvocateSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} by advocate name: ${advocateNameInput}`);
//     // Here you would make your POST request with the advocate name
//   };

//   // Handle submitting advocate number search
//   const handleAdvocateNumberSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} by advocate number: ${advocateNumberInput}`);
//     // Here you would make your POST request with the advocate number
//   };

//   // Handle submitting case details search
//   const handleCaseDetailsSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} case details: ${caseDetailsInput}`);
//     // Here you would make your POST request for case details
//   };

//   // Handle submitting cause list search
//   const handleCauseListSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} cause list`);
//     // Here you would make your POST request for cause list
//   };

//   // Navigate to dashboard
//   const handleNavigateToDashboard = () => {
//     navigate('/dashboard');
//   };

//   // Show welcome page
//   const handleShowWelcomePage = () => {
//     setActivePage('welcome');
//   };

//   // Check if search should be shown based on active page
//   const shouldShowSearch = () => {
//     // Only show search on home and welcome pages
//     return activePage === 'home' || activePage === 'welcome';
//   };

//   // Render appropriate content based on activePage
//   const renderContent = () => {
//     if (activePage === 'welcome') {
//       return (
//         <div className="p-6">
//           <KnowledgeData showSearch={true} pageName="welcome" />
//         </div>
//       );
//     }
    
//     if (activePage === 'home') {
//       return <KnowledgeData showSearch={true} pageName="home" />;
//     }
    
//     if (activePage.includes('date')) {
//       const court = activePage.split('-')[0];
//       return (
//         <DateSearchPage 
//           court={court} 
//           dateInput={dateInput} 
//           setDateInput={setDateInput} 
//           handleDateSearch={handleDateSearch} 
//         />
//       );
//     }
    
//     if (activePage.includes('party')) {
//       const court = activePage.split('-')[0];
      
//       // Use different components for specific courts
//       if (court === 'high') {
//         return (
//           <HighCourtPartySearchPage
//             court={court}
//             partyNameInput={partyNameInput}
//             setPartyNameInput={setPartyNameInput}
//             handlePartySearch={handlePartySearch}
//           />
//         );
//       } else if (court === 'district') {
//         return (
//           <DistrictPartySearchPage
//             court={court}
//             partyNameInput={partyNameInput}
//             setPartyNameInput={setPartyNameInput}
//             handlePartySearch={handlePartySearch}
//           />
//         );
//       } else if (court === 'cat') {
//         return (
//           <CatPartySearchPage
//             court={court}
//             partyNameInput={partyNameInput}
//             setPartyNameInput={setPartyNameInput}
//             handlePartySearch={handlePartySearch}
//           />
//         );
//       } else if (court === 'nclt') {
//         return (
//           <NcltPartySearchPage
//             court={court}
//             partyNameInput={partyNameInput}
//             setPartyNameInput={setPartyNameInput}
//             handlePartySearch={handlePartySearch}
//           />
//         );
//       }
      
//       // Use regular component for other courts
//       return (
//         <PartySearchPage 
//           court={court} 
//           partyNameInput={partyNameInput} 
//           setPartyNameInput={setPartyNameInput} 
//           handlePartySearch={handlePartySearch} 
//         />
//       );
//     }
    
//     if (activePage.includes('filing')) {
//       const court = activePage.split('-')[0];
      
//       // Use different component for district court
//       if (court === 'district') {
//         return (
//           <DistrictFilingNumberSearchPage
//             court={court}
//             filingNumberInput={filingNumberInput}
//             setFilingNumberInput={setFilingNumberInput}
//             handleFilingNumberSearch={handleFilingNumberSearch}
//           />
//         );
//       }
      
//       // Use regular component for other courts
//       return (
//         <FilingNumberSearchPage
//           court={court}
//           filingNumberInput={filingNumberInput}
//           setFilingNumberInput={setFilingNumberInput}
//           handleFilingNumberSearch={handleFilingNumberSearch}
//         />
//       );
//     }
    
//     if (activePage.includes('advocate-name')) {
//       const court = activePage.split('-')[0];
      
//       // Use different component for district court or CAT
//       if (court === 'district') {
//         return (
//           <DistrictAdvocateSearchPage
//             court={court}
//             advocateNameInput={advocateNameInput}
//             setAdvocateNameInput={setAdvocateNameInput}
//             handleAdvocateSearch={handleAdvocateSearch}
//           />
//         );
//       } else if (court === 'cat') {
//         return (
//           <CatAdvocateSearchPage
//             court={court}
//             advocateNameInput={advocateNameInput}
//             setAdvocateNameInput={setAdvocateNameInput}
//             handleAdvocateSearch={handleAdvocateSearch}
//           />
//         );
//       }
      
//       // Use regular component for other courts
//       return (
//         <AdvocateSearchPage
//           court={court}
//           advocateNameInput={advocateNameInput}
//           setAdvocateNameInput={setAdvocateNameInput}
//           handleAdvocateSearch={handleAdvocateSearch}
//         />
//       );
//     }
    
//     if (activePage.includes('advocate-number')) {
//       const court = activePage.split('-')[0];
//       return (
//         <AdvocateNumberSearchPage
//           court={court}
//           advocateNumberInput={advocateNumberInput}
//           setAdvocateNumberInput={setAdvocateNumberInput}
//           handleAdvocateNumberSearch={handleAdvocateNumberSearch}
//         />
//       );
//     }
    
//     if (activePage.includes('case-details')) {
//       const court = activePage.split('-')[0];
//       return (
//         <ConsumerForumCaseDetailsPage
//           court={court}
//           caseDetailsInput={caseDetailsInput}
//           setCaseDetailsInput={setCaseDetailsInput}
//           handleCaseDetailsSearch={handleCaseDetailsSearch}
//         />
//       );
//     }
    
//     if (activePage.includes('cause-list')) {
//       const court = activePage.split('-')[0];
//       return (
//         <CauseListPage
//           court={court}
//           dateInput={dateInput}
//           setDateInput={setDateInput}
//           handleCauseListSearch={handleCauseListSearch}
//         />
//       );
//     }
    
//     return null;
//   };

//   // Generate court dropdown items based on court ID
//   const renderCourtDropdownItems = (courtId) => {
//     // Special case for District Court with the requested buttons
//     if (courtId === 'district') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-party`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search by Party Name</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-filing` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-filing`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-filing` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Filing Number</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-name` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-advocate-name`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-name` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Advocate Name</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-number` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-advocate-number`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-number` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Advocate Number</span>
//           </button>
//           {/* <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-cause-list` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-cause-list`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-cause-list` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Cause List</span>
//           </button> */}
//         </div>
//       );
//     }

//     // Special case for High Court with four search options
//     if (courtId === 'high') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-party`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search by Party Name</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-filing` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-filing`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-filing` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Filing Number</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-name` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-advocate-name`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-name` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Advocate Name</span>
//           </button>
//         </div>
//       );
//     }
    
//     // Special case for Central Administrative Tribunal (CAT)
//     if (courtId === 'cat') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-party`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search by Party Name</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-name` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-advocate-name`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-name` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Advocate Name</span>
//           </button>
//         </div>
//       );
//     }
    
//     // Special case for NCLT with only party name search
//     if (courtId === 'nclt') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-party`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search by Party Name</span>
//           </button>
//         </div>
//       );
//     }
    
//     // Special case for Consumer Forum with only case details
//     if (courtId === 'consumer') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-case-details` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-case-details`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-case-details` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Case Details</span>
//           </button>
//         </div>
//       );
//     }
    
//     // Default case for other courts (just date and party name search)
//     return (
//       <div className="bg-gray-50 overflow-hidden ml-2">
//         {/* <button 
//           className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-date` ? 'text-blue-600' : 'text-gray-600'}`}
//           onClick={() => setActivePage(`${courtId}-date`)}
//         >
//           <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-date` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//           <span>Orders on Date</span>
//         </button> */}
//         <button 
//           className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//           onClick={() => setActivePage(`${courtId}-party`)}
//         >
//           <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//           <span>Search by Party Name</span>
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="w-52 bg-white flex flex-col shadow-md">
//         {/* App title */}
//         <div className="bg-white-600 p-9 flex items-center justify-center border-b">
//           <h1 className="font-bold text-lg text-white"></h1>
//         </div>
        
//         {/* Home button - navigates to dashboard */}
//         <button 
//           className="flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 text-gray-700"
//           onClick={handleNavigateToDashboard}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//           </svg>
//           <span className="font-medium">Home</span>
//         </button>

//         {/* Welcome button - shows welcome page */}
//         <button 
//           className={`flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${activePage === 'welcome' ? 'text-blue-600 bg-gray-50' : 'text-gray-700'}`}
//           onClick={handleShowWelcomePage}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//           </svg>
//           <span className="font-medium">Welcome</span>
//         </button>

//         {/* Divider */}
//         <div className="mx-4 my-2 border-b border-gray-100"></div>
        
//         {/* Court navigation */}
//         <div className="flex-1 overflow-y-auto px-2">
//           {courts.map((court) => (
//             <div key={court.id} className="mb-1 overflow-hidden">
//               <button 
//                 className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 text-left transition-colors duration-200 ${openDropdown === court.id ? 'bg-gray-50 text-blue-600' : 'text-gray-700'}`}
//                 onClick={() => toggleDropdown(court.id)}
//               >
//                 <span className={`font-medium ${openDropdown === court.id ? 'text-blue-600' : ''}`}>{court.name}</span>
//                 {openDropdown === court.id ? 
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg> : 
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                   </svg>
//                 }
//               </button>
              
//               {/* Dynamic dropdown menu based on court */}
//               {openDropdown === court.id && renderCourtDropdownItems(court.id)}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-y-auto p-4">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default LegalAiResearch;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import DateSearchPage from './components/DateSearchPage';
// import PartySearchPage from './components/PartySearchPage';
// import FilingNumberSearchPage from './components/FilingNumberSearchPage';
// import AdvocateSearchPage from './components/AdvocateSearchPage';
// import DistrictPartySearchPage from './components/DistrictPartySearchPage';
// import DistrictFilingNumberSearchPage from './components/DistrictFilingNumberSearchPage';
// import DistrictAdvocateSearchPage from './components/DistrictAdvocateSearchPage';
// import AdvocateNumberSearchPage from './components/AdvocateNumberSearchPage';
// import CauseListPage from './components/CauseListPage';
// import HighCourtPartySearchPage from './components/HighCourtPartySearchPage';
// import CatPartySearchPage from './components/CatPartySearchPage';
// import CatAdvocateSearchPage from './components/CatAdvocateSearchPage';
// import ConsumerForumCaseDetailsPage from './components/ConsumerForumCaseDetailsPage';
// import NcltPartySearchPage from './components/NcltPartySearchPage';
// import KnowledgePage from './components/KnowledgePage';
// import KnowledgeData from './components/Welcome';
// import FollowedCasesComponent from './components/FollowedCasesComponent';

// const LegalAiResearch = () => {
//   const navigate = useNavigate();
  
//   // State for tracking which dropdown is open
//   const [openDropdown, setOpenDropdown] = useState(null);
//   // State for tracking which page to show
//   const [activePage, setActivePage] = useState('home');
//   // State for date input
//   const [dateInput, setDateInput] = useState('');
//   // State for party name input
//   const [partyNameInput, setPartyNameInput] = useState('');
//   // State for filing number input
//   const [filingNumberInput, setFilingNumberInput] = useState('');
//   // State for advocate name input
//   const [advocateNameInput, setAdvocateNameInput] = useState('');
//   // State for advocate number input
//   const [advocateNumberInput, setAdvocateNumberInput] = useState('');
//   // State for case details input
//   const [caseDetailsInput, setCaseDetailsInput] = useState('');
  
//   // Sample followed cases data - in a real app, this would come from a database or localStorage
//   const [followedCases, setFollowedCases] = useState({
//     'CNR12345': {
//       title: 'State vs John Doe',
//       caseNumber: 'CRL/123/2025',
//       type: 'Criminal',
//       court: 'Supreme Court',
//       followedAt: '2025-04-01T10:30:00'
//     },
//     'CNR67890': {
//       title: 'ABC Corp vs XYZ Ltd',
//       caseNumber: 'CIV/456/2025',
//       type: 'Civil',
//       court: 'High Court',
//       followedAt: '2025-04-02T15:45:00'
//     }
//   });

//   // Court options for sidebar
//   const courts = [
//     { id: 'supreme', name: 'Supreme Court' },
//     { id: 'high', name: 'High Court' },
//     { id: 'district', name: 'District Court' },
//     { id: 'cat', name: 'Central Administrative Tribunal' },
//     { id: 'nclt', name: 'NCLT' },
//     { id: 'consumer', name: 'Consumer Forum' },
//   ];

//   // Toggle dropdown menu
//   const toggleDropdown = (court) => {
//     setOpenDropdown(openDropdown === court ? null : court);
//   };

//   // Handle submitting date search
//   const handleDateSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} orders on date: ${dateInput}`);
//     // Here you would make your POST request with the date
//   };

//   // Handle submitting party name search
//   const handlePartySearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} by party name: ${partyNameInput}`);
//     // Here you would make your POST request with the party name
//   };

//   // Handle submitting filing number search
//   const handleFilingNumberSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} by filing number: ${filingNumberInput}`);
//     // Here you would make your POST request with the filing number
//   };

//   // Handle submitting advocate name search
//   const handleAdvocateSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} by advocate name: ${advocateNameInput}`);
//     // Here you would make your POST request with the advocate name
//   };

//   // Handle submitting advocate number search
//   const handleAdvocateNumberSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} by advocate number: ${advocateNumberInput}`);
//     // Here you would make your POST request with the advocate number
//   };

//   // Handle submitting case details search
//   const handleCaseDetailsSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} case details: ${caseDetailsInput}`);
//     // Here you would make your POST request for case details
//   };

//   // Handle submitting cause list search
//   const handleCauseListSearch = (court, e) => {
//     e.preventDefault();
//     console.log(`Searching ${court} cause list`);
//     // Here you would make your POST request for cause list
//   };

//   // Navigate to dashboard
//   const handleNavigateToDashboard = () => {
//     navigate('/dashboard');
//   };

//   // Show welcome page
//   const handleShowWelcomePage = () => {
//     setActivePage('welcome');
//   };

//   // Show followed cases page
//   const handleShowFollowingPage = () => {
//     setActivePage('following');
//   };

//   // Handle unfollow case
//   const handleUnfollowCase = (cnr) => {
//     // Create a copy of the followedCases object
//     const updatedFollowedCases = { ...followedCases };
//     // Delete the case with the specified CNR
//     delete updatedFollowedCases[cnr];
//     // Update state
//     setFollowedCases(updatedFollowedCases);
//   };

//   // Handle view case details
//   const handleViewCaseDetails = (cnr) => {
//     console.log(`Viewing details for case with CNR: ${cnr}`);
//     // Here you would navigate to a case details page or show a modal
//   };

//   // Handle close followed cases
//   const handleCloseFollowedCases = () => {
//     setActivePage('home');
//   };

//   // Check if search should be shown based on active page
//   const shouldShowSearch = () => {
//     // Only show search on home and welcome pages
//     return activePage === 'home' || activePage === 'welcome';
//   };

//   // Render appropriate content based on activePage
//   const renderContent = () => {
//     if (activePage === 'welcome') {
//       return (
//         <div className="p-6">
//           <KnowledgeData showSearch={true} pageName="welcome" />
//         </div>
//       );
//     }
    
//     if (activePage === 'home') {
//       return <KnowledgeData showSearch={true} pageName="home" />;
//     }
    
//     if (activePage === 'following') {
//       return (
//         <div className="p-6">
//           <FollowedCasesComponent 
//             followedCases={followedCases}
//             onUnfollow={handleUnfollowCase}
//             onViewDetails={handleViewCaseDetails}
//             onClose={handleCloseFollowedCases}
//           />
//         </div>
//       );
//     }
    
//     if (activePage.includes('date')) {
//       const court = activePage.split('-')[0];
//       return (
//         <DateSearchPage 
//           court={court} 
//           dateInput={dateInput} 
//           setDateInput={setDateInput} 
//           handleDateSearch={handleDateSearch} 
//         />
//       );
//     }
    
//     if (activePage.includes('party')) {
//       const court = activePage.split('-')[0];
      
//       // Use different components for specific courts
//       if (court === 'high') {
//         return (
//           <HighCourtPartySearchPage
//             court={court}
//             partyNameInput={partyNameInput}
//             setPartyNameInput={setPartyNameInput}
//             handlePartySearch={handlePartySearch}
//           />
//         );
//       } else if (court === 'district') {
//         return (
//           <DistrictPartySearchPage
//             court={court}
//             partyNameInput={partyNameInput}
//             setPartyNameInput={setPartyNameInput}
//             handlePartySearch={handlePartySearch}
//           />
//         );
//       } else if (court === 'cat') {
//         return (
//           <CatPartySearchPage
//             court={court}
//             partyNameInput={partyNameInput}
//             setPartyNameInput={setPartyNameInput}
//             handlePartySearch={handlePartySearch}
//           />
//         );
//       } else if (court === 'nclt') {
//         return (
//           <NcltPartySearchPage
//             court={court}
//             partyNameInput={partyNameInput}
//             setPartyNameInput={setPartyNameInput}
//             handlePartySearch={handlePartySearch}
//           />
//         );
//       }
      
//       // Use regular component for other courts
//       return (
//         <PartySearchPage 
//           court={court} 
//           partyNameInput={partyNameInput} 
//           setPartyNameInput={setPartyNameInput} 
//           handlePartySearch={handlePartySearch} 
//         />
//       );
//     }
    
//     if (activePage.includes('filing')) {
//       const court = activePage.split('-')[0];
      
//       // Use different component for district court
//       if (court === 'district') {
//         return (
//           <DistrictFilingNumberSearchPage
//             court={court}
//             filingNumberInput={filingNumberInput}
//             setFilingNumberInput={setFilingNumberInput}
//             handleFilingNumberSearch={handleFilingNumberSearch}
//           />
//         );
//       }
      
//       // Use regular component for other courts
//       return (
//         <FilingNumberSearchPage
//           court={court}
//           filingNumberInput={filingNumberInput}
//           setFilingNumberInput={setFilingNumberInput}
//           handleFilingNumberSearch={handleFilingNumberSearch}
//         />
//       );
//     }
    
//     if (activePage.includes('advocate-name')) {
//       const court = activePage.split('-')[0];
      
//       // Use different component for district court or CAT
//       if (court === 'district') {
//         return (
//           <DistrictAdvocateSearchPage
//             court={court}
//             advocateNameInput={advocateNameInput}
//             setAdvocateNameInput={setAdvocateNameInput}
//             handleAdvocateSearch={handleAdvocateSearch}
//           />
//         );
//       } else if (court === 'cat') {
//         return (
//           <CatAdvocateSearchPage
//             court={court}
//             advocateNameInput={advocateNameInput}
//             setAdvocateNameInput={setAdvocateNameInput}
//             handleAdvocateSearch={handleAdvocateSearch}
//           />
//         );
//       }
      
//       // Use regular component for other courts
//       return (
//         <AdvocateSearchPage
//           court={court}
//           advocateNameInput={advocateNameInput}
//           setAdvocateNameInput={setAdvocateNameInput}
//           handleAdvocateSearch={handleAdvocateSearch}
//         />
//       );
//     }
    
//     if (activePage.includes('advocate-number')) {
//       const court = activePage.split('-')[0];
//       return (
//         <AdvocateNumberSearchPage
//           court={court}
//           advocateNumberInput={advocateNumberInput}
//           setAdvocateNumberInput={setAdvocateNumberInput}
//           handleAdvocateNumberSearch={handleAdvocateNumberSearch}
//         />
//       );
//     }
    
//     if (activePage.includes('case-details')) {
//       const court = activePage.split('-')[0];
//       return (
//         <ConsumerForumCaseDetailsPage
//           court={court}
//           caseDetailsInput={caseDetailsInput}
//           setCaseDetailsInput={setCaseDetailsInput}
//           handleCaseDetailsSearch={handleCaseDetailsSearch}
//         />
//       );
//     }
    
//     if (activePage.includes('cause-list')) {
//       const court = activePage.split('-')[0];
//       return (
//         <CauseListPage
//           court={court}
//           dateInput={dateInput}
//           setDateInput={setDateInput}
//           handleCauseListSearch={handleCauseListSearch}
//         />
//       );
//     }
    
//     return null;
//   };

//   // Generate court dropdown items based on court ID
//   const renderCourtDropdownItems = (courtId) => {
//     // Special case for District Court with the requested buttons
//     if (courtId === 'district') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-party`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search by Party Name</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-filing` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-filing`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-filing` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Filing Number</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-name` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-advocate-name`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-name` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Advocate Name</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-number` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-advocate-number`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-number` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Advocate Number</span>
//           </button>
//         </div>
//       );
//     }

//     // Special case for High Court with four search options
//     if (courtId === 'high') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-party`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search by Party Name</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-filing` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-filing`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-filing` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Filing Number</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-name` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-advocate-name`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-name` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Advocate Name</span>
//           </button>
//         </div>
//       );
//     }
    
//     // Special case for Central Administrative Tribunal (CAT)
//     if (courtId === 'cat') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-party`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search by Party Name</span>
//           </button>
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-name` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-advocate-name`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-name` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search Advocate Name</span>
//           </button>
//         </div>
//       );
//     }
    
//     // Special case for NCLT with only party name search
//     if (courtId === 'nclt') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-party`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Search by Party Name</span>
//           </button>
//         </div>
//       );
//     }
    
//     // Special case for Consumer Forum with only case details
//     if (courtId === 'consumer') {
//       return (
//         <div className="bg-gray-50 overflow-hidden ml-2">
//           <button 
//             className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-case-details` ? 'text-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActivePage(`${courtId}-case-details`)}
//           >
//             <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-case-details` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//             <span>Case Details</span>
//           </button>
//         </div>
//       );
//     }
    
//     // Default case for other courts (just date and party name search)
//     return (
//       <div className="bg-gray-50 overflow-hidden ml-2">
//         <button 
//           className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
//           onClick={() => setActivePage(`${courtId}-party`)}
//         >
//           <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
//           <span>Search by Party Name</span>
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="w-52 bg-white flex flex-col shadow-md">
//         {/* App title */}
//         <div className="bg-white-600 p-9 flex items-center justify-center border-b">
//           <h1 className="font-bold text-lg text-white"></h1>
//         </div>
        
//         {/* Home button - navigates to dashboard */}
//         <button 
//           className="flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 text-gray-700"
//           onClick={handleNavigateToDashboard}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//           </svg>
//           <span className="font-medium">Home</span>
//         </button>

//         {/* Welcome button - shows welcome page */}
//         <button 
//           className={`flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${activePage === 'welcome' ? 'text-blue-600 bg-gray-50' : 'text-gray-700'}`}
//           onClick={handleShowWelcomePage}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//           </svg>
//           <span className="font-medium">Welcome</span>
//         </button>

//         {/* Following button - shows followed cases */}
//         <button 
//           className={`flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${activePage === 'following' ? 'text-blue-600 bg-gray-50' : 'text-gray-700'}`}
//           onClick={handleShowFollowingPage}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
//           </svg>
//           <span className="font-medium">Following</span>
//         </button>

//         {/* Divider */}
//         <div className="mx-4 my-2 border-b border-gray-100"></div>
        
//         {/* Court navigation */}
//         <div className="flex-1 overflow-y-auto px-2">
//           {courts.map((court) => (
//             <div key={court.id} className="mb-1 overflow-hidden">
//               <button 
//                 className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 text-left transition-colors duration-200 ${openDropdown === court.id ? 'bg-gray-50 text-blue-600' : 'text-gray-700'}`}
//                 onClick={() => toggleDropdown(court.id)}
//               >
//                 <span className={`font-medium ${openDropdown === court.id ? 'text-blue-600' : ''}`}>{court.name}</span>
//                 {openDropdown === court.id ? 
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg> : 
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                   </svg>
//                 }
//               </button>
              
//               {/* Dynamic dropdown menu based on court */}
//               {openDropdown === court.id && renderCourtDropdownItems(court.id)}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-y-auto p-4">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default LegalAiResearch;



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DateSearchPage from './components/DateSearchPage';
import PartySearchPage from './components/PartySearchPage';
import FilingNumberSearchPage from './components/FilingNumberSearchPage';
import AdvocateSearchPage from './components/AdvocateSearchPage';
import DistrictPartySearchPage from './components/DistrictPartySearchPage';
import DistrictFilingNumberSearchPage from './components/DistrictFilingNumberSearchPage';
import DistrictAdvocateSearchPage from './components/DistrictAdvocateSearchPage';
import AdvocateNumberSearchPage from './components/AdvocateNumberSearchPage';
import CauseListPage from './components/CauseListPage';
import HighCourtPartySearchPage from './components/HighCourtPartySearchPage';
import CatPartySearchPage from './components/CatPartySearchPage';
import CatAdvocateSearchPage from './components/CatAdvocateSearchPage';
import ConsumerForumCaseDetailsPage from './components/ConsumerForumCaseDetailsPage';
import NcltPartySearchPage from './components/NcltPartySearchPage';
import KnowledgePage from './components/KnowledgePage';
import KnowledgeData from './components/Welcome';
import FollowedCasesComponent from './components/FollowedCasesComponent';
import Cart from './components/Cart';
import CartPage from './components/Cart';

const LegalAiResearch = () => {
  const navigate = useNavigate();
  
  // State for tracking which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);
  // State for tracking which page to show
  const [activePage, setActivePage] = useState('home');
  // State for date input
  const [dateInput, setDateInput] = useState('');
  // State for party name input
  const [partyNameInput, setPartyNameInput] = useState('');
  // State for filing number input
  const [filingNumberInput, setFilingNumberInput] = useState('');
  // State for advocate name input
  const [advocateNameInput, setAdvocateNameInput] = useState('');
  // State for advocate number input
  const [advocateNumberInput, setAdvocateNumberInput] = useState('');
  // State for case details input
  const [caseDetailsInput, setCaseDetailsInput] = useState('');
  // State for cart items (replacing followedCases)
  const [cartItems, setCartItems] = useState({});

  // Court options for sidebar
  const courts = [
    { id: 'supreme', name: 'Supreme Court' },
    { id: 'high', name: 'High Court' },
    { id: 'district', name: 'District Court' },
    { id: 'cat', name: 'Central Administrative Tribunal' },
    { id: 'nclt', name: 'NCLT' },
    { id: 'consumer', name: 'Consumer Forum' },
  ];

  // Toggle dropdown menu
  const toggleDropdown = (court) => {
    setOpenDropdown(openDropdown === court ? null : court);
  };

  // Handle submitting date search
  const handleDateSearch = (court, e) => {
    e.preventDefault();
    console.log(`Searching ${court} orders on date: ${dateInput}`);
    // Here you would make your POST request with the date
  };

  // Handle submitting party name search
  const handlePartySearch = (court, e) => {
    e.preventDefault();
    console.log(`Searching ${court} by party name: ${partyNameInput}`);
    // Here you would make your POST request with the party name
  };

  // Handle submitting filing number search
  const handleFilingNumberSearch = (court, e) => {
    e.preventDefault();
    console.log(`Searching ${court} by filing number: ${filingNumberInput}`);
    // Here you would make your POST request with the filing number
  };

  // Handle submitting advocate name search
  const handleAdvocateSearch = (court, e) => {
    e.preventDefault();
    console.log(`Searching ${court} by advocate name: ${advocateNameInput}`);
    // Here you would make your POST request with the advocate name
  };

  // Handle submitting advocate number search
  const handleAdvocateNumberSearch = (court, e) => {
    e.preventDefault();
    console.log(`Searching ${court} by advocate number: ${advocateNumberInput}`);
    // Here you would make your POST request with the advocate number
  };

  // Handle submitting case details search
  const handleCaseDetailsSearch = (court, e) => {
    e.preventDefault();
    console.log(`Searching ${court} case details: ${caseDetailsInput}`);
    // Here you would make your POST request for case details
  };

  // Handle submitting cause list search
  const handleCauseListSearch = (court, e) => {
    e.preventDefault();
    console.log(`Searching ${court} cause list`);
    // Here you would make your POST request for cause list
  };

  // Navigate to dashboard
  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };

  // Show welcome page
  const handleShowWelcomePage = () => {
    setActivePage('welcome');
  };

  // Show followed cases page
  const handleShowFollowingPage = () => {
    // navigate('/cart');
    // setActivePage('cart');
    setActivePage('following');
    
  };

  // Handle unfollow case
  const handleUnfollowCase = (caseId) => {
    const newCartItems = { ...cartItems };
    delete newCartItems[caseId];
    setCartItems(newCartItems);
  };

  // Handle view case details
  const handleViewCaseDetails = (caseId) => {
    console.log(`Viewing details for case with ID: ${caseId}`);
    // Here you would navigate to a case details page or show a modal
  };

  // Handle close followed cases
  const handleCloseFollowedCases = () => {
    setActivePage('home');
  };

  // Check if search should be shown based on active page
  const shouldShowSearch = () => {
    // Only show search on home and welcome pages
    return activePage === 'home' || activePage === 'welcome';
  };

  // Render appropriate content based on activePage
  const renderContent = () => {
    if (activePage === 'welcome') {
      return (
        <div className="p-6">
          <KnowledgeData showSearch={true} pageName="welcome" />
        </div>
      );
    }
    
    if (activePage === 'home') {
      return <KnowledgeData showSearch={true} pageName="home" />;
    }
    
    if (activePage === 'following') {
      return (
        <div className="p-6">
          <CartPage />
        </div>
      );
    }
    
    if (activePage.includes('date')) {
      const court = activePage.split('-')[0];
      return (
        <DateSearchPage 
          court={court} 
          dateInput={dateInput} 
          setDateInput={setDateInput} 
          handleDateSearch={handleDateSearch} 
        />
      );
    }
    
    if (activePage.includes('party')) {
      const court = activePage.split('-')[0];
      
      // Use different components for specific courts with cart functionality
      if (court === 'high') {
        return (
          <HighCourtPartySearchPage
            court={court}
            partyNameInput={partyNameInput}
            setPartyNameInput={setPartyNameInput}
            handlePartySearch={handlePartySearch}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        );
      } else if (court === 'district') {
        return (
          <DistrictPartySearchPage
            court={court}
            partyNameInput={partyNameInput}
            setPartyNameInput={setPartyNameInput}
            handlePartySearch={handlePartySearch}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        );
      } else if (court === 'cat') {
        return (
          <CatPartySearchPage
            court={court}
            partyNameInput={partyNameInput}
            setPartyNameInput={setPartyNameInput}
            handlePartySearch={handlePartySearch}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        );
      } else if (court === 'nclt') {
        return (
          <NcltPartySearchPage
            court={court}
            partyNameInput={partyNameInput}
            setPartyNameInput={setPartyNameInput}
            handlePartySearch={handlePartySearch}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        );
      }
      
      // Default Supreme Court party search
      return (
        <PartySearchPage 
          court={court} 
          partyNameInput={partyNameInput} 
          setPartyNameInput={setPartyNameInput} 
          handlePartySearch={handlePartySearch}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      );
    }
    
    if (activePage.includes('filing')) {
      const court = activePage.split('-')[0];
      
      if (court === 'district') {
        return (
          <DistrictFilingNumberSearchPage
            court={court}
            filingNumberInput={filingNumberInput}
            setFilingNumberInput={setFilingNumberInput}
            handleFilingNumberSearch={handleFilingNumberSearch}
          />
        );
      }
      
      return (
        <FilingNumberSearchPage
          court={court}
          filingNumberInput={filingNumberInput}
          setFilingNumberInput={setFilingNumberInput}
          handleFilingNumberSearch={handleFilingNumberSearch}
        />
      );
    }
    
    if (activePage.includes('advocate-name')) {
      const court = activePage.split('-')[0];
      
      if (court === 'district') {
        return (
          <DistrictAdvocateSearchPage
            court={court}
            advocateNameInput={advocateNameInput}
            setAdvocateNameInput={setAdvocateNameInput}
            handleAdvocateSearch={handleAdvocateSearch}
          />
        );
      } else if (court === 'cat') {
        return (
          <CatAdvocateSearchPage
            court={court}
            advocateNameInput={advocateNameInput}
            setAdvocateNameInput={setAdvocateNameInput}
            handleAdvocateSearch={handleAdvocateSearch}
          />
        );
      }
      
      return (
        <AdvocateSearchPage
          court={court}
          advocateNameInput={advocateNameInput}
          setAdvocateNameInput={setAdvocateNameInput}
          handleAdvocateSearch={handleAdvocateSearch}
        />
      );
    }
    
    if (activePage.includes('advocate-number')) {
      const court = activePage.split('-')[0];
      return (
        <AdvocateNumberSearchPage
          court={court}
          advocateNumberInput={advocateNumberInput}
          setAdvocateNumberInput={setAdvocateNumberInput}
          handleAdvocateNumberSearch={handleAdvocateNumberSearch}
        />
      );
    }
    
    if (activePage.includes('case-details')) {
      const court = activePage.split('-')[0];
      return (
        <ConsumerForumCaseDetailsPage
          court={court}
          caseDetailsInput={caseDetailsInput}
          setCaseDetailsInput={setCaseDetailsInput}
          handleCaseDetailsSearch={handleCaseDetailsSearch}
        />
      );
    }
    
    if (activePage.includes('cause-list')) {
      const court = activePage.split('-')[0];
      return (
        <CauseListPage
          court={court}
          dateInput={dateInput}
          setDateInput={setDateInput}
          handleCauseListSearch={handleCauseListSearch}
        />
      );
    }
    
    return null;
  };

  // Generate court dropdown items based on court ID
  const renderCourtDropdownItems = (courtId) => {
    if (courtId === 'district') {
      return (
        <div className="bg-gray-50 overflow-hidden ml-2">
          <button 
            className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActivePage(`${courtId}-party`)}
          >
            <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
            <span>Search by Party Name</span>
          </button>
          <button 
            className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-filing` ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActivePage(`${courtId}-filing`)}
          >
            <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-filing` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
            <span>Search Filing Number</span>
          </button>
          <button 
            className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-name` ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActivePage(`${courtId}-advocate-name`)}
          >
            <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-name` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
            <span>Search Advocate Name</span>
          </button>
          <button 
            className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-number` ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActivePage(`${courtId}-advocate-number`)}
          >
            <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-number` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
            <span>Search Advocate Number</span>
          </button>
        </div>
      );
    }

    if (courtId === 'high') {
      return (
        <div className="bg-gray-50 overflow-hidden ml-2">
          <button 
            className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActivePage(`${courtId}-party`)}
          >
            <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
            <span>Search by Party Name</span>
          </button>
          <button 
            className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-filing` ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActivePage(`${courtId}-filing`)}
          >
            <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-filing` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
            <span>Search Filing Number</span>
          </button>
          <button 
            className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-name` ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActivePage(`${courtId}-advocate-name`)}
          >
            <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-name` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
            <span>Search Advocate Name</span>
          </button>
        </div>
      );
    }
    
    if (courtId === 'cat') {
      return (
        <div className="bg-gray-50 overflow-hidden ml-2">
          <button 
            className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActivePage(`${courtId}-party`)}
          >
            <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
            <span>Search by Party Name</span>
          </button>
          <button 
            className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-advocate-name` ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActivePage(`${courtId}-advocate-name`)}
          >
            <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-advocate-name` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
            <span>Search Advocate Name</span>
          </button>
        </div>
      );
    }
    
    if (courtId === 'nclt') {
      return (
        <div className="bg-gray-50 overflow-hidden ml-2">
          <button 
            className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActivePage(`${courtId}-party`)}
          >
            <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
            <span>Search by Party Name</span>
          </button>
        </div>
      );
    }
    
    if (courtId === 'consumer') {
      return (
        <div className="bg-gray-50 overflow-hidden ml-2">
          <button 
            className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-case-details` ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActivePage(`${courtId}-case-details`)}
          >
            <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-case-details` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
            <span>Case Details</span>
          </button>
        </div>
      );
    }
    
    return (
      <div className="bg-gray-50 overflow-hidden ml-2">
        <button 
          className={`w-full px-6 py-3 text-left hover:bg-gray-100 text-sm flex items-center space-x-2 transition-colors ${activePage === `${courtId}-party` ? 'text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActivePage(`${courtId}-party`)}
        >
          <div className={`w-1 h-1 rounded-full ${activePage === `${courtId}-party` ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
          <span>Search by Party Name</span>
        </button>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-52 bg-white flex flex-col shadow-md">
        {/* App title */}
        <div className="bg-white-600 p-9 flex items-center justify-center border-b">
          <h1 className="font-bold text-lg text-white"></h1>
        </div>
        
        {/* Home button - navigates to dashboard */}
        <button 
          className="flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 text-gray-700"
          onClick={handleNavigateToDashboard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="font-medium">Home</span>
        </button>

        {/* Welcome button - shows welcome page */}
        <button 
          className={`flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${activePage === 'welcome' ? 'text-blue-600 bg-gray-50' : 'text-gray-700'}`}
          onClick={handleShowWelcomePage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Welcome</span>
        </button>

        {/* Following button - shows followed cases */}
        
        {/* <Link to={"/cart"} > */}
        <button 
          className={`flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${activePage === 'following' ? 'text-blue-600 bg-gray-50' : 'text-gray-700'}`}
          onClick={handleShowFollowingPage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          <span className="font-medium">Following</span>
        </button>
        {/* </Link> */}

        {/* Divider */}
        <div className="mx-4 my-2 border-b border-gray-100"></div>
        
        {/* Court navigation */}
        <div className="flex-1 overflow-y-auto px-2">
          {courts.map((court) => (
            <div key={court.id} className="mb-1 overflow-hidden">
              <button 
                className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 text-left transition-colors duration-200 ${openDropdown === court.id ? 'bg-gray-50 text-blue-600' : 'text-gray-700'}`}
                onClick={() => toggleDropdown(court.id)}
              >
                <span className={`font-medium ${openDropdown === court.id ? 'text-blue-600' : ''}`}>{court.name}</span>
                {openDropdown === court.id ? 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg> : 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                }
              </button>
              
              {/* Dynamic dropdown menu based on court */}
              {openDropdown === court.id && renderCourtDropdownItems(court.id)}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default LegalAiResearch;