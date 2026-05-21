import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, Moon, Sun } from 'lucide-react';
import { useWindows } from '../context/WindowContext';
import StartMenu from './StartMenu';

const Taskbar = ({ isDarkMode, setIsDarkMode, onShutdown }) => {
  const { windows, restoreWindow, minimizeWindow, getActiveWindowId } = useWindows();
  const [time, setTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const activeWindowId = getActiveWindowId();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (w) => {
    if (w.isMinimized) {
      restoreWindow(w.id);
    } else if (activeWindowId === w.id) {
      minimizeWindow(w.id);
    } else {
      restoreWindow(w.id);
    }
  };

  return (
    <>
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} isDarkMode={isDarkMode} onShutdown={onShutdown} />
      
      {/* Floating Center Dock (App Pill) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-fit max-w-[90vw] h-14 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/20 dark:border-white/5 rounded-2xl flex items-center justify-center gap-1.5 px-3 z-[9000] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.16),0_0_0_1px_rgba(255,255,255,0.24)_inset] hover:bg-white/70 dark:hover:bg-slate-900/70 transition-all duration-300">
        
        {/* Custom Windows-style Start Button */}
        <button 
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer group active:scale-90
            ${isStartMenuOpen 
              ? 'bg-blue-500/15 border border-blue-400/30 shadow-[inset_0_2px_4px_rgba(59,130,246,0.1)]' 
              : 'border border-transparent hover:bg-white/30 dark:hover:bg-white/5 hover:border-white/10 hover:shadow-sm'}`}
          title="Inicio"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" className="transition-transform duration-300 group-hover:rotate-6">
            <defs>
              <linearGradient id="start-grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="start-grad-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="start-grad-pink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#db2777" />
              </linearGradient>
              <linearGradient id="start-grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="7.5" height="7.5" rx="2.5" fill="url(#start-grad-cyan)" className="transition-all duration-300 origin-bottom-right group-hover:scale-[0.88] group-hover:-translate-x-[0.5px] group-hover:-translate-y-[0.5px]" />
            <rect x="13.5" y="3" width="7.5" height="7.5" rx="2.5" fill="url(#start-grad-indigo)" className="transition-all duration-300 origin-bottom-left group-hover:scale-[0.88] group-hover:translate-x-[0.5px] group-hover:-translate-y-[0.5px]" />
            <rect x="3" y="13.5" width="7.5" height="7.5" rx="2.5" fill="url(#start-grad-pink)" className="transition-all duration-300 origin-top-right group-hover:scale-[0.88] group-hover:-translate-x-[0.5px] group-hover:translate-y-[0.5px]" />
            <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2.5" fill="url(#start-grad-emerald)" className="transition-all duration-300 origin-top-left group-hover:scale-[0.88] group-hover:translate-x-[0.5px] group-hover:translate-y-[0.5px]" />
          </svg>
        </button>

        {/* Separator line if there are open windows */}
        {windows.length > 0 && (
          <div className="w-[1px] h-6 bg-gray-300/50 dark:bg-slate-700/50 mx-1 select-none" />
        )}

        {/* Open Apps */}
        <div className="flex items-center gap-1.5">
          {windows.map(w => {
            const isActive = activeWindowId === w.id && !w.isMinimized;
            return (
              <button
                key={w.id}
                onClick={() => handleAppClick(w)}
                className={`p-2 rounded-xl transition-all duration-300 relative flex items-center justify-center min-w-[44px] h-[40px] cursor-pointer group active:scale-95
                  ${isActive 
                    ? 'bg-blue-500/10 shadow-[0_2px_8px_rgba(59,130,246,0.08)] border border-blue-400/20 dark:border-blue-400/10' 
                    : 'hover:bg-white/40 dark:hover:bg-white/5 border border-transparent'}
                `}
              >
                <div className="transform transition-transform group-hover:scale-105 duration-200 flex items-center justify-center">
                  {React.cloneElement(w.icon, { size: 22 })}
                </div>
                {/* Active/Inactive visual indicator line */}
                <div className={`absolute bottom-0.5 h-[4px] rounded-full transition-all duration-300
                  ${isActive 
                    ? 'w-6 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-[0_2px_8px_rgba(59,130,246,0.5)]' 
                    : 'w-2 bg-gray-450/70'}`} 
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating System Tray & Clock Pill */}
      <div className="absolute bottom-5 right-5 h-14 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/20 dark:border-white/5 rounded-2xl flex items-center gap-3 px-4 z-[9000] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.24)_inset] hover:bg-white/75 dark:hover:bg-slate-900/75 hover:shadow-md transition-all duration-300 select-none cursor-pointer">
        {/* System status icons & dark mode toggle */}
        <div className="flex items-center gap-2.5 text-gray-600 dark:text-white">
          <div className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center">
            <Wifi size={14} className="hover:text-blue-500 transition-colors" />
          </div>
          <div className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center">
            <Volume2 size={14} className="hover:text-blue-500 transition-colors" />
          </div>
          <div className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center">
            <Battery size={14} className="hover:text-green-500 transition-colors" />
          </div>
          
          {/* Dark Mode Moon Toggle */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsDarkMode(!isDarkMode);
            }}
            className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
            title={isDarkMode ? "Modo Claro" : "Modo Oscuro"}
          >
            {isDarkMode ? (
              <Sun size={14} className="text-yellow-400 hover:text-yellow-500 transition-colors" />
            ) : (
              <Moon size={14} className="hover:text-indigo-600 transition-colors" />
            )}
          </button>
        </div>
        
        {/* Mini vertical divider */}
        <div className="w-[1px] h-4 bg-gray-300/80 dark:bg-slate-700/80" />
        
        {/* Stacked Date / Time */}
        <div className="flex flex-col items-end leading-none py-0.5">
          <span className="font-semibold tracking-wide text-gray-800 dark:text-white text-xs">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[10px] text-gray-500 dark:text-white/80 font-normal mt-0.5">
            {time.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </>
  );
};

export default Taskbar;
