import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work  - Bang Industries',
  description: 'Selected projects in data visualisation, explanation design, and scientific illustration.',
  alternates: {
    canonical: 'https://bangindustries.co/work',
  },
};

const projects = [
  {
    id: 1,
    title: 'Avocado vs Homeownership',
    category: 'Data Visualisation',
    description: 'The correlation between avocado prices and millennial homeownership rates.',
    slug: 'avocado-homeownership',
    color: 'bg-[var(--color-lime)]',
  },
  {
    id: 2,
    title: 'Cities for Artists',
    category: 'Data Visualisation',
    description: 'Where can you afford to be creative? A global ranking.',
    slug: 'cities-for-artists',
    color: 'bg-[var(--color-pink)]',
  },
  {
    id: 3,
    title: 'Mxwll Dashboard System',
    category: 'Interactive Design',
    description: 'Pictogram system and data widgets for energy management.',
    slug: 'mxwll',
    color: 'bg-[var(--color-blue)]',
  },
  {
    id: 4,
    title: 'Atomic Printworks',
    category: 'Scientific Illustration',
    description: 'Periodic table, solar system, and scientific poster designs.',
    slug: 'atomic-printworks',
    color: 'bg-black',
  },
  {
    id: 5,
    title: 'Book Illustrations',
    category: 'Explanation Design',
    description: 'Interior illustrations and infographics for published books.',
    slug: 'books',
    color: 'bg-[var(--color-blue)]',
  },
  {
    id: 6,
    title: 'Project Six',
    category: 'Data Visualisation',
    description: 'Project description placeholder.',
    slug: 'project-6',
    color: 'bg-[var(--color-pink)]',
  },
  {
    id: 7,
    title: 'The Main Sequence and Beyond',
    category: 'Data Visualisation',
    description: 'Mapping stellar evolution with GAIA data across the Hertzsprung-Russell diagram.',
    slug: 'stellar-evolution',
    color: 'bg-black',
  },
  {
    id: 8,
    title: 'Fragile by Design',
    category: 'Interactive Design',
    description: 'How topology shapes resilience, epidemics, and information flow in networks.',
    slug: 'network-theory',
    color: 'bg-[var(--color-blue)]',
  },
  {
    id: 9,
    title: 'From Gates to Gradients',
    category: 'Interactive Design',
    description: 'How logic circuits become learning machines.',
    slug: 'logic-systems',
    color: 'bg-[var(--color-pink)]',
  },
];

const categories = ['All', 'Data Visualisation', 'Explanation Design', 'Scientific Illustration', 'Interactive Design'];

export default function WorkPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20'>
        <div className='max-w-full lg:max-w-[75%]'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]'>
            Work
          </h1>
          <p className='text-base text-black/70 max-w-2xl mt-4'>
            Selected projects in data visualisation, explanation design, and scientific illustration.
            Each piece is crafted to make complex information clear and visually compelling.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className='px-4 md:px-8 lg:px-12 border-y border-black/10'>
        <div className='py-4'>
          <div className='flex flex-wrap gap-4'>
            {categories.map((category, index) => (
              <button
                key={category}
                className={`text-sm px-4 py-2 transition-colors ${
                  index === 0
                    ? 'bg-black text-white'
                    : 'text-black/70 hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
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
                <div className={`aspect-[4/3] ${project.color} mb-4 flex items-center justify-center transition-transform group-hover:scale-[0.98]`}>
                  <span className='text-white/50 font-mono text-sm'>
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
                </div>
                <div className='mb-2'>
                  <span className='text-xs font-mono text-black/50'>
                    {project.category}
                  </span>
                </div>
                <h2 className='text-xl md:text-2xl lg:text-3xl font-bold tracking-tight group-hover:text-[var(--color-blue)] transition-colors'>
                  {project.title}
                </h2>
                <p className='text-black/70 mt-2'>
                  {project.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 bg-black text-white'>
        <div className='max-w-xl'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4'>
            Have a project in mind?
          </h2>
          <p className='text-white/70 mb-8 max-w-xl'>
            We&apos;re always interested in new challenges. Let&apos;s discuss how we can bring visual clarity to your data.
          </p>
          <Link
            href='/contact'
            className='inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-lime)] text-black hover:bg-white transition-colors'
          >
            Get in Touch
            <span aria-hidden='true'>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
