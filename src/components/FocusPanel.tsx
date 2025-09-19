import React, { useState } from 'react';
import { Check, Circle } from 'lucide-react';

interface FocusItem {
  id: number;
  text: string;
  completed: boolean;
}

export const FocusPanel: React.FC = () => {
  const [items, setItems] = useState<FocusItem[]>([
    { id: 1, text: 'Review user feedback', completed: true },
    { id: 2, text: 'Update wireframes', completed: false },
    { id: 3, text: 'Prototype new interaction', completed: false },
    { id: 4, text: 'Schedule team sync', completed: false },
    { id: 5, text: 'Research AR best practices', completed: false },
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="w-80 bg-white/90 backdrop-blur-md border border-gray-200/60 rounded-3xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900 font-semibold">Today's Focus</h3>
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-sm">{items.filter(item => !item.completed).length}</span>
        </div>
      </div>
      
      {/* Focus items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50/80 transition-colors cursor-pointer group"
            onClick={() => toggleItem(item.id)}
          >
            <div className="relative">
              {item.completed ? (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              ) : (
                <Circle className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              )}
            </div>
            <span className={`
              text-sm transition-all duration-200 flex-1
              ${item.completed 
                ? 'text-gray-500 line-through' 
                : 'text-gray-700'
              }
            `}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};