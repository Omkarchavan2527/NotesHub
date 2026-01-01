// src/components/Breadcrumb.tsx
import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import type{ University, Stream, Class } from '../types';

interface BreadcrumbProps {
  university: University | null;
  stream: Stream | null;
  classItem: Class | null;
  subject: string | null;
  onNavigate: (level: 'home' | 'university' | 'stream' | 'class') => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  university,
  stream,
  classItem,
  subject,
  onNavigate
}) => {
  if (!university && !stream && !classItem && !subject) {
    return null;
  }

  return (
    <div className="mb-4 flex items-center gap-2 text-sm bg-white rounded-lg px-4 py-3 shadow-sm flex-wrap">
      <button
        onClick={() => onNavigate('home')}
        className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
      >
        <Home className="w-4 h-4" />
        Home
      </button>
      
      {university && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => onNavigate('university')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            {university.name}
          </button>
        </>
      )}
      
      {stream && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => onNavigate('stream')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            {stream.name}
          </button>
        </>
      )}
      
      {classItem && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => onNavigate('class')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            {classItem.name}
          </button>
        </>
      )}
      
      {subject && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700 font-medium">{subject}</span>
        </>
      )}
    </div>
  );
};
