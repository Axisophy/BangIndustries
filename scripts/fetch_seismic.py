#!/usr/bin/env python3
"""
fetch_seismic.py — Download and process seismic data for Seismic Anatomy visualizer
Outputs: earth_model.json, ray_paths.json, travel_times.json, velocity_profile.json,
         stations.json, seismograms.json, event.json

Requires: pip install obspy numpy
"""

import json
import numpy as np
import os
from pathlib import Path

try:
    from obspy.clients.fdsn import Client
    from obspy import UTCDateTime
    from obspy.taup import TauPyModel
    from obspy.geodetics import locations2degrees
    HAS_OBSPY = True
except ImportError:
    HAS_OBSPY = False
    print("Warning: ObsPy not installed. Generating synthetic data instead.")

OUTPUT_DIR = Path("public/data/seismic")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ─── EVENT ────────────────────────────────────────────────
EVENT_TIME_STR = "2011-03-11T05:46:23"
EVENT_LAT = 38.297
EVENT_LON = 142.373
EVENT_DEPTH = 30.0  # km

# ─── EARTH MODEL (simplified PREM for rendering) ─────────
earth_model = {
    "radius_km": 6371,
    "layers": [
        {"name": "Inner Core", "r_inner": 0, "r_outer": 1221, "vp": 11.1, "vs": 3.6, "rho": 13.0, "color": "#FFD700"},
        {"name": "Outer Core", "r_inner": 1221, "r_outer": 3480, "vp": 9.5, "vs": 0, "rho": 11.0, "color": "#FF6B35"},
        {"name": "Lower Mantle", "r_inner": 3480, "r_outer": 5711, "vp": 12.0, "vs": 6.5, "rho": 4.8, "color": "#2D5016"},
        {"name": "Transition Zone", "r_inner": 5711, "r_outer": 5961, "vp": 9.7, "vs": 5.3, "rho": 3.7, "color": "#3A6B1E"},
        {"name": "Upper Mantle", "r_inner": 5961, "r_outer": 6346, "vp": 8.0, "vs": 4.5, "rho": 3.4, "color": "#4A8B2E"},
        {"name": "Crust", "r_inner": 6346, "r_outer": 6371, "vp": 6.5, "vs": 3.5, "rho": 2.8, "color": "#6B8E23"},
    ],
    "discontinuities": [
        {"name": "CMB", "depth_km": 2891, "radius_km": 3480},
        {"name": "ICB", "depth_km": 5150, "radius_km": 1221},
        {"name": "410", "depth_km": 410, "radius_km": 5961},
        {"name": "660", "depth_km": 660, "radius_km": 5711},
        {"name": "Moho", "depth_km": 24.4, "radius_km": 6346.6},
    ],
    "shadow_zones": {
        "s_wave": {"start_deg": 103, "end_deg": 180, "cause": "S-waves cannot travel through liquid outer core"},
        "p_wave": {"start_deg": 103, "end_deg": 142, "cause": "P-waves refract around liquid outer core"}
    }
}

# ─── EVENT DATA ───────────────────────────────────────────
event_data = {
    "name": "2011 Tohoku-Oki Earthquake",
    "time_utc": EVENT_TIME_STR,
    "latitude": EVENT_LAT,
    "longitude": EVENT_LON,
    "depth_km": EVENT_DEPTH,
    "magnitude": 9.1,
    "type": "Megathrust"
}

# ─── STATIONS (target list) ───────────────────────────────
target_stations = [
    ("IU", "MAJO", 5),    # Japan
    ("IU", "INCN", 12),   # South Korea
    ("IU", "TATO", 24),   # Taiwan
    ("IU", "GUMO", 25),   # Guam
    ("IU", "CTAO", 55),   # Australia
    ("IU", "NWAO", 72),   # Western Australia
    ("II", "BFO", 82),    # Germany
    ("IU", "KEV", 66),    # Finland
    ("IU", "KONO", 74),   # Norway
    ("IU", "HRV", 94),    # Harvard, USA
    ("IU", "ANMO", 88),   # New Mexico, USA
    ("IU", "TUC", 88),    # Tucson, USA
    ("IU", "CCM", 92),    # Missouri, USA
    ("IU", "WCI", 93),    # South Carolina, USA
    ("IU", "SSPA", 95),   # Pennsylvania, USA
    ("IU", "SJG", 120),   # Puerto Rico (shadow zone)
    ("IU", "BBSR", 110),  # Bermuda
    ("IU", "TSUM", 125),  # Namibia (shadow zone)
    ("IU", "RCBR", 145),  # Brazil (past shadow)
    ("IU", "SAML", 150),  # Brazil
    ("IU", "PAYG", 128),  # Galapagos
    ("IU", "SDV", 135),   # Venezuela
    ("IU", "LCO", 160),   # Chile
    ("IU", "PMSA", 155),  # Antarctica
]


