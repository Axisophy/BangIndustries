import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bang Industries — Data Visualisation & Explanation Design',
  description: 'Design studio specialising in data visualisation, scientific illustration, and explanation design. We make complex ideas clear and visually extraordinary.',
  alternates: {
    canonical: 'https://bangindustries.co',
  },
};

// Placeholder project data
const projects = [
  {
    slug: 'maxwell-pictograms',
    number: '01',
    title: 'Maxwell Pictogram System',
    description: 'Systematic visual language for energy data communication',
    tags: ['Pictograms', 'Systems Design', 'Data Visualisation'],
    year: '2024',
  },
  {
    slug: 'atomic-printworks',
    number: '02',
    title: 'Atomic Printworks',
    description: 'Scientific visualisation posters and educational prints',
    tags: ['Scientific Illustration', 'Print', 'Education'],
    year: '2023',
  },
  {
    slug: 'phylogenetic-trees',
    number: '03',
    title: 'Phylogenetic Tree Visualisation',
    description: 'Interactive D3.js visualisation of insect taxonomy',
    tags: ['Interactive', 'D3.js', 'Science'],
    year: '2024',
  },
];

export default function Home() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Project Section */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20'>
        {/* Colored placeholder for hero image/video */}
        <div className='w-full aspect-[16/9] bg-[var(--color-blue)]' />

        {/* Hero project title */}
        <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mt-8'>
          Maxwell Pictogram System
        </h1>

        {/* 2-column layout: empty left, text right */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
          <div>{/* Empty left column */}</div>
          <div>
            <p className='font-display text-lg md:text-xl lg:text-2xl' style={{ fontWeight: 700, letterSpacing: '-0.03em' }}>
              A systematic visual language designed for energy data communication.
              Built on a 50x50 grid with triangle motifs derived from Neue Haas Grotesk,
              creating a cohesive pictogram system that scales from dashboard widgets
              to large-format environmental graphics.
            </p>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-8 md:mb-12'>
          Selected work:
        </h2>

        {/* 1-column project list */}
        <div className='grid grid-cols-1 gap-px'>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className='group block'
            >
              <article className='py-8 border-t border-black/10'>
                <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                  <div className='flex-1'>
                    <div className='flex items-baseline gap-4 mb-2'>
                      <span className='text-xs font-mono text-black/50'>[{project.number}]</span>
                      <h3 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight group-hover:text-[var(--color-blue)] transition-colors'>
                        {project.title}
                      </h3>
                    </div>
                    <p className='text-black/70 max-w-xl'>
                      {project.description}
                    </p>
                  </div>
                  <div className='flex flex-wrap gap-2 md:justify-end'>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className='text-xs font-mono uppercase tracking-wider text-black/50 bg-black/5 px-2 py-1'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className='mt-8 md:mt-12'>
          <Link
            href='/work'
            className='text-base text-black/50 hover:text-[var(--color-blue)] transition-colors inline-flex items-center gap-2'
          >
            View all work <span aria-hidden='true'>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
