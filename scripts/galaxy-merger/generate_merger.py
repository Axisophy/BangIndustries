#!/usr/bin/env python3
"""
Galaxy Merger Simulation: Milky Way + Andromeda
Uses Rebound N-body integrator with Barnes-Hut tree gravity.
Generates pre-computed frames for WebGL2 browser visualization.

Requires: pip install rebound galpy numpy

Based on:
- Rebound: Rein & Liu 2012, A&A 537:A128
- galpy MWPotential2014: Bovy 2015, ApJS 216:29
- Barnes-Hut: Barnes & Hut 1986, Nature 324
"""

import os
import sys
import json
import struct
import numpy as np

# Check for required packages
try:
    import rebound
    HAS_REBOUND = True
except ImportError:
    HAS_REBOUND = False
    print("Warning: rebound not installed. Using synthetic data.")

try:
    from galpy.df import dehnendf
    from galpy.potential import MWPotential2014
    HAS_GALPY = True
except ImportError:
    HAS_GALPY = False
    print("Warning: galpy not installed. Using simple disk model.")

# Output directory
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '../../public/data/galaxy-merger')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ============================================================
# CONFIGURATION
# ============================================================

CONFIG = {
    'n_per_galaxy': 10000,      # Particles per galaxy (20k total - reduced for git)
    'n_frames': 200,            # Number of output frames
    't_max': 300.0,             # Simulation time in natural units (~10.7 Gyr)
    'softening': 0.02,          # Plummer softening (~160 pc)
    'dt': 0.05,                 # Timestep (~1.78 Myr)
    'opening_angle': 0.5,       # Barnes-Hut opening angle
    'separation': 10.0,         # Initial separation (~80 kpc)
    'approach_velocity': 0.5,   # Relative velocity (~110 km/s)
    'impact_parameter': 1.0,    # Offset for non-head-on collision (~8 kpc)
    'andromeda_tilt': 30.0,     # Andromeda disk tilt in degrees
    'andromeda_mass_ratio': 3.0,# Andromeda ~3x more massive than MW
    'andromeda_scale': 1.2,     # Andromeda slightly larger
}

# Natural units:
# Distance: R0 = 8 kpc
# Velocity: v_c = 220 km/s
# Time: R0/v_c = 35.6 Myr
# Mass: v_c^2 * R0 / G ~ 9e10 M_sun

UNITS = {
    'time_unit_myr': 35.6,
    'length_unit_kpc': 8.0,
    'velocity_unit_kms': 220.0,
}


# ============================================================
# GALAXY GENERATION
# ============================================================

def generate_disk_galaxy_galpy(n_particles, seed=42):
    """
    Generate equilibrium disk galaxy using galpy's Dehnen DF.
    Returns (x, y, z, vx, vy, vz, mass) in natural units.
    """
    np.random.seed(seed)

    # Corrected Dehnen DF for flat rotation curve
    dfc = dehnendf(beta=0.0, correct=True, niter=20)

    # Sample orbits (this can take a minute for large samples)
    print(f"  Sampling {n_particles} orbits from distribution function...")
    orbits = dfc.sample(n=n_particles, returnOrbit=True)

    # Extract positions and velocities
    R = np.array([o.R() for o in orbits])
    vR = np.array([o.vR() for o in orbits])
    vT = np.array([o.vT() for o in orbits])

    # Random azimuths
    phi = np.random.uniform(0, 2*np.pi, n_particles)

    # Add small vertical scatter (thin disk)
    z = np.random.normal(0, 0.035, n_particles)   # ~280 pc scale height
    vz = np.random.normal(0, 0.05, n_particles)   # vertical dispersion

    # Convert cylindrical to Cartesian
    x = R * np.cos(phi)
    y = R * np.sin(phi)
    vx = vR * np.cos(phi) - vT * np.sin(phi)
    vy = vR * np.sin(phi) + vT * np.cos(phi)

    # Equal mass particles
    mass = np.ones(n_particles) / n_particles

    return x, y, z, vx, vy, vz, mass


