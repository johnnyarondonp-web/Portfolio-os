import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { useWindows } from '../context/WindowContext';

// ✍️ FUTURE RULE: any new window-size-dependent calculation MUST use `vp.w` / `vp.h` instead of `window.innerWidth` / `window.innerHeight`

const XP_HEADER_GRADIENT = 'linear-gradient(180deg, #0a246a 0%, #3a6ea5 8%, #5b9ad0 40%, #7bbae6 88%, #5b9ad0 93%, #3a6ea5 95%, #0a246a 100%)';
const XP_INACTIVE_HEADER = 'linear-gradient(180deg, #4a5e7a 0%, #6a7e9a 8%, #8a9eba 40%, #aabed6 88%, #8a9eba 93%, #6a7e9a 95%, #4a5e7a 100%)';
const XP_BTN_GRADIENT = 'linear-gradient(180deg, #f0f0f0 0%, #d4d0c8 50%, #b8b4a8 100%)';
const XP_BTN_HOVER = 'linear-gradient(180deg, #ffe0a0 0%, #fec85c 50%, #fea800 100%)';
const XP_CLOSE_GRADIENT = 'linear-gradient(180deg, #f0a0a0 0%, #d05050 50%, #b03030 100%)';
const XP_CLOSE_HOVER = 'linear-gradient(180deg, #ffc0c0 0%, #f05050 50%, #d03030 100%)';

