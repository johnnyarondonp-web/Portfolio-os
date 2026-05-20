import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWindows } from '../context/WindowContext';
import { appsRegistry } from '../utils/appsRegistry';
import Widget from './Widget';

const DesktopIcon = ({ app, onDoubleClick, isSelected, onClick, position, onDragEnd, dragConstraints }) => {
  return (
    <motion.div 
      drag
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={dragConstraints}
      onDragEnd={(event, info) => onDragEnd(app.id, info.offset)}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', bounce: 0, duration: 0 }}
      style={{ position: 'absolute', left: 0, top: 0 }}
      className={`pointer-events-auto flex flex-col items-center justify-center w-24 h-24 p-2 rounded-2xl cursor-pointer transition-colors duration-300 select-none group z-50
        ${isSelected 
          ? 'bg-white/10 border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.15)] scale-[0.98]' 
          : 'border border-transparent hover:bg-white/10 hover:border-white/10 hover:shadow-sm'}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(app);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick(app);
      }}
    >
      <div className="transform transition-transform group-hover:scale-105 active:scale-95 duration-200 flex items-center justify-center">
        {app.icon}
      </div>
      <span className="mt-2 text-xs text-white font-medium text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] line-clamp-2 max-w-full px-1" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.8)' }}>
        {app.title}
      </span>
    </motion.div>
  );
};

const Desktop = ({ children, isDarkMode }) => {
  const { openWindow } = useWindows();
  const [selectedAppId, setSelectedAppId] = useState(null);
  const desktopRef = useRef(null);

  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem('desktop_icon_positions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        let matches = true;
        appsRegistry.forEach(app => {
          if (parsed[app.id] === undefined) matches = false;
        });
        if (matches) return parsed;
      } catch (e) {}
    }

    // Default column-major grid layout (columns first, then rows)
    const initial = {};
    appsRegistry.forEach((app, index) => {
      const row = index % 5;
      const col = Math.floor(index / 5);
      initial[app.id] = { x: 25 + col * 120, y: 25 + row * 110 };
    });
    return initial;
  });

  const handleDragEnd = (appId, offset) => {
    setPositions(prev => {
      const current = prev[appId] || { x: 0, y: 0 };
      const updated = {
        ...prev,
        [appId]: {
          x: Math.max(0, current.x + offset.x),
          y: Math.max(0, current.y + offset.y)
        }
      };
      localStorage.setItem('desktop_icon_positions', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDesktopClick = () => {
    setSelectedAppId(null);
  };

  return (
    <div 
      ref={desktopRef}
      className="relative w-screen h-screen overflow-hidden select-none transition-all duration-700 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: isDarkMode 
          ? 'url("https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop")' 
          : 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")' 
      }}
      onClick={handleDesktopClick}
    >
      {/* Draggable Desktop Icons */}
      <div className="absolute top-0 left-0 w-full h-[calc(100vh-80px)] pointer-events-none z-10">
        {appsRegistry.map((app) => (
          <DesktopIcon 
            key={app.id} 
            app={app} 
            isSelected={selectedAppId === app.id}
            position={positions[app.id] || { x: 25, y: 25 }}
            onDragEnd={handleDragEnd}
            dragConstraints={desktopRef}
            onClick={(app) => {
              if (selectedAppId === app.id) {
                setSelectedAppId(null);
                openWindow(app);
              } else {
                setSelectedAppId(app.id);
              }
            }}
            onDoubleClick={(app) => {
              setSelectedAppId(null);
              openWindow(app);
            }} 
          />
        ))}
      </div>
      
      {/* HUD Profile Widget restored */}
      <Widget />

      {/* Children elements (such as opened windows) */}
      <div className="relative w-full h-full pointer-events-none z-20">
        {children}
      </div>
    </div>
  );
};

export default Desktop;
