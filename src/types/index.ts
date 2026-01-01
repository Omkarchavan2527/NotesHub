// src/types/index.ts

// ==================== USER TYPES ====================

export interface User {
  id?: string;
  name: string;
  email: string;
  university: string;
  credits: number;
}

// ==================== UNIVERSITY TYPES ====================

export interface Class {
  id?: number;
  name: string;
  subjects: string[];
}

export interface Stream {
  id?: number;
  name: string;
  classes: Class[];
}

export interface University {
  _id?: string;
  id?: number;
  name: string;
  streams: Stream[];
}

// ==================== NOTE TYPES ====================

export interface Note {
  _id?: string;
  id: number;
  title: string;
  university: string;
  stream: string;
  class: string;
  subject: string;
  description: string;
  uploadedBy?: string;
  uploaderName: string;
  fileName: string;
  filePath?: string;
  fileType: 'pdf' | 'ppt';
  fileSize?: number;
  pages: number;
  thumbnail: string;
  downloads?: number;
  uploadDate: string;
  file?: File;
}

// ==================== FORM DATA TYPES ====================

export interface AuthFormData {
  email: string;
  password: string;
  name: string;
  university: string;
  newUniversity: string;
}

export interface UploadFormData {
  file: File | null;
  fileName: string;
  university: string;
  newUniversity: string;
  stream: string;
  newStream: string;
  class: string;
  newClass: string;
  subject: string;
  newSubject: string;
  description: string;
  thumbnail: string | null;
}

// ==================== ENUM TYPES ====================

export type AuthMode = 'login' | 'signup';
export type ActiveTab = 'browse' | 'upload';
export type FileType = 'pdf' | 'ppt';

// ==================== API RESPONSE TYPES ====================

export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

export interface UploadResponse {
  message: string;
  note: Note;
  credits: number;
}

export interface DownloadResponse {
  message: string;
  credits: number;
  filePath: string;
  downloadUrl: string;
}

export interface StatsResponse {
  totalUsers: number;
  totalNotes: number;
  totalUniversities: number;
  totalDownloads: number;
}

// ==================== COMPONENT PROP TYPES ====================

export interface HeaderProps {
  user: User | null;
  credits: number;
  onLoginClick: () => void;
  onLogout: () => void;
}

export interface AuthModalProps {
  show: boolean;
  mode: AuthMode;
  formData: AuthFormData;
  universities: University[];
  loading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onModeToggle: () => void;
  onFormChange: (data: Partial<AuthFormData>) => void;
}

export interface NoteCardProps {
  note: Note;
  showFreeDownload: boolean;
  onPreview: (note: Note) => void;
  onDownload: (note: Note) => void;
}

export interface UploadFormProps {
  formData: UploadFormData;
  universities: University[];
  loading: boolean;
  onFormChange: (data: Partial<UploadFormData>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export interface PreviewModalProps {
  note: Note | null;
  showFreeDownload: boolean;
  hasUser: boolean;
  credits: number;
  onClose: () => void;
  onDownload: (note: Note) => void;
}

export interface UniversityListProps {
  universities: University[];
  onSelect: (university: University) => void;
}

export interface StreamListProps {
  streams: Stream[];
  onSelect: (stream: Stream) => void;
}

export interface ClassListProps {
  classes: Class[];
  onSelect: (classItem: Class) => void;
}

export interface SubjectListProps {
  subjects: string[];
  onSelect: (subject: string) => void;
}

export interface NotesListProps {
  notes: Note[];
  subject: string;
  showFreeDownload: boolean;
  onPreview: (note: Note) => void;
  onDownload: (note: Note) => void;
}

export interface BreadcrumbProps {
  university: University | null;
  stream: Stream | null;
  classItem: Class | null;
  subject: string | null;
  onNavigate: (level: 'home' | 'university' | 'stream' | 'class') => void;
}

// ==================== FILTER TYPES ====================

export interface NoteFilters {
  university?: string;
  stream?: string;
  class?: string;
  subject?: string;
  search?: string;
}

// ==================== ERROR TYPES ====================

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: string[];
}

export interface ValidationError {
  field: string;
  message: string;
}

// ==================== PAGINATION TYPES ====================

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ==================== UTILITY TYPES ====================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;