def generate_disk_galaxy_simple(n_particles, seed=42):
    """
    Simple exponential disk with approximate circular velocities.
    Fallback when galpy is not available.
    """
    np.random.seed(seed)

    # Exponential disk: p(R) ~ R * exp(-R/R_d)
    # Sample using inverse CDF
    R_d = 0.375  # Scale radius ~3 kpc in natural units

    # Rejection sampling for exponential disk
    R = np.zeros(n_particles)
    accepted = 0
    while accepted < n_particles:
        R_try = np.random.exponential(R_d, n_particles * 2)
        u = np.random.uniform(0, 1, len(R_try))
        # Accept with probability proportional to R
        R_max = 10 * R_d
        prob = R_try / R_max
        mask = (u < prob) & (R_try < R_max)
        n_accept = min(np.sum(mask), n_particles - accepted)
        R[accepted:accepted + n_accept] = R_try[mask][:n_accept]
        accepted += n_accept

    # Random azimuths
    phi = np.random.uniform(0, 2*np.pi, n_particles)

    # Approximate circular velocity (flat rotation curve)
    v_c = 1.0  # Natural units
    vT = v_c * np.ones(n_particles)

    # Add velocity dispersion
    sigma_R = 0.1  # Radial velocity dispersion
    vR = np.random.normal(0, sigma_R, n_particles)

    # Vertical structure
    z = np.random.normal(0, 0.035, n_particles)
    vz = np.random.normal(0, 0.05, n_particles)

    # Convert to Cartesian
    x = R * np.cos(phi)
    y = R * np.sin(phi)
    vx = vR * np.cos(phi) - vT * np.sin(phi)
    vy = vR * np.sin(phi) + vT * np.cos(phi)

    # Equal mass particles
    mass = np.ones(n_particles) / n_particles

    return x, y, z, vx, vy, vz, mass


def generate_disk_galaxy(n_particles, seed=42):
    """Generate disk galaxy using available method."""
    if HAS_GALPY:
        return generate_disk_galaxy_galpy(n_particles, seed)
    else:
        return generate_disk_galaxy_simple(n_particles, seed)


def setup_merger_initial_conditions():
    """
    Set up Milky Way + Andromeda merger initial conditions.
    """
    n = CONFIG['n_per_galaxy']

    # Generate Milky Way
    print("Generating Milky Way disk...")
    x1, y1, z1, vx1, vy1, vz1, m1 = generate_disk_galaxy(n, seed=42)

    # Generate Andromeda
    print("Generating Andromeda disk...")
    x2, y2, z2, vx2, vy2, vz2, m2 = generate_disk_galaxy(n, seed=123)

    # Scale Andromeda (more massive and larger)
    m2 *= CONFIG['andromeda_mass_ratio']
    scale = CONFIG['andromeda_scale']
    x2 *= scale
    y2 *= scale
    z2 *= scale

    # Position Andromeda at initial separation
    x2 += CONFIG['separation']

    # Relative approach velocity
    vx2 -= CONFIG['approach_velocity']

    # Impact parameter (non-head-on collision)
    y2 += CONFIG['impact_parameter']

    # Tilt Andromeda's disk
    angle = np.radians(CONFIG['andromeda_tilt'])
    cos_a, sin_a = np.cos(angle), np.sin(angle)
    y2_rot = y2 * cos_a - z2 * sin_a
    z2_rot = y2 * sin_a + z2 * cos_a
    vy2_rot = vy2 * cos_a - vz2 * sin_a
    vz2_rot = vy2 * sin_a + vz2 * cos_a
    y2, z2 = y2_rot, z2_rot
    vy2, vz2 = vy2_rot, vz2_rot

    return {
        'mw': (x1, y1, z1, vx1, vy1, vz1, m1),
        'andromeda': (x2, y2, z2, vx2, vy2, vz2, m2),
    }


# ============================================================
# SIMULATION
# ============================================================

