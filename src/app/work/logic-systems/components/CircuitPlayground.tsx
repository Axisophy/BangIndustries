'use client';

import React, { useState, useMemo } from 'react';
import { GateSymbol } from './GateSymbol';
import { evaluateCircuit, generateTruthTable, PRESET_CIRCUITS } from '../lib/logic';
import { InteractiveFrame } from '../../_components/InteractiveFrame';
import { Button } from '../../_components/Controls';

export function CircuitPlayground() {
  const [selectedPreset, setSelectedPreset] = useState<string>('and-gate');
  const [inputValues, setInputValues] = useState<boolean[]>([false, false]);

  const circuit = PRESET_CIRCUITS[selectedPreset];

  // Evaluate circuit
  const gateValues = useMemo(() => {
    return evaluateCircuit(circuit, inputValues);
  }, [circuit, inputValues]);

  // Generate truth table
  const truthTable = useMemo(() => {
    return generateTruthTable(circuit);
  }, [circuit]);

  const inputGates = circuit.gates.filter(g => g.type === 'INPUT');
  const outputGates = circuit.gates.filter(g => g.type === 'OUTPUT');

  // Toggle input
  const toggleInput = (index: number) => {
    setInputValues(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  // Extend inputs array when switching presets
  React.useEffect(() => {
    const numInputs = inputGates.length;
    if (inputValues.length < numInputs) {
      setInputValues(prev => [...prev, ...Array(numInputs - prev.length).fill(false)]);
    }
  }, [selectedPreset, inputGates.length]);

  const controlsContent = (
    <div className='flex gap-2'>
      {Object.keys(PRESET_CIRCUITS).map(key => (
        <Button
          key={key}
          onClick={() => setSelectedPreset(key)}
          variant='secondary'
          size='sm'
          active={selectedPreset === key}
        >
          {key.replace(/-/g, ' ')}
        </Button>
      ))}
    </div>
  );

  return (
    <InteractiveFrame layout='compact' controls={controlsContent}>
      {/* Circuit diagram */}
      <div className='bg-white p-4'>
        <svg viewBox='0 0 500 280' className='w-full h-auto'>
          {/* Connections */}
          {circuit.connections.map((conn, i) => {
            const fromGate = circuit.gates.find(g => g.id === conn.from);
            const toGate = circuit.gates.find(g => g.id === conn.to);
            if (!fromGate || !toGate) return null;

            const fromX = fromGate.x + 50;
            const fromY = fromGate.y;
            const toX = toGate.x - 10;
            const toY = toGate.y + (conn.toInput === 0 ? -10 : 10);

            const value = gateValues.get(conn.from);

            return (
              <path
                key={i}
                d={`M ${fromX} ${fromY} C ${fromX + 30} ${fromY}, ${toX - 30} ${toY}, ${toX} ${toY}`}
                fill='none'
                stroke={value ? '#0055FF' : '#ccc'}
                strokeWidth={value ? 2 : 1.5}
              />
            );
          })}

          {/* Gates */}
          {circuit.gates.map(gate => {
            const isInput = gate.type === 'INPUT';
            const inputIndex = isInput ? inputGates.indexOf(gate) : -1;
            const value = isInput ? inputValues[inputIndex] : gateValues.get(gate.id);

            return (
              <g
                key={gate.id}
                transform={`translate(${gate.x - 30}, ${gate.y - 30})`}
                onClick={isInput ? () => toggleInput(inputIndex) : undefined}
                style={{ cursor: isInput ? 'pointer' : 'default' }}
              >
                <GateSymbol type={gate.type} size={60} value={value} />
              </g>
            );
          })}

          {/* Labels */}
          {inputGates.map((gate, i) => (
            <text
              key={`label-${gate.id}`}
              x={gate.x - 45}
              y={gate.y + 5}
              fontSize='12'
              fontFamily='monospace'
              fill='#666'
            >
              {String.fromCharCode(65 + i)}
            </text>
          ))}

          {outputGates.map((gate, i) => (
            <text
              key={`label-${gate.id}`}
              x={gate.x + 45}
              y={gate.y + 5}
              fontSize='12'
              fontFamily='monospace'
              fill='#666'
            >
              {outputGates.length > 1 ? (i === 0 ? 'Sum' : 'Carry') : 'Out'}
            </text>
          ))}
        </svg>

        <p className='text-xs text-black/50 mt-4 text-center'>
          Click the input nodes (circles) to toggle between 0 and 1
        </p>
      </div>

      {/* Truth table */}
      <div className='bg-white p-4'>
        <h3 className='text-sm font-bold mb-4'>Truth Table</h3>
        <div className='overflow-x-auto'>
          <table className='w-full text-xs font-mono'>
            <thead>
              <tr className='border-b border-black/10'>
                {inputGates.map((_, i) => (
                  <th key={`in-${i}`} className='px-4 py-2 text-left text-black/50'>
                    {String.fromCharCode(65 + i)}
                  </th>
                ))}
                <th className='px-4 py-2 text-left border-l border-black/10'>
                  {outputGates.length > 1 ? 'Sum' : 'Out'}
                </th>
                {outputGates.length > 1 && (
                  <th className='px-4 py-2 text-left'>Carry</th>
                )}
              </tr>
            </thead>
            <tbody>
              {truthTable.inputs.map((row, i) => {
                const isCurrentRow = row.every((v, j) => v === inputValues[j]);
                return (
                  <tr
                    key={i}
                    className={`border-b border-black/5 ${isCurrentRow ? 'bg-[#0055FF]/10' : ''}`}
                  >
                    {row.map((v, j) => (
                      <td key={j} className='px-4 py-2'>{v ? '1' : '0'}</td>
                    ))}
                    <td className={`px-4 py-2 border-l border-black/10 font-bold ${
                      truthTable.outputs[i] ? 'text-[#0055FF]' : ''
                    }`}>
                      {truthTable.outputs[i] ? '1' : '0'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </InteractiveFrame>
  );
}
