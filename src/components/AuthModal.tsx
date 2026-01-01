// src/components/AuthModal.tsx
import React from 'react';
import type{ AuthFormData, AuthMode, University } from '../types';

interface AuthModalProps {
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

export const AuthModal: React.FC<AuthModalProps> = ({
  show,
  mode,
  formData,
  universities,
  loading,
  onClose,
  onSubmit,
  onModeToggle,
  onFormChange
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white p12 rounded-lg border-zinc-950 min-h-11 min-w-4/5  my-2" >
        <div className="flex items-center justify-between p-6">
          <h3 className="text-2xl lg:px-96 px-0.5 font-bold text-gray-800">
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-indigo-800">
            🎁 <strong>{mode === 'signup' ? 'Get 5 FREE credits' : 'Login to access your credits'}</strong>
          </p>
        </div>

        <div className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => onFormChange({ name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                <select
                  value={formData.university}
                  onChange={(e) => onFormChange({ university: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                >
                  <option value="">Select Your University</option>
                  {universities.map(uni => (
                    <option key={uni._id || uni.id} value={uni.name}>{uni.name}</option>
                  ))}
                  <option value="other">Other (Add New University)</option>
                </select>
                {formData.university === 'other' && (
                  <input
                    type="text"
                    value={formData.newUniversity}
                    onChange={(e) => onFormChange({ newUniversity: e.target.value })}
                    placeholder="Enter your university name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent mt-2 outline-none"
                  />
                )}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onFormChange({ email: e.target.value })}
              placeholder="your@email.com"
              className="w-full px-1.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => onFormChange({ password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
            />
          </div>

          <button
            onClick={onSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Sign Up & Get 5 Credits')}
          </button>

          <div className="text-center">
            <button
              onClick={onModeToggle}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              {mode === 'login' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
