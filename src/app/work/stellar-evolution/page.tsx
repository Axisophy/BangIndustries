import HRDiagram from './HRDiagram';

export const metadata = {
  title: 'The Main Sequence and Beyond — Bang Industries',
  description: 'Mapping stellar evolution with GAIA data. Exploring different approaches to visualising five million stars on the Hertzsprung-Russell diagram.',
  alternates: {
    canonical: 'https://bangindustries.co/work/stellar-evolution',
  },
};

export default function StellarEvolutionPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 lg:pb-16'>
        <div className='max-w-full lg:max-w-[75%]'>
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
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Interactive</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Science</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Data visualisation</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Mxwll</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>GAIA</span>
          </div>
        </div>
      </section>

      {/* Static images — 2x2 grid */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
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
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <h2 className='text-4xl font-bold tracking-tight mb-6'>Interactive: Well-Known Stars</h2>
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
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 xl:gap-24'>

          {/* Left column — main content */}
          <div className='lg:col-span-2 space-y-8 md:space-y-10 lg:space-y-12'>

            {/* The Challenge */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                The Challenge
              </h2>
              <p className='text-black/70 leading-relaxed'>
                Every astronomy textbook includes an HR diagram, but most versions are static, cluttered with labels, or assume prior knowledge. For Mxwll, we needed approaches that could work at different levels - from a striking data visualisation showing millions of stars, to an accessible interactive where users could explore individual stars and understand what the diagram reveals about stellar physics.
              </p>
            </div>

            {/* Background */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
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

            {/* Approach */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Approach
              </h2>
              <div className='space-y-4 text-black/70 leading-relaxed'>
                <p>
                  We explored four complementary visualisation strategies:
                </p>
                <p>
                  Point clouds show every star as an individual dot. With five million points, the sheer density reveals structure - the main sequence appears as a bright ridge simply because that is where most stars are. This approach preserves outliers and extremes.
                </p>
                <p>
                  Density maps (hexbin) aggregate points into cells coloured by count. Structure becomes clearer, and rendering is faster, but individual stars disappear into the statistics.
                </p>
                <p>
                  The famous stars overlay plots well-documented stars - Sirius, Betelgeuse, Proxima Centauri - as labelled points. This creates landmarks for orientation and lets users connect abstract positions to real objects in the night sky.
                </p>
                <p>
                  The evolution pathway shows how a single star moves through the diagram over billions of years. Our Sun, currently on the main sequence, will expand into a red giant, shed its outer layers, and end as a white dwarf. Seeing this trajectory makes the diagram&apos;s deeper meaning visible.
                </p>
              </div>
            </div>

            {/* Adaptability */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Adaptability
              </h2>
              <p className='text-black/70 leading-relaxed'>
                The layered approach - dense data renders plus selective annotation plus animated explanation - could apply to any classification space where both the population distribution and individual examples matter: species distributions in trait space, materials in property space, financial instruments in risk-return space.
              </p>
            </div>

            {/* Related Projects */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Related Projects
              </h2>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a href='/work/nuclide-chart' className='text-black/70 hover:text-[var(--color-pink)] transition-colors'>
                    Chart of Nuclides →
                  </a>
                </li>
                <li>
                  <a href='/work/periodic-table' className='text-black/70 hover:text-[var(--color-pink)] transition-colors'>
                    Periodic Table →
                  </a>
                </li>
                <li>
                  <a href='/work/exoplanet-systems' className='text-black/70 hover:text-[var(--color-pink)] transition-colors'>
                    Exoplanet Systems →
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Right column — metadata */}
          <div className='space-y-6 md:space-y-8'>

            {/* Technology */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Technology
              </h2>
              <p className='text-sm text-black/70 leading-relaxed'>
                Python/Matplotlib for static renders, React/SVG for interactive diagram. GAIA data cached locally for rapid iteration.
              </p>
            </div>

            {/* Data */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Data
              </h2>
              <p className='text-sm text-black/70 leading-relaxed'>
                European Space Agency GAIA DR3 (5 million stars with reliable parallax measurements). Well-known star properties from SIMBAD astronomical database.
              </p>
            </div>

            {/* Status */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Status
              </h2>
              <p className='text-sm text-black/70 leading-relaxed'>
                Static visualisations complete. Interactive explorer functional. Full integration with Mxwll stellar database in development.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
