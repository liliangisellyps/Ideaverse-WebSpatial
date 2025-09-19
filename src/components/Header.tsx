import React from 'react';
import { Wifi } from 'lucide-react';

export const Header: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-6">
      {/* Left side - App title */}
      <div>
        <h1 className="text-2xl text-gray-900 font-medium">IdeaVerse</h1>
        <p className="text-gray-600 text-sm">Spatial Creativity Studio</p>
      </div>
      
      {/* Right side - Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full px-3 py-1.5">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-gray-700 text-sm">Connected</span>
        </div>
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-full px-3 py-1.5">
          <span className="text-gray-700 text-sm">{currentTime}</span>
        </div>
      </div>
    </div>
  );
};