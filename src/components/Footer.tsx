import Link from 'next/link';

const WORK_LINKS = [
  { href: '/work/nuclide-chart', label: 'Chart of Nuclides' },
  { href: '/work/stellar-evolution', label: 'Stellar Evolution' },
  { href: '/work/network-theory', label: 'Network Theory' },
  { href: '/work/logic-systems', label: 'Logic Systems' },
  { href: '/work/orbital-mechanics', label: 'Orbital Mechanics' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  { href: 'https://twitter.com/bangindustries', label: 'Twitter' },
  { href: 'https://github.com/bangindustries', label: 'GitHub' },
  { href: 'https://linkedin.com/company/bangindustries', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">

        {/* Top section: Logo + Nav */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">

          {/* Logo & tagline */}
          <div className="lg:max-w-sm">
            <Link href="/" className="block">
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Bang
              </span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white/40">
                Industries
              </span>
            </Link>
            <p className="mt-4 md:mt-6 text-sm md:text-base text-white/50 leading-relaxed">
              Scientific visualisation and explanation design.
              We make complex ideas clear.
            </p>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">

            {/* Work */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">
                Work
              </h3>
              <ul className="space-y-2">
                {WORK_LINKS.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                {COMPANY_LINKS.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">
                Connect
              </h3>
              <ul className="space-y-2">
                {SOCIAL_LINKS.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 md:mt-16 pt-6 md:pt-8">
          <p className="text-xs text-white/40">
            &copy; 2026 Bang Industries Ltd
          </p>
        </div>
      </div>
    </footer>
  );
}
