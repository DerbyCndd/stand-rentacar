import Link from "next/link";
import type { RentalCar, Vehicle } from "@/lib/types";
import { CarImage } from "./CarImage";
import { kmLabel, eur } from "@/lib/format";

export function VehicleCard({ v }: { v: Vehicle }) {
  const off = v.status !== "disponivel";
  return (
    <Link prefetch={false} href={`/comprar/veiculo/?id=${v.id}`} className={`vcard${v.status === "vendido" ? " sold" : ""}`}>
      <div className="vcard-art">
        <span className={`plate${v.isNew ? " is-new" : off ? " is-off" : ""}`}>
          {v.status === "vendido" ? "Vendido" : v.status === "reservado" ? "Reservado" : v.isNew ? "Novo" : v.year ?? "Especial"}
        </span>
        <CarImage photo={v.photos?.[0]} label={`${v.brand} ${v.model}`} />
      </div>
      <div className="vcard-body">
        <div>
          <div className="brand">{v.brand}</div>
          <h3>{v.model}</h3>
        </div>
        <ul className="specs">
          <li>{v.year ?? "Ano a confirmar"}</li>
          <li>{kmLabel(v.km)}</li>
          <li>{v.fuel}</li>
          <li>{v.gearbox}</li>
        </ul>
        <div className="price-row">
          <span className="price">{eur(v.price)}</span>
          <span aria-hidden="true" className="muted">Ver →</span>
        </div>
      </div>
    </Link>
  );
}

export function RentalCard({ r, qs = "" }: { r: RentalCar; qs?: string }) {
  return (
    <Link prefetch={false} href={`/alugar/viatura/?id=${r.id}${qs}`} className={`vcard${r.available ? "" : " sold"}`}>
      <div className="vcard-art">
        <span className={`plate${r.available ? "" : " is-off"}`}>{r.available ? r.category : "Indisponível"}</span>
        <CarImage photo={r.photos?.[0]} label={`${r.brand} ${r.model}`} />
      </div>
      <div className="vcard-body">
        <div>
          <div className="brand">{r.brand}</div>
          <h3>{r.model}</h3>
        </div>
        <ul className="specs">
          <li>{r.seats} lugares</li>
          <li>{r.bags} malas</li>
          <li>{r.gearbox}</li>
          <li>{r.fuel}</li>
        </ul>
        <div className="price-row">
          <span className="price">
            {eur(r.pricePerDay)} <small>/ dia</small>
          </span>
          <span aria-hidden="true" className="muted">Reservar →</span>
        </div>
      </div>
    </Link>
  );
}
