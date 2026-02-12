#!/usr/bin/env python3
"""
Radioactive Decay Chains — Data Preprocessing
Generates JSON data files for the U-238 → Pb-206 decay chain visualization.

Uses radioactivedecay package if available, otherwise generates from embedded data.
"""

import json
import math
import os
from pathlib import Path

# Output directory
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "data" / "decay-chain"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Try to import radioactivedecay
try:
    import radioactivedecay as rd
    HAS_RD = True
    print("Using radioactivedecay package")
except ImportError:
    HAS_RD = False
    print("radioactivedecay not installed, using embedded data")

# Try numpy for inventory evolution
try:
    import numpy as np
    HAS_NUMPY = True
except ImportError:
    HAS_NUMPY = False
    print("numpy not installed, using basic math")


# ============================================================
# EMBEDDED CHAIN DATA (verified against ICRP-107)
# ============================================================

CHAIN_DATA = [
    {
        "step": 0,
        "isotope": "U-238",
        "element": "Uranium",
        "symbol": "U",
        "Z": 92,
        "A": 238,
        "N": 146,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 1.4099e17,  # 4.468 By
        "half_life_readable": "4.468 By",
        "log10_half_life": 17.15,
        "decay_mode": "α",
        "decay_type": "alpha",
        "daughter": "Th-234",
        "delta_Z": -2,
        "delta_N": -2,
        "q_value_keV": 4269.9,
        "alpha_energy_keV": 4198,
        "branching_fraction": 1.0,
    },
    {
        "step": 1,
        "isotope": "Th-234",
        "element": "Thorium",
        "symbol": "Th",
        "Z": 90,
        "A": 234,
        "N": 144,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 2.082e6,  # 24.10 d
        "half_life_readable": "24.10 d",
        "log10_half_life": 6.32,
        "decay_mode": "β⁻",
        "decay_type": "beta_minus",
        "daughter": "Pa-234m",
        "delta_Z": 1,
        "delta_N": -1,
        "q_value_keV": 274.1,
        "branching_fraction": 1.0,
    },
    {
        "step": 2,
        "isotope": "Pa-234m",
        "element": "Protactinium",
        "symbol": "Pa",
        "Z": 91,
        "A": 234,
        "N": 143,
        "is_metastable": True,
        "is_stable": False,
        "half_life_seconds": 70.2,  # 1.17 m
        "half_life_readable": "1.17 m",
        "log10_half_life": 1.85,
        "decay_mode": "β⁻",
        "decay_type": "beta_minus",
        "daughter": "U-234",
        "delta_Z": 1,
        "delta_N": -1,
        "q_value_keV": 2193.9,
        "branching_fraction": 0.9984,
    },
    {
        "step": 3,
        "isotope": "U-234",
        "element": "Uranium",
        "symbol": "U",
        "Z": 92,
        "A": 234,
        "N": 142,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 7.747e12,  # 245.5 ky
        "half_life_readable": "245.5 ky",
        "log10_half_life": 12.89,
        "decay_mode": "α",
        "decay_type": "alpha",
        "daughter": "Th-230",
        "delta_Z": -2,
        "delta_N": -2,
        "q_value_keV": 4857.5,
        "alpha_energy_keV": 4775,
        "branching_fraction": 1.0,
    },
    {
        "step": 4,
        "isotope": "Th-230",
        "element": "Thorium",
        "symbol": "Th",
        "Z": 90,
        "A": 230,
        "N": 140,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 2.379e12,  # 75.38 ky
        "half_life_readable": "75.38 ky",
        "log10_half_life": 12.38,
        "decay_mode": "α",
        "decay_type": "alpha",
        "daughter": "Ra-226",
        "delta_Z": -2,
        "delta_N": -2,
        "q_value_keV": 4770.0,
        "alpha_energy_keV": 4687,
        "branching_fraction": 1.0,
    },
    {
        "step": 5,
        "isotope": "Ra-226",
        "element": "Radium",
        "symbol": "Ra",
        "Z": 88,
        "A": 226,
        "N": 138,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 5.049e10,  # 1600 y
        "half_life_readable": "1600 y",
        "log10_half_life": 10.70,
        "decay_mode": "α",
        "decay_type": "alpha",
        "daughter": "Rn-222",
        "delta_Z": -2,
        "delta_N": -2,
        "q_value_keV": 4870.7,
        "alpha_energy_keV": 4784,
        "branching_fraction": 1.0,
    },
    {
        "step": 6,
        "isotope": "Rn-222",
        "element": "Radon",
        "symbol": "Rn",
        "Z": 86,
        "A": 222,
        "N": 136,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 3.302e5,  # 3.823 d
        "half_life_readable": "3.823 d",
        "log10_half_life": 5.52,
        "decay_mode": "α",
        "decay_type": "alpha",
        "daughter": "Po-218",
        "delta_Z": -2,
        "delta_N": -2,
        "q_value_keV": 5590.4,
        "alpha_energy_keV": 5489,
        "branching_fraction": 1.0,
    },
    {
        "step": 7,
        "isotope": "Po-218",
        "element": "Polonium",
        "symbol": "Po",
        "Z": 84,
        "A": 218,
        "N": 134,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 186.0,  # 3.10 m
        "half_life_readable": "3.10 m",
        "log10_half_life": 2.27,
        "decay_mode": "α",
        "decay_type": "alpha",
        "daughter": "Pb-214",
        "delta_Z": -2,
        "delta_N": -2,
        "q_value_keV": 6114.8,
        "alpha_energy_keV": 6003,
        "branching_fraction": 0.9998,
    },
    {
        "step": 8,
        "isotope": "Pb-214",
        "element": "Lead",
        "symbol": "Pb",
        "Z": 82,
        "A": 214,
        "N": 132,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 1608.0,  # 26.8 m
        "half_life_readable": "26.8 m",
        "log10_half_life": 3.21,
        "decay_mode": "β⁻",
        "decay_type": "beta_minus",
        "daughter": "Bi-214",
        "delta_Z": 1,
        "delta_N": -1,
        "q_value_keV": 1017.8,
        "branching_fraction": 1.0,
    },
    {
        "step": 9,
        "isotope": "Bi-214",
        "element": "Bismuth",
        "symbol": "Bi",
        "Z": 83,
        "A": 214,
        "N": 131,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 1194.0,  # 19.9 m
        "half_life_readable": "19.9 m",
        "log10_half_life": 3.08,
        "decay_mode": "β⁻",
        "decay_type": "beta_minus",
        "daughter": "Po-214",
        "delta_Z": 1,
        "delta_N": -1,
        "q_value_keV": 3269.2,
        "branching_fraction": 0.99979,
    },
    {
        "step": 10,
        "isotope": "Po-214",
        "element": "Polonium",
        "symbol": "Po",
        "Z": 84,
        "A": 214,
        "N": 130,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 1.64e-4,  # 164 μs
        "half_life_readable": "164 μs",
        "log10_half_life": -3.78,
        "decay_mode": "α",
        "decay_type": "alpha",
        "daughter": "Pb-210",
        "delta_Z": -2,
        "delta_N": -2,
        "q_value_keV": 7833.5,
        "alpha_energy_keV": 7687,
        "branching_fraction": 1.0,
    },
    {
        "step": 11,
        "isotope": "Pb-210",
        "element": "Lead",
        "symbol": "Pb",
        "Z": 82,
        "A": 210,
        "N": 128,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 7.003e8,  # 22.20 y
        "half_life_readable": "22.20 y",
        "log10_half_life": 8.85,
        "decay_mode": "β⁻",
        "decay_type": "beta_minus",
        "daughter": "Bi-210",
        "delta_Z": 1,
        "delta_N": -1,
        "q_value_keV": 63.5,
        "branching_fraction": 1.0,
    },
    {
        "step": 12,
        "isotope": "Bi-210",
        "element": "Bismuth",
        "symbol": "Bi",
        "Z": 83,
        "A": 210,
        "N": 127,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 4.331e5,  # 5.013 d
        "half_life_readable": "5.013 d",
        "log10_half_life": 5.64,
        "decay_mode": "β⁻",
        "decay_type": "beta_minus",
        "daughter": "Po-210",
        "delta_Z": 1,
        "delta_N": -1,
        "q_value_keV": 1161.2,
        "branching_fraction": 1.0,
    },
    {
        "step": 13,
        "isotope": "Po-210",
        "element": "Polonium",
        "symbol": "Po",
        "Z": 84,
        "A": 210,
        "N": 126,
        "is_metastable": False,
        "is_stable": False,
        "half_life_seconds": 1.196e7,  # 138.4 d
        "half_life_readable": "138.4 d",
        "log10_half_life": 7.08,
        "decay_mode": "α",
        "decay_type": "alpha",
        "daughter": "Pb-206",
        "delta_Z": -2,
        "delta_N": -2,
        "q_value_keV": 5407.5,
        "alpha_energy_keV": 5304,
        "branching_fraction": 1.0,
    },
    {
        "step": 14,
        "isotope": "Pb-206",
        "element": "Lead",
        "symbol": "Pb",
        "Z": 82,
        "A": 206,
        "N": 124,
        "is_metastable": False,
        "is_stable": True,
        "half_life_seconds": None,
        "half_life_readable": "stable",
        "log10_half_life": None,
        "decay_mode": None,
        "decay_type": None,
        "daughter": None,
    },
]

