import React, { createContext, useState, useContext } from 'react';

const WindowContext = createContext();

export const useWindows = () => {
  return useContext(WindowContext);
};

export const WindowProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);
  const [highestZIndex, setHighestZIndex] = useState(10);

  // app config object expects: { id, title, icon, component, defaultSize }
  const openWindow = (app) => {
    setWindows((prev) => {
      // Si la ventana ya está abierta, la enfocamos y restauramos
      const existing = prev.find((w) => w.id === app.id);
      if (existing) {
        return prev.map((w) =>
          w.id === app.id
            ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 }
            : w
        );
      }

      // Si no existe, la creamos
      const newWindow = {
        ...app,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: highestZIndex + 1,
      };
      
      return [...prev, newWindow];
    });
    setHighestZIndex((prev) => prev + 1);
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
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 } : w
      )
    );
    setHighestZIndex((prev) => prev + 1);
  };

  const toggleMaximize = (id) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized, zIndex: highestZIndex + 1 } : w
      )
    );
    setHighestZIndex((prev) => prev + 1);
  };

  const focusWindow = (id) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w
      )
    );
    setHighestZIndex((prev) => prev + 1);
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
