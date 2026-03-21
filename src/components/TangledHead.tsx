import { useEffect, useRef, useState, useMemo } from "react";
import {
  generateTangledPath,
  generateWavePath,
  generateConvergedPoints,
  resampleToPoints,
  pointsToSmoothPath,
  blendPoints,
  easeInOutCubic,
} from "./tangled-head/path-utils";

const NUM_LINES = 10;
const NUM_SAMPLE_POINTS = 80;
const VIEW_W = 420;
const VIEW_H = 520;
const HEAD_CX = 210;
const HEAD_CY = 370;
const HEAD_R = 48;
const TANGLE_CY = 185;
const TANGLE_R = 130;

// Rich teal palette — each line has a unique hue shift
const LINE_COLORS = [
  { h: 174, s: 42, l: 38 },
  { h: 176, s: 38, l: 48 },
  { h: 180, s: 40, l: 45 },
  { h: 185, s: 45, l: 52 },
  { h: 190, s: 48, l: 56 },
  { h: 195, s: 50, l: 58 },
  { h: 170, s: 35, l: 50 },
  { h: 178, s: 44, l: 55 },
  { h: 192, s: 52, l: 62 },
  { h: 174, s: 50, l: 60 },
];

export default function TangledHead({ scrollProgress }: { scrollProgress: number }) {
  const [tangledPts, setTangledPts] = useState<[number, number][][]>([]);
  const [wavePts, setWavePts] = useState<[number, number][][]>([]);
  const [convergedPts, setConvergedPts] = useState<[number, number][][]>([]);
  const rafRef = useRef<number>(0);
  const [time, setTime] = useState(0);

  // Pre-compute all three morph states
  useEffect(() => {
    const t: [number, number][][] = [];
    const w: [number, number][][] = [];
    const c: [number, number][][] = [];

    for (let i = 0; i < NUM_LINES; i++) {
      const tp = generateTangledPath(i + 1, HEAD_CX, TANGLE_CY, TANGLE_R);
      const wp = generateWavePath(i + 1, HEAD_CX, TANGLE_CY, 340);
      t.push(resampleToPoints(tp, NUM_SAMPLE_POINTS));
      w.push(resampleToPoints(wp, NUM_SAMPLE_POINTS));
      c.push(generateConvergedPoints(i + 1, HEAD_CX, TANGLE_CY, 360, i, NUM_LINES, NUM_SAMPLE_POINTS));
    }
    setTangledPts(t);
    setWavePts(w);
    setConvergedPts(c);
  }, []);

  // Gentle breathing animation — slow, calming
  useEffect(() => {
    let running = true;
    const animate = () => {
      if (!running) return;
      setTime(Date.now() * 0.001);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, []);

  const t = Math.max(0, Math.min(1, scrollProgress));

  // Phases (smooth cubic easing):
  // 0.00–0.50 : chaos → calm waves
  // 0.50–0.85 : waves → tight converged lines
  // 0.85–1.00 : text "Leher Inner Space" reveals
  const phase1 = t <= 0.5 ? easeInOutCubic(t / 0.5) : 1;
  const phase2 = t <= 0.5 ? 0 : t <= 0.85 ? easeInOutCubic((t - 0.5) / 0.35) : 1;
  const textReveal = t <= 0.85 ? 0 : easeInOutCubic((t - 0.85) / 0.15);

  // Build paths
  const paths = useMemo(() => {
    return tangledPts.map((tp, i) => {
      if (!wavePts[i] || !convergedPts[i]) return '';
      const waveBlend = blendPoints(tp, wavePts[i], phase1);
      const finalBlend = blendPoints(waveBlend, convergedPts[i], phase2);

      // Gentle breathing wobble — slower, subtler, fades as lines tighten
      const breathStrength = Math.max(0, 1 - phase1 * 0.3 - phase2 * 0.6);
      const wobbled = finalBlend.map(([x, y], j) => {
        const amp = 1.8 * breathStrength;
        const wx = x + Math.sin(time * 0.8 + j * 0.25 + i * 0.9) * amp;
        const wy = y + Math.cos(time * 0.6 + j * 0.15 + i * 1.3) * amp * 0.7;
        return [wx, wy] as [number, number];
      });
      return pointsToSmoothPath(wobbled);
    });
  }, [tangledPts, wavePts, convergedPts, phase1, phase2, time]);

  // Face expression
  const mouthCurve = -4 + phase1 * 10;
  const eyeOpenness = 2.5 + phase1 * 1.5;
  const headOpacity = Math.max(0.08, 0.55 - phase2 * 0.25 - textReveal * 0.2);
  const connectorOpacity = Math.max(0, 0.35 - phase2 * 0.25 - textReveal * 0.1);

  // Line visual properties shift with phase
  const glowIntensity = 2 + phase1 * 2 + phase2 * 1;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="w-full h-full"
      style={{
        filter: `drop-shadow(0 0 ${14 + phase1 * 16}px hsl(174 50% 65% / ${0.1 + phase1 * 0.15}))`,
      }}
    >
      <defs>
        {LINE_COLORS.map((c, i) => (
          <linearGradient key={`lg-${i}`} id={`lg-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`hsl(${c.h}, ${c.s}%, ${c.l}%)`} stopOpacity={0.15 + phase1 * 0.25} />
            <stop offset="30%" stopColor={`hsl(${c.h}, ${c.s + 5}%, ${c.l + 5}%)`} stopOpacity={0.6 + phase1 * 0.25} />
            <stop offset="70%" stopColor={`hsl(${c.h + 4}, ${c.s + 5}%, ${c.l + 5}%)`} stopOpacity={0.6 + phase1 * 0.25} />
            <stop offset="100%" stopColor={`hsl(${c.h}, ${c.s}%, ${c.l}%)`} stopOpacity={0.15 + phase1 * 0.25} />
          </linearGradient>
        ))}
        <filter id="lg-soft">
          <feGaussianBlur stdDeviation={glowIntensity} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="text-reveal-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Neck / connector */}
      <line
        x1={HEAD_CX} y1={HEAD_CY - HEAD_R - 4}
        x2={HEAD_CX} y2={TANGLE_CY + 65}
        stroke="hsl(174, 42%, 41%)"
        strokeWidth="1.2"
        opacity={connectorOpacity}
      />

      {/* The lines — the soul of the animation */}
      {paths.map((d, i) => {
        if (!d) return null;
        const c = LINE_COLORS[i];
        const thickness = 1.2 + (i % 3) * 0.3; // varied thickness
        const lineOp = 1 - textReveal * 0.35;
        return (
          <g key={i} opacity={lineOp}>
            {/* Soft glow layer */}
            <path
              d={d}
              fill="none"
              stroke={`hsl(${c.h}, ${c.s}%, ${c.l + 15}%)`}
              strokeWidth={thickness + 2.5 - phase2 * 1}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#lg-soft)"
              opacity={0.25 + phase1 * 0.1}
            />
            {/* Main line */}
            <path
              d={d}
              fill="none"
              stroke={`url(#lg-${i})`}
              strokeWidth={thickness + phase1 * 0.2 - phase2 * 0.3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* Text reveal — emerges from the converged lines */}
      {textReveal > 0 && (
        <g
          opacity={textReveal}
          filter={textReveal < 0.8 ? "url(#text-reveal-glow)" : undefined}
        >
          <text
            x={HEAD_CX} y={TANGLE_CY - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontStyle="italic" fontWeight="500" fontSize="40"
            fill="hsl(174, 42%, 38%)"
            opacity={Math.min(1, textReveal * 1.3)}
          >
            Leher
          </text>
          <text
            x={HEAD_CX} y={TANGLE_CY + 26}
            textAnchor="middle" dominantBaseline="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontStyle="italic" fontWeight="400" fontSize="16"
            letterSpacing="4" fill="hsl(174, 35%, 52%)"
            opacity={Math.min(1, Math.max(0, (textReveal - 0.2) * 1.5))}
          >
            Inner Space
          </text>
        </g>
      )}

      {/* Head */}
      <ellipse
        cx={HEAD_CX} cy={HEAD_CY}
        rx={HEAD_R} ry={HEAD_R * 1.12}
        fill="none" stroke="hsl(174, 38%, 44%)"
        strokeWidth="1.3" opacity={headOpacity}
      />
      <ellipse cx={HEAD_CX - 14} cy={HEAD_CY - 7} rx="2.5" ry={eyeOpenness}
        fill="hsl(200, 12%, 35%)" opacity={headOpacity * 0.8} />
      <ellipse cx={HEAD_CX + 14} cy={HEAD_CY - 7} rx="2.5" ry={eyeOpenness}
        fill="hsl(200, 12%, 35%)" opacity={headOpacity * 0.8} />
      <path
        d={`M ${HEAD_CX - 11} ${HEAD_CY + 14} Q ${HEAD_CX} ${HEAD_CY + 14 + mouthCurve} ${HEAD_CX + 11} ${HEAD_CY + 14}`}
        fill="none" stroke="hsl(200, 12%, 35%)"
        strokeWidth="1.1" strokeLinecap="round" opacity={headOpacity * 0.8}
      />
    </svg>
  );
}
