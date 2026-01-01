// src/components/ClassList.tsx
import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import type{ Class } from '../types';

interface ClassListProps {
  classes: Class[];
  onSelect: (classItem: Class) => void;
}

export const ClassList: React.FC<ClassListProps> = ({
  classes,
  onSelect
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Class</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {classes.map((classItem) => (
          <button
            key={classItem.id}
            onClick={() => onSelect(classItem)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-10 h-10 text-indigo-600 group-hover:scale-110 transition-transform" />
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">{classItem.name}</h3>
            <p className="text-sm text-gray-600">{classItem.subjects.length} Subjects</p>
          </button>
        ))}
      </div>
    </div>
  );
};
