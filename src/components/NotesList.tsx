// src/components/NotesList.tsx
import React from 'react';
import { FileText } from 'lucide-react';
import type{ Note } from '../types';
import { NoteCard } from './NoteCard';

interface NotesListProps {
  notes: Note[];
  subject: string;
  showFreeDownload: boolean;
  onPreview: (note: Note) => void;
  onDownload: (note: Note) => void;
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  subject,
  showFreeDownload,
  onPreview,
  onDownload
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {subject} - Notes
      </h2>
      
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <NoteCard
              key={note._id || note.id}
              note={note}
              showFreeDownload={showFreeDownload}
              onPreview={onPreview}
              onDownload={onDownload}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No notes found for {subject}</p>
          <p className="text-sm text-gray-400">Be the first to upload notes for this subject!</p>
        </div>
      )}
    </div>
  );
};
