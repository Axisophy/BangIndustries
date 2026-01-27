'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <nav className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-14 md:h-16">
        {/* Logo */}
        <Link href="/" className="block">
          <svg
            viewBox="0 0 842.8 150.29"
            className="h-6 md:h-8 w-auto fill-current text-white"
            aria-label="Bang Industries"
          >
            <path d="M0,2.64h124.8c14.45,0,25.6,1.29,33.45,3.86,7.84,2.57,13.36,6.61,16.55,12.11,3.19,5.5,4.79,13.07,4.79,22.71v1.56c0,8.79-1.82,15.79-5.47,21-3.65,5.21-8.53,8.69-14.65,10.45,7.75,1.76,13.49,5.27,17.24,10.55,3.74,5.27,5.62,13.09,5.62,23.44v1.66c0,9.31-1.56,16.68-4.69,22.12-3.12,5.44-8.24,9.39-15.33,11.87-7.1,2.48-16.8,3.71-29.1,3.71H0V2.64ZM117.09,58.69c4.17,0,7.16-.76,8.98-2.29,1.82-1.53,2.73-4.31,2.73-8.35v-.88c0-3.91-.94-6.61-2.83-8.11-1.89-1.5-5.11-2.25-9.67-2.25H48.14v21.88h68.95ZM120.41,112.21c4.17,0,7.14-.76,8.94-2.29,1.79-1.53,2.69-4.28,2.69-8.25v-.98c0-3.97-.98-6.7-2.93-8.2-1.95-1.5-5.11-2.25-9.47-2.25H48.14v21.97h72.27Z"/>
            <path d="M258.3,2.64h77.44l74.51,145.02h-59.38l-13.38-27.44h-83.98l-13.18,27.44h-56.54L258.3,2.64ZM320.41,83.5l-24.71-49.71-24.8,49.71h49.51Z"/>
            <path d="M421.29,2.64h65.53l85.16,90.53V2.64h50.88v145.02h-63.48l-87.21-93.26v93.26h-50.88V2.64Z"/>
            <path d="M674.54,144.53c-14.26-3.84-24.43-10.84-30.52-21-6.09-10.16-9.13-25.26-9.13-45.31v-5.66c0-19.92,3.21-35.04,9.62-45.36,6.41-10.32,16.85-17.43,31.3-21.34s35.16-5.86,62.11-5.86,48.76,1.61,63.48,4.83c14.71,3.22,25.02,8.2,30.91,14.94,5.89,6.74,9.26,16.06,10.11,27.98l.2,2.93h-51.07l-.2-1.66c-.46-3.91-1.94-6.82-4.44-8.74-2.51-1.92-7.32-3.29-14.45-4.1-7.13-.81-18.15-1.22-33.06-1.22-15.69,0-27.07.81-34.13,2.44-7.06,1.63-11.85,4.72-14.36,9.28-2.51,4.56-3.76,11.91-3.76,22.07v11.82c0,10.68,1.22,18.36,3.66,23.05s7.14,7.83,14.11,9.42c6.97,1.6,18.39,2.39,34.28,2.39s27.51-.65,34.86-1.95c7.36-1.3,12.14-3.4,14.36-6.3,2.21-2.9,3.32-7.28,3.32-13.13v-2.05h-58.3v-30.76h109.38v18.26c0,20.51-2.87,35.66-8.59,45.46-5.73,9.8-15.84,16.47-30.32,20.02-14.49,3.55-36.74,5.32-66.75,5.32-27.48,0-48.34-1.92-62.6-5.76Z"/>
          </svg>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                isActive(item.href)
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

      {/* Mobile Menu Overlay */}
      <div className={`
        md:hidden fixed inset-0 top-14 bg-white z-40
        transition-opacity duration-200
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="flex flex-col p-4">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-4 text-2xl font-bold border-b border-black/10 ${
                isActive(item.href)
                  ? 'text-[var(--color-pink)]'
                  : 'text-black'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