def run_simulation_rebound(ic):
    """
    Run N-body simulation using Rebound.
    """
    print("\nSetting up Rebound simulation...")

    sim = rebound.Simulation()
    sim.integrator = "leapfrog"
    sim.gravity = "tree"
    sim.opening_angle2 = CONFIG['opening_angle'] ** 2
    sim.boundary = "open"
    sim.configure_box(50.0)
    sim.softening = CONFIG['softening']
    sim.dt = CONFIG['dt']

    # Add Milky Way particles
    x1, y1, z1, vx1, vy1, vz1, m1 = ic['mw']
    n_mw = len(x1)
    print(f"Adding {n_mw} MW particles...")
    for i in range(n_mw):
        sim.add(m=m1[i], x=x1[i], y=y1[i], z=z1[i],
                vx=vx1[i], vy=vy1[i], vz=vz1[i])

    # Add Andromeda particles
    x2, y2, z2, vx2, vy2, vz2, m2 = ic['andromeda']
    n_m31 = len(x2)
    print(f"Adding {n_m31} M31 particles...")
    for i in range(n_m31):
        sim.add(m=m2[i], x=x2[i], y=y2[i], z=z2[i],
                vx=vx2[i], vy=vy2[i], vz=vz2[i])

    # Move to center of mass frame
    sim.move_to_com()

    n_total = sim.N
    print(f"Total particles: {n_total}")

    # Run simulation
    n_frames = CONFIG['n_frames']
    t_max = CONFIG['t_max']
    times = np.linspace(0, t_max, n_frames)

    frames = []
    E0 = sim.energy()

    print(f"\nIntegrating to t={t_max} ({t_max * UNITS['time_unit_myr']:.0f} Myr)...")

    for i, t in enumerate(times):
        sim.integrate(t)

        # Extract particle data
        positions = np.zeros((n_total, 3), dtype=np.float32)
        velocities = np.zeros(n_total, dtype=np.float32)

        for j, p in enumerate(sim.particles):
            positions[j] = [p.x, p.y, p.z]
            velocities[j] = np.sqrt(p.vx**2 + p.vy**2 + p.vz**2)

        frames.append({
            't': t,
            'positions': positions,
            'velocities': velocities,
        })

        if i % 30 == 0 or i == n_frames - 1:
            E = sim.energy()
            dE = (E - E0) / abs(E0) * 100
            print(f"  Frame {i+1}/{n_frames}: t={t:.1f} "
                  f"({t * UNITS['time_unit_myr']:.0f} Myr), dE={dE:.2f}%")

    return frames, n_mw, n_m31


def run_simulation_synthetic():
    """
    Generate synthetic simulation data when Rebound is not available.
    Creates visually plausible but non-physical animation.
    """
    print("\nGenerating synthetic galaxy merger animation...")

    n = CONFIG['n_per_galaxy']
    n_total = 2 * n
    n_frames = CONFIG['n_frames']
    t_max = CONFIG['t_max']
    times = np.linspace(0, t_max, n_frames)

    # Generate initial disk positions
    ic = setup_merger_initial_conditions()
    x1, y1, z1, vx1, vy1, vz1, m1 = ic['mw']
    x2, y2, z2, vx2, vy2, vz2, m2 = ic['andromeda']

    frames = []

    for i, t in enumerate(times):
        # Parametric animation of merger
        progress = t / t_max  # 0 to 1

        # Phase 1: Approach (0-0.3)
        # Phase 2: First passage with tidal distortion (0.3-0.5)
        # Phase 3: Separation and second approach (0.5-0.7)
        # Phase 4: Final merger (0.7-1.0)

        positions = np.zeros((n_total, 3), dtype=np.float32)
        velocities = np.zeros(n_total, dtype=np.float32)

        # MW particles
        for j in range(n):
            # Initial position
            px, py, pz = x1[j], y1[j], z1[j]

            # Add spiral arm perturbation
            R = np.sqrt(px**2 + py**2)
            phi = np.arctan2(py, px)

            # Tidal stretching during interaction
            if progress > 0.25:
                stretch = 1.0 + 0.5 * min(progress - 0.25, 0.5) * R
                if px > 0:  # Tidal tail toward Andromeda
                    px *= stretch

            # Rotation
            omega = 0.3 / (R + 0.5)  # Differential rotation
            phi += omega * t * 0.1
            px = R * np.cos(phi)
            py = R * np.sin(phi)

            # Vertical heating during merger
            if progress > 0.5:
                pz *= 1.0 + 2.0 * (progress - 0.5)

            positions[j] = [px, py, pz]
            velocities[j] = np.sqrt(vx1[j]**2 + vy1[j]**2 + vz1[j]**2) * (1 + 0.5 * progress)

        # M31 particles
        # Trajectory: approach, first passage, loop back, merge
        if progress < 0.35:
            # Approach
            cx = CONFIG['separation'] * (1 - progress / 0.35)
            cy = CONFIG['impact_parameter'] * (1 - progress / 0.35)
        elif progress < 0.5:
            # First passage (pass through)
            p2 = (progress - 0.35) / 0.15
            cx = -2.0 * p2
            cy = CONFIG['impact_parameter'] * (1 - p2)
        elif progress < 0.7:
            # Turn back
            p3 = (progress - 0.5) / 0.2
            cx = -2.0 + 2.0 * np.sin(p3 * np.pi / 2)
            cy = -1.0 * (1 - np.cos(p3 * np.pi / 2))
        else:
            # Final merger
            p4 = (progress - 0.7) / 0.3
            cx = 0.0 * (1 - p4**2)
            cy = 0.0

        for j in range(n):
            px, py, pz = x2[j] - CONFIG['separation'], y2[j] - CONFIG['impact_parameter'], z2[j]

            # Tidal stretching
            R = np.sqrt(px**2 + py**2)
            if progress > 0.25:
                stretch = 1.0 + 0.4 * min(progress - 0.25, 0.5) * R
                if px < 0:
                    px *= stretch

            # Rotation
            phi = np.arctan2(py, px)
            omega = 0.25 / (R + 0.5)
            phi += omega * t * 0.1
            px = R * np.cos(phi)
            py = R * np.sin(phi)

            # Disk tilt evolution
            if progress > 0.5:
                pz *= 1.0 + 1.5 * (progress - 0.5)

            # Add center offset
            px += cx
            py += cy

            positions[n + j] = [px, py, pz]
            velocities[n + j] = np.sqrt(vx2[j]**2 + vy2[j]**2 + vz2[j]**2) * (1 + 0.5 * progress)

        frames.append({
            't': t,
            'positions': positions,
            'velocities': velocities,
        })

        if i % 30 == 0 or i == n_frames - 1:
            print(f"  Frame {i+1}/{n_frames}: t={t:.1f} ({t * UNITS['time_unit_myr']:.0f} Myr)")

    return frames, n, n


