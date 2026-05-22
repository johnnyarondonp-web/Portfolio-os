import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, Moon, Sun } from 'lucide-react';
import { useWindows } from '../context/WindowContext';
import StartMenu from './StartMenu';
import WallpaperPicker from './WallpaperPicker';
import { Z } from '../utils/zLevels';

const XP_TASKBAR_COLOR = 'linear-gradient(180deg, #245ed8 0%, #3c84f0 3%, #3a7ae0 5%, #2d6cc8 8%, #1a5ab0 11%, #1a5ab0 85%, #2a6ac8 89%, #3a7ae0 93%, #4a8af0 95%, #4a8af0 97%, #3a7ae0 100%)';
const START_BTN_GRADIENT = 'linear-gradient(180deg, #6ab84a 0%, #3d8a2a 15%, #2a7018 30%, #1a5808 50%, #2a7018 70%, #3d8a2a 85%, #5aa83a 100%)';
const START_BTN_HOVER = 'linear-gradient(180deg, #7ac85a 0%, #4d9a3a 15%, #3a8028 30%, #2a6818 50%, #3a8028 70%, #4d9a3a 85%, #6ab84a 100%)';

const Taskbar = ({ isDarkMode, setIsDarkMode, themeMode, onShutdown, currentWallpaperId, onSelectWallpaper }) => {
  const { windows, restoreWindow, minimizeWindow, getActiveWindowId } = useWindows();
  const [time, setTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isWallpaperPickerOpen, setIsWallpaperPickerOpen] = useState(false);
  const [startHover, setStartHover] = useState(false);
  const activeWindowId = getActiveWindowId();

  const isXp = themeMode === 'xp';

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (w) => {
    if (w.isMinimized) restoreWindow(w.id);
    else if (activeWindowId === w.id) minimizeWindow(w.id);
    else restoreWindow(w.id);
  };

  if (isXp) {
    return (
      <>
        <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} isDarkMode={isDarkMode} themeMode={themeMode} onShutdown={onShutdown} onOpenWallpaper={() => { setIsStartMenuOpen(false); setIsWallpaperPickerOpen(true); }} />
        <WallpaperPicker isOpen={isWallpaperPickerOpen} onClose={() => setIsWallpaperPickerOpen(false)} currentWallpaperId={currentWallpaperId} onSelectWallpaper={(wp) => { onSelectWallpaper(wp); setIsWallpaperPickerOpen(false); }} isDarkMode={isDarkMode} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 48, zIndex: Z.TASKBAR,
          background: XP_TASKBAR_COLOR, borderTop: '2px solid #6a9af0',
          display: 'flex', alignItems: 'center', padding: '0 4px', gap: 4,
          boxShadow: '0 -1px 4px rgba(0,0,0,0.3)',
        }}>
          <button onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            onMouseEnter={() => setStartHover(true)} onMouseLeave={() => setStartHover(false)}
            style={{
              height: 38, padding: '0 16px 0 8px', border: 'none', borderRadius: '0 8px 8px 0',
              borderRight: '2px solid #1a5808', borderTop: '2px solid #6ab84a', borderBottom: '2px solid #1a5808',
              background: startHover ? START_BTN_HOVER : START_BTN_GRADIENT,
              display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer',
              color: 'white', fontWeight: 700, fontSize: 16, fontFamily: "'Trebuchet MS',Arial,sans-serif",
              textShadow: '0 1px 2px rgba(0,0,0,0.5)', letterSpacing: 0.5,
              boxShadow: startHover ? 'inset 0 0 8px rgba(255,255,255,0.3)' : 'inset 0 1px 0 rgba(255,255,255,0.2)',
              transform: startHover ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.1s',
            }}>
            <svg viewBox="0 0 30 30" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="xp-pole" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#808080"/><stop offset="50%" stopColor="#e8e8e8"/><stop offset="100%" stopColor="#a0a0a0"/>
                </linearGradient>
              </defs>
              <rect x="4" y="3" width="3" height="20" rx="1.5" fill="url(#xp-pole)" stroke="#606060" strokeWidth="0.5"/>
              <circle cx="5.5" cy="3" r="2" fill="#e8e8e8" stroke="#606060" strokeWidth="0.5"/>
              <path d="M8,4 C12,3 15,4 16.5,4.3 L16.5,12 C15,11.7 12,12.5 8,12 Z" fill="#FF0000"/>
              <path d="M16.5,4.3 C19,3.5 22,4 24,5 C25,7 25,10 24,12 C22,12 19,11.5 16.5,12 Z" fill="#0000FF"/>
              <path d="M8,12 C12,12.5 15,11.7 16.5,12 L16.5,19.7 C15,20 12,19 8,19 Z" fill="#00AA00"/>
              <path d="M16.5,12 C19,11.5 22,12 24,12 C25,10 25,14 24,19 C22,18.5 19,19 16.5,19.7 Z" fill="#FFFF00"/>
              <path d="M8,12 C12,12.5 15,11.7 16.5,12" stroke="white" strokeWidth="0.7" fill="none"/>
              <path d="M16.5,4.3 L16.5,19.7" stroke="white" strokeWidth="0.7" fill="none"/>
            </svg>
            inicio
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, overflow: 'hidden' }}>
            {windows.map(w => {
              const isActive = activeWindowId === w.id && !w.isMinimized;
              return (
                <button key={w.id} onClick={() => handleAppClick(w)}
                  style={{
                    height: 34, minWidth: 80, maxWidth: 200, padding: '2px 8px',
                    border: isActive ? '1px solid #1a5ab0' : '1px solid transparent',
                    borderRadius: 4,
                    background: isActive
                      ? 'linear-gradient(180deg, #2a6ac8 0%, #4a8af0 8%, #5a9af8 40%, #4a8af0 88%, #2a6ac8 100%)'
                      : 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer',
                    color: 'white', fontSize: 11, fontWeight: isActive ? 700 : 400, fontFamily: 'Tahoma,Arial,sans-serif',
                    textShadow: isActive ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
                    borderTop: isActive ? '1px solid #6a9af0' : '1px solid transparent',
                    boxShadow: isActive ? 'inset 0 1px 0 rgba(255,255,255,0.15)' : 'none',
                    flex: '0 1 auto', overflow: 'hidden',
                    whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                  }}>
                  <span style={{ flexShrink: 0 }}>{React.cloneElement(w.icon, { size: 16, color: 'white' })}</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.title}</span>
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px', height: 36,
            background: 'linear-gradient(180deg, #1a5ab0 0%, #2a6ac8 20%, #2d6cc8 50%, #1a5ab0 100%)',
            borderRadius: 4, border: '1px solid #0a4a98' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: 'white' }}>
              <Wifi size={12} />
              <Volume2 size={12} />
              <Battery size={12} />
            </div>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.3)', margin: '0 4px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.1 }}>
              <span style={{ color: 'white', fontSize: 11, fontWeight: 700, fontFamily: 'Tahoma,Arial,sans-serif' }}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span style={{ color: '#a0c8ff', fontSize: 9, fontFamily: 'Tahoma,Arial,sans-serif' }}>
                {time.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} isDarkMode={isDarkMode} themeMode={themeMode} onShutdown={onShutdown} onOpenWallpaper={() => { setIsStartMenuOpen(false); setIsWallpaperPickerOpen(true); }} />
      <WallpaperPicker isOpen={isWallpaperPickerOpen} onClose={() => setIsWallpaperPickerOpen(false)} currentWallpaperId={currentWallpaperId} onSelectWallpaper={(wp) => { onSelectWallpaper(wp); setIsWallpaperPickerOpen(false); }} isDarkMode={isDarkMode} />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 h-14 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/20 dark:border-white/5 rounded-2xl flex items-center justify-center gap-1.5 px-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.16),0_0_0_1px_rgba(255,255,255,0.24)_inset] hover:bg-white/70 dark:hover:bg-slate-900/70 transition-[background-color,border-color,box-shadow,opacity] duration-300 will-change-[opacity]"
        style={{ maxWidth: 'calc(100vw - 180px)', zIndex: Z.TASKBAR }}>
        <button onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className={`p-2 rounded-xl transition-[transform,background-color,border-color,box-shadow] duration-300 will-change-transform flex items-center justify-center cursor-pointer group active:scale-90 flex-shrink-0
            ${isStartMenuOpen ? 'bg-blue-500/15 border border-blue-400/30 shadow-[inset_0_2px_4px_rgba(59,130,246,0.1)]' : 'border border-transparent hover:bg-white/30 dark:hover:bg-white/5 hover:border-white/10 hover:shadow-sm'}`}
          title="Inicio">
          <svg viewBox="0 0 24 24" width="22" height="22" className="transition-transform duration-300 group-hover:rotate-6">
            <defs>
              <linearGradient id="start-grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="start-grad-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="start-grad-pink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" /><stop offset="100%" stopColor="#db2777" />
              </linearGradient>
              <linearGradient id="start-grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" /><stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="7.5" height="7.5" rx="2.5" fill="url(#start-grad-cyan)" />
            <rect x="13.5" y="3" width="7.5" height="7.5" rx="2.5" fill="url(#start-grad-indigo)" />
            <rect x="3" y="13.5" width="7.5" height="7.5" rx="2.5" fill="url(#start-grad-pink)" />
            <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2.5" fill="url(#start-grad-emerald)" />
          </svg>
        </button>

        {windows.length > 0 && <div className="w-[1px] h-6 bg-gray-300/50 dark:bg-slate-700/50 mx-1 select-none flex-shrink-0" />}

        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full" style={{ scrollbarWidth: 'none' }}>
          {windows.map(w => {
            const isActive = activeWindowId === w.id && !w.isMinimized;
            return (
              <button key={w.id} onClick={() => handleAppClick(w)}
                className={`p-2 rounded-xl transition-[transform,background-color,border-color,box-shadow] duration-300 will-change-transform relative flex items-center justify-center min-w-[44px] h-[40px] flex-shrink-0 cursor-pointer group active:scale-95
                  ${isActive ? 'bg-blue-500/10 shadow-[0_2px_8px_rgba(59,130,246,0.08)] border border-blue-400/20 dark:border-blue-400/10' : 'hover:bg-white/40 dark:hover:bg-white/5 border border-transparent'}`}>
                <div className="transform transition-transform group-hover:scale-105 duration-200 flex items-center justify-center">
                  {React.cloneElement(w.icon, { size: 22 })}
                </div>
                <div className={`absolute bottom-0.5 h-[4px] rounded-full transition-[width,box-shadow] duration-300
                  ${isActive ? 'w-6 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-[0_2px_8px_rgba(59,130,246,0.5)]' : 'w-2 bg-gray-450/70'}`} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-5 right-5 h-14 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/20 dark:border-white/5 rounded-2xl flex items-center gap-2 px-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.24)_inset] hover:bg-white/75 dark:hover:bg-slate-900/75 hover:shadow-md transition-[background-color,border-color,box-shadow,opacity] duration-300 will-change-[opacity] select-none cursor-pointer"
        style={{ zIndex: Z.TASKBAR }}>
        <div className="hidden sm:flex items-center gap-1.5 text-gray-600 dark:text-white">
          <div className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center"><Wifi size={13} /></div>
          <div className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center"><Volume2 size={13} /></div>
          <div className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center"><Battery size={13} /></div>
        </div>
        <button onClick={() => setIsDarkMode(!isDarkMode)}
          disabled={themeMode === 'xp'}
          className={`p-1 rounded-lg transition-colors flex items-center justify-center text-gray-600 dark:text-white
            ${themeMode === 'xp' ? 'opacity-40 cursor-not-allowed' : 'hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer'}`}
          title={isDarkMode ? "Modo claro" : "Modo oscuro"}>
          {isDarkMode ? <Sun size={13} className="text-yellow-400" /> : <Moon size={13} />}
        </button>
        <div className="w-[1px] h-4 bg-gray-300/80 dark:bg-slate-700/80" />
        <div className="flex flex-col items-end leading-none py-0.5">
          <span className="font-semibold tracking-wide text-gray-800 dark:text-white text-xs whitespace-nowrap">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[10px] text-gray-500 dark:text-white/80 font-normal mt-0.5 whitespace-nowrap">
            {time.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </>
  );
};

export default Taskbar;
