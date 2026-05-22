import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { useWindows } from '../context/WindowContext';

const Window = ({ app, isDarkMode }) => {
  const { id, title, icon, isMinimized, isMaximized, zIndex, component, defaultSize } = app;
  const { closeWindow, minimizeWindow, toggleMaximize, focusWindow, getActiveWindowId } = useWindows();

  // Clamp size to viewport
  const rawW = defaultSize?.width || 600;
  const rawH = defaultSize?.height || 400;
  const w = Math.min(rawW, window.innerWidth - 32);
  const h = Math.min(rawH, window.innerHeight - 80);

  const centerX = Math.round(Math.max(0, window.innerWidth / 2 - w / 2));
  const centerY = Math.round(Math.max(0, Math.min(window.innerHeight / 2 - h / 2, window.innerHeight - h - 60)));

  const x = useMotionValue(centerX);
  const y = useMotionValue(centerY);

  const savedPos = useRef({ x: centerX, y: centerY });
  const wasMinimized = useRef(isMinimized);

  useEffect(() => {
    if (!wasMinimized.current && isMinimized) {
      savedPos.current = { x: x.get(), y: y.get() };
    }
    if (wasMinimized.current && !isMinimized) {
      x.set(savedPos.current.x);
      y.set(savedPos.current.y);
    }
    wasMinimized.current = isMinimized;
  }, [isMinimized]);

  const isActive = getActiveWindowId() === id;

  const tbCx = window.innerWidth / 2;
  const tbCy = window.innerHeight - 28;
  const winCx = savedPos.current.x + w / 2;
  const winCy = savedPos.current.y + h / 2;
  const deltaX = tbCx - winCx;
  const deltaY = tbCy - winCy;

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          key={id}
          drag={!isMaximized}
          dragConstraints={{
            top: 0,
            left: 0,
            right: Math.max(0, window.innerWidth - w),
            bottom: Math.max(0, window.innerHeight - h - 48),
          }}
          dragHandle=".window-header"
          dragMomentum={false}
          onMouseDown={() => focusWindow(id)}
          style={{
            position: 'absolute',
            zIndex,
            x: isMaximized ? 0 : x,
            y: isMaximized ? 0 : y,
            width: isMaximized ? '100%' : w,
            height: isMaximized ? 'calc(100vh - 48px)' : h,
            transition: 'width 0.42s cubic-bezier(0.22,1,0.36,1), height 0.42s cubic-bezier(0.22,1,0.36,1), border-radius 0.35s cubic-bezier(0.22,1,0.36,1)',
            borderRadius: isMaximized ? 0 : 16,
            overflow: 'hidden',
            maxWidth: '100vw',
            maxHeight: 'calc(100vh - 48px)',
          }}
        >
          <motion.div
            style={{ width: '100%', height: '100%', originX: 0.5, originY: 0.5 }}
            initial={{ scale: 0.6, opacity: 0, x: deltaX, y: deltaY }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            exit={{
              scale: 0.5, opacity: 0, x: deltaX, y: deltaY,
              transition: { type: 'spring', stiffness: 310, damping: 28, mass: 0.75 },
            }}
            transition={{ type: 'spring', stiffness: 370, damping: 32, mass: 0.85 }}
            className={`flex flex-col bg-white/75 dark:bg-slate-900/80 backdrop-blur-2xl h-full w-full pointer-events-auto will-change-[transform,opacity]
              ${isActive
                ? 'border border-white/35 dark:border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25),0_15px_35px_-8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.3)_inset] ring-1 ring-blue-500/10'
                : 'border border-white/15 dark:border-white/5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.15)_inset]'}`}
          >
            {/* Header */}
            <div
              className="window-header flex items-center justify-between px-3 py-2 bg-white/30 dark:bg-slate-950/20 border-b border-white/20 dark:border-white/10 select-none cursor-move flex-shrink-0 min-w-0"
              onDoubleClick={() => toggleMaximize(id)}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
                <span className="flex-shrink-0">{React.cloneElement(icon, { size: 16 })}</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-200 truncate">{title}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                  className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors">
                  <Minus size={14} className="text-gray-600 dark:text-slate-400" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
                  className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors">
                  <Square size={12} className="text-gray-600 dark:text-slate-400" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                  className="p-1 hover:bg-red-500 hover:text-white rounded transition-colors">
                  <X size={14} className="text-gray-600 dark:text-slate-400 hover:text-white dark:hover:text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto relative dark:bg-slate-950 dark:text-slate-100 min-h-0 min-w-0">
              {component}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;
