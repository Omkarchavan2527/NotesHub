// src/components/NoteCard.tsx
import React from 'react';
import { Eye, Download, School } from 'lucide-react';
import type{ Note } from '../types';

interface NoteCardProps {
  note: Note;
  showFreeDownload: boolean;
  onPreview: (note: Note) => void;
  onDownload: (note: Note) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  showFreeDownload,
  onPreview,
  onDownload
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img 
          src={note.thumbnail} 
          alt={note.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <span className="text-xs bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded font-medium">
            {note.fileType.toUpperCase()}
          </span>
          <span className="text-xs bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded">
            {note.pages} pages
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2">{note.title}</h3>
        
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <School className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{note.university}</span>
          </div>
          <p className="text-gray-600">
            <span className="font-semibold">Stream:</span> {note.stream}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Class:</span> {note.class}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Subject:</span> {note.subject}
          </p>
          <p className="text-gray-500 text-xs line-clamp-2 mt-2">{note.description}</p>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b">
          <span>By {note.uploaderName}</span>
          <span>{note.uploadDate}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPreview(note)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={() => onDownload(note)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            {showFreeDownload ? 'Free' : '1 Credit'}
          </button>
        </div>
      </div>
    </div>
  );
}