# Geiger-Nuttall data for alpha emitters
GEIGER_NUTTALL_DATA = [
    {"isotope": "U-238", "alpha_energy_keV": 4198, "log10_half_life": 17.15},
    {"isotope": "U-234", "alpha_energy_keV": 4775, "log10_half_life": 12.89},
    {"isotope": "Th-230", "alpha_energy_keV": 4687, "log10_half_life": 12.38},
    {"isotope": "Ra-226", "alpha_energy_keV": 4784, "log10_half_life": 10.70},
    {"isotope": "Rn-222", "alpha_energy_keV": 5489, "log10_half_life": 5.52},
    {"isotope": "Po-218", "alpha_energy_keV": 6003, "log10_half_life": 2.27},
    {"isotope": "Po-214", "alpha_energy_keV": 7687, "log10_half_life": -3.78},
    {"isotope": "Po-210", "alpha_energy_keV": 5304, "log10_half_life": 7.08},
]

# Human-scale time comparisons
TIME_COMPARISONS = [
    {"isotope": "Po-214", "comparison": "Light travels 49 km"},
    {"isotope": "Pa-234m", "comparison": "Microwave a meal"},
    {"isotope": "Po-218", "comparison": "Boil an egg"},
    {"isotope": "Bi-214", "comparison": "A short TV episode"},
    {"isotope": "Pb-214", "comparison": "A commute"},
    {"isotope": "Rn-222", "comparison": "A long weekend"},
    {"isotope": "Bi-210", "comparison": "A work week"},
    {"isotope": "Th-234", "comparison": "Almost a month"},
    {"isotope": "Po-210", "comparison": "About 4.5 months"},
    {"isotope": "Pb-210", "comparison": "A generation"},
    {"isotope": "Ra-226", "comparison": "Roman Empire to now"},
    {"isotope": "Th-230", "comparison": "Since humans entered Europe"},
    {"isotope": "U-234", "comparison": "Since anatomically modern humans"},
    {"isotope": "U-238", "comparison": "Age of the Earth"},
]


