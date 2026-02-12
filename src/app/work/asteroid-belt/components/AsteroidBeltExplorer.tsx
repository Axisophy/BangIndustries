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

// Kirkwood gap explanations
const GAP_EXPLANATIONS: Record<string, string> = {
  '4:1': '4 asteroid orbits per 1 Jupiter orbit',
  '3:1': '3 asteroid orbits per 1 Jupiter orbit',
  '5:2': '5 asteroid orbits per 2 Jupiter orbits',
  '7:3': '7 asteroid orbits per 3 Jupiter orbits',
  '2:1': '2 asteroid orbits per 1 Jupiter orbit',
};

// Histogram axis tick marks
const HISTOGRAM_TICKS = [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

// Orbit class legend items with colors matching shader
const LEGEND_ITEMS = {
  spatial: [
    { label: 'Main Belt', color: 'rgb(179, 179, 166)' },
    { label: 'Jupiter Trojans', color: 'rgb(128, 153, 217)' },
    { label: 'Hildas', color: 'rgb(153, 179, 204)' },
    { label: 'Hungarias', color: 'rgb(217, 191, 128)' },
    { label: 'Near-Earth', color: 'rgb(230, 102, 77)' },
  ],
  histogram: [
    { label: 'Vertical lines mark Jupiter orbital resonances', color: '' },
  ],
};

export default function AsteroidBeltExplorer({ className = '' }: AsteroidBeltExplorerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const orbitProgramRef = useRef<WebGLProgram | null>(null);
  const animationFrameRef = useRef<number>(0);
  const asteroidCountRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('spatial');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef({ value: 0, target: 0, startTime: 0 });
  const TRANSITION_DURATION = 3000; // 3 seconds for dramatic effect

  // Camera state
  const panRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(0.15);
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
  const [showInfo, setShowInfo] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // Track transition value for rendering annotations
  const [transitionValue, setTransitionValue] = useState(0);

  // Scrub slider state
  const [isScrubbing, setIsScrubbing] = useState(false);
  const scrubValueRef = useRef(0);

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

  // Scrub slider handlers
  const handleScrubStart = useCallback(() => {
    if (demoMode) stopDemo();
    setIsScrubbing(true);
    setIsTransitioning(false);
  }, [demoMode, stopDemo]);

  const handleScrubChange = useCallback((value: number) => {
    scrubValueRef.current = value;
    transitionRef.current.value = value;
    setTransitionValue(value);

    // Update view mode based on scrub position
    if (value > 0.5 && viewMode === 'spatial') {
      setViewMode('histogram');
    } else if (value <= 0.5 && viewMode === 'histogram') {
      setViewMode('spatial');
    }

    // Adjust zoom based on transition
    const spatialZoom = 0.15;
    const histogramZoom = 1.0;
    zoomRef.current = spatialZoom + (histogramZoom - spatialZoom) * value;
    setZoom(zoomRef.current);

    // Reset pan during scrub
    panRef.current = { x: 0, y: 0 };
  }, [viewMode]);

  const handleScrubEnd = useCallback((value: number) => {
    setIsScrubbing(false);

    // Snap to ends if close
    if (value < 0.1) {
      transitionRef.current.value = 0;
      transitionRef.current.target = 0;
      setTransitionValue(0);
      setViewMode('spatial');
      zoomRef.current = 0.15;
      setZoom(0.15);
    } else if (value > 0.9) {
      transitionRef.current.value = 1;
      transitionRef.current.target = 1;
      setTransitionValue(1);
      setViewMode('histogram');
      zoomRef.current = 1.0;
      setZoom(1.0);
    } else {
      // Animate to nearest end
      const target = value < 0.5 ? 0 : 1;
      transitionRef.current.target = target;
      transitionRef.current.startTime = performance.now();
      setIsTransitioning(true);
      setViewMode(target === 0 ? 'spatial' : 'histogram');
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

      // Trigger entry animation after a brief delay
      setTimeout(() => setHasEntered(true), 100);
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

    // Initialize start time
    startTimeRef.current = performance.now();

    const render = () => {
      const now = performance.now();

      // Update time for orbital motion (in seconds)
      timeRef.current = (now - startTimeRef.current) / 1000;

      // FPS calculation
      fpsRef.current.frames++;
      if (now - fpsRef.current.lastTime >= 1000) {
        setFps(fpsRef.current.frames);
        fpsRef.current.frames = 0;
        fpsRef.current.lastTime = now;
      }

      // Demo mode automation - 18s cycle
      // 6s spatial zoom | 3s transition | 6s histogram hold | 3s transition back
      if (demoRef.current.active) {
        const elapsed = now - demoRef.current.startTime;
        const cycleTime = 18000;
        const phase = (elapsed % cycleTime) / cycleTime;

        if (phase < 0.333) {
          // Spatial view with slow zoom (6s)
          if (transitionRef.current.target !== 0) {
            transitionRef.current.target = 0;
            transitionRef.current.startTime = now;
            setViewMode('spatial');
            setIsTransitioning(true);
          }
          const zoomPhase = phase / 0.333;
          zoomRef.current = 0.12 + zoomPhase * 0.08;
          setZoom(zoomRef.current);
        } else if (phase < 0.5) {
          // Transition to histogram (3s)
          if (transitionRef.current.target !== 1) {
            transitionRef.current.target = 1;
            transitionRef.current.startTime = now;
            setViewMode('histogram');
            setIsTransitioning(true);
          }
        } else if (phase < 0.833) {
          // Histogram view hold (6s)
          zoomRef.current = 1.0;
          setZoom(1.0);
          panRef.current = { x: 0, y: 0 };
        } else {
          // Transition back to spatial (3s)
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

      // Update transition (skip if scrubbing)
      if (isTransitioning && !isScrubbing) {
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

      // Update transition value for React rendering (skip if scrubbing - handled by scrub)
      if (!isScrubbing) {
        setTransitionValue(transitionRef.current.value);
      }

      // Clear
      gl.clearColor(0.02, 0.02, 0.03, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Enable blending - additive for glowing density
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
        gl.uniform1f(gl.getUniformLocation(program, 'u_time'), timeRef.current);
        gl.uniform1f(gl.getUniformLocation(program, 'u_orbitalSpeed'), 0.02); // Slow orbital motion

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
  }, [isLoading, isTransitioning, isScrubbing]);

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

  // Helper to map AU to screen X position
  const auToScreenX = (au: number): number => {
    const A_MIN = 1.5;
    const A_MAX = 5.5;
    const xNorm = (au - A_MIN) / (A_MAX - A_MIN);
    return 5 + xNorm * 90; // Map to 5%-95% of width
  };

  // Calculate annotation opacity
  const histogramAnnotationOpacity = transitionValue > 0.85 ? Math.min(1, (transitionValue - 0.85) / 0.15) : 0;
  const spatialAnnotationOpacity = transitionValue < 0.15 ? Math.min(1, (0.15 - transitionValue) / 0.15) : 0;

  return (
    <div ref={containerRef} className={`relative bg-[#050508] ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050508] z-10">
          <div className="text-white/50 text-sm font-mono animate-pulse">
            Loading 100,000 asteroids...
          </div>
        </div>
      )}

      {/* Canvas with entry animation */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-all duration-1000 ${
          hasEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
        }`}
        style={{ touchAction: 'none' }}
      />

      {/* Histogram annotations (visible when transition > 0.85) */}
      {!isLoading && histogramAnnotationOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: histogramAnnotationOpacity }}
        >
          {/* X-axis tick marks */}
          <div className="absolute bottom-12 md:bottom-14 left-0 right-0">
            {HISTOGRAM_TICKS.map((tick) => (
              <div
                key={tick}
                className="absolute text-center"
                style={{ left: `${auToScreenX(tick)}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-px h-2 bg-white/30 mx-auto" />
                <div className="text-[9px] font-mono text-white/40 mt-1">{tick.toFixed(1)}</div>
              </div>
            ))}
          </div>

          {/* X-axis label */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[9px] font-mono text-white/30">
            Distance from the Sun (AU)
          </div>

          {/* Y-axis indicator */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center">
            <div className="text-[9px] font-mono text-white/30 whitespace-nowrap flex items-center gap-2">
              <span>Fewer</span>
              <span className="text-white/20">|</span>
              <span>More asteroids</span>
            </div>
          </div>

          {/* Kirkwood gap annotations with dashed lines and explanations */}
          {KIRKWOOD_GAPS.map((gap, i) => {
            const xPercent = auToScreenX(gap.a);

            return (
              <div
                key={i}
                className="absolute text-center"
                style={{ left: `${xPercent}%`, transform: 'translateX(-50%)' }}
              >
                {/* Dashed vertical line from annotation to x-axis */}
                <div
                  className="absolute top-24 md:top-28 w-px"
                  style={{
                    height: 'calc(100% - 7rem)',
                    background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 4px, transparent 4px, transparent 8px)',
                  }}
                />

                {/* Ratio label */}
                <div className="absolute top-16 md:top-20">
                  <div className="text-xs md:text-sm font-mono text-white/70 font-medium">
                    {gap.ratio}
                  </div>
                  {/* Explanation */}
                  <div className="text-[9px] font-mono text-white/30 mt-1 whitespace-nowrap">
                    {GAP_EXPLANATIONS[gap.ratio]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Spatial view annotations (visible when transition < 0.15) */}
      {!isLoading && spatialAnnotationOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: spatialAnnotationOpacity }}
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

          {/* Planet labels */}
          {PLANET_ORBITS.map((planet) => {
            // Position label along orbit, adjusted by pan/zoom
            const angle = Math.PI * 0.25; // 45 degrees
            const labelX = planet.a * Math.cos(angle);
            const labelY = planet.a * Math.sin(angle);

            return (
              <div
                key={planet.name}
                className="absolute text-[8px] font-mono uppercase tracking-wider"
                style={{
                  left: `calc(50% + ${(labelX + panRef.current.x) * zoomRef.current * 50}%)`,
                  top: `calc(50% - ${(labelY + panRef.current.y) * zoomRef.current * 50}%)`,
                  transform: 'translate(-50%, -50%)',
                  color: planet.name === 'Earth' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.20)',
                }}
              >
                {planet.name}
              </div>
            );
          })}

          {/* Main Belt label - curved along the belt center (~2.7 AU) */}
          <div
            className="absolute text-[10px] font-mono text-white/15 uppercase tracking-widest"
            style={{
              left: `calc(50% + ${(2.7 * Math.cos(Math.PI * 0.6) + panRef.current.x) * zoomRef.current * 50}%)`,
              top: `calc(50% - ${(2.7 * Math.sin(Math.PI * 0.6) + panRef.current.y) * zoomRef.current * 50}%)`,
              transform: 'translate(-50%, -50%) rotate(-30deg)',
            }}
          >
            Main Belt
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

      {/* View indicator and info toggle */}
      <div className="absolute top-4 left-4 flex items-center gap-3">
        <div className="text-white/40 text-xs font-mono uppercase tracking-wider">
          {viewMode === 'spatial' ? 'Solar System View' : 'Kirkwood Gaps Histogram'}
          {demoMode && <span className="ml-2 text-[var(--color-blue)]">[Demo]</span>}
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="w-5 h-5 rounded-full border border-white/30 text-white/50 text-xs flex items-center justify-center hover:border-white/50 hover:text-white/70 transition-colors"
          title="About this visualisation"
        >
          i
        </button>
      </div>

      {/* Info panel */}
      {showInfo && (
        <div className="absolute top-12 left-4 max-w-xs bg-black/80 backdrop-blur-sm border border-white/10 p-4 text-[11px] text-white/60 leading-relaxed">
          <button
            onClick={() => setShowInfo(false)}
            className="absolute top-2 right-2 text-white/40 hover:text-white/60 text-sm"
          >
            &times;
          </button>
          <p className="mb-3">
            You&apos;re looking at 100,000 asteroids plotted from Minor Planet Center orbital data.
          </p>
          <p className="mb-3">
            In the solar system view, each dot is an asteroid at its computed position. The inner asteroids orbit faster than outer ones, following Kepler&apos;s laws.
          </p>
          <p>
            Switch to the Kirkwood Gaps view to see how Jupiter&apos;s gravity has carved empty channels through the belt at specific orbital resonances.
          </p>
        </div>
      )}

      {/* Legend - bottom left, crossfades between views */}
      {!isLoading && (
        <div className="absolute bottom-16 left-4 pointer-events-none">
          {/* Spatial legend */}
          <div
            className="text-[8px] font-mono text-white/40 space-y-1"
            style={{ opacity: 1 - transitionValue }}
          >
            {LEGEND_ITEMS.spatial.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Histogram legend */}
          <div
            className="text-[8px] font-mono text-white/40 absolute top-0 left-0"
            style={{ opacity: transitionValue }}
          >
            {LEGEND_ITEMS.histogram.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                {item.color && (
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scrub slider */}
      {!isLoading && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-8 pb-4 px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider whitespace-nowrap">
                Solar System
              </span>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.001"
                  value={transitionValue}
                  onChange={(e) => handleScrubChange(parseFloat(e.target.value))}
                  onMouseDown={handleScrubStart}
                  onTouchStart={handleScrubStart}
                  onMouseUp={(e) => handleScrubEnd(parseFloat((e.target as HTMLInputElement).value))}
                  onTouchEnd={(e) => handleScrubEnd(parseFloat((e.target as HTMLInputElement).value))}
                  className="w-full h-1 appearance-none bg-white/20 cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:cursor-grab
                    [&::-webkit-slider-thumb]:active:cursor-grabbing
                    [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.5)]
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-white
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-grab
                    [&::-moz-range-thumb]:active:cursor-grabbing"
                />
                {/* Progress fill */}
                <div
                  className="absolute top-0 left-0 h-1 bg-white/40 pointer-events-none"
                  style={{ width: `${transitionValue * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider whitespace-nowrap">
                Kirkwood Gaps
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
