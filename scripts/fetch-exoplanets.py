"""
Fetch exoplanet data from NASA Exoplanet Archive TAP service.
Outputs JSON for the browser visualization.

Usage: python scripts/fetch-exoplanets.py
Output: public/data/exoplanets/planets.json
        public/data/exoplanets/featured.json
"""
import requests
import json
import math
import os

TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync"

COLUMNS = [
    "pl_name", "hostname", "pl_letter",
    "pl_rade", "pl_radj", "pl_bmasse", "pl_orbper",
    "pl_trandep", "pl_trandur", "pl_tranmid",
    "pl_ratdor", "pl_ratror", "pl_imppar",
    "pl_eqt", "pl_insol",
    "pl_orbsmax", "pl_orbeccen",
    "st_teff", "st_rad", "st_mass",
    "ra", "dec", "sy_dist", "sy_vmag",
    "disc_year", "discoverymethod", "disc_facility"
]

QUERY = f"""
SELECT {','.join(COLUMNS)}
FROM pscomppars
WHERE tran_flag = 1
  AND pl_rade IS NOT NULL
ORDER BY pl_trandep DESC
"""

FEATURED = [
    "HD 209458 b", "Kepler-22 b", "Kepler-452 b", "Kepler-186 f",
    "Kepler-10 b", "CoRoT-7 b",
    "TRAPPIST-1 b", "TRAPPIST-1 c", "TRAPPIST-1 d", "TRAPPIST-1 e",
    "TRAPPIST-1 f", "TRAPPIST-1 g", "TRAPPIST-1 h",
    "WASP-12 b", "WASP-18 b", "WASP-121 b", "WASP-39 b",
    "HAT-P-7 b", "HD 189733 b", "TrES-2 b",
    "Kepler-16 b", "Kepler-90 h", "Kepler-11 b", "Kepler-11 f",
    "Kepler-442 b", "Kepler-62 e", "Kepler-62 f",
    "Kepler-138 d", "Kepler-1649 c",
    "TOI-700 d", "TOI-700 e", "LHS 1140 b", "TOI-1452 b",
    "GJ 367 b", "TOI-715 b",
    "K2-18 b", "GJ 1214 b",
    "55 Cnc e", "Kepler-78 b",
    "WASP-107 b", "HAT-P-11 b", "GJ 436 b",
]

# Quadratic limb darkening lookup (Claret & Bloemen 2011, approximate)
LD_TABLE = {
    3500: (0.65, 0.14), 4000: (0.58, 0.17), 4500: (0.50, 0.20),
    5000: (0.44, 0.22), 5500: (0.40, 0.24), 6000: (0.35, 0.25),
    6500: (0.30, 0.26), 7000: (0.25, 0.27), 7500: (0.22, 0.27),
}

def get_limb_darkening(teff):
    """Interpolate quadratic LD coefficients from Teff."""
    if teff is None:
        return (0.40, 0.24)  # default solar
    temps = sorted(LD_TABLE.keys())
    if teff <= temps[0]:
        return LD_TABLE[temps[0]]
    if teff >= temps[-1]:
        return LD_TABLE[temps[-1]]
    for i in range(len(temps) - 1):
        if temps[i] <= teff <= temps[i + 1]:
            t = (teff - temps[i]) / (temps[i + 1] - temps[i])
            u1a, u2a = LD_TABLE[temps[i]]
            u1b, u2b = LD_TABLE[temps[i + 1]]
            return (u1a + t * (u1b - u1a), u2a + t * (u2b - u2a))
    return (0.40, 0.24)

def main():
    print("Fetching data from NASA Exoplanet Archive...")
    response = requests.get(TAP_URL, params={
        "query": QUERY.replace("\n", " "),
        "format": "json"
    })
    response.raise_for_status()
    planets = response.json()
    print(f"Retrieved {len(planets)} transiting planets.")

    # Add computed fields
    for p in planets:
        teff = p.get("st_teff")
        u1, u2 = get_limb_darkening(teff)
        p["ld_u1"] = round(u1, 3)
        p["ld_u2"] = round(u2, 3)

        # Compute transit depth from radius ratio if missing
        if p.get("pl_trandep") is None and p.get("pl_ratror") is not None:
            p["pl_trandep"] = round(p["pl_ratror"] ** 2 * 100, 6)

        # Compute radius ratio if missing
        if p.get("pl_ratror") is None and p.get("pl_trandep") is not None:
            p["pl_ratror"] = round(math.sqrt(p["pl_trandep"] / 100), 5)

        # Flag as featured
        p["featured"] = p["pl_name"] in FEATURED

    # Write full catalogue
    os.makedirs("public/data/exoplanets", exist_ok=True)
    with open("public/data/exoplanets/planets.json", "w") as f:
        json.dump(planets, f)
    print(f"Wrote planets.json ({len(planets)} planets)")

    # Write featured subset
    featured = [p for p in planets if p["featured"]]
    with open("public/data/exoplanets/featured.json", "w") as f:
        json.dump(featured, f, indent=2)
    print(f"Wrote featured.json ({len(featured)} planets)")

if __name__ == "__main__":
    main()
