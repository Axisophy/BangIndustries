#!/usr/bin/env python3
"""
Cosmic Distance Ladder Data Preprocessing

Fetches and processes data for the four rungs:
1. Parallax - Nearby stars from Gaia DR3
2. Cepheids - Classical Cepheids from Gaia DR3 vari_cepheid
3. Type Ia Supernovae - Simulated light curves using SALT2-like model
4. Hubble Flow - Cosmological calculations

Output: JSON files for visualization
"""

import json
import numpy as np
from pathlib import Path

# Output directory
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "data" / "distance-ladder"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Try imports, use fallbacks if not available
try:
    from astroquery.gaia import Gaia
    HAS_ASTROQUERY = True
except ImportError:
    HAS_ASTROQUERY = False
    print("astroquery not installed, using synthetic data")

try:
    import sncosmo
    HAS_SNCOSMO = True
except ImportError:
    HAS_SNCOSMO = False
    print("sncosmo not installed, using synthetic supernova data")


def fetch_parallax_stars():
    """
    Fetch nearby stars with good parallax measurements from Gaia DR3.
    These demonstrate geometric parallax measurement.
    """
    print("Fetching parallax stars...")

    if HAS_ASTROQUERY:
        query = """
        SELECT TOP 200
            source_id,
            ra,
            dec,
            parallax,
            parallax_error,
            parallax_over_error,
            phot_g_mean_mag,
            bp_rp,
            COALESCE(
                (SELECT name FROM gaiadr3.ident WHERE gaiadr3.ident.source_id = g.source_id LIMIT 1),
                CONCAT('Gaia DR3 ', g.source_id)
            ) as name
        FROM gaiadr3.gaia_source AS g
        WHERE parallax > 100
            AND parallax_over_error > 20
            AND phot_g_mean_mag < 10
            AND bp_rp IS NOT NULL
        ORDER BY parallax DESC
        """
        try:
            job = Gaia.launch_job(query)
            results = job.get_results()

            stars = []
            for row in results:
                distance_pc = 1000 / row['parallax']  # parallax in mas
                stars.append({
                    'id': str(row['source_id']),
                    'name': row['name'] if row['name'] else f"Gaia {row['source_id']}",
                    'ra': float(row['ra']),
                    'dec': float(row['dec']),
                    'parallax_mas': float(row['parallax']),
                    'parallax_error_mas': float(row['parallax_error']),
                    'distance_pc': round(distance_pc, 3),
                    'distance_ly': round(distance_pc * 3.26156, 3),
                    'mag_g': float(row['phot_g_mean_mag']),
                    'color_bp_rp': float(row['bp_rp']),
                })
            return stars
        except Exception as e:
            print(f"Gaia query failed: {e}, using synthetic data")

    # Synthetic data for nearby stars
    np.random.seed(42)

    # Famous nearby stars with approximate real values
    famous_stars = [
        {'name': 'Proxima Centauri', 'parallax_mas': 768.5, 'ra': 217.42, 'dec': -62.68, 'mag_g': 11.13, 'color': 3.0},
        {'name': 'Alpha Centauri A', 'parallax_mas': 747.1, 'ra': 219.90, 'dec': -60.83, 'mag_g': -0.01, 'color': 0.71},
        {'name': 'Alpha Centauri B', 'parallax_mas': 747.1, 'ra': 219.90, 'dec': -60.83, 'mag_g': 1.33, 'color': 1.15},
        {'name': "Barnard's Star", 'parallax_mas': 546.9, 'ra': 269.45, 'dec': 4.69, 'mag_g': 9.51, 'color': 2.5},
        {'name': 'Wolf 359', 'parallax_mas': 419.1, 'ra': 164.12, 'dec': 7.01, 'mag_g': 13.54, 'color': 3.2},
        {'name': 'Lalande 21185', 'parallax_mas': 392.6, 'ra': 165.83, 'dec': 35.97, 'mag_g': 7.52, 'color': 2.3},
        {'name': 'Sirius A', 'parallax_mas': 379.2, 'ra': 101.29, 'dec': -16.72, 'mag_g': -1.46, 'color': 0.0},
        {'name': 'Luyten 726-8 A', 'parallax_mas': 373.7, 'ra': 24.76, 'dec': -17.95, 'mag_g': 12.99, 'color': 3.1},
        {'name': 'Ross 154', 'parallax_mas': 336.4, 'ra': 281.91, 'dec': -23.84, 'mag_g': 10.43, 'color': 2.8},
        {'name': 'Ross 248', 'parallax_mas': 316.0, 'ra': 355.49, 'dec': 44.18, 'mag_g': 12.29, 'color': 2.9},
        {'name': 'Epsilon Eridani', 'parallax_mas': 310.9, 'ra': 53.23, 'dec': -9.46, 'mag_g': 3.73, 'color': 1.1},
        {'name': 'Lacaille 9352', 'parallax_mas': 303.9, 'ra': 346.47, 'dec': -35.85, 'mag_g': 7.34, 'color': 2.2},
        {'name': 'Ross 128', 'parallax_mas': 296.3, 'ra': 176.94, 'dec': 0.80, 'mag_g': 11.13, 'color': 2.7},
        {'name': 'EZ Aquarii', 'parallax_mas': 289.5, 'ra': 340.65, 'dec': -15.28, 'mag_g': 13.05, 'color': 3.0},
        {'name': '61 Cygni A', 'parallax_mas': 286.0, 'ra': 316.72, 'dec': 38.74, 'mag_g': 5.21, 'color': 1.6},
        {'name': 'Procyon A', 'parallax_mas': 284.6, 'ra': 114.83, 'dec': 5.22, 'mag_g': 0.37, 'color': 0.42},
        {'name': 'Struve 2398 A', 'parallax_mas': 280.3, 'ra': 272.17, 'dec': 59.63, 'mag_g': 8.90, 'color': 2.1},
        {'name': 'Groombridge 34 A', 'parallax_mas': 280.1, 'ra': 4.62, 'dec': 44.02, 'mag_g': 8.09, 'color': 2.0},
        {'name': 'Epsilon Indi A', 'parallax_mas': 275.8, 'ra': 330.84, 'dec': -56.79, 'mag_g': 4.83, 'color': 1.4},
        {'name': 'Tau Ceti', 'parallax_mas': 273.8, 'ra': 26.02, 'dec': -15.94, 'mag_g': 3.50, 'color': 1.0},
    ]

    stars = []
    for i, star in enumerate(famous_stars):
        distance_pc = 1000 / star['parallax_mas']
        stars.append({
            'id': f'synthetic_{i}',
            'name': star['name'],
            'ra': star['ra'],
            'dec': star['dec'],
            'parallax_mas': star['parallax_mas'],
            'parallax_error_mas': star['parallax_mas'] * 0.001,  # Very small error for nearby stars
            'distance_pc': round(distance_pc, 3),
            'distance_ly': round(distance_pc * 3.26156, 3),
            'mag_g': star['mag_g'],
            'color_bp_rp': star['color'],
        })

    # Add more synthetic stars to fill out the visualization
    for i in range(80):
        parallax = np.random.uniform(100, 300)
        distance_pc = 1000 / parallax
        stars.append({
            'id': f'synthetic_{20 + i}',
            'name': f'HD {100000 + i}',
            'ra': np.random.uniform(0, 360),
            'dec': np.random.uniform(-90, 90),
            'parallax_mas': round(parallax, 2),
            'parallax_error_mas': round(parallax * 0.01, 3),
            'distance_pc': round(distance_pc, 3),
            'distance_ly': round(distance_pc * 3.26156, 3),
            'mag_g': round(np.random.uniform(4, 12), 2),
            'color_bp_rp': round(np.random.uniform(-0.5, 3.5), 2),
        })

    return stars


