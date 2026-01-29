'use client';

import { useState } from 'react';
import HRDiagram from './HRDiagram';

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

export default function StellarEvolutionPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Header with Metadata Sidebar */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16'>
          {/* Left column - Title and description */}
          <div className='lg:col-span-2'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]'>
              The Main Sequence and Beyond
            </h1>
            <p className='text-lg md:text-xl lg:text-2xl font-normal text-black/70 mt-2'>
              Mapping stellar evolution with GAIA data
            </p>
            <p className='text-base text-black/70 max-w-3xl mt-6 md:mt-8 lg:mt-12'>
              The Hertzsprung-Russell diagram is astronomy&apos;s most powerful classification tool - a simple plot of temperature against brightness that reveals the life cycles of stars. Using data from the European Space Agency&apos;s GAIA mission, we explored different approaches to visualising five million stars, from raw point clouds to density maps to interactive explainers.
            </p>
            {/* Tags */}
            <div className='flex flex-wrap gap-2 mt-4 md:mt-6 lg:mt-8'>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Interactive</span>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Science</span>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Data visualisation</span>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Mxwll</span>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>GAIA</span>
            </div>
          </div>

          {/* Right column - Portfolio Metadata */}
          <div className='space-y-6'>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Category
              </span>
              <span className='text-sm'>Data Visualisation</span>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Audience
              </span>
              <MetadataDropdown title='Astronomy enthusiasts and educators'>
                <p>People curious about stellar physics, from students encountering the HR diagram for the first time to educators looking for interactive teaching tools.</p>
              </MetadataDropdown>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Approach
              </span>
              <MetadataDropdown>
                <p>We created four complementary views of the same data: point clouds for preserving individual stars, density maps for revealing structure, famous star overlays for orientation, and evolution pathways for understanding stellar lifecycles.</p>
              </MetadataDropdown>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Adaptability
              </span>
              <MetadataDropdown>
                <p>The layered approach - dense data renders plus selective annotation plus animated explanation - applies to any classification space where both population distribution and individual examples matter.</p>
              </MetadataDropdown>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Technology
              </span>
              <span className='text-sm'>Python, Matplotlib, React, SVG</span>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Data
              </span>
              <span className='text-sm text-black/70'>ESA GAIA DR3, SIMBAD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Static images - 2x2 grid */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Image 1: Full range point cloud */}
          <img
            src='/images/work/stellar-evolution/hr_full_scatter.png'
            alt='HR diagram - full range point cloud'
            className='w-full h-auto'
          />

          {/* Image 2: Full range density */}
          <img
            src='/images/work/stellar-evolution/hr_full_hexbin.png'
            alt='HR diagram - full range density map'
            className='w-full h-auto'
          />

          {/* Image 3: Main sequence point cloud */}
          <img
            src='/images/work/stellar-evolution/hr_mainseq_scatter.png'
            alt='HR diagram - main sequence point cloud'
            className='w-full h-auto'
          />

          {/* Image 4: Main sequence density */}
          <img
            src='/images/work/stellar-evolution/hr_mainseq_hexbin.png'
            alt='HR diagram - main sequence density map'
            className='w-full h-auto'
          />
        </div>

        {/* Caption */}
        <p className='text-xs md:text-sm text-black/50 mt-4 max-w-2xl'>
          Four views of the same dataset: five million stars from GAIA DR3. Top row shows the full range from hot blue stars to cool red dwarfs. Bottom row zooms into the main sequence where most stars spend their lives. Left column shows individual points; right column shows density.
        </p>
      </section>

      {/* Interactive: Famous Stars */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='border border-black/10 bg-white overflow-hidden'>
          <div className='h-[400px] md:h-[600px] lg:h-[700px]'>
            <HRDiagram className='w-full h-full' showEvolution={true} />
          </div>
        </div>
        <p className='text-xs md:text-sm text-black/50 mt-4 max-w-2xl'>
          Click any star for details. Toggle categories to isolate different stellar types. The evolution pathway shows how our Sun will move through the diagram over its 12-billion-year lifetime.
        </p>
      </section>

      {/* Content sections */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12 mb-8'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
            The Challenge
          </h2>
          <p className='text-black/70 leading-relaxed'>
            Every astronomy textbook includes an HR diagram, but most versions are static, cluttered with labels, or assume prior knowledge. For Mxwll, we needed approaches that could work at different levels - from a striking data visualisation showing millions of stars, to an accessible interactive where users could explore individual stars and understand what the diagram reveals about stellar physics.
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
              The Hertzsprung-Russell diagram plots stars by two properties: surface temperature (or colour) and luminosity (or absolute magnitude). Hot blue stars sit on the left; cool red stars on the right. Bright stars sit at the top; dim stars at the bottom.
            </p>
            <p>
              What emerges is not a random scatter but distinct structures. The main sequence - a diagonal band from hot-bright to cool-dim - contains stars in the hydrogen-burning phase of their lives, including our Sun. Red giants cluster in the upper right: cooler but enormously luminous because of their size. White dwarfs huddle in the lower left: hot but dim because they are tiny stellar remnants.
            </p>
            <p>
              The diagram is effectively a map of stellar evolution. Stars do not stay in one place - they move through the diagram as they age, spending most of their time on the main sequence before expanding into giants and eventually collapsing into white dwarfs or exploding as supernovae.
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
