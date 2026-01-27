'use client';

import { NetworkComparison } from './components/NetworkComparison';
import { AttackSimulation } from './components/AttackSimulation';
import { EpidemicSimulation } from './components/EpidemicSimulation';

export default function NetworkTheoryPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 lg:pb-16'>
        <div className='max-w-full lg:max-w-[75%]'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]'>
            Fragile by Design
          </h1>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-black/70 mt-2'>
            How topology shapes resilience, epidemics, and information flow
          </p>
          <p className='text-base text-black/70 max-w-3xl mt-6 md:mt-8 lg:mt-12'>
            Not all networks fail the same way. A random network degrades gracefully under attack. A scale-free network - the topology of the internet, airline routes, and social graphs - can survive random failures but collapses catastrophically when its hubs are targeted. These interactive experiments make the mathematics of connection tangible.
          </p>
          {/* Tags */}
          <div className='flex flex-wrap gap-2 mt-4 md:mt-6 lg:mt-8'>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Interactive</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Systems</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Network theory</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Mxwll</span>
          </div>
        </div>
      </section>

      {/* Static image placeholder */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <div className='border border-black/10 bg-black/5 aspect-[2/1] flex items-center justify-center'>
          <span className='text-black/30 text-sm font-mono'>network_comparison_static.png</span>
        </div>
        <p className='text-xs md:text-sm text-black/50 mt-4'>
          Three canonical network topologies with identical node counts, coloured by degree.
        </p>
      </section>

      {/* Interactive: Network Topologies */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <h2 className='text-4xl font-bold tracking-tight mb-6'>Interactive: Network Topologies</h2>
        <NetworkComparison nodeCount={80} />
      </section>

      {/* Experiment: Attack vs Random Failure */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <h2 className='text-4xl font-bold tracking-tight mb-6'>Experiment: Attack vs Random Failure</h2>
        <AttackSimulation />
      </section>

      {/* Experiment: Epidemic Spread */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <h2 className='text-4xl font-bold tracking-tight mb-6'>Experiment: Epidemic Spread</h2>
        <EpidemicSimulation />
      </section>

      {/* Content sections */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 xl:gap-24'>

          {/* Left column - main content */}
          <div className='lg:col-span-2 space-y-8 md:space-y-10 lg:space-y-12'>

            {/* The Challenge */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                The Challenge
              </h2>
              <p className='text-black/70 leading-relaxed'>
                Networks are everywhere - social connections, infrastructure grids, biological pathways, the internet. But not all networks are the same. Some are resilient to random failures but collapse when targeted. Others spread information slowly but contain outbreaks. Understanding why requires understanding topology - the shape of connection itself. For Mxwll, we built interactive tools to make these abstract properties tangible.
              </p>
            </div>

            {/* Background */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Background
              </h2>
              <div className='space-y-4 text-black/70 leading-relaxed'>
                <p>
                  Three network types dominate the research literature, each with distinct properties:
                </p>
                <p>
                  Random networks (Erdos-Renyi) connect nodes with uniform probability. Degree distribution is narrow - most nodes have similar numbers of connections. Robust to any single failure, but no node is particularly important.
                </p>
                <p>
                  Scale-free networks (Barabasi-Albert) grow through preferential attachment - new nodes connect to already-popular nodes. This creates hubs with many connections and a long tail of peripheral nodes. The degree distribution follows a power law. Hubs make the network efficient but create critical vulnerabilities.
                </p>
                <p>
                  Small-world networks (Watts-Strogatz) combine local clustering with occasional long-range shortcuts. Most connections are to neighbours, but a few bridges span the network. This gives both high clustering (your friends know each other) and short path lengths (six degrees of separation).
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
                  We built three interactive experiments to make topology tangible:
                </p>
                <p>
                  The failure simulation removes nodes either randomly or by targeting the most connected. Watching scale-free networks disintegrate under targeted attack - while random networks degrade gracefully - makes the hub vulnerability viscerally clear.
                </p>
                <p>
                  The epidemic model seeds an infection and lets it spread according to network structure. Scale-free networks light up fast as hubs become superspreaders. Small-world networks show characteristic wave patterns as infections jump between clusters.
                </p>
                <p>
                  A future network builder will let users adjust parameters and watch degree distributions shift in real-time - seeing how preferential attachment creates power laws, and how rewiring transforms lattices into small worlds.
                </p>
              </div>
            </div>

            {/* Adaptability */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Adaptability
              </h2>
              <p className='text-black/70 leading-relaxed'>
                The same framework applies to any system that can be modelled as nodes and edges: supply chains (which suppliers are critical?), organisational structures (where are the bottlenecks?), infrastructure (which failures cascade?), social networks (who are the influencers?). The topology shapes the behaviour.
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
                  <a href='/work/stellar-evolution' className='text-black/70 hover:text-[var(--color-pink)] transition-colors'>
                    Stellar Evolution →
                  </a>
                </li>
                <li>
                  <a href='/work/orbital-mechanics' className='text-black/70 hover:text-[var(--color-pink)] transition-colors'>
                    Orbital Mechanics →
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Right column - metadata */}
          <div className='space-y-6 md:space-y-8'>

            {/* Technology */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Technology
              </h2>
              <p className='text-sm text-black/70 leading-relaxed'>
                React, TypeScript, SVG rendering. Custom network generation algorithms (Erdos-Renyi, Barabasi-Albert, Watts-Strogatz). Force-directed layout.
              </p>
            </div>

            {/* Data */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Data
              </h2>
              <p className='text-sm text-black/70 leading-relaxed'>
                Procedurally generated networks. Parameters calibrated to theoretical expectations for degree distributions, clustering coefficients, and path lengths.
              </p>
            </div>

            {/* Status */}
            <div>
              <h2 className='text-4xl font-bold tracking-tight mb-6'>
                Status
              </h2>
              <p className='text-sm text-black/70 leading-relaxed'>
                Core visualisations and two experiments complete. Network builder and real-world dataset overlays in development.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
