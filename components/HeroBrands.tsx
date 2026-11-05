"use client";
import Link from "next/link";
import { useMemo } from "react";
import { asset } from "@/lib/asset";
import { useVehicles } from "@/lib/store";

/** Logótipos (Simple Icons, CC0) guardados em public/brands. */
const LOGOS: Record<string, string> = {
  bmw: "bmw",
  "mercedes-benz": "mercedes",
  volkswagen: "volkswagen",
  audi: "audi",
  fiat: "fiat",
  mini: "mini",
  smart: "smart",
};

/** Marcas com viaturas à venda (calculadas a partir do stock). */
export function HeroBrands() {
  const { list, ready } = useVehicles();
  const brands = useMemo(() => {
    const count = new Map<string, number>();
    for (const v of list) if (v.status !== "vendido") count.set(v.brand, (count.get(v.brand) ?? 0) + 1);
    return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [list]);

  if (!ready || brands.length === 0) return null;
  return (
    <div className="hero-brands">
      <p className="kicker">Marcas disponíveis</p>
      <ul>
        {brands.map(([brand, n]) => {
          const logo = LOGOS[brand.toLowerCase()];
          return (
            <li key={brand}>
              <Link prefetch={false} href={`/comprar/?brand=${encodeURIComponent(brand)}`} aria-label={`${brand}: ${n} ${n === 1 ? "viatura" : "viaturas"} à venda`}>
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={asset(`/brands/${logo}.svg`)} alt="" width={40} height={40} />
                ) : null}
                <span>{brand}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
