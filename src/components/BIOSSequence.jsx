import React, { useState, useEffect } from 'react';

export const BIOS_LINES = [
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

const BIOSSequence = () => {
  const [visibleLines, setVisibleLines] = useState([]);
  useEffect(() => {
    let delay = 0;
    BIOS_LINES.forEach((line, index) => {
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

export default BIOSSequence;
