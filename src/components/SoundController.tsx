"use client";

import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

type SoundControllerProps = {
  active: boolean;
  mode: 'stall' | 'eject';
};

export default function SoundController({ active, mode }: SoundControllerProps) {
  const fanHum = useRef<Tone.Noise | null>(null);
  const glitchSynth = useRef<Tone.Synth | null>(null);
  const crashNoise = useRef<Tone.Noise | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    
    // Initialize instruments on mount
    fanHum.current = new Tone.Noise("brown").set({ volume: -40 });
    glitchSynth.current = new Tone.Synth({
      oscillator: { type: 'square' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 },
    }).toDestination();
    crashNoise.current = new Tone.Noise("white").toDestination();

    const panner = new Tone.AutoPanner("4n").toDestination().start();
    fanHum.current.connect(panner);
    isInitialized.current = true;

    return () => {
      fanHum.current?.dispose();
      glitchSynth.current?.dispose();
      crashNoise.current?.dispose();
      panner.dispose();
      isInitialized.current = false;
    };
  }, []);

  useEffect(() => {
    const startAudio = async () => {
        try {
            if (Tone.context.state !== 'running') {
              await Tone.start();
            }

            if (active) {
                if (mode === 'stall') {
                    fanHum.current?.start();
                } else if (mode === 'eject') {
                    crashNoise.current?.start();
                    crashNoise.current?.stop("+0.2");
                }
            } else {
                fanHum.current?.stop();
            }
        } catch (e) {
            console.error("Could not start audio context", e);
        }
    };
    startAudio();

    let glitchInterval: NodeJS.Timeout;
    if (active && mode === 'stall') {
        glitchInterval = setInterval(() => {
            if (Math.random() < 0.1) {
                glitchSynth.current?.triggerAttackRelease("C2", "8n");
            }
        }, 2000);
    }

    return () => {
      if (fanHum.current?.state === 'started') {
        fanHum.current?.stop();
      }
      clearInterval(glitchInterval);
    };
  }, [active, mode]);

  return null;
}
