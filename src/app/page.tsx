import Link from 'next/link';

// Placeholder project data - will be replaced with actual content
const featuredProjects = [
  {
    id: 1,
    title: 'Project Title',
    category: 'Data Visualisation',
    slug: 'project-1',
    color: 'bg-[var(--color-blue)]',
  },
  {
    id: 2,
    title: 'Project Title',
    category: 'Explanation Design',
    slug: 'project-2',
    color: 'bg-[var(--color-pink)]',
  },
  {
    id: 3,
    title: 'Project Title',
    category: 'Scientific Illustration',
    slug: 'project-3',
    color: 'bg-[var(--color-lime)]',
  },
  {
    id: 4,
    title: 'Project Title',
    category: 'Interactive',
    slug: 'project-4',
    color: 'bg-black',
  },
];

const services = [
  {
    title: 'Data Visualisation',
    description: 'Turning complex datasets into clear, compelling visual stories.',
  },
  {
    title: 'Explanation Design',
    description: 'Making difficult concepts accessible through thoughtful visual communication.',
  },
  {
    title: 'Scientific Illustration',
    description: 'Accurate, beautiful imagery that communicates technical subject matter.',
  },
];

export default function Home() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center">
        <div className="container py-16 md:py-24">
          <div className="max-w-4xl">
            {/* Hero Video/Animation Placeholder */}
            <div className="mb-8 md:mb-12">
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <span className="text-white/40 font-mono text-sm">
                  [Hero visualisation placeholder]
                </span>
              </div>
            </div>
            
            <h1 className="mb-6">
              Data visualisation has become homogenised.
              <br />
              <span className="text-[var(--color-blue)]">We&apos;re here to change that.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-black/60 max-w-2xl mb-8">
              Bang Industries is a design studio specialising in data visualisation, 
              explanation design, and scientific illustration. We come from art and branding, 
              not spreadsheets.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/work" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm hover:bg-[var(--color-blue)] transition-colors"
              >
                View Work
                <span aria-hidden="true">→</span>
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 border border-black text-sm hover:bg-black hover:text-white transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-16 md:py-24 border-t border-black/10">
        <div className="container">
          <div className="flex items-baseline justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl">Selected Work</h2>
            <Link 
              href="/work" 
              className="text-sm text-black/60 hover:text-[var(--color-blue)] transition-colors"
            >
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
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
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg group-hover:text-[var(--color-blue)] transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-black/40">
                    {project.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container">
          <div className="max-w-4xl mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl mb-4">What We Do</h2>
            <p className="text-lg text-white/60">
              We make complex information clear and beautiful. Whether it&apos;s a scientific paper, 
              an annual report, or an interactive experience — we bring the visual ambition 
              that makes your story stand out.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {services.map((service, index) => (
              <div key={index}>
                <span className="inline-block text-xs font-mono text-white/40 mb-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl mb-2">{service.title}</h3>
                <p className="text-white/60">{service.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-[var(--color-lime)] hover:text-white transition-colors"
            >
              All services →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl mb-4">Let&apos;s Work Together</h2>
            <p className="text-lg text-black/60 mb-8">
              Have a project that needs visual clarity and creative ambition? 
              We&apos;d love to hear about it.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-blue)] text-white hover:bg-black transition-colors"
            >
              Start a Conversation
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
