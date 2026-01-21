import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 mt-auto">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo width={100} />
            </div>
            <p className="text-sm text-black/60 max-w-xs">
              Data visualisation and explanation design. Making complex ideas clear and visually extraordinary.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-black/40 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/work" className="text-sm text-black/60 hover:text-[var(--color-blue)] transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-black/60 hover:text-[var(--color-blue)] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-black/60 hover:text-[var(--color-blue)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-black/60 hover:text-[var(--color-blue)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-black/40 mb-4">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:hello@bangindustries.co" 
                  className="text-sm text-black/60 hover:text-[var(--color-blue)] transition-colors"
                >
                  hello@bangindustries.co
                </a>
              </li>
              <li className="text-sm text-black/40">
                St Leonards-on-Sea, UK
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs font-mono text-black/40">
            © {currentYear} Bang Industries Ltd
          </p>
          <p className="text-xs font-mono text-black/40">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-lime)] mr-2" />
            Available for projects
          </p>
        </div>
      </div>
    </footer>
  );
}
