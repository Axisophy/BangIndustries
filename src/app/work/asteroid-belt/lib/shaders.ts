export const vertexShaderSource = `#version 300 es
precision highp float;

in vec2 a_spatialPos;
in vec2 a_histogramPos;
in float a_semiMajorAxis;
in float a_magnitude;
in float a_orbitClass;

uniform float u_transition;
uniform vec2 u_pan;
uniform float u_zoom;
uniform vec2 u_resolution;
uniform float u_pointScale;

out float v_semiMajorAxis;
out float v_orbitClass;
out float v_alpha;

void main() {
    // Interpolate position between spatial and histogram views
    vec2 pos = mix(a_spatialPos, a_histogramPos, u_transition);

    // Apply pan and zoom
    pos = (pos + u_pan) * u_zoom;

    // Aspect ratio correction
    float aspect = u_resolution.x / u_resolution.y;
    pos.x /= aspect;

    gl_Position = vec4(pos, 0.0, 1.0);

    // Point size: brighter asteroids slightly larger
    // H magnitude range roughly 10-22. Map to size range.
    float magNorm = clamp((a_magnitude - 10.0) / 12.0, 0.0, 1.0);
    gl_PointSize = mix(3.0, 1.0, magNorm) * u_pointScale;

    v_semiMajorAxis = a_semiMajorAxis;
    v_orbitClass = a_orbitClass;

    // Slight fade for dimmer asteroids
    v_alpha = mix(0.8, 0.3, magNorm);
}
`;

export const fragmentShaderSource = `#version 300 es
precision highp float;

in float v_semiMajorAxis;
in float v_orbitClass;
in float v_alpha;

out vec4 fragColor;

// Color by semi-major axis (gradient from inner to outer belt)
vec3 getColorBySMA(float a) {
    // Inner belt (a < 2.5): warmer colors
    // Outer belt (a > 3.0): cooler colors
    float t = clamp((a - 1.5) / 4.0, 0.0, 1.0);

    // Warm to cool gradient
    vec3 inner = vec3(0.9, 0.6, 0.3);  // Orange-ish
    vec3 mid = vec3(0.7, 0.7, 0.6);    // Neutral
    vec3 outer = vec3(0.4, 0.5, 0.7);  // Blue-ish

    if (t < 0.5) {
        return mix(inner, mid, t * 2.0);
    } else {
        return mix(mid, outer, (t - 0.5) * 2.0);
    }
}

// Color by orbit class for variety
vec3 getColorByClass(float orbitClass) {
    int c = int(orbitClass);

    if (c == 0) return vec3(0.7, 0.7, 0.65);      // MBA - neutral gray
    if (c == 1) return vec3(0.85, 0.75, 0.5);     // Hungaria - yellow
    if (c == 2) return vec3(0.8, 0.7, 0.6);       // Phocaea
    if (c == 3) return vec3(0.6, 0.7, 0.8);       // Hilda - blue-ish
    if (c == 4) return vec3(0.5, 0.6, 0.85);      // Trojan - bluer
    if (c == 5) return vec3(0.9, 0.4, 0.3);       // NEO - red (danger!)
    if (c == 6) return vec3(0.95, 0.3, 0.25);     // Atira - red
    if (c == 7) return vec3(0.9, 0.35, 0.3);      // Aten - red
    if (c == 8) return vec3(0.85, 0.4, 0.35);     // Apollo - red
    if (c == 9) return vec3(0.8, 0.5, 0.4);       // Amor - orange-red

    return vec3(0.6, 0.6, 0.6);
}

void main() {
    // Circular point with soft edge
    vec2 coord = gl_PointCoord * 2.0 - 1.0;
    float dist = length(coord);
    if (dist > 1.0) discard;

    // Soft falloff for glow effect
    float alpha = v_alpha * (1.0 - smoothstep(0.0, 1.0, dist));

    // Bright core
    alpha += 0.2 * (1.0 - smoothstep(0.0, 0.3, dist));
    alpha = clamp(alpha, 0.0, 1.0);

    // Blend SMA color with class color
    vec3 smaColor = getColorBySMA(v_semiMajorAxis);
    vec3 classColor = getColorByClass(v_orbitClass);
    vec3 color = mix(smaColor, classColor, 0.3);

    // Slight bloom in center
    color += vec3(0.15) * (1.0 - smoothstep(0.0, 0.2, dist));

    fragColor = vec4(color, alpha);
}
`;

// Orbit circle shader for drawing planetary orbits
export const orbitVertexShaderSource = `#version 300 es
precision highp float;

in vec2 a_position;

uniform vec2 u_pan;
uniform float u_zoom;
uniform vec2 u_resolution;

void main() {
    vec2 pos = (a_position + u_pan) * u_zoom;
    float aspect = u_resolution.x / u_resolution.y;
    pos.x /= aspect;
    gl_Position = vec4(pos, 0.0, 1.0);
}
`;

export const orbitFragmentShaderSource = `#version 300 es
precision highp float;

uniform vec4 u_color;

out vec4 fragColor;

void main() {
    fragColor = u_color;
}
`;

/**
 * Compile a shader from source
 */
export function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
 * Create and link a shader program
 */
export function createProgram(
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram | null {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

/**
 * Generate circle vertices for orbit rendering
 */
export function generateCircleVertices(radius: number, segments: number = 128): Float32Array {
  const vertices = new Float32Array(segments * 2);
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    vertices[i * 2] = Math.cos(angle) * radius;
    vertices[i * 2 + 1] = Math.sin(angle) * radius;
  }
  return vertices;
}
