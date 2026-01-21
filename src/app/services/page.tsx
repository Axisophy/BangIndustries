import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Bang Industries',
  description: 'Data visualisation, explanation design, scientific illustration, interactive development, and pictogram systems.',
};

const services = [
  {
    number: '01',
    title: 'Data Visualisation',
    description: 'Turning complex datasets into clear, compelling visual stories. From static infographics to interactive experiences, we make data accessible and memorable.',
    capabilities: [
      'Static and interactive infographics',
      'Dashboard design',
      'Report visualisations',
      'Editorial data graphics',
      'Real-time data displays',
    ],
  },
  {
    number: '02',
    title: 'Explanation Design',
    description: 'Making difficult concepts accessible through thoughtful visual communication. We break down complexity without dumbing down the content.',
    capabilities: [
      'Process and system diagrams',
      'Educational materials',
      'Technical documentation',
      'Animated explanations',
      'Visual narratives',
    ],
  },
  {
    number: '03',
    title: 'Scientific Illustration',
    description: 'Accurate, beautiful imagery that communicates technical subject matter. We understand the science and translate it visually.',
    capabilities: [
      'Anatomical illustration',
      'Molecular and cellular graphics',
      'Astronomical visualisation',
      'Technical diagrams',
      'Natural history illustration',
    ],
  },
  {
    number: '04',
    title: 'Interactive Development',
    description: 'Custom-built interactive experiences using D3.js, React, and modern web technologies. Not templates — bespoke solutions.',
    capabilities: [
      'D3.js visualisations',
      'Observable notebooks',
      'React applications',
      'WebGL and 3D graphics',
      'Data-driven animations',
    ],
  },
  {
    number: '05',
    title: 'Pictogram Systems',
    description: 'Custom icon and pictogram systems that communicate consistently across platforms. Systematic thinking applied to visual language.',
    capabilities: [
      'Icon design systems',
      'Wayfinding pictograms',
      'Brand iconography',
      'UI icon sets',
      'Visual language guidelines',
    ],
  },
];

const tools = [
  'D3.js',
  'Observable',
  'React',
  'Python',
  'Blender',
  'After Effects',
  'Figma',
  'Illustrator',
];

export default function ServicesPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl mb-6">Services</h1>
          <p className="text-xl text-black/60 max-w-2xl">
            We specialise in making complex information clear and beautiful. 
            From data visualisation to scientific illustration, we bring visual ambition 
            to every project.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="border-t border-black/10">
        {services.map((service, index) => (
          <div 
            key={service.number}
            className={`border-b border-black/10 ${index % 2 === 1 ? 'bg-black/[0.02]' : ''}`}
          >
            <div className="container py-16 md:py-24">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                {/* Number and Title */}
                <div className="md:col-span-4">
                  <span className="text-xs font-mono text-black/40 block mb-4">
                    {service.number}
                  </span>
                  <h2 className="text-2xl md:text-3xl">{service.title}</h2>
                </div>
                
                {/* Description and Capabilities */}
                <div className="md:col-span-8">
                  <p className="text-lg text-black/70 mb-8">
                    {service.description}
                  </p>
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-black/40 mb-4">
                      Capabilities
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.capabilities.map((capability) => (
                        <li key={capability} className="text-black/60">
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Tools */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl mb-8">Tools & Technologies</h2>
          <div className="flex flex-wrap gap-4">
            {tools.map((tool) => (
              <span 
                key={tool}
                className="px-4 py-2 border border-white/20 text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl md:text-3xl mb-12">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Understand', description: 'We start by understanding your data, your audience, and your goals.' },
              { step: '02', title: 'Explore', description: 'We explore visual approaches, sketching concepts and testing ideas.' },
              { step: '03', title: 'Design', description: 'We design the final solution with meticulous attention to detail.' },
              { step: '04', title: 'Deliver', description: 'We deliver production-ready assets in the formats you need.' },
            ].map((item) => (
              <div key={item.step}>
                <span className="text-xs font-mono text-[var(--color-blue)] block mb-4">
                  {item.step}
                </span>
                <h3 className="text-xl mb-2">{item.title}</h3>
                <p className="text-black/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-black/10">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl mb-4">Ready to discuss your project?</h2>
          <p className="text-lg text-black/60 mb-8 max-w-xl mx-auto">
            Every project is different. Let&apos;s talk about what you need and how we can help.
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
