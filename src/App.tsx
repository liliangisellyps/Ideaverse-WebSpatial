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
    <div className="min-h-screen overflow-hidden" style={{
      '--xr-background-material': 'transparent',
      'background-color': 'transparent'
    }}
    enable-xr>
      {/* Main content */}
      <div className="relative min-h-screen pt-24" style={{ perspective: '2000px' }}>
        {/* Left side - Task cards */}
        <div className="absolute top-1/2 -translate-y-1/2 space-y-6" style={{ left: '32px' }}>
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
          className="absolute top-1/2 z-10"
          style={{
            left: '49%',
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