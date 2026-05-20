import React, { useState, useEffect, useRef } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import { useWindows } from './context/WindowContext';
import { motion, AnimatePresence } from 'framer-motion';

const playStartupChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const frequencies = [523.25, 659.25, 783.99, 987.77, 1046.50];
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05 + i * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0 + i * 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 3.5);
    });
  } catch (e) {
    console.error('Audio play failed', e);
  }
};

function App() {
  const { windows } = useWindows();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bootStatus, setBootStatus] = useState('loggingIn');
  const chimePlayed = useRef(false);

  // Login screen auto-dismisses after a short delay
  useEffect(() => {
    if (bootStatus === 'loggingIn') {
      const timer = setTimeout(() => setBootStatus('ready'), 400);
      return () => clearTimeout(timer);
    }
  }, [bootStatus]);

  // Play chime on first interaction anywhere — but tied to the taskbar
  // slide-in animation (which completes ~800ms after ready), so it feels
  // like the sound comes WITH the desktop appearing, not randomly later.
  const handleFirstInteraction = () => {
    if (chimePlayed.current) return;
    chimePlayed.current = true;
    playStartupChime();
    window.removeEventListener('pointerdown', handleFirstInteraction);
  };

  useEffect(() => {
    if (bootStatus === 'ready') {
      // Small delay so the chime plays right as the taskbar finishes sliding in
      // (~800ms animation). First touch/click after that triggers it.
      // But we also fire it automatically on the first pointer event,
      // which in practice is the user's first natural interaction.
      window.addEventListener('pointerdown', handleFirstInteraction);
      return () => window.removeEventListener('pointerdown', handleFirstInteraction);
    }
  }, [bootStatus]);

  const handleShutdown = () => {
    chimePlayed.current = false;
    setBootStatus('booting');
    setTimeout(() => setBootStatus('loggingIn'), 4500);
  };

  return (
    <div className={`relative w-screen h-screen overflow-hidden font-sans transition-colors duration-500 ${isDarkMode ? 'dark text-slate-100' : 'text-gray-900'}`}>

      <AnimatePresence>
        {bootStatus !== 'booting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full absolute inset-0"
          >
            <Desktop isDarkMode={isDarkMode}>
              {windows.map((windowData) => (
                <Window key={windowData.id} app={windowData} isDarkMode={isDarkMode} />
              ))}
            </Desktop>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={bootStatus === 'ready' ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 w-full z-[9000] pointer-events-none"
            >
              <div className="pointer-events-auto">
                <Taskbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onShutdown={handleShutdown} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login overlay — auto-dismisses, no click needed */}
      <AnimatePresence>
        {bootStatus === 'loggingIn' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-[9999] flex flex-col items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6 shadow-lg"></div>
              <p className="text-xl font-medium text-gray-800 dark:text-gray-200 drop-shadow-md">Iniciando sesión como Invitado...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BIOS screen */}
      {bootStatus === 'booting' && (
        <div className="absolute inset-0 z-[10000] bg-black text-white font-mono text-sm p-6 overflow-hidden select-none">
          <BIOSSequence />
        </div>
      )}
    </div>
  );
}

const BIOSSequence = () => {
  const lines = [
    "ASUS UEFI BIOS Utility - EZ Mode",
    "CPU: AMD Ryzen 9 7950X 16-Core Processor",
    "Memory: 65536MB (DDR5 6000MHz)",
    "Initializing USB Controllers... Done.",
    "Auto-Detecting SATA Port 1... Not Detected",
    "Auto-Detecting NVMe M.2_1... Samsung SSD 990 PRO 2TB",
    "",
    "Loading Linux Kernel...",
    "Initializing Laravel Backend v13...",
    "Starting Redis In-Memory Datastore... OK",
    "Connecting to PostgreSQL Database... OK",
    "Checking VILT Stack status: OK",
    "Mounting file systems... Done.",
    "Booting Portfolio OS..."
  ];

  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    let delay = 0;
    lines.forEach((line, index) => {
      delay += Math.random() * 200 + 50;
      if (index > 6) delay += 300;
      setTimeout(() => setVisibleLines(prev => [...prev, line]), delay);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-1">
      {visibleLines.map((line, i) => <div key={i}>{line}</div>)}
      <div className="w-2 h-4 bg-white animate-pulse mt-1"></div>
    </div>
  );
};

export default App;