import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { useWindows } from '../context/WindowContext';

const Window = ({ app, isDarkMode }) => {
  const { id, title, icon, isMinimized, isMaximized, zIndex, component, defaultSize } = app;
  const { closeWindow, minimizeWindow, toggleMaximize, focusWindow, getActiveWindowId } = useWindows();
  
  const constraintsRef = useRef(null);
  const isActive = getActiveWindowId() === id;

  if (isMinimized) return null;

  return (
    <motion.div
      drag={!isMaximized}
      dragConstraints={{ top: 0, left: 0, right: window.innerWidth - 200, bottom: window.innerHeight - 100 }}
      dragHandle=".window-header"
      dragMomentum={false}
      onMouseDown={() => focusWindow(id)}
      initial={{ opacity: 0, scale: 0.95, x: window.innerWidth / 2 - (defaultSize?.width || 600) / 2, y: window.innerHeight / 2 - (defaultSize?.height || 400) / 2 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        ...(isMaximized 
          ? { x: 0, y: 0, width: '100%', height: 'calc(100vh - 48px)' } 
          : { width: defaultSize?.width || 600, height: defaultSize?.height || 400 })
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      style={{ zIndex }}
      className={`absolute flex flex-col bg-white/75 dark:bg-slate-900/80 backdrop-blur-2xl rounded-2xl overflow-hidden transition-all duration-300 pointer-events-auto
        ${isActive 
          ? 'border border-white/35 dark:border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25),0_15px_35px_-8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.3)_inset] ring-1 ring-blue-500/10' 
          : 'border border-white/15 dark:border-white/5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.15)_inset]'}`}
    >
      {/* Window Header */}
      <div 
        className="window-header flex items-center justify-between px-3 py-2 bg-white/30 dark:bg-slate-950/20 border-b border-white/20 dark:border-white/10 select-none cursor-move"
        onDoubleClick={() => toggleMaximize(id)}
      >
        <div className="flex items-center gap-2">
          {React.cloneElement(icon, { size: 16 })}
          <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
          >
            <Minus size={14} className="text-gray-600 dark:text-slate-400" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
            className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
          >
            <Square size={12} className="text-gray-600 dark:text-slate-400" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="p-1 hover:bg-red-500 hover:text-white rounded transition-colors"
          >
            <X size={14} className="text-gray-600 dark:text-slate-400 hover:text-white dark:hover:text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto relative dark:bg-slate-950 dark:text-slate-100">
        {component}
      </div>
    </motion.div>
  );
};

export default Window;
