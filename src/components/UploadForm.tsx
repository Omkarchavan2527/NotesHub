// src/components/UploadForm.tsx
import React from 'react';
import { FileText, Presentation, User } from 'lucide-react';
import type{ UploadFormData, University } from '../types';
import type{ User as UserType } from '../types';

interface UploadFormProps {
 user: UserType | null;

  formData: UploadFormData;
  universities: University[];
  loading: boolean;
  onFormChange: (data: Partial<UploadFormData>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}



export const UploadForm: React.FC<UploadFormProps> = ({
   user, 
  formData,
  universities,
  loading,
  onFormChange,
  onFileChange,
  onSubmit
}) => {
  const selectedUni = universities.find(u => u.name === formData.university);
  const selectedStream = selectedUni?.streams.find(s => s.name === formData.stream);
  const selectedClass = selectedStream?.classes.find(c => c.name === formData.class);

function moveToFirst <T extends { name: string }>
( array: T[], name?:string 

): T[] {
   if (!name) return array;

const index = array.findIndex( 
  item => item.name.toLowerCase() ===name.toLowerCase() );

if (index === -1) return array;

return [ array[index], ...array.slice(0, index), ...array.slice(index + 1),
]; };


const reorderedUniversities = moveToFirst( universities,user?.university );
  return (
    <div className="min-w-screen mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Your Notes</h2>
        
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-indigo-800">
            📚 <strong>How it works:</strong> Upload your PDF or PowerPoint to earn 1 credit. 
            Use credits to download notes from other students!
          </p>
        </div>

        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PDF or PowerPoint File <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
              <input
                type="file"
                accept=".pdf,.ppt,.pptx"
                onChange={onFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {formData.thumbnail ? (
                  <div className="flex flex-col items-center">
                    <img src={formData.thumbnail} alt="Preview" className="w-32 h-40 mb-2 rounded" />
                    <p className="text-sm text-gray-600">{formData.fileName}</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FileText className="w-8 h-8 text-gray-400" />
                      <Presentation className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">Click to upload PDF or PowerPoint</p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* University Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.university}
              onChange={(e) => onFormChange({ university: e.target.value, stream: '', class: '', subject: '' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
            >
              <option value="">Select University</option>
              {reorderedUniversities.map(uni => (
                <option key={uni._id || uni.id} value={uni.name}>{uni.name}</option>
              ))}
              <option value="other">Other (Add New)</option>
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

          {/* Stream Selection */}
          {formData.university && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stream <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.stream}
                onChange={(e) => onFormChange({ stream: e.target.value, class: '', subject: '' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
              >
                <option value="">Select Stream</option>
                {selectedUni?.streams.map(stream => (
                  <option key={stream.id} value={stream.name}>{stream.name}</option>
                ))}
                <option value="other">Other (Add New)</option>
              </select>
              {formData.stream === 'other' && (
                <input
                  type="text"
                  value={formData.newStream}
                  onChange={(e) => onFormChange({ newStream: e.target.value })}
                  placeholder="Enter stream name (e.g., Engineering, Commerce)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent mt-2 outline-none"
                />
              )}
            </div>
          )}

          {/* Class Selection */}
          {formData.stream && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.class}
                onChange={(e) => onFormChange({ class: e.target.value, subject: '' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
              >
                <option value="">Select Class</option>
                {selectedStream?.classes.map(cls => (
                  <option key={cls.id} value={cls.name}>{cls.name}</option>
                ))}
                <option value="other">Other (Add New)</option>
              </select>
              {formData.class === 'other' && (
                <input
                  type="text"
                  value={formData.newClass}
                  onChange={(e) => onFormChange({ newClass: e.target.value })}
                  placeholder="Enter class name (e.g., First Year, Second Year)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent mt-2 outline-none"
                />
              )}
            </div>
          )}

          {/* Subject Selection */}
          {formData.class && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.subject}
                onChange={(e) => onFormChange({ subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
              >
                <option value="">Select Subject</option>
                {selectedClass?.subjects.map((subject, idx) => (
                  <option key={idx} value={subject}>{subject}</option>
                ))}
                <option value="other">Other (Add New)</option>
              </select>
              {formData.subject === 'other' && (
                <input
                  type="text"
                  value={formData.newSubject}
                  onChange={(e) => onFormChange({ newSubject: e.target.value })}
                  placeholder="Enter subject name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent mt-2 outline-none"
                />
              )}
            </div>
          )}

          {/* Notes Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fileName}
              onChange={(e) => onFormChange({ fileName: e.target.value })}
              placeholder="e.g., Calculus Complete Notes Chapter 1-5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => onFormChange({ description: e.target.value })}
              placeholder="Brief description of what these notes cover..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
            />
          </div>

          <button
            onClick={onSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Upload & Earn 1 Credit'}
          </button>
        </div>
      </div>
    </div>
  );
};
