import React from 'react';

interface Tag {
  id: number;
  label: string;
  color: 'purple' | 'green' | 'blue' | 'orange';
}

export const TagCloud: React.FC = () => {
  const tags: Tag[] = [
    { id: 1, label: 'User Experience', color: 'purple' },
    { id: 2, label: 'Technology Stack', color: 'green' },
    { id: 3, label: 'Design System', color: 'blue' },
    { id: 4, label: 'Performance', color: 'orange' },
  ];

  const colorStyles = {
    purple: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    green: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white', 
    blue: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    orange: 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
  };

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex gap-3">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              ${colorStyles[tag.color]}
              shadow-lg hover:shadow-xl transition-all duration-300
              hover:scale-105 cursor-pointer backdrop-blur-md
            `}
          >
            {tag.label}
          </div>
        ))}
      </div>
    </div>
  );
};