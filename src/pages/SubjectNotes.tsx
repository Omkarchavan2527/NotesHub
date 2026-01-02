// src/pages/SubjectNotes.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  FileText
} from 'lucide-react';
import { apiService } from '../services/api.service';
import { NoteCard } from '../components/NoteCard';
import type { Note } from '../types';

export const SubjectNotes: React.FC<{
  onPreview: (note: Note) => void;
  onDownload: (note: Note) => void;
  showFreeDownload: boolean;
}> = ({ onPreview, onDownload, showFreeDownload }) => {
  // const { universityName, subjectName } = useParams<{ 
  //   universityName: string; 
  //   subjectName: string;
  // }>();

  const { universityName, subjectName } = useParams<{
    universityName?:
    string; subjectName: string;
  }>();
  const navigate = useNavigate();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (universityName || subjectName) {
      loadSubjectNotes();
    }
  }, [universityName, subjectName]);

  const loadSubjectNotes = async () => {
    if (!subjectName) return;

    try {
      setLoading(true);

      const decodedSubject = decodeURIComponent(subjectName);
      const decodedUniversity = universityName ? decodeURIComponent(universityName) : null;

      
      const allNotes = await apiService.getNotes(decodedUniversity ? {
        university: decodedUniversity
      } : {});
         const newsubjectname=decodedSubject.trim().toLowerCase();
      const subjectNotes = allNotes.filter(note => note.subject ===
        newsubjectname);

      // Sort by downloads
      const sortedNotes = subjectNotes.sort(
        (a, b) => (b.downloads || 0) - (a.downloads || 0)
      );

      setNotes(sortedNotes);
    } catch (error) {
      console.error('Failed to load subject notes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/university/${universityName}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Subjects</span>
        </button>

        {/* Subject Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">
                {decodeURIComponent(universityName || '')}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                {decodeURIComponent(subjectName || '')}
              </h1>
              <p className="text-gray-600">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} available
              </p>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {notes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No notes found</p>
              <p className="text-gray-400 text-sm">
                There are currently no notes available for this subject.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};