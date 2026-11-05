"use client";
import { useState } from "react";
import type { ColorStock } from "@/lib/types";
import { asset } from "@/lib/asset";

/** Mostra a fotografia real da viatura; se não existir, um espaço reservado. */
export function CarImage({ photo, label }: { photo?: string; label: string }) {
  if (photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={asset(photo)} alt={label} className="car-photo" loading="lazy" decoding="async" />;
  }
  return <div className="photo-soon" role="img" aria-label={`${label}: fotografia em breve`}>Foto em breve</div>;
}

/** Foto principal com miniaturas. Sem fotografias, mostra um espaço reservado. */
export function Gallery({ photos, label }: { photos?: string[]; label: string }) {
  const [i, setI] = useState(0);
  const list = photos ?? [];
  if (list.length === 0) return <div className="stage"><div className="photo-soon" role="img" aria-label={`${label}: fotografia em breve`}>Foto em breve</div></div>;
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
