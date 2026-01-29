import Link from 'next/link';
import { notFound } from 'next/navigation';

// This would typically come from a CMS or data file
const projects: Record<string, {
  title: string;
  category: string;
  year: string;
  client?: string;
  description: string;
  challenge: string;
  solution: string;
  color: string;
}> = {
  'avocado-homeownership': {
    title: 'Avocado vs Homeownership',
    category: 'Data Visualisation',
    year: '2026',
    description: 'An irreverent look at the correlation between avocado prices and millennial homeownership rates.',
    challenge: 'The "avocado toast" debate has become a cultural touchpoint for discussions about generational wealth and housing affordability. We wanted to create a visualisation that was both statistically rigorous and tongue-in-cheek.',
    solution: 'Using ONS avocado price data and IFS homeownership statistics, we created a dual-axis timeline that reveals the (coincidental) correlation between rising avocado prices and falling youth homeownership rates.',
    color: 'bg-[var(--color-lime)]',
  },
  'cities-for-artists': {
    title: 'Cities for Artists',
    category: 'Data Visualisation',
    year: '2026',
    description: 'A global ranking of cities by affordability for creative workers.',
    challenge: 'Where can you afford to be an artist? Traditional "best cities for creatives" lists often ignore the fundamental issue: whether you can actually afford to live there on a creative income.',
    solution: 'We combined artist wage data with cost of living metrics to calculate how many hours an artist needs to work to afford rent in different cities worldwide.',
    color: 'bg-[var(--color-pink)]',
  },
  'mxwll': {
    title: 'Mxwll Dashboard System',
    category: 'Interactive Design',
    year: '2024',
    client: 'Maxwell Energy',
    description: 'A comprehensive pictogram system and interactive dashboard for energy management.',
    challenge: 'Maxwell needed a visual language to communicate complex energy data to non-technical users, while maintaining the precision required for professional energy managers.',
    solution: 'We developed a custom pictogram system based on a 50×50 grid with consistent triangle motifs, alongside a suite of data widgets that translate real-time energy data into intuitive visual displays.',
    color: 'bg-[var(--color-blue)]',
  },
  'atomic-printworks': {
    title: 'Atomic Printworks',
    category: 'Scientific Illustration',
    year: '2020–Present',
    description: 'Scientific poster designs including periodic table and solar system visualisations.',
    challenge: 'Scientific posters often sacrifice visual appeal for accuracy, or vice versa. We wanted to create prints that scientists would hang on their walls — beautiful and accurate.',
    solution: 'Using Müller-Brockmann\'s grid system, we developed a visual language for scientific data that maintains rigorous accuracy while achieving genuine visual beauty.',
    color: 'bg-black',
  },
  'books': {
    title: 'Book Illustrations',
    category: 'Explanation Design',
    year: '2015–Present',
    description: 'Interior illustrations and infographics for published books.',
    challenge: 'Books require illustrations that work within the constraints of print production while effectively explaining complex concepts to general readers.',
    solution: 'We create clear, engaging illustrations that work in both colour and black-and-white, designed to complement the text rather than compete with it.',
    color: 'bg-[var(--color-blue)]',
  },
};

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug];
  
  if (!project) {
    return {
      title: 'Project Not Found — Bang Industries',
    };
  }
  
  return {
    title: `${project.title} — Bang Industries`,
    description: project.description,
    alternates: {
      canonical: `https://bangindustries.co/work/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug];
  
  if (!project) {
    notFound();
  }

  const projectKeys = Object.keys(projects);
  const currentIndex = projectKeys.indexOf(slug);
  const nextSlug = projectKeys[(currentIndex + 1) % projectKeys.length];
  const nextProject = projects[nextSlug];

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-8">
            <Link 
              href="/work" 
              className="text-sm text-black/40 hover:text-black transition-colors"
            >
              ← Back to Work
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-8">
              <h1 className="text-4xl md:text-5xl mb-4">{project.title}</h1>
              <p className="text-xl text-black/60">{project.description}</p>
            </div>
            <div className="md:col-span-4">
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs font-mono uppercase tracking-wider text-black/40">Category</dt>
                  <dd className="text-black">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono uppercase tracking-wider text-black/40">Year</dt>
                  <dd className="text-black">{project.year}</dd>
                </div>
                {project.client && (
                  <div>
                    <dt className="text-xs font-mono uppercase tracking-wider text-black/40">Client</dt>
                    <dd className="text-black">{project.client}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className={`aspect-video ${project.color} flex items-center justify-center`}>
            <span className="text-white/40 font-mono text-sm">
              [Project hero image]
            </span>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 md:py-24 border-t border-black/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-black/40 mb-4">
                The Challenge
              </h2>
              <p className="text-lg text-black/70">{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-black/40 mb-4">
                The Solution
              </h2>
              <p className="text-lg text-black/70">{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Images Placeholder */}
      <section className="py-16 md:py-24 bg-black/[0.02]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-[4/3] bg-black/10 flex items-center justify-center">
              <span className="text-black/40 font-mono text-sm">[Image 01]</span>
            </div>
            <div className="aspect-[4/3] bg-black/10 flex items-center justify-center">
              <span className="text-black/40 font-mono text-sm">[Image 02]</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="aspect-video bg-black/10 flex items-center justify-center">
            <span className="text-black/40 font-mono text-sm">[Full-width image]</span>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="py-16 md:py-24 border-t border-black/10">
        <div className="container">
          <p className="text-xs font-mono uppercase tracking-wider text-black/40 mb-4">
            Next Project
          </p>
          <Link 
            href={`/work/${nextSlug}`}
            className="group block"
          >
            <h2 className="text-3xl md:text-4xl group-hover:text-[var(--color-blue)] transition-colors">
              {nextProject.title}
              <span className="inline-block ml-4 transition-transform group-hover:translate-x-2">→</span>
            </h2>
          </Link>
        </div>
      </section>
    </div>
  );
}
