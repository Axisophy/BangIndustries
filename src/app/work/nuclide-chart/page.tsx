import NuclideChart from './NuclideChart';

export const metadata = {
  title: 'Mapping Instability — Bang Industries',
  description: 'An interactive exploration of all 3,300+ known isotopes, mapped by protons and neutrons.',
};

export default function NuclideChartPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-4 md:px-6 pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16">
        <div className="max-w-[75%]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Mapping Instability
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-normal text-black/70 mt-2">
            Charting 3,300 atomic species
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-black/70 max-w-3xl mt-12 mb-8">
            The periodic table shows 118 elements - but that is only part of the story. Each element can exist in multiple forms, with different numbers of neutrons creating different isotopes. Some are stable. Most are not. This interactive chart maps all 3,300+ known nuclear species, revealing the narrow ridge of stability that runs through a vast terrain of radioactive decay.
          </p>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs bg-black/5 text-black/60">Interactive</span>
            <span className="px-3 py-1 text-xs bg-black/5 text-black/60">Science</span>
            <span className="px-3 py-1 text-xs bg-black/5 text-black/60">Data visualisation</span>
            <span className="px-3 py-1 text-xs bg-black/5 text-black/60">Mxwll</span>
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="px-4 md:px-6 pb-16 md:pb-20">
        <div className="border border-black/10 bg-white overflow-hidden">
          <div className="h-[750px] lg:h-[875px]">
            <NuclideChart className="h-full" />
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className="px-4 md:px-6 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-3 gap-24 lg:gap-32">

          {/* Left column - main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* The Challenge */}
            <div>
              <h2 className="text-sm font-bold tracking-tight mb-6">
                The Challenge
              </h2>
              <p className="text-black/70 leading-relaxed">
                Mxwll needed an interactive map of all known nuclides - something that could work equally well on mobile and desktop, handle 3,300+ data points without performance issues, and make the underlying physics accessible to non-specialists. The standard chart of nuclides is a dense wall of coloured squares. The challenge was to preserve the scientific accuracy while creating something explorable and engaging.
              </p>
            </div>

            {/* Background */}
            <div>
              <h2 className="text-sm font-bold tracking-tight mb-6">
                Background
              </h2>
              <div className="space-y-4 text-black/70 leading-relaxed">
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

            {/* Approach */}
            <div>
              <h2 className="text-sm font-bold tracking-tight mb-6">
                Approach
              </h2>
              <div className="space-y-4 text-black/70 leading-relaxed">
                <p>
                  The interface needed to support multiple ways of exploring the data. Pan and zoom allow navigation across the full chart. Hover reveals individual nuclide details without interrupting flow. Click opens a detailed panel with decay mode, half-life, natural abundance, and related isotopes.
                </p>
                <p>
                  Two colour modes - by decay type and by half-life - let users see different patterns in the same data. The element filter isolates individual rows for focused study. Magic number guidelines can be toggled to highlight the structural physics.
                </p>
                <p>
                  The legend adapts to the active colour mode, and the detail panel provides progressive disclosure - basic facts visible immediately, with deeper information available for those who want it.
                </p>
              </div>
            </div>

            {/* Adaptability */}
            <div>
              <h2 className="text-sm font-bold tracking-tight mb-6">
                Adaptability
              </h2>
              <p className="text-black/70 leading-relaxed">
                The same pattern - canvas-based rendering with progressive disclosure panels - could apply to any dense categorical dataset: gene expression matrices, materials databases, taxonomic classifications, or historical event timelines.
              </p>
            </div>

            {/* Related Projects */}
            <div>
              <h2 className="text-sm font-bold tracking-tight mb-6">
                Related Projects
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="/work/periodic-table" className="text-black/70 hover:text-[var(--color-pink)] transition-colors">
                    Periodic Table →
                  </a>
                </li>
                <li>
                  <a href="/work/stellar-evolution" className="text-black/70 hover:text-[var(--color-pink)] transition-colors">
                    Stellar Evolution →
                  </a>
                </li>
                <li>
                  <a href="/work/particle-physics" className="text-black/70 hover:text-[var(--color-pink)] transition-colors">
                    Standard Model →
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Right column - metadata */}
          <div className="space-y-8">

            {/* Technology */}
            <div>
              <h2 className="text-sm font-bold tracking-tight mb-6">
                Technology
              </h2>
              <p className="text-sm text-black/70 leading-relaxed">
                React, TypeScript, HTML Canvas. Custom rendering for precise control over visual encoding and interaction. No external charting libraries.
              </p>
            </div>

            {/* Data */}
            <div>
              <h2 className="text-sm font-bold tracking-tight mb-6">
                Data
              </h2>
              <p className="text-sm text-black/70 leading-relaxed">
                IAEA Nuclear Data Services, National Nuclear Data Center (NNDC), Atomic Mass Evaluation (AME2020).
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
