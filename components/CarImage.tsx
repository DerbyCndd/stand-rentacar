"use client";
import { useState } from "react";
import type { Body, ColorStock } from "@/lib/types";
import { CarArt } from "./CarArt";

/** Caminhos que começam por "/" (pasta public) precisam do prefixo do GitHub Pages. */
const asset = (src: string) => (src.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}` : src);

/** Mostra a fotografia real da viatura; se não existir, a ilustração. */
export function CarImage({ photo, body, color, label }: { photo?: string; body: Body; color: string; label: string }) {
  if (photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={asset(photo)} alt={label} className="car-photo" loading="lazy" decoding="async" />;
  }
  return <CarArt body={body} color={color} label={label} />;
}

/** Foto principal com miniaturas. Sem fotografias, mostra a ilustração. */
export function Gallery({ photos, body, color, label }: { photos?: string[]; body: Body; color: string; label: string }) {
  const [i, setI] = useState(0);
  const list = photos ?? [];
  if (list.length === 0) return <div className="stage"><CarArt body={body} color={color} label={label} /></div>;
  const cur = Math.min(i, list.length - 1);
  return (
    <div>
      <div className="stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(list[cur])} alt={`${label} – foto ${cur + 1} de ${list.length}`} className="car-photo" />
      </div>
      {list.length > 1 && (
        <ul className="thumbs" aria-label="Fotografias">
          {list.map((p, n) => (
            <li key={p.slice(-40) + n}>
              <button type="button" aria-label={`Ver foto ${n + 1}`} aria-current={n === cur} onClick={() => setI(n)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(p)} alt="" loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Lista de cores com unidades em stock. */
export function ColorList({ colors, unit = "em stock" }: { colors?: ColorStock[]; unit?: string }) {
  if (!colors || colors.length === 0) return null;
  return (
    <ul className="color-list" aria-label="Cores">
      {colors.map((c, i) => (
        <li key={`${c.name}${i}`} className={c.qty > 0 ? "" : "out"}>
          <span className="dot" style={{ background: c.hex }} aria-hidden="true" />
          {c.name || c.hex} · {c.qty > 0 ? `${c.qty} ${unit}` : "Esgotada"}
        </li>
      ))}
    </ul>
  );
}
