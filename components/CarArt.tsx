import { useId } from "react";
import type { Body } from "@/lib/types";

/** Ilustração vetorial de viaturas (sem fotos de terceiros). Cor e carroçaria configuráveis. */
const SHAPES: Record<Body, { body: string; glass: string; wheels: [number, number]; extra?: string; sy: number }> = {
  sedan: {
    sy: 1.4,
    body: "M18 118 L22 104 Q26 96 40 94 L108 88 Q134 58 176 54 L252 54 Q288 58 306 86 L362 94 Q384 98 386 112 L386 124 Q386 130 380 130 L20 130 Q14 130 14 124 Z",
    glass: "M122 86 Q142 64 178 62 L206 62 L206 88 Z M214 62 L250 62 Q274 66 290 88 L214 88 Z",
    wheels: [98, 304],
  },
  suv: {
    sy: 1.5,
    body: "M16 120 L18 100 Q22 90 38 88 L92 84 Q104 56 140 50 L282 50 Q312 54 322 84 L364 90 Q386 94 387 112 L388 124 Q388 130 382 130 L20 130 Q14 130 14 124 Z",
    glass: "M110 82 Q122 62 146 58 L200 58 L200 84 Z M208 58 L280 58 Q302 62 312 84 L208 84 Z",
    wheels: [100, 306],
    extra: "M120 48 L290 48",
  },
  hatch: {
    sy: 1.5,
    body: "M26 120 L28 102 Q32 94 44 92 L100 88 Q120 56 160 52 L262 52 Q292 54 304 70 L322 96 L360 100 Q380 104 380 116 L380 124 Q380 130 374 130 L30 130 Q24 130 24 124 Z",
    glass: "M114 86 Q130 62 164 60 L200 60 L200 86 Z M208 60 L260 60 Q282 62 292 76 L304 88 L208 88 Z",
    wheels: [96, 300],
  },
  pickup: {
    sy: 1.5,
    body: "M14 122 L16 100 Q20 92 34 90 L84 86 Q100 56 130 54 L206 54 Q226 56 236 84 L240 88 L384 88 Q390 88 390 96 L390 124 Q390 130 384 130 L18 130 Q12 130 12 124 Z",
    glass: "M104 84 Q114 64 134 62 L168 62 L168 86 Z M176 62 L204 62 Q218 64 226 86 L176 86 Z",
    wheels: [92, 318],
    extra: "M246 100 L384 100",
  },
  van: {
    sy: 1.35,
    body: "M14 122 L14 70 Q14 54 30 52 L290 50 Q316 52 328 80 L372 92 Q390 96 390 112 L390 124 Q390 130 384 130 L18 130 Q12 130 12 124 Z",
    glass: "M30 66 L90 66 L90 90 L30 90 Z M98 66 L158 66 L158 90 L98 90 Z M166 66 L226 66 L226 90 L166 90 Z M234 62 L286 62 Q304 66 314 88 L234 88 Z",
    wheels: [92, 312],
  },
};

export function CarArt({
  body,
  color,
  className,
  label,
}: {
  body: Body;
  color: string;
  className?: string;
  label?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const s = SHAPES[body] ?? SHAPES.sedan;
  return (
    <svg
      viewBox="0 0 400 168"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`sh${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".34" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".32" />
        </linearGradient>
        <linearGradient id={`gl${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#25394a" />
          <stop offset="1" stopColor="#0b141c" />
        </linearGradient>
        <clipPath id={`cl${id}`}>
          <path d={s.body} />
        </clipPath>
      </defs>
      <ellipse cx="200" cy="152" rx="176" ry="9" fill="#000" opacity=".28" />
      {/* carroçaria esticada na vertical para proporções realistas */}
      <g transform={`translate(0 130) scale(1 ${s.sy}) translate(0 -130)`}>
        <path d={s.body} fill={color} />
        <g clipPath={`url(#cl${id})`}>
          <rect width="400" height="168" fill={`url(#sh${id})`} />
          <path d="M14 112 L386 112" stroke="#000" strokeOpacity=".18" strokeWidth="1.4" />
        </g>
        <path d={s.glass} fill={`url(#gl${id})`} />
        <path d={s.glass} fill="none" stroke="#000" strokeOpacity=".35" strokeWidth="1" />
        {s.extra && <path d={s.extra} stroke="#000" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" />}
        {/* faróis */}
        <rect x="372" y="102" width="14" height="6" rx="3" fill="#fff6c9" />
        <rect x="14" y="102" width="10" height="6" rx="3" fill="#e5484d" />
      </g>
      {/* rodas */}
      {s.wheels.map((x) => (
        <g key={x}>
          <circle cx={x} cy="128" r="29" fill="#0c0d0e" />
          <circle cx={x} cy="128" r="17" fill="#c9ccd0" />
          <circle cx={x} cy="128" r="7" fill="#6b7078" />
          {[0, 72, 144, 216, 288].map((a) => (
            <line
              key={a}
              x1={x}
              y1="128"
              x2={x + 15 * Math.cos((a * Math.PI) / 180)}
              y2={128 + 15 * Math.sin((a * Math.PI) / 180)}
              stroke="#6b7078"
              strokeWidth="3"
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
