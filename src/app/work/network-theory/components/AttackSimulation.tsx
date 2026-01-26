'use client';

import React, { useState, useMemo } from 'react';
import { NetworkGraph } from './NetworkGraph';
import {
  generateRandomNetwork,
  generateScaleFreeNetwork,
  generateSmallWorldNetwork,
  applyForceLayout,
} from '../lib/generators';
import { calculateMetrics } from '../lib/metrics';
import { Network, Node } from '../lib/types';

export function AttackSimulation() {
  const [removalFraction, setRemovalFraction] = useState(0);
  const [attackMode, setAttackMode] = useState<'random' | 'targeted'>('random');
  const [seed, setSeed] = useState(0);

  const nodeCount = 80;

  // Generate base networks
  const baseNetworks = useMemo(() => {
    const width = 280;
    const height = 220;

    return {
      random: applyForceLayout(generateRandomNetwork(nodeCount, 0.08), width, height, 150),
      scaleFree: applyForceLayout(generateScaleFreeNetwork(nodeCount, 2), width, height, 150),
      smallWorld: applyForceLayout(generateSmallWorldNetwork(nodeCount, 6, 0.1), width, height, 150),
    };
  }, [seed]);

  // Apply node removal
  const attackedNetworks = useMemo(() => {
    const applyAttack = (network: Network): Network => {
      const nodes = network.nodes.map(n => ({ ...n, state: 'normal' as Node['state'] }));
      const numToRemove = Math.floor(nodes.length * removalFraction);

      if (numToRemove === 0) return { ...network, nodes };

      let toRemove: number[];

      if (attackMode === 'targeted') {
        // Remove highest degree nodes first
        toRemove = [...nodes]
          .sort((a, b) => b.degree - a.degree)
          .slice(0, numToRemove)
          .map(n => n.id);
      } else {
        // Random removal
        const shuffled = [...nodes].sort(() => Math.random() - 0.5);
        toRemove = shuffled.slice(0, numToRemove).map(n => n.id);
      }

      toRemove.forEach(id => {
        nodes[id].state = 'removed';
      });

      return { ...network, nodes, edges: network.edges };
    };

    return {
      random: applyAttack(baseNetworks.random),
      scaleFree: applyAttack(baseNetworks.scaleFree),
      smallWorld: applyAttack(baseNetworks.smallWorld),
    };
  }, [baseNetworks, removalFraction, attackMode]);

  // Calculate metrics
  const metrics = useMemo(() => ({
    random: calculateMetrics(attackedNetworks.random),
    scaleFree: calculateMetrics(attackedNetworks.scaleFree),
    smallWorld: calculateMetrics(attackedNetworks.smallWorld),
  }), [attackedNetworks]);

  const networkTypes = [
    { key: 'random', label: 'Random' },
    { key: 'scaleFree', label: 'Scale-Free' },
    { key: 'smallWorld', label: 'Small-World' },
  ] as const;

  return (
    <div className='space-y-6'>
      {/* Controls */}
      <div className='flex flex-wrap items-center gap-6 p-4 bg-black/5'>
        <div className='flex-1 min-w-[200px]'>
          <label className='text-xs font-mono text-black/50 block mb-1'>
            Nodes removed: {Math.round(removalFraction * 100)}%
          </label>
          <input
            type='range'
            min={0}
            max={0.8}
            step={0.02}
            value={removalFraction}
            onChange={e => setRemovalFraction(parseFloat(e.target.value))}
            className='w-full'
          />
        </div>

        <div className='flex gap-2'>
          <button
            onClick={() => setAttackMode('random')}
            className={`px-3 py-2 text-xs font-mono transition-colors ${
              attackMode === 'random'
                ? 'bg-[#0055FF] text-white'
                : 'bg-white border border-black/10 hover:bg-black/5'
            }`}
          >
            Random failure
          </button>
          <button
            onClick={() => setAttackMode('targeted')}
            className={`px-3 py-2 text-xs font-mono transition-colors ${
              attackMode === 'targeted'
                ? 'bg-[#FF0055] text-white'
                : 'bg-white border border-black/10 hover:bg-black/5'
            }`}
          >
            Targeted attack
          </button>
        </div>

        <button
          onClick={() => setSeed(s => s + 1)}
          className='px-3 py-2 text-xs font-mono bg-white border border-black/10 hover:bg-black/5'
        >
          Reset
        </button>
      </div>

      {/* Networks */}
      <div className='grid grid-cols-3 gap-4'>
        {networkTypes.map(({ key, label }) => (
          <div key={key} className='space-y-2'>
            <div className='text-sm font-bold text-center'>{label}</div>

            <div className='border border-black/10 bg-white aspect-[4/3]'>
              <NetworkGraph
                network={attackedNetworks[key]}
                width={280}
                height={220}
                nodeColorBy='degree'
              />
            </div>

            {/* Metrics */}
            <div className='grid grid-cols-2 gap-2 text-xs'>
              <div className='bg-black/5 p-2'>
                <div className='text-black/40'>Largest component</div>
                <div className='font-mono text-lg'>
                  {Math.round(metrics[key].largestComponent * 100)}%
                </div>
              </div>
              <div className='bg-black/5 p-2'>
                <div className='text-black/40'>Isolated nodes</div>
                <div className='font-mono text-lg'>
                  {metrics[key].isolatedNodes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className='text-xs text-black/50'>
        {attackMode === 'targeted'
          ? 'Targeted attack removes the most connected nodes first. Scale-free networks collapse rapidly because hubs hold the network together.'
          : 'Random failure removes nodes at random. Scale-free networks survive well because most nodes are peripheral - hubs are unlikely to be hit.'}
      </p>
    </div>
  );
}
