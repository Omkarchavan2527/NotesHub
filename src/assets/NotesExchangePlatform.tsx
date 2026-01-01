import React, { useState } from 'react';
import {
  Upload,
  BookOpen,
  Download,
  Search,
  FileText,
  Award,
  LogIn,
  User as UserIcon,
  LogOut,
  Presentation,
  Eye,
  X
} from 'lucide-react';

/* =======================
   TYPES & INTERFACES
======================= */

type NoteType = 'pdf' | 'ppt';

interface User {
  name: string;
  email: string;
  credits: number;
}

interface Note {
  id: number;
  title: string;
  subject: string;
  topic: string;
  description: string;
  uploadedBy: string;
  pages: number;
  uploadDate: string;
  type: NoteType;
  thumbnail: string;
  file?: File;
}

interface AuthForm {
  email: string;
  password: string;
  name: string;
}

interface UploadForm {
  file: File | null;
  fileName: string;
  subject: string;
  topic: string;
  description: string;
  thumbnail: string | null;
}

/* =======================
   COMPONENT
======================= */

export default function NotesExchangePlatform() {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [uploadedNotes, setUploadedNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [previewNote, setPreviewNote] = useState<Note | null>(null);
  const [activeTab, setActiveTab] = useState<'browse' | 'upload'>('browse');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [downloadAttempts, setDownloadAttempts] = useState<number>(0);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const [authForm, setAuthForm] = useState<AuthForm>({
    email: '',
    password: '',
    name: ''
  });

  const [uploadForm, setUploadForm] = useState<UploadForm>({
    file: null,
    fileName: '',
    subject: '',
    topic: '',
    description: '',
    thumbnail: null
  });

  /* =======================
     SAMPLE NOTES
  ======================= */

  const [notesLibrary] = useState<Note[]>([
    {
      id: 1,
      title: 'Introduction to Calculus',
      subject: 'Mathematics',
      topic: 'Differential Calculus',
      description: 'Limits, derivatives and applications',
      uploadedBy: 'Student A',
      pages: 45,
      uploadDate: '2024-11-20',
      type: 'pdf',
      thumbnail: 'data:image/svg+xml;base64,PHN2Zy8+'
    },
    {
      id: 2,
      title: 'Data Structures',
      subject: 'Computer Science',
      topic: 'DSA',
      description: 'Arrays, trees, graphs, sorting',
      uploadedBy: 'Student B',
      pages: 60,
      uploadDate: '2024-11-22',
      type: 'ppt',
      thumbnail: 'data:image/svg+xml;base64,PHN2Zy8+'
    }
  ]);

  /* =======================
     HANDLERS
  ======================= */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const type: NoteType = file.type.includes('pdf') ? 'pdf' : 'ppt';

    const thumbnail = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250'%3E%3Crect width='200' height='250' fill='%234F46E5'/%3E%3Ctext x='50%25' y='50%25' fill='white' text-anchor='middle'%3E${type.toUpperCase()}%3C/text%3E%3C/svg%3E`;

    setUploadForm({
      ...uploadForm,
      file,
      fileName: file.name,
      thumbnail
    });
  };

  const handleAuth = () => {
    if (!authForm.email || !authForm.password) return;

    const newUser: User = {
      name: authForm.name || authForm.email.split('@')[0],
      email: authForm.email,
      credits: 5
    };

    setUser(newUser);
    setCredits(5);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCredits(0);
    setDownloadAttempts(0);
  };

  const handleUpload = () => {
    if (!user || !uploadForm.file) return;

    const type: NoteType = uploadForm.file.type.includes('pdf') ? 'pdf' : 'ppt';

    const newNote: Note = {
      id: Date.now(),
      title: uploadForm.fileName.replace(/\.(pdf|ppt|pptx)$/i, ''),
      subject: uploadForm.subject,
      topic: uploadForm.topic,
      description: uploadForm.description,
      uploadedBy: user.name,
      pages: Math.floor(Math.random() * 50) + 10,
      uploadDate: new Date().toISOString().split('T')[0],
      type,
      thumbnail: uploadForm.thumbnail || '',
      file: uploadForm.file
    };

    setUploadedNotes(prev => [...prev, newNote]);
    setCredits(prev => prev + 1);
    setActiveTab('browse');
  };

  const handleDownload = (note: Note) => {
    if (user && credits <= 0) return;

    setSelectedNote(note);
    setDownloadAttempts(prev => prev + 1);
    if (user) setCredits(prev => prev - 1);
  };

  const filteredNotes = [...notesLibrary, ...uploadedNotes].filter(
    (note: Note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* =======================
     UI
  ======================= */

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BookOpen /> NotesShare
      </h1>

      <input
        className="w-full p-3 rounded mb-4"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map(note => (
          <div key={note.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{note.title}</h3>
            <p className="text-sm text-gray-600">{note.subject}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setPreviewNote(note)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                <Eye size={16} />
              </button>
              <button
                onClick={() => handleDownload(note)}
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {previewNote && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="font-bold text-xl">{previewNote.title}</h2>
            <p className="text-sm">{previewNote.description}</p>
            <button
              onClick={() => setPreviewNote(null)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedNote && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80 text-center">
            {selectedNote.type === 'pdf' ? <FileText /> : <Presentation />}
            <p className="mt-2 font-semibold">
              {selectedNote.type.toUpperCase()} downloaded
            </p>
            <button
              onClick={() => setSelectedNote(null)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
