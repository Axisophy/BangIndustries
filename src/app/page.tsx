import Link from 'next/link';

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
    <>
      {/* Hero Section */}
      <section className="pt-[100px] px-4 md:px-6 py-12 md:py-16 lg:py-20">
        <div className="mb-16 md:mb-24 max-w-[75%]">
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]">
            Data visualisation and explanation design studio
          </h1>
          <p className="mt-8 text-black/60 max-w-2xl">
            We make complex ideas clear. Scientific visualisation, illustrated explanation, 
            and interactive data design for publishers, institutions, and organisations 
            who need to communicate with precision and craft.
          </p>
        </div>
      </section>

      {/* Selected Work Section - 1 column */}
      <section className="px-4 md:px-6 py-12 md:py-16 lg:py-20">
        <div className="flex items-baseline justify-between mb-8 md:mb-12">
          <h2 className="font-display text-2xl md:text-3xl">Selected Work</h2>
          <Link 
            href="/work" 
            className="text-sm text-black/40 hover:text-[var(--color-blue)] transition-colors inline-flex items-center gap-2"
          >
            View all <span aria-hidden="true">→</span>
          </Link>
        </div>
        
        {/* 1-column grid */}
        <div className="grid grid-cols-1 gap-px">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block"
            >
              <article className="py-8 md:py-12 border-t border-black/10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-xs font-mono text-black/40">[{project.number}]</span>
                      <h3 className="font-display text-xl md:text-2xl group-hover:text-[var(--color-blue)] transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-black/60 max-w-xl">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[10px] font-mono uppercase tracking-wider text-black/40 bg-black/5 px-2 py-1"
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
      </section>

      {/* Services Section - can keep multi-column */}
      <section className="px-4 md:px-6 py-12 md:py-16 lg:py-20 bg-black text-white">
        <h2 className="font-display text-2xl md:text-3xl mb-8 md:mb-12">What We Do</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="font-display text-xl md:text-2xl mb-4">Data Visualisation</h3>
            <p className="text-white/60">
              Transforming complex datasets into clear, compelling visual narratives. 
              From static graphics to interactive web experiences.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl md:text-2xl mb-4">Explanation Design</h3>
            <p className="text-white/60">
              Making difficult concepts accessible through illustrated explanation, 
              diagrams, and visual systems.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl md:text-2xl mb-4">Scientific Illustration</h3>
            <p className="text-white/60">
              Accurate, beautiful illustrations for research, publishing, 
              and educational materials.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-6 py-12 md:py-16 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl md:text-3xl mb-4">
            Have a project in mind?
          </h2>
          <p className="text-black/60 mb-8">
            We work with publishers, research institutions, museums, and organisations 
            who need to communicate complex information with clarity and craft.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-display hover:bg-[var(--color-blue)] transition-colors"
          >
            Get in touch <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
