import NuclideChart from './NuclideChart';

export const metadata = {
  title: 'Chart of Nuclides — Bang Industries',
  description: 'An interactive exploration of all 3,300+ known isotopes, mapped by protons and neutrons.',
};

export default function NuclideChartPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-4 md:px-6 pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-12">
        <div className="max-w-[75%]">
          <p className="text-xs font-mono text-black/40 uppercase tracking-wider mb-4">
            Interactive Visualisation
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Chart of Nuclides
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-black/70 max-w-3xl">
            The periodic table shows 118 elements. This chart shows over 3,300 distinct nuclei — every known isotope of every element, mapped by protons and neutrons.
          </p>
        </div>
      </section>

      {/* Chart */}
      <section className="px-4 md:px-6 pb-12 md:pb-16">
        <div className="border border-black/10 bg-white overflow-hidden">
          <div className="h-[500px] md:h-[600px] lg:h-[700px]">
            <NuclideChart className="h-full" />
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="px-4 md:px-6 pb-12 md:pb-16 lg:pb-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4">
              What is a nuclide?
            </h2>
            <p className="text-black/70 mb-4">
              A nuclide is a specific combination of protons and neutrons in an atomic nucleus. While the periodic table groups atoms by proton count alone (elements), nuclides distinguish between isotopes — atoms with the same proton count but different neutron counts.
            </p>
            <p className="text-black/70">
              Carbon-12 and Carbon-14 are both carbon (6 protons), but they&apos;re different nuclides because C-12 has 6 neutrons while C-14 has 8.
            </p>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4">
              The valley of stability
            </h2>
            <p className="text-black/70 mb-4">
              Stable nuclides cluster along a diagonal &quot;valley&quot; where the balance of protons and neutrons creates a stable nuclear configuration. Light elements prefer equal numbers (N ≈ Z), while heavy elements need more neutrons to remain stable.
            </p>
            <p className="text-black/70">
              Nuclides outside this valley are unstable and decay toward it — neutron-rich nuclei via β⁻ decay, proton-rich nuclei via β⁺ decay or electron capture.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 md:px-6 pb-12 md:pb-16 lg:pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black p-4 md:p-6">
            <p className="text-xs font-mono text-white/50 uppercase tracking-wider mb-2">Known Nuclides</p>
            <p className="text-3xl md:text-4xl font-bold text-white">~3,300</p>
            <p className="text-sm text-white/40 mt-1">Observed to date</p>
          </div>
          <div className="bg-black p-4 md:p-6">
            <p className="text-xs font-mono text-white/50 uppercase tracking-wider mb-2">Stable Nuclides</p>
            <p className="text-3xl md:text-4xl font-bold text-white">252</p>
            <p className="text-sm text-white/40 mt-1">No observed decay</p>
          </div>
          <div className="bg-black p-4 md:p-6">
            <p className="text-xs font-mono text-white/50 uppercase tracking-wider mb-2">Elements</p>
            <p className="text-3xl md:text-4xl font-bold text-white">118</p>
            <p className="text-sm text-white/40 mt-1">Confirmed</p>
          </div>
          <div className="bg-black p-4 md:p-6">
            <p className="text-xs font-mono text-white/50 uppercase tracking-wider mb-2">Magic Numbers</p>
            <p className="text-3xl md:text-4xl font-bold text-white">7</p>
            <p className="text-sm text-white/40 mt-1">2, 8, 20, 28, 50, 82, 126</p>
          </div>
        </div>
      </section>

      {/* Technical details */}
      <section className="px-4 md:px-6 pb-12 md:pb-16 lg:pb-20 border-t border-black/10 pt-12 md:pt-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-xs font-mono text-black/40 uppercase tracking-wider mb-2">Approach</p>
            <p className="text-black/70">
              Canvas-based rendering for performance with 3,000+ data points. Pan, zoom, and touch gestures for exploration. Detail panel reveals isotope-specific information on selection.
            </p>
          </div>
          <div>
            <p className="text-xs font-mono text-black/40 uppercase tracking-wider mb-2">Technology</p>
            <p className="text-black/70">
              React, TypeScript, HTML Canvas. No external charting libraries — custom rendering for precise control over visual encoding and interaction.
            </p>
          </div>
          <div>
            <p className="text-xs font-mono text-black/40 uppercase tracking-wider mb-2">Data</p>
            <p className="text-black/70">
              IAEA Nuclear Data Services, National Nuclear Data Center (NNDC), Atomic Mass Evaluation (AME2020).
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
