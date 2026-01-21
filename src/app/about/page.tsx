import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Bang Industries',
  description: 'Bang Industries is a design studio founded by Simon Tyler, specialising in data visualisation and explanation design.',
};

const experience = [
  {
    title: 'Author & Illustrator',
    description: 'Multiple published books combining illustration with explanation of complex topics.',
  },
  {
    title: 'Atomic Printworks',
    description: 'Scientific poster designs including periodic table and solar system visualisations.',
  },
  {
    title: 'Maxwell Energy',
    description: 'Interactive dashboard design and custom pictogram system development.',
  },
  {
    title: 'Network Rail',
    description: 'Wayfinding pictogram system design (via Space Agency).',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {/* Photo Placeholder */}
            <div className="md:col-span-5">
              <div className="aspect-[4/5] bg-black/5 flex items-center justify-center">
                <span className="text-black/40 font-mono text-sm">
                  [Photo]
                </span>
              </div>
            </div>
            
            {/* Bio */}
            <div className="md:col-span-7">
              <h1 className="text-4xl md:text-5xl mb-6">About</h1>
              <div className="space-y-6 text-lg text-black/70">
                <p>
                  Bang Industries is a design studio founded by <strong className="text-black">Simon Tyler</strong>, 
                  specialising in data visualisation, explanation design, and scientific illustration.
                </p>
                <p>
                  We come from art and branding, not spreadsheets. In a world where data visualisation 
                  has become homogenised — where every dashboard looks the same and every infographic 
                  uses the same templates — we offer something different.
                </p>
                <p>
                  Our work combines technical capability with genuine visual ambition. We understand 
                  the science, the data, and the complexity — but we also understand that the best 
                  explanation is one that people actually want to look at.
                </p>
                <p>
                  Based in St Leonards-on-Sea, UK, we work with clients worldwide on projects 
                  ranging from editorial infographics to interactive data experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl mb-8">Our Philosophy</h2>
            <div className="space-y-6 text-lg text-white/70">
              <p>
                <strong className="text-white">We believe complexity deserves beauty.</strong> The more 
                difficult the subject matter, the more important it is to present it with visual clarity 
                and craft.
              </p>
              <p>
                <strong className="text-white">We believe in understanding first.</strong> We don&apos;t just 
                make data look nice — we understand what it means, why it matters, and how to communicate 
                that effectively.
              </p>
              <p>
                <strong className="text-white">We believe in standing out.</strong> AI and templates are 
                commoditising basic design. We offer the craft, expertise, and visual ambition that 
                makes your work genuinely distinctive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl md:text-3xl mb-12">Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experience.map((item, index) => (
              <div key={index} className="border-l-2 border-black/10 pl-6">
                <h3 className="text-xl mb-2">{item.title}</h3>
                <p className="text-black/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-16 md:py-24 border-t border-black/10">
        <div className="container">
          <h2 className="text-2xl md:text-3xl mb-12">Technical Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-black/40 mb-4">
                Design
              </h3>
              <ul className="space-y-2 text-black/70">
                <li>Adobe Illustrator</li>
                <li>Figma</li>
                <li>Adobe After Effects</li>
                <li>Blender</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-black/40 mb-4">
                Development
              </h3>
              <ul className="space-y-2 text-black/70">
                <li>D3.js</li>
                <li>Observable</li>
                <li>React / Next.js</li>
                <li>Python (Matplotlib, Plotly)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-black/40 mb-4">
                Specialisms
              </h3>
              <ul className="space-y-2 text-black/70">
                <li>Scientific subjects</li>
                <li>Complex systems</li>
                <li>Pictogram design</li>
                <li>Wayfinding</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--color-lime)]">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl mb-4">Let&apos;s work together</h2>
          <p className="text-lg text-black/70 mb-8 max-w-xl mx-auto">
            Have a project that needs visual clarity and creative ambition? We&apos;d love to hear from you.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-[var(--color-blue)] transition-colors"
          >
            Get in Touch
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
