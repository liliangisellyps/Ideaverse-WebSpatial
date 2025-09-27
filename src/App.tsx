import React, { useState } from 'react';
import { Header } from './components/Header';
import { TaskCard } from './components/TaskCard';
import { FocusPanel } from './components/FocusPanel';
import { EnhancedTimerPanel } from './components/EnhancedTimerPanel';
import { EnhancedCanvasPanel } from './components/EnhancedCanvasPanel';
import { TagCloud } from './components/TagCloud';
import { BarChart3, Brain, Users, Plus, X } from 'lucide-react';
import './App.css';


interface TaskCardData {
  id: number;
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'green';
  icon: React.ReactNode;
  transform: string;
  className: string;
}

export default function App() {
  const [taskCards, setTaskCards] = useState<TaskCardData[]>([
    {
      id: 1,
      title: "Market Research",
      description: "Analyze competitor landscape, identify target demographics, and validate product-market fit assumptions.",
      color: "blue",
      icon: <BarChart3 className="w-5 h-5 text-blue-500" />,
      transform: 'translateZ(60px) rotateY(8deg)',
      className: ''
    },
    {
      id: 2,
      title: "Brainstorm AI Features",
      description: "Explore intelligent automation, personalization algorithms, and predictive analytics capabilities.",
      color: "purple",
      icon: <Brain className="w-5 h-5 text-purple-500" />,
      transform: 'translateZ(80px) rotateY(12deg)',
      className: 'ml-6'
    },
    {
      id: 3,
      title: "User Testing",
      description: "Design usability tests, gather feedback sessions, and iterate based on user insights.",
      color: "green",
      icon: <Users className="w-5 h-5 text-green-500" />,
      transform: 'translateZ(100px) rotateY(15deg)',
      className: 'ml-3'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskColor, setNewTaskColor] = useState<'blue' | 'purple' | 'green'>('blue');

  const addTaskCard = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      const colors = ['blue', 'purple', 'green'] as const;
      const icons = [
        <BarChart3 className="w-5 h-5 text-blue-500" />,
        <Brain className="w-5 h-5 text-purple-500" />,
        <Users className="w-5 h-5 text-green-500" />
      ];
      
      const newTask: TaskCardData = {
        id: Date.now(),
        title: newTaskTitle,
        description: newTaskDescription,
        color: newTaskColor,
        icon: icons[colors.indexOf(newTaskColor)],
        transform: `translateZ(${Math.random() * 100 + 50}px) rotateY(${Math.random() * 30 + 5}deg)`,
        className: `ml-${Math.floor(Math.random() * 8)}`
      };
      
      setTaskCards([...taskCards, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setShowAddForm(false);
    }
  };

  const deleteTaskCard = (id: number) => {
    setTaskCards(taskCards.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen overflow-hidden" style={{
      '--xr-background-material': 'transparent',
      backgroundColor: 'transparent'
    }}
    enable-xr>
      {/* Main content */}
      <div className="relative min-h-screen pt-24" style={{ perspective: '2000px' }}>
         {/* Add Task Form */}
         {showAddForm && (
           <div className="absolute top-1/2 -translate-y-1/2 z-20" style={{ left: 'calc(360px)' }}>
             <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 h-[500px]" style={{ width: '300px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">New Task</h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3 text-gray-600" />
              </button>
            </div>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Título da tarefa..."
              className="w-full p-3 border border-gray-200 rounded-xl text-sm mb-3"
            />
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Descrição da tarefa..."
              className="w-full p-3 border border-gray-200 rounded-xl resize-none h-20 text-sm mb-3"
            />
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Cor:</span>
              {(['blue', 'purple', 'green'] as const).map(color => (
                <button
                  key={color}
                  onClick={() => setNewTaskColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    newTaskColor === color ? 'border-gray-400' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color === 'blue' ? '#3b82f6' : color === 'purple' ? '#8b5cf6' : '#10b981' }}
                />
              ))}
            </div>
            <button
              onClick={addTaskCard}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              Adicionar Tarefa
            </button>
            </div>
          </div>
        )}

        {/* Left side - Task cards */}
        <div className="absolute top-1/2 -translate-y-1/2 space-y-6" style={{ left: '32px' }}>
          {/* Add Task Button */}
          <div className="mb-4">
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors shadow-lg"
            >
              <Plus className="w-6 h-6 text-blue-600" />
            </button>
          </div>

          {taskCards.map((task) => (
            <div
              key={task.id}
              style={{ transform: task.transform }}
              className={`relative group ${task.className}`}
            >
              <TaskCard
                title={task.title}
                description={task.description}
                color={task.color}
                icon={task.icon}
                onDelete={() => deleteTaskCard(task.id)}
              />
            </div>
          ))}
        </div>
        
        {/* Center - Canvas */}
        <div 
          className="absolute top-1/2 z-10 transition-all duration-300"
          style={{
            left: showAddForm ? 'calc(49% + 200px)' : '49%',
            transform: 'translate(-50%, -50%) translateZ(0px)',
          }}
        >
          <EnhancedCanvasPanel />
        </div>
        
        {/* Right side - Focus and Timer */}
        <div className="absolute top-1/2 -translate-y-1/2 space-y-8" style={{ left: 'calc(100% - 340px)' }}>
          <div
            style={{
              transform: 'translateZ(70px) rotateY(-8deg)',
            }}
          >
            <FocusPanel />
          </div>
          
          <div
            style={{
              transform: 'translateZ(90px) rotateY(-12deg)',
            }}
          >
            <EnhancedTimerPanel />
          </div>
        </div>
      </div>
    </div>
  );
}