"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRentals } from "@/lib/store";
import { RentalCard } from "@/components/Cards";
import { addDays, daysBetween, useToday } from "@/lib/useToday";

const CATS = ["Económico", "Compacto", "SUV", "Executivo", "Pickup", "Minibus"];

export function AlugarClient() {
  const sp = useSearchParams();
  const { list, ready } = useRentals();
  const today = useToday();
  const [fromPick, setFrom] = useState(sp.get("from") ?? "");
  const [toPick, setTo] = useState(sp.get("to") ?? "");
  const from = fromPick || today;
  const to = toPick || addDays(from, 3);
  const [cat, setCat] = useState(sp.get("cat") ?? "");
  const [gear, setGear] = useState("");
  const [onlyFree, setOnlyFree] = useState(false);

  const days = daysBetween(from, to);
  const shown = useMemo(
    () =>
      list
        .filter((r) => (!cat || r.category === cat) && (!gear || r.gearbox === gear) && (!onlyFree || r.available))
        .sort((a, b) => Number(b.available) - Number(a.available) || a.pricePerDay - b.pricePerDay),
    [list, cat, gear, onlyFree],
  );
  const qs = `&from=${from}&to=${to}`;

  return (
    <>
      <section className="dark" style={{ paddingBlock: "clamp(40px,6vw,72px)" }}>
        <div className="wrap">
          <p className="kicker">Rent a Car</p>
          <h1 className="display" style={{ marginTop: 14, fontSize: "clamp(2.4rem,6vw,4.6rem)" }}>Alugue a sua viatura</h1>
          <p className="lead muted" style={{ marginTop: 14 }}>Preço por dia, extras opcionais e confirmação rápida por WhatsApp. Com ou sem motorista.</p>
        </div>
      </section>

      <div className="wrap">
        <form className="finder" style={{ marginTop: -36 }} onSubmit={(e) => e.preventDefault()} aria-label="Datas do aluguer">
          <div className="finder-body" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}>
            <div className="field">
              <label htmlFor="from">Levantamento</label>
              <input id="from" className="input" type="date" min={today} value={from} onChange={(e) => { setFrom(e.target.value); if (e.target.value > to) setTo(e.target.value); }} />
            </div>
            <div className="field">
              <label htmlFor="to">Devolução</label>
              <input id="to" className="input" type="date" min={from} value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="gear">Caixa</label>
              <select id="gear" className="select" value={gear} onChange={(e) => setGear(e.target.value)}>
                <option value="">Todas</option><option>Manual</option><option>Automática</option>
              </select>
            </div>
            <label className="check">
              <input type="checkbox" checked={onlyFree} onChange={(e) => setOnlyFree(e.target.checked)} /> Só disponíveis
            </label>
            <p role="status" aria-live="polite"><strong>{days}</strong> {days === 1 ? "dia" : "dias"} de aluguer</p>
          </div>
        </form>
      </div>

      <section className="section" style={{ paddingBlock: "var(--space-7) var(--space-8)" }}>
        <div className="wrap">
          <div className="toolbar">
            <div className="chips" role="group" aria-label="Categoria">
              <button type="button" className="chip" aria-pressed={!cat} onClick={() => setCat("")}>Todas</button>
              {CATS.map((c) => (
                <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(cat === c ? "" : c)}>{c}</button>
              ))}
            </div>
            <p role="status" aria-live="polite"><strong>{shown.length}</strong> viaturas</p>
          </div>
          {!ready ? null : shown.length ? (
            <div className="grid">{shown.map((r) => <RentalCard key={r.id} r={r} qs={qs} />)}</div>
          ) : (
            <div className="empty">
              <h2 className="h3">Sem viaturas nesta categoria</h2>
              <button type="button" className="btn btn-dark" style={{ marginTop: 14 }} onClick={() => { setCat(""); setGear(""); setOnlyFree(false); }}>Ver toda a frota</button>
            </div>
          )}

          <div className="panel" style={{ marginTop: 56 }}>
            <h2 className="h3">Condições principais</h2>
            <ul className="ticks" style={{ marginTop: 14 }}>
              <li>Carta de condução válida há mais de 2 anos</li>
              <li>Bilhete de identidade ou passaporte</li>
              <li>Caução reembolsável na devolução</li>
              <li>Quilometragem diária incluída (consulte limites)</li>
              <li>Combustível: devolver com o mesmo nível</li>
              <li>Assistência em viagem por WhatsApp</li>
            </ul>
            <p className="hint" style={{ marginTop: 12 }}>Valores e condições de exemplo. Ajuste-os em <code>lib/data.ts</code> e no painel de gestão.</p>
          </div>
        </div>
      </section>
    </>
  );
}
