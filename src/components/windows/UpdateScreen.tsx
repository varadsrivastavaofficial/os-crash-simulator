"use client";

import React, { useState, useEffect } from 'react';

export default function WindowsUpdateScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const updateProgress = () => {
      setProgress(currentProgress => {
        if (currentProgress >= 99) {
          // Stay at 99% forever
          return 99;
        }

        // Slow, random increments
        const increment = Math.random() < 0.2 ? Math.floor(Math.random() * 3) + 1 : 0;
        const nextProgress = Math.min(currentProgress + increment, 99);
        
        // Random delay for next update
        const delay = Math.random() * 4000 + 1000;
        timeout = setTimeout(updateProgress, delay);

        return nextProgress;
      });
    };

    timeout = setTimeout(updateProgress, 2000); // Initial delay

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#0078d4] font-segoe text-white">
      <div className="flex flex-col items-center gap-8">
        <svg
          aria-hidden="true"
          className="h-20 w-20 animate-spin text-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 28.0001 72.5987 9.68021 50 9.68021C27.4013 9.68021 9.08144 28.0001 9.08144 50.5908Z"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
        <div className="text-center">
          <p className="text-2xl">Working on updates</p>
          <p className="text-2xl">{progress}% complete</p>
          <p className="text-2xl">Don't turn off your computer</p>
        </div>
      </div>
    </div>
  );
}
