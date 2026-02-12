import { Asteroid, AsteroidData, OrbitClass, KIRKWOOD_GAPS, PLANET_ORBITS } from './types';

/**
 * Box-Muller transform for Gaussian random numbers
 */
function gaussRandom(): number {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

/**
 * Check if a semi-major axis falls within a Kirkwood gap
 */
function isInGap(a: number): boolean {
  for (const gap of KIRKWOOD_GAPS) {
    if (Math.abs(a - gap.a) < gap.halfWidth) {
      return true;
    }
  }
  return false;
}

/**
 * Solve Kepler's equation M = E - e*sin(E) for eccentric anomaly E
 * Then compute true anomaly
 */
function solveKepler(M_deg: number, e: number): number {
  let E = M_deg * Math.PI / 180;
  // Newton-Raphson iteration
  for (let iter = 0; iter < 10; iter++) {
    const dE = (E - e * Math.sin(E) - M_deg * Math.PI / 180) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < 1e-8) break;
  }
  // True anomaly from eccentric anomaly
  const cosE = Math.cos(E);
  const sinE = Math.sin(E);
  const cosV = (cosE - e) / (1 - e * cosE);
  const sinV = Math.sqrt(1 - e * e) * sinE / (1 - e * cosE);
  return Math.atan2(sinV, cosV) * 180 / Math.PI;
}

/**
 * Generate mock asteroid data with realistic Kirkwood gaps
 */
export function generateMockAsteroids(count: number): Asteroid[] {
  const asteroids: Asteroid[] = [];

  for (let i = 0; i < count; i++) {
    let a: number, e: number, inc: number, orbitClass: OrbitClass;
    const roll = Math.random();

    if (roll < 0.85) {
      // Main Belt: a between 2.1 and 3.3 AU, with Kirkwood gaps
      let attempts = 0;
      do {
        a = 2.1 + Math.random() * 1.2;
        attempts++;
      } while (isInGap(a) && attempts < 100);

      e = Math.random() * 0.3;
      inc = Math.abs(gaussRandom() * 8);
      orbitClass = OrbitClass.MBA;

    } else if (roll < 0.90) {
      // Jupiter Trojans: a ≈ 5.2 AU, clustered at L4 and L5
      a = 5.15 + Math.random() * 0.1;
      e = Math.random() * 0.15;
      inc = Math.abs(gaussRandom() * 15);
      orbitClass = OrbitClass.TROJAN;

    } else if (roll < 0.93) {
      // Hildas: a ≈ 3.97 AU (3:2 resonance — they STAY in resonance)
      a = 3.90 + Math.random() * 0.15;
      e = Math.random() * 0.25;
      inc = Math.abs(gaussRandom() * 10);
      orbitClass = OrbitClass.HILDA;

    } else if (roll < 0.96) {
      // Hungarias: a ≈ 1.8-2.0 AU, high inclination
      a = 1.78 + Math.random() * 0.22;
      e = Math.random() * 0.15;
      inc = 16 + Math.random() * 10;
      orbitClass = OrbitClass.HUNGARIA;

    } else {
      // NEOs: a < 3.5, perihelion < 1.3 AU
      a = 0.5 + Math.random() * 2.5;
      e = 0.2 + Math.random() * 0.6;
      inc = Math.abs(gaussRandom() * 20);
      orbitClass = a < 1.0 ? OrbitClass.ATEN : OrbitClass.APOLLO;
    }

    // Orbital angles
    const node = Math.random() * 360;
    const peri = Math.random() * 360;
    const meanAnomaly = Math.random() * 360;

    // Compute true anomaly and radius
    const trueAnomaly = solveKepler(meanAnomaly, e);
    const r = a * (1 - e * e) / (1 + e * Math.cos(trueAnomaly * Math.PI / 180));

    // Position in orbital plane, then rotate to ecliptic
    const nodeRad = node * Math.PI / 180;
    const periRad = peri * Math.PI / 180;
    const incRad = inc * Math.PI / 180;
    const argRad = (peri + trueAnomaly) * Math.PI / 180;

    const cosNode = Math.cos(nodeRad);
    const sinNode = Math.sin(nodeRad);
    const cosArg = Math.cos(argRad);
    const sinArg = Math.sin(argRad);
    const cosInc = Math.cos(incRad);

    const x = r * (cosNode * cosArg - sinNode * sinArg * cosInc);
    const y = r * (sinNode * cosArg + cosNode * sinArg * cosInc);

    // Absolute magnitude (brightness/size)
    const H = 10 + Math.random() * 12;

    asteroids.push({
      a,
      e,
      i: inc,
      node,
      peri,
      M: meanAnomaly,
      x,
      y,
      class: orbitClass,
      H,
    });
  }

  return asteroids;
}

