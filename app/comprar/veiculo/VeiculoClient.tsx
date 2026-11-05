"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useVehicles } from "@/lib/store";
import { Gallery, ColorList } from "@/components/CarImage";
import { FinanceSim } from "@/components/FinanceSim";
import { LeadForm } from "@/components/LeadForm";
import { VehicleCard } from "@/components/Cards";
import { kmLabel, eur } from "@/lib/format";
import { wa } from "@/lib/site";

export function VeiculoClient() {
  const id = useSearchParams().get("id");
  const { list, ready } = useVehicles();
  const v = list.find((x) => x.id === id);

  if (!ready) return <div className="wrap section" aria-busy="true"><p className="muted">A carregar…</p></div>;
  if (!v)
    return (
      <div className="wrap section">
        <div className="empty">
          <h1 className="h2">Viatura não encontrada</h1>
          <p className="muted" style={{ margin: "10px 0 20px" }}>Pode já ter sido vendida ou o endereço está incorreto.</p>
          <Link prefetch={false} className="btn btn-dark" href="/comprar/">Ver todas as viaturas</Link>
        </div>
      </div>
    );

  const related = list.filter((x) => x.id !== v.id && x.status !== "vendido" && (x.body === v.body || x.brand === v.brand)).slice(0, 3);
  const msg = `Olá! Tenho interesse no ${v.brand} ${v.model}${v.year ? ` ${v.year}` : ""} (${eur(v.price)}).`;

  return (
    <div className="wrap section" style={{ paddingBlock: "var(--space-6) var(--space-8)" }}>
      <nav className="crumbs" aria-label="Localização">
        <Link prefetch={false} href="/">Início</Link> / <Link prefetch={false} href="/comprar/">Comprar</Link> / <span aria-current="page">{v.brand} {v.model}</span>
      </nav>

      <div className="detail">
        <div>
          <Gallery photos={v.photos} body={v.body} color={v.color} label={`${v.brand} ${v.model}`} />

          <div style={{ marginTop: 28 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <span className={`plate${v.isNew ? " is-new" : v.status !== "disponivel" ? " is-off" : ""}`}>
                {v.status === "vendido" ? "Vendido" : v.status === "reservado" ? "Reservado" : v.isNew ? "Novo" : "Usado"}
              </span>
              <span className="muted">{v.brand}</span>
            </div>
            <h1 className="h2" style={{ marginTop: 10 }}>{v.model}{v.year ? ` · ${v.year}` : ""}</h1>
            <p className="lead muted" style={{ marginTop: 12 }}>{v.description}</p>
            <ColorList colors={v.colors} />
          </div>

          <dl className="spec-table" style={{ marginTop: 28 }}>
            {[
              ["Ano", v.year ?? "A confirmar"], ["Quilometragem", kmLabel(v.km)], ["Combustível", v.fuel], ["Caixa", v.gearbox],
              ["Motor", v.engine], ["Potência", v.power], ["Lugares", v.seats],
            ].map(([k, val]) => (
              <div key={k as string}><dt>{k}</dt><dd>{val}</dd></div>
            ))}
          </dl>

          <div className="panel" style={{ marginTop: 28 }}>
            <h2 className="h3" style={{ marginBottom: 14 }}>Equipamento</h2>
            <ul className="ticks">{v.features.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </div>

        <aside className="sticky-side">
          <div className="panel">
            <p className="muted">Preço</p>
            <p className="price" style={{ fontSize: "2.4rem" }}>{eur(v.price)}</p>
            {v.status === "disponivel" ? (
              <a className="btn btn-wa" style={{ width: "100%", marginTop: 16 }} href={wa(msg)} target="_blank" rel="noopener noreferrer">Perguntar por WhatsApp</a>
            ) : (
              <p className="notice" style={{ marginTop: 14 }}>Esta viatura está {v.status}. Veja alternativas abaixo.</p>
            )}
          </div>
          <div className="panel">
            <h2 className="h3" style={{ marginBottom: 14 }}>Marcar visita / test drive</h2>
            <LeadForm kind="Visita" subject={`Quero marcar visita para ver o ${v.brand} ${v.model}${v.year ? ` ${v.year}` : ""}`} presetMessage="Quando posso ver a viatura?" cta="Pedir visita" />
          </div>
          <div className="panel"><FinanceSim price={v.price} /></div>
        </aside>
      </div>

      {related.length > 0 && (
        <section style={{ marginTop: 72 }} aria-labelledby="rel">
          <h2 id="rel" className="h2" style={{ marginBottom: 24 }}>Também pode gostar</h2>
          <div className="grid">{related.map((x) => <VehicleCard key={x.id} v={x} />)}</div>
        </section>
      )}
    </div>
  );
}
