import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Slider from "../../components/Slider"; // Import the Slider component - adjust path if needed

// Knowledge data embedded directly in this file
const knowledgeData = [
  { id: 1, name: "Supreme Court", image: "assets/legal-knowledge/1.png", url: "" },
  { id: 2, name: "High Court", image: "assets/legal-knowledge/2.jpg", url: "" },
  { id: 3, name: "District Court", image: "assets/legal-knowledge/3.jpg", url: "" },
  { id: 4, name: "NCLT", image: "assets/legal-knowledge/4.png", url: "" },
  { id: 5, name: "Consumer Forum", image: "assets/legal-knowledge/5.png", url: "" },
  { id: 7, name: "RBI", image: "assets/legal-knowledge/7.png", url: "/integration/rbi-chat" },
  { id: 8, name: "SEBI", image: "assets/legal-knowledge/8.png", url: "" },
  { id: 16, name: "NCLAT", image: "assets/legal-knowledge/16.png", url: "" },
  { id: 9, name: "MCA", image: "assets/legal-knowledge/9.jpg", url: "" },
  { id: 10, name: "EPFO", image: "assets/legal-knowledge/10.png", url: "" },
  { id: 11, name: "FSSAI", image: "assets/legal-knowledge/11.png", url: "" },
  { id: 12, name: "Cybersafe", image: "assets/legal-knowledge/12.jpeg", url: "" },
  { id: 14, name: "Voter", image: "assets/legal-knowledge/14.png", url: "" },
  { id: 15, name: "Vehicle Number", image: "assets/legal-knowledge/15.png", url: "" },
  { id: "oneclechat", name: "onecle", image: "assets/knowledge/onecle.svg", url: "/oneclechat" }
];

// Sample domain data that mimics the search results shown in the image
const domainData = [
  {
    id: 1,
    domain: "writesonic.com",
    letter: "W",
    information: "Writesonic - AI Article Writer & AI Marketing Agent",
    description: "Research, create content that humans love to read, optimize for SEO, and publish on one platform. Automate marketing workflows with your AI Marketing Agent and AI Article Writer.",
    similarity: 94.8
  },
  {
    id: 2,
    domain: "textify.ai",
    letter: "T",
    information: "Textify Analytics - Affordable Insights at the Speed of AI",
    description: "Unlock the power of your data with Textify Analytics! Leverage cutting-edge generative AI to enhance your analytics capabilities.",
    similarity: 70.3
  },
  {
    id: 3,
    domain: "vengreso.com",
    letter: "V",
    information: "FlyMSG: AI Writer, Text Expander, & AI Sales Prospecting Tools",
    description: "FlyMSG is an AI writer, text expander, sales training & sales prospecting tool used to connect with customers & save sellers 1 hr. per day.",
    similarity: 66.6
  },
  {
    id: 4,
    domain: "legalai.tech",
    letter: "L",
    information: "Legal AI - AI-powered legal research assistant",
    description: "Simplify legal research with AI-powered tools and document analysis to save time and improve accuracy.",
    similarity: 62.4
  },
  {
    id: 5,
    domain: "courtbench.io",
    letter: "C",
    information: "CourtBench - AI Legal Document Analysis",
    description: "Analyze court cases and legal documents in seconds with AI-powered insights and summaries.",
    similarity: 58.9
  }
];

