import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';


import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { UploadForm } from './components/UploadForm';
import { PreviewModal } from './components/PreviewModal';
import Hero from './components/Hero';
import { ProfilePage } from './components/ProfilePage';
import { apiService } from './services/api.service';
// ✅ NEW COMPONENTS
import { FeaturedUniversities } from './components/FeaturedUniversities';
import { ExploreSubjects } from './components/ExploreSubjects';
import { FeaturedNotes } from './components/FeaturedNotes';

import { UniversityDetails } from './pages/UniversityDetails';
import { SubjectNotes } from './pages/SubjectNotes';
import type {
  User,
  University,
  Note,
  AuthFormData,
  UploadFormData,
  AuthMode
} from './types';
import { generateThumbnail, getFileType, isValidFileType } from './utils/helpers';


const App: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [previewNote, setPreviewNote] = useState<Note | null>(null);
  const [downloadAttempts, setDownloadAttempts] = useState<number>(0);

  // ...existing code...

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState<boolean>(false);
const [universities, setUniversities] = useState<University[]>([]);


  // ...existing code...

const [authForm, setAuthForm] = useState<AuthFormData>({
    email: '',
    password: '',
    name: '',
    university: '',
    newUniversity: ''
  });

  const [uploadForm, setUploadForm] = useState<UploadFormData>({
    file: null,
    fileName: '',
    university: '',
    newUniversity: '',
    stream: '',
    newStream: '',
    class: '',
    newClass: '',
    subject: '',
    newSubject: '',
    description: '',
    thumbnail: null
  });
  useEffect(() => {
    loadUniversities();
    loadNotes();
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = apiService.getToken();
    if (token) {
      try {
        const userData = await apiService.getCurrentUser();
        setUser(userData);
        setCredits(userData.credits);
      } catch (error) {
 console.error('Auth check failed:', error);
        apiService.removeToken();
      }
    }
  };
const loadUniversities = async () => {
    try {
      const data = await apiService.getUniversities();
      setUniversities(data);
    } catch (error) {
      console.error('Failed to load universities:', error);
    }
  };
const loadNotes = async () => {
  try {
    await apiService.getNotes();
    // If you need to use the notes, assign them to another state or handle as needed
  } catch (error) {
    console.error('Failed to load notes:', error);
  }
};  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFileType(file)) {
      const fileType = getFileType(file);
      const thumbnail = generateThumbnail(file.name, fileType);
      
      setUploadForm({
        ...uploadForm,
        file,
        fileName: file.name.replace(/\.(pdf|ppt|pptx)$/i, ''),
        thumbnail
      });
    } else {
      alert('Please upload a PDF or PowerPoint file');
    }
  };

  const handleAuth = async () => {
    setLoading(true);
    try {
      const response =
authMode === 'login'
          ? await apiService.login(authForm)
          : await apiService.register(authForm);

      setUser(response.user);
      setCredits(response.user.credits);
      setShowAuthModal(false);
      navigate('/');
    } catch (err: any) {
      alert('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    apiService.logout();
    setUser(null);
    setCredits(0);
    navigate('/');
  };
const handleUpload = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const universityName = uploadForm.university === 'other' 
      ? uploadForm.newUniversity 
      : uploadForm.university;
    const streamName = uploadForm.stream === 'other' 
      ? uploadForm.newStream 
      : uploadForm.stream;
    const className = uploadForm.class === 'other' 
      ? uploadForm.newClass 
      : uploadForm.class;
    const subjectName = uploadForm.subject === 'other' 
      ? uploadForm.newSubject 
      : uploadForm.subject;

    if (!uploadForm.file || !universityName || !streamName || !className || !subjectName || !uploadForm.fileName) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadForm.file);
      formData.append('title', uploadForm.fileName);
      formData.append('university', universityName);
      formData.append('stream', streamName);
      formData.append('class', className);
      formData.append('subject', subjectName);
      formData.append('description', uploadForm.description);

      const response = await apiService.uploadNote(formData);
      
      setCredits(response.credits);
      setUploadForm({
        file: null,
        fileName: '',
        university: '',
        newUniversity: '',
        stream: '',
        newStream: '',
        class: '',
        newClass: '',
        subject: '',
        newSubject: '',
        description: '',
        thumbnail: null
      });
      
      alert('✅ Notes uploaded successfully! You earned 1 credit.');
      loadNotes();
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(error.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = async (note: Note) => {
    if (downloadAttempts >= 1 && !user) {
      alert('🔒 Please login to continue downloading notes!');
      setShowAuthModal(true);
      return;
    }
if (user) {
      setLoading(true);
      try {
        const response = await apiService.downloadNote(note._id || note.id.toString());
        setCredits(response.credits);
        
        if (response.downloadUrl) {
          window.open(response.downloadUrl, '_blank');
        }
        
        // setSelectedNote(note); // Removed unused setter
        alert(`✅ Downloaded: ${note.title}\nRemaining credits: ${response.credits}`);
      } catch (error: any) {
        console.error('Download error:', error);
        alert(error.response?.data?.error || 'Download failed');
      } finally {
        setLoading(false);
      }
    } else {
      setDownloadAttempts(downloadAttempts + 1);
      // setSelectedNote(note); // Removed unused setter
      alert(`✅ Downloaded: ${note.title}\n⚠️ Next download requires login!`);
    }
  };


  // ...existing code...


  return (
    <>
    <PreviewModal
                note={previewNote}
                showFreeDownload={!user && downloadAttempts === 0}
                hasUser={!!user}
                credits={credits}
                onClose={() => setPreviewNote(null)}
                onDownload={handleDownload}
              />
    <Routes>
      {/* HOME */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-white">
            <Header
              user={user}
              credits={credits}
              onLoginClick={() => setShowAuthModal(true)}
              onLogout={handleLogout}
              onProfileClick={() => navigate('/profile')}
            />
           
              <Hero onUploadClick={() => navigate('/upload')} />

              <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
                {/* ✅ NEW */}
                <FeaturedUniversities
                  
                />

                {/* ✅ NEW */}
                <ExploreSubjects onSelectSubject={() => {}} />

                {/* ✅ NEW */}
                <FeaturedNotes
                  onPreview={setPreviewNote}
                  onDownload={handleDownload}
                  showFreeDownload={!user && downloadAttempts === 0}
                />

                
              </div>

              <AuthModal
                show={showAuthModal}
                mode={authMode}
                formData={authForm}
                universities={[]}
                loading={loading}
                onClose={() => setShowAuthModal(false)}
                onSubmit={handleAuth}
                onModeToggle={() =>
                  setAuthMode(authMode === 'login' ? 'signup' : 'login')
                }
                onFormChange={(d) => setAuthForm({ ...authForm, ...d })}
              />

              <PreviewModal
                note={previewNote}
                showFreeDownload={!user && downloadAttempts === 0}
                hasUser={!!user}
                credits={credits}
                onClose={() => setPreviewNote(null)}
                onDownload={() => { }}
              />
            </div>
        }
      />
  {/* ================= UPLOAD (FULLSCREEN) ================= */}
      <Route
        path="/upload"
        element={
          user ? (
            <div className="min-h-screen bg-white">
              <Header
                user={user}
                credits={credits}
                onLoginClick={() => setShowAuthModal(true)}
                onLogout={handleLogout}
                onProfileClick={() => navigate('/profile')}
              />

              {/* ✅ FULLSCREEN UPLOAD */}
              <div className="min-h-[calc(100vh-64px)]  flex">
                <UploadForm
                  user={user}
                  formData={uploadForm}
                  universities={universities}
                  loading={loading}
                  onFormChange={(d) =>
                    setUploadForm({ ...uploadForm, ...d })
                  }
                  onFileChange={handleFileChange}
                  onSubmit={handleUpload}
                />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )
        }
      />

  {/* UNIVERSITY DETAILS PAGE */}
  <Route
    path="/university/:universityName"
    element={
      <UniversityDetails
        onPreview={setPreviewNote}
        onDownload={handleDownload}
        showFreeDownload={!user && downloadAttempts === 0}
      />
    }
  />

  {/* SUBJECT NOTES PAGE */}
  <Route
    path="/university/:universityName/:subjectName"
    element={
      <SubjectNotes
        onPreview={setPreviewNote}
        onDownload={handleDownload}
        showFreeDownload={!user && downloadAttempts === 0}
      />
    }
  />
<Route
    path="/subject/:subjectName"
    element={
      <SubjectNotes
        onPreview={setPreviewNote}
        onDownload={handleDownload}
        showFreeDownload={!user && downloadAttempts === 0}
      />
    }
  />
            {/* PROFILE */}
            <Route
              path="/profile"
              element={
                user ? (
                  <ProfilePage
                    onClose={() => navigate('/')}
                    onPreview={setPreviewNote}
                    onDownload={() => { }}
                    showFreeDownload={!user && downloadAttempts === 0}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
    
    </>
  );
};

      export default App;