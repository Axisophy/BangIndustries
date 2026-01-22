import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="px-4 pb-6 md:px-6">
      <div className="border-t border-black/10 pt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link 
              href="/"
              className="text-xs font-mono uppercase tracking-wider text-black/40 hover:text-black transition-colors"
            >
              Bang Industries
            </Link>
            <span className="text-xs font-mono text-black/40">
              Data Visualisation &amp; Explanation Design
            </span>
          </div>
          
          <nav className="flex items-center gap-6">
            <Link 
              href="/work"
              className="text-xs font-mono uppercase tracking-wider text-black/40 hover:text-black transition-colors"
            >
              Work
            </Link>
            <Link 
              href="/services"
              className="text-xs font-mono uppercase tracking-wider text-black/40 hover:text-black transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/about"
              className="text-xs font-mono uppercase tracking-wider text-black/40 hover:text-black transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact"
              className="text-xs font-mono uppercase tracking-wider text-black/40 hover:text-black transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs font-mono text-black/40">
            © {new Date().getFullYear()} Bang Industries. All rights reserved.
          </p>
          <p className="text-xs font-mono text-black/40">
            St Leonards-on-Sea, UK
          </p>
        </div>
      </div>
    </footer>
  );
}
