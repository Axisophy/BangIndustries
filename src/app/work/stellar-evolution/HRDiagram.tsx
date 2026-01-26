'use client';

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';

type StarCategory = 'main-sequence' | 'giant' | 'supergiant' | 'white-dwarf';

interface Star {
  name: string;
  temperature: number;
  luminosity: number;
  category: StarCategory;
  spectralType: string;
  description: string;
  labelDx?: number;
  labelDy?: number;
  labelAnchor?: 'start' | 'end';
}

interface EvolutionPoint {
  temperature: number;
  luminosity: number;
  label: string;
  age: string;
}

const CATEGORY_CONFIG: Record<StarCategory, { color: string; label: string; radius: number }> = {
  'main-sequence': { color: '#0055FF', label: 'Main Sequence', radius: 4 },
  'giant': { color: '#FF0055', label: 'Giants', radius: 5 },
  'supergiant': { color: '#000000', label: 'Supergiants', radius: 7 },
  'white-dwarf': { color: 'rgba(0,0,0,0.35)', label: 'White Dwarfs', radius: 3 },
};

const STARS: Star[] = [
  // Main Sequence
  { name: 'Sun', temperature: 5778, luminosity: 1, category: 'main-sequence', spectralType: 'G2V', description: 'Our star. A yellow dwarf halfway through its 10-billion-year main-sequence lifetime.' },
  { name: 'Sirius A', temperature: 9940, luminosity: 25.4, category: 'main-sequence', spectralType: 'A1V', description: 'The brightest star in the night sky. A hot white star 8.6 light-years from Earth.' },
  { name: 'Vega', temperature: 9602, luminosity: 40.12, category: 'main-sequence', spectralType: 'A0V', description: 'One of the most studied stars. The former pole star and reference point for stellar brightness.', labelDy: -12 },
  { name: 'Procyon A', temperature: 6530, luminosity: 6.93, category: 'main-sequence', spectralType: 'F5IV-V', description: 'A bright nearby star beginning to evolve off the main sequence. 11.5 light-years away.' },
  { name: 'Alpha Centauri A', temperature: 5790, luminosity: 1.519, category: 'main-sequence', spectralType: 'G2V', description: 'The nearest Sun-like star. Part of a triple system 4.37 light-years away.', labelDx: -8, labelAnchor: 'end' },
  { name: 'Proxima Centauri', temperature: 3042, luminosity: 0.0017, category: 'main-sequence', spectralType: 'M5.5Ve', description: 'The nearest star to the Sun. A faint red dwarf with at least two confirmed exoplanets.', labelDx: -8, labelAnchor: 'end' },
  { name: "Barnard's Star", temperature: 3134, luminosity: 0.0035, category: 'main-sequence', spectralType: 'M4Ve', description: 'The fastest-moving star in Earth\'s sky. A red dwarf 6 light-years away.', labelDx: -8, labelAnchor: 'end', labelDy: -8 },
  { name: 'Spica', temperature: 25300, luminosity: 12100, category: 'main-sequence', spectralType: 'B1V', description: 'A massive blue star in Virgo. Actually a close binary system.' },
  { name: 'Fomalhaut', temperature: 8590, luminosity: 16.63, category: 'main-sequence', spectralType: 'A3V', description: 'Surrounded by a dramatic debris disk. One of the first stars with a directly imaged exoplanet candidate.' },
  // Giants
  { name: 'Arcturus', temperature: 4286, luminosity: 170, category: 'giant', spectralType: 'K1.5III', description: 'The brightest star in the northern hemisphere. A red giant 37 light-years away.', labelDx: -8, labelAnchor: 'end' },
  { name: 'Aldebaran', temperature: 3910, luminosity: 518, category: 'giant', spectralType: 'K5III', description: 'The eye of Taurus. A red giant that has exhausted its core hydrogen.', labelDx: -8, labelAnchor: 'end' },
  { name: 'Pollux', temperature: 4666, luminosity: 32.7, category: 'giant', spectralType: 'K0III', description: 'The brightest star in Gemini. A giant with a confirmed Jupiter-mass exoplanet.', labelDx: -8, labelAnchor: 'end' },
  { name: 'Capella', temperature: 4970, luminosity: 78.7, category: 'giant', spectralType: 'G8III', description: 'Actually a system of four stars. The primary is a yellow giant similar to what our Sun will become.' },
  // Supergiants
  { name: 'Betelgeuse', temperature: 3500, luminosity: 126000, category: 'supergiant', spectralType: 'M1-2Ia', description: 'A red supergiant in Orion nearing the end of its life. Will explode as a supernova.', labelDx: -8, labelAnchor: 'end' },
  { name: 'Rigel', temperature: 12100, luminosity: 120000, category: 'supergiant', spectralType: 'B8Ia', description: 'A blue supergiant in Orion. One of the most luminous stars visible to the naked eye.' },
  { name: 'Deneb', temperature: 8525, luminosity: 196000, category: 'supergiant', spectralType: 'A2Ia', description: 'One of the most luminous stars known. Around 2,600 light-years away yet still among the brightest.' },
  { name: 'Antares', temperature: 3660, luminosity: 75900, category: 'supergiant', spectralType: 'M1Iab', description: 'The heart of Scorpius. A red supergiant so large it would engulf the orbit of Mars.', labelDx: -8, labelAnchor: 'end', labelDy: 16 },
  { name: 'Canopus', temperature: 7350, luminosity: 10700, category: 'supergiant', spectralType: 'A9II', description: 'The second-brightest star in the night sky. A bright giant 310 light-years away.' },
  { name: 'Polaris', temperature: 6015, luminosity: 1260, category: 'supergiant', spectralType: 'F7Ib', description: 'The current North Star. A Cepheid variable that pulsates over a 4-day cycle.' },
  // White Dwarfs
  { name: 'Sirius B', temperature: 25200, luminosity: 0.056, category: 'white-dwarf', spectralType: 'DA2', description: 'The companion of Sirius A. A white dwarf with the mass of the Sun compressed to the size of Earth.' },
  { name: 'Procyon B', temperature: 7740, luminosity: 0.00049, category: 'white-dwarf', spectralType: 'DQZ', description: 'One of the nearest white dwarfs. The faint companion of Procyon A.' },
  { name: '40 Eridani B', temperature: 16500, luminosity: 0.013, category: 'white-dwarf', spectralType: 'DA4', description: 'The first white dwarf discovered. Part of a triple star system 16.3 light-years away.' },
];

