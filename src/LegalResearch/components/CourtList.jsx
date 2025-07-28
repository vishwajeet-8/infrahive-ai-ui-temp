import React from 'react';
import { ChevronRight, MapPin } from 'lucide-react';

const CourtList = ({ courts, handleCourtSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold p-4 border-b">All Courts</h2>
      {courts.length > 0 ? (
        <div className="divide-y">
          {courts.map(court => (
            <div 
              key={court.id}
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleCourtSelect(court)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-lg">{court.name}</h3>
                    {court.type === 'supreme' && (
                      <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Apex Court
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{court.description}</p>
                  <div className="flex items-center text-gray-500 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{court.location}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-gray-600 mr-3">
                    <span className="font-semibold">{court.benches}</span> {court.benches === 1 ? 'Bench' : 'Benches'}
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          No courts found for the selected filter.
        </div>
      )}
    </div>
  );
};

export default CourtList;