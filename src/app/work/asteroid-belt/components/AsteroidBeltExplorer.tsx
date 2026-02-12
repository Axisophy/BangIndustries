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

// View definitions
const VIEWS = [
  { id: 'spatial', label: 'Orbits', shortLabel: 'Orb', shortcut: '1' },
  { id: 'histogram', label: 'Gaps', shortLabel: 'Gap', shortcut: '2' },
  { id: 'family', label: 'Families', shortLabel: 'Fam', shortcut: '3' },
  { id: 'danger', label: 'Danger', shortLabel: 'Dnr', shortcut: '4' },
  { id: 'discovery', label: 'Discovery', shortLabel: 'Dis', shortcut: '5' },
] as const;

type ViewId = typeof VIEWS[number]['id'];

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

// Orbit class legend items
const ORBIT_CLASS_LEGEND = [
  { label: 'Main Belt', color: 'rgb(179, 179, 166)' },
  { label: 'Jupiter Trojans', color: 'rgb(128, 153, 217)' },
  { label: 'Hildas', color: 'rgb(153, 179, 204)' },
  { label: 'Hungarias', color: 'rgb(217, 191, 128)' },
  { label: 'Near-Earth', color: 'rgb(230, 102, 77)' },
];

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

  // View state - now supports 5 views
  const [activeView, setActiveView] = useState<ViewId>('spatial');
  const [previousView, setPreviousView] = useState<ViewId>('spatial');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef({ value: 0, startTime: 0 });
  const TRANSITION_DURATION = 3000;

  // Camera state
  const panRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(0.15);
  const [zoom, setZoom] = useState(0.15);

  // Interaction state
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Auto-play sequence
  const [isPlaying, setIsPlaying] = useState(false);
  const playRef = useRef({ active: false, startTime: 0, currentIndex: 0 });

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [fps, setFps] = useState(60);
  const fpsRef = useRef({ frames: 0, lastTime: performance.now() });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Track transition value for annotations
  const [transitionProgress, setTransitionProgress] = useState(0);

  // Get the transition value for WebGL (0 = spatial, 1 = histogram)
  // For now, only spatial and histogram are fully implemented
  const getTransitionValue = useCallback(() => {
    if (activeView === 'spatial' || previousView === 'spatial') {
      if (activeView === 'histogram' || previousView === 'histogram') {
        // Transitioning between spatial and histogram
        const isSpatialToHistogram = activeView === 'histogram';
        return isSpatialToHistogram ? transitionProgress : 1 - transitionProgress;
      }
    }
    // For other views, return based on active view
    if (activeView === 'histogram') return 1;
    return 0;
  }, [activeView, previousView, transitionProgress]);

  // Show toast notification
  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  }, []);

  // Transition to a new view
  const transitionToView = useCallback((viewId: ViewId) => {
    if (isTransitioning || activeView === viewId) return;

    // For now, only spatial and histogram are implemented
    if (viewId !== 'spatial' && viewId !== 'histogram') {
      showToast(`${VIEWS.find(v => v.id === viewId)?.label} view coming soon`);
      return;
    }

    setPreviousView(activeView);
    setActiveView(viewId);
    setIsTransitioning(true);
    transitionRef.current = { value: 0, startTime: performance.now() };

    // Set appropriate camera for the view
    panRef.current = { x: 0, y: 0 };
    if (viewId === 'histogram') {
      zoomRef.current = 1.0;
      setZoom(1.0);
    } else {
      zoomRef.current = 0.15;
      setZoom(0.15);
    }
  }, [activeView, isTransitioning, showToast]);

  // Auto-play sequence
  const startAutoPlay = useCallback(() => {
    setIsPlaying(true);
    playRef.current = { active: true, startTime: performance.now(), currentIndex: 0 };
    // Start from spatial view
    if (activeView !== 'spatial') {
      transitionToView('spatial');
    }
  }, [activeView, transitionToView]);

  const stopAutoPlay = useCallback(() => {
    setIsPlaying(false);
    playRef.current.active = false;
  }, []);

  // Screenshot
  const takeScreenshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `asteroid-belt-${activeView}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [activeView]);

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

    const asteroidProgram = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    const orbitProgram = createProgram(gl, orbitVertexShaderSource, orbitFragmentShaderSource);

    if (!asteroidProgram || !orbitProgram) {
      console.error('Failed to create shader programs');
      return;
    }

    programRef.current = asteroidProgram;
    orbitProgramRef.current = orbitProgram;

    loadAsteroidData(100000).then((data) => {
      const buffers = prepareAsteroidBuffers(data.asteroids);
      asteroidCountRef.current = buffers.count;

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
      setTimeout(() => setHasEntered(true), 100);
    });

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

    startTimeRef.current = performance.now();

    const render = () => {
      const now = performance.now();
      timeRef.current = (now - startTimeRef.current) / 1000;

      // FPS calculation
      fpsRef.current.frames++;
      if (now - fpsRef.current.lastTime >= 1000) {
        setFps(fpsRef.current.frames);
        fpsRef.current.frames = 0;
        fpsRef.current.lastTime = now;
      }

      // Auto-play sequence - only handles spatial and histogram for now
      if (playRef.current.active) {
        const elapsed = now - playRef.current.startTime;
        const cycleTime = 18000; // 18s cycle
        const phase = (elapsed % cycleTime) / cycleTime;

        if (phase < 0.333) {
          // Spatial view (6s)
          if (activeView !== 'spatial' && !isTransitioning) {
            transitionToView('spatial');
          }
          const zoomPhase = phase / 0.333;
          zoomRef.current = 0.12 + zoomPhase * 0.08;
          setZoom(zoomRef.current);
        } else if (phase < 0.5) {
          // Transition to histogram (3s)
          if (activeView !== 'histogram' && !isTransitioning) {
            transitionToView('histogram');
          }
        } else if (phase < 0.833) {
          // Histogram view (6s)
          zoomRef.current = 1.0;
          setZoom(1.0);
          panRef.current = { x: 0, y: 0 };
        } else {
          // Transition back (3s)
          if (activeView !== 'spatial' && !isTransitioning) {
            transitionToView('spatial');
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

        transitionRef.current.value = eased;
        setTransitionProgress(eased);

        if (progress >= 1) {
          setIsTransitioning(false);
          setTransitionProgress(1);
        }
      }

      // Clear
      gl.clearColor(0.02, 0.02, 0.03, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Enable blending
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      const dpr = window.devicePixelRatio || 1;
      const transitionValue = getTransitionValue();

      // Draw orbit circles (spatial view)
      const orbitVAOs = (gl as WebGL2RenderingContext & { orbitVAOs?: { vao: WebGLVertexArrayObject; count: number; color: number[] }[] }).orbitVAOs;
      if (orbitVAOs && transitionValue < 0.5) {
        gl.useProgram(orbitProgram);

        gl.uniform2f(gl.getUniformLocation(orbitProgram, 'u_pan'), panRef.current.x, panRef.current.y);
        gl.uniform1f(gl.getUniformLocation(orbitProgram, 'u_zoom'), zoomRef.current);
        gl.uniform2f(gl.getUniformLocation(orbitProgram, 'u_resolution'), gl.canvas.width, gl.canvas.height);

        const orbitAlpha = 1 - transitionValue * 2;

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

        gl.uniform1f(gl.getUniformLocation(program, 'u_transition'), transitionValue);
        gl.uniform2f(gl.getUniformLocation(program, 'u_pan'), panRef.current.x, panRef.current.y);
        gl.uniform1f(gl.getUniformLocation(program, 'u_zoom'), zoomRef.current);
        gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), gl.canvas.width, gl.canvas.height);
        gl.uniform1f(gl.getUniformLocation(program, 'u_pointScale'), dpr);
        gl.uniform1f(gl.getUniformLocation(program, 'u_time'), timeRef.current);
        gl.uniform1f(gl.getUniformLocation(program, 'u_orbitalSpeed'), 0.02);

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
  }, [isLoading, isTransitioning, activeView, getTransitionValue, transitionToView]);

  // Mouse/touch interactions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (isPlaying) stopAutoPlay();
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
      if (isPlaying) stopAutoPlay();

      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(0.05, Math.min(5, zoomRef.current * zoomFactor));
      zoomRef.current = newZoom;
      setZoom(newZoom);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        if (isPlaying) stopAutoPlay();
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
  }, [isPlaying, stopAutoPlay]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // View shortcuts 1-5
      const viewIndex = parseInt(e.key) - 1;
      if (viewIndex >= 0 && viewIndex < VIEWS.length) {
        e.preventDefault();
        transitionToView(VIEWS[viewIndex].id);
        return;
      }

      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        if (isPlaying) {
          stopAutoPlay();
        } else {
          startAutoPlay();
        }
      } else if (e.key === 's' || e.key === 'S') {
        takeScreenshot();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [transitionToView, isPlaying, startAutoPlay, stopAutoPlay, takeScreenshot, toggleFullscreen]);

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
    return 5 + xNorm * 90;
  };

  // Calculate view-specific opacities
  const transitionValue = getTransitionValue();
  const spatialOpacity = activeView === 'spatial' && !isTransitioning ? 1 :
    (previousView === 'spatial' && isTransitioning ? 1 - transitionProgress :
    (activeView === 'spatial' && isTransitioning ? transitionProgress : 0));
  const histogramOpacity = activeView === 'histogram' && !isTransitioning ? 1 :
    (previousView === 'histogram' && isTransitioning ? 1 - transitionProgress :
    (activeView === 'histogram' && isTransitioning ? transitionProgress : 0));

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

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-all duration-1000 ${
          hasEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
        }`}
        style={{ touchAction: 'none' }}
      />

      {/* Histogram annotations */}
      {!isLoading && histogramOpacity > 0.5 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: Math.max(0, (histogramOpacity - 0.5) * 2) }}
        >
          {/* X-axis tick marks */}
          <div className="absolute bottom-20 md:bottom-24 left-0 right-0">
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
          <div className="absolute bottom-14 md:bottom-16 left-1/2 transform -translate-x-1/2 text-[9px] font-mono text-white/30">
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

          {/* Kirkwood gap annotations */}
          {KIRKWOOD_GAPS.map((gap, i) => {
            const xPercent = auToScreenX(gap.a);

            return (
              <div
                key={i}
                className="absolute text-center"
                style={{ left: `${xPercent}%`, transform: 'translateX(-50%)' }}
              >
                <div
                  className="absolute top-24 md:top-28 w-px"
                  style={{
                    height: 'calc(100% - 10rem)',
                    background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 4px, transparent 4px, transparent 8px)',
                  }}
                />

                <div className="absolute top-16 md:top-20">
                  <div className="text-xs md:text-sm font-mono text-white/70 font-medium">
                    {gap.ratio}
                  </div>
                  <div className="text-[9px] font-mono text-white/30 mt-1 whitespace-nowrap">
                    {GAP_EXPLANATIONS[gap.ratio]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Spatial view annotations */}
      {!isLoading && spatialOpacity > 0.5 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: Math.max(0, (spatialOpacity - 0.5) * 2) }}
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
            const angle = Math.PI * 0.25;
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

          {/* Main Belt label */}
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

      {/* Legend - bottom left */}
      {!isLoading && spatialOpacity > 0.5 && (
        <div
          className="absolute bottom-20 left-4 pointer-events-none text-[8px] font-mono text-white/40 space-y-1"
          style={{ opacity: Math.max(0, (spatialOpacity - 0.5) * 2) }}
        >
          {ORBIT_CLASS_LEGEND.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Toast notification */}
      {toastMessage && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
          bg-black/80 backdrop-blur-sm border border-white/10 px-4 py-2
          text-white/70 text-sm font-mono rounded-lg">
          {toastMessage}
        </div>
      )}

      {/* Info panel */}
      {showInfo && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20
          w-72 bg-black/80 backdrop-blur-xl border border-white/10
          rounded-lg p-4 text-[10px] font-mono text-white/50">
          <button
            onClick={() => setShowInfo(false)}
            className="absolute top-2 right-2 text-white/40 hover:text-white/60"
          >
            &times;
          </button>
          <div className="text-[9px] uppercase tracking-wider text-white/30 mb-2">Data</div>
          <div>{asteroidCountRef.current.toLocaleString()} asteroids from Minor Planet Center</div>
          <div>Orbital elements computed at epoch 2025-01-01</div>
          <div className="mt-2 text-white/30">{fps} FPS | WebGL2</div>
          <div className="mt-2 text-[8px] text-white/20">
            Keys 1-5: Switch view | Space: Play | S: Save | F: Fullscreen
          </div>
        </div>
      )}

      {/* Bottom bar - View selector */}
      {!isLoading && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10
          flex items-center gap-1
          bg-black/70 backdrop-blur-xl
          border border-white/10 rounded-full
          px-2 py-1.5">

          {/* View buttons - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {VIEWS.map((view) => (
              <button
                key={view.id}
                onClick={() => transitionToView(view.id)}
                disabled={isTransitioning}
                className={`
                  px-3 py-1.5 text-[10px] uppercase tracking-[0.08em] rounded-full
                  transition-all duration-300
                  ${activeView === view.id
                    ? 'bg-white/15 text-white/90'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'}
                  disabled:opacity-50
                `}
              >
                {view.label}
              </button>
            ))}
          </div>

          {/* View buttons - Mobile (short labels) */}
          <div className="flex md:hidden items-center gap-1">
            {VIEWS.map((view) => (
              <button
                key={view.id}
                onClick={() => transitionToView(view.id)}
                disabled={isTransitioning}
                className={`
                  px-2 py-1.5 text-[9px] uppercase tracking-[0.05em] rounded-full
                  transition-all duration-300
                  ${activeView === view.id
                    ? 'bg-white/15 text-white/90'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'}
                  disabled:opacity-50
                `}
              >
                {view.shortLabel}
              </button>
            ))}
          </div>

          {/* Separator */}
          <div className="w-px h-4 bg-white/10 mx-1" />

          {/* Utility buttons */}
          <button
            onClick={isPlaying ? stopAutoPlay : startAutoPlay}
            className={`w-7 h-7 flex items-center justify-center rounded-full
              transition-all duration-300
              ${isPlaying ? 'bg-white/15 text-white/90' : 'text-white/40 hover:text-white/60 hover:bg-white/5'}`}
            title={isPlaying ? 'Stop' : 'Play sequence'}
          >
            {isPlaying ? '■' : '▶'}
          </button>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`w-7 h-7 flex items-center justify-center rounded-full text-sm
              transition-all duration-300
              ${showInfo ? 'bg-white/15 text-white/90' : 'text-white/40 hover:text-white/60 hover:bg-white/5'}`}
            title="Info"
          >
            ⓘ
          </button>

          <button
            onClick={toggleFullscreen}
            className="w-7 h-7 flex items-center justify-center rounded-full text-xs
              text-white/40 hover:text-white/60 hover:bg-white/5 transition-all duration-300"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? '⛶' : '⛶'}
          </button>
        </div>
      )}
    </div>
  );
}