const SUN_EVOLUTION: EvolutionPoint[] = [
  { temperature: 5600, luminosity: 0.7, label: 'Zero-age main sequence', age: '0.1 Gyr' },
  { temperature: 5778, luminosity: 1.0, label: 'Present Sun', age: '4.6 Gyr' },
  { temperature: 5800, luminosity: 1.6, label: 'Late main sequence', age: '8 Gyr' },
  { temperature: 5200, luminosity: 3.5, label: 'Subgiant', age: '10 Gyr' },
  { temperature: 4800, luminosity: 10, label: 'Red giant branch', age: '11 Gyr' },
  { temperature: 3500, luminosity: 2000, label: 'RGB tip', age: '12 Gyr' },
  { temperature: 4700, luminosity: 50, label: 'Horizontal branch', age: '12.1 Gyr' },
  { temperature: 3200, luminosity: 5000, label: 'AGB tip', age: '12.3 Gyr' },
  { temperature: 30000, luminosity: 3000, label: 'Post-AGB', age: '12.3 Gyr' },
  { temperature: 30000, luminosity: 0.01, label: 'White dwarf', age: '12.4 Gyr' },
  { temperature: 5000, luminosity: 0.0001, label: 'Cooled white dwarf', age: '>15 Gyr' },
];

// --- Layout ---
const MARGIN = { top: 40, right: 20, bottom: 50, left: 65 };

// Log-scale axis ranges
const LT_MIN = 3.4;   // ~2,500 K
const LT_MAX = 4.72;  // ~52,000 K
const LL_MIN = -4.2;
const LL_MAX = 5.8;

// Spectral class labels
const SPECTRAL_CLASSES = [
  { label: 'O', temp: 42000 },
  { label: 'B', temp: 18000 },
  { label: 'A', temp: 8700 },
  { label: 'F', temp: 6700 },
  { label: 'G', temp: 5600 },
  { label: 'K', temp: 4400 },
  { label: 'M', temp: 3000 },
];