/**
 * Load asteroid data from JSON file or generate mock data
 */
export async function loadAsteroidData(count: number = 100000): Promise<AsteroidData> {
  try {
    const response = await fetch('/data/asteroid-belt.json');
    if (response.ok) {
      const data: AsteroidData = await response.json();
      return data;
    }
  } catch {
    // File doesn't exist or failed to load - use mock data
  }

  // Generate mock data
  const asteroids = generateMockAsteroids(count);

  // Convert planets to the expected format
  const planets: Record<string, { a: number; x: number; y: number }> = {};
  for (const planet of PLANET_ORBITS) {
    planets[planet.name.toLowerCase()] = { a: planet.a, x: planet.x, y: planet.y };
  }

  return {
    count: asteroids.length,
    epoch: '2025-01-01',
    description: 'Mock asteroid data with Kirkwood gaps',
    planets,
    asteroids,
  };
}

/**
 * Compute histogram positions for asteroids
 */
export function computeHistogramPositions(asteroids: Asteroid[]): Float32Array {
  const BIN_COUNT = 200;
  const A_MIN = 1.5;
  const A_MAX = 5.5;
  const BIN_WIDTH = (A_MAX - A_MIN) / BIN_COUNT;

  // First pass: count per bin and assign bins
  const binCounts = new Int32Array(BIN_COUNT);
  const binAssignment = new Int32Array(asteroids.length);

  for (let i = 0; i < asteroids.length; i++) {
    const bin = Math.floor((asteroids[i].a - A_MIN) / BIN_WIDTH);
    if (bin >= 0 && bin < BIN_COUNT) {
      binAssignment[i] = bin;
      binCounts[bin]++;
    } else {
      binAssignment[i] = -1; // Outside range
    }
  }

  // Find max bin count for normalisation
  let maxCount = 0;
  for (let b = 0; b < BIN_COUNT; b++) {
    if (binCounts[b] > maxCount) maxCount = binCounts[b];
  }

  // Second pass: assign histogram (x, y) positions
  const currentStack = new Int32Array(BIN_COUNT);
  const positions = new Float32Array(asteroids.length * 2);

  for (let i = 0; i < asteroids.length; i++) {
    const bin = binAssignment[i];
    if (bin < 0) {
      // Outside range — park off-screen
      positions[i * 2] = -2.0;
      positions[i * 2 + 1] = -2.0;
      continue;
    }

    // X: bin centre, mapped to NDC range
    const binCentreAU = A_MIN + (bin + 0.5) * BIN_WIDTH;
    const x = ((binCentreAU - A_MIN) / (A_MAX - A_MIN)) * 1.8 - 0.9;

    // Y: stack position within this bin
    const stackIdx = currentStack[bin]++;
    const y = -0.8 + (stackIdx / maxCount) * 1.5;

    // Add small random jitter
    positions[i * 2] = x + (Math.random() - 0.5) * 0.003;
    positions[i * 2 + 1] = y + (Math.random() - 0.5) * 0.002;
  }

  return positions;
}

/**
 * Prepare typed arrays for WebGL buffers
 */
export function prepareAsteroidBuffers(asteroids: Asteroid[]) {
  const count = asteroids.length;

  // Spatial positions
  const spatialPositions = new Float32Array(count * 2);
  // Semi-major axis (for colouring)
  const semiMajorAxes = new Float32Array(count);
  // Absolute magnitude (for sizing)
  const magnitudes = new Float32Array(count);
  // Orbit class
  const orbitClasses = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const asteroid = asteroids[i];
    spatialPositions[i * 2] = asteroid.x;
    spatialPositions[i * 2 + 1] = asteroid.y;
    semiMajorAxes[i] = asteroid.a;
    magnitudes[i] = asteroid.H;
    orbitClasses[i] = asteroid.class;
  }

  // Compute histogram positions
  const histogramPositions = computeHistogramPositions(asteroids);

  return {
    spatialPositions,
    histogramPositions,
    semiMajorAxes,
    magnitudes,
    orbitClasses,
    count,
  };
}
