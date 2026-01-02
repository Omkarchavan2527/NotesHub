// src/pages/UniversityDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  School, 
  MapPin, 
  BookOpen, 
  FileText,
  TrendingUp,
  Users,
  Search
} from 'lucide-react';
import { apiService } from '../services/api.service';
import type { Note } from '../types';


interface SubjectGroup {
  subject: string;
  notesCount: number;
}

interface UniversityStats {
  totalNotes: number;
  totalDownloads: number;
  totalStreams: number;
  totalSubjects: number;
}
interface UniversityDetailsProps {
  onPreview: (note: Note) => void;
  onDownload: (note: Note) => Promise<void>;
  showFreeDownload: boolean;
}

export const UniversityDetails: React.FC<UniversityDetailsProps> = () => {
  const { universityName } = useParams<{ universityName: string }>();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState<SubjectGroup[]>([]);
  const [stats, setStats] = useState<UniversityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (universityName) {
      loadUniversityData();
    }
  }, [universityName]);

  const loadUniversityData = async () => {
    if (!universityName) return;

    try {
      setLoading(true);
      const decodedName = decodeURIComponent(universityName);

      // Fetch university statistics
      const statsData = await apiService.getUniversityStats(decodedName);
      setStats(statsData);

      // Fetch all notes for this university
      const notes = await apiService.getNotes({ university: decodedName });

      // Group notes by subject
      const subjectMap = new Map<string, number>();
      notes.forEach(note => {
        const count = subjectMap.get(note.subject) || 0;
        subjectMap.set(note.subject, count + 1);
      });

      // Convert to array and sort by note count
      const subjectGroups: SubjectGroup[] = Array.from(subjectMap.entries())
        .map(([subject, notesCount]) => ({
          subject,
          notesCount
        }))
        .sort((a, b) => b.notesCount - a.notesCount);

      setSubjects(subjectGroups);
    } catch (error) {
      console.error('Failed to load university data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubjects = subjects.filter(s => 
    s.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubjectClick = (subject: string) => {
    navigate(`/university/${universityName}/${encodeURIComponent(subject)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            <div className="h-48 bg-gray-200 rounded-xl"></div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
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
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        {/* University Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0">
              <School className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                {decodeURIComponent(universityName || '')}
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Statistics */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{stats.totalNotes}</div>
                <div className="text-xs text-gray-600">Total Notes</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">
                  {stats.totalDownloads.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Downloads</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <BookOpen className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{stats.totalStreams}</div>
                <div className="text-xs text-gray-600">Streams</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{stats.totalSubjects}</div>
                <div className="text-xs text-gray-600">Subjects</div>
              </div>
            </div>
          )}
        </div>

        {/* Subject List View */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Browse by Subject
            </h2>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {filteredSubjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map((subjectGroup) => (
                <button
                  key={subjectGroup.subject}
                  onClick={() => handleSubjectClick(subjectGroup.subject)}
                  className=" bg-white hover:from-indigo-100 hover:to-purple-100 rounded-xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <BookOpen className="w-8 h-8 text-indigo-600 group-hover:scale-110 transition-transform" />
                    <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {subjectGroup.notesCount}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                    {subjectGroup.subject}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {subjectGroup.notesCount} {subjectGroup.notesCount === 1 ? 'note' : 'notes'} available
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">
                {searchTerm ? 'No subjects found' : 'No subjects available'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-indigo-600 hover:text-indigo-700 text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};