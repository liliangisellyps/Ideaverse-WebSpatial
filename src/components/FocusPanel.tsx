import React, { useState } from 'react';
import { Check, Circle, Plus, Edit2, Trash2 } from 'lucide-react';

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
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addItem = () => {
    if (newItemText.trim()) {
      const newItem: FocusItem = {
        id: Date.now(),
        text: newItemText,
        completed: false
      };
      setItems([...items, newItem]);
      setNewItemText('');
      setShowAddForm(false);
    }
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    if (editingText.trim() && editingId) {
      setItems(items.map(item => 
        item.id === editingId ? { ...item, text: editingText } : item
      ));
      setEditingId(null);
      setEditingText('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="w-80 bg-white/90 backdrop-blur-md border border-gray-200/60 rounded-3xl shadow-lg p-6" enable-xr>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900 font-semibold">Today's Focus</h3>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm">{items.filter(item => !item.completed).length}</span>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>
      
      {/* Add Item Form */}
      {showAddForm && (
        <div className="mb-4 p-3 bg-gray-50 rounded-xl">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Nova tarefa..."
            className="w-full p-2 border border-gray-200 rounded-lg text-sm mb-2"
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
          />
          <div className="flex gap-2">
            <button
              onClick={addItem}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              Adicionar
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      
      {/* Focus items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50/80 transition-colors group"
          >
            <div className="relative" onClick={() => toggleItem(item.id)}>
              {item.completed ? (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center cursor-pointer">
                  <Check className="w-3 h-3 text-white" />
                </div>
              ) : (
                <Circle className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors cursor-pointer" />
              )}
            </div>
            
            {editingId === item.id ? (
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-1 p-1 border border-gray-200 rounded text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                  autoFocus
                />
                <button
                  onClick={saveEdit}
                  className="w-6 h-6 bg-green-500 text-white rounded flex items-center justify-center"
                >
                  <Check className="w-3 h-3" />
                </button>
                <button
                  onClick={cancelEdit}
                  className="w-6 h-6 bg-gray-400 text-white rounded flex items-center justify-center"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <>
                <span className={`
                  text-sm transition-all duration-200 flex-1 cursor-pointer
                  ${item.completed 
                    ? 'text-gray-500 line-through' 
                    : 'text-gray-700'
                  }
                `} onClick={() => toggleItem(item.id)}>
                  {item.text}
                </span>
                <div className="flex gap-1 opacity-100 transition-opacity">
                  <button
                    onClick={() => startEdit(item.id, item.text)}
                    className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="w-6 h-6 bg-red-100 hover:bg-red-200 rounded flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};