def compute_inventory_evolution():
    """
    Compute isotope inventories at logarithmically-spaced time points.
    Uses Bateman equations for chain decay.
    """
    print("Computing inventory evolution...")

    # Get decay constants (λ = ln(2) / t½)
    isotopes = [d["isotope"] for d in CHAIN_DATA]
    half_lives = []
    for d in CHAIN_DATA:
        if d["half_life_seconds"] is not None:
            half_lives.append(d["half_life_seconds"])
        else:
            half_lives.append(float("inf"))  # stable

    decay_constants = [math.log(2) / hl if hl != float("inf") else 0 for hl in half_lives]

    # Log-spaced time points from 10^-5 s to 10^18 s (500 points)
    if HAS_NUMPY:
        log_times = np.linspace(-5, 18, 500)
    else:
        log_times = [-5 + i * 23 / 499 for i in range(500)]

    snapshots = []

    for log_t in log_times:
        t = 10 ** log_t

        # Simple Bateman calculation for serial decay chain
        # N_i(t) = N_1(0) * λ_1 * λ_2 * ... * λ_{i-1} * Σ(exp(-λ_j*t) / Π(λ_k - λ_j))
        # For simplicity, we use a numerical approach

        activities = {}

        # Start with 1 Bq of U-238
        N = [0.0] * len(isotopes)
        N[0] = 1.0 / decay_constants[0] if decay_constants[0] > 0 else 1.0

        # Numerical integration with small steps
        # For long time spans, we need to be clever about step sizes
        dt_total = t
        if dt_total < 1e-3:
            steps = 100
        elif dt_total < 1:
            steps = 200
        elif dt_total < 1e6:
            steps = 500
        else:
            steps = 1000

        dt = dt_total / steps

        for _ in range(steps):
            dN = [0.0] * len(isotopes)

            for i in range(len(isotopes)):
                # Decay out
                if decay_constants[i] > 0:
                    decay_out = decay_constants[i] * N[i] * dt
                    dN[i] -= decay_out

                    # Decay into next (if not last)
                    if i < len(isotopes) - 1:
                        dN[i + 1] += decay_out

            for i in range(len(isotopes)):
                N[i] = max(0, N[i] + dN[i])

        # Calculate activities (A = λN)
        for i, iso in enumerate(isotopes):
            if decay_constants[i] > 0:
                activity = decay_constants[i] * N[i]
                if activity > 1e-35:
                    activities[iso] = activity
            elif N[i] > 1e-35:
                # Stable isotope - store number
                activities[iso] = N[i]

        snapshots.append({
            "time_seconds": t,
            "log10_time": log_t,
            "isotopes": activities,
        })

    return snapshots


