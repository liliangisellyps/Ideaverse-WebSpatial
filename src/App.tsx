import React from 'react';
import { Header } from './components/Header';
import { TaskCard } from './components/TaskCard';
import { FocusPanel } from './components/FocusPanel';
import { EnhancedTimerPanel } from './components/EnhancedTimerPanel';
import { EnhancedCanvasPanel } from './components/EnhancedCanvasPanel';
import { TagCloud } from './components/TagCloud';
import { BarChart3, Brain, Users } from 'lucide-react';
import './App.css';


export default function App() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Subtle background pattern */}
      {/* <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div> */}
      
      {/* Main content */}
      <div className="relative min-h-screen pt-24" style={{ perspective: '2000px' }}>
        {/* Left side - Task cards */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-6">
          <div
            style={{
              transform: 'translateZ(60px) rotateY(8deg)',
            }}
          >
            <TaskCard
              title="Market Research"
              description="Analyze competitor landscape, identify target demographics, and validate product-market fit assumptions."
              color="blue"
              icon={<BarChart3 className="w-5 h-5 text-blue-500" />}
            />
          </div>
          
          <div
            style={{
              transform: 'translateZ(80px) rotateY(12deg)',
            }}
            className="ml-6"
          >
            <TaskCard
              title="Brainstorm AI Features"
              description="Explore intelligent automation, personalization algorithms, and predictive analytics capabilities."
              color="purple"
              icon={<Brain className="w-5 h-5 text-purple-500" />}
            />
          </div>
          
          <div
            style={{
              transform: 'translateZ(100px) rotateY(15deg)',
            }}
            className="ml-3"
          >
            <TaskCard
              title="User Testing"
              description="Design usability tests, gather feedback sessions, and iterate based on user insights."
              color="green"
              icon={<Users className="w-5 h-5 text-green-500" />}
            />
          </div>
        </div>
        
        {/* Center - Canvas */}
        <div 
          className="absolute top-1/2 left-1/2 z-10"
          style={{
            transform: 'translate(-50%, -50%) translateZ(0px)',
          }}
        >
          <EnhancedCanvasPanel />
        </div>
        
        {/* Right side - Focus and Timer */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-8">
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
            className="mr-4"
          >
            <EnhancedTimerPanel />
          </div>
        </div>
      </div>
      
      
      {/* Ambient lighting effects for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/3 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
}