const Window = ({ app, isDarkMode, themeMode }) => {
  const { id, title, icon, isMinimized, isMaximized, zIndex, component, defaultSize } = app;
  const { closeWindow, minimizeWindow, toggleMaximize, focusWindow, getActiveWindowId } = useWindows();

  const isXp = themeMode === 'xp';

  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const rawW = defaultSize?.width || 600;
  const rawH = defaultSize?.height || 400;
  const w = Math.min(rawW, vp.w - 32);
  const h = Math.min(rawH, vp.h - 80);

  const centerX = Math.round(Math.max(0, vp.w / 2 - w / 2));
  const centerY = Math.round(Math.max(0, Math.min(vp.h / 2 - h / 2, vp.h - h - 60)));

  const x = useMotionValue(centerX);
  const y = useMotionValue(centerY);

  const savedPos = useRef({ x: centerX, y: centerY });
  const wasMinimized = useRef(isMinimized);

  useEffect(() => {
    if (!wasMinimized.current && isMinimized) savedPos.current = { x: x.get(), y: y.get() };
    if (wasMinimized.current && !isMinimized) { x.set(savedPos.current.x); y.set(savedPos.current.y); }
    wasMinimized.current = isMinimized;
  }, [isMinimized]);

  const isActive = getActiveWindowId() === id;

  const tbCx = vp.w / 2;
  const tbCy = vp.h - 28;
  const winCx = savedPos.current.x + w / 2;
  const winCy = savedPos.current.y + h / 2;
  const deltaX = tbCx - winCx;
  const deltaY = tbCy - winCy;

  const [closeHover, setCloseHover] = useState(false);
  const [maxHover, setMaxHover] = useState(false);
  const [minHover, setMinHover] = useState(false);

  if (isXp) {
    const activeGrad = isActive ? XP_HEADER_GRADIENT : XP_INACTIVE_HEADER;

    return (
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            key={id}
            drag={!isMaximized}
            dragConstraints={{ top: 0, left: 0, right: Math.max(0, vp.w - w), bottom: Math.max(0, vp.h - h - 48) }}
            dragHandle=".window-header"
            dragMomentum={false}
            onMouseDown={() => focusWindow(id)}
            style={{
              position: 'absolute', zIndex,
              x: isMaximized ? 0 : x, y: isMaximized ? 0 : y,
              width: isMaximized ? '100%' : w, height: isMaximized ? 'calc(100vh - 48px)' : h,
              transition: 'width 0.42s cubic-bezier(0.22,1,0.36,1), height 0.42s cubic-bezier(0.22,1,0.36,1)',
              borderRadius: '8px 8px 0 0', overflow: 'hidden',
              maxWidth: '100vw', maxHeight: 'calc(100vh - 48px)',
              border: '2px solid #0a246a', boxShadow: '2px 2px 10px rgba(0,0,0,0.3), inset 1px 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            <motion.div
              style={{ width: '100%', height: '100%', originX: 0.5, originY: 0.5 }}
              initial={{ scale: 0.6, opacity: 0, x: deltaX, y: deltaY }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, x: deltaX, y: deltaY, transition: { type: 'spring', stiffness: 310, damping: 28, mass: 0.75 } }}
              transition={{ type: 'spring', stiffness: 370, damping: 32, mass: 0.85 }}
              className="flex flex-col h-full w-full pointer-events-auto will-change-[transform,opacity]"
              style={{ backgroundColor: '#ece9d8' }}
            >
              <div
                className="window-header flex items-center justify-between px-2 py-1 select-none cursor-move flex-shrink-0 min-w-0"
                style={{ background: activeGrad, height: 30 }}
                onDoubleClick={() => toggleMaximize(id)}
              >
                <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden pl-1">
                  <span className="flex-shrink-0">{React.cloneElement(icon, { size: 14, color: 'white' })}</span>
                  <span className="text-xs font-bold text-white truncate drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">{title}</span>
                </div>
                <div className="flex items-center gap-[2px] flex-shrink-0 ml-2 mr-0.5">
                  <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                    onMouseEnter={() => setMinHover(true)} onMouseLeave={() => setMinHover(false)}
                    style={{
                      width: 21, height: 21, border: '1px solid #003399', borderRadius: 3,
                      background: minHover ? XP_BTN_HOVER : XP_BTN_GRADIENT,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
                      cursor: 'pointer',
                    }}>
                    <Minus size={10} color="#000" strokeWidth={2.5} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
                    onMouseEnter={() => setMaxHover(true)} onMouseLeave={() => setMaxHover(false)}
                    style={{
                      width: 21, height: 21, border: '1px solid #003399', borderRadius: 3,
                      background: maxHover ? XP_BTN_HOVER : XP_BTN_GRADIENT,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
                      cursor: 'pointer',
                    }}>
                    <Square size={8} color="#000" strokeWidth={2.5} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                    onMouseEnter={() => setCloseHover(true)} onMouseLeave={() => setCloseHover(false)}
                    style={{
                      width: 21, height: 21, border: '1px solid #003399', borderRadius: 3,
                      background: closeHover ? XP_CLOSE_HOVER : XP_CLOSE_GRADIENT,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
                      cursor: 'pointer',
                    }}>
                    <X size={10} color="#fff" strokeWidth={3} />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto relative min-h-0 min-w-0 bg-white">{typeof component === 'function' ? component() : component}</div>
              <div style={{ height: 3, background: XP_HEADER_GRADIENT }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          key={id}
          drag={!isMaximized}
          dragConstraints={{ top: 0, left: 0, right: Math.max(0, vp.w - w), bottom: Math.max(0, vp.h - h - 48) }}
          dragHandle=".window-header"
          dragMomentum={false}
          onMouseDown={() => focusWindow(id)}
          style={{
            position: 'absolute', zIndex,
            x: isMaximized ? 0 : x, y: isMaximized ? 0 : y,
            width: isMaximized ? '100%' : w, height: isMaximized ? 'calc(100vh - 48px)' : h,
            transition: 'width 0.42s cubic-bezier(0.22,1,0.36,1), height 0.42s cubic-bezier(0.22,1,0.36,1), border-radius 0.35s cubic-bezier(0.22,1,0.36,1)',
            borderRadius: isMaximized ? 0 : 16, overflow: 'hidden',
            maxWidth: '100vw', maxHeight: 'calc(100vh - 48px)',
          }}
        >
          <motion.div
            style={{ width: '100%', height: '100%', originX: 0.5, originY: 0.5 }}
            initial={{ scale: 0.6, opacity: 0, x: deltaX, y: deltaY }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, x: deltaX, y: deltaY, transition: { type: 'spring', stiffness: 310, damping: 28, mass: 0.75 } }}
            transition={{ type: 'spring', stiffness: 370, damping: 32, mass: 0.85 }}
            className={`flex flex-col bg-white/75 dark:bg-slate-900/80 backdrop-blur-2xl h-full w-full pointer-events-auto will-change-[transform,opacity]
              ${isActive
                ? 'border border-white/35 dark:border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25),0_15px_35px_-8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.3)_inset] ring-1 ring-blue-500/10'
                : 'border border-white/15 dark:border-white/5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.15)_inset]'}`}
          >
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
            <div className="flex-1 overflow-auto relative dark:bg-slate-950 dark:text-slate-100 min-h-0 min-w-0">
              {typeof component === 'function' ? component() : component}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;
