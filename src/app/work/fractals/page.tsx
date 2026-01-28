'use client';

import { KochSnowflake } from './components/KochSnowflake';
import { MandelbrotExplorer } from './components/MandelbrotExplorer';
import { JuliaExplorer } from './components/JuliaExplorer';
import { NaturalFractalsGallery } from './components/NaturalFractalsGallery';

export default function FractalsPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 lg:pb-16'>
        <div className='max-w-full lg:max-w-[75%]'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]'>
            What are Fractals?
          </h1>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-black/70 mt-2'>
            A Beginner&apos;s Guide
          </p>
          <p className='text-base text-black/70 max-w-3xl mt-6 md:mt-8 lg:mt-12'>
            An accessible introduction to fractal geometry — from simple self-similarity to the infinite complexity of the Mandelbrot set. Designed to spark curiosity without requiring any mathematical background.
          </p>
          {/* Tags */}
          <div className='flex flex-wrap gap-2 mt-4 md:mt-6 lg:mt-8'>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Explanation Design</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Interactive</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Mathematics</span>
            <span className='px-3 py-1 text-xs bg-black/5 text-black/60'>Educational</span>
          </div>
        </div>
      </section>

      {/* Video Hero */}
      <section className='relative h-[70vh] min-h-[500px] bg-black overflow-hidden'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='absolute inset-0 w-full h-full object-cover'
        >
          <source src='https://bangindustries.co/video/mandelbrot_zoom_3840x2160.mp4' type='video/mp4' />
        </video>
        <div className='absolute inset-0 bg-black/40' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center text-white px-4'>
            <p className='text-lg md:text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto'>
              Infinite complexity. Simple rules. Zoom in forever.
            </p>
          </div>
        </div>
      </section>

      {/* The Core Idea */}
      <section className='px-4 md:px-8 lg:px-12 pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16 lg:pb-20'>
        <div className='max-w-3xl'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-6'>
            Patterns Within Patterns
          </h2>
          <div className='space-y-4 text-black/70 leading-relaxed'>
            <p>
              Fractals are patterns that repeat at every scale. Zoom in on a fractal, and you&apos;ll
              find smaller copies of the same shapes you just saw. Zoom in again, and there are more copies.
              This self-similarity continues forever.
            </p>
            <p>
              The remarkable thing about fractals is that this infinite complexity often emerges from
              surprisingly simple rules. A few lines of mathematics can generate structures of boundless
              intricacy.
            </p>
          </div>
        </div>

        {/* Zoom sequence placeholder */}
        <div className='mt-12 border border-black/10 aspect-[3/1] flex items-center justify-center bg-black/5'>
          <span className='text-black/30 text-sm font-mono'>zoom-sequence.jpg</span>
        </div>
        <p className='text-xs md:text-sm text-black/50 mt-4 max-w-2xl'>
          Self-similarity: each zoom reveals the same patterns at smaller scales.
        </p>
      </section>

      {/* Koch Snowflake */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <div className='max-w-3xl mb-8'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-6'>
            Infinite Complexity from Simple Rules
          </h2>
          <div className='space-y-4 text-black/70 leading-relaxed'>
            <p>
              The Koch snowflake is one of the simplest fractals to understand. Start with an
              equilateral triangle. Take each straight edge and replace it with a kinked version:
              remove the middle third and add two sides of a smaller triangle pointing outward.
            </p>
            <p>
              Now repeat. Every straight edge gets the same treatment. After just a few iterations,
              the simple triangle transforms into an intricate snowflake. Continue forever, and you
              get a shape with infinite perimeter but finite area.
            </p>
          </div>
        </div>
        <KochSnowflake />
      </section>

      {/* The Coastline Problem */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='max-w-3xl'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-6'>
            How Long is Britain&apos;s Coastline?
          </h2>
          <div className='space-y-4 text-black/70 leading-relaxed'>
            <p>
              In 1967, mathematician Benoit Mandelbrot asked a deceptively simple question:
              how long is the coast of Britain?
            </p>
            <p>
              The answer depends on your ruler. Measure with a 100km ruler, skipping over bays
              and inlets, and you get one number. Measure with a 1km ruler, following more detail,
              and the coastline is longer. Use a 1-metre ruler, tracing around every rock, and
              it&apos;s longer still.
            </p>
            <p>
              Coastlines are fractal. The closer you look, the more detail you find. There is
              no &quot;true&quot; length. This insight was one of the foundations of fractal geometry.
            </p>
          </div>
        </div>

        {/* Coastline diagram placeholder */}
        <div className='mt-12 border border-black/10 aspect-[2/1] flex items-center justify-center bg-black/5 max-w-2xl'>
          <span className='text-black/30 text-sm font-mono'>coastline-measurement.svg</span>
        </div>
        <p className='text-xs md:text-sm text-black/50 mt-4 max-w-2xl'>
          The same coastline measured at different scales yields different lengths.
        </p>
      </section>

      {/* Fractal Dimension */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='max-w-3xl'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-6'>
            Not Quite 1D, Not Quite 2D
          </h2>
          <div className='space-y-4 text-black/70 leading-relaxed'>
            <p>
              A straight line is one-dimensional. A filled square is two-dimensional. But what
              about a coastline? Or the Koch snowflake?
            </p>
            <p>
              These shapes are too complex to be one-dimensional, but they don&apos;t fill a plane
              like a square does. Mathematicians use the Hausdorff dimension (or fractal dimension)
              to measure this in-between quality.
            </p>
            <p>
              The Koch snowflake has a dimension of about 1.26, meaning it fills more space than a line
              but less than a plane. It&apos;s a measure of how thoroughly the shape fills space. The more
              convoluted and space-filling, the higher the dimension.
            </p>
          </div>
        </div>

        {/* Dimension comparison */}
        <div className='mt-12 grid grid-cols-3 gap-4 max-w-2xl'>
          <div className='border border-black/10 p-4 flex flex-col items-center'>
            <div className='h-24 flex items-center justify-center'>
              <svg width='100' height='4' viewBox='0 0 100 4'>
                <line x1='0' y1='2' x2='100' y2='2' stroke='black' strokeWidth='2' />
              </svg>
            </div>
            <span className='text-sm font-bold mt-2'>D = 1</span>
            <span className='text-xs text-black/50'>Line</span>
          </div>
          <div className='border border-black/10 p-4 flex flex-col items-center bg-[var(--color-blue)]/5'>
            <div className='h-24 flex items-center justify-center'>
              <svg width='80' height='80' viewBox='0 0 80 80'>
                <path
                  d='M40 5 L60 35 L55 35 L65 50 L55 50 L75 75 L5 75 L25 50 L15 50 L25 35 L20 35 Z'
                  fill='none'
                  stroke='#0055FF'
                  strokeWidth='1.5'
                />
              </svg>
            </div>
            <span className='text-sm font-bold mt-2'>D = 1.26</span>
            <span className='text-xs text-black/50'>Koch snowflake</span>
          </div>
          <div className='border border-black/10 p-4 flex flex-col items-center'>
            <div className='h-24 flex items-center justify-center'>
              <div className='w-16 h-16 bg-black' />
            </div>
            <span className='text-sm font-bold mt-2'>D = 2</span>
            <span className='text-xs text-black/50'>Square</span>
          </div>
        </div>
      </section>

      {/* Fractals in Nature */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <div className='max-w-3xl mb-8'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-6'>
            Nature&apos;s Favourite Pattern
          </h2>
          <div className='space-y-4 text-black/70 leading-relaxed'>
            <p>
              Fractals aren&apos;t just mathematical curiosities. They&apos;re everywhere in the natural
              world. Evolution has discovered that fractal branching is an efficient way to fill
              space, distribute resources, and maximise surface area.
            </p>
            <p>
              Look closely at a fern frond: each branch looks like a smaller copy of the whole.
              River deltas branch and rebranch in patterns that echo at every scale. Your lungs
              contain about 300 million tiny air sacs, reached through a fractal tree of branching
              airways.
            </p>
          </div>
        </div>
        <NaturalFractalsGallery />
      </section>

      {/* Mandelbrot Set */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <div className='max-w-3xl mb-8'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-6'>
            The Most Famous Fractal
          </h2>
          <div className='space-y-4 text-black/70 leading-relaxed'>
            <p>
              The Mandelbrot set is perhaps the most famous image in mathematics. It&apos;s generated
              by a simple formula: take a number, square it, add a constant, and repeat. Points
              that don&apos;t spiral off to infinity are &quot;in&quot; the set.
            </p>
            <p>
              The magic happens at the boundary. Zoom in on the edge of the Mandelbrot set and
              you&apos;ll find spirals, seahorses, and intricate filigree. Zoom deeper, and the detail
              never ends. And scattered throughout, you&apos;ll find miniature copies of the whole set,
              connected by delicate filaments.
            </p>
            <p>
              The set was visualised and popularised by Benoit Mandelbrot in the 1980s, though its
              mathematical foundations go back further. It has become an icon of complexity emerging
              from simplicity.
            </p>
          </div>
        </div>
        <MandelbrotExplorer />
      </section>

      {/* Julia Sets */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <div className='max-w-3xl mb-8'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-6'>
            The Mandelbrot&apos;s Cousins
          </h2>
          <div className='space-y-4 text-black/70 leading-relaxed'>
            <p>
              Every point on the Mandelbrot set corresponds to a different Julia set. Choose a
              point inside the Mandelbrot set, and the Julia set is connected, forming a single
              continuous shape. Choose a point outside, and the Julia set shatters into
              disconnected dust.
            </p>
            <p>
              The Mandelbrot set is, in a sense, a map of all possible Julia sets. The two are
              deeply intertwined mathematically, different views of the same underlying structure.
            </p>
          </div>
        </div>

        {/* 3D Julia gallery placeholder */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-8'>
          {['julia-dendrite.jpg', 'julia-rabbit.jpg', 'julia-spiral.jpg'].map((img) => (
            <div key={img} className='aspect-square bg-black/5 flex items-center justify-center border border-black/10'>
              <span className='text-black/30 text-xs font-mono'>{img}</span>
            </div>
          ))}
        </div>

        <JuliaExplorer />
      </section>

      {/* Beyond 2D */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='max-w-3xl'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-6'>
            Taking It Further
          </h2>
          <div className='space-y-4 text-black/70 leading-relaxed'>
            <p>
              The Mandelbrot and Julia sets live in two dimensions. But mathematicians and artists
              have extended fractal geometry into three dimensions and beyond. The Mandelbulb and
              Mandelbox are 3D analogues that produce stunning organic forms.
            </p>
          </div>
        </div>

        {/* 3D renders placeholder */}
        <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl'>
          <div className='aspect-square bg-black/5 flex items-center justify-center border border-black/10'>
            <span className='text-black/30 text-sm font-mono'>mandelbulb.jpg</span>
          </div>
          <div className='aspect-square bg-black/5 flex items-center justify-center border border-black/10'>
            <span className='text-black/30 text-sm font-mono'>mandelbox.jpg</span>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='max-w-3xl'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-6'>
            More Than Pretty Pictures
          </h2>
          <p className='text-black/70 leading-relaxed mb-8'>
            Fractals aren&apos;t just beautiful. They&apos;re useful.
          </p>

          <div className='space-y-6'>
            <div>
              <h3 className='font-bold mb-1'>Antenna design</h3>
              <p className='text-sm text-black/60'>
                Fractal antennas pack more electrical length into smaller spaces, enabling the
                compact antennas in mobile phones.
              </p>
            </div>
            <div>
              <h3 className='font-bold mb-1'>Computer graphics</h3>
              <p className='text-sm text-black/60'>
                Procedural fractals generate realistic terrain, clouds, and vegetation in films
                and games without storing enormous amounts of data.
              </p>
            </div>
            <div>
              <h3 className='font-bold mb-1'>Medicine</h3>
              <p className='text-sm text-black/60'>
                The fractal branching of blood vessels and airways provides insights into healthy
                and diseased tissue.
              </p>
            </div>
            <div>
              <h3 className='font-bold mb-1'>Finance</h3>
              <p className='text-sm text-black/60'>
                Mandelbrot&apos;s later work applied fractal geometry to financial markets, revealing
                patterns in price fluctuations that traditional models miss.
              </p>
            </div>
            <div>
              <h3 className='font-bold mb-1'>Data compression</h3>
              <p className='text-sm text-black/60'>
                Fractal compression algorithms exploit self-similarity to achieve high compression
                ratios for images.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Further Reading */}
      <section className='px-4 md:px-8 lg:px-12 pb-16 md:pb-20 lg:pb-24'>
        <div className='max-w-3xl'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-6'>
            Further Reading
          </h2>
          <ul className='space-y-2 text-sm'>
            <li>
              <a
                href='https://en.wikipedia.org/wiki/Mandelbrot_set'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--color-blue)] hover:text-black transition-colors'
              >
                Mandelbrot set (Wikipedia)
              </a>
            </li>
            <li>
              <a
                href='https://en.wikipedia.org/wiki/Julia_set'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--color-blue)] hover:text-black transition-colors'
              >
                Julia set (Wikipedia)
              </a>
            </li>
            <li>
              <a
                href='https://en.wikipedia.org/wiki/Fractal_dimension'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[var(--color-blue)] hover:text-black transition-colors'
              >
                Fractal dimension (Wikipedia)
              </a>
            </li>
          </ul>

          <p className='text-xs text-black/40 mt-8'>
            Interactive visualisations built with React and Canvas. Inspired by the work of
            Benoit Mandelbrot and countless fractal explorers.
          </p>
        </div>
      </section>

    </main>
  );
}
