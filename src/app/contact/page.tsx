import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Bang Industries',
  description: 'Get in touch to discuss your data visualisation, explanation design, or scientific illustration project.',
};

export default function ContactPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl mb-6">Get in Touch</h1>
            <p className="text-xl text-black/60">
              Have a project in mind? We&apos;d love to hear about it. Tell us what you&apos;re working on 
              and we&apos;ll get back to you to discuss how we can help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24 border-t border-black/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Email - Primary */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-black/40 mb-4">
                Email
              </h2>
              <a 
                href="mailto:hello@bangindustries.co"
                className="text-2xl md:text-3xl hover:text-[var(--color-blue)] transition-colors"
              >
                hello@bangindustries.co
              </a>
              <p className="text-black/60 mt-4">
                The best way to reach us. We typically respond within 24 hours.
              </p>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-black/40 mb-4">
                Location
              </h2>
              <p className="text-2xl md:text-3xl">
                St Leonards-on-Sea
              </p>
              <p className="text-black/60 mt-4">
                East Sussex, United Kingdom.<br />
                We work with clients worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Include */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl mb-8">What to Include</h2>
            <p className="text-lg text-white/60 mb-8">
              To help us understand your project and give you the most useful response, 
              please include:
            </p>
            <ul className="space-y-4">
              {[
                'A brief description of your project or challenge',
                'What kind of output you\'re looking for (infographic, interactive, illustration, etc.)',
                'Your timeline and any key deadlines',
                'Your budget range (helps us scope appropriately)',
                'Any examples or references you find inspiring',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="text-xs font-mono text-[var(--color-lime)] mt-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Availability */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-3 h-3 rounded-full bg-[var(--color-lime)]" />
            <h2 className="text-2xl md:text-3xl">Currently Available</h2>
          </div>
          <p className="text-lg text-black/60 max-w-2xl">
            We&apos;re currently taking on new projects. Typical lead time is 2-4 weeks 
            depending on scope, but we can sometimes accommodate urgent timelines.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 border-t border-black/10">
        <div className="container">
          <h2 className="text-2xl md:text-3xl mb-12">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[
              {
                q: 'How much does a project cost?',
                a: 'Projects vary widely based on complexity and scope. Simple infographics start around £2,500, while complex interactive pieces can range from £10,000-30,000+. We\'ll give you a clear quote after understanding your needs.',
              },
              {
                q: 'What\'s your typical timeline?',
                a: 'Most projects take 2-6 weeks from briefing to delivery, depending on complexity. We can sometimes work to tighter deadlines if needed.',
              },
              {
                q: 'Do you work with agencies?',
                a: 'Yes, we frequently work as specialists within larger agency teams, bringing data visualisation expertise to broader campaigns and projects.',
              },
              {
                q: 'Can you work with our data?',
                a: 'Absolutely. We work with data in all formats — spreadsheets, APIs, databases. We can also help with data research and sourcing if needed.',
              },
            ].map((item, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium mb-2">{item.q}</h3>
                <p className="text-black/60">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
