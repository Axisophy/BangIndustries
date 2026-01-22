export default function ServicesPage() {
  return (
    <>
      {/* White space below header */}
      <div className="h-16 md:h-24" />

      {/* Intro Section */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl">
              Services
            </h1>
          </div>
          <div>
            <p className="text-lg md:text-xl text-black/80">
              Explanation design for complex systems. From quick audits
              to full interactive builds, structured around what you need
              to communicate and who needs to understand it.
            </p>
          </div>
        </div>
      </section>

      {/* Service 1: Audit + Sprint */}
      <section className="px-4 md:px-6 pb-16 md:pb-24 border-t border-black/10 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <span className="text-xs font-mono text-black/40 block mb-4">[01]</span>
            <h2 className="font-display text-2xl md:text-3xl">
              Visual Audit + Redesign Sprint
            </h2>
          </div>
          <div>
            <p className="text-black/80 mb-6">
              A focused review of your existing materials — reports, presentations,
              publications, data outputs — followed by redesigned samples showing
              what&apos;s possible. Includes a recommendations document outlining
              priorities and next steps.
            </p>
            <p className="text-black/80 mb-8">
              Often the fastest way to see whether we&apos;re a good fit, and frequently
              converts into longer engagements once you see the potential.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-black/10">
                <span className="text-sm font-mono text-black/60">Timeline</span>
                <span className="text-sm">3–5 days</span>
              </div>
              <div className="flex justify-between py-3 border-b border-black/10">
                <span className="text-sm font-mono text-black/60">Investment</span>
                <span className="text-sm">£2,500–4,000</span>
              </div>
              <div className="flex justify-between py-3 border-b border-black/10">
                <span className="text-sm font-mono text-black/60">You get</span>
                <span className="text-sm text-right max-w-xs">Audit report, 2–3 redesigned samples, recommendations</span>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-[var(--color-blue)] hover:text-black transition-colors"
            >
              Discuss a sprint <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Service 2: Explanation Design */}
      <section className="px-4 md:px-6 pb-16 md:pb-24 border-t border-black/10 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <span className="text-xs font-mono text-black/40 block mb-4">[02]</span>
            <h2 className="font-display text-2xl md:text-3xl">
              Explanation Design
            </h2>
          </div>
          <div>
            <p className="text-black/80 mb-6">
              Taking a complex topic and making it clear through visual design.
              This might be a research finding that needs to reach a public audience,
              a technical process that needs documenting, or data that needs to
              tell a story.
            </p>
            <p className="text-black/80 mb-8">
              Includes subject research, concept development, and production of
              final outputs — static graphics, illustrated diagrams, or lightly
              interactive pieces.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-black/10">
                <span className="text-sm font-mono text-black/60">Timeline</span>
                <span className="text-sm">2–4 weeks</span>
              </div>
              <div className="flex justify-between py-3 border-b border-black/10">
                <span className="text-sm font-mono text-black/60">Investment</span>
                <span className="text-sm">£5,000–15,000</span>
              </div>
              <div className="flex justify-between py-3 border-b border-black/10">
                <span className="text-sm font-mono text-black/60">You get</span>
                <span className="text-sm text-right max-w-xs">Research synthesis, visual system, production files</span>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-[var(--color-blue)] hover:text-black transition-colors"
            >
              Discuss a project <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Service 3: Interactive System */}
      <section className="px-4 md:px-6 pb-16 md:pb-24 border-t border-black/10 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <span className="text-xs font-mono text-black/40 block mb-4">[03]</span>
            <h2 className="font-display text-2xl md:text-3xl">
              Interactive System
            </h2>
          </div>
          <div>
            <p className="text-black/80 mb-6">
              Full web-based interactive visualisations and explorable explanations.
              For when static outputs aren&apos;t enough — when users need to filter,
              zoom, compare, or discover relationships in data themselves.
            </p>
            <p className="text-black/80 mb-8">
              Built with D3.js, React, and modern web technologies. Includes data
              pipeline development if needed, deployment, and technical handover
              documentation.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-black/10">
                <span className="text-sm font-mono text-black/60">Timeline</span>
                <span className="text-sm">4–8 weeks</span>
              </div>
              <div className="flex justify-between py-3 border-b border-black/10">
                <span className="text-sm font-mono text-black/60">Investment</span>
                <span className="text-sm">£15,000–30,000+</span>
              </div>
              <div className="flex justify-between py-3 border-b border-black/10">
                <span className="text-sm font-mono text-black/60">You get</span>
                <span className="text-sm text-right max-w-xs">Deployed interactive, source code, documentation</span>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-[var(--color-blue)] hover:text-black transition-colors"
            >
              Discuss a build <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Retainer note */}
      <section className="px-4 md:px-6 pb-16 md:pb-24 border-t border-black/10 pt-16 md:pt-24 bg-black text-white -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">
              Ongoing relationships
            </h2>
          </div>
          <div>
            <p className="text-white/80 mb-6">
              For organisations with continuous visualisation needs — research groups,
              publications, science communication teams — retained relationships
              provide dedicated capacity and priority scheduling.
            </p>
            <p className="text-white/60">
              Typically structured as a monthly commitment with agreed days included.
              Get in touch to discuss what would work for your team.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl md:text-3xl mb-4">
            Not sure which is right?
          </h2>
          <p className="text-black/60 mb-6">
            Start with a conversation. Tell me what you&apos;re trying to communicate
            and we&apos;ll figure out the best approach together.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-display hover:bg-[var(--color-blue)] transition-colors"
          >
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
