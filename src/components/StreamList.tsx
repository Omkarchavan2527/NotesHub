// src/components/StreamList.tsx
import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import type{ Stream } from '../types';

interface StreamListProps {
  streams: Stream[];
  onSelect: (stream: Stream) => void;
}

export const StreamList: React.FC<StreamListProps> = ({
  streams,
  onSelect
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Stream</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {streams.map((stream, idx) => (
          <button
            key={stream.id || idx}
            onClick={() => onSelect(stream)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <BookOpen className="w-10 h-10 text-indigo-600 group-hover:scale-110 transition-transform" />
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">{stream.name}</h3>
            <p className="text-sm text-gray-600">{stream.classes.length} Classes</p>
          </button>
        ))}
      </div>
    </div>
  );
};
