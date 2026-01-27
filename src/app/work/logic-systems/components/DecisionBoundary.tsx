'use client';

import React, { useState, useMemo } from 'react';
import { ModelType } from '../lib/types';
import {
  trainLinear,
  trainPolynomial,
  trainKNN,
  trainRBF,
  generateDataset,
  ClassifierResult
} from '../lib/classifiers';
import { InteractiveFrame } from '../../_components/InteractiveFrame';
import { Select, Slider, Button, Readout } from '../../_components/Controls';

export function DecisionBoundary() {
  const [datasetType, setDatasetType] = useState<'linear' | 'circular' | 'xor' | 'moons'>('linear');
  const [modelType, setModelType] = useState<ModelType>('linear');
  const [parameter, setParameter] = useState(0.5);
  const [seed, setSeed] = useState(0);

  // Generate dataset
  const points = useMemo(() => {
    return generateDataset(datasetType, 100);
  }, [datasetType, seed]);

  // Train classifier
  const classifier = useMemo((): ClassifierResult => {
    switch (modelType) {
      case 'linear':
        return trainLinear(points, parameter * 0.1);
      case 'polynomial':
        return trainPolynomial(points, parameter * 0.1);
      case 'knn':
        return trainKNN(points, Math.max(1, Math.round(parameter * 20)));
      case 'rbf':
        return trainRBF(points, parameter * 5);
      default:
        return trainLinear(points);
    }
  }, [points, modelType, parameter]);

  // Generate decision boundary grid
  const boundaryGrid = useMemo(() => {
    const resolution = 50;
    const grid: number[][] = [];

    for (let i = 0; i < resolution; i++) {
      const row: number[] = [];
      for (let j = 0; j < resolution; j++) {
        const x = (j / resolution) * 2 - 1;
        const y = (i / resolution) * 2 - 1;
        row.push(classifier.predict(x, y));
      }
      grid.push(row);
    }

    return grid;
  }, [classifier]);

  const width = 400;
  const height = 400;
  const padding = 40;

  const scaleX = (x: number) => padding + ((x + 1) / 2) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - ((y + 1) / 2) * (height - 2 * padding);

  const getParameterLabel = () => {
    switch (modelType) {
      case 'linear':
      case 'polynomial':
        return `Regularization: ${(parameter * 0.1).toFixed(2)}`;
      case 'knn':
        return `k = ${Math.max(1, Math.round(parameter * 20))}`;
      case 'rbf':
        return `\u03B3 = ${(parameter * 5).toFixed(1)}`;
    }
  };

  const sidebarContent = (
    <>
      <Select
        label='Dataset'
        value={datasetType}
        options={[
          { value: 'linear', label: 'Linearly separable' },
          { value: 'circular', label: 'Circular' },
          { value: 'xor', label: 'XOR pattern' },
          { value: 'moons', label: 'Two moons' },
        ]}
        onChange={setDatasetType}
      />

      <Select
        label='Model'
        value={modelType}
        options={[
          { value: 'linear', label: 'Linear (Logistic)' },
          { value: 'polynomial', label: 'Polynomial' },
          { value: 'knn', label: 'k-Nearest Neighbors' },
          { value: 'rbf', label: 'RBF Kernel' },
        ]}
        onChange={(v) => setModelType(v as ModelType)}
      />

      <Slider
        label={getParameterLabel()}
        value={parameter}
        onChange={setParameter}
        min={0.05}
        max={1}
        step={0.05}
      />

      <Button variant='secondary' onClick={() => setSeed(s => s + 1)}>
        New data
      </Button>

      <Readout
        label='Accuracy'
        value={`${(classifier.accuracy * 100).toFixed(0)}%`}
      />

      <div className='text-xs text-black/60 space-y-2'>
        <p><strong>Linear:</strong> Single straight boundary. Fast but limited.</p>
        <p><strong>Polynomial:</strong> Curved boundary. Can overfit with high degree.</p>
        <p><strong>k-NN:</strong> Local voting. Wiggly boundaries. Slow at prediction.</p>
        <p><strong>RBF:</strong> Smooth local regions. Controls locality.</p>
      </div>

      <div className='flex gap-2'>
        <div className='flex items-center gap-1'>
          <div className='w-4 h-4 bg-[#0055FF]' />
          <span className='text-xs'>Class 1</span>
        </div>
        <div className='flex items-center gap-1'>
          <div className='w-4 h-4 bg-[#FF0055]' />
          <span className='text-xs'>Class 0</span>
        </div>
      </div>
    </>
  );

  return (
    <InteractiveFrame layout='sidebar' sidebar={sidebarContent}>
      <div className='bg-white'>
        <svg viewBox={`0 0 ${width} ${height}`} className='w-full h-auto'>
          {/* Decision boundary as colored grid */}
          {boundaryGrid.map((row, i) =>
            row.map((prob, j) => {
              const x = (j / boundaryGrid[0].length) * 2 - 1;
              const y = (i / boundaryGrid.length) * 2 - 1;
              const cellSize = (width - 2 * padding) / boundaryGrid[0].length;

              // Interpolate between class colors
              const r = Math.round(prob * 0 + (1 - prob) * 255);
              const g = Math.round(prob * 85 + (1 - prob) * 0);
              const b = Math.round(prob * 255 + (1 - prob) * 85);

              return (
                <rect
                  key={`${i}-${j}`}
                  x={scaleX(x) - cellSize/2}
                  y={scaleY(y) - cellSize/2}
                  width={cellSize + 1}
                  height={cellSize + 1}
                  fill={`rgb(${r}, ${g}, ${b})`}
                  opacity={0.3}
                />
              );
            })
          )}

          {/* Grid */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke='#ccc' />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke='#ccc' />

          {/* Points */}
          {points.map((point, i) => (
            <circle
              key={i}
              cx={scaleX(point.x)}
              cy={scaleY(point.y)}
              r={5}
              fill={point.label === 1 ? '#0055FF' : '#FF0055'}
              stroke='white'
              strokeWidth={1.5}
            />
          ))}

          {/* Axes labels */}
          <text x={width / 2} y={height - 8} textAnchor='middle' fontSize='11' fill='#666' fontFamily='monospace'>
            Feature 1
          </text>
          <text x={12} y={height / 2} textAnchor='middle' fontSize='11' fill='#666' fontFamily='monospace' transform={`rotate(-90, 12, ${height/2})`}>
            Feature 2
          </text>
        </svg>
      </div>
    </InteractiveFrame>
  );
}
