"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useRentals } from "@/lib/store";
import { CarArt } from "@/components/CarArt";
import { LeadForm } from "@/components/LeadForm";
import { rentalExtras } from "@/lib/data";
import { kz } from "@/lib/format";
import { wa } from "@/lib/site";
import { addDays, daysBetween, useToday } from "@/lib/useToday";

const fmtDate = (s: string) => (s ? new Date(s + "T00:00") : new Date()).toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" });

export function ViaturaClient() {
  const sp = useSearchParams();
  const id = sp.get("id");
  const { list, ready } = useRentals();
  const r = list.find((x) => x.id === id);

  const today = useToday();
  const [fromPick, setFrom] = useState(sp.get("from") ?? "");
  const [toPick, setTo] = useState(sp.get("to") ?? "");
  const from = fromPick || today;
  const to = toPick || addDays(from, 3);
  const [extras, setExtras] = useState<string[]>([]);

  const days = daysBetween(from, to);
  const lines = useMemo(() => {
    if (!r) return { base: 0, items: [] as { label: string; value: number }[], total: 0 };
    const base = r.pricePerDay * days;
    const items = rentalExtras
      .filter((e) => extras.includes(e.id))
      .map((e) => ({ label: e.label, value: e.per === "dia" ? e.price * days : e.price }));
    return { base, items, total: base + items.reduce((s, i) => s + i.value, 0) };
  }, [r, days, extras]);

  if (!ready) return <div className="wrap section" aria-busy="true"><p className="muted">A carregar…</p></div>;
  if (!r)
    return (
      <div className="wrap section">
        <div className="empty">
          <h1 className="h2">Viatura não encontrada</h1>
          <Link prefetch={false} className="btn btn-dark" style={{ marginTop: 16 }} href="/alugar/">Ver a frota</Link>
        </div>
      </div>
    );

  const summary = [
    `Viatura: ${r.brand} ${r.model} ${r.year}`,
    `Período: ${fmtDate(from)} a ${fmtDate(to)} (${days} ${days === 1 ? "dia" : "dias"})`,
    lines.items.length ? `Extras: ${lines.items.map((i) => i.label).join(", ")}` : "",
    `Total estimado: ${kz(lines.total)}`,
  ].filter(Boolean).join("\n");

  return (
    <div className="wrap section" style={{ paddingBlock: "var(--space-6) var(--space-8)" }}>
      <nav className="crumbs" aria-label="Localização">
        <Link prefetch={false} href="/">Início</Link> / <Link prefetch={false} href="/alugar/">Alugar</Link> / <span aria-current="page">{r.brand} {r.model}</span>
      </nav>

      <div className="detail">
        <div>
          <div className="stage"><CarArt body={r.body} color={r.color} label={`${r.brand} ${r.model}`} /></div>
          <div style={{ marginTop: 28 }}>
            <span className={`plate${r.available ? "" : " is-off"}`}>{r.available ? r.category : "Indisponível de momento"}</span>
            <h1 className="h2" style={{ marginTop: 10 }}>{r.brand} {r.model}</h1>
            <p className="lead muted" style={{ marginTop: 10 }}>{kz(r.pricePerDay)} por dia</p>
          </div>
          <dl className="spec-table" style={{ marginTop: 24 }}>
            {[["Ano", r.year], ["Lugares", r.seats], ["Malas", r.bags], ["Caixa", r.gearbox], ["Combustível", r.fuel]].map(([k, v]) => (
              <div key={k as string}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <div className="panel" style={{ marginTop: 24 }}>
            <h2 className="h3" style={{ marginBottom: 14 }}>Incluído</h2>
            <ul className="ticks">{r.features.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </div>

        <aside className="sticky-side">
          <div className="panel">
            <h2 className="h3">Calcule o seu aluguer</h2>
            <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="from">Levantamento</label>
                  <input id="from" className="input" type="date" min={today} value={from} onChange={(e) => { setFrom(e.target.value); if (e.target.value > to) setTo(e.target.value); }} />
                </div>
                <div className="field">
                  <label htmlFor="to">Devolução</label>
                  <input id="to" className="input" type="date" min={from} value={to} onChange={(e) => setTo(e.target.value)} />
                </div>
              </div>
              <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="hint" style={{ marginBottom: 4 }}>Extras opcionais</legend>
                {rentalExtras.map((e) => (
                  <label key={e.id} className="check">
                    <input type="checkbox" checked={extras.includes(e.id)} onChange={() => setExtras((x) => (x.includes(e.id) ? x.filter((i) => i !== e.id) : [...x, e.id]))} />
                    <span style={{ flex: 1 }}>{e.label}</span>
                    <span className="muted">{kz(e.price)}/{e.per}</span>
                  </label>
                ))}
              </fieldset>
            </div>

            <div style={{ marginTop: 14 }} aria-live="polite">
              <div className="row"><span>{kz(r.pricePerDay)} × {days} {days === 1 ? "dia" : "dias"}</span><span>{kz(lines.base)}</span></div>
              {lines.items.map((i) => (<div className="row" key={i.label}><span>{i.label}</span><span>{kz(i.value)}</span></div>))}
              <div className="total"><span>Total estimado</span><strong>{kz(lines.total)}</strong></div>
            </div>
            <p className="hint">Estimativa sem caução. O valor final é confirmado por nós.</p>

            {r.available ? (
              <a className="btn btn-wa" style={{ width: "100%", marginTop: 14 }} href={wa(`Olá! Quero reservar.\n${summary}`)} target="_blank" rel="noopener noreferrer">Reservar por WhatsApp</a>
            ) : (
              <p className="notice" style={{ marginTop: 14 }}>Indisponível de momento. Veja outras viaturas da frota.</p>
            )}
          </div>

          {r.available && (
            <div className="panel">
              <h2 className="h3" style={{ marginBottom: 14 }}>Ou deixe os seus dados</h2>
              <LeadForm kind="Reserva" subject={`Pedido de reserva: ${r.brand} ${r.model}`} details={summary} showMessage={false} cta="Pedir reserva" />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
