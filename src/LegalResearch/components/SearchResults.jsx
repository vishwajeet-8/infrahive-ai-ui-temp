import React from 'react';
import { Calendar, Clock, FileText } from 'lucide-react';

const SearchResults = ({ searchResults, handleCaseSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold p-4 border-b flex items-center justify-between">
        <span>Search Results</span>
        <span className="text-sm font-normal text-gray-500">Found {searchResults.length} cases</span>
      </h2>
      
      {searchResults.length > 0 ? (
        <div className="divide-y">
          {searchResults.map(caseItem => (
            <div 
              key={caseItem.diaryNumber}
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleCaseSelect(caseItem)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{caseItem.title}</h3>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{caseItem.diaryNumber}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Filed: {caseItem.filingDate}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    caseItem.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    caseItem.status === 'Listed' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {caseItem.status}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <div className="flex items-center text-blue-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Next Hearing: {caseItem.hearingDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          No results found. Please try a different search.
        </div>
      )}
    </div>
  );
};

export default SearchResults;