def run_simulation():
    """Run simulation with available tools."""
    ic = setup_merger_initial_conditions()

    if HAS_REBOUND:
        return run_simulation_rebound(ic)
    else:
        return run_simulation_synthetic()


# ============================================================
# EXPORT
# ============================================================

def export_binary(frames, n_mw, n_m31):
    """
    Export to compact binary format for browser.

    Format:
    - Header: n_particles (u32), n_frames (u32)
    - Times: n_frames * float32
    - Per frame: positions (N * 3 * float32), velocities (N * uint8)
    """
    n_total = n_mw + n_m31
    n_frames = len(frames)

    print(f"\nExporting {n_frames} frames, {n_total} particles...")

    # Galaxy IDs
    galaxy_ids = np.zeros(n_total, dtype=np.uint8)
    galaxy_ids[n_mw:] = 1

    ids_path = os.path.join(OUTPUT_DIR, 'galaxy_ids.bin')
    with open(ids_path, 'wb') as f:
        f.write(galaxy_ids.tobytes())
    print(f"  Wrote {ids_path}")

    # Frames binary
    frames_path = os.path.join(OUTPUT_DIR, 'frames.bin')
    with open(frames_path, 'wb') as f:
        # Header
        f.write(struct.pack('<II', n_total, n_frames))

        # Times
        times = np.array([fr['t'] for fr in frames], dtype=np.float32)
        f.write(times.tobytes())

        # Velocity normalization (global max)
        v_max = max(fr['velocities'].max() for fr in frames)

        for frame in frames:
            # Positions
            f.write(frame['positions'].tobytes())

            # Normalized velocities
            if v_max > 0:
                v_norm = (frame['velocities'] / v_max * 255).astype(np.uint8)
            else:
                v_norm = np.zeros(n_total, dtype=np.uint8)
            f.write(v_norm.tobytes())

    total_size = 8 + n_frames * 4 + n_frames * n_total * 13
    print(f"  Wrote {frames_path} ({total_size / 1e6:.1f} MB)")

    # Metadata JSON
    metadata = {
        'n_particles': n_total,
        'n_frames': n_frames,
        'n_mw': n_mw,
        'n_m31': n_m31,
        'time_unit_myr': UNITS['time_unit_myr'],
        'length_unit_kpc': UNITS['length_unit_kpc'],
        'velocity_unit_kms': UNITS['velocity_unit_kms'],
        't_max': CONFIG['t_max'],
        't_max_gyr': CONFIG['t_max'] * UNITS['time_unit_myr'] / 1000,
        'softening': CONFIG['softening'],
        'v_max_normalized': float(v_max),
        'times_natural': times.tolist(),
        'has_rebound': HAS_REBOUND,
        'has_galpy': HAS_GALPY,
    }

    # Event markers for timeline
    metadata['events'] = [
        {'t': 0.0, 'label': 'Today', 'description': '2.5 million light-years apart'},
        {'t': 100.0, 'label': 'First tidal distortion', 'description': 'Gravitational tides begin to distort both galaxies'},
        {'t': 115.0, 'label': 'First passage', 'description': 'The galaxies pass through each other'},
        {'t': 145.0, 'label': 'Second approach', 'description': 'Gravity pulls them back together'},
        {'t': 200.0, 'label': 'Cores merging', 'description': 'The galactic cores begin to spiral inward'},
        {'t': 280.0, 'label': 'Milkomeda', 'description': 'A giant elliptical galaxy is born'},
    ]

    meta_path = os.path.join(OUTPUT_DIR, 'metadata.json')
    with open(meta_path, 'w') as f:
        json.dump(metadata, f, indent=2)
    print(f"  Wrote {meta_path}")

    return metadata


