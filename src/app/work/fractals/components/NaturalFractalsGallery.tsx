'use client';

import React from 'react';

interface FractalImage {
  src: string;
  alt: string;
  caption: string;
}

const NATURAL_FRACTALS: FractalImage[] = [
  {
    src: '/images/work/fractals/natural/romanesco.jpg',
    alt: 'Romanesco broccoli',
    caption: 'Romanesco broccoli',
  },
  {
    src: '/images/work/fractals/natural/fern.jpg',
    alt: 'Fern frond',
    caption: 'Fern frond',
  },
  {
    src: '/images/work/fractals/natural/delta.jpg',
    alt: 'River delta',
    caption: 'River delta',
  },
  {
    src: '/images/work/fractals/natural/lightning.jpg',
    alt: 'Lightning bolt',
    caption: 'Lightning',
  },
  {
    src: '/images/work/fractals/natural/tree.jpg',
    alt: 'Tree branches',
    caption: 'Tree branches',
  },
  {
    src: '/images/work/fractals/natural/lungs.jpg',
    alt: 'Lung airways',
    caption: 'Lung airways',
  },
];

function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <div className='aspect-square bg-black/5 flex items-center justify-center'>
      <span className='text-black/30 text-xs text-center px-2'>{caption}</span>
    </div>
  );
}

export function NaturalFractalsGallery() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-black/10'>
      {NATURAL_FRACTALS.map((item) => (
        <div key={item.alt} className='bg-white'>
          <ImagePlaceholder caption={item.caption} />
          <p className='text-xs text-black/50 p-2 text-center'>{item.caption}</p>
        </div>
      ))}
    </div>
  );
}
