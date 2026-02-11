'use client';

import { useState } from 'react';

function ServiceDropdown({
  number,
  title,
  children,
  ctaText,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  ctaText: string;
}) {
  return (
    <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
        <div>
          <span className='text-xs font-mono text-white/50 block mb-4'>[{number}]</span>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
            {title}
          </h2>
        </div>
        <div>
          {children}
          <a
            href='/contact'
            className='inline-flex items-center gap-2 text-[var(--color-blue)] hover:text-white transition-colors mt-8'
          >
            {ctaText} <span aria-hidden='true'>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ExpandableSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className='border-t border-white/10 pt-6 mt-6'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='inline-flex items-center gap-2 text-sm font-bold hover:text-[var(--color-blue)] transition-colors'
      >
        <span>{title}</span>
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
        <div className='mt-4 text-white/70 space-y-4'>
          {children}
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className='min-h-screen'>
      {/* Intro Section */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          <div>
            <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]'>
              Services
            </h1>
          </div>
          <div>
            <p className='text-lg md:text-xl text-white/70'>
              Explanation design for complex systems. From quick audits
              to full interactive builds, structured around what you need
              to communicate and who needs to understand it.
            </p>
          </div>
        </div>
      </section>

      {/* Service 1: Visual Audit + Redesign Sprint */}
      <ServiceDropdown
        number='01'
        title='Visual Audit + Redesign Sprint'
        ctaText='Discuss a sprint'
      >
        <p className='text-white/70 mb-6'>
          A structured diagnostic of your existing explanation materials, followed by redesigned samples showing what&apos;s possible.
        </p>

        <div className='mb-6'>
          <h3 className='text-lg font-bold mb-4'>What We Look For</h3>
          <p className='text-white/70 mb-4'>
            We assess against five common failure patterns:
          </p>
          <ul className='space-y-3 text-white/70'>
            <li className='flex gap-3'>
              <span className='text-white/40'>-</span>
              <span><strong>The Expert&apos;s Explanation</strong> - Opens with definitions, assumes knowledge the audience lacks</span>
            </li>
            <li className='flex gap-3'>
              <span className='text-white/40'>-</span>
              <span><strong>The Data Dump</strong> - Everything presented at equal weight, no hierarchy or progression</span>
            </li>
            <li className='flex gap-3'>
              <span className='text-white/40'>-</span>
              <span><strong>The Beautiful Confusion</strong> - Visually impressive, conceptually unclear</span>
            </li>
            <li className='flex gap-3'>
              <span className='text-white/40'>-</span>
              <span><strong>The Boring Textbook</strong> - Accurate but no hook, no engagement</span>
            </li>
            <li className='flex gap-3'>
              <span className='text-white/40'>-</span>
              <span><strong>The Wrong Audience</strong> - Vocabulary or detail level mismatched to readers</span>
            </li>
          </ul>
          <p className='text-white/70 mt-4'>
            Plus cognitive load analysis, visual encoding assessment, and progression mapping.
          </p>
        </div>

        <div className='mb-6'>
          <h3 className='text-lg font-bold mb-4'>What You Get</h3>
          <p className='text-white/70'>
            Audit report identifying specific issues and opportunities. 2-3 redesigned samples demonstrating improved approaches. Prioritised recommendations covering quick wins and structural changes.
          </p>
        </div>

        <div className='flex justify-between py-4 border-y border-white/10 mb-6'>
          <span className='text-sm text-white/70'>Timeline</span>
          <span className='text-sm'>3-5 days</span>
        </div>

        <p className='text-sm text-white/50 italic'>
          Often the fastest way to see whether we&apos;re a good fit.
        </p>
      </ServiceDropdown>

      {/* Service 2: Explanation Design */}
      <ServiceDropdown
        number='02'
        title='Explanation Design'
        ctaText='Discuss a project'
      >
        <p className='text-white/70 mb-6'>
          Taking a complex topic and making it genuinely clear - not just presentable.
        </p>

        <div className='mb-6'>
          <h3 className='text-lg font-bold mb-4'>Our Process</h3>
          <p className='text-white/70 mb-4'>
            We don&apos;t start with visual style. We start with the information gap: What does your audience already know? What do they need to understand? What&apos;s the shortest path between those two states?
          </p>
          <p className='text-white/70'>
            From there: audience analysis (expertise level, context, time constraints, what they&apos;ll do with the understanding), concept mapping (identifying dependencies, sequencing from concrete to abstract), visual strategy (choosing the right encoding for each type of information), progressive disclosure (layering complexity so readers aren&apos;t overwhelmed), and production (final outputs calibrated to your channels and contexts).
          </p>
        </div>

        <div className='mb-6'>
          <h3 className='text-lg font-bold mb-4'>What You Get</h3>
          <p className='text-white/70'>
            Research synthesis and information architecture. Visual system including illustration style, colour palette, typography, and diagram conventions. Production files in the formats you need. Documentation for internal teams.
          </p>
        </div>

        <div className='flex justify-between py-4 border-y border-white/10'>
          <span className='text-sm text-white/70'>Timeline</span>
          <span className='text-sm'>2-4 weeks</span>
        </div>
      </ServiceDropdown>

      {/* Service 3: Adaptive Explanation Systems */}
      <ServiceDropdown
        number='03'
        title='Adaptive Explanation Systems'
        ctaText='Discuss adaptive systems'
      >
        <p className='text-white/70 mb-6'>
          Not everyone needs the same explanation.
        </p>
        <p className='text-white/70 mb-6'>
          A scientist and a policymaker looking at the same research need fundamentally different approaches. Not just simpler or harder, but structured around different mental models. A complete beginner and someone with adjacent expertise need different entry points entirely.
        </p>

        <div className='mb-6'>
          <h3 className='text-lg font-bold mb-4'>The Problem</h3>
          <p className='text-white/70'>
            Traditional explanations force a choice: optimise for one audience and lose everyone else, or compromise with a middle-ground that serves no one well. Research shows that techniques helping novices can actively harm expert comprehension, and vice versa.
          </p>
        </div>

        <div className='mb-6'>
          <h3 className='text-lg font-bold mb-4'>Our Approach</h3>
          <p className='text-white/70 mb-4'>
            We design explanation systems that adapt to your audience. The right implementation depends on your content, your audiences, and your technical environment:
          </p>
          <div className='space-y-4'>
            <div>
              <p className='font-bold'>Level Selection</p>
              <p className='text-white/70 text-sm'>
                Users indicate their background, system serves appropriate version. Simple to build, requires writing 2-3 variants.
              </p>
            </div>
            <div>
              <p className='font-bold'>Assessment-Based Routing</p>
              <p className='text-white/70 text-sm'>
                Short diagnostic questions gauge actual knowledge level, route to calibrated content. Better than self-report because people misjudge their own expertise.
              </p>
            </div>
            <div>
              <p className='font-bold'>Progressive Disclosure</p>
              <p className='text-white/70 text-sm'>
                Single explanation with &quot;I know this already&quot; shortcuts and &quot;tell me more&quot; expansions. User self-directs through complexity.
              </p>
            </div>
            <div>
              <p className='font-bold'>Background-Aware Assembly</p>
              <p className='text-white/70 text-sm'>
                Content blocks assembled based on user&apos;s stated profession, education, or familiarity with related concepts. &quot;You&apos;re an engineer, so you&apos;ll recognise this as similar to...&quot; leverages existing mental models.
              </p>
            </div>
            <div>
              <p className='font-bold'>AI-Powered Generation</p>
              <p className='text-white/70 text-sm'>
                For audiences too diverse for pre-written variants, real-time generation tailored to each user&apos;s stated context.
              </p>
            </div>
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='text-lg font-bold mb-4'>What You Get</h3>
          <p className='text-white/70'>
            Audience research identifying distinct user segments and their knowledge profiles. Content architecture designed for adaptation. Technical implementation appropriate to your platform. Analytics showing how different audiences engage.
          </p>
        </div>

        <div className='mb-6'>
          <h3 className='text-lg font-bold mb-4'>Why This Matters</h3>
          <p className='text-white/70'>
            Every adaptive system generates data: what level users select, how they perform on assessment questions, where they use shortcuts versus expansions. This feeds back into refinement. Your explanation gets better over time.
          </p>
        </div>
      </ServiceDropdown>

      {/* Service 4: Interactive Explanations */}
      <ServiceDropdown
        number='04'
        title='Interactive Explanations'
        ctaText='Discuss an interactive project'
      >
        <p className='text-white/70 mb-6'>
          Static graphics explain. Interactive systems let people think.
        </p>
        <p className='text-white/70 mb-6'>
          When the goal is genuine understanding, not just awareness, interaction transforms explanation from information delivery into an environment for exploration.
        </p>

        <div className='mb-6'>
          <h3 className='text-lg font-bold mb-4'>When Interaction Adds Value</h3>
          <p className='text-white/70'>
            Not everything benefits from interactivity. It works best when the concept has parameters readers might want to vary, when different starting conditions lead to different outcomes, when understanding requires building intuition through experimentation, or when personalisation is part of the insight.
          </p>
        </div>

        <div className='mb-6'>
          <h3 className='text-lg font-bold mb-4'>What We Build</h3>
          <p className='text-white/70'>
            Explorable explanations where readers manipulate variables and see consequences. Data tools that let users filter to their specific situation. Calculators that make abstract relationships concrete. Simulations that compress time or reveal hidden dynamics.
          </p>
        </div>

        <div className='mb-6'>
          <h3 className='text-lg font-bold mb-4'>Technical Range</h3>
          <p className='text-white/70'>
            From embedded widgets within existing pages to full standalone web applications. React, D3.js, Observable, Three.js. We match technology to the problem.
          </p>
        </div>

        <div className='flex justify-between py-4 border-y border-white/10'>
          <span className='text-sm text-white/70'>Timeline</span>
          <span className='text-sm'>4-8 weeks</span>
        </div>
      </ServiceDropdown>

      {/* Service 5: Beyond Projects */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          <div>
            <span className='text-xs font-mono text-white/50 block mb-4'>[05]</span>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
              Beyond Projects
            </h2>
          </div>
          <div>
            <p className='text-white/70 mb-8'>
              Not everything fits neatly into a project scope. We also work with organisations on an ongoing basis, and take on work that doesn&apos;t fit the categories above.
            </p>

            <div className='space-y-8'>
              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Retained Relationships</h3>
                <p className='text-white/70'>
                  For organisations with continuous visualisation needs, a retained relationship provides dedicated capacity and priority scheduling. Research groups, publications, science communication teams. Typically structured as a monthly commitment with agreed days included.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Pictogram and Symbol Systems</h3>
                <p className='text-white/70'>
                  Custom icon sets and visual languages for publishing, wayfinding, or product interfaces. Systematic approaches to visual communication that scale across multiple contexts.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Workshops and Consulting</h3>
                <p className='text-white/70 mb-4'>
                  For organisations building internal explanation design capability.
                </p>
                <p className='text-white/70 mb-4'>
                  Not every team needs external designers for every project. Sometimes what&apos;s needed is a framework your people can apply themselves.
                </p>
                <div className='space-y-3 text-white/70'>
                  <p>
                    <strong>Explanation Audit Training</strong> - Teaching your team to diagnose common failure patterns using our assessment framework.
                  </p>
                  <p>
                    <strong>Visual Communication Workshops</strong> - Half-day or full-day sessions covering cognitive principles, visual encoding, audience calibration. Practical exercises with your actual content.
                  </p>
                  <p>
                    <strong>Design System Development</strong> - Creating reusable frameworks your team can maintain and extend. Pictogram libraries, diagram conventions, style guides with rationale.
                  </p>
                </div>
                <p className='text-white/70 mt-4 text-sm'>
                  Typical engagements include research groups improving grant application diagrams, publishing teams standardising visual approaches, and science communication teams developing consistent methodology.
                </p>
              </div>

              <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2'>Something Else</h3>
                <p className='text-white/70'>
                  If you have a project that doesn&apos;t fit these descriptions, get in touch anyway. We&apos;re always interested in complex problems that need clear visual solutions.
                </p>
              </div>
            </div>

            <a
              href='/contact'
              className='inline-flex items-center gap-2 text-[var(--color-blue)] hover:text-white transition-colors mt-8'
            >
              Start a conversation <span aria-hidden='true'>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='max-w-xl'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4'>
            Not sure which is right?
          </h2>
          <p className='text-white/70 mb-8'>
            Start with a conversation. Tell us what you&apos;re trying to communicate
            and we&apos;ll figure out the best approach together.
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