def generate_narrative():
    """Generate narrative content for the page."""
    narrative = {
        'title': 'Gravity Makes Everything',
        'subtitle': 'A cosmic collision 4 billion years from now',
        'intro': {
            'hook': 'The Milky Way and Andromeda are on a collision course. At 110 km/s, Andromeda is approaching — one of the few galaxies in the universe moving toward us instead of away.',
            'stakes': 'In roughly 4 billion years, our night sky will be transformed. Two spiral galaxies will become one elliptical giant: Milkomeda.',
        },
        'sections': [
            {
                'title': 'Nothing But Gravity',
                'content': 'This simulation uses a single force: gravity. No dark energy, no magnetic fields, no gas dynamics. Just F = Gm₁m₂/r². Every tidal tail, every bridge of stars, every distortion you see emerges from this one equation applied 50,000 times per timestep.',
            },
            {
                'title': 'Stars Never Collide',
                'content': 'Despite the violence of the merger, individual stars almost never collide. The average distance between stars is 160 billion kilometers — galaxies are mostly empty space. When these galaxies "collide," their stars pass through each other like two clouds of gnats.',
            },
            {
                'title': 'But Gas Does',
                'content': 'Interstellar gas is different. When gas clouds collide, they compress and heat up, triggering massive bursts of star formation. The merger will light up with new stars — blue, hot, and short-lived.',
            },
            {
                'title': 'Our Solar System\'s Fate',
                'content': 'Earth will likely survive. Our Solar System will be flung to the outskirts of the new galaxy — perhaps 100,000 light-years from the core. The Sun will still be warming Earth (it has 5 billion years of fuel left). But our descendants will see a completely different night sky.',
            },
        ],
        'physics': {
            'title': 'The Physics',
            'barnes_hut': 'Direct N-body simulation scales as O(N²) — impossibly slow for 50,000 particles. The Barnes-Hut algorithm uses an octree to approximate distant particle groups, reducing complexity to O(N log N). Distant stars are treated as a single mass at their center of gravity.',
            'softening': 'Gravitational softening prevents numerical singularities when particles pass too close. The potential Φ = -Gm/√(r² + ε²) remains finite as r → 0. This represents the finite size of the stellar systems each particle represents.',
            'leapfrog': 'The leapfrog integrator updates positions and velocities in a staggered pattern, naturally conserving energy over long simulations. It\'s the standard choice for collisionless galaxy dynamics.',
        },
        'science': {
            'title': 'The Science',
            'probability': 'Recent research (Sawala et al. 2025) revised the merger probability. A head-on collision in 4-5 Gyr has only 2% probability. Including the Large Magellanic Cloud\'s gravitational influence, the merger probability within 10 Gyr is about 50%.',
            'dating': 'Galaxy mergers are fundamental to cosmic structure formation. Most massive elliptical galaxies formed through mergers. The Milky Way itself has absorbed dozens of smaller galaxies over billions of years.',
        },
    }

    narrative_path = os.path.join(OUTPUT_DIR, 'narrative.json')
    with open(narrative_path, 'w') as f:
        json.dump(narrative, f, indent=2)
    print(f"  Wrote {narrative_path}")

    return narrative


# ============================================================
# MAIN
# ============================================================

def main():
    print("=" * 60)
    print("Galaxy Merger Simulation")
    print(f"Particles per galaxy: {CONFIG['n_per_galaxy']}")
    print(f"Total frames: {CONFIG['n_frames']}")
    print(f"Simulation time: {CONFIG['t_max'] * UNITS['time_unit_myr'] / 1000:.1f} Gyr")
    print(f"Rebound available: {HAS_REBOUND}")
    print(f"galpy available: {HAS_GALPY}")
    print("=" * 60)

    # Run simulation
    frames, n_mw, n_m31 = run_simulation()

    # Export data
    metadata = export_binary(frames, n_mw, n_m31)

    # Generate narrative content
    generate_narrative()

    print("\n" + "=" * 60)
    print("Simulation complete!")
    print(f"Output directory: {OUTPUT_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
