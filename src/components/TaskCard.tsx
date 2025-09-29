import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';

interface TaskCardProps {
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'green';
  icon?: React.ReactNode;
  className?: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  title, 
  description, 
  color, 
  icon,
  className = '',
  onDelete,
  onEdit
}) => {
  const colorStyles = {
    blue: {
      bg: 'bg-blue-50/90',
      border: 'border-blue-200/60',
      accent: 'bg-blue-500',
      text: 'text-blue-900',
      icon: 'text-blue-500'
    },
    purple: {
      bg: 'bg-purple-50/90',
      border: 'border-purple-200/60', 
      accent: 'bg-purple-500',
      text: 'text-purple-900',
      icon: 'text-purple-500'
    },
    green: {
      bg: 'bg-green-50/90',
      border: 'border-green-200/60',
      accent: 'bg-green-500', 
      text: 'text-green-900',
      icon: 'text-green-500'
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
      <div className={`absolute top-5 left-5 w-3 h-3 ${style.accent} rounded-full`} />
      
      <div className="relative z-10 ml-6">
        <h3 className={`${style.text} font-semibold mb-2`}>{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        <div className="mt-3 flex justify-end items-center gap-2">
          {icon}
          {onEdit && (
            <button
              onClick={onEdit}
              className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100"
              aria-label="Edit task"
              title="Edit task"
              type="button"
            >
              <Edit2 className={`w-4 h-4 ${style.icon}`} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100"
              aria-label="Delete task"
              title="Delete task"
              type="button"
            >
              <Trash2 className={`w-4 h-4 ${style.icon}`} />
            </button>
          )}
        </div>
      </div>
      
      <div className={`absolute inset-0 rounded-2xl ${style.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
    </div>
  );
};