import React from 'react';
import { X, Check } from 'lucide-react';
import { Z } from '../utils/zLevels';

export const WALLPAPERS = [
  { id: 'aurora-light', label: 'Aurora', mode: 'light', theme: 'aurora',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop' },
  { id: 'aurora-dark', label: 'Aurora Dark', mode: 'dark', theme: 'aurora',
    url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=400&auto=format&fit=crop' },
  { id: 'mountain-light', label: 'Montaña', mode: 'light', theme: 'mountain',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop' },
  { id: 'mountain-dark', label: 'Montaña Dark', mode: 'dark', theme: 'mountain',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2670&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop' },
  { id: 'forest-light', label: 'Bosque', mode: 'light', theme: 'forest',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2670&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop' },
  { id: 'forest-dark', label: 'Bosque Dark', mode: 'dark', theme: 'forest',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2670&auto=format&fit=crop&sat=-100&bri=-30',
    thumb: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop&sat=-100&bri=-30' },
  { id: 'xp', label: 'Windows XP', mode: 'light', theme: 'xp',
    url: 'https://archive.org/download/bliss-600dpi/bliss-600dpi.png',
    thumb: 'https://archive.org/download/bliss-600dpi/bliss-600dpi.png' },
];

const THEMES = ['aurora', 'mountain', 'forest', 'xp'];

const THEME_MAP = THEMES.reduce((acc, theme) => {
  acc[theme] = WALLPAPERS.filter(w => w.theme === theme);
  return acc;
}, {});

const THEME_LABELS = {
  aurora: 'Aurora',
  mountain: 'Montaña',
  forest: 'Bosque',
  xp: 'Windows XP',
};

const WallpaperPicker = ({ isOpen, onClose, currentWallpaperId, onSelectWallpaper, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" style={{ zIndex: Z.WALLPAPER_OVERLAY }} onClick={onClose} />
      <div className={`fixed bottom-24 right-5 w-80 rounded-2xl shadow-2xl border overflow-hidden
        ${isDarkMode ? 'bg-slate-900/90 border-white/10 text-white' : 'bg-white/90 border-white/60 text-gray-900'} backdrop-blur-2xl`}
        style={{ zIndex: Z.WALLPAPER_PICKER }}
        onClick={(e) => e.stopPropagation()}>
        <div className={`flex items-center justify-between px-4 py-3 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200/60'}`}>
          <span className="font-semibold text-sm tracking-wide">Fondo de pantalla</span>
          <button onClick={onClose} className={`p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
            <X size={15} />
          </button>
        </div>
        <div className="p-4 space-y-4 max-h-[420px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          {THEMES.map((theme) => {
            const pair = THEME_MAP[theme];
            if (!pair || pair.length === 0) return null;
            const themeLabel = THEME_LABELS[theme] || theme;
            return (
              <div key={theme}>
                <p className={`text-[10px] font-semibold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                  {themeLabel}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {pair.map((wp) => {
                    const isSelected = currentWallpaperId === wp.id;
                    return (
                      <button key={wp.id} onClick={() => onSelectWallpaper(wp)}
                        className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all duration-200
                          hover:scale-[1.03] active:scale-[0.97] focus:outline-none
                          ${isSelected ? 'border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.4)]'
                            : isDarkMode ? 'border-white/10 hover:border-white/30' : 'border-gray-200 hover:border-blue-300'}`}>
                        <img src={wp.thumb} alt={wp.label} className="w-full h-full object-cover" loading="lazy" />
                        <span className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide
                          ${wp.mode === 'dark' ? 'bg-slate-900/80 text-white/80' : 'bg-white/80 text-gray-700'}`}>
                          {wp.mode === 'dark' ? '🌙' : '☀️'}
                        </span>
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20">
                            <div className="bg-blue-500 rounded-full p-1"><Check size={12} className="text-white" /></div>
                          </div>
                        )}
                        <div className="absolute bottom-0 inset-x-0 px-1.5 py-1 bg-black/40 backdrop-blur-sm">
                          <span className="text-white text-[9px] font-medium truncate block">{wp.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className={`px-4 py-2.5 border-t text-[10px] ${isDarkMode ? 'border-white/10 text-white/30' : 'border-gray-200/60 text-gray-400'}`}>
          Selecciona un fondo para aplicarlo al instante
        </div>
      </div>
    </>
  );
};

export default WallpaperPicker;
