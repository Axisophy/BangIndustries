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
      {/* White space below header */}
      <div className="h-16 md:h-24 lg:h-32" />

      {/* Hero Project Section */}
      <section className="px-4 md:px-6">
        {/* Colored placeholder for hero image/video */}
        <div className="w-full aspect-[16/9] bg-[var(--color-blue)]" />

        {/* Hero project title - big, NHG Bold */}
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl xl:text-7xl mt-6 md:mt-8">
          Maxwell Pictogram System
        </h1>

        {/* 2-column layout: empty left, text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 md:mt-8">
          <div>{/* Empty left column */}</div>
          <div>
            <p className="font-display text-lg md:text-xl lg:text-2xl" style={{ fontWeight: 700, letterSpacing: '-0.03em' }}>
              A systematic visual language designed for energy data communication.
              Built on a 50×50 grid with triangle motifs derived from Neue Haas Grotesk,
              creating a cohesive pictogram system that scales from dashboard widgets
              to large-format environmental graphics.
            </p>
          </div>
        </div>
      </section>

      {/* White space */}
      <div className="h-16 md:h-24 lg:h-32" />

      {/* Selected Work Section */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-12">
          Selected work:
        </h2>

        {/* 1-column project list */}
        <div className="grid grid-cols-1 gap-px">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block"
            >
              <article className="py-6 md:py-8 border-t border-black/10">
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

        {/* View all link */}
        <div className="mt-8 md:mt-12">
          <Link
            href="/work"
            className="text-base text-black/40 hover:text-[var(--color-blue)] transition-colors inline-flex items-center gap-2"
          >
            View all work <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
