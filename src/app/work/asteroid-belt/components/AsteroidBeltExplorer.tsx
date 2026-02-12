'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  vertexShaderSource,
  fragmentShaderSource,
  orbitVertexShaderSource,
  orbitFragmentShaderSource,
  createProgram,
  generateCircleVertices,
} from '../lib/shaders';
import { loadAsteroidData, prepareAsteroidBuffers } from '../lib/mock-data';
import { KIRKWOOD_GAPS, PLANET_ORBITS } from '../lib/types';

interface AsteroidBeltExplorerProps {
  className?: string;
}

type ViewMode = 'spatial' | 'histogram';

// Cubic ease-in-out
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function AsteroidBeltExplorer({ className = '' }: AsteroidBeltExplorerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const orbitProgramRef = useRef<WebGLProgram | null>(null);
  const animationFrameRef = useRef<number>(0);
  const asteroidCountRef = useRef<number>(0);

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('spatial');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef({ value: 0, target: 0, startTime: 0 });
  const TRANSITION_DURATION = 1500;

  // Camera state
  const panRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(0.15); // Start zoomed out to see full belt
  const [zoom, setZoom] = useState(0.15);

  // Interaction state
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Demo mode
  const [demoMode, setDemoMode] = useState(false);
  const demoRef = useRef({ active: false, startTime: 0 });

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [showFps, setShowFps] = useState(false);
  const [fps, setFps] = useState(60);
  const fpsRef = useRef({ frames: 0, lastTime: performance.now() });
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Toggle view with animation
  const toggleView = useCallback(() => {
    if (isTransitioning) return;

    const newMode = viewMode === 'spatial' ? 'histogram' : 'spatial';
    setViewMode(newMode);
    setIsTransitioning(true);

    transitionRef.current.target = newMode === 'histogram' ? 1 : 0;
    transitionRef.current.startTime = performance.now();

    // Reset camera for new view
    if (newMode === 'histogram') {
      panRef.current = { x: 0, y: 0 };
      zoomRef.current = 1.0;
      setZoom(1.0);
    } else {
      panRef.current = { x: 0, y: 0 };
      zoomRef.current = 0.15;
      setZoom(0.15);
    }
  }, [viewMode, isTransitioning]);

  // Demo mode logic
  const startDemo = useCallback(() => {
    setDemoMode(true);
    demoRef.current = { active: true, startTime: performance.now() };

    // Start in spatial view
    if (viewMode !== 'spatial') {
      setViewMode('spatial');
      transitionRef.current = { value: 0, target: 0, startTime: 0 };
      panRef.current = { x: 0, y: 0 };
      zoomRef.current = 0.15;
      setZoom(0.15);
    }
  }, [viewMode]);

  const stopDemo = useCallback(() => {
    setDemoMode(false);
    demoRef.current.active = false;
  }, []);

  // Screenshot
  const takeScreenshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `asteroid-belt-${viewMode}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [viewMode]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  }, []);

  // Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }
    glRef.current = gl;

    // Create shader programs
    const asteroidProgram = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    const orbitProgram = createProgram(gl, orbitVertexShaderSource, orbitFragmentShaderSource);

    if (!asteroidProgram || !orbitProgram) {
      console.error('Failed to create shader programs');
      return;
    }

    programRef.current = asteroidProgram;
    orbitProgramRef.current = orbitProgram;

    // Load asteroid data
    loadAsteroidData(100000).then((data) => {
      const buffers = prepareAsteroidBuffers(data.asteroids);
      asteroidCountRef.current = buffers.count;

      // Create and bind VAO for asteroids
      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);

      // Spatial positions
      const spatialBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, spatialBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, buffers.spatialPositions, gl.STATIC_DRAW);
      const spatialLoc = gl.getAttribLocation(asteroidProgram, 'a_spatialPos');
      gl.enableVertexAttribArray(spatialLoc);
      gl.vertexAttribPointer(spatialLoc, 2, gl.FLOAT, false, 0, 0);

      // Histogram positions
      const histogramBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, histogramBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, buffers.histogramPositions, gl.STATIC_DRAW);
      const histogramLoc = gl.getAttribLocation(asteroidProgram, 'a_histogramPos');
      gl.enableVertexAttribArray(histogramLoc);
      gl.vertexAttribPointer(histogramLoc, 2, gl.FLOAT, false, 0, 0);

      // Semi-major axis
      const smaBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, smaBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, buffers.semiMajorAxes, gl.STATIC_DRAW);
      const smaLoc = gl.getAttribLocation(asteroidProgram, 'a_semiMajorAxis');
      gl.enableVertexAttribArray(smaLoc);
      gl.vertexAttribPointer(smaLoc, 1, gl.FLOAT, false, 0, 0);

      // Magnitude
      const magBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, magBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, buffers.magnitudes, gl.STATIC_DRAW);
      const magLoc = gl.getAttribLocation(asteroidProgram, 'a_magnitude');
      gl.enableVertexAttribArray(magLoc);
      gl.vertexAttribPointer(magLoc, 1, gl.FLOAT, false, 0, 0);

      // Orbit class
      const classBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, classBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, buffers.orbitClasses, gl.STATIC_DRAW);
      const classLoc = gl.getAttribLocation(asteroidProgram, 'a_orbitClass');
      gl.enableVertexAttribArray(classLoc);
      gl.vertexAttribPointer(classLoc, 1, gl.FLOAT, false, 0, 0);

      gl.bindVertexArray(null);

      // Store VAO reference
      (gl as WebGL2RenderingContext & { asteroidVAO: WebGLVertexArrayObject }).asteroidVAO = vao!;

      // Create orbit circle buffers
      const orbitVAOs: { vao: WebGLVertexArrayObject; count: number; color: number[] }[] = [];
      for (const planet of PLANET_ORBITS) {
        const vertices = generateCircleVertices(planet.a);
        const orbitVao = gl.createVertexArray();
        gl.bindVertexArray(orbitVao);

        const orbitBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, orbitBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        const posLoc = gl.getAttribLocation(orbitProgram, 'a_position');
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.bindVertexArray(null);
        orbitVAOs.push({ vao: orbitVao!, count: vertices.length / 2, color: planet.color });
      }

      (gl as WebGL2RenderingContext & { orbitVAOs: typeof orbitVAOs }).orbitVAOs = orbitVAOs;

      setIsLoading(false);
    });

    // Handle resize
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Render loop
  useEffect(() => {
    const gl = glRef.current;
    const program = programRef.current;
    const orbitProgram = orbitProgramRef.current;
    if (!gl || !program || !orbitProgram || isLoading) return;

    const render = () => {
      const now = performance.now();

      // FPS calculation
      fpsRef.current.frames++;
      if (now - fpsRef.current.lastTime >= 1000) {
        setFps(fpsRef.current.frames);
        fpsRef.current.frames = 0;
        fpsRef.current.lastTime = now;
      }

      // Demo mode automation
      if (demoRef.current.active) {
        const elapsed = now - demoRef.current.startTime;
        const cycleTime = 12000; // 12 second cycle
        const phase = (elapsed % cycleTime) / cycleTime;

        // First half: spatial view with slow zoom
        // Second half: histogram view
        if (phase < 0.4) {
          // Spatial view, slowly zoom in
          if (transitionRef.current.target !== 0) {
            transitionRef.current.target = 0;
            transitionRef.current.startTime = now;
            setViewMode('spatial');
            setIsTransitioning(true);
          }
          const zoomPhase = phase / 0.4;
          zoomRef.current = 0.12 + zoomPhase * 0.08;
          setZoom(zoomRef.current);
        } else if (phase < 0.5) {
          // Transition to histogram
          if (transitionRef.current.target !== 1) {
            transitionRef.current.target = 1;
            transitionRef.current.startTime = now;
            setViewMode('histogram');
            setIsTransitioning(true);
          }
        } else if (phase < 0.9) {
          // Histogram view
          zoomRef.current = 1.0;
          setZoom(1.0);
          panRef.current = { x: 0, y: 0 };
        } else {
          // Transition back to spatial
          if (transitionRef.current.target !== 0) {
            transitionRef.current.target = 0;
            transitionRef.current.startTime = now;
            setViewMode('spatial');
            setIsTransitioning(true);
            zoomRef.current = 0.12;
            setZoom(0.12);
          }
        }
      }

      // Update transition
      if (isTransitioning) {
        const elapsed = now - transitionRef.current.startTime;
        const progress = Math.min(elapsed / TRANSITION_DURATION, 1);
        const eased = easeInOutCubic(progress);

        const start = transitionRef.current.target === 1 ? 0 : 1;
        const end = transitionRef.current.target;
        transitionRef.current.value = start + (end - start) * eased;

        if (progress >= 1) {
          transitionRef.current.value = end;
          setIsTransitioning(false);
        }
      }

      // Clear
      gl.clearColor(0.02, 0.02, 0.03, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Enable blending
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      const dpr = window.devicePixelRatio || 1;

      // Draw orbit circles (only in spatial view)
      const orbitVAOs = (gl as WebGL2RenderingContext & { orbitVAOs?: { vao: WebGLVertexArrayObject; count: number; color: number[] }[] }).orbitVAOs;
      if (orbitVAOs && transitionRef.current.value < 0.5) {
        gl.useProgram(orbitProgram);

        gl.uniform2f(gl.getUniformLocation(orbitProgram, 'u_pan'), panRef.current.x, panRef.current.y);
        gl.uniform1f(gl.getUniformLocation(orbitProgram, 'u_zoom'), zoomRef.current);
        gl.uniform2f(gl.getUniformLocation(orbitProgram, 'u_resolution'), gl.canvas.width, gl.canvas.height);

        // Fade orbits during transition
        const orbitAlpha = 1 - transitionRef.current.value * 2;

        for (const orbit of orbitVAOs) {
          gl.bindVertexArray(orbit.vao);
          gl.uniform4f(
            gl.getUniformLocation(orbitProgram, 'u_color'),
            orbit.color[0],
            orbit.color[1],
            orbit.color[2],
            orbit.color[3] * orbitAlpha
          );
          gl.drawArrays(gl.LINE_LOOP, 0, orbit.count);
        }
      }

      // Draw asteroids
      gl.useProgram(program);

      const asteroidVAO = (gl as WebGL2RenderingContext & { asteroidVAO?: WebGLVertexArrayObject }).asteroidVAO;
      if (asteroidVAO) {
        gl.bindVertexArray(asteroidVAO);

        gl.uniform1f(gl.getUniformLocation(program, 'u_transition'), transitionRef.current.value);
        gl.uniform2f(gl.getUniformLocation(program, 'u_pan'), panRef.current.x, panRef.current.y);
        gl.uniform1f(gl.getUniformLocation(program, 'u_zoom'), zoomRef.current);
        gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), gl.canvas.width, gl.canvas.height);
        gl.uniform1f(gl.getUniformLocation(program, 'u_pointScale'), dpr);

        gl.drawArrays(gl.POINTS, 0, asteroidCountRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLoading, isTransitioning]);

  // Mouse/touch interactions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (demoMode) stopDemo();
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;

      const rect = canvas.getBoundingClientRect();
      panRef.current.x += (dx / rect.width) * 2 / zoomRef.current;
      panRef.current.y -= (dy / rect.height) * 2 / zoomRef.current;

      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (demoMode) stopDemo();

      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(0.05, Math.min(5, zoomRef.current * zoomFactor));
      zoomRef.current = newZoom;
      setZoom(newZoom);
    };

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        if (demoMode) stopDemo();
        isDraggingRef.current = true;
        lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;

      const dx = e.touches[0].clientX - lastMouseRef.current.x;
      const dy = e.touches[0].clientY - lastMouseRef.current.y;

      const rect = canvas.getBoundingClientRect();
      panRef.current.x += (dx / rect.width) * 2 / zoomRef.current;
      panRef.current.y -= (dy / rect.height) * 2 / zoomRef.current;

      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [demoMode, stopDemo]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggleView();
      } else if (e.key === 'd' || e.key === 'D') {
        if (demoMode) {
          stopDemo();
        } else {
          startDemo();
        }
      } else if (e.key === 's' || e.key === 'S') {
        takeScreenshot();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleView, demoMode, startDemo, stopDemo, takeScreenshot, toggleFullscreen]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div ref={containerRef} className={`relative bg-[#050508] ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050508] z-10">
          <div className="text-white/50 text-sm font-mono">Loading 100,000 asteroids...</div>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      />

      {/* Kirkwood gap annotations (histogram view only) */}
      {!isLoading && transitionRef.current.value > 0.5 && (
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ opacity: Math.min(1, (transitionRef.current.value - 0.5) * 2) }}
        >
          {KIRKWOOD_GAPS.map((gap, i) => {
            // Map AU to screen position
            const A_MIN = 1.5;
            const A_MAX = 5.5;
            const xNorm = (gap.a - A_MIN) / (A_MAX - A_MIN);
            const xPercent = 5 + xNorm * 90; // Map to 5%-95% of width

            return (
              <div
                key={i}
                className="absolute bottom-16 md:bottom-20 text-center"
                style={{ left: `${xPercent}%`, transform: 'translateX(-50%)' }}
              >
                <div className="text-[10px] md:text-xs font-mono text-white/60 whitespace-nowrap">
                  {gap.ratio}
                </div>
                <div className="w-px h-3 md:h-4 bg-white/30 mx-auto" />
              </div>
            );
          })}

          {/* X-axis label */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-mono text-white/40">
            Semi-major axis (AU) — Jupiter orbital resonances
          </div>
        </div>
      )}

      {/* Spatial view annotations */}
      {!isLoading && transitionRef.current.value < 0.5 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: Math.min(1, (0.5 - transitionRef.current.value) * 2) }}
        >
          {/* Sun indicator */}
          <div
            className="absolute text-xs font-mono text-yellow-500/70"
            style={{
              left: `calc(50% + ${panRef.current.x * zoomRef.current * 50}%)`,
              top: `calc(50% - ${panRef.current.y * zoomRef.current * 50}%)`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-yellow-400/80 mb-1 mx-auto" />
            <span className="text-[10px]">Sun</span>
          </div>
        </div>
      )}

      {/* Desktop control panel */}
      <div className="hidden md:block absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 p-4 space-y-4 text-white/80 text-sm">
        <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Controls</div>

        {/* View toggle */}
        <button
          onClick={toggleView}
          disabled={isTransitioning}
          className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 transition-colors text-left"
        >
          {viewMode === 'spatial' ? 'Show Kirkwood Gaps' : 'Show Spatial View'}
          <span className="float-right text-white/40">[Space]</span>
        </button>

        {/* Zoom display */}
        <div className="flex justify-between items-center">
          <span className="text-white/50">Zoom</span>
          <span className="font-mono">{zoom.toFixed(2)}x</span>
        </div>

        {/* Demo mode */}
        <button
          onClick={demoMode ? stopDemo : startDemo}
          className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 transition-colors text-left"
        >
          {demoMode ? 'Stop Demo' : 'Start Demo'}
          <span className="float-right text-white/40">[D]</span>
        </button>

        {/* Screenshot */}
        <button
          onClick={takeScreenshot}
          className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 transition-colors text-left"
        >
          Screenshot
          <span className="float-right text-white/40">[S]</span>
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 transition-colors text-left"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          <span className="float-right text-white/40">[F]</span>
        </button>

        {/* FPS toggle */}
        <button
          onClick={() => setShowFps(!showFps)}
          className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 transition-colors text-left"
        >
          {showFps ? 'Hide FPS' : 'Show FPS'}
        </button>

        {showFps && (
          <div className="font-mono text-xs text-white/50">
            {fps} FPS | {asteroidCountRef.current.toLocaleString()} asteroids
          </div>
        )}
      </div>

      {/* Mobile controls */}
      <div className="md:hidden absolute bottom-4 left-4 right-4">
        {mobileControlsOpen ? (
          <div className="bg-black/80 backdrop-blur-sm border border-white/10 p-4 space-y-3 text-white/80 text-sm">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Controls</span>
              <button onClick={() => setMobileControlsOpen(false)} className="text-white/50 text-lg">
                &times;
              </button>
            </div>

            <button
              onClick={() => { toggleView(); setMobileControlsOpen(false); }}
              disabled={isTransitioning}
              className="w-full px-3 py-2 bg-white/10 disabled:opacity-50 transition-colors text-left"
            >
              {viewMode === 'spatial' ? 'Show Kirkwood Gaps' : 'Show Spatial View'}
            </button>

            <button
              onClick={() => { demoMode ? stopDemo() : startDemo(); setMobileControlsOpen(false); }}
              className="w-full px-3 py-2 bg-white/10 transition-colors text-left"
            >
              {demoMode ? 'Stop Demo' : 'Start Demo'}
            </button>

            <button
              onClick={toggleFullscreen}
              className="w-full px-3 py-2 bg-white/10 transition-colors text-left"
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setMobileControlsOpen(true)}
            className="bg-black/60 backdrop-blur-sm border border-white/10 px-4 py-2 text-white/70 text-sm"
          >
            Controls
          </button>
        )}
      </div>

      {/* View indicator */}
      <div className="absolute top-4 left-4 text-white/40 text-xs font-mono uppercase tracking-wider">
        {viewMode === 'spatial' ? 'Solar System View' : 'Kirkwood Gaps Histogram'}
        {demoMode && <span className="ml-2 text-[var(--color-blue)]">[Demo]</span>}
      </div>
    </div>
  );
}
