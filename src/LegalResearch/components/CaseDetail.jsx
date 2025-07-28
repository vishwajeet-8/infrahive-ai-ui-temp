import React, { useState } from 'react';

const CaseDetail = ({ selectedCase }) => {
  const [jsonView, setJsonView] = useState(false);

  if (jsonView) {
    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Case Details (JSON)</h2>
          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            onClick={() => setJsonView(false)}
          >
            View UI
          </button>
        </div>
        <div className="p-4 overflow-auto" style={{ maxHeight: '70vh' }}>
          <pre className="text-sm bg-gray-50 p-4 rounded-md">
            {JSON.stringify(selectedCase, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">{selectedCase.title}</h2>
        <button
          className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          onClick={() => setJsonView(true)}
        >
          View JSON
        </button>
      </div>
      
      <div className="p-4 grid grid-cols-2 gap-6">
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Diary Number</h3>
              <p className="font-medium">{selectedCase.diaryNumber}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Case Type</h3>
              <p className="font-medium">{selectedCase.caseType}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Filing Date</h3>
              <p className="font-medium">{selectedCase.filingDate}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Status</h3>
              <p className={`px-2 py-0.5 rounded-full text-xs font-medium inline-block ${
                selectedCase.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                selectedCase.status === 'Listed' ? 'bg-green-100 text-green-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {selectedCase.status}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Court</h3>
              <div className="flex items-center">
                <p className="font-medium">{selectedCase.courtName}</p>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  selectedCase.courtId === 1 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {selectedCase.courtId === 1 ? 'Supreme Court' : 'High Court'}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Bench</h3>
              <p className="font-medium">Bench {selectedCase.bench}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Next Hearing</h3>
              <p className="font-medium text-blue-600">{selectedCase.hearingDate}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-2">Parties</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="mb-4">
                <h4 className="text-sm text-gray-500 mb-1">Petitioner(s)</h4>
                <ul className="list-disc list-inside">
                  {selectedCase.petitioners.map((petitioner, index) => (
                    <li key={index} className="font-medium">{petitioner}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Respondent(s)</h4>
                <ul className="list-disc list-inside">
                  {selectedCase.respondents.map((respondent, index) => (
                    <li key={index} className="font-medium">{respondent}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-2">Advocates</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-gray-500 mb-1">Petitioner Side</h4>
                  <p className="font-medium">{selectedCase.advocates.petitioner}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 mb-1">Respondent Side</h4>
                  <p className="font-medium">{selectedCase.advocates.respondent}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Last Order</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-500 mb-1">Date: {selectedCase.lastOrder.date}</p>
              <p className="text-sm">{selectedCase.lastOrder.text}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-2">Case History</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="space-y-3">
                {selectedCase.history.map((event, index) => (
                  <div key={index} className="flex">
                    <div className="w-24 shrink-0 text-sm text-gray-500">{event.date}</div>
                    <div className="text-sm">{event.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;