import React from 'react';
import { Edit, Share } from 'lucide-react';

export const EnhancedCanvasPanel: React.FC = () => {
  return (
    <div className="relative w-[600px] h-[500px] bg-white/90 backdrop-blur-md border border-gray-200/60 rounded-3xl shadow-lg" enable-xr>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 font-semibold text-lg">IdeaVerse Canvas</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <Share className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Canvas content */}
      <div className="absolute inset-0 top-20 p-8 flex items-center justify-center">
        {/* Placeholder content - minimal and clean */}
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg"></div>
          </div>
          <p className="text-gray-500 text-sm">Start creating your ideas</p>
          <p className="text-gray-400 text-xs mt-1">Click anywhere to begin</p>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-purple-400 rounded-full opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-pink-300 rounded-full opacity-30"></div>
      </div>
    </div>
  );
};