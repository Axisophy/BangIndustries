import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Bang Industries',
  description: 'Bang Industries is a design practice specialising in explanation design for complex systems. Founded by Simon Tyler, combining deep subject understanding with illustration, data visualisation, and interactive design.',
  alternates: {
    canonical: 'https://bangindustries.co/about',
  },
};

export default function AboutPage() {
  return (
    <main className='min-h-screen'>
      {/* Intro Section */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          <div>
            <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]'>
              Making complex ideas clear
            </h1>
          </div>
          <div>
            <p className='text-lg md:text-xl text-white/70 mb-8'>
              Bang Industries is a design practice specialising in explanation design
              for complex systems. We work with research institutions, publishers,
              museums, and organisations who need to communicate difficult ideas
              with clarity and precision.
            </p>
            <p className='text-white/70'>
              Founded by Simon Tyler, the practice combines deep subject understanding
              with illustration, data visualisation, and interactive design. We don&apos;t
              just make things look good. We make them make sense.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          <div>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
              Our Approach
            </h2>
          </div>
          <div>
            <p className='text-white/70 mb-8'>
              Most explanation fails not because the designer lacks skill, but because they suffer from the curse of knowledge. They&apos;ve forgotten what it&apos;s like not to understand.
            </p>
            <p className='text-white/70 mb-8'>
              Our methodology is built on cognitive science research into how people actually learn:
            </p>

            <div className='space-y-8'>
              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>The Information Gap</h3>
                <p className='text-white/70'>
                  Curiosity is triggered by awareness of what you don&apos;t know. Effective explanation first establishes an intriguing gap, then progressively fills it while maintaining engagement. We design for the moment when understanding clicks.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Working Memory Limits</h3>
                <p className='text-white/70'>
                  People can hold 3-4 unfamiliar concepts simultaneously. Expert explanations fail because they assume &quot;chunks&quot; the audience doesn&apos;t possess. We audit for cognitive overload and restructure accordingly.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Concrete Before Abstract</h3>
                <p className='text-white/70'>
                  Abstraction is where understanding lives, but concrete examples are how you get there. We sequence every explanation from tangible to theoretical.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>The Expertise Reversal</h3>
                <p className='text-white/70'>
                  Techniques that help novices can actually harm expert comprehension. There&apos;s no universal &quot;good explanation&quot; - only explanations calibrated to specific audiences. This is why we increasingly build adaptive systems that meet each user where they are.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          <div>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
              Background
            </h2>
          </div>
          <div>
            <p className='text-white/70 mb-8'>
              Before founding Bang Industries, Simon led projects including the
              Network Rail wayfinding pictogram system at{' '}
              <a
                href='https://www.spaceagency-design.com/#/networkrail/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--color-blue)] hover:text-white transition-colors'
              >
                Spaceagency
              </a>
              , developing systematic visual languages for complex operational environments.
            </p>
            <p className='text-white/70 mb-8'>
              His work spans scientific illustration, data visualisation, and explanation
              design. He has written and illustrated several books, including{' '}
              <a
                href='https://www.laurenceking.com/products/gizmo'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--color-blue)] hover:text-white transition-colors'
              >
                Gizmo
              </a>
              , a visual history of gadgets and technology,{' '}
              <a
                href='https://harpercollins.co.uk/products/bugs-simon-tyler?variant=39886877884494'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--color-blue)] hover:text-white transition-colors'
              >
                Bugs
              </a>
              {' '}for HarperCollins, and{' '}
              <a
                href='https://www.faber.co.uk/product/9780571349470-emergency-vehicles/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--color-blue)] hover:text-white transition-colors'
              >
                Emergency Vehicles
              </a>
              , an illustrated children&apos;s book for Faber &amp; Faber.
            </p>
            <p className='text-white/70 mb-8'>
              He also creates scientific visualisation products through{' '}
              <a
                href='https://axisophy.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--color-blue)] hover:text-white transition-colors'
              >
                Axisophy
              </a>
              , and explores computational art and generative systems at{' '}
              <a
                href='https://elxsis.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--color-blue)] hover:text-white transition-colors'
              >
                Elxsis
              </a>
              .
            </p>
            <p className='text-white/70'>
              <a
                href='https://simontyler.co.uk'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--color-blue)] hover:text-white transition-colors inline-flex items-center gap-2'
              >
                View illustration and publishing work <span aria-hidden='true'>→</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* What We Bring Section */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          <div>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
              What We Bring
            </h2>
          </div>
          <div>
            <p className='text-white/70 mb-8'>
              Most data visualisation studios have designers or developers. Rarely both. Almost never someone who can engage deeply with the content itself.
            </p>
            <p className='text-white/70 mb-8'>
              We combine five capabilities that don&apos;t usually coexist:
            </p>

            <div className='space-y-8'>
              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Subject Understanding</h3>
                <p className='text-white/70'>
                  Scientific and technical literacy that lets us engage with complex content directly, not just make it look presentable.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Illustration</h3>
                <p className='text-white/70'>
                  Actual drawing skills. Bespoke visual systems, not just charts and templates.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Systems Architecture</h3>
                <p className='text-white/70'>
                  Pictogram sets, visual languages, design frameworks. Work that scales and maintains consistency.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Technical Build</h3>
                <p className='text-white/70'>
                  D3.js, React, Python, Observable. We prototype, build, and deploy - not just design and hand off.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Author Credibility</h3>
                <p className='text-white/70'>
                  Published books demonstrate proven ability to explain complex ideas to general audiences. Not just a claim, but evidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          <div>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
              How We Work
            </h2>
          </div>
          <div>
            <ol className='space-y-8'>
              <li className='flex gap-4'>
                <span className='text-xs font-mono text-white/50 pt-1'>01</span>
                <div>
                  <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-1'>Discovery</h3>
                  <p className='text-white/70'>
                    Understanding the subject, audience, and constraints.
                    What are we explaining? To whom? What do they need to understand or do?
                  </p>
                </div>
              </li>
              <li className='flex gap-4'>
                <span className='text-xs font-mono text-white/50 pt-1'>02</span>
                <div>
                  <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-1'>Concept Sketches</h3>
                  <p className='text-white/70'>
                    Rapid exploration of visual approaches. Finding the right metaphor,
                    structure, and hierarchy before committing to execution.
                  </p>
                </div>
              </li>
              <li className='flex gap-4'>
                <span className='text-xs font-mono text-white/50 pt-1'>03</span>
                <div>
                  <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-1'>System Definition</h3>
                  <p className='text-white/70'>
                    Establishing the visual language, rules, and components.
                    Ensuring consistency and scalability across outputs.
                  </p>
                </div>
              </li>
              <li className='flex gap-4'>
                <span className='text-xs font-mono text-white/50 pt-1'>04</span>
                <div>
                  <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-1'>Production</h3>
                  <p className='text-white/70'>
                    Building the final outputs, whether static graphics,
                    interactive visualisations, or complete design systems.
                  </p>
                </div>
              </li>
              <li className='flex gap-4'>
                <span className='text-xs font-mono text-white/50 pt-1'>05</span>
                <div>
                  <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-1'>Handover</h3>
                  <p className='text-white/70'>
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
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          <div>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
              Principles
            </h2>
          </div>
          <div className='space-y-8'>
            <div>
              <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Accuracy First</h3>
              <p className='text-white/70'>
                Sources, assumptions, and uncertainty are handled explicitly. Beautiful visualisation means nothing if the underlying information is wrong. We engage deeply with subject matter because you cannot explain what you do not understand.
              </p>
            </div>
            <div>
              <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Clarity Over Decoration</h3>
              <p className='text-white/70'>
                Every element should earn its place. The data-ink ratio matters, but so does engagement. Tufte&apos;s minimalism is right for analysis, wrong for public communication. We balance precision with memorability.
              </p>
            </div>
            <div>
              <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Audience-Calibrated</h3>
              <p className='text-white/70'>
                The same concept explained to a policymaker, a student, and an expert requires three fundamentally different approaches. We diagnose your audience before designing your explanation.
              </p>
            </div>
            <div>
              <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Systems Thinking</h3>
              <p className='text-white/70'>
                One-off graphics are fine, but the real value is in visual systems that scale. Pictogram sets, design frameworks, reusable explanation patterns. Work that compounds.
              </p>
            </div>
            <div>
              <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Evidence-Based Design</h3>
              <p className='text-white/70'>
                We make design decisions based on perceptual research: Cleveland&apos;s accuracy hierarchy for encoding, Bertin&apos;s visual variables, ColorBrewer&apos;s tested palettes. Craft informed by science.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='max-w-xl'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4'>
            Have a project in mind?
          </h2>
          <p className='text-white/70 mb-8'>
            We work with research institutions, publishers, museums, and organisations
            who need to communicate complex information clearly.
          </p>
          <a
            href='/contact'
            className='inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-display hover:bg-[var(--color-blue)] hover:text-white transition-colors'
          >
            Get in touch <span aria-hidden='true'>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
