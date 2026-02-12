'use client';

import { useState } from 'react';

export default function DesignSystemsPage() {
  const [copiedClass, setCopiedClass] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedClass(text);
    setTimeout(() => setCopiedClass(null), 2000);
  };

  return (
    <div className='min-h-screen bg-white text-black'>
      {/* Header */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20 border-b border-black/10'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display tracking-tight'>
          Design System
        </h1>
        <p className='text-lg md:text-xl text-black/70 mt-4 max-w-2xl'>
          Living reference for Bang Industries visual language. Click any class to copy.
        </p>
        <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>
          v1.0 — Last updated February 2026
        </p>
      </section>

      {/* Brand Colors */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Brand Colors
            </h2>
            <p className='text-sm text-black/50'>
              Five immutable colors. No exceptions.
            </p>
          </div>
          <div className='space-y-8'>
            {/* Color Swatches */}
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
              <ColorSwatch
                name='Black'
                hex='#000000'
                variable='--color-black'
                className='bg-black text-white'
                onCopy={copyToClipboard}
                copied={copiedClass}
              />
              <ColorSwatch
                name='White'
                hex='#FFFFFF'
                variable='--color-white'
                className='bg-white text-black border border-black/10'
                onCopy={copyToClipboard}
                copied={copiedClass}
              />
              <ColorSwatch
                name='Electric Blue'
                hex='#0055FF'
                variable='--color-blue'
                className='bg-[var(--color-blue)] text-white'
                onCopy={copyToClipboard}
                copied={copiedClass}
              />
              <ColorSwatch
                name='Hot Pink'
                hex='#FF0055'
                variable='--color-pink'
                className='bg-[var(--color-pink)] text-white'
                onCopy={copyToClipboard}
                copied={copiedClass}
              />
              <ColorSwatch
                name='Acid Lime'
                hex='#CCFF00'
                variable='--color-lime'
                className='bg-[var(--color-lime)] text-black'
                onCopy={copyToClipboard}
                copied={copiedClass}
              />
            </div>

            {/* Usage */}
            <div className='bg-black/5 p-4'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mb-2'>Usage</p>
              <code className='text-sm font-mono text-black/70'>
                bg-[var(--color-blue)] | text-[var(--color-pink)] | border-[var(--color-lime)]
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Typography
            </h2>
            <p className='text-sm text-black/50'>
              Neue Haas Grotesk + Input Mono via Adobe Typekit
            </p>
          </div>
          <div className='space-y-8'>
            {/* Font Families */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Font Families</h3>
              <div className='space-y-4'>
                <div className='p-4 border border-black/10'>
                  <p className='font-display text-2xl mb-2'>Neue Haas Grotesk Display</p>
                  <p className='text-xs font-mono text-black/50'>font-display — Headings only, Bold (700), -0.03em</p>
                </div>
                <div className='p-4 border border-black/10'>
                  <p className='text-xl mb-2'>Neue Haas Grotesk Text</p>
                  <p className='text-xs font-mono text-black/50'>font-text (default) — Body text, UI</p>
                </div>
                <div className='p-4 border border-black/10'>
                  <p className='font-mono text-xl mb-2'>Input Mono</p>
                  <p className='text-xs font-mono text-black/50'>font-mono — Labels, meta, code</p>
                </div>
              </div>
            </div>

            {/* Type Scale */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Type Scale</h3>
              <div className='space-y-4'>
                <TypeScaleItem
                  label='Hero (h1)'
                  example='Hero Heading'
                  className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display tracking-tight'
                  sizes='text-3xl → md:text-4xl → lg:text-5xl → xl:text-6xl'
                  onCopy={copyToClipboard}
                  copied={copiedClass}
                />
                <TypeScaleItem
                  label='h2'
                  example='Section Heading'
                  className='text-2xl md:text-3xl lg:text-4xl font-display tracking-tight'
                  sizes='text-2xl → md:text-3xl → lg:text-4xl'
                  onCopy={copyToClipboard}
                  copied={copiedClass}
                />
                <TypeScaleItem
                  label='h3'
                  example='Subsection Heading'
                  className='text-xl md:text-2xl lg:text-3xl font-display tracking-tight'
                  sizes='text-xl → md:text-2xl → lg:text-3xl'
                  onCopy={copyToClipboard}
                  copied={copiedClass}
                />
                <TypeScaleItem
                  label='Body'
                  example='Body text for paragraphs and general content.'
                  className='text-base text-black/70 leading-relaxed'
                  sizes='text-base'
                  onCopy={copyToClipboard}
                  copied={copiedClass}
                />
                <TypeScaleItem
                  label='Nav'
                  example='Navigation Link'
                  className='text-sm'
                  sizes='text-sm (14px)'
                  onCopy={copyToClipboard}
                  copied={copiedClass}
                />
                <TypeScaleItem
                  label='Labels/Meta'
                  example='CATEGORY LABEL'
                  className='text-xs font-mono uppercase tracking-wider text-black/50'
                  sizes='text-xs font-mono uppercase tracking-wider'
                  onCopy={copyToClipboard}
                  copied={copiedClass}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Opacity */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Text Opacity
            </h2>
            <p className='text-sm text-black/50'>
              Hierarchy through transparency
            </p>
          </div>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <OpacityItem
                label='Primary'
                className='text-black'
                example='Primary text content'
                onCopy={copyToClipboard}
                copied={copiedClass}
              />
              <OpacityItem
                label='Secondary'
                className='text-black/70'
                example='Secondary text content'
                onCopy={copyToClipboard}
                copied={copiedClass}
              />
              <OpacityItem
                label='Tertiary'
                className='text-black/50'
                example='Tertiary text content'
                onCopy={copyToClipboard}
                copied={copiedClass}
              />
              <OpacityItem
                label='Metadata'
                className='text-black/50 font-mono uppercase tracking-wider text-xs'
                example='METADATA LABEL'
                onCopy={copyToClipboard}
                copied={copiedClass}
              />
            </div>

            {/* Dark mode variants */}
            <div className='bg-black p-4 mt-4'>
              <h4 className='text-xs font-mono uppercase tracking-wider text-white/50 mb-4'>On Dark Background</h4>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <p className='text-white'>text-white</p>
                <p className='text-white/70'>text-white/70</p>
                <p className='text-white/50'>text-white/50</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Spacing Scale
            </h2>
            <p className='text-sm text-black/50'>
              Use these values only. No arbitrary spacing.
            </p>
          </div>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <SpacingItem name='xs' value='0.25rem' pixels='4px' />
              <SpacingItem name='sm' value='0.5rem' pixels='8px' />
              <SpacingItem name='md' value='1rem' pixels='16px' />
              <SpacingItem name='lg' value='2rem' pixels='32px' />
              <SpacingItem name='xl' value='4rem' pixels='64px' />
              <SpacingItem name='2xl' value='8rem' pixels='128px' />
            </div>

            <div className='bg-black/5 p-4 mt-8'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mb-2'>Page Padding</p>
              <code className='text-sm font-mono text-black/70 block'>
                px-4 md:px-8 lg:px-12
              </code>
              <p className='text-xs text-black/50 mt-2'>16px → 32px → 48px</p>
            </div>

            <div className='bg-black/5 p-4'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mb-2'>Section Padding</p>
              <code className='text-sm font-mono text-black/70 block'>
                pb-12 md:pb-16 lg:pb-20
              </code>
            </div>

            <div className='bg-black/5 p-4'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mb-2'>Hero Top Offset</p>
              <code className='text-sm font-mono text-black/70 block'>
                pt-24 md:pt-28 lg:pt-32
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Layout & Grid */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Layout & Grid
            </h2>
            <p className='text-sm text-black/50'>
              Full-width layout, no max-width container
            </p>
          </div>
          <div className='space-y-8'>
            {/* Content Grid */}
            <div>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50 mb-4'>Content Grid (3:7)</h3>
              <div className='border border-black/10 p-4'>
                <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
                  <div className='bg-[var(--color-blue)]/10 p-4'>
                    <p className='text-xs font-mono text-black/50'>3fr — Labels</p>
                  </div>
                  <div className='bg-[var(--color-blue)]/10 p-4'>
                    <p className='text-xs font-mono text-black/50'>7fr — Content</p>
                  </div>
                </div>
              </div>
              <code className='text-xs font-mono text-black/50 mt-2 block'>
                grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12
              </code>
            </div>

            {/* Work Grid */}
            <div>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50 mb-4'>Work/Portfolio Grid (Single Column)</h3>
              <div className='border border-black/10 p-4'>
                <div className='grid grid-cols-1 gap-px'>
                  <div className='bg-black/5 p-4'>
                    <p className='text-xs font-mono text-black/50'>Project Card</p>
                  </div>
                  <div className='bg-black/5 p-4'>
                    <p className='text-xs font-mono text-black/50'>Project Card</p>
                  </div>
                </div>
              </div>
              <code className='text-xs font-mono text-black/50 mt-2 block'>
                grid grid-cols-1 gap-px
              </code>
            </div>

            {/* Services Grid */}
            <div>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50 mb-4'>Services Grid (Multi-Column)</h3>
              <div className='border border-black/10 p-4'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                  <div className='bg-black/5 p-4'>
                    <p className='text-xs font-mono text-black/50'>Service</p>
                  </div>
                  <div className='bg-black/5 p-4'>
                    <p className='text-xs font-mono text-black/50'>Service</p>
                  </div>
                  <div className='bg-black/5 p-4'>
                    <p className='text-xs font-mono text-black/50'>Service</p>
                  </div>
                </div>
              </div>
              <code className='text-xs font-mono text-black/50 mt-2 block'>
                grid grid-cols-1 lg:grid-cols-3
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Buttons
            </h2>
            <p className='text-sm text-black/50'>
              Three variants: Primary, Secondary, Accent
            </p>
          </div>
          <div className='space-y-8'>
            {/* Primary */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Primary (Dark)</h3>
              <button className='inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-display hover:bg-[var(--color-blue)] transition-colors'>
                Primary Button
              </button>
              <code className='text-xs font-mono text-black/50 block mt-2'>
                inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-display hover:bg-[var(--color-blue)] transition-colors
              </code>
            </div>

            {/* Secondary */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Secondary (Outline)</h3>
              <button className='inline-flex items-center gap-2 px-6 py-3 border border-black text-sm hover:bg-black hover:text-white transition-colors'>
                Secondary Button
              </button>
              <code className='text-xs font-mono text-black/50 block mt-2'>
                inline-flex items-center gap-2 px-6 py-3 border border-black text-sm hover:bg-black hover:text-white transition-colors
              </code>
            </div>

            {/* Accent */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Accent</h3>
              <button className='inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-blue)] text-white font-display hover:bg-black transition-colors'>
                Accent Button
              </button>
              <code className='text-xs font-mono text-black/50 block mt-2'>
                inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-blue)] text-white font-display hover:bg-black transition-colors
              </code>
            </div>

            {/* With Arrow */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>With Arrow</h3>
              <button className='inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-display hover:bg-[var(--color-blue)] transition-colors'>
                View Project <span aria-hidden='true'>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Links
            </h2>
            <p className='text-sm text-black/50'>
              Inline and arrow variants
            </p>
          </div>
          <div className='space-y-8'>
            {/* Inline */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Inline Link</h3>
              <p className='text-black/70'>
                This is body text with an{' '}
                <a href='#' className='hover:text-[var(--color-blue)] transition-colors underline'>
                  inline link
                </a>{' '}
                in the middle.
              </p>
              <code className='text-xs font-mono text-black/50 block'>
                hover:text-[var(--color-blue)] transition-colors
              </code>
            </div>

            {/* With Arrow */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Link with Arrow</h3>
              <a href='#' className='inline-flex items-center gap-2 text-[var(--color-blue)] hover:text-black transition-colors'>
                View all projects <span aria-hidden='true'>→</span>
              </a>
              <code className='text-xs font-mono text-black/50 block'>
                inline-flex items-center gap-2 text-[var(--color-blue)] hover:text-black transition-colors
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Tags & Labels
            </h2>
            <p className='text-sm text-black/50'>
              For categorisation and metadata
            </p>
          </div>
          <div className='space-y-8'>
            {/* Tags */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Tags</h3>
              <div className='flex flex-wrap gap-2'>
                <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Data Visualisation</span>
                <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>Interactive</span>
                <span className='px-3 py-1 text-xs bg-black/5 text-black/50'>D3.js</span>
              </div>
              <code className='text-xs font-mono text-black/50 block'>
                px-3 py-1 text-xs bg-black/5 text-black/50
              </code>
            </div>

            {/* Meta Label */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Meta Labels</h3>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50'>
                Category Label
              </p>
              <code className='text-xs font-mono text-black/50 block'>
                text-xs font-mono uppercase tracking-wider text-black/50
              </code>
            </div>

            {/* Project Number */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Project Numbers</h3>
              <div className='flex gap-4'>
                <span className='text-xs font-mono text-black/50'>[01]</span>
                <span className='text-xs font-mono text-black/50'>[02]</span>
                <span className='text-xs font-mono text-black/50'>[03]</span>
              </div>
              <p className='text-xs text-black/50'>Two digits with leading zero in brackets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Borders */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Borders
            </h2>
            <p className='text-sm text-black/50'>
              Subtle and medium opacity only
            </p>
          </div>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='p-8 border border-black/10'>
                <p className='text-xs font-mono text-black/50'>border-black/10 (subtle)</p>
              </div>
              <div className='p-8 border border-black/20'>
                <p className='text-xs font-mono text-black/50'>border-black/20 (medium)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Backgrounds */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Backgrounds
            </h2>
            <p className='text-sm text-black/50'>
              Page, dark sections, accent sections
            </p>
          </div>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-4'>
              <div className='p-8 bg-white border border-black/10'>
                <p className='text-xs font-mono text-black/50'>bg-white (page default)</p>
              </div>
              <div className='p-8 bg-black'>
                <p className='text-xs font-mono text-white/50'>bg-black text-white (dark sections)</p>
              </div>
              <div className='p-8 bg-[var(--color-lime)]'>
                <p className='text-xs font-mono text-black/50'>bg-[var(--color-lime)] (accent, use sparingly)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Callouts */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Callouts
            </h2>
            <p className='text-sm text-black/50'>
              For explainer pages
            </p>
          </div>
          <div className='space-y-8'>
            {/* Key Insight */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Key Insight (Blue)</h3>
              <div className='border-l-4 border-[var(--color-blue)] pl-4 py-2'>
                <p className='text-black/70 font-medium'>
                  This is a key insight callout. Use it to highlight important takeaways.
                </p>
              </div>
              <code className='text-xs font-mono text-black/50 block'>
                border-l-4 border-[var(--color-blue)] pl-4 py-2
              </code>
            </div>

            {/* Warning */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Warning (Pink)</h3>
              <div className='border-l-4 border-[var(--color-pink)] pl-4 py-2'>
                <p className='text-black/70 font-medium'>
                  This is a warning callout. Use it for common misconceptions or pitfalls.
                </p>
              </div>
              <code className='text-xs font-mono text-black/50 block'>
                border-l-4 border-[var(--color-pink)] pl-4 py-2
              </code>
            </div>

            {/* Definition */}
            <div className='space-y-4'>
              <h3 className='text-xs font-mono uppercase tracking-wider text-black/50'>Definition</h3>
              <div className='bg-black/5 p-4'>
                <p className='font-bold text-xs uppercase tracking-wider text-black/50 mb-1'>
                  Term
                </p>
                <p className='text-black/70'>
                  The definition of the term goes here. Keep it concise and clear.
                </p>
              </div>
              <code className='text-xs font-mono text-black/50 block'>
                bg-black/5 p-4
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Container */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Visual Containers
            </h2>
            <p className='text-sm text-black/50'>
              For images and interactive elements
            </p>
          </div>
          <div className='space-y-4'>
            <div className='border border-black/10 bg-white overflow-hidden'>
              <div className='aspect-video bg-black/5 flex items-center justify-center'>
                <p className='text-xs font-mono text-black/30'>Interactive / Image Content</p>
              </div>
            </div>
            <p className='text-xs md:text-sm text-black/50'>
              Caption text goes here. Keep it brief and informative.
            </p>
            <code className='text-xs font-mono text-black/50 block mt-2'>
              border border-black/10 bg-white overflow-hidden
            </code>
          </div>
        </div>
      </section>

      {/* Responsive Breakpoints */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Breakpoints
            </h2>
            <p className='text-sm text-black/50'>
              Mobile-first approach
            </p>
          </div>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <div className='flex justify-between p-4 bg-black/5'>
                <span className='text-sm font-mono'>default</span>
                <span className='text-sm text-black/50'>0px+ (mobile)</span>
              </div>
              <div className='flex justify-between p-4 bg-black/5'>
                <span className='text-sm font-mono'>md:</span>
                <span className='text-sm text-black/50'>768px+ (tablet)</span>
              </div>
              <div className='flex justify-between p-4 bg-black/5'>
                <span className='text-sm font-mono'>lg:</span>
                <span className='text-sm text-black/50'>1024px+ (desktop)</span>
              </div>
              <div className='flex justify-between p-4 bg-black/5'>
                <span className='text-sm font-mono'>xl:</span>
                <span className='text-sm text-black/50'>1280px+ (large desktop)</span>
              </div>
            </div>
            <div className='border-l-4 border-[var(--color-pink)] pl-4 py-2 mt-4'>
              <p className='text-black/70 font-medium text-sm'>
                Never use <code className='font-mono'>sm:</code> — design for mobile by default
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* VISUALIZATION COMPONENTS */}
      {/* ========================================= */}

      {/* Section Header: Visualization Components */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10 bg-black/5'>
        <h2 className='text-3xl md:text-4xl font-display tracking-tight text-black'>
          Visualization Components
        </h2>
        <p className='text-black/70 mt-2 max-w-2xl'>
          UI patterns used in interactive scientific visualizations. These components appear
          on dark backgrounds within full-screen visualization contexts.
        </p>
      </section>

      {/* Mode Toggle Buttons */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Mode Toggle
            </h3>
            <p className='text-sm text-black/50'>
              Decay Chain Explorer
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded'>
              <div className='flex gap-2'>
                <button className='px-4 py-2 text-sm rounded bg-[var(--color-blue)] text-white transition-colors'>
                  Guided Journey
                </button>
                <button className='px-4 py-2 text-sm rounded bg-white/10 text-white/70 hover:bg-white/20 transition-colors'>
                  Time Explorer
                </button>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50'>Active State</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                px-4 py-2 text-sm rounded bg-[var(--color-blue)] text-white transition-colors
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Inactive State</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                px-4 py-2 text-sm rounded bg-white/10 text-white/70 hover:bg-white/20 transition-colors
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Play/Pause Button */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Play/Pause Controls
            </h3>
            <p className='text-sm text-black/50'>
              Galaxy Merger, Decay Chain
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded flex gap-4 items-center'>
              {/* Circular play button */}
              <button className='w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='white'>
                  <path d='M4 2l10 6-10 6V2z' />
                </svg>
              </button>
              {/* Circular pause button */}
              <button className='w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='white'>
                  <rect x='3' y='2' width='4' height='12' />
                  <rect x='9' y='2' width='4' height='12' />
                </svg>
              </button>
              {/* Text button */}
              <button className='px-4 py-2 bg-white/10 text-white text-sm rounded hover:bg-white/20 transition-colors'>
                Play
              </button>
            </div>
            <div className='space-y-2'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50'>Circular Icon Button</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Text Button</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                px-4 py-2 bg-white/10 text-white text-sm rounded hover:bg-white/20 transition-colors
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Step Counter */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Step Counter
            </h3>
            <p className='text-sm text-black/50'>
              Decay Chain Explorer
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded'>
              <span className='text-xs text-white/50'>
                Step 7 of 14
              </span>
            </div>
            <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
              text-xs text-white/50
            </code>
          </div>
        </div>
      </section>

      {/* Time Display */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Time Displays
            </h3>
            <p className='text-sm text-black/50'>
              Galaxy Merger, Decay Chain
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded'>
              {/* Galaxy style */}
              <div className='text-right mb-6'>
                <div className='text-lg font-mono text-white'>
                  T + 3.85 Gyr
                </div>
                <div className='text-xs text-white/50'>
                  3850 Myr
                </div>
              </div>
              {/* Decay chain style */}
              <div className='text-center'>
                <div className='text-2xl font-bold font-mono text-white'>
                  4.468 billion years
                </div>
                <div className='text-xs text-white/50 mt-1'>
                  10<sup>17.15</sup> seconds
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50'>Primary Time (large)</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                text-lg font-mono text-white | text-2xl font-bold font-mono text-white
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Secondary Time (detail)</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                text-xs text-white/50
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Selector */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Speed Selector
            </h3>
            <p className='text-sm text-black/50'>
              Galaxy Merger
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded'>
              <select className='bg-white/10 text-white text-sm px-2 py-1 rounded border border-white/20'>
                <option>0.5x</option>
                <option>1x</option>
                <option>2x</option>
                <option>4x</option>
              </select>
            </div>
            <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
              bg-white/10 text-white text-sm px-2 py-1 rounded border border-white/20
            </code>
          </div>
        </div>
      </section>

      {/* Timeline Scrubber */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Timeline Scrubber
            </h3>
            <p className='text-sm text-black/50'>
              Galaxy Merger
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded'>
              <div className='relative h-12 bg-white/5 rounded cursor-pointer'>
                {/* Progress fill */}
                <div
                  className='absolute top-0 left-0 h-full bg-gradient-to-r from-[#0055FF]/30 to-[#0055FF]/10 rounded-l'
                  style={{ width: '45%' }}
                />
                {/* Event markers */}
                <div className='absolute top-0 h-full flex flex-col items-center' style={{ left: '15%' }}>
                  <div className='w-0.5 h-3 bg-white/40' />
                  <div className='text-xs whitespace-nowrap mt-1 px-1 text-white/40'>First passage</div>
                </div>
                <div className='absolute top-0 h-full flex flex-col items-center' style={{ left: '70%' }}>
                  <div className='w-0.5 h-3 bg-white/40' />
                  <div className='text-xs whitespace-nowrap mt-1 px-1 text-white/40'>Merger</div>
                </div>
                {/* Playhead */}
                <div className='absolute top-0 h-full w-0.5 bg-white' style={{ left: '45%' }}>
                  <div className='absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full' />
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50'>Track</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                relative h-12 bg-white/5 rounded cursor-pointer
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Progress Fill</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                absolute top-0 left-0 h-full bg-gradient-to-r from-[#0055FF]/30 to-[#0055FF]/10 rounded-l
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Playhead</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                absolute top-0 h-full w-0.5 bg-white
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Playhead Handle</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Event Marker</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                w-0.5 h-3 bg-white/40 | text-xs whitespace-nowrap text-white/40
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Logarithmic Time Scrubber */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Log Time Scrubber
            </h3>
            <p className='text-sm text-black/50'>
              Decay Chain Explorer
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded'>
              <div className='relative h-12 cursor-pointer'>
                {/* Background track */}
                <div className='absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 bg-white/10 rounded-full' />
                {/* Gradient fill */}
                <div
                  className='absolute top-1/2 left-0 h-2 -translate-y-1/2 bg-gradient-to-r from-[#FF0055] via-[#FFCC00] to-[#0055FF] rounded-full'
                  style={{ width: '60%' }}
                />
                {/* Handle */}
                <div
                  className='absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2'
                  style={{ left: '60%' }}
                >
                  <div className='w-6 h-6 bg-white rounded-full shadow-lg border-2 border-[#FFCC00] cursor-grab'>
                    <div className='w-full h-full rounded-full bg-[#FFCC00] scale-50' />
                  </div>
                </div>
              </div>
              {/* Time scale context */}
              <div className='text-center mt-4'>
                <span className='text-xs text-[#FFCC00]'>Human timescales — seconds to days</span>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50'>Track</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 bg-white/10 rounded-full
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Gradient Fill (fast to slow)</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                bg-gradient-to-r from-[#FF0055] via-[#FFCC00] to-[#0055FF] rounded-full
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Handle</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                w-6 h-6 bg-white rounded-full shadow-lg border-2 border-[#FFCC00] cursor-grab
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Loading Spinners */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Loading States
            </h3>
            <p className='text-sm text-black/50'>
              Decay Chain, Galaxy Merger
            </p>
          </div>
          <div className='space-y-8'>
            {/* Simple spinner */}
            <div>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mb-4'>Simple Spinner (Decay Chain)</p>
              <div className='bg-black p-8 rounded flex flex-col items-center'>
                <div className='w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4' />
                <div className='text-white/50'>Loading decay chain data...</div>
              </div>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2 mt-2'>
                w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin
              </code>
            </div>
            {/* Complex galaxy spinner */}
            <div>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mb-4'>Galaxy Spinner with Progress (Galaxy Merger)</p>
              <div className='bg-black p-8 rounded flex flex-col items-center'>
                <div className='relative w-24 h-24 mx-auto mb-6'>
                  <div className='absolute inset-0 rounded-full border-2 border-white/10' />
                  <div
                    className='absolute inset-0 rounded-full border-2 border-t-[#0055FF] animate-spin'
                    style={{ animationDuration: '1.5s' }}
                  />
                  <div
                    className='absolute inset-2 rounded-full border-2 border-t-white/50 animate-spin'
                    style={{ animationDuration: '2s', animationDirection: 'reverse' }}
                  />
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='w-3 h-3 bg-white rounded-full animate-pulse' />
                  </div>
                </div>
                <div className='text-white/70 mb-2'>Loading galaxy simulation...</div>
                <div className='w-64 h-1 bg-white/10 rounded-full overflow-hidden'>
                  <div className='h-full bg-[#0055FF] w-[65%]' />
                </div>
                <div className='text-white/40 text-sm mt-2'>65% - 20,000 particles</div>
              </div>
            </div>
            {/* Progress bar */}
            <div>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mb-4'>Progress Bar</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                w-64 h-1 bg-white/10 rounded-full overflow-hidden
              </code>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2 mt-1'>
                h-full bg-[#0055FF] transition-all duration-300
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Info Overlay Panel */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Info Overlay Panel
            </h3>
            <p className='text-sm text-black/50'>
              Galaxy Merger
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded'>
              <div className='max-w-sm'>
                <div className='bg-black/70 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <h3 className='text-white font-bold text-lg mb-2'>Gravity Makes Everything</h3>
                  <p className='text-white/70 text-sm'>A cosmic collision 4 billion years from now</p>
                  <div className='mt-3 text-xs text-white/50'>
                    <div>20,000 particles</div>
                    <div>10,000 Milky Way</div>
                    <div>10,000 Andromeda</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50'>Container</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                bg-black/70 backdrop-blur-sm rounded-lg p-4 border border-white/10
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Title</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                text-white font-bold text-lg
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Description</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                text-white/70 text-sm
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Stats</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                text-xs text-white/50
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlight Panel */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Event Highlight Panel
            </h3>
            <p className='text-sm text-black/50'>
              Galaxy Merger
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded'>
              <div className='bg-[#0055FF]/20 border border-[#0055FF]/40 rounded-lg p-3'>
                <div className='text-white font-bold'>First passage</div>
                <div className='text-white/80 text-sm mt-1'>The galaxies pass through each other</div>
              </div>
            </div>
            <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
              bg-[#0055FF]/20 border border-[#0055FF]/40 rounded-lg p-3
            </code>
          </div>
        </div>
      </section>

      {/* Step Indicator */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Step Indicator
            </h3>
            <p className='text-sm text-black/50'>
              Decay Chain Scrollytelling
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded'>
              <div className='flex items-center gap-3'>
                <div
                  className='w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm'
                  style={{ backgroundColor: '#FF9500' }}
                >
                  7
                </div>
                <div>
                  <span className='text-xs font-mono uppercase tracking-wider text-white/50'>
                    alpha decay
                  </span>
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50'>Number Circle</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Decay Type Label</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                text-xs font-mono uppercase tracking-wider text-white/50
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Scrollytelling Step */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Scrollytelling Step
            </h3>
            <p className='text-sm text-black/50'>
              Decay Chain Explorer
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded'>
              <div className='space-y-4'>
                {/* Active step */}
                <div className='min-h-[100px] flex flex-col justify-center py-4 cursor-pointer opacity-100'>
                  <h3 className='text-2xl font-bold tracking-tight text-white mb-2'>
                    <sup className='text-sm'>238</sup>U
                    <span className='text-white/50 ml-2'>Uranium</span>
                  </h3>
                  <div className='text-lg text-white/70'>
                    Half-life: <span className='font-bold text-white'>4.468 billion years</span>
                  </div>
                </div>
                {/* Inactive step */}
                <div className='min-h-[100px] flex flex-col justify-center py-4 cursor-pointer opacity-40'>
                  <h3 className='text-2xl font-bold tracking-tight text-white mb-2'>
                    <sup className='text-sm'>234</sup>Th
                    <span className='text-white/50 ml-2'>Thorium</span>
                  </h3>
                  <div className='text-lg text-white/70'>
                    Half-life: <span className='font-bold text-white'>24.1 days</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50'>Active Step</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                min-h-[60vh] flex flex-col justify-center py-12 cursor-pointer transition-opacity opacity-100
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Inactive Step</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                min-h-[60vh] flex flex-col justify-center py-12 cursor-pointer transition-opacity opacity-40
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Hint */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Controls Hint
            </h3>
            <p className='text-sm text-black/50'>
              Galaxy Merger
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded text-right'>
              <span className='text-white/40 text-xs'>Drag to rotate | Scroll to zoom</span>
            </div>
            <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
              text-white/40 text-xs
            </code>
          </div>
        </div>
      </section>

      {/* Toggle Info Button */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Toggle Info Button
            </h3>
            <p className='text-sm text-black/50'>
              Galaxy Merger
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black p-6 rounded'>
              <button className='w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='white'>
                  <circle cx='8' cy='8' r='6' stroke='white' fill='none' strokeWidth='1.5' />
                  <path d='M8 7v4M8 5v1' stroke='white' strokeWidth='1.5' strokeLinecap='round' />
                </svg>
              </button>
            </div>
            <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
              w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors
            </code>
          </div>
        </div>
      </section>

      {/* Visualization Container */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Visualization Container
            </h3>
            <p className='text-sm text-black/50'>
              Canvas/WebGL wrapper
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-[#0A0A0F] p-6 rounded border border-white/10'>
              <div className='aspect-video flex items-center justify-center text-white/30 text-sm font-mono'>
                Canvas / WebGL Content
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50'>Dark Canvas Background</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                bg-[#0A0A0F]
              </code>
              <p className='text-xs font-mono uppercase tracking-wider text-black/50 mt-4'>Sticky Side Panel</p>
              <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
                lg:sticky lg:top-16 h-screen lg:h-[calc(100vh-64px)] bg-[#0A0A0F] flex flex-col
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Header Bar */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Sticky Control Bar
            </h3>
            <p className='text-sm text-black/50'>
              Decay Chain Explorer
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black/90 border-b border-white/10 px-4 py-3 rounded'>
              <div className='flex items-center justify-between'>
                <div className='flex gap-2'>
                  <span className='px-3 py-1 text-sm rounded bg-[var(--color-blue)] text-white'>Active</span>
                  <span className='px-3 py-1 text-sm rounded bg-white/10 text-white/70'>Inactive</span>
                </div>
                <span className='text-xs text-white/50'>Step 7 of 14</span>
              </div>
            </div>
            <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
              sticky top-0 z-40 bg-black/90 border-b border-white/10 px-4 py-3
            </code>
          </div>
        </div>
      </section>

      {/* Timeline Control Bar */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-black/10'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h3 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              Timeline Control Bar
            </h3>
            <p className='text-sm text-black/50'>
              Galaxy Merger (bottom bar)
            </p>
          </div>
          <div className='space-y-6'>
            <div className='bg-black/80 backdrop-blur-sm border-t border-white/10 p-4 rounded'>
              <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-4'>
                  <div className='w-10 h-10 flex items-center justify-center bg-white/10 rounded-full'>
                    <span className='text-white text-xs'>Play</span>
                  </div>
                  <select className='bg-white/10 text-white text-sm px-2 py-1 rounded border border-white/20'>
                    <option>1x</option>
                  </select>
                </div>
                <div className='text-right'>
                  <div className='text-lg font-mono text-white'>T + 3.85 Gyr</div>
                  <div className='text-xs text-white/50'>3850 Myr</div>
                </div>
              </div>
              <div className='h-8 bg-white/5 rounded relative'>
                <div className='absolute top-0 left-0 h-full w-[45%] bg-[#0055FF]/20 rounded-l' />
              </div>
            </div>
            <code className='text-xs font-mono text-black/50 block bg-black/5 p-2'>
              bg-black/80 backdrop-blur-sm border-t border-white/10 p-4
            </code>
          </div>
        </div>
      </section>

      {/* Don&apos;ts */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 bg-black text-white'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <div>
            <h2 className='text-2xl md:text-3xl font-display tracking-tight mb-2'>
              What NOT to Do
            </h2>
            <p className='text-sm text-white/50'>
              Immutable rules
            </p>
          </div>
          <div className='space-y-4'>
            <ul className='space-y-2 text-white/70'>
              <li className='flex gap-2'>
                <span className='text-[var(--color-pink)]'>✕</span>
                <span>Add new colors beyond the 5 brand colors</span>
              </li>
              <li className='flex gap-2'>
                <span className='text-[var(--color-pink)]'>✕</span>
                <span>Use arbitrary Tailwind values (py-7, gap-5, etc.)</span>
              </li>
              <li className='flex gap-2'>
                <span className='text-[var(--color-pink)]'>✕</span>
                <span>Change fonts from NHG Display/Text/Input Mono</span>
              </li>
              <li className='flex gap-2'>
                <span className='text-[var(--color-pink)]'>✕</span>
                <span>Use light font weights for headings (always Bold 700)</span>
              </li>
              <li className='flex gap-2'>
                <span className='text-[var(--color-pink)]'>✕</span>
                <span>Add shadows (design is flat)</span>
              </li>
              <li className='flex gap-2'>
                <span className='text-[var(--color-pink)]'>✕</span>
                <span>Add border-radius (keep everything sharp)</span>
              </li>
              <li className='flex gap-2'>
                <span className='text-[var(--color-pink)]'>✕</span>
                <span>Add animations beyond hover states</span>
              </li>
              <li className='flex gap-2'>
                <span className='text-[var(--color-pink)]'>✕</span>
                <span>Use emoji</span>
              </li>
              <li className='flex gap-2'>
                <span className='text-[var(--color-pink)]'>✕</span>
                <span>Add a max-width container (full-width layout)</span>
              </li>
              <li className='flex gap-2'>
                <span className='text-[var(--color-pink)]'>✕</span>
                <span>Use multi-column grids for work sections (1 column only)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// Component: Color Swatch
function ColorSwatch({
  name,
  hex,
  variable,
  className,
  onCopy,
  copied
}: {
  name: string;
  hex: string;
  variable: string;
  className: string;
  onCopy: (text: string) => void;
  copied: string | null;
}) {
  return (
    <button
      onClick={() => onCopy(variable)}
      className={`p-4 text-left transition-transform hover:scale-[0.98] ${className}`}
    >
      <p className='font-display text-sm mb-1'>{name}</p>
      <p className='text-xs font-mono opacity-70'>{hex}</p>
      <p className='text-xs font-mono opacity-50 mt-2'>
        {copied === variable ? 'Copied!' : variable}
      </p>
    </button>
  );
}

// Component: Type Scale Item
function TypeScaleItem({
  label,
  example,
  className,
  sizes,
  onCopy,
  copied
}: {
  label: string;
  example: string;
  className: string;
  sizes: string;
  onCopy: (text: string) => void;
  copied: string | null;
}) {
  return (
    <button
      onClick={() => onCopy(className)}
      className='w-full text-left p-4 border border-black/10 hover:border-black/20 transition-colors'
    >
      <p className='text-xs font-mono uppercase tracking-wider text-black/50 mb-2'>{label}</p>
      <p className={className}>{example}</p>
      <p className='text-xs font-mono text-black/50 mt-2'>
        {copied === className ? 'Copied!' : sizes}
      </p>
    </button>
  );
}

// Component: Opacity Item
function OpacityItem({
  label,
  className,
  example,
  onCopy,
  copied
}: {
  label: string;
  className: string;
  example: string;
  onCopy: (text: string) => void;
  copied: string | null;
}) {
  return (
    <button
      onClick={() => onCopy(className)}
      className='w-full text-left p-4 border border-black/10 hover:border-black/20 transition-colors'
    >
      <p className='text-xs font-mono uppercase tracking-wider text-black/50 mb-2'>{label}</p>
      <p className={className}>{example}</p>
      <p className='text-xs font-mono text-black/50 mt-2'>
        {copied === className ? 'Copied!' : className}
      </p>
    </button>
  );
}

// Component: Spacing Item
function SpacingItem({ name, value, pixels }: { name: string; value: string; pixels: string }) {
  return (
    <div className='flex items-center gap-4 p-2'>
      <span className='text-xs font-mono w-12 text-black/50'>{name}</span>
      <div className='flex-1 h-4 bg-[var(--color-blue)]/20' style={{ width: value }} />
      <span className='text-xs font-mono text-black/50'>{value}</span>
      <span className='text-xs font-mono text-black/30'>{pixels}</span>
    </div>
  );
}
