import React from 'react';
import { Calendar, FileText, User } from 'lucide-react';

const SearchBar = ({
  searchType, setSearchType, courtType, setCourtType,
  partyName, setPartyName, searchYear, setSearchYear,
  diaryNumber, setDiaryNumber, handleSearch, resetSearch
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex rounded-md overflow-hidden border border-gray-300">
          <button
            className={`px-4 py-2 ${searchType === 'partyName' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => setSearchType('partyName')}
          >
            Search by Party Name
          </button>
          <button
            className={`px-4 py-2 ${searchType === 'diaryNumber' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => setSearchType('diaryNumber')}
          >
            Search by Diary Number
          </button>
        </div>
        
        <div className="ml-auto">
          <select 
            className="px-4 py-2 border border-gray-300 rounded-md bg-white"
            value={courtType !== 'all' ? courtType : ''}
            onChange={(e) => {
              if (e.target.value === '') {
                setCourtType('all');
              } else {
                setCourtType(e.target.value);
              }
            }}
          >
            <option value="">All Courts</option>
            <option value="supreme">Supreme Court Only</option>
            <option value="high">High Courts Only</option>
          </select>
        </div>
      </div>
      
      {searchType === 'partyName' ? (
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">Party Name</label>
            <div className="relative">
              <input
                type="text"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                placeholder="e.g. Sharma, Patel"
                className="w-full px-4 py-2 border rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <div className="relative">
              <input
                type="text"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
                placeholder="YYYY"
                className="w-full px-4 py-2 border rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diary Number</label>
          <div className="relative max-w-md">
            <input
              type="text"
              value={diaryNumber}
              onChange={(e) => setDiaryNumber(e.target.value)}
              placeholder="e.g. CRLP/1234/2024"
              className="w-full px-4 py-2 border rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}
      
      <div className="mt-4 flex space-x-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          onClick={resetSearch}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchBar;