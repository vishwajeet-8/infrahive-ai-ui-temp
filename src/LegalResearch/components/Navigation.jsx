import React from 'react';
import { ChevronRight } from 'lucide-react';

const Navigation = ({
  activeView, setActiveView, courtType, setCourtType,
  selectedCourt, setSelectedCourt, selectedCase, resetSearch
}) => {
  return (
    <div className="bg-gray-100 p-3 rounded-md mb-4">
      <div className="flex items-center text-sm text-gray-600">
        <button 
          className="hover:text-blue-600 font-medium"
          onClick={() => {
            setActiveView('courts');
            setSelectedCourt(null);
            resetSearch();
          }}
        >
          Dashboard
        </button>
        
        {courtType !== 'all' && (
          <>
            <ChevronRight className="h-4 w-4 mx-1" />
            <button 
              className="hover:text-blue-600 font-medium"
              onClick={() => {
                setCourtType('all');
              }}
            >
              {courtType === 'supreme' ? 'Supreme Court' : 'High Courts'}
            </button>
          </>
        )}
        
        {selectedCourt && (
          <>
            <ChevronRight className="h-4 w-4 mx-1" />
            <button 
              className="hover:text-blue-600 font-medium"
              onClick={() => setActiveView('benches')}
            >
              {selectedCourt.name}
            </button>
          </>
        )}
        
        {activeView === 'searchResults' && (
          <>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Search Results</span>
          </>
        )}
        
        {activeView === 'caseDetail' && (
          <>
            {activeView === 'searchResults' ? (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <button 
                  className="hover:text-blue-600 font-medium"
                  onClick={() => setActiveView('searchResults')}
                >
                  Search Results
                </button>
              </>
            ) : null}
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="truncate max-w-xs">{selectedCase.diaryNumber}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;