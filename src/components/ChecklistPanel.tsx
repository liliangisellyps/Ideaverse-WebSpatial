import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

export const ChecklistPanel: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 1, text: 'Define target audience', completed: true },
    { id: 2, text: 'Create user personas', completed: true },
    { id: 3, text: 'Design wireframes', completed: false },
    { id: 4, text: 'Build prototype', completed: false },
    { id: 5, text: 'User testing session', completed: false },
    { id: 6, text: 'Refine based on feedback', completed: false },
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="w-80 h-96 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-white/90 text-lg mb-2">Project Checklist</h3>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-blue-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(items.filter(item => item.completed).length / items.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Checklist items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => toggleItem(item.id)}
          >
            <div className={`
              w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
              ${item.completed 
                ? 'bg-green-500 border-green-400' 
                : 'border-white/30 hover:border-white/50'
              }
            `}>
              {item.completed && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className={`
              text-sm transition-all duration-200
              ${item.completed 
                ? 'text-white/60 line-through' 
                : 'text-white/90'
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