import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work — Bang Industries',
  description: 'Selected projects in data visualisation, explanation design, and scientific illustration.',
};

// Placeholder project data - will be replaced with actual content
const projects = [
  {
    id: 1,
    title: 'Avocado vs Homeownership',
    category: 'Data Visualisation',
    description: 'The correlation between avocado prices and millennial homeownership rates.',
    slug: 'avocado-homeownership',
    color: 'bg-[var(--color-lime)]',
    featured: true,
  },
  {
    id: 2,
    title: 'Cities for Artists',
    category: 'Data Visualisation',
    description: 'Where can you afford to be creative? A global ranking.',
    slug: 'cities-for-artists',
    color: 'bg-[var(--color-pink)]',
    featured: true,
  },
  {
    id: 3,
    title: 'Mxwll Dashboard System',
    category: 'Interactive Design',
    description: 'Pictogram system and data widgets for energy management.',
    slug: 'mxwll',
    color: 'bg-[var(--color-blue)]',
    featured: true,
  },
  {
    id: 4,
    title: 'Atomic Printworks',
    category: 'Scientific Illustration',
    description: 'Periodic table, solar system, and scientific poster designs.',
    slug: 'atomic-printworks',
    color: 'bg-black',
    featured: false,
  },
  {
    id: 5,
    title: 'Book Illustrations',
    category: 'Explanation Design',
    description: 'Interior illustrations and infographics for published books.',
    slug: 'books',
    color: 'bg-[var(--color-blue)]',
    featured: false,
  },
  {
    id: 6,
    title: 'Project Six',
    category: 'Data Visualisation',
    description: 'Project description placeholder.',
    slug: 'project-6',
    color: 'bg-[var(--color-pink)]',
    featured: false,
  },
  {
    id: 7,
    title: 'The Main Sequence and Beyond',
    category: 'Data Visualisation',
    description: 'Mapping stellar evolution with GAIA data across the Hertzsprung-Russell diagram.',
    slug: 'stellar-evolution',
    color: 'bg-black',
    featured: false,
  },
  {
    id: 8,
    title: 'Fragile by Design',
    category: 'Interactive Design',
    description: 'How topology shapes resilience, epidemics, and information flow in networks.',
    slug: 'network-theory',
    color: 'bg-[var(--color-blue)]',
    featured: false,
  },
];

const categories = ['All', 'Data Visualisation', 'Explanation Design', 'Scientific Illustration', 'Interactive Design'];

export default function WorkPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl mb-6">Work</h1>
          <p className="text-xl text-black/60 max-w-2xl">
            Selected projects in data visualisation, explanation design, and scientific illustration. 
            Each piece is crafted to make complex information clear and visually compelling.
          </p>
        </div>
      </section>

      {/* Filter (placeholder - can be made interactive later) */}
      <section className="border-y border-black/10">
        <div className="container py-4">
          <div className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`text-sm px-4 py-2 transition-colors ${
                  index === 0 
                    ? 'bg-black text-white' 
                    : 'text-black/60 hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <Link 
                key={project.id} 
                href={`/work/${project.slug}`}
                className="group block"
              >
                <div className={`aspect-[4/3] ${project.color} mb-4 flex items-center justify-center transition-transform group-hover:scale-[0.98]`}>
                  <span className="text-white/40 font-mono text-sm">
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-mono text-black/40">
                    {project.category}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl mb-2 group-hover:text-[var(--color-blue)] transition-colors">
                  {project.title}
                </h2>
                <p className="text-black/60">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl mb-4">Have a project in mind?</h2>
          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
            We&apos;re always interested in new challenges. Let&apos;s discuss how we can bring visual clarity to your data.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-lime)] text-black hover:bg-white transition-colors"
          >
            Get in Touch
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
