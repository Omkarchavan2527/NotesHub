// src/components/PreviewModal.tsx
import React from 'react';
import { X, Download } from 'lucide-react';
import type{ Note } from '../types';

interface PreviewModalProps {
  note: Note | null;
  showFreeDownload: boolean;
  hasUser: boolean;
  credits: number;
  onClose: () => void;
  onDownload: (note: Note) => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  note,
  showFreeDownload,
  hasUser,
  credits,
  onClose,
  onDownload
}) => {
  if (!note) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-5xl w-full h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
                        <h3 className="text-xl font-bold text-gray-800 truncate overflow-hidden whitespace-nowrap max-w-xs">{note.title}</h3>
            <p className="text-sm text-gray-500">
              {note.university} • {note.stream} • {note.class}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onDownload(note);
              }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-gray-50 p-8">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <div className="space-y-6">
              <div className="border-2 border-gray-200 rounded-lg p-8 bg-white">
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2 truncate overflow-hidden whitespace-nowrap max-w-xs">{note.title}</h1>
                  <p className="text-lg text-gray-600">{note.subject}</p>
                  <p className="text-md text-gray-500 mt-2">{note.university}</p>
                </div>
                
                <div className="border-t-2 border-gray-300 pt-6 mt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {note.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    This document contains comprehensive notes covering key concepts, 
                    examples, and practice problems. The content is organized systematically 
                    to help students understand the fundamental principles and applications.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Topics Covered:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Introduction to core concepts</li>
                    <li>Detailed explanations with examples</li>
                    <li>Problem-solving techniques</li>
                    <li>Practice exercises and solutions</li>
                  </ul>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                  Page 1 of {note.pages}
                </div>
              </div>

              <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="p-8 bg-white filter blur-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Content</h2>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white rounded-lg p-6 text-center max-w-sm">
                    <Download className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Download to View Full Content
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {showFreeDownload && !hasUser
                        ? 'First download is FREE!' 
                        : hasUser 
                        ? `Costs 1 credit • ${credits} credits available`
                        : 'Login to continue downloading'}
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onDownload(note);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      Download Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">File Type:</span>
                    <span className="ml-2 text-gray-600">{note.fileType.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Pages:</span>
                    <span className="ml-2 text-gray-600">{note.pages}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Uploaded By:</span>
                    <span className="ml-2 text-gray-600">{note.uploaderName}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Upload Date:</span>
                    <span className="ml-2 text-gray-600">{note.uploadDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
