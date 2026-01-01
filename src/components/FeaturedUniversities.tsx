// src/components/FeaturedUniversities.tsx
import React, { useState, useEffect } from 'react';
import { School, MapPin, ChevronRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api.service';

interface FeaturedUniversity {
  id: string;
  name: string;
  location: string;
  notesCount: number;
  color: string;
  streamsCount?: number;
}

export const FeaturedUniversities: React.FC = () => {
  
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<FeaturedUniversity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFeaturedUniversities();
  }, []);

  const loadFeaturedUniversities = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch real data from API
      const data = await apiService.getFeaturedUniversities();
      setUniversities(data);
    } catch (error) {
      console.error('Failed to load universities:', error);
      setError('Failed to load universities');
    } finally {
      setLoading(false);
    }
  };

  const handleUniversityClick = (universityName: string) => {
    // Navigate to university details page
    navigate(`/university/${encodeURIComponent(universityName)}`);
  };

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadFeaturedUniversities}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (universities.length === 0) {
    return (
      <div className="py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Featured Universities
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Browse notes from top Indian universities
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <School className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No universities available yet</p>
          <p className="text-sm text-gray-400">Universities will appear here once notes are uploaded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Featured Universities
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Browse notes from top universities
        </p>
      </div>

      {/* Universities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {universities.map((university) => (
          <button
            key={university.id}
            onClick={() => handleUniversityClick(university.name)}
            className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 group hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className={`${university.color} text-white w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <School className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                {/* University Name */}
                <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1">
                  {university.name}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{university.location}</span>
                  {university.streamsCount !== undefined && university.streamsCount > 0 && (
                    <>
                      <span className="mx-1">•</span>
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{university.streamsCount} Streams</span>
                    </>
                  )}
                </div>

                {/* Notes Count */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Notes available
                  </span>
                  <span className="text-sm sm:text-base font-bold text-gray-800">
                    {formatCount(university.notesCount)}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>

      {/* Note about adding more universities */}
      {universities.length < 5 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            More universities will appear as notes are uploaded
          </p>
        </div>
      )}
    </div>
  );
};