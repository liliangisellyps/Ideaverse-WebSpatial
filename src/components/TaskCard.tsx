import React from 'react';
import { Trash2 } from 'lucide-react';

interface TaskCardProps {
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'green';
  icon?: React.ReactNode;
  className?: string;
  onDelete?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  title, 
  description, 
  color, 
  icon,
  className = '',
  onDelete
}) => {
  const colorStyles = {
    blue: {
      bg: 'bg-blue-50/90',
      border: 'border-blue-200/60',
      accent: 'bg-blue-500',
      text: 'text-blue-900'
    },
    purple: {
      bg: 'bg-purple-50/90',
      border: 'border-purple-200/60', 
      accent: 'bg-purple-500',
      text: 'text-purple-900'
    },
    green: {
      bg: 'bg-green-50/90',
      border: 'border-green-200/60',
      accent: 'bg-green-500', 
      text: 'text-green-900'
    }
  };

  const style = colorStyles[color];

  return (
    <div className={`
      relative w-64 backdrop-blur-md border rounded-2xl p-5 
      ${style.bg} ${style.border}
      shadow-lg hover:shadow-xl transition-all duration-300 
      hover:scale-105 cursor-pointer group
      ${className}
    `} 
    enable-xr
    >
      {/* Color accent dot */}
      <div className={`absolute top-5 left-5 w-3 h-3 ${style.accent} rounded-full`} />
      
      {/* Content */}
      <div className="ml-6">
        <h3 className={`${style.text} font-semibold mb-2`}>{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        {icon && (
          <div className="mt-3 flex justify-end">
            {icon}
          </div>
        )}
      </div>
      
      {/* Subtle glow on hover */}
      <div className={`absolute inset-0 rounded-2xl ${style.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Delete button */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 w-6 h-6 bg-red-100 hover:bg-red-200 rounded flex items-center justify-center opacity-100 transition-opacity duration-200"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      )}
    </div>
  );
};