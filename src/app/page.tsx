"use client";

import React, { useState, useReducer, useEffect, useCallback, useRef } from 'react';
import Dashboard from '@/components/Dashboard';
import WindowsUpdateScreen from '@/components/windows/UpdateScreen';
import WindowsBSOD from '@/components/windows/BSOD';
import MacOSUpdateScreen from '@/components/macos/UpdateScreen';
import MacOSKernelPanicScreen from '@/components/macos/KernelPanicScreen';
import SoundController from '@/components/SoundController';

type OS = 'windows' | 'macos';
type Mode = 'stall' | 'eject';
type SimulationState = {
  os: OS;
  mode: Mode;
  active: boolean;
};

type Action = 
  | { type: 'START_SIMULATION'; payload: { os: OS; mode: Mode } }
  | { type: 'STOP_SIMULATION' }
  | { type: 'CHANGE_MODE'; payload: { mode: Mode } };

const initialState: SimulationState = {
  os: 'windows',
  mode: 'stall',
  active: false,
};

function reducer(state: SimulationState, action: Action): SimulationState {
  switch (action.type) {
    case 'START_SIMULATION':
      return {
        ...state,
        os: action.payload.os,
        mode: action.payload.mode,
        active: true,
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        active: false,
      };
    case 'CHANGE_MODE':
      return {
        ...state,
        mode: action.payload.mode,
      };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const enterFullscreen = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, []);

  const handleStart = (os: OS, mode: Mode) => {
    dispatch({ type: 'START_SIMULATION', payload: { os, mode } });
    if(isClient) enterFullscreen();
  };

  const handleStop = useCallback(() => {
    dispatch({ type: 'STOP_SIMULATION' });
    if(isClient) exitFullscreen();
  }, [exitFullscreen, isClient]);

  // Triple escape safety hatch
  useEffect(() => {
    let pressCount = 0;
    let lastPress = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const time = new Date().getTime();
        if (time - lastPress > 1000) {
          pressCount = 0;
        }
        pressCount++;
        lastPress = time;
        if (pressCount === 3) {
          if (state.mode === 'stall') {
            dispatch({ type: 'CHANGE_MODE', payload: { mode: 'eject' } });
          } else { // 'eject'
            handleStop();
          }
          pressCount = 0;
        }
      }
    };

    if (state.active) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [state.active, state.mode, handleStop]);
  
  // Fullscreen management
  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement && state.active) {
        handleStop(); // If user manually exits, stop simulation.
      }
    };
    
    if(isClient) {
        document.addEventListener('fullscreenchange', onFullscreenChange);
    }
  
    return () => {
      if(isClient) {
        document.removeEventListener('fullscreenchange', onFullscreenChange);
      }
    };
  }, [state.active, enterFullscreen, handleStop, isClient]);

  // Handle first click to enter fullscreen if simulation is active
  useEffect(() => {
    if (state.active) {
        const handleClick = () => {
            if (!document.fullscreenElement) {
                enterFullscreen();
            }
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }
  }, [state.active, enterFullscreen]);

  const renderSimulation = () => {
    if (!state.active) return <Dashboard onStart={handleStart} />;
    
    if (state.os === 'windows') {
      if (state.mode === 'stall') return <WindowsUpdateScreen />;
      if (state.mode === 'eject') return <WindowsBSOD />;
    }
    if (state.os === 'macos') {
      if (state.mode === 'stall') return <MacOSUpdateScreen />;
      if (state.mode === 'eject') return <MacOSKernelPanicScreen />;
    }
    return <Dashboard onStart={handleStart} />;
  };

  if (!isClient) {
    return <div className="h-screen w-screen bg-black" />; 
  }

  return (
    <main 
      ref={containerRef}
      className={`h-screen w-screen bg-black ${state.active ? 'cursor-none' : ''}`}
    >
      <SoundController active={state.active} mode={state.mode} />
      {renderSimulation()}
    </main>
  );
}