def compute_inventory_with_rd():
    """Use radioactivedecay package for high-precision inventory evolution."""
    print("Computing inventory evolution with radioactivedecay (high precision)...")

    try:
        inv = rd.InventoryHP({"U-238": 1.0})  # 1 Bq initial
    except:
        inv = rd.Inventory({"U-238": 1.0})

    if HAS_NUMPY:
        log_times = np.linspace(-5, 18, 500)
    else:
        log_times = [-5 + i * 23 / 499 for i in range(500)]

    isotopes = [d["isotope"] for d in CHAIN_DATA]
    snapshots = []

    for log_t in log_times:
        t = 10 ** log_t

        try:
            decayed = inv.decay(float(t), "s")
            activities = decayed.activities()

            snapshot = {
                "time_seconds": float(t),
                "log10_time": float(log_t),
                "isotopes": {},
            }

            for iso in isotopes:
                # Handle metastable notation
                iso_rd = iso.replace("-", "")
                if iso_rd in activities and activities[iso_rd] > 1e-35:
                    snapshot["isotopes"][iso] = float(activities[iso_rd])
                elif iso in activities and activities[iso] > 1e-35:
                    snapshot["isotopes"][iso] = float(activities[iso])

            # Pb-206 accumulation estimate
            u238_remaining = snapshot["isotopes"].get("U-238", 0)
            if u238_remaining < 1:
                pb206 = 1.0 - u238_remaining
                if pb206 > 1e-35:
                    snapshot["isotopes"]["Pb-206"] = pb206

            snapshots.append(snapshot)

        except Exception as e:
            print(f"Warning at t={t:.2e}s: {e}")
            continue

    return snapshots


