// src/components/SubjectList.tsx
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SubjectListProps {
  subjects: string[];
  onSelect: (subject: string) => void;
}

export const SubjectList: React.FC<SubjectListProps> = ({
  subjects,
  onSelect
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Subject</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject, index) => (
          <button
            key={index}
            onClick={() => onSelect(subject)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-left group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{subject}</h3>
                <p className="text-sm text-gray-600">View all notes</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
