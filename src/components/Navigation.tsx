'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';

const NAV_ITEMS = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState('');
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  // Close menu on route change (render-time state adjustment)
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (isOpen) setIsOpen(false);
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      {/* Main nav bar */}
      <nav className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-14 md:h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo color="white" className="h-5 md:h-6 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname.startsWith(item.href)
                  ? 'text-[var(--color-pink)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-2"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-white transition-transform origin-center ${
              isOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`} />
            <span className={`block h-0.5 w-full bg-white transition-opacity ${
              isOpen ? 'opacity-0' : ''
            }`} />
            <span className={`block h-0.5 w-full bg-white transition-transform origin-center ${
              isOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`} />
          </div>
        </button>
      </nav>

      {/* Homepage tagline — desktop/tablet only */}
      {isHomepage && (
        <div className="hidden md:block border-t border-white/10 px-4 md:px-6 lg:px-8 py-6 lg:py-8">
          <div className="max-w-2xl">
            <p className="text-base lg:text-lg text-white/90 font-bold tracking-tight leading-snug">
              Data visualisation and explanation design studio
            </p>
            <p className="text-sm lg:text-base text-white/60 leading-relaxed mt-2">
              We make complex ideas clear. Scientific visualisation, illustrated explanation,
              and interactive data design for publishers, institutions, and organisations
              who need to communicate with precision and craft.
            </p>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div className={`
        md:hidden fixed inset-0 top-14 bg-white z-40
        transition-opacity duration-200
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="flex flex-col p-6">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                py-4 text-2xl font-bold tracking-[-0.03em]
                ${pathname.startsWith(item.href) ? 'text-[var(--color-pink)]' : 'text-black'}
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