def generate_synthetic_ray_path(distance_deg, phase, source_depth=30):
    """Generate synthetic ray path for visualization when ObsPy unavailable."""
    path = []
    num_points = 100

    earth_radius = 6371

    # Simplified ray geometry
    if phase.startswith('P') or phase.startswith('p'):
        base_velocity = 10.0  # km/s average
        wave_type = 'P'
    else:
        base_velocity = 5.7  # km/s average
        wave_type = 'S'

    # Check if phase goes through core
    goes_through_core = 'K' in phase or distance_deg > 100

    for i in range(num_points):
        frac = i / (num_points - 1)
        theta = frac * np.radians(distance_deg)

        # Simple curved ray path
        if goes_through_core and distance_deg > 100:
            # Ray goes deeper into core
            min_r = 0.3 if 'I' in phase else 0.55
            r = 1.0 - (1.0 - min_r) * np.sin(np.pi * frac)
        else:
            # Normal mantle ray
            max_depth = min(0.6, distance_deg / 180)
            r = 1.0 - max_depth * np.sin(np.pi * frac)

        # Time calculation (simplified)
        depth = (1 - r) * earth_radius
        avg_velocity = base_velocity * (1 + depth / earth_radius * 0.5)
        dt = (theta * earth_radius * r) / avg_velocity if i > 0 else 0
        t = sum([dt for _ in range(i)])

        path.append({
            "theta": round(float(theta), 6),
            "r": round(float(r), 6),
            "t": round(float(t + i * distance_deg * 0.5), 2)
        })

    return path


def generate_synthetic_seismogram(distance_deg, duration_s=7200, sample_rate=0.5):
    """Generate synthetic seismogram waveform."""
    num_samples = int(duration_s * sample_rate)
    data = np.zeros(num_samples)

    # Add noise floor
    data += np.random.randn(num_samples) * 0.02

    # P arrival time (approximate)
    p_time = distance_deg * 8  # ~8 seconds per degree
    p_sample = int(p_time * sample_rate)

    # S arrival time
    s_time = distance_deg * 14  # ~14 seconds per degree
    s_sample = int(s_time * sample_rate)

    # Check shadow zone
    in_shadow = 103 <= distance_deg <= 142

    if not in_shadow and p_sample < num_samples:
        # Add P wave arrival
        p_width = 50
        for i in range(min(p_width, num_samples - p_sample)):
            data[p_sample + i] += 0.8 * np.exp(-i / 20) * np.sin(i * 0.5)

    if distance_deg < 103 and s_sample < num_samples:
        # Add S wave arrival (only before shadow zone)
        s_width = 80
        for i in range(min(s_width, num_samples - s_sample)):
            data[s_sample + i] += 0.6 * np.exp(-i / 30) * np.sin(i * 0.3)

    if distance_deg > 142:
        # Add PKP arrival for stations beyond shadow
        pkp_time = distance_deg * 6 + 400
        pkp_sample = int(pkp_time * sample_rate)
        if pkp_sample < num_samples:
            pkp_width = 60
            for i in range(min(pkp_width, num_samples - pkp_sample)):
                data[pkp_sample + i] += 0.5 * np.exp(-i / 25) * np.sin(i * 0.4)

    # Normalize
    max_amp = np.max(np.abs(data))
    if max_amp > 0:
        data = data / max_amp

    return [round(float(d), 4) for d in data]


def compute_theoretical_arrivals(distance_deg, source_depth):
    """Compute theoretical phase arrivals."""
    arrivals = []

    # P wave (up to shadow zone)
    if distance_deg < 103:
        arrivals.append({"phase": "P", "time_s": round(distance_deg * 8, 2)})

    # S wave (up to shadow zone)
    if distance_deg < 103:
        arrivals.append({"phase": "S", "time_s": round(distance_deg * 14, 2)})

    # PcP reflection
    if 30 < distance_deg < 90:
        arrivals.append({"phase": "PcP", "time_s": round(500 + distance_deg * 2, 2)})

    # PP
    if distance_deg > 40:
        arrivals.append({"phase": "PP", "time_s": round(distance_deg * 10 + 100, 2)})

    # PKP (beyond shadow zone)
    if distance_deg > 142:
        arrivals.append({"phase": "PKP", "time_s": round(distance_deg * 6 + 400, 2)})

    # PKIKP (through inner core)
    if distance_deg > 150:
        arrivals.append({"phase": "PKIKP", "time_s": round(distance_deg * 5.5 + 450, 2)})

    return arrivals


