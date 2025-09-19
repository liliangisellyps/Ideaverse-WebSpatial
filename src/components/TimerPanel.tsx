import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const TimerPanel: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const initialTime = 25 * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  return (
    <div className="w-80 h-80 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center">
      {/* Timer display */}
      <div className="relative mb-8">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgb(59, 130, 246)"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))'
            }}
          />
        </svg>
        
        {/* Time text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-2xl font-mono">{formatTime(timeLeft)}</span>
        </div>
      </div>
      
      {/* Session label */}
      <div className="mb-6 text-center">
        <h3 className="text-white/90 text-lg mb-1">Focus Session</h3>
        <p className="text-white/60 text-sm">Pomodoro Timer</p>
      </div>
      
      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/60 backdrop-blur-md flex items-center justify-center hover:bg-blue-500/30 transition-colors"
        >
          {isRunning ? (
            <Pause className="w-5 h-5 text-blue-400" />
          ) : (
            <Play className="w-5 h-5 text-blue-400 ml-0.5" />
          )}
        </button>
        
        <button
          onClick={resetTimer}
          className="w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <RotateCcw className="w-5 h-5 text-white/70" />
        </button>
      </div>
    </div>
  );
};