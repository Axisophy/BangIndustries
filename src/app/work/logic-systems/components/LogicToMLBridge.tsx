'use client';

import React, { useState } from 'react';

interface Step {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  visual: 'logic' | 'tree' | 'neural';
}

const STEPS: Step[] = [
  {
    id: 'logic',
    title: 'Boolean Logic',
    subtitle: 'Fixed rules, explicit boundaries',
    description: 'Logic gates implement exact functions. AND, OR, NOT combine to create any computable function. The decision boundary is perfectly sharp - a point is either in or out.',
    visual: 'logic',
  },
  {
    id: 'tree',
    title: 'Decision Trees',
    subtitle: 'Learned IF/THEN rules',
    description: 'Decision trees learn axis-aligned splits from data. Each node asks "is feature X > threshold?" The result is a piecewise-constant function - still sharp boundaries, but automatically discovered.',
    visual: 'tree',
  },
  {
    id: 'neural',
    title: 'Neural Networks',
    subtitle: 'Smooth, learned compositions',
    description: 'Neural networks compose nonlinear functions (like sigmoids or ReLUs). The decision boundary becomes smooth and can approximate any shape. Uncertainty is represented - points near the boundary have intermediate predictions.',
    visual: 'neural',
  },
];

export function LogicToMLBridge() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className='space-y-8'>
      {/* Step selector */}
      <div className='flex gap-2'>
        {STEPS.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(i)}
            className={`flex-1 p-4 text-left border transition-colors ${
              activeStep === i
                ? 'border-[#0055FF] bg-[#0055FF]/5'
                : 'border-black/10 hover:border-black/20'
            }`}
          >
            <div className='text-xs font-mono text-black/40 mb-1'>Step {i + 1}</div>
            <div className='font-bold text-sm'>{step.title}</div>
            <div className='text-xs text-black/50 mt-1'>{step.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Visualization */}
      <div className='grid md:grid-cols-2 gap-8'>
        <div className='border border-black/10 bg-white p-6 aspect-square flex items-center justify-center'>
          <BoundaryVisualization type={STEPS[activeStep].visual} />
        </div>

        <div className='flex flex-col justify-center'>
          <h3 className='text-xl font-bold mb-2'>{STEPS[activeStep].title}</h3>
          <p className='text-black/60 leading-relaxed'>{STEPS[activeStep].description}</p>

          <div className='mt-8 space-y-4'>
            <div className='flex items-center gap-4'>
              <div className={`w-4 h-4 ${activeStep >= 0 ? 'bg-[#0055FF]' : 'bg-black/20'}`} />
              <span className={`text-sm ${activeStep >= 0 ? '' : 'text-black/40'}`}>Explicit rules</span>
            </div>
            <div className='flex items-center gap-4'>
              <div className={`w-4 h-4 ${activeStep >= 1 ? 'bg-[#0055FF]' : 'bg-black/20'}`} />
              <span className={`text-sm ${activeStep >= 1 ? '' : 'text-black/40'}`}>Learned from data</span>
            </div>
            <div className='flex items-center gap-4'>
              <div className={`w-4 h-4 ${activeStep >= 2 ? 'bg-[#0055FF]' : 'bg-black/20'}`} />
              <span className={`text-sm ${activeStep >= 2 ? '' : 'text-black/40'}`}>Smooth uncertainty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BoundaryVisualization({ type }: { type: 'logic' | 'tree' | 'neural' }) {
  const size = 300;
  const padding = 20;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className='w-full h-full max-w-[300px]'>
      {/* Background grid */}
      <defs>
        <pattern id='grid' width='30' height='30' patternUnits='userSpaceOnUse'>
          <path d='M 30 0 L 0 0 0 30' fill='none' stroke='#eee' strokeWidth='0.5' />
        </pattern>
      </defs>
      <rect x={padding} y={padding} width={size - 2*padding} height={size - 2*padding} fill='url(#grid)' />

      {type === 'logic' && (
        <>
          {/* Sharp XOR regions */}
          <rect x={padding} y={padding} width={(size-2*padding)/2} height={(size-2*padding)/2} fill='#FF0055' opacity={0.3} />
          <rect x={padding + (size-2*padding)/2} y={padding + (size-2*padding)/2} width={(size-2*padding)/2} height={(size-2*padding)/2} fill='#FF0055' opacity={0.3} />
          <rect x={padding + (size-2*padding)/2} y={padding} width={(size-2*padding)/2} height={(size-2*padding)/2} fill='#0055FF' opacity={0.3} />
          <rect x={padding} y={padding + (size-2*padding)/2} width={(size-2*padding)/2} height={(size-2*padding)/2} fill='#0055FF' opacity={0.3} />

          {/* Sharp boundary lines */}
          <line x1={size/2} y1={padding} x2={size/2} y2={size-padding} stroke='#333' strokeWidth={2} />
          <line x1={padding} y1={size/2} x2={size-padding} y2={size/2} stroke='#333' strokeWidth={2} />

          <text x={size/2} y={size - 5} textAnchor='middle' fontSize='10' fill='#666' fontFamily='monospace'>
            XOR: Sharp quadrants
          </text>
        </>
      )}

      {type === 'tree' && (
        <>
          {/* Axis-aligned splits */}
          <rect x={padding} y={padding} width={(size-2*padding)*0.4} height={size-2*padding} fill='#FF0055' opacity={0.3} />
          <rect x={padding + (size-2*padding)*0.4} y={padding} width={(size-2*padding)*0.6} height={(size-2*padding)*0.6} fill='#0055FF' opacity={0.3} />
          <rect x={padding + (size-2*padding)*0.4} y={padding + (size-2*padding)*0.6} width={(size-2*padding)*0.6} height={(size-2*padding)*0.4} fill='#FF0055' opacity={0.3} />

          {/* Split lines */}
          <line x1={padding + (size-2*padding)*0.4} y1={padding} x2={padding + (size-2*padding)*0.4} y2={size-padding} stroke='#333' strokeWidth={2} strokeDasharray='4,2' />
          <line x1={padding + (size-2*padding)*0.4} y1={padding + (size-2*padding)*0.6} x2={size-padding} y2={padding + (size-2*padding)*0.6} stroke='#333' strokeWidth={2} strokeDasharray='4,2' />

          <text x={size/2} y={size - 5} textAnchor='middle' fontSize='10' fill='#666' fontFamily='monospace'>
            Decision tree: Axis-aligned splits
          </text>
        </>
      )}

      {type === 'neural' && (
        <>
          {/* Gradient regions (smooth) */}
          <defs>
            <radialGradient id='neuralGrad1' cx='30%' cy='30%'>
              <stop offset='0%' stopColor='#0055FF' stopOpacity='0.5' />
              <stop offset='100%' stopColor='#0055FF' stopOpacity='0' />
            </radialGradient>
            <radialGradient id='neuralGrad2' cx='70%' cy='70%'>
              <stop offset='0%' stopColor='#FF0055' stopOpacity='0.5' />
              <stop offset='100%' stopColor='#FF0055' stopOpacity='0' />
            </radialGradient>
          </defs>

          <rect x={padding} y={padding} width={size-2*padding} height={size-2*padding} fill='url(#neuralGrad1)' />
          <rect x={padding} y={padding} width={size-2*padding} height={size-2*padding} fill='url(#neuralGrad2)' />

          {/* Smooth boundary */}
          <path
            d={`M ${padding + 20} ${size/2 + 40} Q ${size/2} ${padding + 60}, ${size - padding - 20} ${size/2 - 30}`}
            fill='none'
            stroke='#333'
            strokeWidth={2}
            opacity={0.6}
          />

          <text x={size/2} y={size - 5} textAnchor='middle' fontSize='10' fill='#666' fontFamily='monospace'>
            Neural network: Smooth boundary
          </text>
        </>
      )}

      {/* Axes */}
      <line x1={padding} y1={size-padding} x2={size-padding} y2={size-padding} stroke='#999' />
      <line x1={padding} y1={padding} x2={padding} y2={size-padding} stroke='#999' />
    </svg>
  );
}
