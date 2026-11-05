import type { Body, ColorStock } from "@/lib/types";
import { CarArt } from "./CarArt";

/** Mostra a fotografia real da viatura; se não existir, a ilustração. */
export function CarImage({ photo, body, color, label }: { photo?: string; body: Body; color: string; label: string }) {
  if (photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={photo} alt={label} className="car-photo" loading="lazy" />;
  }
  return <CarArt body={body} color={color} label={label} />;
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