def generate_velocity_profile():
    """Generate velocity profile from Earth model."""
    profile = []

    # Sample at 10 km intervals
    for depth in range(0, 6371, 10):
        radius = 6371 - depth

        # Find which layer this depth is in
        vp, vs = 6.5, 3.5  # default crust values

        for layer in earth_model["layers"]:
            if layer["r_inner"] <= radius <= layer["r_outer"]:
                vp = layer["vp"]
                vs = layer["vs"]
                break

        profile.append({
            "depth": depth,
            "vp": vp,
            "vs": vs
        })

    return profile


def main():
    print("Generating seismic data for Seismic Anatomy visualizer...")

    phases_to_compute = ["P", "S", "PcP", "ScS", "PP", "SS", "PKP", "PKIKP", "Pdiff"]

    ray_paths = []
    travel_times = {}
    stations_out = []
    seismograms = []

    if HAS_OBSPY:
        print("Using ObsPy to fetch real data from IRIS...")
        client = Client("IRIS")
        taup = TauPyModel(model="iasp91")
        EVENT_TIME = UTCDateTime(EVENT_TIME_STR)

        # Compute ray paths
        print("Computing ray paths...")
        for dist in range(5, 180, 5):
            for phase in phases_to_compute:
                try:
                    arrivals = taup.get_ray_paths(
                        source_depth_in_km=EVENT_DEPTH,
                        distance_in_degree=dist,
                        phase_list=[phase]
                    )
                    for arr in arrivals:
                        path_points = []
                        for pt in arr.path:
                            r = (6371 - pt['depth']) / 6371
                            theta = pt['dist']
                            path_points.append({
                                "theta": round(float(theta), 6),
                                "r": round(float(r), 6),
                                "t": round(float(pt['time']), 2)
                            })
                        ray_paths.append({
                            "phase": arr.name,
                            "distance_deg": dist,
                            "time_s": round(arr.time, 2),
                            "ray_param": round(arr.ray_param, 4),
                            "takeoff_angle": round(arr.takeoff_angle, 2),
                            "incident_angle": round(arr.incident_angle, 2),
                            "wave_type": "P" if arr.name[0] in "Pp" else "S",
                            "path": path_points
                        })
                except Exception:
                    pass

        # Compute travel time curves
        print("Computing travel time curves...")
        for phase in phases_to_compute:
            times = []
            for dist_x10 in range(0, 1800, 5):  # 0.0° to 180.0° in 0.5° steps
                dist = dist_x10 / 10.0
                try:
                    arrs = taup.get_travel_times(
                        source_depth_in_km=EVENT_DEPTH,
                        distance_in_degree=dist,
                        phase_list=[phase]
                    )
                    for a in arrs:
                        times.append({"d": round(dist, 1), "t": round(a.time, 1)})
                except:
                    pass
            if times:
                travel_times[phase] = times

        # Fetch seismograms
        print("Fetching seismograms (this may take a while)...")
        for net, sta, approx_dist in target_stations:
            try:
                inv = client.get_stations(
                    network=net, station=sta, channel="LHZ",
                    starttime=EVENT_TIME, endtime=EVENT_TIME + 3600,
                    level="response"
                )
                sta_coords = inv[0][0]
                dist_deg = locations2degrees(
                    EVENT_LAT, EVENT_LON,
                    sta_coords.latitude, sta_coords.longitude
                )

                st = client.get_waveforms(
                    net, sta, "*", "LHZ",
                    EVENT_TIME - 60,
                    EVENT_TIME + 2 * 3600,
                    attach_response=True
                )
                st.merge(fill_value=0)
                st.remove_response(output="VEL")
                st.filter('bandpass', freqmin=0.01, freqmax=0.1)
                st.detrend('demean')

                tr = st[0]

                arrivals = taup.get_travel_times(
                    source_depth_in_km=EVENT_DEPTH,
                    distance_in_degree=dist_deg,
                    phase_list=phases_to_compute
                )
                phase_arrivals = [{"phase": a.name, "time_s": round(a.time, 2)} for a in arrivals]

                data = tr.data[::2].tolist()
                max_amp = max(abs(np.array(data)))
                if max_amp > 0:
                    data = [round(d / max_amp, 4) for d in data]

                stations_out.append({
                    "network": net,
                    "station": sta,
                    "latitude": round(sta_coords.latitude, 3),
                    "longitude": round(sta_coords.longitude, 3),
                    "distance_deg": round(dist_deg, 2),
                    "in_p_shadow": 103 <= dist_deg <= 142,
                    "in_s_shadow": dist_deg >= 103,
                    "arrivals": phase_arrivals
                })

                seismograms.append({
                    "station": f"{net}.{sta}",
                    "distance_deg": round(dist_deg, 2),
                    "sample_rate": 0.5,
                    "start_time_offset_s": -60,
                    "data": data,
                    "arrivals": phase_arrivals
                })

                print(f"  ✓ {net}.{sta} at {dist_deg:.1f}°")
            except Exception as e:
                print(f"  ✗ {net}.{sta}: {e}")

    else:
        # Generate synthetic data
        print("Generating synthetic ray paths...")
        for dist in range(5, 180, 5):
            for phase in phases_to_compute:
                # Skip phases that don't exist at certain distances
                if phase == "S" and dist >= 103:
                    continue
                if phase == "PKP" and dist < 143:
                    continue
                if phase == "PKIKP" and dist < 150:
                    continue
                if phase == "Pdiff" and dist < 100:
                    continue

                path = generate_synthetic_ray_path(dist, phase, EVENT_DEPTH)
                ray_paths.append({
                    "phase": phase,
                    "distance_deg": dist,
                    "time_s": path[-1]["t"] if path else 0,
                    "ray_param": 5.0,
                    "takeoff_angle": 30.0,
                    "incident_angle": 30.0,
                    "wave_type": "P" if phase[0] in "Pp" else "S",
                    "path": path
                })

        print("Generating travel time curves...")
        for phase in phases_to_compute:
            times = []
            for dist in np.arange(0, 180, 0.5):
                arrivals = compute_theoretical_arrivals(dist, EVENT_DEPTH)
                for arr in arrivals:
                    if arr["phase"] == phase:
                        times.append({"d": round(dist, 1), "t": round(arr["time_s"], 1)})
            if times:
                travel_times[phase] = times

        print("Generating synthetic seismograms...")
        for net, sta, dist in target_stations:
            arrivals = compute_theoretical_arrivals(dist, EVENT_DEPTH)
            data = generate_synthetic_seismogram(dist)

            # Generate approximate station coordinates
            lat = EVENT_LAT + dist * 0.8 * np.cos(np.radians(dist * 2))
            lon = EVENT_LON + dist * 1.2 * np.sin(np.radians(dist * 2))

            stations_out.append({
                "network": net,
                "station": sta,
                "latitude": round(lat, 3),
                "longitude": round(lon, 3),
                "distance_deg": dist,
                "in_p_shadow": 103 <= dist <= 142,
                "in_s_shadow": dist >= 103,
                "arrivals": arrivals
            })

            seismograms.append({
                "station": f"{net}.{sta}",
                "distance_deg": dist,
                "sample_rate": 0.5,
                "start_time_offset_s": -60,
                "data": data,
                "arrivals": arrivals
            })
            print(f"  ✓ {net}.{sta} at {dist}°")

    # Generate velocity profile
    velocity_profile = generate_velocity_profile()

    # Export all data
    print("\nExporting data files...")

    with open(OUTPUT_DIR / "earth_model.json", "w") as f:
        json.dump(earth_model, f, indent=2)
    print(f"  ✓ earth_model.json")

    with open(OUTPUT_DIR / "ray_paths.json", "w") as f:
        json.dump(ray_paths, f)
    print(f"  ✓ ray_paths.json ({len(ray_paths)} paths)")

    with open(OUTPUT_DIR / "travel_times.json", "w") as f:
        json.dump(travel_times, f)
    print(f"  ✓ travel_times.json ({len(travel_times)} phases)")

    with open(OUTPUT_DIR / "velocity_profile.json", "w") as f:
        json.dump(velocity_profile, f)
    print(f"  ✓ velocity_profile.json")

    with open(OUTPUT_DIR / "stations.json", "w") as f:
        json.dump(stations_out, f, indent=2)
    print(f"  ✓ stations.json ({len(stations_out)} stations)")

    with open(OUTPUT_DIR / "seismograms.json", "w") as f:
        json.dump(seismograms, f)
    print(f"  ✓ seismograms.json ({len(seismograms)} traces)")

    with open(OUTPUT_DIR / "event.json", "w") as f:
        json.dump(event_data, f, indent=2)
    print(f"  ✓ event.json")

    print(f"\nDone! Output directory: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
