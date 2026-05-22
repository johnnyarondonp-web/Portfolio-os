import React from 'react';
import { Power, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { appsRegistry } from '../utils/appsRegistry';
import { useWindows } from '../context/WindowContext';

const StartMenu = ({ isOpen, onClose, isDarkMode, onShutdown, onOpenWallpaper }) => {
  const { openWindow } = useWindows();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay para cerrar el menú al hacer clic fuera */}
      <div className="fixed inset-0 z-[9998]" onClick={onClose} />
      <AnimatePresence>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[min(400px,calc(100vw-32px))] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden p-6 z-[9999] will-change-[transform,opacity]"
        >
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-4 px-2">Pines</h2>
            <div className="grid grid-cols-3 gap-4">
              {appsRegistry.map(app => (
                <div 
                  key={app.id}
                  onClick={() => { 
                    if (app.id === 'settings') {
                      if (onOpenWallpaper) onOpenWallpaper();
                      onClose();
                    } else {
                      openWindow(app); 
                      onClose();
                    }
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
            <button 
              onClick={() => { onClose(); if (onShutdown) onShutdown(); }}
              className="p-2 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer"
            >
              <Power size={18} className="text-gray-600 dark:text-slate-400" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default StartMenu;