def fetch_cepheids():
    """
    Fetch classical Cepheid variables from Gaia DR3.
    These demonstrate the Period-Luminosity relation.
    """
    print("Fetching Cepheid variables...")

    if HAS_ASTROQUERY:
        query = """
        SELECT
            v.source_id,
            g.ra,
            g.dec,
            g.parallax,
            g.parallax_error,
            g.phot_g_mean_mag,
            v.pf,
            v.average_rv,
            v.peak_to_peak_g
        FROM gaiadr3.vari_cepheid AS v
        JOIN gaiadr3.gaia_source AS g ON v.source_id = g.source_id
        WHERE v.type_best_classification = 'DCEP'
            AND g.parallax > 0.1
            AND g.parallax_error / g.parallax < 0.2
            AND v.pf > 1
            AND v.pf < 100
        ORDER BY v.pf
        """
        try:
            job = Gaia.launch_job(query)
            results = job.get_results()

            cepheids = []
            for row in results:
                if row['parallax'] <= 0:
                    continue

                distance_pc = 1000 / row['parallax']
                # Absolute magnitude
                abs_mag = row['phot_g_mean_mag'] - 5 * np.log10(distance_pc / 10)

                cepheids.append({
                    'id': str(row['source_id']),
                    'ra': float(row['ra']),
                    'dec': float(row['dec']),
                    'period_days': float(row['pf']),
                    'log_period': float(np.log10(row['pf'])),
                    'apparent_mag': float(row['phot_g_mean_mag']),
                    'absolute_mag': round(float(abs_mag), 3),
                    'parallax_mas': float(row['parallax']),
                    'distance_pc': round(distance_pc, 1),
                    'distance_kpc': round(distance_pc / 1000, 3),
                    'amplitude': float(row['peak_to_peak_g']) if row['peak_to_peak_g'] else 0.5,
                })
            return cepheids
        except Exception as e:
            print(f"Gaia Cepheid query failed: {e}, using synthetic data")

    # Synthetic Cepheid data following the P-L relation
    # Leavitt Law: M_V = -2.43 * log10(P) - 1.62 (approximately)
    np.random.seed(43)

    cepheids = []

    # Generate Cepheids with realistic P-L scatter
    for i in range(150):
        # Period distribution (log-uniform from 1 to 100 days)
        log_period = np.random.uniform(0, 2)
        period = 10 ** log_period

        # P-L relation with scatter
        # M_G ≈ -2.5 * log10(P) - 1.5 (approximately for Gaia G band)
        abs_mag_true = -2.5 * log_period - 1.5
        abs_mag = abs_mag_true + np.random.normal(0, 0.15)  # Intrinsic scatter

        # Distance (spread across the Galaxy)
        if i < 30:
            # Nearby Cepheids (within a few kpc)
            distance_pc = np.random.uniform(500, 3000)
        else:
            # More distant Cepheids
            distance_pc = np.random.uniform(2000, 15000)

        # Calculate apparent magnitude
        app_mag = abs_mag + 5 * np.log10(distance_pc / 10)

        # Parallax
        parallax = 1000 / distance_pc

        cepheids.append({
            'id': f'cep_{i}',
            'ra': np.random.uniform(0, 360),
            'dec': np.random.uniform(-60, 60),  # Galactic plane bias
            'period_days': round(period, 3),
            'log_period': round(log_period, 4),
            'apparent_mag': round(app_mag, 2),
            'absolute_mag': round(abs_mag, 3),
            'parallax_mas': round(parallax, 4),
            'distance_pc': round(distance_pc, 1),
            'distance_kpc': round(distance_pc / 1000, 3),
            'amplitude': round(np.random.uniform(0.3, 1.2), 2),
        })

    # Add some famous Cepheids
    famous_cepheids = [
        {'name': 'Delta Cephei', 'period': 5.366, 'distance_pc': 273, 'abs_mag': -3.47},
        {'name': 'Eta Aquilae', 'period': 7.177, 'distance_pc': 360, 'abs_mag': -3.89},
        {'name': 'Zeta Geminorum', 'period': 10.15, 'distance_pc': 360, 'abs_mag': -4.05},
        {'name': 'Beta Doradus', 'period': 9.84, 'distance_pc': 320, 'abs_mag': -4.00},
        {'name': 'l Carinae', 'period': 35.56, 'distance_pc': 480, 'abs_mag': -5.29},
        {'name': 'RS Puppis', 'period': 41.39, 'distance_pc': 1800, 'abs_mag': -5.60},
    ]

    for i, cep in enumerate(famous_cepheids):
        app_mag = cep['abs_mag'] + 5 * np.log10(cep['distance_pc'] / 10)
        cepheids.append({
            'id': f'famous_cep_{i}',
            'name': cep['name'],
            'ra': np.random.uniform(0, 360),
            'dec': np.random.uniform(-60, 60),
            'period_days': cep['period'],
            'log_period': round(np.log10(cep['period']), 4),
            'apparent_mag': round(app_mag, 2),
            'absolute_mag': cep['abs_mag'],
            'parallax_mas': round(1000 / cep['distance_pc'], 4),
            'distance_pc': cep['distance_pc'],
            'distance_kpc': round(cep['distance_pc'] / 1000, 3),
            'amplitude': round(np.random.uniform(0.5, 1.0), 2),
            'featured': True,
        })

    return cepheids


