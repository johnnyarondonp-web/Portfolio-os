import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWindows } from '../context/WindowContext';
import { desktopApps } from '../utils/appsRegistry';
import Widget from './Widget';
import { Z } from '../utils/zLevels';

const CELL_W = 100;
const CELL_H = 110;
const PADDING_X = 24;
const PADDING_Y = 24;

const DRAG_THRESHOLD = 12;

const pixelToCell = (x, y) => {
  const col = Math.round((x - PADDING_X) / CELL_W);
  const row = Math.round((y - PADDING_Y) / CELL_H);
  return [Math.max(0, col), Math.max(0, row)];
};

const cellToPixel = (col, row) => ({
  x: PADDING_X + col * CELL_W,
  y: PADDING_Y + row * CELL_H,
});

const buildDefaultLayout = (maxRows = 8) => {
  const layout = {};
  const occupied = new Set();
  desktopApps.forEach((app, index) => {
    let col = Math.floor(index / maxRows);
    let row = index % maxRows;
    while (occupied.has(`${col},${row}`)) {
      row++;
      if (row >= maxRows) { row = 0; col++; }
    }
    occupied.add(`${col},${row}`);
    layout[app.id] = [col, row];
  });
  return layout;
};

const getMaxRows = (desktopHeight) => {
  const usableHeight = desktopHeight - PADDING_Y - 80;
  return Math.max(1, Math.floor(usableHeight / CELL_H));
};

const findNearestFreeCell = (targetCol, targetRow, others, maxCol, maxRow) => {
  const occupied = new Set(Object.values(others).map(([c, r]) => `${c},${r}`));
  const free = (c, r) => c >= 0 && r >= 0 && c <= maxCol && r <= maxRow && !occupied.has(`${c},${r}`);
  if (free(targetCol, targetRow)) return [targetCol, targetRow];
  for (let radius = 1; radius <= Math.max(maxCol, maxRow) * 2; radius++) {
    for (let dc = -radius; dc <= radius; dc++) {
      for (let dr = -radius; dr <= radius; dr++) {
        if (Math.abs(dc) !== radius && Math.abs(dr) !== radius) continue;
        const c = targetCol + dc;
        const r = targetRow + dr;
        if (free(c, r)) return [c, r];
      }
    }
  }
  return [targetCol, targetRow];
};