const KnowledgePage = ({ data, showSearch = true, pageName = "home" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null); // Track selected card
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Display skeleton for 500ms

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  // Handle search input changes and trigger search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setIsSearchMode(false);
      setSearchResults([]);
      return;
    }

    setIsSearchMode(true);
    setIsLoading(true);

    // Simulate search delay
    const timer = setTimeout(() => {
      // Filter domains based on search query
      const results = domainData.filter(
        domain =>
          domain.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
          domain.information.toLowerCase().includes(searchQuery.toLowerCase()) ||
          domain.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Sort by similarity score (highest first)
      const sortedResults = [...results].sort((a, b) => b.similarity - a.similarity);
      
      setSearchResults(sortedResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleCardClick = (card) => {
    console.log("Selected card clicked", card);
    if (card.url) {
      window.location.href = card.url;
    } else {
      setSelectedCard(card); // Set the selected card, which opens the slider
    }
  };

  const handleCloseSlider = () => {
    setSelectedCard(null); // Reset selected card, which closes the slider
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Use knowledgeData if no data is provided
  const displayData = Array.isArray(data) && data.length > 0 ? data : knowledgeData;

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      {/* Header Section */}
      {/* <div className="flex justify-between items-center px-16 py-6 bg-white shadow-sm">
        <p className="text-xl font-semibold text-gray-800">Knowledge Management</p>
      </div> */}

      {/* Search Input - Only show if showSearch prop is true */}
      {/* {showSearch && (
        <div className="px-16 py-4">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for domains, tools, or services..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <svg
              className="absolute right-3 top-3 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      )} */}

      {/* Description Section - show only in normal mode */}
      {!isSearchMode && (
        <p className="px-16 py-4 text-gray-600 text-base">
          InfraHive Legal AI works best when you can search across all the tools
          you and your team use every day. Connect all data sources you need by
          clicking on each and following the steps shown.
        </p>
      )}

      {/* Content Section */}
      <div className="flex-1 overflow-y-auto px-16 py-4">
        {/* Search Results View - Only shown when search is active and enabled */}
        {showSearch && isSearchMode && (
          <div className="bg-white rounded-lg shadow-md">
            {/* Header */}
            <div className="border-b border-gray-200">
              <div className="p-4">
                <h2 className="text-xl font-medium text-gray-700">Similar Domains</h2>
                <p className="text-sm text-gray-500">Ordered by similarity score</p>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
              <div className="col-span-3 text-sm font-medium text-gray-500">DOMAIN</div>
              <div className="col-span-6 text-sm font-medium text-gray-500">INFORMATION</div>
              <div className="col-span-2 text-sm font-medium text-gray-500">SIMILARITY</div>
              <div className="col-span-1 text-sm font-medium text-gray-500">ACTIONS</div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-500"></div>
                <p className="mt-2 text-gray-600">Searching...</p>
              </div>
            )}

            {/* No Results */}
            {!isLoading && searchResults.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-600">No matching domains found.</p>
              </div>
            )}

            {/* Results List */}
            {!isLoading &&
              searchResults.map((result) => (
                <div
                  key={result.id}
                  className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50"
                >
                  {/* Domain Column */}
                  <div className="col-span-3 flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold">{result.letter}</span>
                    </div>
                    <span className="text-gray-700">{result.domain}</span>
                  </div>

                  {/* Information Column */}
                  <div className="col-span-6">
                    <p className="text-gray-700 font-medium mb-1">{result.information}</p>
                    <p className="text-sm text-gray-500">{result.description}</p>
                  </div>

                  {/* Similarity Column */}
                  <div className="col-span-2 flex items-center">
                    <div className={`h-2 w-2 rounded-full mr-2 ${
                      result.similarity > 85 ? 'bg-green-500' : 
                      result.similarity > 60 ? 'bg-blue-500' : 
                      'bg-gray-500'
                    }`}></div>
                    <span className="text-gray-700">{result.similarity}%</span>
                  </div>

                  {/* Actions Column */}
                  <div className="col-span-1 flex items-center justify-center">
                    <button className="text-blue-500 hover:text-blue-700">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Normal Cards View - show when not in search mode or search is disabled */}
        {(!isSearchMode || !showSearch) && (
          <div className="flex flex-wrap gap-6 ml-auto mr-auto justify-center">
            {isLoading
              ? // Skeleton loading cards
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full md:w-[30%] flex items-center border border-[#e0e0e0] rounded-lg p-4 bg-gray-200 animate-pulse"
                  >
                    <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                    <div className="flex-1 h-6 bg-gray-300 rounded"></div>
                  </div>
                ))
              : // Render cards from displayData
                displayData.map((item) => (
                  item.url ? (
                    <NavLink 
                      to={item.url} 
                      key={item.id || `item-${Math.random()}`} 
                      className="w-full md:w-[30%] flex items-center border border-[#c7c7c7] rounded-lg p-4 transition-all duration-300 hover:border-blue-500 cursor-pointer bg-white"
                    >
                      <img
                        src={item.image}
                        alt={item.name || ""}
                        className="w-16 h-16 object-contain mr-4"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const div = document.createElement('div');
                          div.className = "w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full mr-4";
                          const span = document.createElement('span');
                          span.className = "text-2xl font-bold text-gray-600";
                          span.textContent = item.name ? item.name.charAt(0).toUpperCase() : 'C';
                          div.appendChild(span);
                          e.target.parentNode.insertBefore(div, e.target);
                        }}
                      />
                      <h3 className="text-lg font-semibold text-gray-700 overflow-hidden">
                        {item.name || "Unnamed Item"}
                      </h3>
                    </NavLink>
                  ) : (
                    <div
                      key={item.id || `item-${Math.random()}`}
                      className="w-full md:w-[30%] flex items-center border border-[#c7c7c7] rounded-lg p-4 transition-all duration-300 hover:border-blue-500 cursor-pointer bg-white"
                      onClick={() => handleCardClick(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.name || ""}
                        className="w-16 h-16 object-contain mr-4"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const div = document.createElement('div');
                          div.className = "w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full mr-4";
                          const span = document.createElement('span');
                          span.className = "text-2xl font-bold text-gray-600";
                          span.textContent = item.name ? item.name.charAt(0).toUpperCase() : 'C';
                          div.appendChild(span);
                          e.target.parentNode.insertBefore(div, e.target);
                        }}
                      />
                      <h3 className="text-lg font-semibold text-gray-700 overflow-hidden">
                        {item.name || "Unnamed Item"}
                      </h3>
                    </div>
                  )
                ))
              }
          </div>
        )}
      </div>

      {/* Slider for Detailed View */}
      {selectedCard && (
        <Slider
          selectedApp={selectedCard}
          onClose={handleCloseSlider}
        />
      )}
    </div>
  );
};

