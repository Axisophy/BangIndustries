'use client';

import { MissionMap } from './components/MissionMap';
import { TransferAnimation } from './components/TransferAnimation';
import { TransferDesigner } from './components/TransferDesigner';
import { MissionStoryboard } from './components/MissionStoryboard';

export default function OrbitalMechanicsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-4 md:px-6 pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16">
        <div className="max-w-[75%]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            The Geometry of Getting There
          </h1>
          <p className="text-2xl font-normal text-black/70 mt-4">
            Orbital mechanics and the path to the Moon
          </p>
          <p className="text-base text-black/70 max-w-3xl mt-12 mb-12">
            Spacecraft don&apos;t travel in straight lines. They fall — in carefully calculated curves that trade altitude for speed and speed for altitude. This interactive explainer unpacks the physics of orbital transfers, from the elegant Hohmann ellipse to the real mission profiles of Apollo and Artemis.
          </p>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs bg-black/5 text-black/60">Interactive</span>
            <span className="px-3 py-1 text-xs bg-black/5 text-black/60">Science</span>
            <span className="px-3 py-1 text-xs bg-black/5 text-black/60">Space</span>
            <span className="px-3 py-1 text-xs bg-black/5 text-black/60">Mxwll</span>
          </div>
        </div>
      </section>

      {/* Section 1: Static Mission Map */}
      <section className="px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-sm font-bold tracking-tight mb-6">The Transfer Ellipse</h2>
        <div className="border border-black/10 overflow-hidden">
          <MissionMap />
        </div>
      </section>

      {/* Section 2: Animated Transfer */}
      <section className="px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-sm font-bold tracking-tight mb-6">Interactive: Watch the Transfer</h2>
        <div className="border border-black/10 bg-white p-6">
          <TransferAnimation />
        </div>
        <p className="text-sm text-black/50 mt-4 max-w-2xl">
          Scrub through time to see how velocity and altitude change during a lunar transfer.
          Notice how the spacecraft slows as it climbs out of Earth&apos;s gravity well.
        </p>
      </section>

      {/* Section 3: Transfer Designer */}
      <section className="px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-sm font-bold tracking-tight mb-6">Design Your Transfer</h2>
        <div className="border border-black/10 bg-white p-6">
          <TransferDesigner />
        </div>
        <p className="text-sm text-black/50 mt-4 max-w-2xl">
          Adjust the orbital parameters to see how {'\u0394'}v requirements change.
          For very distant targets (ratio {'>'} 11.94), a bi-elliptic transfer becomes more efficient than Hohmann — at the cost of much longer travel time.
        </p>
      </section>

      {/* Section 4: Mission Storyboard */}
      <section className="px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-sm font-bold tracking-tight mb-6">Mission Profile: Step by Step</h2>
        <div className="border border-black/10 bg-white p-6">
          <MissionStoryboard />
        </div>
      </section>

      {/* Content sections */}
      <section className="px-4 md:px-6 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-3 gap-24 lg:gap-32">

          {/* Left column - main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* The Challenge */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                The Challenge
              </h2>
              <p className="text-black/70 leading-relaxed">
                Orbital mechanics is counterintuitive. To go faster, you fire your engine backward. To catch something ahead of you, you slow down first. To reach the Moon, you don&apos;t point at it — you aim at where it will be in three days. For Mxwll, we wanted to build interactive tools that make these dynamics visible, grounding the abstract mathematics in animated trajectories and real mission data.
              </p>
            </div>

            {/* Background */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Background
              </h2>
              <div className="space-y-4 text-black/70 leading-relaxed">
                <p>
                  The Hohmann transfer, discovered in 1925, is the most fuel-efficient way to move between two circular orbits. It uses two engine burns: one to enter an elliptical transfer orbit, and another to circularize at the destination. The elegance lies in timing the burns at specific points — periapsis and apoapsis — where velocity changes have maximum effect.
                </p>
                <p>
                  This efficiency comes from the Oberth effect: a rocket engine produces more useful energy when the spacecraft is already moving fast. Burning deep in a gravity well (close to a planet) is more efficient than burning far away. It&apos;s why spacecraft don&apos;t just point at their destination and fire — they follow curves that exploit gravitational dynamics.
                </p>
                <p>
                  Real missions add complexity. The Moon is moving, so timing matters. The spacecraft needs to arrive when the Moon is actually there. Artemis missions use an even more complex trajectory — a near-rectilinear halo orbit (NRHO) that balances fuel efficiency, communication, and the geometry of lunar operations.
                </p>
              </div>
            </div>

            {/* Approach */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Approach
              </h2>
              <div className="space-y-4 text-black/70 leading-relaxed">
                <p>
                  We built four interactive components that work as a progression:
                </p>
                <p>
                  The mission map provides an overview — Earth, Moon, and the transfer ellipse with annotated burns. It establishes the visual vocabulary for what follows.
                </p>
                <p>
                  The transfer animation lets users scrub through time and watch telemetry change. Speed drops as altitude increases; distance to the Moon shrinks; the coast phase becomes tangible rather than abstract.
                </p>
                <p>
                  The transfer designer exposes the mathematics. Users can adjust orbital parameters and see how {'\u0394'}v requirements respond. The bi-elliptic comparison reveals a counterintuitive result: sometimes three burns beats two.
                </p>
                <p>
                  The mission storyboard grounds everything in real operations — the actual phases of Apollo and Artemis, with technical details about what each burn accomplishes and why it happens where it does.
                </p>
              </div>
            </div>

            {/* Adaptability */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Adaptability
              </h2>
              <p className="text-black/70 leading-relaxed">
                The same framework applies to any trajectory optimization problem: interplanetary transfers, satellite constellation management, rendezvous and docking. The underlying physics is universal; only the parameters change.
              </p>
            </div>

            {/* Related Projects */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Related Projects
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="/work/stellar-evolution" className="text-black/70 hover:text-[var(--color-pink)] transition-colors">
                    Stellar Evolution →
                  </a>
                </li>
                <li>
                  <a href="/work/nuclide-chart" className="text-black/70 hover:text-[var(--color-pink)] transition-colors">
                    Chart of Nuclides →
                  </a>
                </li>
                <li>
                  <a href="/work/network-theory" className="text-black/70 hover:text-[var(--color-pink)] transition-colors">
                    Network Theory →
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Right column - metadata */}
          <div className="space-y-8">

            {/* Technology */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Technology
              </h2>
              <p className="text-sm text-black/70 leading-relaxed">
                React, TypeScript, SVG rendering. Orbital mechanics computed from first principles (vis-viva equation, Kepler&apos;s laws). Real mission data from NASA mission profiles.
              </p>
            </div>

            {/* Data */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Data
              </h2>
              <p className="text-sm text-black/70 leading-relaxed">
                Apollo mission profiles from NASA technical reports. Artemis mission architecture from NASA&apos;s Moon to Mars documentation. Gravitational parameters from JPL.
              </p>
            </div>

            {/* Status */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Status
              </h2>
              <p className="text-sm text-black/70 leading-relaxed">
                Core visualisations complete. Three-body dynamics (Sun-Earth-Moon) and gravity assists in development.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
