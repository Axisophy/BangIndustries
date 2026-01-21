/**
 * Bang Industries Design Tokens
 * 
 * These values are the source of truth for the design system.
 * They mirror the CSS custom properties in globals.css.
 * 
 * IMMUTABLE — do not modify without updating globals.css and CLAUDE.md
 */

export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  blue: '#0055FF',
  pink: '#FF0055',
  lime: '#CCFF00',
} as const;

export const fonts = {
  sans: "'Forma', system-ui, -apple-system, sans-serif",
  mono: "'Forma Mono', 'SF Mono', 'Monaco', monospace",
  micro: "'Forma Micro', 'Forma', system-ui, sans-serif",
  display: "'Forma Display', 'Forma', system-ui, sans-serif",
} as const;

export const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  body: '1.125rem', // 18px
  lg: '1.25rem',    // 20px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  '3xl': '2.5rem',  // 40px
  '4xl': '3.5rem',  // 56px
  '5xl': '6rem',    // 96px
} as const;

export const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '2rem',     // 32px
  xl: '4rem',     // 64px
  '2xl': '8rem',  // 128px
} as const;

export const layout = {
  containerMax: '1400px',
  containerPadding: '1.5rem', // 24px
} as const;

export const breakpoints = {
  md: '768px',
  lg: '1024px',
} as const;

// Tailwind class mappings for common patterns
export const tw = {
  // Section padding
  sectionPadding: 'py-16 md:py-24',
  
  // Container
  container: 'max-w-[1400px] mx-auto px-6',
  
  // Grid gaps
  gridGapCards: 'gap-6 md:gap-8',
  gridGapContent: 'gap-8 md:gap-12',
  gridGapLarge: 'gap-12 md:gap-24',
  
  // Text colors
  textPrimary: 'text-black',
  textSecondary: 'text-black/60',
  textTertiary: 'text-black/40',
  textPrimaryDark: 'text-white',
  textSecondaryDark: 'text-white/60',
  textTertiaryDark: 'text-white/40',
  
  // Borders
  borderSubtle: 'border-black/10',
  borderMedium: 'border-black/20',
  
  // Labels
  label: 'text-xs font-mono uppercase tracking-wider text-black/40',
  labelDark: 'text-xs font-mono uppercase tracking-wider text-white/40',
  
  // Transitions
  transition: 'transition-colors',
  transitionTransform: 'transition-transform',
} as const;

// Button variants
export const buttonStyles = {
  primary: 'inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm hover:bg-[var(--color-blue)] transition-colors',
  secondary: 'inline-flex items-center gap-2 px-6 py-3 border border-black text-sm hover:bg-black hover:text-white transition-colors',
  accent: 'inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-blue)] text-white hover:bg-black transition-colors',
  accentLime: 'inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-lime)] text-black hover:bg-white transition-colors',
} as const;

// Project card aspect ratio
export const cardAspect = 'aspect-[4/3]';

// Type exports
export type Color = keyof typeof colors;
export type FontSize = keyof typeof fontSizes;
export type Spacing = keyof typeof spacing;