def generate_cepheid_lightcurve(period, amplitude, mean_mag, num_points=100):
    """Generate a realistic Cepheid light curve shape."""
    phases = np.linspace(0, 2, num_points)  # Two full cycles

    # Cepheid light curves have characteristic asymmetric shape
    # Fast rise, slow decline
    rise_time = 0.15  # Fraction of period for rise

    light_curve = []
    for phase in phases:
        p = phase % 1.0
        if p < rise_time:
            # Fast rise (roughly sinusoidal)
            brightness = amplitude * 0.5 * (1 + np.sin(np.pi * p / rise_time - np.pi/2))
        else:
            # Slow decline
            decline_phase = (p - rise_time) / (1 - rise_time)
            brightness = amplitude * 0.5 * (1 + np.cos(np.pi * decline_phase))

        # Convert to magnitude (brighter = lower magnitude)
        mag = mean_mag - brightness + amplitude/2
        light_curve.append({
            'phase': round(phase, 4),
            'mag': round(mag, 3),
        })

    return light_curve


def generate_supernovae():
    """
    Generate Type Ia supernova data with light curves.
    Using SALT2-like model for standardizable candles.
    """
    print("Generating Type Ia supernova data...")

    np.random.seed(44)

    # Absolute magnitude of Type Ia SNe (after standardization)
    # M_B ≈ -19.3 ± 0.1
    M_Ia = -19.3

    supernovae = []

    # Generate SNe at various redshifts
    redshifts = np.concatenate([
        np.random.uniform(0.01, 0.1, 30),    # Nearby
        np.random.uniform(0.1, 0.5, 50),     # Intermediate
        np.random.uniform(0.5, 1.0, 30),     # Distant
        np.random.uniform(1.0, 1.5, 15),     # Very distant
    ])

    # Some famous SNe
    famous_sne = [
        {'name': 'SN 1994D', 'z': 0.00152, 'host': 'NGC 4526'},
        {'name': 'SN 1998aq', 'z': 0.00365, 'host': 'NGC 3982'},
        {'name': 'SN 2011fe', 'z': 0.00080, 'host': 'M101'},
        {'name': 'SN 2014J', 'z': 0.00068, 'host': 'M82'},
    ]

    for i, z in enumerate(redshifts):
        # Luminosity distance (simplified flat ΛCDM)
        H0 = 70  # km/s/Mpc
        c = 299792.458  # km/s

        # Approximate luminosity distance for flat ΛCDM
        # D_L ≈ (c/H0) * z * (1 + z/2) for low z
        if z < 0.3:
            d_L_Mpc = (c / H0) * z * (1 + 0.5 * z)
        else:
            # More accurate for higher z
            Omega_m = 0.3
            Omega_L = 0.7
            # Simplified integral
            d_L_Mpc = (c / H0) * z * (1 + z) * (1 - 0.5 * Omega_m * z)

        # Distance modulus
        mu = 5 * np.log10(d_L_Mpc * 1e6 / 10)  # Convert Mpc to pc

        # SALT2-like parameters
        x1 = np.random.normal(0, 1)  # Stretch parameter
        c_salt = np.random.normal(0, 0.1)  # Color

        # Standardization corrections
        alpha = 0.14
        beta = 3.1

        # Apparent magnitude at peak
        m_B = M_Ia + mu - alpha * x1 + beta * c_salt + np.random.normal(0, 0.15)

        # Host galaxy mass (for mass step)
        log_host_mass = np.random.uniform(8, 12)

        supernovae.append({
            'id': f'sn_{i}',
            'redshift': round(z, 5),
            'distance_Mpc': round(d_L_Mpc, 2),
            'mu': round(mu, 3),
            'peak_mag': round(m_B, 3),
            'x1': round(x1, 3),  # Stretch
            'c': round(c_salt, 3),  # Color
            'log_host_mass': round(log_host_mass, 2),
            'ra': np.random.uniform(0, 360),
            'dec': np.random.uniform(-90, 90),
        })

    # Add famous SNe
    for i, sn in enumerate(famous_sne):
        z = sn['z']
        H0 = 70
        c = 299792.458
        d_L_Mpc = (c / H0) * z * (1 + 0.5 * z)
        mu = 5 * np.log10(d_L_Mpc * 1e6 / 10)

        supernovae.append({
            'id': f'famous_sn_{i}',
            'name': sn['name'],
            'host': sn['host'],
            'redshift': z,
            'distance_Mpc': round(d_L_Mpc, 2),
            'mu': round(mu, 3),
            'peak_mag': round(M_Ia + mu, 3),
            'x1': round(np.random.normal(0, 0.5), 3),
            'c': round(np.random.normal(0, 0.05), 3),
            'log_host_mass': 10.5,
            'ra': np.random.uniform(0, 360),
            'dec': np.random.uniform(-90, 90),
            'featured': True,
        })

    return supernovae


