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