// Axis ticks
const TEMP_TICKS = [40000, 20000, 10000, 5000, 3000];
const LUM_TICKS = [100000, 1000, 10, 1, 0.01, 0.0001];

function formatLum(l: number): string {
  if (l >= 1) return l.toLocaleString();
  if (l === 0.01) return '0.01';
  if (l === 0.0001) return '10\u207B\u2074';
  return String(l);
}

function formatTemp(t: number): string {
  return t.toLocaleString();
}

// --- Component ---
interface HRDiagramProps {
  className?: string;
  showEvolution?: boolean;
}

export default function HRDiagram({ className = '', showEvolution = false }: HRDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ width: number; height: number } | null>(null);
  const [activeCategories, setActiveCategories] = useState<Set<StarCategory>>(
    new Set<StarCategory>(['main-sequence', 'giant', 'supergiant', 'white-dwarf'])
  );
  const [showPath, setShowPath] = useState(showEvolution);
  const [selected, setSelected] = useState<Star | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) setDims({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const vw = dims?.width ?? 800;
  const vh = dims?.height ?? 600;
  const pw = vw - MARGIN.left - MARGIN.right;
  const ph = vh - MARGIN.top - MARGIN.bottom;

  const toX = useCallback((temp: number) =>
    MARGIN.left + ((LT_MAX - Math.log10(temp)) / (LT_MAX - LT_MIN)) * pw
  , [pw]);

  const toY = useCallback((lum: number) =>
    MARGIN.top + ((LL_MAX - Math.log10(lum)) / (LL_MAX - LL_MIN)) * ph
  , [ph]);

  const toggleCategory = useCallback((cat: StarCategory) => {
    setActiveCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const visibleStars = useMemo(
    () => STARS.filter(s => activeCategories.has(s.category)),
    [activeCategories]
  );

  const evolutionPoints = useMemo(
    () => SUN_EVOLUTION.map(pt => ({ ...pt, x: toX(pt.temperature), y: toY(pt.luminosity) })),
    [toX, toY]
  );

  const evolutionPathD = useMemo(
    () => evolutionPoints.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' '),
    [evolutionPoints]
  );

  // Region label positions derived from plot area
  const msAngle = useMemo(() => {
    const x1 = toX(25300), y1 = toY(12100);
    const x2 = toX(3042), y2 = toY(0.0017);
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  }, [toX, toY]);

  return (
    <div className={`${className} flex flex-col`}>
      {/* Controls */}
      <div className='flex flex-wrap items-center gap-4 px-4 py-3 border-b border-black/10 shrink-0'>
        {(Object.entries(CATEGORY_CONFIG) as [StarCategory, typeof CATEGORY_CONFIG[StarCategory]][]).map(([key, config]) => (
          <button
            key={key}
            onClick={() => toggleCategory(key)}
            className={`flex items-center gap-2 text-xs transition-colors ${
              activeCategories.has(key) ? 'text-black' : 'text-black/30'
            }`}
          >
            <span
              className='w-2 h-2 inline-block shrink-0'
              style={{
                backgroundColor: config.color,
                opacity: activeCategories.has(key) ? 1 : 0.3,
              }}
            />
            {config.label}
          </button>
        ))}
        <span className='w-px h-4 bg-black/10' />
        <button
          onClick={() => setShowPath(p => !p)}
          className={`text-xs transition-colors ${showPath ? 'text-black' : 'text-black/30'}`}
        >
          Solar evolution
        </button>
      </div>

      {/* Chart */}
      <div ref={containerRef} className='flex-1 relative min-h-0'>
        {dims && (
          <svg
            viewBox={`0 0 ${vw} ${vh}`}
            className='w-full h-full'
            onClick={() => setSelected(null)}
          >
            {/* Grid lines */}
            {TEMP_TICKS.map(t => {
              const x = toX(t);
              return (
                <line
                  key={`gt-${t}`}
                  x1={x} y1={MARGIN.top}
                  x2={x} y2={vh - MARGIN.bottom}
                  stroke='black' strokeOpacity={0.05} strokeWidth={1}
                />
              );
            })}
            {LUM_TICKS.map(l => {
              const y = toY(l);
              return (
                <line
                  key={`gl-${l}`}
                  x1={MARGIN.left} y1={y}
                  x2={vw - MARGIN.right} y2={y}
                  stroke='black' strokeOpacity={0.05} strokeWidth={1}
                />
              );
            })}

            {/* Region labels */}
            <text
              x={MARGIN.left + pw * 0.59} y={MARGIN.top + ph * 0.53}
              transform={`rotate(${msAngle.toFixed(1)}, ${MARGIN.left + pw * 0.59}, ${MARGIN.top + ph * 0.53})`}
              style={{ fontSize: '28px', fontFamily: 'neue-haas-grotesk-display, sans-serif', fontWeight: 700, letterSpacing: '0.08em' }}
              fill='black' fillOpacity={0.04}
              textAnchor='middle'
            >
              MAIN SEQUENCE
            </text>
            <text
              x={MARGIN.left + pw * 0.66} y={MARGIN.top + ph * 0.08}
              style={{ fontSize: '18px', fontFamily: 'neue-haas-grotesk-display, sans-serif', fontWeight: 700, letterSpacing: '0.08em' }}
              fill='black' fillOpacity={0.04}
              textAnchor='middle'
            >
              SUPERGIANTS
            </text>
            <text
              x={MARGIN.left + pw * 0.81} y={MARGIN.top + ph * 0.3}
              style={{ fontSize: '16px', fontFamily: 'neue-haas-grotesk-display, sans-serif', fontWeight: 700, letterSpacing: '0.08em' }}
              fill='black' fillOpacity={0.04}
              textAnchor='middle'
            >
              GIANTS
            </text>
            <text
              x={MARGIN.left + pw * 0.33} y={MARGIN.top + ph * 0.84}
              style={{ fontSize: '14px', fontFamily: 'neue-haas-grotesk-display, sans-serif', fontWeight: 700, letterSpacing: '0.08em' }}
              fill='black' fillOpacity={0.04}
              textAnchor='middle'
            >
              WHITE DWARFS
            </text>

            {/* Evolution path */}
            {showPath && (
              <g>
                <path
                  d={evolutionPathD}
                  fill='none'
                  stroke='black'
                  strokeOpacity={0.15}
                  strokeWidth={1.5}
                  strokeDasharray='6 4'
                />
                {evolutionPoints.map((pt, i) => (
                  <g key={`evo-${i}`}>
                    <circle
                      cx={pt.x} cy={pt.y}
                      r={pt.label === 'Present Sun' ? 4 : 2.5}
                      fill={pt.label === 'Present Sun' ? '#0055FF' : 'black'}
                      fillOpacity={pt.label === 'Present Sun' ? 1 : 0.2}
                    />
                    <title>{`${pt.label} (${pt.age})`}</title>
                  </g>
                ))}
              </g>
            )}

            {/* Stars */}
            {visibleStars.map(star => {
              const cx = toX(star.temperature);
              const cy = toY(star.luminosity);
              const config = CATEGORY_CONFIG[star.category];
              const isHovered = hovered === star.name;
              const isSelected = selected?.name === star.name;
              const r = config.radius + (isHovered ? 1 : 0) + (isSelected ? 2 : 0);
              const dx = star.labelDx ?? 8;
              const dy = star.labelDy ?? 4;
              const anchor = star.labelAnchor ?? 'start';

              return (
                <g
                  key={star.name}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(star.name)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(prev => prev?.name === star.name ? null : star);
                  }}
                >
                  {isSelected && (
                    <circle
                      cx={cx} cy={cy}
                      r={r + 4}
                      fill='none'
                      stroke={config.color}
                      strokeOpacity={0.3}
                      strokeWidth={1.5}
                    />
                  )}
                  <circle
                    cx={cx} cy={cy}
                    r={r}
                    fill={config.color}
                  />
                  <text
                    x={cx + dx}
                    y={cy + dy}
                    textAnchor={anchor}
                    style={{
                      fontSize: '10px',
                      fontFamily: 'neue-haas-grotesk-text, sans-serif',
                      fill: 'rgba(0,0,0,0.5)',
                    }}
                  >
                    {star.name}
                  </text>
                </g>
              );
            })}

            {/* Axes */}
            <line
              x1={MARGIN.left} y1={MARGIN.top}
              x2={MARGIN.left} y2={vh - MARGIN.bottom}
              stroke='black' strokeOpacity={0.2} strokeWidth={1}
            />
            <line
              x1={MARGIN.left} y1={vh - MARGIN.bottom}
              x2={vw - MARGIN.right} y2={vh - MARGIN.bottom}
              stroke='black' strokeOpacity={0.2} strokeWidth={1}
            />

            {/* Temperature ticks + labels */}
            {TEMP_TICKS.map(t => {
              const x = toX(t);
              return (
                <g key={`tt-${t}`}>
                  <line
                    x1={x} y1={vh - MARGIN.bottom}
                    x2={x} y2={vh - MARGIN.bottom + 5}
                    stroke='black' strokeOpacity={0.3} strokeWidth={1}
                  />
                  <text
                    x={x} y={vh - MARGIN.bottom + 18}
                    textAnchor='middle'
                    style={{ fontSize: '10px', fontFamily: 'input-mono, monospace', fill: 'rgba(0,0,0,0.35)' }}
                  >
                    {formatTemp(t)}
                  </text>
                </g>
              );
            })}
            <text
              x={MARGIN.left + pw / 2}
              y={vh - 4}
              textAnchor='middle'
              style={{ fontSize: '10px', fontFamily: 'input-mono, monospace', fill: 'rgba(0,0,0,0.3)' }}
            >
              Surface Temperature (K)
            </text>

            {/* Luminosity ticks + labels */}
            {LUM_TICKS.map(l => {
              const y = toY(l);
              return (
                <g key={`lt-${l}`}>
                  <line
                    x1={MARGIN.left - 5} y1={y}
                    x2={MARGIN.left} y2={y}
                    stroke='black' strokeOpacity={0.3} strokeWidth={1}
                  />
                  <text
                    x={MARGIN.left - 8} y={y + 3}
                    textAnchor='end'
                    style={{ fontSize: '10px', fontFamily: 'input-mono, monospace', fill: 'rgba(0,0,0,0.35)' }}
                  >
                    {formatLum(l)}
                  </text>
                </g>
              );
            })}
            <text
              x={14}
              y={MARGIN.top + ph / 2}
              textAnchor='middle'
              transform={`rotate(-90, 14, ${MARGIN.top + ph / 2})`}
              style={{ fontSize: '10px', fontFamily: 'input-mono, monospace', fill: 'rgba(0,0,0,0.3)' }}
            >
              {'Luminosity (L\u2609)'}
            </text>

            {/* Spectral class labels */}
            {SPECTRAL_CLASSES.map(sc => {
              const x = toX(sc.temp);
              return (
                <text
                  key={sc.label}
                  x={x} y={MARGIN.top - 10}
                  textAnchor='middle'
                  style={{ fontSize: '11px', fontFamily: 'neue-haas-grotesk-display, sans-serif', fontWeight: 700, fill: 'rgba(0,0,0,0.25)' }}
                >
                  {sc.label}
                </text>
              );
            })}
          </svg>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className='px-4 py-3 border-t border-black/10 shrink-0'>
          <div className='flex items-baseline gap-3'>
            <span className='font-bold text-sm'>{selected.name}</span>
            <span className='text-xs font-mono text-black/40'>{selected.spectralType}</span>
            <span
              className='w-2 h-2 inline-block shrink-0'
              style={{ backgroundColor: CATEGORY_CONFIG[selected.category].color }}
            />
            <span className='text-xs text-black/40'>{CATEGORY_CONFIG[selected.category].label}</span>
          </div>
          <p className='text-sm text-black/60 mt-1 max-w-2xl'>{selected.description}</p>
          <div className='flex gap-4 mt-2 text-xs font-mono text-black/30'>
            <span>T = {selected.temperature.toLocaleString()} K</span>
            <span>L = {selected.luminosity.toLocaleString()} L&#x2609;</span>
          </div>
        </div>
      )}
    </div>
  );
}