def generate_sn_lightcurve(peak_mag, x1, c_salt, num_points=60):
    """
    Generate a Type Ia supernova light curve using SALT2-like template.
    """
    # Time in days relative to peak
    times = np.linspace(-20, 60, num_points)

    # SALT2-like template (simplified)
    # Rise time depends on stretch
    rise_time = 17 * (1 + 0.1 * x1)  # ~17 days for normal
    decay_time = 40 * (1 + 0.1 * x1)  # Longer decay

    light_curve = []
    for t in times:
        if t < 0:
            # Rising phase (approximately exponential)
            relative_mag = 2.5 * np.log10(1 + np.exp((t + 15) / 3))
        else:
            # Declining phase (approximately linear in mag, with break)
            if t < 30:
                # Initial fast decline
                relative_mag = 0.1 * t
            else:
                # Secondary linear decline
                relative_mag = 3.0 + 0.015 * (t - 30)

        # Color correction
        relative_mag += c_salt * 0.5

        mag = peak_mag + relative_mag
        light_curve.append({
            'day': round(t, 1),
            'mag': round(mag, 3),
        })

    return light_curve


def generate_hubble_diagram():
    """
    Generate Hubble diagram data showing the expansion of the universe
    and the Hubble tension.
    """
    print("Generating Hubble diagram data...")

    np.random.seed(45)

    # Two H0 measurements to illustrate tension
    H0_shoes = 73.04  # SH0ES (Cepheid-calibrated SNe Ia)
    H0_planck = 67.4  # Planck CMB

    c = 299792.458  # km/s

    # Generate data points for Hubble diagram
    # Using SNe Ia as the primary probe

    hubble_data = {
        'shoes': [],
        'planck': [],
    }

    # Redshifts for the diagram
    redshifts = np.linspace(0.001, 0.1, 50)

    for z in redshifts:
        # Recession velocity (v = cz for low z)
        velocity = c * z

        # Distance using different H0 values
        d_shoes = velocity / H0_shoes
        d_planck = velocity / H0_planck

        hubble_data['shoes'].append({
            'z': round(z, 5),
            'v': round(velocity, 1),
            'd_Mpc': round(d_shoes, 2),
        })

        hubble_data['planck'].append({
            'z': round(z, 5),
            'v': round(velocity, 1),
            'd_Mpc': round(d_planck, 2),
        })

    # Generate observed data points with scatter
    observed_points = []
    obs_redshifts = np.random.uniform(0.003, 0.08, 40)

    for z in obs_redshifts:
        velocity = c * z
        # True distance (using intermediate H0 with scatter)
        H0_true = 70 + np.random.normal(0, 3)
        distance = velocity / H0_true

        observed_points.append({
            'z': round(z, 5),
            'v': round(velocity, 1),
            'd_Mpc': round(distance, 2),
            'd_err': round(distance * 0.07, 2),  # ~7% uncertainty
        })

    return {
        'models': hubble_data,
        'observations': observed_points,
        'H0_shoes': H0_shoes,
        'H0_planck': H0_planck,
        'H0_shoes_err': 1.04,
        'H0_planck_err': 0.5,
        'tension_sigma': 4.4,  # ~4.4σ tension
    }


