import React, { useRef, useEffect, useState } from 'react';
import { Edit, Share, Eraser, Download } from 'lucide-react';

export const EnhancedCanvasPanel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(2);
  const [brushColor, setBrushColor] = useState('#000000');
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set default styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getEventPos = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    // Try different event types
    if (e.touches && e.touches.length > 0) {
      // Touch event
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      // Touch end event
      const touch = e.changedTouches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else if (e.clientX !== undefined) {
      // Mouse or pointer event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    } else if (e.pageX !== undefined) {
      // Fallback for other events
      return {
        x: e.pageX - rect.left,
        y: e.pageY - rect.top
      };
    }
    
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x, y } = getEventPos(e);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x, y } = getEventPos(e);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isErasing ? '#ffffff' : brushColor;
    ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e?: any) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'canvas-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };
  return (
    <div className="relative w-[600px] h-[500px] bg-white/90 backdrop-blur-md border border-gray-200/60 rounded-3xl shadow-lg" enable-xr>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 font-semibold text-lg">IdeaVerse Canvas</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsErasing(!isErasing)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isErasing ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              <Eraser className="w-4 h-4" />
            </button>
            <button 
              onClick={clearCanvas}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              onClick={downloadCanvas}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Canvas content */}
      <div className="absolute inset-0 top-20 p-4">
        {/* Drawing Canvas */}
        <div className="relative w-full h-full">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
            className="w-full h-full border border-gray-200 rounded-2xl cursor-crosshair bg-white"
            style={{ 
              touchAction: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none'
            }}
          />
        </div>
        
        {/* Drawing Controls */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-3 flex items-center gap-4">
          {/* Color Picker */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Cor:</label>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
            />
          </div>
          
          {/* Brush Size */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Tamanho:</label>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-20"
            />
            <span className="text-xs text-gray-500 w-6">{brushSize}px</span>
          </div>
          
          {/* Mode Indicator */}
          <div className="ml-auto">
            <span className={`text-xs px-2 py-1 rounded-full ${
              isErasing ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
            }`}>
              {isErasing ? 'Apagar' : 'Desenhar'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};