def compute_colour_map():
    """Map half-lives to OKLCh colours."""
    print("Computing colour map...")

    LOG_MIN = -3.78  # Po-214
    LOG_MAX = 17.15  # U-238
    LOG_RANGE = LOG_MAX - LOG_MIN

    colour_map = {}

    for entry in CHAIN_DATA:
        iso = entry["isotope"]

        if entry["is_stable"]:
            colour_map[iso] = {
                "oklch": "oklch(0.50 0 0)",
                "lightness": 0.50,
                "chroma": 0,
                "hue": 0,
                "label": "stable (grey)",
            }
        else:
            log_hl = entry["log10_half_life"]
            t = (log_hl - LOG_MIN) / LOG_RANGE
            hue = 30 + t * 240  # 30 (hot/fast) to 270 (cool/slow)

            colour_map[iso] = {
                "oklch": f"oklch(0.65 0.20 {hue:.0f})",
                "lightness": 0.65,
                "chroma": 0.20,
                "hue": round(hue),
                "label": f"hue {hue:.0f}°",
            }

    return colour_map


def build_chart_context():
    """Build nuclide chart context for the zoomed view."""
    print("Building chart context...")

    chain_path = []
    transitions = []

    for entry in CHAIN_DATA:
        chain_path.append({
            "N": entry["N"],
            "Z": entry["Z"],
            "isotope": entry["isotope"],
        })

        if entry["daughter"]:
            transitions.append({
                "from": entry["isotope"],
                "to": entry["daughter"],
                "type": entry["decay_type"],
                "half_life": entry["half_life_readable"],
            })

    return {
        "viewport": {
            "z_min": 81,
            "z_max": 93,
            "n_min": 123,
            "n_max": 147,
        },
        "chain_path": chain_path,
        "transitions": transitions,
    }


def build_narrative_steps():
    """Build narrative content for each decay step."""
    print("Building narrative steps...")

    narratives = [
        {
            "isotope": "U-238",
            "title": "The Beginning",
            "content": "The first step takes 4.468 billion years — almost exactly the age of the Earth. Half of all the uranium that existed when the Earth formed has already decayed.",
            "highlight": "Half-life equals the age of our planet",
        },
        {
            "isotope": "Th-234",
            "title": "The Pace Quickens",
            "content": "After billions of years of patience, the pace quickens. Thorium-234 lasts only 24 days.",
            "highlight": "10 orders of magnitude faster",
        },
        {
            "isotope": "Pa-234m",
            "title": "A Minute's Rest",
            "content": "Even faster. Protactinium-234m decays in barely a minute. The 'm' means metastable — an excited nuclear state.",
            "highlight": "Metastable isomer",
        },
        {
            "isotope": "U-234",
            "title": "Back to Uranium",
            "content": "Back to uranium — but a lighter version. This one waits 245,000 years. Since anatomically modern humans first appeared.",
            "highlight": "Human timescales",
        },
        {
            "isotope": "Th-230",
            "title": "Another Long Wait",
            "content": "Another thorium, another wait. 75,000 years — since humans first entered Europe.",
            "highlight": "Prehistoric timescales",
        },
        {
            "isotope": "Ra-226",
            "title": "Marie Curie's Element",
            "content": "Radium-226. Marie Curie's element, discovered in 1898. Half-life: 1,600 years — the time since the Roman Empire.",
            "highlight": "Historical discovery",
        },
        {
            "isotope": "Rn-222",
            "title": "The Dangerous Gas",
            "content": "Radon-222. The only gas in the chain. It seeps up through soil and into basements. This is why uranium in bedrock can cause lung cancer.",
            "highlight": "Health hazard — second leading cause of lung cancer",
        },
        {
            "isotope": "Po-218",
            "title": "The Cascade Begins",
            "content": "Three minutes. The cascade is accelerating. We're entering the fast part of the chain.",
            "highlight": "Rapid succession begins",
        },
        {
            "isotope": "Pb-214",
            "title": "Lead Interlude",
            "content": "Lead-214. A brief stop in a sequence of beta decays. About 27 minutes — the length of a commute.",
            "highlight": "First appearance of lead",
        },
        {
            "isotope": "Bi-214",
            "title": "Bismuth Transition",
            "content": "Bismuth-214. Twenty minutes. Another beta decay, converting a neutron to a proton.",
            "highlight": "Beta decay sequence",
        },
        {
            "isotope": "Po-214",
            "title": "The Fastest Step",
            "content": "And then — the fastest step. Polonium-214 exists for 164 microseconds. In the time it takes light to travel 49 kilometres, this atom has already transformed. This step is 860 billion trillion times faster than the first.",
            "highlight": "164 microseconds — 10²¹ times faster than U-238",
        },
        {
            "isotope": "Pb-210",
            "title": "A Generation",
            "content": "Lead-210 catches its breath. 22 years — a human generation. Long enough to watch a child grow up.",
            "highlight": "Human lifetime scale",
        },
        {
            "isotope": "Bi-210",
            "title": "A Working Week",
            "content": "Bismuth-210. Five days. A working week in nuclear time.",
            "highlight": "Last beta decay",
        },
        {
            "isotope": "Po-210",
            "title": "The Final Transformation",
            "content": "The final transformation. Polonium-210 — the element used to assassinate Alexander Litvinenko in 2006. Intensely radioactive, emitting energetic alpha particles.",
            "highlight": "Historical notoriety",
        },
        {
            "isotope": "Pb-206",
            "title": "Journey's End",
            "content": "Lead-206. Stable. The journey is complete. From 92 protons to 82, from 146 neutrons to 124. Eight alpha particles ejected, six beta decays completed. 4.5 billion years, 14 steps.",
            "highlight": "Stable end product",
        },
    ]

    return narratives


