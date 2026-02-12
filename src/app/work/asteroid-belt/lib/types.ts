export interface Asteroid {
  a: number;          // Semi-major axis in AU
  e: number;          // Eccentricity (0 = circle, 1 = parabola)
  i: number;          // Inclination in degrees
  node: number;       // Longitude of ascending node in degrees
  peri: number;       // Argument of perihelion in degrees
  M: number;          // Mean anomaly at epoch in degrees
  x: number;          // Heliocentric x position in AU
  y: number;          // Heliocentric y position in AU
  class: OrbitClass;  // Orbit classification
  H: number;          // Absolute magnitude (brightness/size proxy)
}

export enum OrbitClass {
  MBA = 0,           // Main Belt Asteroid
  HUNGARIA = 1,      // Hungarias (inner edge, high inclination)
  PHOCAEA = 2,       // Phocaeas
  HILDA = 3,         // Hildas (3:2 resonance with Jupiter)
  TROJAN = 4,        // Jupiter Trojans (L4/L5 Lagrange points)
  NEO = 5,           // Near-Earth Object
  ATIRA = 6,         // Interior to Earth's orbit
  ATEN = 7,          // Earth-crossing, a < 1 AU
  APOLLO = 8,        // Earth-crossing, a > 1 AU
  AMOR = 9,          // Mars-crossing, approaching Earth
}

export interface Planet {
  name: string;
  a: number;         // Semi-major axis in AU
  x: number;         // Current x position
  y: number;         // Current y position
  color: [number, number, number, number];  // RGBA
}

export interface AsteroidData {
  count: number;
  epoch: string;
  description: string;
  planets: Record<string, { a: number; x: number; y: number }>;
  asteroids: Asteroid[];
}

export const KIRKWOOD_GAPS = [
  { a: 2.065, ratio: '4:1', strength: 'weak' as const, halfWidth: 0.015 },
  { a: 2.502, ratio: '3:1', strength: 'strong' as const, halfWidth: 0.02, note: 'Strongest gap — source of many near-Earth asteroids' },
  { a: 2.825, ratio: '5:2', strength: 'strong' as const, halfWidth: 0.015 },
  { a: 2.958, ratio: '7:3', strength: 'moderate' as const, halfWidth: 0.01 },
  { a: 3.279, ratio: '2:1', strength: 'strong' as const, halfWidth: 0.025, note: 'Outer edge of the main belt' },
];

export const PLANET_ORBITS: Planet[] = [
  { name: 'Mercury', a: 0.387, x: 0.35, y: 0.15, color: [0.5, 0.5, 0.5, 0.15] },
  { name: 'Venus', a: 0.723, x: -0.51, y: 0.52, color: [0.6, 0.5, 0.4, 0.15] },
  { name: 'Earth', a: 1.000, x: -0.17, y: 0.98, color: [0.3, 0.5, 0.8, 0.25] },
  { name: 'Mars', a: 1.524, x: 1.38, y: -0.64, color: [0.8, 0.4, 0.3, 0.20] },
  { name: 'Jupiter', a: 5.203, x: 4.95, y: 1.61, color: [0.7, 0.6, 0.5, 0.30] },
];
