'use client';

import { useState } from 'react';

function ServiceDropdown({
  number,
  title,
  shortDescription,
  timeline,
  youGet,
  ctaText,
  expandedContent,
  goodFor,
}: {
  number: string;
  title: string;
  shortDescription: string;
  timeline: string;
  youGet: string;
  ctaText: string;
  expandedContent: React.ReactNode;
  goodFor: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20 pt-8 md:pt-12 lg:pt-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
        <div>
          <span className='text-xs font-mono text-black/40 block mb-4'>[{number}]</span>
          <h2 className='text-2xl md:text-3xl font-bold tracking-tight'>
            {title}
          </h2>
        </div>
        <div>
          <p className='text-black/80 mb-8'>
            {shortDescription}
          </p>

          <div className='space-y-4 mb-8'>
            <div className='flex justify-between py-4 border-b border-black/10'>
              <span className='text-sm font-mono text-black/60'>Timeline</span>
              <span className='text-sm'>{timeline}</span>
            </div>
            <div className='flex justify-between py-4 border-b border-black/10'>
              <span className='text-sm font-mono text-black/60'>You get</span>
              <span className='text-sm text-right max-w-xs'>{youGet}</span>
            </div>
          </div>

          {/* Expandable content */}
          <div className='mb-8'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors'
            >
              <span>{isOpen ? 'Show less' : 'Learn more'}</span>
              <svg
                className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='square' strokeLinejoin='miter' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>

            {isOpen && (
              <div className='mt-6 pt-6 border-t border-black/10'>
                <div className='text-black/70 space-y-4 mb-6'>
                  {expandedContent}
                </div>
                <p className='text-sm text-black/50'>
                  <span className='font-bold text-black/60'>Good for:</span> {goodFor}
                </p>
              </div>
            )}
          </div>

          <a
            href='/contact'
            className='inline-flex items-center gap-2 text-[var(--color-blue)] hover:text-black transition-colors'
          >
            {ctaText} <span aria-hidden='true'>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Intro Section */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 lg:pb-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          <div>
            <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]'>
              Services
            </h1>
          </div>
          <div>
            <p className='text-lg md:text-xl text-black/80'>
              Explanation design for complex systems. From quick audits
              to full interactive builds, structured around what you need
              to communicate and who needs to understand it.
            </p>
          </div>
        </div>
      </section>

      {/* Service 1: Audit + Sprint */}
      <ServiceDropdown
        number='01'
        title='Visual Audit + Redesign Sprint'
        shortDescription="A focused review of your existing materials, followed by redesigned samples showing what's possible. Often the fastest way to see whether we're a good fit."
        timeline='3-5 days'
        youGet='Audit report, 2-3 redesigned samples, recommendations'
        ctaText='Discuss a sprint'
        expandedContent={
          <>
            <p>
              This works well for teams who know their current materials aren&apos;t working but aren&apos;t sure where to start. We&apos;ll review your reports, presentations, publications, or data outputs and identify what&apos;s holding them back.
            </p>
            <p>
              You&apos;ll receive redesigned samples showing a different approach, plus a recommendations document outlining priorities and next steps. It&apos;s a low-commitment way to explore working together, and frequently converts into longer engagements once you see the potential.
            </p>
          </>
        }
        goodFor='Research teams preparing for REF submissions, publishers reviewing a book series, organisations refreshing their visual communications.'
      />

      {/* Service 2: Explanation Design */}
      <ServiceDropdown
        number='02'
        title='Explanation Design'
        shortDescription='Taking a complex topic and making it clear through visual design. Research findings, technical processes, data that needs to tell a story.'
        timeline='2-4 weeks'
        youGet='Research synthesis, visual system, production files'
        ctaText='Discuss a project'
        expandedContent={
          <>
            <p>
              This is the core of what we do. You have something complex that needs explaining to an audience who doesn&apos;t share your expertise. We work to understand the subject deeply, then design visual systems that make it comprehensible.
            </p>
            <p>
              The process includes subject research and discovery, concept development and sketching, and production of final outputs. These might be static graphics, illustrated diagrams, infographics, or lightly interactive pieces.
            </p>
          </>
        }
        goodFor='Research institutions communicating findings to public audiences, publishers needing illustrated explanations, companies explaining complex products or processes, think tanks producing policy briefs.'
      />

      {/* Service 3: Interactive System */}
      <ServiceDropdown
        number='03'
        title='Interactive System'
        shortDescription='Web-based interactive visualisations and explorable explanations. For when users need to filter, zoom, compare, or discover relationships in data themselves.'
        timeline='4-8 weeks'
        youGet='Deployed interactive, source code, documentation'
        ctaText='Discuss a build'
        expandedContent={
          <>
            <p>
              Some explanations only work when people can explore them directly. Interactive systems let users interrogate data, test scenarios, or navigate complex information at their own pace.
            </p>
            <p>
              Built with D3.js, React, and modern web technologies. We handle the full process: data pipeline development, design, build, deployment, and technical handover. You get production-ready code and documentation so your team can maintain and extend it.
            </p>
          </>
        }
        goodFor='Research groups with rich datasets, organisations needing public-facing data tools, educational platforms, anyone whose story is best told through exploration rather than presentation.'
      />

      {/* Service 4: Beyond Projects */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20 pt-8 md:pt-12 lg:pt-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          <div>
            <span className='text-xs font-mono text-black/40 block mb-4'>[04]</span>
            <h2 className='text-2xl md:text-3xl font-bold tracking-tight'>
              Beyond Projects
            </h2>
          </div>
          <div>
            <p className='text-black/80 mb-8'>
              Not everything fits neatly into a project scope. We also work with organisations on an ongoing basis, and take on work that doesn&apos;t fit the categories above.
            </p>

            <div className='space-y-8'>
              <div>
                <h3 className='text-xl md:text-2xl font-bold tracking-tight mb-2'>Retained relationships</h3>
                <p className='text-black/60'>
                  For organisations with continuous visualisation needs, a retained relationship provides dedicated capacity and priority scheduling. Research groups, publications, science communication teams. Typically structured as a monthly commitment with agreed days included.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl font-bold tracking-tight mb-2'>Pictogram and symbol systems</h3>
                <p className='text-black/60'>
                  Custom icon sets and visual languages for publishing, wayfinding, or product interfaces. Systematic approaches to visual communication that scale across multiple contexts.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl font-bold tracking-tight mb-2'>Workshops and consulting</h3>
                <p className='text-black/60'>
                  Half-day or full-day sessions on visual communication, explanation design, or data visualisation. For teams who want to build internal capability or think through a visual communication strategy.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl font-bold tracking-tight mb-2'>Something else</h3>
                <p className='text-black/60'>
                  If you have a project that doesn&apos;t fit these descriptions, get in touch anyway. We&apos;re always interested in complex problems that need clear visual solutions.
                </p>
              </div>
            </div>

            <a
              href='/contact'
              className='inline-flex items-center gap-2 text-[var(--color-blue)] hover:text-black transition-colors mt-8'
            >
              Start a conversation <span aria-hidden='true'>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16'>
        <div className='max-w-xl'>
          <h2 className='text-2xl md:text-3xl font-bold tracking-tight mb-4'>
            Not sure which is right?
          </h2>
          <p className='text-black/60 mb-8'>
            Start with a conversation. Tell us what you&apos;re trying to communicate
            and we&apos;ll figure out the best approach together.
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