def main():
    """Generate all data files."""
    print("=" * 60)
    print("Radioactive Decay Chain Data Generation")
    print("U-238 → Pb-206 (14 steps)")
    print("=" * 60)

    # 1. Chain data
    print("\n1. Writing chain data...")
    with open(OUTPUT_DIR / "chain_data.json", "w") as f:
        json.dump(CHAIN_DATA, f, indent=2)

    # 2. Inventory evolution
    print("\n2. Computing inventory evolution...")
    if HAS_RD:
        try:
            inventory = compute_inventory_with_rd()
        except Exception as e:
            print(f"radioactivedecay failed: {e}, using fallback")
            inventory = compute_inventory_evolution()
    else:
        inventory = compute_inventory_evolution()

    with open(OUTPUT_DIR / "inventory_evolution.json", "w") as f:
        json.dump(inventory, f)

    # 3. Colour map
    print("\n3. Computing colour map...")
    colours = compute_colour_map()
    with open(OUTPUT_DIR / "colour_map.json", "w") as f:
        json.dump(colours, f, indent=2)

    # 4. Chart context
    print("\n4. Building chart context...")
    context = build_chart_context()
    with open(OUTPUT_DIR / "chart_context.json", "w") as f:
        json.dump(context, f, indent=2)

    # 5. Geiger-Nuttall data
    print("\n5. Writing Geiger-Nuttall data...")
    with open(OUTPUT_DIR / "geiger_nuttall.json", "w") as f:
        json.dump(GEIGER_NUTTALL_DATA, f, indent=2)

    # 6. Narrative steps
    print("\n6. Building narrative steps...")
    narratives = build_narrative_steps()
    with open(OUTPUT_DIR / "narratives.json", "w") as f:
        json.dump(narratives, f, indent=2)

    # 7. Time comparisons
    print("\n7. Writing time comparisons...")
    with open(OUTPUT_DIR / "time_comparisons.json", "w") as f:
        json.dump(TIME_COMPARISONS, f, indent=2)

    # Summary
    total_size = sum(
        os.path.getsize(OUTPUT_DIR / f) for f in os.listdir(OUTPUT_DIR) if f.endswith(".json")
    )
    print("\n" + "=" * 60)
    print(f"Done! Total: {total_size / 1024:.1f} KB across {len(os.listdir(OUTPUT_DIR))} files")
    print(f"Output: {OUTPUT_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
