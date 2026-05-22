import React, { createContext, useState, useContext } from 'react';

const WindowContext = createContext();

export const useWindows = () => {
  return useContext(WindowContext);
};

export const WindowProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);
  const [highestZIndex, setHighestZIndex] = useState(10);

  // REGLA: NUNCA leas estado de React directamente en funciones que también
  // llaman setters de ese estado. Usa siempre el patrón funcional: setState(prev => ...)
  const getNextZ = (prev) => Math.max(...prev.map((w) => w.zIndex), 10) + 1;

  // app config object expects: { id, title, icon, component, defaultSize }
  const openWindow = (app) => {
    setWindows((prev) => {
      const nextZ = getNextZ(prev);
      const existing = prev.find((w) => w.id === app.id);
      if (existing) {
        return prev.map((w) =>
          w.id === app.id
            ? { ...w, isMinimized: false, zIndex: nextZ }
            : w
        );
      }

      const newWindow = {
        ...app,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: nextZ,
      };
      
      return [...prev, newWindow];
    });
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  };

  const restoreWindow = (id) => {
    setWindows((prev) => {
      const nextZ = getNextZ(prev);
      return prev.map((w) =>
        w.id === id ? { ...w, isMinimized: false, zIndex: nextZ } : w
      );
    });
  };

  const toggleMaximize = (id) => {
    setWindows((prev) => {
      const nextZ = getNextZ(prev);
      return prev.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized, zIndex: nextZ } : w
      );
    });
  };

  const focusWindow = (id) => {
    setWindows((prev) => {
      const nextZ = getNextZ(prev);
      return prev.map((w) =>
        w.id === id ? { ...w, zIndex: nextZ } : w
      );
    });
  };

  const isWindowOpen = (id) => {
    return windows.some(w => w.id === id);
  };

  const getActiveWindowId = () => {
    if (windows.length === 0) return null;
    const nonMinimized = windows.filter(w => !w.isMinimized);
    if (nonMinimized.length === 0) return null;
    
    // Find window with highest zIndex
    return nonMinimized.reduce((prev, current) => 
      (prev.zIndex > current.zIndex) ? prev : current
    ).id;
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        restoreWindow,
        toggleMaximize,
        focusWindow,
        isWindowOpen,
        getActiveWindowId
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
