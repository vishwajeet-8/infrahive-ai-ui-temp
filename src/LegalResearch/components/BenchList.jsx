import React from 'react';

const BenchList = ({ court, benches }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold p-4 border-b flex items-center justify-between">
        <span>{court.name} - Benches</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          court.type === 'supreme' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {court.type === 'supreme' ? 'Supreme Court' : 'High Court'}
        </span>
      </h2>
      
      {benches.length > 0 ? (
        <div className="divide-y">
          {benches.map(bench => (
            <div key={bench.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-lg">Bench {bench.number}</h3>
                  <div className="mt-1 text-gray-600">
                    {bench.judges.join(' & ')}
                  </div>
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold">{bench.cases}</span> Active Cases
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          No bench information available for this court.
        </div>
      )}
    </div>
  );
};

export default BenchList;