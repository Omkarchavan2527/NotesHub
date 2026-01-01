// src/components/FeaturedNotes.tsx
import React, { useState, useEffect } from 'react';
import { Star, Eye, Download, TrendingUp, Clock } from 'lucide-react';
import type{ Note } from '../types';
import { apiService } from '../services/api.service';

interface FeaturedNotesProps {
  onPreview: (note: Note) => void;
  onDownload: (note: Note) => void;
  showFreeDownload: boolean;
}

export const FeaturedNotes: React.FC<FeaturedNotesProps> = ({
  onPreview,
  onDownload,
  showFreeDownload
}) => {
  const [featuredNotes, setFeaturedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'top-rated' | 'most-downloaded' | 'recent'>('top-rated');

  useEffect(() => {
    loadFeaturedNotes();
  }, [activeFilter]);

  const loadFeaturedNotes = async () => {
    try {
      setLoading(true);
      // In production, fetch based on filter
      // const response = await apiService.getFeaturedNotes(activeFilter);
      
      const allNotes = await apiService.getNotes();
      
      // Sort based on active filter
      let sortedNotes = [...allNotes];
      if (activeFilter === 'most-downloaded') {
        sortedNotes.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
      } else if (activeFilter === 'recent') {
        sortedNotes.sort((a, b) => 
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        );
      }
      
      setFeaturedNotes(sortedNotes.slice(0, 6));
    } catch (error) {
      console.error('Failed to load featured notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
            Featured Notes
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Top-rated notes from our community
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveFilter('top-rated')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeFilter === 'top-rated'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Star className="w-4 h-4" />
            Top Rated
          </button>
          <button
            onClick={() => setActiveFilter('most-downloaded')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeFilter === 'most-downloaded'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Popular
          </button>
          <button
            onClick={() => setActiveFilter('recent')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeFilter === 'recent'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            Recent
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      {featuredNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredNotes.map((note) => (
            <div
              key={note._id || note.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
                <img
                  src={note.thumbnail}
                  alt={note.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-gray-800">4.9</span>
                </div>

                {/* File Type Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-800">
                  {note.fileType.toUpperCase()}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {note.title}
                </h3>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>{formatNumber(note.downloads || 0)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{note.pages} pages</span>
                  </div>
                </div>

                {/* Academic Info */}
                <div className="space-y-1 mb-4 text-xs">
                  <p className="text-gray-600">
                    <span className="font-medium">Subject:</span> {note.subject}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">University:</span> {note.university}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onPreview(note)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => onDownload(note)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                  >
                    {showFreeDownload ? 'Free' : '1 Credit'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No featured notes available</p>
        </div>
      )}

      {/* View All Button */}
      {featuredNotes.length > 0 && (
        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
            View All Featured Notes
            <TrendingUp className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};