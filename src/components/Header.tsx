// src/components/Header.tsx - UPDATED VERSION
import React from 'react';
import { BookOpen, Award, LogIn, User, LogOut } from 'lucide-react';
import type{ User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  credits: number;
  onLoginClick: () => void;
  onLogout: () => void;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  credits, 
  onLoginClick, 
  onLogout,
  onProfileClick 
}) => {
  return (
    <header className="bg-white shadow-md">
      <div className=" mx-auto px-4 py-2 flex md:flex-row flex-col items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">NotesShare</h1>
          {user && (
            <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              {user.university}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg">
              <Award className="w-5 h-5" />
              <span className="font-semibold">{credits} Credits</span>
            </div>
          )}
          
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onProfileClick}
                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Login / Sign Up</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};