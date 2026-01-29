'use client';

import { useState } from 'react';
import NuclideChart from './NuclideChart';

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

export default function NuclideChartPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Header with Metadata Sidebar */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16'>
          {/* Left column - Title and description */}
          <div className='lg:col-span-2'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]'>
              Mapping Instability
            </h1>
            <p className='text-lg md:text-xl lg:text-2xl font-normal text-black/70 mt-2'>
              Charting 3,300 atomic species
            </p>
            <p className='text-base text-black/70 max-w-3xl mt-6 md:mt-8 lg:mt-12'>
              The periodic table shows 118 elements - but that is only part of the story. Each element can exist in multiple forms, with different numbers of neutrons creating different isotopes. Some are stable. Most are not. This interactive chart maps all 3,300+ known nuclear species, revealing the narrow ridge of stability that runs through a vast terrain of radioactive decay.
            </p>
            {/* Tags */}
            <div className='flex flex-wrap gap-2 mt-4 md:mt-6 lg:mt-8'>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Interactive</span>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Science</span>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Data visualisation</span>
              <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Mxwll</span>
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
              <MetadataDropdown title='Science enthusiasts and students'>
                <p>People curious about nuclear physics, from high school students to amateur scientists. No specialist knowledge assumed, but an appetite for detail rewarded.</p>
              </MetadataDropdown>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Approach
              </span>
              <MetadataDropdown>
                <p>The chart of nuclides is information-dense by nature - over 3,300 data points in a 2D grid. The challenge was making it navigable without losing scientific accuracy.</p>
                <p>Pan and zoom provide spatial navigation. Colour modes (decay type vs half-life) reveal different patterns in the same data. Progressive disclosure keeps the interface clean while rewarding deeper exploration.</p>
              </MetadataDropdown>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Adaptability
              </span>
              <MetadataDropdown>
                <p>The same pattern - canvas rendering with progressive disclosure panels - works for any dense categorical dataset: gene expression matrices, materials databases, taxonomic classifications.</p>
              </MetadataDropdown>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Technology
              </span>
              <span className='text-sm'>React, TypeScript, HTML Canvas</span>
            </div>
            <div>
              <span className='text-xs font-mono uppercase tracking-wider text-black/50 block mb-2'>
                Data
              </span>
              <span className='text-sm text-black/70'>IAEA Nuclear Data Services, NNDC, AME2020</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='border border-black/10 bg-white overflow-hidden'>
          <div className='h-[500px] md:h-[750px] lg:h-[875px]'>
            <NuclideChart className='h-full' />
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12 mb-8'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
            The Challenge
          </h2>
          <p className='text-black/70 leading-relaxed'>
            Mxwll needed an interactive map of all known nuclides - something that could work equally well on mobile and desktop, handle 3,300+ data points without performance issues, and make the underlying physics accessible to non-specialists. The standard chart of nuclides is a dense wall of coloured squares. The challenge was to preserve the scientific accuracy while creating something explorable and engaging.
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
              A nuclide is a specific combination of protons and neutrons in an atomic nucleus. While the periodic table groups atoms by proton count alone - defining the elements - nuclides distinguish between isotopes: atoms with the same number of protons but different numbers of neutrons. Carbon-12 and Carbon-14 are both carbon, but they are different nuclides.
            </p>
            <p>
              Stable nuclides cluster along a diagonal path called the valley of stability, where the balance of protons and neutrons creates a lasting nuclear configuration. Light elements prefer roughly equal numbers of protons and neutrons. Heavier elements need progressively more neutrons to remain stable. Step outside this valley and the nucleus becomes unstable - it will decay, emitting radiation until it reaches a stable configuration.
            </p>
            <p>
              The chart also reveals the magic numbers - 2, 8, 20, 28, 50, 82, and 126 - where nuclei with these counts of protons or neutrons are exceptionally stable. These correspond to filled nuclear shells, analogous to the electron shells that determine chemical behaviour. Lead-208, with 82 protons and 126 neutrons, is doubly magic.
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
