import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWindows } from '../context/WindowContext';
import { appsRegistry } from '../utils/appsRegistry';
import Widget from './Widget';

const CELL_W = 100;
const CELL_H = 110;
const PADDING_X = 24;
const PADDING_Y = 24;

// Umbral mínimo de movimiento en px para considerar que hubo un drag real
const DRAG_THRESHOLD = 12;

/**
 * Convierte coordenadas en píxeles (relativas al desktop) a celda [col, row]
 * El punto de referencia es la esquina superior-izquierda del ícono (96×96 px)
 */
const pixelToCell = (x, y) => {
  const col = Math.round((x - PADDING_X) / CELL_W);
  const row = Math.round((y - PADDING_Y) / CELL_H);
  return [Math.max(0, col), Math.max(0, row)];
};

/**
 * Convierte celda [col, row] a coordenadas de píxeles (top-left del ícono)
 */
const cellToPixel = (col, row) => ({
  x: PADDING_X + col * CELL_W,
  y: PADDING_Y + row * CELL_H,
});

/**
 * Layout inicial: column-major, igual a Windows.
 * Garantiza que no haya dos íconos en la misma celda.
 */
const buildDefaultLayout = (maxRows = 8) => {
  const layout = {};
  const occupied = new Set();

  appsRegistry.forEach((app, index) => {
    let col = Math.floor(index / maxRows);
    let row = index % maxRows;

    // Buscar la primera celda libre empezando por la posición natural
    while (occupied.has(`${col},${row}`)) {
      row++;
      if (row >= maxRows) {
        row = 0;
        col++;
      }
    }

    occupied.add(`${col},${row}`);
    layout[app.id] = [col, row];
  });

  return layout;
};

/**
 * Calcula cuántas filas caben en el área visible del desktop.
 */
const getMaxRows = (desktopHeight) => {
  const usableHeight = desktopHeight - PADDING_Y - 80; // 80 = taskbar
  return Math.max(1, Math.floor(usableHeight / CELL_H));
};

/**
 * Dado un target [col, row], busca la celda libre más cercana
 * usando la misma prioridad que Windows: mismo col hacia abajo,
 * luego col+1, col+2, etc.
 */
const findNearestFreeCell = (targetCol, targetRow, others, maxCol, maxRow) => {
  const occupied = new Set(
    Object.values(others).map(([c, r]) => `${c},${r}`)
  );

  const free = (c, r) =>
    c >= 0 && r >= 0 && c <= maxCol && r <= maxRow && !occupied.has(`${c},${r}`);

  // Mismo col, misma fila
  if (free(targetCol, targetRow)) return [targetCol, targetRow];

  // Búsqueda en espiral cuadrada creciente
  for (let radius = 1; radius <= Math.max(maxCol, maxRow) * 2; radius++) {
    for (let dc = -radius; dc <= radius; dc++) {
      for (let dr = -radius; dr <= radius; dr++) {
        if (Math.abs(dc) !== radius && Math.abs(dr) !== radius) continue; // solo borde
        const c = targetCol + dc;
        const r = targetRow + dr;
        if (free(c, r)) return [c, r];
      }
    }
  }

  return [targetCol, targetRow]; // fallback
};

