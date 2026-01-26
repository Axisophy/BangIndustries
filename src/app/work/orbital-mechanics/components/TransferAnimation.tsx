'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  EARTH, MOON, hohmannTransfer, getTransferState,
  formatTime, formatVelocity, formatDistance
} from '../lib/physics';

export function TransferAnimation() {
  const [timeProgress, setTimeProgress] = useState(0);  // 0 to 1
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNaivePath, setShowNaivePath] = useState(false);

  // Mission parameters
  const LEO_ALTITUDE = 400;
  const r1 = EARTH.radius + LEO_ALTITUDE;
  const r2 = MOON.orbitRadius!;

  const transfer = useMemo(() => hohmannTransfer(r1, r2, EARTH.mu), [r1, r2]);

  // Animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeProgress(prev => {
        if (prev >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return prev + 0.002;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Spacecraft state
  const spacecraft = useMemo(() => {
    const t = timeProgress * transfer.transferTime;
    const state = getTransferState(transfer, t, EARTH.mu);

    // Calculate distance to Moon (simplified - Moon at fixed position)
    const moonX = -MOON.orbitRadius!;
    const moonY = 0;
    const distanceToMoon = Math.sqrt(
      Math.pow(state.x - moonX, 2) + Math.pow(state.y - moonY, 2)
    );

    return {
      ...state,
      distanceToMoon,
      altitude: state.r - EARTH.radius,
    };
  }, [timeProgress, transfer]);

  // Visualization scale
  const scale = 280 / MOON.orbitRadius!;
  const width = 650;
  const height = 500;
  const cx = width / 2 + 50;
  const cy = height / 2;

  const earthR = Math.max(EARTH.radius * scale, 12);
  const moonR = Math.max(MOON.radius * scale, 6);
  const moonOrbitR = MOON.orbitRadius! * scale;

  return (
    <div className="space-y-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto bg-[#0a0a0a]">
        {/* Moon&apos;s orbit */}
        <circle
          cx={cx}
          cy={cy}
          r={moonOrbitR}
          fill="none"
          stroke="#222"
          strokeWidth={1}
          strokeDasharray="4,4"
        />

        {/* LEO orbit */}
        <circle
          cx={cx}
          cy={cy}
          r={r1 * scale}
          fill="none"
          stroke="#4A90D9"
          strokeWidth={1}
          opacity={0.5}
        />

        {/* Naive straight path (optional) */}
        {showNaivePath && (
          <line
            x1={cx + r1 * scale}
            y1={cy}
            x2={cx - moonOrbitR}
            y2={cy}
            stroke="#FF0055"
            strokeWidth={1}
            strokeDasharray="4,4"
            opacity={0.5}
          />
        )}

        {/* Transfer trajectory (drawn portion) */}
        <path
          d={(() => {
            const points: string[] = [];
            const steps = 100;
            for (let i = 0; i <= steps; i++) {
              const frac = i / steps;
              const t = frac * transfer.transferTime;
              const state = getTransferState(transfer, t, EARTH.mu);
              const x = cx + state.x * scale;
              const y = cy - state.y * scale;
              points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
            }
            return points.join(' ');
          })()}
          fill="none"
          stroke="#FF6B35"
          strokeWidth={2}
          opacity={0.3}
        />

        {/* Traveled portion */}
        <path
          d={(() => {
            const points: string[] = [];
            const steps = Math.floor(timeProgress * 100);
            for (let i = 0; i <= steps; i++) {
              const frac = i / 100;
              const t = frac * transfer.transferTime;
              const state = getTransferState(transfer, t, EARTH.mu);
              const x = cx + state.x * scale;
              const y = cy - state.y * scale;
              points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
            }
            return points.join(' ');
          })()}
          fill="none"
          stroke="#FF6B35"
          strokeWidth={2}
        />

        {/* Earth */}
        <circle cx={cx} cy={cy} r={earthR} fill="#4A90D9" />

        {/* Moon */}
        <circle cx={cx - moonOrbitR} cy={cy} r={moonR} fill="#C4C4C4" />

        {/* Spacecraft */}
        <g transform={`translate(${cx + spacecraft.x * scale}, ${cy - spacecraft.y * scale})`}>
          <circle r={5} fill="#FFD700" />
          <circle r={8} fill="none" stroke="#FFD700" strokeWidth={1} opacity={0.5} />
        </g>

        {/* Distance line to Moon */}
        <line
          x1={cx + spacecraft.x * scale}
          y1={cy - spacecraft.y * scale}
          x2={cx - moonOrbitR}
          y2={cy}
          stroke="#666"
          strokeWidth={0.5}
          strokeDasharray="2,2"
        />

        {/* TLI marker */}
        <g transform={`translate(${cx + r1 * scale + 5}, ${cy - 15})`}>
          <text fill="#FF6B35" fontSize="9" fontFamily="monospace">TLI</text>
        </g>

        {/* LOI marker */}
        <g transform={`translate(${cx - moonOrbitR + 15}, ${cy - 15})`}>
          <text fill="#00D4AA" fontSize="9" fontFamily="monospace">LOI</text>
        </g>
      </svg>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-4 py-2 text-sm font-mono transition-colors ${
            isPlaying
              ? 'bg-[#FF6B35] text-white'
              : 'bg-[#0055FF] text-white'
          }`}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={timeProgress}
          onChange={e => setTimeProgress(parseFloat(e.target.value))}
          className="flex-1"
        />

        <button
          onClick={() => { setTimeProgress(0); setIsPlaying(false); }}
          className="px-4 py-2 text-sm font-mono bg-black/10 hover:bg-black/20 transition-colors"
        >
          Reset
        </button>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showNaivePath}
            onChange={e => setShowNaivePath(e.target.checked)}
          />
          <span className="text-black/60">Show &quot;straight line&quot;</span>
        </label>
      </div>

      {/* Telemetry */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-black/5 p-4">
          <div className="text-xs text-black/40 font-mono">Mission Time</div>
          <div className="text-lg font-mono font-bold">
            T+{formatTime(timeProgress * transfer.transferTime)}
          </div>
        </div>
        <div className="bg-black/5 p-4">
          <div className="text-xs text-black/40 font-mono">Velocity</div>
          <div className="text-lg font-mono font-bold">
            {formatVelocity(spacecraft.v)}
          </div>
        </div>
        <div className="bg-black/5 p-4">
          <div className="text-xs text-black/40 font-mono">Altitude</div>
          <div className="text-lg font-mono font-bold">
            {formatDistance(spacecraft.altitude)}
          </div>
        </div>
        <div className="bg-black/5 p-4">
          <div className="text-xs text-black/40 font-mono">Distance to Moon</div>
          <div className="text-lg font-mono font-bold">
            {formatDistance(spacecraft.distanceToMoon)}
          </div>
        </div>
      </div>
    </div>
  );
}
