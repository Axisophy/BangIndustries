// Shared style constants for all case study interactives

export const COLORS = {
  // Brand palette (UI chrome)
  blue: '#0055FF',
  pink: '#FF0055',
  lime: '#CCFF00',
  black: '#000000',
  white: '#FFFFFF',

  // Visualization palette (SVG/Canvas only — not for UI chrome)
  viz: {
    orange: '#FF6B35',
    teal: '#00D4AA',
    yellow: '#FFD700',
    purple: '#8B5CF6',
    earth: '#4A90D9',
    moon: '#C4C4C4',
    sun: '#FDB813',
  },
} as const;

export const FRAME_HEIGHTS = {
  sm: '400px',
  md: '500px',
  lg: '600px',
  xl: '700px',
  chart: '750px',
  chartLg: '875px',
} as const;