def generate_redshift_spectrum():
    """
    Generate a template galaxy spectrum showing absorption/emission lines
    at various redshifts.
    """
    print("Generating redshift spectrum data...")

    # Rest-frame wavelengths of key spectral features (in Angstroms)
    spectral_lines = {
        'Ca_K': {'wavelength': 3934, 'type': 'absorption', 'name': 'Ca K'},
        'Ca_H': {'wavelength': 3969, 'type': 'absorption', 'name': 'Ca H'},
        'H_delta': {'wavelength': 4102, 'type': 'absorption', 'name': 'Hδ'},
        'H_gamma': {'wavelength': 4341, 'type': 'absorption', 'name': 'Hγ'},
        'H_beta': {'wavelength': 4861, 'type': 'absorption', 'name': 'Hβ'},
        'O_III_1': {'wavelength': 4959, 'type': 'emission', 'name': '[O III]'},
        'O_III_2': {'wavelength': 5007, 'type': 'emission', 'name': '[O III]'},
        'Mg_b': {'wavelength': 5175, 'type': 'absorption', 'name': 'Mg b'},
        'Na_D': {'wavelength': 5893, 'type': 'absorption', 'name': 'Na D'},
        'H_alpha': {'wavelength': 6563, 'type': 'both', 'name': 'Hα'},
    }

    # Generate a template spectrum
    wavelengths = np.linspace(3500, 7500, 1000)

    def generate_spectrum_at_z(z):
        """Generate a spectrum at a given redshift."""
        # Continuum (simple power law)
        continuum = 100 * (wavelengths / 5500) ** (-0.5)

        flux = continuum.copy()

        # Add spectral features
        line_positions = []
        for line_id, line in spectral_lines.items():
            observed_lambda = line['wavelength'] * (1 + z)

            if 3500 < observed_lambda < 7500:
                # Gaussian profile
                sigma = 5 * (1 + z)  # Broadened by redshift

                if line['type'] == 'absorption':
                    depth = 0.2 * continuum[np.argmin(np.abs(wavelengths - observed_lambda))]
                    flux -= depth * np.exp(-0.5 * ((wavelengths - observed_lambda) / sigma) ** 2)
                else:
                    strength = 0.3 * continuum[np.argmin(np.abs(wavelengths - observed_lambda))]
                    flux += strength * np.exp(-0.5 * ((wavelengths - observed_lambda) / sigma) ** 2)

                line_positions.append({
                    'id': line_id,
                    'name': line['name'],
                    'rest_wavelength': line['wavelength'],
                    'observed_wavelength': round(observed_lambda, 1),
                    'type': line['type'],
                })

        # Add noise
        noise = np.random.normal(0, 2, len(flux))
        flux += noise

        return {
            'wavelengths': wavelengths.tolist(),
            'flux': flux.tolist(),
            'lines': line_positions,
        }

    # Generate spectra at different redshifts for animation
    spectra = {}
    for z in [0.0, 0.01, 0.03, 0.05, 0.1]:
        spectra[f'z_{z:.2f}'.replace('.', '_')] = generate_spectrum_at_z(z)

    return {
        'spectral_lines': spectral_lines,
        'spectra': spectra,
    }


