import React from 'react';

export const CanvasPanel: React.FC = () => {
  return (
    <div className="relative w-[800px] h-[600px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
      {/* Glass panel header */}
      <div className="absolute top-0 left-0 right-0 p-6 border-b border-white/10">
        <h2 className="text-white/90 text-xl">Canvas</h2>
      </div>
      
      {/* Canvas content */}
      <div className="absolute inset-0 top-16 p-8">
        {/* Central idea node */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 border-2 border-blue-400/60 rounded-2xl backdrop-blur-md flex items-center justify-center">
          <span className="text-white/90 text-center text-sm">Core Idea</span>
        </div>
        
        {/* Connected nodes */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-purple-500/20 border-2 border-purple-400/60 rounded-xl backdrop-blur-md flex items-center justify-center">
          <span className="text-white/90 text-xs text-center">Research</span>
        </div>
        
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-green-500/20 border-2 border-green-400/60 rounded-xl backdrop-blur-md flex items-center justify-center">
          <span className="text-white/90 text-xs text-center">Features</span>
        </div>
        
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-orange-500/20 border-2 border-orange-400/60 rounded-xl backdrop-blur-md flex items-center justify-center">
          <span className="text-white/90 text-xs text-center">Design</span>
        </div>
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Lines connecting nodes */}
          <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" filter="url(#glow)" />
          <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" filter="url(#glow)" />
          <line x1="50%" y1="50%" x2="66%" y2="25%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" filter="url(#glow)" />
        </svg>
      </div>
    </div>
  );
};