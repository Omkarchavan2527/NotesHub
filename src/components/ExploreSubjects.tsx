// src/components/ExploreSubjects.tsx
import React, { useState, useEffect } from 'react';
import { FlaskConical } from "lucide-react";
import { useNavigate } from 'react-router-dom';

import { 
  Calculator, 
  Code, 
  
  Briefcase, 
  Languages, 
  Palette, 
  Brain, 
  Wrench,
} from 'lucide-react';

interface SubjectCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  notesCount: number;
}

interface ExploreSubjectsProps {
  onSelectSubject: (subject: string) => void;
}

export const ExploreSubjects: React.FC<ExploreSubjectsProps> = ({ onSelectSubject }) => {
  const [categories, setCategories] = useState<SubjectCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  const handleSubjectClick = (subjectName:string)=>{
    onSelectSubject(subjectName);
    navigate(`/subject/${encodeURIComponent(subjectName)}`);
  }
  useEffect(() => {
    loadSubjectCategories();
  }, []);

  const loadSubjectCategories = async () => {
    try {
      setLoading(true);
      // In production, fetch from API
      // const response = await apiService.getSubjectCategories();
      
      // Mock data for now
      const mockCategories: SubjectCategory[] = [
        {
          id: 'mathematics',
          name: 'Mathematics',
          icon: <Calculator className="w-8 h-8" />,
          color: 'bg-blue-500',
          notesCount: 5200
        },
        {
          id: 'computer-science',
          name: 'Computer Science',
          icon: <Code className="w-8 h-8" />,
          color: 'bg-purple-500',
          notesCount: 8100
        },
        {
          id: 'physics',
          name: 'Physics',
          icon: <FlaskConical className="w-6 h-6" />,
          color: 'bg-green-500',
          notesCount: 3400
        },
        {
          id: 'business',
          name: 'Business',
          icon: <Briefcase className="w-8 h-8" />,
          color: 'bg-orange-500',
          notesCount: 4700
        },
        {
          id: 'languages',
          name: 'Languages',
          icon: <Languages className="w-8 h-8" />,
          color: 'bg-pink-500',
          notesCount: 6300
        },
        {
          id: 'arts',
          name: 'Arts',
          icon: <Palette className="w-8 h-8" />,
          color: 'bg-red-500',
          notesCount: 2900
        },
        {
          id: 'psychology',
          name: 'Psychology',
          icon: <Brain className="w-8 h-8" />,
          color: 'bg-indigo-500',
          notesCount: 3800
        },
        {
          id: 'engineering',
          name: 'Engineering',
          icon: <Wrench className="w-8 h-8" />,
          color: 'bg-teal-500',
          notesCount: 7500
        }
      ];

      setCategories(mockCategories);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
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
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Explore by Subject
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Find notes across various subjects and topics
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleSubjectClick(category.name)}
            className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 text-center group hover:-translate-y-1"
          >
            {/* Icon */}
            <div className={`${category.color} text-white w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
              {category.icon}
            </div>

            {/* Category Name */}
            <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2">
              {category.name}
            </h3>

            {/* Notes Count */}
            <p className="text-xs sm:text-sm text-gray-500">
              {formatCount(category.notesCount)} notes
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};