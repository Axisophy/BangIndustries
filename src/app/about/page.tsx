export default function AboutPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Intro Section */}
      <section className='px-4 md:px-6 pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16'>
          <div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]'>
              Making complex ideas clear
            </h1>
          </div>
          <div>
            <p className='text-lg md:text-xl text-black/80 mb-8'>
              Bang Industries is a design practice specialising in explanation design
              for complex systems. We work with research institutions, publishers,
              museums, and organisations who need to communicate difficult ideas
              with clarity and precision.
            </p>
            <p className='text-black/60'>
              Founded by Simon Tyler, the practice combines deep subject understanding
              with illustration, data visualisation, and interactive design. We don&apos;t
              just make things look good — we make them make sense.
            </p>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className='px-4 md:px-6 pb-16 md:pb-20 border-t border-black/10 pt-12 md:pt-16 lg:pt-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16'>
          <div>
            <h2 className='text-2xl md:text-3xl font-bold tracking-tight'>
              Background
            </h2>
          </div>
          <div>
            <p className='text-black/80 mb-8'>
              Before founding Bang Industries, Simon led projects including the
              Network Rail wayfinding pictogram system at{' '}
              <a
                href='https://www.spaceagency-design.com/#/networkrail/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--color-blue)] hover:text-black transition-colors'
              >
                Spaceagency
              </a>
              , developing systematic visual languages for complex operational environments.
            </p>
            <p className='text-black/80 mb-8'>
              His work spans scientific illustration, data visualisation, and explanation
              design — including multiple published books and the Atomic Printworks series
              of scientific visualisation posters.
            </p>
            <p className='text-black/60'>
              <a
                href='https://simontyler.co.uk'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--color-blue)] hover:text-black transition-colors inline-flex items-center gap-2'
              >
                View illustration and publishing work <span aria-hidden='true'>→</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* How I Work Section */}
      <section className='px-4 md:px-6 pb-16 md:pb-20 border-t border-black/10 pt-12 md:pt-16 lg:pt-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16'>
          <div>
            <h2 className='text-2xl md:text-3xl font-bold tracking-tight'>
              How I work
            </h2>
          </div>
          <div>
            <ol className='space-y-8'>
              <li className='flex gap-4'>
                <span className='text-xs font-mono text-black/40 pt-1'>01</span>
                <div>
                  <h3 className='text-xl md:text-2xl font-bold tracking-tight mb-1'>Discovery</h3>
                  <p className='text-black/60'>
                    Understanding the subject, audience, and constraints.
                    What are we explaining? To whom? What do they need to understand or do?
                  </p>
                </div>
              </li>
              <li className='flex gap-4'>
                <span className='text-xs font-mono text-black/40 pt-1'>02</span>
                <div>
                  <h3 className='text-xl md:text-2xl font-bold tracking-tight mb-1'>Concept sketches</h3>
                  <p className='text-black/60'>
                    Rapid exploration of visual approaches. Finding the right metaphor,
                    structure, and hierarchy before committing to execution.
                  </p>
                </div>
              </li>
              <li className='flex gap-4'>
                <span className='text-xs font-mono text-black/40 pt-1'>03</span>
                <div>
                  <h3 className='text-xl md:text-2xl font-bold tracking-tight mb-1'>System definition</h3>
                  <p className='text-black/60'>
                    Establishing the visual language, rules, and components.
                    Ensuring consistency and scalability across outputs.
                  </p>
                </div>
              </li>
              <li className='flex gap-4'>
                <span className='text-xs font-mono text-black/40 pt-1'>04</span>
                <div>
                  <h3 className='text-xl md:text-2xl font-bold tracking-tight mb-1'>Production</h3>
                  <p className='text-black/60'>
                    Building the final outputs — whether static graphics,
                    interactive visualisations, or complete design systems.
                  </p>
                </div>
              </li>
              <li className='flex gap-4'>
                <span className='text-xs font-mono text-black/40 pt-1'>05</span>
                <div>
                  <h3 className='text-xl md:text-2xl font-bold tracking-tight mb-1'>Handover</h3>
                  <p className='text-black/60'>
                    Delivering files, documentation, and guidelines.
                    Ensuring you can maintain and extend the work.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className='px-4 md:px-6 pb-16 md:pb-20 border-t border-black/10 pt-12 md:pt-16 lg:pt-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16'>
          <div>
            <h2 className='text-2xl md:text-3xl font-bold tracking-tight'>
              Principles
            </h2>
          </div>
          <div className='space-y-8'>
            <div>
              <h3 className='text-xl md:text-2xl font-bold tracking-tight mb-1'>Accuracy matters</h3>
              <p className='text-black/60'>
                Sources, assumptions, and uncertainty are handled explicitly.
                Beautiful visualisation means nothing if the underlying information is wrong.
              </p>
            </div>
            <div>
              <h3 className='text-xl md:text-2xl font-bold tracking-tight mb-1'>Clarity over decoration</h3>
              <p className='text-black/60'>
                Every element should earn its place. If it doesn&apos;t help understanding,
                it&apos;s noise.
              </p>
            </div>
            <div>
              <h3 className='text-xl md:text-2xl font-bold tracking-tight mb-1'>Systems thinking</h3>
              <p className='text-black/60'>
                One-off graphics are fine, but the real value is in visual systems
                that scale across multiple outputs and contexts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='px-4 md:px-6 pb-16 md:pb-20 border-t border-black/10 pt-12 md:pt-16 lg:pt-20'>
        <div className='max-w-xl'>
          <h2 className='text-2xl md:text-3xl font-bold tracking-tight mb-4'>
            Have a project in mind?
          </h2>
          <p className='text-black/60 mb-8'>
            I work with research institutions, publishers, museums, and organisations
            who need to communicate complex information clearly.
          </p>
          <a
            href='/contact'
            className='inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-display hover:bg-[var(--color-blue)] transition-colors'
          >
            Get in touch <span aria-hidden='true'>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
