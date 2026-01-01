// src/services/api.service.ts
import axios, {  AxiosError } from 'axios';
import type{AxiosInstance,} from 'axios'
import type{ 
  User, 
  Note, 
  University, 
  AuthResponse, 
  UploadResponse, 
  DownloadResponse,
  NoteFilters
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests automatically
    this.api.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle errors globally
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Unauthorized - clear token and redirect to login
          this.removeToken();
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );
  }

  // ==================== TOKEN MANAGEMENT ====================
  
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  // ==================== AUTHENTICATION ====================
  
  async register(userData: {
    name: string;
    email: string;
    password: string;
    university: string;
  }): Promise<AuthResponse> {
    const { data } = await this.api.post<AuthResponse>('/auth/register', userData);
    this.setToken(data.token);
    return data;
  }

  async login(credentials: { 
    email: string; 
    password: string 
  }): Promise<AuthResponse> {
    const { data } = await this.api.post<AuthResponse>('/auth/login', credentials);
    this.setToken(data.token);
    return data;
  }

  async getCurrentUser(): Promise<User> {
    const { data } = await this.api.get<User>('/auth/me');
    return data;
  }

  logout(): void {
    this.removeToken();
  }

  // ==================== UNIVERSITIES ====================
  
  async getUniversities(): Promise<University[]> {
    const { data } = await this.api.get<University[]>('/universities');
    return data;
  }

  async createUniversity(universityData: { 
    name: string; 
    streams?: any[] 
  }): Promise<University> {
    const { data } = await this.api.post<University>('/universities', universityData);
    return data;
  }

  async addStream(universityId: string, streamData: any): Promise<University> {
    const { data } = await this.api.post<University>(
      `/universities/${universityId}/streams`,
      streamData
    );
    return data;
  }

// ==================== UNIVERSITY DETAILS ====================

async getUniversityStats(universityName: string): Promise<{
  university: string;
  totalNotes: number;
  totalDownloads: number;
  totalStreams: number;
  totalSubjects: number;
}> {
  const { data } = await this.api.get(`/explore/universities/${encodeURIComponent(universityName)}/stats`);
  return data;
}

async getNotesBySubject(universityName: string, subject: string): Promise<Note[]> {
  const { data } = await this.api.get('/notes', {
    params: {
      university: universityName,
      subject: subject
    }
  });
  return data;
}
// ==================== EXPLORE & FEATURED ====================

async getSubjectCategories(): Promise<any[]> {
  const { data } = await this.api.get('/explore/subjects');
  return data;
}

async getFeaturedUniversities(): Promise<any[]> {
  const { data } = await this.api.get('/explore/universities/featured');
  return data;
}

async getFeaturedNotes(filter: 'top-rated' | 'most-downloaded' | 'recent' = 'top-rated', limit: number = 6): Promise<Note[]> {
  const { data } = await this.api.get('/explore/notes/featured', {
    params: { filter, limit }
  });
  return data;
}

async getTrendingTopics(): Promise<any[]> {
  const { data } = await this.api.get('/explore/trending');
  return data;
}

async getPlatformStats(): Promise<{
  totalNotes: number;
  totalDownloads: number;
  totalUniversities: number;
  totalSubjects: number;
}> {
  const { data } = await this.api.get('/explore/stats');
  return data;
}

// Add these methods to your existing api.service.ts

// ==================== USER PROFILE ====================

async getUserProfile(): Promise<any> {
  const { data } = await this.api.get('/user/profile');
  return data;
}

async updateUserProfile(profileData: {
  name?: string;
  university?: string;
  location?: string;
  bio?: string;
}): Promise<any> {
  const { data } = await this.api.put('/user/profile', profileData);
  return data;
}

async getUserStats(): Promise<any> {
  const { data } = await this.api.get('/user/stats');
  return data;
}
  // ==================== NOTES ====================
  
  async uploadNote(formData: FormData): Promise<UploadResponse> {
    const { data } = await this.api.post<UploadResponse>('/notes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }

  async getNotes(filters?: NoteFilters): Promise<Note[]> {
    const { data } = await this.api.get<Note[]>('/notes', { params: filters });
    return data;
  }

  async getNoteById(noteId: string): Promise<Note> {
    const { data } = await this.api.get<Note>(`/notes/${noteId}`);
    return data;
  }

  async downloadNote(noteId: string): Promise<DownloadResponse> {
    const { data } = await this.api.post<DownloadResponse>(`/notes/${noteId}/download`);
    return data;
  }

  async deleteNote(noteId: string): Promise<{ message: string }> {
    const { data } = await this.api.delete<{ message: string }>(`/notes/${noteId}`);
    return data;
  }

  async getUserUploads(): Promise<Note[]> {
    const { data } = await this.api.get<Note[]>('/user/uploads');
    return data;
  }

  async getUserDownloads(): Promise<Note[]> {
    const { data } = await this.api.get<Note[]>('/user/downloads');
    return data;
  }

  // ==================== STATISTICS ====================
  
  async getStats(): Promise<{
    totalUsers: number;
    totalNotes: number;
    totalUniversities: number;
    totalDownloads: number;
  }> {
    const { data } = await this.api.get('/stats');
    return data;
  }

  // ==================== SEED DATABASE ====================
  
  async seedDatabase(): Promise<{ message: string }> {
    const { data } = await this.api.post<{ message: string }>('/seed');
    return data;
  }
}



// Export singleton instance
export const apiService = new ApiService();
