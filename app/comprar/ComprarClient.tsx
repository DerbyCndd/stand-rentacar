"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useVehicles } from "@/lib/store";
import { VehicleCard } from "@/components/Cards";
import { FinanceSim } from "@/components/FinanceSim";
import { eur } from "@/lib/format";

const bodies = [
  ["", "Todos"],
  ["suv", "SUV / 4x4"],
  ["sedan", "Berlina"],
  ["hatch", "Citadino"],
  ["pickup", "Pick-up"],
] as const;

export function ComprarClient() {
  const sp = useSearchParams();
  const { list, ready } = useVehicles();
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState(sp.get("brand") ?? "");
  const [body, setBody] = useState(sp.get("body") ?? "");
  const [fuel, setFuel] = useState(sp.get("fuel") ?? "");
  const [gear, setGear] = useState("");
  const [max, setMax] = useState(Number(sp.get("max")) || 0);
  const [sort, setSort] = useState("rec");
  const [simPrice, setSimPrice] = useState(10000);

  const brands = useMemo(() => [...new Set(list.map((v) => v.brand))].sort(), [list]);
  const top = Math.max(...list.map((v) => v.price ?? 0), 5000);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    const r = list.filter(
      (v) =>
        (!s || `${v.brand} ${v.model}`.toLowerCase().includes(s)) &&
        (!brand || v.brand === brand) &&
        (!body || v.body === body) &&
        (!fuel || v.fuel === fuel) &&
        (!gear || v.gearbox === gear) &&
        (!max || (v.price !== null && v.price <= max)),
    );
    const order: Record<string, (a: (typeof r)[0], b: (typeof r)[0]) => number> = {
      rec: (a, b) => Number(b.featured) - Number(a.featured) || (b.year ?? 0) - (a.year ?? 0),
      pa: (a, b) => (a.price ?? 1e9) - (b.price ?? 1e9),
      pd: (a, b) => (b.price ?? 0) - (a.price ?? 0),
      yd: (a, b) => (b.year ?? 0) - (a.year ?? 0),
      ka: (a, b) => (a.km ?? 1e9) - (b.km ?? 1e9),
    };
    return [...r].sort((a, b) => Number(a.status === "vendido") - Number(b.status === "vendido") || order[sort](a, b));
  }, [list, q, brand, body, fuel, gear, max, sort]);

  const clear = () => { setQ(""); setBrand(""); setBody(""); setFuel(""); setGear(""); setMax(0); };

  return (
    <>
      <section className="dark" style={{ paddingBlock: "clamp(40px,6vw,72px)" }}>
        <div className="wrap">
          <p className="kicker">Stand</p>
          <h1 className="display" style={{ marginTop: 14, fontSize: "clamp(2.4rem,6vw,4.6rem)" }}>Viaturas à venda</h1>
          <p className="lead muted" style={{ marginTop: 14 }}>Todas inspecionadas, com documentação em dia e opção de financiamento.</p>
        </div>
      </section>

      <section className="section" style={{ paddingBlock: "var(--space-7) var(--space-8)" }}>
        <div className="wrap listing">
          <aside className="filters" aria-label="Filtros">
            <div className="field">
              <label htmlFor="q">Pesquisar</label>
              <input id="q" className="input" type="search" placeholder="Marca ou modelo" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="brand">Marca</label>
              <select id="brand" className="select" value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="">Todas</option>
                {brands.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <fieldset className="field" style={{ border: 0, margin: 0, padding: 0 }}>
              <legend>Carroçaria</legend>
              <div className="chips" style={{ marginTop: 6 }}>
                {bodies.map(([v, l]) => (
                  <button key={v} type="button" className="chip" aria-pressed={body === v} onClick={() => setBody(v)}>{l}</button>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="fuel">Combustível</label>
              <select id="fuel" className="select" value={fuel} onChange={(e) => setFuel(e.target.value)}>
                <option value="">Todos</option>
                <option>Gasolina</option><option>Diesel</option><option>Híbrido</option><option>Elétrico</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="gear">Caixa</label>
              <select id="gear" className="select" value={gear} onChange={(e) => setGear(e.target.value)}>
                <option value="">Todas</option><option>Manual</option><option>Automática</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="max">Preço máximo: {max ? eur(max) : "sem limite"}</label>
              <input id="max" className="range" type="range" min={0} max={top} step={1000} value={max || top} onChange={(e) => setMax(+e.target.value >= top ? 0 : +e.target.value)} />
            </div>
            <button type="button" className="btn btn-ghost on-paper btn-sm" onClick={clear}>Limpar filtros</button>
          </aside>

          <div>
            <div className="toolbar">
              <p role="status" aria-live="polite"><strong>{shown.length}</strong> {shown.length === 1 ? "viatura" : "viaturas"}</p>
              <div className="field" style={{ gridTemplateColumns: "auto 200px", alignItems: "center" }}>
                <label htmlFor="sort">Ordenar por</label>
                <select id="sort" className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="rec">Recomendadas</option>
                  <option value="pa">Preço: menor primeiro</option>
                  <option value="pd">Preço: maior primeiro</option>
                  <option value="yd">Mais recentes</option>
                  <option value="ka">Menos quilómetros</option>
                </select>
              </div>
            </div>
            {!ready ? null : shown.length ? (
              <div className="grid">{shown.map((v) => <VehicleCard key={v.id} v={v} />)}</div>
            ) : (
              <div className="empty">
                <h2 className="h3">Nenhuma viatura com estes filtros</h2>
                <p className="muted" style={{ margin: "8px 0 18px" }}>Experimente alargar o preço ou limpar os filtros.</p>
                <button type="button" className="btn btn-dark" onClick={clear}>Limpar filtros</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section dark-2" aria-labelledby="fin">
        <div className="wrap band">
          <div>
            <p className="kicker">Financiamento</p>
            <h2 id="fin" className="h2" style={{ marginTop: 12 }}>Quanto vai pagar por mês?</h2>
            <p className="lead muted" style={{ marginTop: 14 }}>Escolha um valor, a entrada e o prazo. Depois peça uma proposta sem compromisso.</p>
            <div className="field" style={{ marginTop: 22, maxWidth: 360 }}>
              <label htmlFor="simp">Preço da viatura (€)</label>
              <input id="simp" className="input" type="number" min={1000} step={500} value={simPrice} onChange={(e) => setSimPrice(Math.max(0, +e.target.value))} />
            </div>
          </div>
          <div className="panel" style={{ color: "var(--text)" }}>
            <FinanceSim price={simPrice} />
          </div>
        </div>
      </section>
    </>
  );
}
