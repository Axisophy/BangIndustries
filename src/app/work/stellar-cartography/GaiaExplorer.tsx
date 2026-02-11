'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { loadStarData, prepareStarBuffers } from './star-data';
import { createProgram } from './shaders';

interface GaiaExplorerProps {
  className?: string;
}

// Easing function for smooth transitions
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function GaiaExplorer({ className }: GaiaExplorerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  // UI state
  const [showControls, setShowControls] = useState(true);
  const [view, setView] = useState<'sky' | 'hr'>('sky');
  const [pointScale, setPointScale] = useState(1.0);
  const [transitionSpeed, setTransitionSpeed] = useState(1.0);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [fps, setFps] = useState(60);
  const [starCount, setStarCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // WebGL refs
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});

  // Animation state refs
  const transitionRef = useRef(0);
  const targetTransitionRef = useRef(0);
  const transitionStartRef = useRef(0);
  const transitionStartValueRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const zoomRef = useRef(1);
  const panRef = useRef<[number, number]>([0, 0]);
  const pointScaleRef = useRef(1.0);
  const transitionSpeedRef = useRef(1.0);

  // Interaction refs
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef<[number, number]>([0, 0]);

  // Keep refs in sync with state
  pointScaleRef.current = pointScale;
  transitionSpeedRef.current = transitionSpeed;

  // Trigger transition
  const triggerTransition = useCallback(() => {
    const currentTarget = targetTransitionRef.current;
    const newTarget = currentTarget < 0.5 ? 1 : 0;
    targetTransitionRef.current = newTarget;
    transitionStartRef.current = performance.now();
    transitionStartValueRef.current = transitionRef.current;
    isTransitioningRef.current = true;
    setView(newTarget > 0.5 ? 'hr' : 'sky');
  }, []);

  // Set view directly
  const setViewDirect = useCallback((newView: 'sky' | 'hr') => {
    const newTarget = newView === 'hr' ? 1 : 0;
    if (targetTransitionRef.current !== newTarget) {
      targetTransitionRef.current = newTarget;
      transitionStartRef.current = performance.now();
      transitionStartValueRef.current = transitionRef.current;
      isTransitioningRef.current = true;
      setView(newView);
    }
  }, []);

  // Reset view
  const resetView = useCallback(() => {
    zoomRef.current = 1;
    panRef.current = [0, 0];
  }, []);

  // Save screenshot
  const saveScreenshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `stellar_cartography_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  // Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl2', { antialias: true, alpha: false });
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }
    glRef.current = gl;

    // Create shader program
    const program = createProgram(gl);
    if (!program) {
      console.error('Failed to create shader program');
      return;
    }
    programRef.current = program;
    gl.useProgram(program);

    // Get uniform locations
    uniformsRef.current = {
      u_transition: gl.getUniformLocation(program, 'u_transition'),
      u_pan: gl.getUniformLocation(program, 'u_pan'),
      u_zoom: gl.getUniformLocation(program, 'u_zoom'),
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_pointScale: gl.getUniformLocation(program, 'u_pointScale'),
    };

    // Get attribute locations
    const a_skyPos = gl.getAttribLocation(program, 'a_skyPos');
    const a_hrPos = gl.getAttribLocation(program, 'a_hrPos');
    const a_temperature = gl.getAttribLocation(program, 'a_temperature');
    const a_absMag = gl.getAttribLocation(program, 'a_absMag');

    let starCountLocal = 0;

    // Load star data and set up buffers
    loadStarData(50000).then((data) => {
      const buffers = prepareStarBuffers(data.stars);
      starCountLocal = buffers.count;
      setStarCount(buffers.count);
      setIsLoading(false);

      // Create VAO
      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);

      // Sky positions buffer
      const skyPosBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, skyPosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, buffers.skyPositions, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(a_skyPos);
      gl.vertexAttribPointer(a_skyPos, 2, gl.FLOAT, false, 0, 0);

      // HR positions buffer
      const hrPosBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, hrPosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, buffers.hrPositions, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(a_hrPos);
      gl.vertexAttribPointer(a_hrPos, 2, gl.FLOAT, false, 0, 0);

      // Temperature buffer
      const tempBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, tempBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, buffers.temperatures, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(a_temperature);
      gl.vertexAttribPointer(a_temperature, 1, gl.FLOAT, false, 0, 0);

      // Magnitude buffer
      const magBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, magBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, buffers.magnitudes, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(a_absMag);
      gl.vertexAttribPointer(a_absMag, 1, gl.FLOAT, false, 0, 0);
    });

    // Set up blending for additive starfield glow
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    // Resize handler
    let W = 0, H = 0;
    function handleResize() {
      if (!container || !canvas || !gl) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      W = Math.floor(rect.width * dpr);
      H = Math.floor(rect.height * dpr);
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      gl.viewport(0, 0, W, H);
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // FPS tracking
    let lastTime = performance.now();
    let fpsSmooth = 60;
    let frameCount = 0;

    // Animation loop
    function frame(now: number) {
      animRef.current = requestAnimationFrame(frame);
      if (!gl || !programRef.current || starCountLocal === 0) return;

      // FPS calculation
      const dt = now - lastTime;
      lastTime = now;
      fpsSmooth += (1000 / Math.max(dt, 1) - fpsSmooth) * 0.1;
      frameCount++;
      if (frameCount % 30 === 0) {
        setFps(Math.round(fpsSmooth));
      }

      // Update transition
      if (isTransitioningRef.current) {
        const DURATION = 3000 / transitionSpeedRef.current;
        const elapsed = now - transitionStartRef.current;
        const rawProgress = Math.min(elapsed / DURATION, 1.0);
        const easedProgress = easeInOutCubic(rawProgress);

        const startVal = transitionStartValueRef.current;
        const targetVal = targetTransitionRef.current;
        transitionRef.current = startVal + (targetVal - startVal) * easedProgress;

        if (rawProgress >= 1.0) {
          isTransitioningRef.current = false;
          transitionRef.current = targetVal;
        }
      }

      // Clear
      gl.clearColor(0.02, 0.02, 0.03, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Set uniforms
      const uniforms = uniformsRef.current;
      gl.uniform1f(uniforms.u_transition, transitionRef.current);
      gl.uniform2f(uniforms.u_pan, panRef.current[0], panRef.current[1]);
      gl.uniform1f(uniforms.u_zoom, zoomRef.current);
      gl.uniform2f(uniforms.u_resolution, W, H);
      gl.uniform1f(uniforms.u_pointScale, pointScaleRef.current * (window.devicePixelRatio || 1));

      // Draw stars
      gl.drawArrays(gl.POINTS, 0, starCountLocal);
    }

    animRef.current = requestAnimationFrame(frame);

    // Mouse interactions
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
      zoomRef.current *= zoomDelta;
      zoomRef.current = Math.max(0.5, Math.min(20, zoomRef.current));
    };

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseRef.current = [e.clientX, e.clientY];
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const dx = (e.clientX - lastMouseRef.current[0]) / rect.width * 2 / zoomRef.current;
      const dy = -(e.clientY - lastMouseRef.current[1]) / rect.height * 2 / zoomRef.current;
      panRef.current[0] += dx;
      panRef.current[1] += dy;
      lastMouseRef.current = [e.clientX, e.clientY];
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onDblClick = () => {
      zoomRef.current = 1;
      panRef.current = [0, 0];
    };

    // Touch interactions
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        lastMouseRef.current = [e.touches[0].clientX, e.touches[0].clientY];
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const rect = canvas.getBoundingClientRect();
      const dx = (e.touches[0].clientX - lastMouseRef.current[0]) / rect.width * 2 / zoomRef.current;
      const dy = -(e.touches[0].clientY - lastMouseRef.current[1]) / rect.height * 2 / zoomRef.current;
      panRef.current[0] += dx;
      panRef.current[1] += dy;
      lastMouseRef.current = [e.touches[0].clientX, e.touches[0].clientY];
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('dblclick', onDblClick);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('dblclick', onDblClick);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === ' ') {
        e.preventDefault();
        triggerTransition();
      } else if (key === 'h') {
        setShowControls(s => !s);
      } else if (key === 'r') {
        resetView();
      } else if (key === 's') {
        saveScreenshot();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [triggerTransition, resetView, saveScreenshot]);

  // Annotation positions (approximate, for default zoom)
  const annotations = [
    { label: 'Main Sequence', x: 55, y: 55 },
    { label: 'Red Giants', x: 75, y: 20 },
    { label: 'White Dwarfs', x: 30, y: 85 },
  ];

  // Current transition value for annotations
  const currentTransition = transitionRef.current;

  return (
    <div ref={containerRef} className={`relative bg-[#050508] overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className='block w-full h-full cursor-crosshair' />

      {/* Loading indicator */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-white/40 text-sm font-mono'>Loading stars...</span>
        </div>
      )}

      {/* Annotations overlay */}
      {showAnnotations && !isLoading && (
        <div
          className='absolute inset-0 pointer-events-none transition-opacity duration-500'
          style={{ opacity: Math.max(0, (currentTransition - 0.8) * 5) }}
        >
          {annotations.map((ann) => (
            <div
              key={ann.label}
              className='absolute text-white/60 text-xs font-mono'
              style={{ left: `${ann.x}%`, top: `${ann.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              {ann.label}
            </div>
          ))}
          {/* Axis labels */}
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-mono tracking-wider'>
            Hotter (Blue) → Cooler (Red)
          </div>
          <div
            className='absolute left-4 top-1/2 text-white/40 text-[10px] font-mono tracking-wider'
            style={{ transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'left center' }}
          >
            Brighter ↑
          </div>
        </div>
      )}

      {/* Desktop controls - floating overlay */}
      <div
        className={`hidden lg:block absolute top-4 right-4 w-[220px] p-4 rounded-md transition-all duration-300 z-10
          ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none translate-x-2'}`}
        style={{
          background: 'rgba(5, 5, 8, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <h2 className='text-[10px] font-medium tracking-[0.12em] uppercase text-white/40 mb-4'>
          Stellar Cartography
        </h2>

        {/* View toggle */}
        <div className='text-[8px] font-medium tracking-[0.1em] uppercase text-white/25 mb-1.5'>View</div>
        <div className='flex gap-1 mb-3'>
          <button
            className={`flex-1 px-2 py-1.5 text-[9px] font-medium tracking-[0.08em] uppercase border rounded-sm transition-all duration-200
              ${view === 'sky' ? 'border-white/40 text-white/80' : 'border-white/10 text-white/40 hover:border-white/20'}`}
            onClick={() => setViewDirect('sky')}
          >
            Sky
          </button>
          <button
            className={`flex-1 px-2 py-1.5 text-[9px] font-medium tracking-[0.08em] uppercase border rounded-sm transition-all duration-200
              ${view === 'hr' ? 'border-white/40 text-white/80' : 'border-white/10 text-white/40 hover:border-white/20'}`}
            onClick={() => setViewDirect('hr')}
          >
            HR Diagram
          </button>
        </div>

        {/* Transition button */}
        <button
          className='w-full px-2 py-2 text-[9px] font-medium tracking-[0.08em] uppercase border border-[#0055FF]/50 text-[#0055FF] rounded-sm hover:bg-[#0055FF]/10 transition-all duration-200 mb-4'
          onClick={triggerTransition}
        >
          ▶ Transition
        </button>

        {/* Speed slider */}
        <div className='flex justify-between items-baseline mb-0.5'>
          <span className='text-[9px] font-medium tracking-[0.08em] uppercase text-white/65'>Speed</span>
          <span className='text-[10px] tabular-nums text-white/45 font-mono'>{transitionSpeed.toFixed(1)}×</span>
        </div>
        <input
          type='range'
          className='w-full mb-3'
          min={0.2}
          max={3}
          step={0.1}
          value={transitionSpeed}
          onChange={(e) => setTransitionSpeed(parseFloat(e.target.value))}
          style={{ height: '1px', accentColor: 'rgba(255,255,255,0.55)' }}
        />

        {/* Point size slider */}
        <div className='flex justify-between items-baseline mb-0.5'>
          <span className='text-[9px] font-medium tracking-[0.08em] uppercase text-white/65'>Point Size</span>
          <span className='text-[10px] tabular-nums text-white/45 font-mono'>{pointScale.toFixed(1)}×</span>
        </div>
        <input
          type='range'
          className='w-full mb-3'
          min={0.5}
          max={2}
          step={0.1}
          value={pointScale}
          onChange={(e) => setPointScale(parseFloat(e.target.value))}
          style={{ height: '1px', accentColor: 'rgba(255,255,255,0.55)' }}
        />

        {/* Annotations toggle */}
        <button
          className={`w-full px-2 py-1.5 text-[9px] font-medium tracking-[0.08em] uppercase border rounded-sm transition-all duration-200 mb-4
            ${showAnnotations ? 'border-white/30 text-white/60' : 'border-white/10 text-white/30'}`}
          onClick={() => setShowAnnotations(!showAnnotations)}
        >
          Annotations {showAnnotations ? 'On' : 'Off'}
        </button>

        {/* Stats */}
        <div
          className='mt-2 p-2 rounded-sm font-mono text-[9px] leading-relaxed text-white/30'
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          stars: {starCount.toLocaleString()}
          <br />
          fps: {fps}
          <br />
          data: Gaia DR3
        </div>

        {/* Keyboard hints */}
        <div className='flex flex-wrap gap-2 mt-2.5'>
          {[
            ['H', 'hide'],
            ['R', 'reset'],
            ['S', 'save'],
            ['␣', 'transition'],
          ].map(([k, label]) => (
            <span key={k} className='text-[9px] text-white/30 flex items-center gap-1'>
              <code className='px-1 py-px border border-white/10 rounded-sm font-mono text-[9px] text-white/35'>
                {k}
              </code>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile controls - below canvas style would need different layout, using simplified floating for now */}
      <div className='lg:hidden absolute bottom-4 right-4 flex gap-2 z-10'>
        <button
          className='px-3 py-2 text-[10px] font-medium uppercase rounded-sm'
          style={{
            background: 'rgba(5, 5, 8, 0.88)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.7)',
          }}
          onClick={() => setViewDirect(view === 'sky' ? 'hr' : 'sky')}
        >
          {view === 'sky' ? 'HR Diagram' : 'Sky View'}
        </button>
        <button
          className='px-3 py-2 text-[10px] font-medium uppercase rounded-sm'
          style={{
            background: 'rgba(0, 85, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0, 85, 255, 0.4)',
            color: '#0055FF',
          }}
          onClick={triggerTransition}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
