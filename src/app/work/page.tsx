import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work  - Bang Industries',
  description: 'Interactive explainers that make complex ideas accessible. From fractals to stellar evolution, nuclear physics to orbital mechanics.',
  alternates: {
    canonical: 'https://bangindustries.co/work',
  },
};

const projects = [
  {
    id: 1,
    title: 'What are Fractals?',
    subtitle: 'A Beginner\'s Guide',
    category: 'Explanation Design',
    description: 'An accessible introduction to fractal geometry  - from simple self-similarity to the infinite complexity of the Mandelbrot set.',
    slug: 'fractals',
    tags: ['Mathematics', 'Interactive'],
  },
  {
    id: 2,
    title: 'Stellar Evolution',
    subtitle: 'A map of how stars live and die',
    category: 'Explanation Design',
    description: 'Using the Hertzsprung-Russell diagram to explore how every star in the night sky is on a journey through the same cosmic story.',
    slug: 'stellar-evolution',
    tags: ['Astronomy', 'Interactive'],
  },
  {
    id: 3,
    title: 'Chart of Nuclides',
    subtitle: 'A Beginner\'s Guide',
    category: 'Explanation Design',
    description: 'From the familiar periodic table to the vast landscape of 3,300+ atomic species. What makes atoms stable or unstable.',
    slug: 'nuclide-chart',
    tags: ['Nuclear Physics', 'Interactive'],
  },
  {
    id: 4,
    title: 'Orbital Mechanics',
    subtitle: 'A Beginner\'s Guide',
    category: 'Explanation Design',
    description: 'How spacecraft navigate  - from the counterintuitive physics of orbits to the elegant mathematics of getting to the Moon.',
    slug: 'orbital-mechanics',
    tags: ['Space', 'Interactive'],
  },
];

export default function WorkPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]'>
          Work
        </h1>
        <p className='text-lg md:text-xl lg:text-2xl font-normal text-black/70 mt-2'>
          Explanation Design
        </p>
        <p className='text-base text-black/70 max-w-3xl mt-6 md:mt-8'>
          Interactive explainers that make complex ideas accessible. Each piece builds understanding progressively  - starting with what you already know, then revealing the deeper structure beneath.
        </p>
      </section>

      {/* Project Grid  - single column */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 gap-px'>
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className='group block'
            >
              <article className='py-8 border-b border-black/10'>
                <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-8'>
                  {/* Left: Number and category */}
                  <div className='flex items-baseline gap-4'>
                    <span className='text-xs font-mono text-black/40'>
                      [{String(index + 1).padStart(2, '0')}]
                    </span>
                    <span className='text-xs font-mono uppercase tracking-wider text-black/50'>
                      {project.category}
                    </span>
                  </div>

                  {/* Right: Content */}
                  <div>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight group-hover:text-[var(--color-blue)] transition-colors'>
                      {project.title}
                    </h2>
                    <p className='text-lg md:text-xl text-black/70 mt-1'>
                      {project.subtitle}
                    </p>
                    <p className='text-black/70 mt-4 max-w-2xl'>
                      {project.description}
                    </p>
                    <div className='flex flex-wrap gap-2 mt-4'>
                      {project.tags.map((tag) => (
                        <span key={tag} className='px-3 py-1 text-xs bg-black/5 text-black/60'>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='px-4 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24 bg-black text-white'>
        <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
            Have a complex idea?
          </h2>
          <div>
            <p className='text-white/70 mb-8 max-w-xl'>
              We build interactive explainers that make difficult concepts accessible. If you have something that needs explaining  - to customers, students, or the public  - let&apos;s talk.
            </p>
            <Link
              href='/contact'
              className='inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-lime)] text-black font-display font-bold hover:bg-white transition-colors'
            >
              Get in Touch
              <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
