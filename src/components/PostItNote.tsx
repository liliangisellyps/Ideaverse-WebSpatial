import React from 'react';

interface PostItNoteProps {
  text: string;
  color: 'yellow' | 'pink' | 'blue' | 'green' | 'purple';
  className?: string;
}

export const PostItNote: React.FC<PostItNoteProps> = ({ text, color, className = '' }) => {
  const colorClasses = {
    yellow: 'bg-yellow-400/80 border-yellow-300/60 shadow-yellow-400/40',
    pink: 'bg-pink-400/80 border-pink-300/60 shadow-pink-400/40',
    blue: 'bg-blue-400/80 border-blue-300/60 shadow-blue-400/40',
    green: 'bg-green-400/80 border-green-300/60 shadow-green-400/40',
    purple: 'bg-purple-400/80 border-purple-300/60 shadow-purple-400/40',
  };

  return (
    <div className={`
      relative w-48 h-36 backdrop-blur-md border rounded-2xl p-4 
      ${colorClasses[color]} 
      shadow-lg hover:shadow-xl transition-all duration-300 
      hover:scale-105 cursor-pointer group
      ${className}
    `}>
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 ${colorClasses[color].split(' ')[0]}`} />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <p className="text-gray-900 text-center font-medium">{text}</p>
      </div>
      
      {/* Corner fold effect */}
      <div className="absolute top-0 right-0 w-6 h-6 bg-white/20 rounded-bl-lg" />
    </div>
  );
};