def main():
    """Run all data generation."""
    print("=" * 60)
    print("Cosmic Distance Ladder Data Generation")
    print("=" * 60)

    # Rung 1: Parallax
    parallax_stars = fetch_parallax_stars()
    print(f"Generated {len(parallax_stars)} parallax stars")

    with open(OUTPUT_DIR / "parallax_stars.json", 'w') as f:
        json.dump(parallax_stars, f, indent=2)

    # Rung 2: Cepheids
    cepheids = fetch_cepheids()
    print(f"Generated {len(cepheids)} Cepheid variables")

    # Generate light curves for featured Cepheids
    for cep in cepheids:
        if cep.get('featured') or cep.get('name'):
            cep['lightcurve'] = generate_cepheid_lightcurve(
                cep['period_days'],
                cep['amplitude'],
                cep['apparent_mag']
            )

    with open(OUTPUT_DIR / "cepheids.json", 'w') as f:
        json.dump(cepheids, f, indent=2)

    # P-L relation data
    pl_relation = {
        'slope': -2.5,
        'intercept': -1.5,
        'scatter': 0.15,
        'description': 'Period-Luminosity relation for Classical Cepheids in Gaia G band',
    }

    with open(OUTPUT_DIR / "pl_relation.json", 'w') as f:
        json.dump(pl_relation, f, indent=2)

    # Rung 3: Supernovae
    supernovae = generate_supernovae()
    print(f"Generated {len(supernovae)} Type Ia supernovae")

    # Generate light curves for featured SNe
    for sn in supernovae:
        if sn.get('featured'):
            sn['lightcurve'] = generate_sn_lightcurve(
                sn['peak_mag'],
                sn['x1'],
                sn['c']
            )

    with open(OUTPUT_DIR / "supernovae.json", 'w') as f:
        json.dump(supernovae, f, indent=2)

    # Rung 4: Hubble Flow
    hubble_data = generate_hubble_diagram()
    print("Generated Hubble diagram data")

    with open(OUTPUT_DIR / "hubble_diagram.json", 'w') as f:
        json.dump(hubble_data, f, indent=2)

    # Redshift spectrum
    spectrum_data = generate_redshift_spectrum()
    print("Generated redshift spectrum data")

    with open(OUTPUT_DIR / "redshift_spectrum.json", 'w') as f:
        json.dump(spectrum_data, f, indent=2)

    # Summary metadata
    metadata = {
        'generated_at': str(np.datetime64('now')),
        'rungs': {
            'parallax': {
                'count': len(parallax_stars),
                'file': 'parallax_stars.json',
                'description': 'Nearby stars with parallax measurements',
            },
            'cepheids': {
                'count': len(cepheids),
                'file': 'cepheids.json',
                'description': 'Classical Cepheid variables with P-L data',
            },
            'supernovae': {
                'count': len(supernovae),
                'file': 'supernovae.json',
                'description': 'Type Ia supernovae as standardizable candles',
            },
            'hubble': {
                'file': 'hubble_diagram.json',
                'description': 'Hubble diagram with tension comparison',
            },
        },
    }

    with open(OUTPUT_DIR / "metadata.json", 'w') as f:
        json.dump(metadata, f, indent=2)

    print("=" * 60)
    print("Data generation complete!")
    print(f"Output directory: {OUTPUT_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
