// src/components/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import {
  User,
  MapPin,
  Calendar,
  Settings,
  Edit,
  BookOpen,
  Download,
  Star,
  Users,
 
} from 'lucide-react';
import { NoteCard } from './NoteCard';
import type { Note } from '../types';
import { apiService } from '../services/api.service';

interface ProfileStats {
  notesUploaded: number;
  totalDownloads: number;
  averageRating: number;
  followers: number;
}

interface Achievement {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}

interface ProfileData {
  user: {
    id: string;
    name: string;
    email: string;
    university: string;
    credits: number;
    location?: string;
    bio?: string;
    createdAt: string;
  };
  stats: ProfileStats;
  achievements: Achievement[];
  uploadedNotes: Note[];
  savedNotes: Note[];
}

interface ProfilePageProps {
  onClose: () => void;
  onPreview: (note: Note) => void;
  onDownload: (note: Note) => void;
  showFreeDownload: boolean;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onClose,
  onPreview,
  onDownload,
  showFreeDownload
}) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [activeTab, setActiveTab] = useState<'uploads' | 'saved'>('uploads');
  const [loading, setLoading] = useState(true);

  // --- Add edit modal state ---
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    university: '',
    class: ''
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getUserProfile();
      setProfileData(data);
      // Initialize edit form with loaded user data
      setEditForm({
        name: data.user.name,
        university: data.user.university,
        class: ''
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Failed to load profile</p>
      </div>
    );
  }

  const { user, stats,  uploadedNotes, savedNotes } = profileData;
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  const achievementsList = [
    { id: 'first-upload', name: 'First Upload', icon: '🎯', threshold: 1, current: stats.notesUploaded },
    { id: '1k-downloads', name: '1K Downloads', icon: '🏆', threshold: 1000, current: stats.totalDownloads },
    { id: 'top-contributor', name: 'Top Contributor', icon: '⭐', threshold: 50, current: stats.notesUploaded },
    { id: '10-notes', name: '10 Notes', icon: '📚', threshold: 10, current: stats.notesUploaded },
    { id: '5-star-rating', name: '5-Star Rating', icon: '🌟', threshold: 5, current: stats.averageRating },
    { id: '10k-downloads', name: '10K Downloads', icon: '💎', threshold: 10000, current: stats.totalDownloads }
  ];

  // --- Edit Modal JSX ---
  const editModal = showEdit && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            // TODO: Save logic here (API call)
            setShowEdit(false);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={editForm.name}
              onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">University</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={editForm.university}
              onChange={e => setEditForm(f => ({ ...f, university: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Class</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={editForm.class}
              onChange={e => setEditForm(f => ({ ...f, class: e.target.value }))}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200"
              onClick={() => setShowEdit(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {editModal}
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">NotesHub</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-6">

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex flex-col items-center text-center mb-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
              {initials}
            </div>

            {/* User Info */}
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
            <p className="text-gray-600 mb-4">{user.email}</p>

            {/* Edit Profile Button */}
            <button
              className="w-full max-w-md bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-3"
              onClick={() => setShowEdit(true)}
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>

            {/* Settings Button */}
            <button className="w-full max-w-md bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>

          {/* Location & Join Date */}
          <div className="flex flex-col items-center gap-2 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{user.location || user.university}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-center text-gray-600 text-sm max-w-2xl mx-auto mb-6">
              {user.bio}
            </p>
          )}

          {/* Statistics */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Notes Uploaded</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.notesUploaded}</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Downloads</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalDownloads.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.averageRating.toFixed(1)}</p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Followers</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.followers}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievementsList.map((achievement) => {
              const unlocked = achievement.current >= achievement.threshold;
              return (
                <div
                  key={achievement.id}
                  className={`rounded-lg p-4 text-center transition-all ${unlocked
                      ? 'bg-linear-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300'
                      : 'bg-gray-100 opacity-50'
                    }`}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <p className="text-xs font-medium text-gray-700">{achievement.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md p-1 flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('uploads')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${activeTab === 'uploads'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100 border-[#efefef] border'
              }`}
          >
            My Uploads
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${activeTab === 'saved'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100 border-[#efefef] border'
              }`}
          >
            Saved Notes
          </button>
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              {activeTab === 'uploads' ? 'My Uploaded Notes' : 'Saved Notes'}
            </h3>
            <span className="text-sm text-gray-600">
              {activeTab === 'uploads' ? uploadedNotes.length : savedNotes.length} notes
            </span>
          </div>

          {activeTab === 'uploads' ? (
            uploadedNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedNotes.map(note => (
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
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No notes uploaded yet</p>
                <p className="text-sm text-gray-400">Start uploading to earn credits!</p>
              </div>
            )
          ) : (
            savedNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedNotes.map(note => (
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
                <Download className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No saved notes yet</p>
                <p className="text-sm text-gray-400">Download notes to save them here!</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};