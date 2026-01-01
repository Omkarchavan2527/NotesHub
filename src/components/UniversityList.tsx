// src/components/UniversityList.tsx
import React from 'react';
import { School, ChevronRight } from 'lucide-react';
import type{ University } from '../types';

interface UniversityListProps {
  universities: University[];
  onSelect: (university: University) => void;
}

export const UniversityList: React.FC<UniversityListProps> = ({
  universities,
  onSelect
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Your University</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {universities.map(university => (
          <button
            key={university._id || university.id}
            onClick={() => onSelect(university)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-left group"
          >
            <School className="w-12 h-12 text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg text-gray-800 mb-2">{university.name}</h3>
            <p className="text-sm text-gray-600">{university.streams.length} Streams Available</p>
            <ChevronRight className="w-5 h-5 text-gray-400 mt-2 group-hover:translate-x-1 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
};
