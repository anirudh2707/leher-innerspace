// Path generation and blending utilities for the TangledHead animation

// Richer tangle: more loops, varied radius, organic feel
export function generateTangledPath(seed: number, cx: number, cy: number, radius: number): string {
  const points: [number, number][] = [];
  const steps = 120;
  let angle = seed * 1.7;
  for (let i = 0; i < steps; i++) {
    // More chaotic angle changes
    angle += 0.25 + Math.sin(seed * 1.3 + i * 0.18) * 0.55 + Math.cos(seed * 0.7 + i * 0.09) * 0.2;
    const rVariation = 0.25 + 0.75 * Math.abs(Math.sin(seed * 2.3 + i * 0.12)) * Math.abs(Math.cos(seed * 0.8 + i * 0.07));
    const r = radius * rVariation;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r * 0.65; // slightly flatter
    points.push([x, y]);
  }

  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const cpx = (points[i][0] + points[i + 1][0]) / 2;
    const cpy = (points[i][1] + points[i + 1][1]) / 2;
    d += ` Q ${points[i][0]} ${points[i][1]} ${cpx} ${cpy}`;
  }
  return d;
}

// Elegant wave: varied amplitude and frequency per line
export function generateWavePath(seed: number, cx: number, cy: number, width: number): string {
  const startX = cx - width / 2;
  const spacing = 7;
  const y = cy + (seed - 5.5) * spacing;
  const amp = 5 + Math.sin(seed * 1.7) * 3 + Math.cos(seed * 0.4) * 2;
  const freq = 0.012 + Math.sin(seed * 0.9) * 0.004;
  const phase = seed * 1.4;

  let d = `M ${startX} ${y}`;
  for (let x = 1; x <= 80; x++) {
    const t = x / 80;
    const px = startX + t * width;
    // Envelope: lines taper at edges
    const envelope = Math.sin(t * Math.PI);
    const py = y + Math.sin(px * freq + phase) * amp * (0.3 + 0.7 * envelope);
    d += ` L ${px} ${py}`;
  }
  return d;
}

// Converging lines: tight parallel subtle waves for the final text-formation phase
export function generateConvergedPoints(
  seed: number,
  cx: number,
  cy: number,
  width: number,
  lineIndex: number,
  totalLines: number,
  numPoints: number
): [number, number][] {
  const startX = cx - width / 2;
  const spacing = 3.5;
  const totalHeight = (totalLines - 1) * spacing;
  const y = cy - totalHeight / 2 + lineIndex * spacing;
  const amp = 1.2 + Math.sin(seed * 0.7) * 0.6;
  const freq = 0.018;
  const phase = seed * 0.9;

  const points: [number, number][] = [];
  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const px = startX + t * width;
    const py = y + Math.sin(px * freq + phase) * amp;
    points.push([px, py]);
  }
  return points;
}

export function resampleToPoints(pathStr: string, numPoints: number): [number, number][] {
  const nums = pathStr.match(/-?\d+\.?\d*/g)?.map(Number) || [];
  const rawPoints: [number, number][] = [];
  for (let i = 0; i < nums.length - 1; i += 2) {
    rawPoints.push([nums[i], nums[i + 1]]);
  }
  if (rawPoints.length < 2) return rawPoints;

  let totalLen = 0;
  const segLens: number[] = [0];
  for (let i = 1; i < rawPoints.length; i++) {
    const dx = rawPoints[i][0] - rawPoints[i - 1][0];
    const dy = rawPoints[i][1] - rawPoints[i - 1][1];
    totalLen += Math.sqrt(dx * dx + dy * dy);
    segLens.push(totalLen);
  }

  const resampled: [number, number][] = [];
  for (let i = 0; i < numPoints; i++) {
    const targetLen = (i / (numPoints - 1)) * totalLen;
    let segIdx = 1;
    while (segIdx < segLens.length - 1 && segLens[segIdx] < targetLen) segIdx++;
    const segStart = segLens[segIdx - 1];
    const segEnd = segLens[segIdx];
    const localT = segEnd > segStart ? (targetLen - segStart) / (segEnd - segStart) : 0;
    const x = rawPoints[segIdx - 1][0] + (rawPoints[segIdx][0] - rawPoints[segIdx - 1][0]) * localT;
    const y = rawPoints[segIdx - 1][1] + (rawPoints[segIdx][1] - rawPoints[segIdx - 1][1]) * localT;
    resampled.push([x, y]);
  }
  return resampled;
}

export function pointsToSmoothPath(points: [number, number][]): string {
  if (points.length < 2) return '';
  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const cpx = (points[i][0] + points[i + 1][0]) / 2;
    const cpy = (points[i][1] + points[i + 1][1]) / 2;
    d += ` Q ${points[i][0].toFixed(1)} ${points[i][1].toFixed(1)} ${cpx.toFixed(1)} ${cpy.toFixed(1)}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}

export function blendPoints(a: [number, number][], b: [number, number][], t: number): [number, number][] {
  const len = Math.min(a.length, b.length);
  return Array.from({ length: len }, (_, i) => [
    a[i][0] + (b[i][0] - a[i][0]) * t,
    a[i][1] + (b[i][1] - a[i][1]) * t,
  ] as [number, number]);
}

// Smoother cubic ease
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