const DesktopIcon = ({ app, isSelected, onClick, onDoubleClick, position, onDragEnd, desktopRef }) => {
  const isDragging = useRef(false);
  const dragStartMouse = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const [livePos, setLivePos] = useState(null);

  useEffect(() => {
    if (!isDragging.current) setLivePos(null);
  }, [position]);

  const displayPos = livePos ?? position;

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    isDragging.current = false;
    dragStartMouse.current = { x: e.clientX, y: e.clientY };
    dragStartPos.current = { ...position };

    const onMouseMove = (moveEvt) => {
      const dx = moveEvt.clientX - dragStartMouse.current.x;
      const dy = moveEvt.clientY - dragStartMouse.current.y;
      if (!isDragging.current) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        isDragging.current = true;
      }
      const desktop = desktopRef.current;
      if (!desktop) return;
      const rect = desktop.getBoundingClientRect();
      const rawX = dragStartPos.current.x + dx;
      const rawY = dragStartPos.current.y + dy;
      const clampedX = Math.max(0, Math.min(rawX, rect.width - 96));
      const clampedY = Math.max(0, Math.min(rawY, rect.height - 96 - 80));
      setLivePos({ x: clampedX, y: clampedY });
    };

    const onMouseUp = (upEvt) => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (!isDragging.current) { isDragging.current = false; return; }
      isDragging.current = false;
      const desktop = desktopRef.current;
      if (!desktop) return;
      const rect = desktop.getBoundingClientRect();
      const dx = upEvt.clientX - dragStartMouse.current.x;
      const dy = upEvt.clientY - dragStartMouse.current.y;
      const rawX = dragStartPos.current.x + dx;
      const rawY = dragStartPos.current.y + dy;
      const clampedX = Math.max(0, Math.min(rawX, rect.width - 96));
      const clampedY = Math.max(0, Math.min(rawY, rect.height - 96 - 80));
      setLivePos(null);
      onDragEnd(app.id, clampedX, clampedY, rect);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [app.id, position, onDragEnd, desktopRef]);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    isDragging.current = false;
    dragStartMouse.current = { x: touch.clientX, y: touch.clientY };
    dragStartPos.current = { ...position };

    const onTouchMove = (moveEvt) => {
      const t = moveEvt.touches[0];
      const dx = t.clientX - dragStartMouse.current.x;
      const dy = t.clientY - dragStartMouse.current.y;
      if (!isDragging.current) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        isDragging.current = true;
      }
      moveEvt.preventDefault();
      const desktop = desktopRef.current;
      if (!desktop) return;
      const rect = desktop.getBoundingClientRect();
      const rawX = dragStartPos.current.x + dx;
      const rawY = dragStartPos.current.y + dy;
      const clampedX = Math.max(0, Math.min(rawX, rect.width - 96));
      const clampedY = Math.max(0, Math.min(rawY, rect.height - 96 - 80));
      setLivePos({ x: clampedX, y: clampedY });
    };

    const onTouchEnd = (upEvt) => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      if (!isDragging.current) return;
      isDragging.current = false;
      const lastTouch = upEvt.changedTouches[0];
      const desktop = desktopRef.current;
      if (!desktop) return;
      const rect = desktop.getBoundingClientRect();
      const dx = lastTouch.clientX - dragStartMouse.current.x;
      const dy = lastTouch.clientY - dragStartMouse.current.y;
      const rawX = dragStartPos.current.x + dx;
      const rawY = dragStartPos.current.y + dy;
      const clampedX = Math.max(0, Math.min(rawX, rect.width - 96));
      const clampedY = Math.max(0, Math.min(rawY, rect.height - 96 - 80));
      setLivePos(null);
      onDragEnd(app.id, clampedX, clampedY, rect);
    };

    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
  }, [app.id, position, onDragEnd, desktopRef]);

  return (
    <motion.div
      animate={{ x: livePos ? livePos.x : displayPos.x, y: livePos ? livePos.y : displayPos.y }}
      transition={livePos ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 40 }}
      style={{ position: 'absolute', left: 0, top: 0, zIndex: livePos ? Z.WINDOWS : Z.DESKTOP_ICONS, cursor: livePos ? 'grabbing' : 'pointer' }}
      className={`pointer-events-auto flex flex-col items-center justify-center w-24 h-24 p-2 rounded-2xl select-none group will-change-transform
        ${isSelected
          ? 'bg-white/10 border-2 border-blue-400/60 shadow-[0_4px_12px_rgba(59,130,246,0.3),inset_0_1px_2px_rgba(255,255,255,0.15)]'
          : 'border border-transparent hover:bg-white/10 hover:border-white/10 hover:shadow-sm'}
        ${livePos ? 'opacity-90 scale-105' : 'opacity-100 scale-100'}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={(e) => { e.stopPropagation(); if (!isDragging.current) onClick(app); }}
      onDoubleClick={(e) => { e.stopPropagation(); onDoubleClick(app); }}
    >
      <div className="transform transition-transform group-hover:scale-105 active:scale-95 duration-200 flex items-center justify-center">
        {app.icon}
      </div>
      <span className="mt-2 text-xs text-white font-medium text-center line-clamp-2 max-w-full px-1" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.8)' }}>
        {app.title}
      </span>
    </motion.div>
  );
};

const DEFAULT_LIGHT_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop';
const DEFAULT_DARK_URL  = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2670&auto=format&fit=crop';

const Desktop = ({ children, isDarkMode, themeMode, wallpaperUrl }) => {
  const { openWindow } = useWindows();
  const [selectedAppId, setSelectedAppId] = useState(null);
  const desktopRef = useRef(null);
  const imgRef = useRef(null);
  const timeoutRef = useRef(null);
  const [currentBg, setCurrentBg] = useState(wallpaperUrl || DEFAULT_LIGHT_URL);
  const [nextBg, setNextBg] = useState(null);

  const [maxRows, setMaxRows] = useState(8);

  useEffect(() => {
    const target = wallpaperUrl || (isDarkMode ? DEFAULT_DARK_URL : DEFAULT_LIGHT_URL);
    if (target === currentBg) return;

    const img = new Image();
    imgRef.current = img;

    img.onload = () => {
      setNextBg(target);
      timeoutRef.current = setTimeout(() => {
        setCurrentBg(target);
        setNextBg(null);
        imgRef.current = null;
        timeoutRef.current = null;
      }, 700);
    };

    img.src = target;

    return () => {
      if (imgRef.current) imgRef.current.onload = null;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      imgRef.current = null;
      timeoutRef.current = null;
    };
  }, [wallpaperUrl, isDarkMode, currentBg]);

  useEffect(() => {
    const updateMaxRows = () => {
      if (desktopRef.current) setMaxRows(getMaxRows(desktopRef.current.clientHeight));
    };
    updateMaxRows();
    window.addEventListener('resize', updateMaxRows);
    return () => window.removeEventListener('resize', updateMaxRows);
  }, []);

  const [cellLayout, setCellLayout] = useState(() => buildDefaultLayout());

  useEffect(() => {
    setCellLayout(prev => {
      const adjusted = { ...prev };
      let changed = false;
      Object.entries(prev).forEach(([id, [col, row]]) => {
        if (row >= maxRows) {
          adjusted[id] = [col, maxRows - 1];
          changed = true;
        }
      });
      return changed ? adjusted : prev;
    });
  }, [maxRows]);

  const positions = Object.fromEntries(
    Object.entries(cellLayout).map(([id, [col, row]]) => [id, cellToPixel(col, row)])
  );

  const handleDragEnd = useCallback((appId, localX, localY, rect) => {
    const maxCol = Math.max(0, Math.floor((rect.width - PADDING_X - 96) / CELL_W));
    const mRows = getMaxRows(rect.height);
    const [targetCol, targetRow] = pixelToCell(localX, localY);
    const clampedCol = Math.max(0, Math.min(targetCol, maxCol));
    const clampedRow = Math.max(0, Math.min(targetRow, mRows - 1));
    setCellLayout((prev) => {
      const originalCell = prev[appId];
      if (originalCell[0] === clampedCol && originalCell[1] === clampedRow) return prev;
      const others = Object.fromEntries(Object.entries(prev).filter(([id]) => id !== appId));
      const targetOccupied = Object.values(others).some(([c, r]) => c === clampedCol && r === clampedRow);
      if (targetOccupied) {
        const [nc, nr] = findNearestFreeCell(clampedCol, clampedRow, others, maxCol, mRows - 1);
        return { ...others, [appId]: [nc, nr] };
      }
      return { ...others, [appId]: [clampedCol, clampedRow] };
    });
  }, []);

  const handleDesktopClick = () => setSelectedAppId(null);

  return (
    <div ref={desktopRef} className="relative w-screen h-screen overflow-hidden select-none" onClick={handleDesktopClick}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${currentBg}")` }} />
      {nextBg && (
        <motion.div
          key={nextBg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${nextBg}")` }}
        />
      )}
      <div className="absolute top-0 left-0 w-full h-[calc(100vh-80px)] pointer-events-none z-10">
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            app={app}
            isSelected={selectedAppId === app.id}
            position={positions[app.id] || cellToPixel(0, 0)}
            onDragEnd={handleDragEnd}
            desktopRef={desktopRef}
            onClick={(app) => {
              if (selectedAppId === app.id) { setSelectedAppId(null); openWindow(app); }
              else setSelectedAppId(app.id);
            }}
            onDoubleClick={(app) => { setSelectedAppId(null); openWindow(app); }}
          />
        ))}
      </div>
      <Widget />
      <div className="relative w-full h-full pointer-events-none z-20">{children}</div>
    </div>
  );
};

export default Desktop;
