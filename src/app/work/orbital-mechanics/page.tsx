'use client';

import { useState } from 'react';
import { MissionMap } from './components/MissionMap';
import { TransferAnimation } from './components/TransferAnimation';
import { TransferDesigner } from './components/TransferDesigner';
import { MissionStoryboard } from './components/MissionStoryboard';

function MetadataDropdown({ title, children }: { title?: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center ${title ? 'justify-between w-full' : ''} text-left`}
      >
        {title && <span className='text-sm'>{title}</span>}
        <svg
          className={`w-4 h-4 text-black/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='square' strokeLinejoin='miter' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>
      {isOpen && (
        <div className='text-xs text-black/50 mt-2 leading-relaxed space-y-2'>
          {children}
        </div>
      )}
    </div>
  );
}

export default function OrbitalMechanicsPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Header with Metadata Sidebar */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16'>
          {/* Left column - Title and description */}
          <div className='lg:col-span-2'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]'>
              The Geometry of Getting There
            </h1>
            <p className='text-lg md:text-xl lg:text-2xl font-normal text-black/70 mt-2'>
              Orbital mechanics and the path to the Moon
            </p>
            <p className='text-base text-black/70 max-w-3xl mt-6 md:mt-8 lg:mt-12'>
              Spacecraft don&apos;t travel in straight lines. They fall - in carefully calculated curves that trade altitude for speed and speed for altitude. This interactive explainer unpacks the physics of orbital transfers, from the elegant Hohmann ellipse to the real mission profiles of Apollo and Artemis.
            </p>
            {/* Tags */}
            <div className='flex flex-wrap gap-2 mt-4 md:mt-6 lg:mt-8'>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Interactive</span>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Science</span>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Space</span>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Mxwll</span>
            </div>
          </div>

          {/* Right column - Portfolio Metadata */}
          <div className='space-y-6'>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Category
              </span>
              <span className='text-sm'>Interactive Design</span>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Audience
              </span>
              <MetadataDropdown title='Space enthusiasts and students'>
                <p>Anyone curious about how spacecraft actually navigate. From students learning orbital mechanics to enthusiasts following Artemis missions. No calculus required.</p>
              </MetadataDropdown>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Approach
              </span>
              <MetadataDropdown>
                <p>Four interactive components build understanding progressively: mission overview, animated transfer, parameter exploration, and real mission profiles. Abstract mathematics becomes visible trajectories.</p>
              </MetadataDropdown>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Adaptability
              </span>
              <MetadataDropdown>
                <p>The same framework applies to any trajectory optimisation problem: interplanetary transfers, satellite constellations, rendezvous and docking. The physics is universal.</p>
              </MetadataDropdown>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Technology
              </span>
              <span className='text-sm'>React, TypeScript, SVG</span>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Data
              </span>
              <span className='text-sm text-black/70'>NASA mission profiles, JPL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Static Mission Map */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='border border-black/10 overflow-hidden'>
          <MissionMap />
        </div>
      </section>

      {/* Section 2: Animated Transfer */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='border border-black/10 overflow-hidden'>
          <TransferAnimation />
        </div>
        <p className='text-xs md:text-sm text-black/50 mt-4 max-w-2xl'>
          Scrub through time to see how velocity and altitude change during a lunar transfer.
          Notice how the spacecraft slows as it climbs out of Earth&apos;s gravity well.
        </p>
      </section>

      {/* Section 3: Transfer Designer */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='border border-black/10 overflow-hidden'>
          <TransferDesigner />
        </div>
        <p className='text-xs md:text-sm text-black/50 mt-4 max-w-2xl'>
          Adjust the orbital parameters to see how {'\u0394'}v requirements change.
          For very distant targets (ratio {'>'} 11.94), a bi-elliptic transfer becomes more efficient than Hohmann - at the cost of much longer travel time.
        </p>
      </section>

      {/* Section 4: Mission Storyboard */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='border border-black/10 overflow-hidden'>
          <MissionStoryboard />
        </div>
      </section>

      {/* Content sections */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12 mb-8'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
            The Challenge
          </h2>
          <p className='text-black/70 leading-relaxed'>
            Orbital mechanics is counterintuitive. To go faster, you fire your engine backward. To catch something ahead of you, you slow down first. To reach the Moon, you don&apos;t point at it - you aim at where it will be in three days. For Mxwll, we wanted to build interactive tools that make these dynamics visible, grounding the abstract mathematics in animated trajectories and real mission data.
          </p>
        </div>
      </section>

      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
            Background
          </h2>
          <div className='space-y-4 text-black/70 leading-relaxed'>
            <p>
              The Hohmann transfer, discovered in 1925, is the most fuel-efficient way to move between two circular orbits. It uses two engine burns: one to enter an elliptical transfer orbit, and another to circularize at the destination. The elegance lies in timing the burns at specific points - periapsis and apoapsis - where velocity changes have maximum effect.
            </p>
            <p>
              This efficiency comes from the Oberth effect: a rocket engine produces more useful energy when the spacecraft is already moving fast. Burning deep in a gravity well (close to a planet) is more efficient than burning far away. It&apos;s why spacecraft don&apos;t just point at their destination and fire - they follow curves that exploit gravitational dynamics.
            </p>
            <p>
              Real missions add complexity. The Moon is moving, so timing matters. The spacecraft needs to arrive when the Moon is actually there. Artemis missions use an even more complex trajectory - a near-rectilinear halo orbit (NRHO) that balances fuel efficiency, communication, and the geometry of lunar operations.
            </p>
          </div>
        </div>
      </section>

      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
            Related Projects
          </h2>
          <ul className='space-y-2 text-sm'>
            <li>
              <a href='/work/stellar-evolution' className='text-black/70 hover:text-[var(--color-pink)] transition-colors'>
                Stellar Evolution →
              </a>
            </li>
            <li>
              <a href='/work/nuclide-chart' className='text-black/70 hover:text-[var(--color-pink)] transition-colors'>
                Chart of Nuclides →
              </a>
            </li>
            <li>
              <a href='/work/fractals' className='text-black/70 hover:text-[var(--color-pink)] transition-colors'>
                Fractals →
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