export default KnowledgePage;



// import React, { useState } from 'react';
// import { Search } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';

// const KnowledgePage = () => {
//   const [query, setQuery] = useState('');
//   const [category, setCategory] = useState('');
//   const [searchResults, setSearchResults] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const categories = [
//     { id: 'constitutional', name: 'Constitutional Law' },
//     { id: 'civil', name: 'Civil Law' },
//     { id: 'criminal', name: 'Criminal Law' },
//     { id: 'corporate', name: 'Corporate Law' },
//     { id: 'tax', name: 'Tax Law' },
//     { id: 'intellectual', name: 'Intellectual Property' },
//     { id: 'environmental', name: 'Environmental Law' },
//     { id: 'family', name: 'Family Law' },
//     { id: 'arbitration', name: 'Arbitration' },
//     { id: 'labor', name: 'Labor Law' }
//   ];

//   const handleSearch = async (e) => {
//     e.preventDefault();
    
//     if (!query.trim()) {
//       setError("Please enter a search query");
//       return;
//     }
    
//     setIsLoading(true);
//     setError(null);
//     setSearchResults(null);
    
//     try {
//       const requestBody = {
//         query: query,
//         category: category || undefined
//       };
      
//       const response = await fetch("https://infrahive-ai-legal-research-gyfsavdfd0c9ehh5.centralindia-01.azurewebsites.net/legal-infrahive/indiakanoon/", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'ECIAPI-XXaRks8npWTVUXpFpYc6nGj88cwPMq25', // Replace with your token
//         },
//         body: JSON.stringify(requestBody),
//       });
      
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (err) {
//       setError(err.message);
//       console.error('Search error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <div className="flex justify-center mb-2">
//             <span className="text-sm text-blue-600 font-medium">Knowledge</span>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Research Assistant</h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Find relevant legal judgments, statutes, and precedents with our advanced legal search capabilities
//           </p>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
//           <form onSubmit={handleSearch} className="p-6">
//             <div className="flex flex-col md:flex-row gap-4 items-stretch">
//               <div className="relative flex-grow">
//                 <div className="relative">
//                   <select
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white"
//                   >
//                     <option value="">All Categories</option>
//                     {categories.map((cat) => (
//                       <option key={cat.id} value={cat.id}>{cat.name}</option>
//                     ))}
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                       <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex-grow relative">
//                 <input
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search legal cases, statutes, or topics..."
//                   className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
//                 />
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Searching...
//                   </div>
//                 ) : (
//                   <>
//                     <Search className="mr-2 h-5 w-5" />
//                     Search
//                   </>
//                 )}
//               </button>
//             </div>
            
//             <div className="mt-2 text-sm text-gray-500">
//               Try searching for a legal topic, case name, or specific legal question
//             </div>
//           </form>
//         </div>
        
//         {error && (
//           <div className="mb-8 p-4 bg-red-50 rounded-md border border-red-200">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">
//                   {error}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {isLoading && (
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Searching for legal information...</p>
//           </div>
//         )}
        
//         {searchResults && (
//           <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-900">Search Results</h2>
//                 <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
//                   AI Generated Content
//                 </span>
//               </div>
              
//               <div className="prose max-w-none">
//                 {searchResults.response ? (
//                   <ReactMarkdown>
//                     {searchResults.response}
//                   </ReactMarkdown>
//                 ) : (
//                   <p className="text-gray-600">No results found for your query. Please try a different search term or category.</p>
//                 )}
//               </div>
              
//               <div className="mt-6 border-t border-gray-200 pt-4">
//                 <p className="text-sm text-gray-500">
//                   Results based on legal precedents and case law from Indian courts and legal databases.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {!isLoading && !searchResults && !error && (
//           <div className="bg-white rounded-xl shadow-md overflow-hidden">
//             <div className="p-6">
//               <div className="text-center py-8">
//                 <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                   <Search className="h-12 w-12 text-blue-600" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Legal Research</h3>
//                 <p className="text-gray-600 max-w-md mx-auto">
//                   Enter a search query about legal topics, cases, or questions to get AI-powered insights from legal databases.
//                 </p>
//               </div>
              
//               <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="bg-gray-50 p-4 rounded-md">
//                   <h4 className="font-medium text-gray-900 mb-2">Example Searches</h4>
//                   <ul className="space-y-2 text-sm text-gray-600">
//                     <li>"Landmark judgments on privacy in India"</li>
//                     <li>"Doctrine of merger in corporate law"</li>
//                     <li>"Recent Supreme Court decisions on arbitration"</li>
//                   </ul>
//                 </div>
                
//                 <div className="bg-gray-50 p-4 rounded-md">
//                   <h4 className="font-medium text-gray-900 mb-2">Search Tips</h4>
//                   <ul className="space-y-2 text-sm text-gray-600">
//                     <li>Use specific case names for precise results</li>
//                     <li>Include year ranges for time-specific searches</li>
//                     <li>Select a category to narrow your results</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default KnowledgePage;