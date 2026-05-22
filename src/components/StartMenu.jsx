import React from 'react';
import { Power, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { appsRegistry } from '../utils/appsRegistry';
import { useWindows } from '../context/WindowContext';
import { Z } from '../utils/zLevels';

const XP_SIDEBAR_GRADIENT = 'linear-gradient(180deg, #1a5808 0%, #2a7018 15%, #3a8028 30%, #3a8028 70%, #2a7018 85%, #1a5808 100%)';

const StartMenu = ({ isOpen, onClose, isDarkMode, themeMode, onShutdown, onOpenWallpaper }) => {
  const { openWindow } = useWindows();

  const isXp = themeMode === 'xp';

  if (!isOpen) return null;

  if (isXp) {
    return (
      <>
        <div className="fixed inset-0" style={{ zIndex: Z.START_MENU_OVERLAY }} onClick={onClose} />
        <AnimatePresence>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute', bottom: 48, left: 0, zIndex: Z.START_MENU,
              width: 360, borderRadius: '0 8px 0 0', overflow: 'hidden',
              border: '2px solid #245ed8', borderBottom: 'none',
              boxShadow: '2px -2px 10px rgba(0,0,0,0.3)',
              display: 'flex',
            }}
          >
            <div style={{
              width: 52, background: XP_SIDEBAR_GRADIENT, flexShrink: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8,
              borderRight: '1px solid #1a5808',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(180deg, #fff 0%, #c0c0c0 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                marginBottom: 4,
              }}>
                <User size={20} color="#1a5808" />
              </div>
              <span style={{ color: 'white', fontSize: 9, fontWeight: 700, textShadow: '0 1px 1px rgba(0,0,0,0.5)', textAlign: 'center', lineHeight: 1.1 }}>
                Invitado
              </span>
            </div>
            <div style={{
              flex: 1, background: '#fff', padding: '6px 4px',
              display: 'flex', flexDirection: 'column', gap: 2,
            }}>
              {appsRegistry.filter(a => a.id !== 'settings').map(app => (
                <div key={app.id} onClick={() => { openWindow(app); onClose(); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px',
                    cursor: 'pointer', borderRadius: 4,
                    background: 'transparent',
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#2a6ac8'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#1a5ab0'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = 'transparent'; }}>
                  <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                    {React.cloneElement(app.icon, { size: 24 })}
                  </span>
                  <span style={{ fontSize: 11, fontFamily: 'Tahoma,Arial,sans-serif', fontWeight: 500 }}>{app.title}</span>
                </div>
              ))}
              <div style={{ flex: 1 }} />
              <div style={{ borderTop: '1px solid #d4d0c8', paddingTop: 4, marginTop: 4 }}>
                <div onClick={() => { if (onOpenWallpaper) onOpenWallpaper(); onClose(); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px',
                    cursor: 'pointer', borderRadius: 4,
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#2a6ac8'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#1a5ab0'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = 'transparent'; }}>
                  <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" fill="#6366f1"/><path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2"/></svg>
                  </span>
                  <span style={{ fontSize: 11, fontFamily: 'Tahoma,Arial,sans-serif', fontWeight: 500 }}>Configuración</span>
                </div>
                <div onClick={() => { onClose(); if (onShutdown) onShutdown(); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px',
                    cursor: 'pointer', borderRadius: 4,
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#2a6ac8'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#1a5ab0'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = 'transparent'; }}>
                  <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                    <Power size={18} color="#d04020" />
                  </span>
                  <span style={{ fontSize: 11, fontFamily: 'Tahoma,Arial,sans-serif', fontWeight: 500 }}>Apagar equipo...</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0" style={{ zIndex: Z.START_MENU_OVERLAY }} onClick={onClose} />
      <AnimatePresence>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[min(400px,calc(100vw-32px))] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden p-6 will-change-[transform,opacity]"
          style={{ zIndex: Z.START_MENU }}>
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-4 px-2">Pines</h2>
            <div className="grid grid-cols-3 gap-4">
              {appsRegistry.map(app => (
                <div key={app.id} onClick={() => {
                  if (app.id === 'settings') { if (onOpenWallpaper) onOpenWallpaper(); onClose(); }
                  else { openWindow(app); onClose(); }
                }}
                  className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-white/50 dark:hover:bg-slate-850/50 cursor-pointer transition-colors"
                >
                  {React.cloneElement(app.icon, { size: 32 })}
                  <span className="text-xs text-gray-700 dark:text-white mt-2 truncate w-full text-center">{app.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-200/50 dark:border-white/5 flex justify-between items-center px-2">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-white/50 dark:hover:bg-slate-800/50 p-2 rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center">
                <User size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Invitado</span>
            </div>
            <button onClick={() => { onClose(); if (onShutdown) onShutdown(); }}
              className="p-2 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer">
              <Power size={18} className="text-gray-600 dark:text-slate-400" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default StartMenu;
