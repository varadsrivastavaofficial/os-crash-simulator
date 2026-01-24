"use client";

import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

export default function MacOSUpdateScreen() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const updateProgress = () => {
            setProgress(currentProgress => {
                if (currentProgress >= 99) {
                    return 99; // Stall at 99%
                }

                const increment = Math.random() < 0.1 ? 1 : 0;
                const nextProgress = Math.min(currentProgress + increment, 99);
                
                const delay = Math.random() * 5000 + 2000;
                timeout = setTimeout(updateProgress, delay);

                return nextProgress;
            });
        };

        timeout = setTimeout(updateProgress, 3000);

        return () => clearTimeout(timeout);
    }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black text-neutral-300">
      <div className="flex flex-col items-center gap-8 text-center">
        <svg
          className="h-24 w-24 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.01,2.07c-2.3,0-4.33,1.52-4.93,3.64C6.93,5.77,6.8,5.82,6.67,5.82C6.11,5.82,5.5,5.43,5.19,4.92 c-0.84-1.39-2.52-2.03-4.14-1.52c-0.8,0.25-1.2,1.2-0.95,2c1.3,4.14,4.92,7.34,9.26,7.34c0.1,0,0.2,0,0.3,0 c-0.1,0.08-0.2,0.17-0.29,0.27c-1.56,1.7-2.93,3.74-3.86,6.09c-0.23,0.58,0.15,1.23,0.73,1.46c0.58,0.23,1.23-0.15,1.46-0.73 c0.77-1.95,1.92-3.63,3.31-5.02c1.2-1.2,2.68-2.13,4.3-2.67c0.57-0.19,0.92-0.79,0.74-1.36c-0.18-0.57-0.78-0.92-1.35-0.74 c-1.26,0.42-2.43,1.15-3.41,2.13c-1.63,1.63-2.6,3.86-2.9,6.29c-0.03,0.22,0.29,0.53,0.29,0.53s0.32-0.31,0.29-0.53 c0.3-2.43,1.27-4.66,2.9-6.29c0.98-0.98,2.15-1.71,3.41-2.13c0.57-0.18,1.17,0.17,1.35,0.74c0.18,0.57-0.17,1.17-0.74,1.35 c-1.62,0.54-3.1,1.47-4.3,2.67c-1.39,1.39-2.54,3.07-3.31,5.02c-0.23,0.58-0.88,0.96-1.46,0.73c-0.58-0.23-0.96-0.88-0.73-1.46 c0.93-2.35,2.3-4.39,3.86-6.09c0.09-0.1,0.19-0.19,0.29-0.27c-0.1,0-0.2,0-0.3,0C8.58,14.77,3,10.6,3,10.5 c0,0,5.55,4.13,9.01,0.03C12,10.5,12,2.07,12.01,2.07z" />
        </svg>

        <p className="text-xl">Installing on "Macintosh HD"</p>
        <div className="w-64">
             <Progress value={progress} className="h-1 bg-neutral-600 [&>div]:bg-neutral-300" />
        </div>
        <p className="text-sm text-neutral-400">About {Math.max(1, 15 - Math.floor(progress / 7))} minutes remaining</p>
      </div>
    </div>
  );
}