// ---------------------------------------------------------------------------
// DesktopIcon — el drag real se hace con position absolute + mouse events
// para evitar el conflicto entre dragConstraints y animate de framer-motion.
// ---------------------------------------------------------------------------
const DesktopIcon = ({
  app,
  isSelected,
  onClick,
  onDoubleClick,
  position,
  onDragEnd,
  desktopRef,
}) => {
  const isDragging = useRef(false);
  const dragStartMouse = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const [livePos, setLivePos] = useState(null); // posición en vivo durante drag

  // Sincronizar livePos cuando cambia la posición de celda (snap animado)
  useEffect(() => {
    if (!isDragging.current) {
      setLivePos(null); // limpiar para que el componente use `position`
    }
  }, [position]);

  const displayPos = livePos ?? position;

  const handleMouseDown = useCallback(
    (e) => {
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

        // Clamp dentro del área del desktop
        const clampedX = Math.max(0, Math.min(rawX, rect.width - 96));
        const clampedY = Math.max(0, Math.min(rawY, rect.height - 96 - 80));

        setLivePos({ x: clampedX, y: clampedY });
      };

      const onMouseUp = (upEvt) => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (!isDragging.current) {
          // Fue un click
          isDragging.current = false;
          return;
        }

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

        setLivePos(null); // limpiar posición en vivo; onDragEnd pondrá la correcta
        onDragEnd(app.id, clampedX, clampedY, rect);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [app.id, position, onDragEnd, desktopRef]
  );

  // Touch support
  const handleTouchStart = useCallback(
    (e) => {
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
    },
    [app.id, position, onDragEnd, desktopRef]
  );

  return (
    <motion.div
      animate={{ x: livePos ? livePos.x : displayPos.x, y: livePos ? livePos.y : displayPos.y }}
      transition={
        livePos
          ? { duration: 0 } // mientras arrastra: sin spring
          : { type: 'spring', stiffness: 500, damping: 40 } // al soltar: snap animado
      }
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: livePos ? 100 : 10,
        cursor: livePos ? 'grabbing' : 'pointer',
      }}
      className={`pointer-events-auto flex flex-col items-center justify-center w-24 h-24 p-2 rounded-2xl select-none group
        ${isSelected
          ? 'bg-white/10 border-2 border-blue-400/60 shadow-[0_4px_12px_rgba(59,130,246,0.3),inset_0_1px_2px_rgba(255,255,255,0.15)]'
          : 'border border-transparent hover:bg-white/10 hover:border-white/10 hover:shadow-sm'}
        ${livePos ? 'opacity-90 scale-105' : 'opacity-100 scale-100'}
      `}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={(e) => {
        e.stopPropagation();
        if (!isDragging.current) onClick(app);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick(app);
      }}
    >
      <div className="transform transition-transform group-hover:scale-105 active:scale-95 duration-200 flex items-center justify-center">
        {app.icon}
      </div>
      <span
        className="mt-2 text-xs text-white font-medium text-center line-clamp-2 max-w-full px-1"
        style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.8)' }}
      >
        {app.title}
      </span>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Desktop
// ---------------------------------------------------------------------------
const Desktop = ({ children, isDarkMode }) => {
  const { openWindow } = useWindows();
  const [selectedAppId, setSelectedAppId] = useState(null);
  const desktopRef = useRef(null);

  // Calculamos maxRows dinámicamente según el alto real del desktop
  const [maxRows, setMaxRows] = useState(8);

  useEffect(() => {
    const updateMaxRows = () => {
      if (desktopRef.current) {
        setMaxRows(getMaxRows(desktopRef.current.clientHeight));
      }
    };
    updateMaxRows();
    window.addEventListener('resize', updateMaxRows);
    return () => window.removeEventListener('resize', updateMaxRows);
  }, []);

  const [cellLayout, setCellLayout] = useState(() => buildDefaultLayout());

  // Recalcular layout si cambia maxRows (p.ej. al rotar pantalla)
  useEffect(() => {
    setCellLayout(buildDefaultLayout(maxRows));
  }, [maxRows]);

  // Derive pixel positions from cell layout
  const positions = Object.fromEntries(
    Object.entries(cellLayout).map(([id, [col, row]]) => [id, cellToPixel(col, row)])
  );

  /**
   * handleDragEnd recibe coordenadas locales (relativas al desktop, top-left del ícono)
   */
  const handleDragEnd = useCallback((appId, localX, localY, rect) => {
    const maxCol = Math.max(0, Math.floor((rect.width - PADDING_X - 96) / CELL_W));
    const mRows = getMaxRows(rect.height);

    const [targetCol, targetRow] = pixelToCell(localX, localY);
    const clampedCol = Math.max(0, Math.min(targetCol, maxCol));
    const clampedRow = Math.max(0, Math.min(targetRow, mRows - 1));

    setCellLayout((prev) => {
      const originalCell = prev[appId];

      // Misma celda → snap de vuelta sin cambios
      if (originalCell[0] === clampedCol && originalCell[1] === clampedRow) {
        return prev;
      }

      const others = Object.fromEntries(
        Object.entries(prev).filter(([id]) => id !== appId)
      );

      const targetOccupied = Object.values(others).some(
        ([c, r]) => c === clampedCol && r === clampedRow
      );

      if (targetOccupied) {
        // Buscar celda libre más cercana
        const [nc, nr] = findNearestFreeCell(clampedCol, clampedRow, others, maxCol, mRows - 1);
        return { ...others, [appId]: [nc, nr] };
      }

      return { ...others, [appId]: [clampedCol, clampedRow] };
    });
  }, []);

  const handleDesktopClick = () => setSelectedAppId(null);

  return (
    <div
      ref={desktopRef}
      className="relative w-screen h-screen overflow-hidden select-none transition-all duration-700 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: isDarkMode
          ? 'url("https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop")'
          : 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
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
            position={positions[app.id] || cellToPixel(0, 0)}
            onDragEnd={handleDragEnd}
            desktopRef={desktopRef}
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

      <Widget />

      <div className="relative w-full h-full pointer-events-none z-20">
        {children}
      </div>
    </div>
  );
};

export default Desktop;