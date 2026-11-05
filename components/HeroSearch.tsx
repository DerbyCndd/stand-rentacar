"use client";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { seedVehicles } from "@/lib/data";
import { addDays, useToday } from "@/lib/useToday";

const brands = [...new Set(seedVehicles.map((v) => v.brand))].sort();
const cats = ["Económico", "Compacto", "SUV", "Executivo", "Pickup", "Minibus"];
export function HeroSearch() {
  const router = useRouter();
  const id = useId();
  const [tab, setTab] = useState<"comprar" | "alugar">("comprar");
  const today = useToday();
  const [brand, setBrand] = useState("");
  const [body, setBody] = useState("");
  const [max, setMax] = useState("");
  const [fuel, setFuel] = useState("");
  const [fromPick, setFrom] = useState("");
  const [toPick, setTo] = useState("");
  const from = fromPick || today;
  const to = toPick || addDays(from, 3);
  const [cat, setCat] = useState("");

  const go = () => {
    if (tab === "comprar") {
      const p = new URLSearchParams();
      if (brand) p.set("brand", brand);
      if (body) p.set("body", body);
      if (max) p.set("max", max);
      if (fuel) p.set("fuel", fuel);
      router.push(`/comprar/?${p}`);
    } else {
      const p = new URLSearchParams({ from, to });
      if (cat) p.set("cat", cat);
      router.push(`/alugar/?${p}`);
    }
  };

  return (
    <section className="finder" aria-label="Pesquisa rápida">
      <div className="tabs" role="tablist" aria-label="O que procura?">
        {(["comprar", "alugar"] as const).map((t) => (
          <button key={t} role="tab" id={`${id}-${t}`} aria-selected={tab === t} aria-controls={`${id}-panel`} className="tab" onClick={() => setTab(t)}>
            {t === "comprar" ? "Comprar viatura" : "Alugar viatura"}
          </button>
        ))}
      </div>
      <form
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${tab}`}
        className="finder-body"
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
      >
        {tab === "comprar" ? (
          <>
            <div className="field">
              <label htmlFor={`${id}b`}>Marca</label>
              <select id={`${id}b`} className="select" value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="">Todas</option>
                {brands.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor={`${id}t`}>Tipo</label>
              <select id={`${id}t`} className="select" value={body} onChange={(e) => setBody(e.target.value)}>
                <option value="">Todos</option>
                <option value="suv">SUV / 4x4</option>
                <option value="sedan">Berlina</option>
                <option value="hatch">Citadino</option>
                <option value="pickup">Pick-up</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor={`${id}f`}>Combustível</label>
              <select id={`${id}f`} className="select" value={fuel} onChange={(e) => setFuel(e.target.value)}>
                <option value="">Todos</option>
                <option>Gasolina</option>
                <option>Diesel</option>
                <option>Híbrido</option>
                <option>Elétrico</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor={`${id}p`}>Preço máximo</label>
              <select id={`${id}p`} className="select" value={max} onChange={(e) => setMax(e.target.value)}>
                <option value="">Sem limite</option>
                <option value="10000">até 10 000 €</option>
                <option value="20000">até 20 000 €</option>
                <option value="30000">até 30 000 €</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="field">
              <label htmlFor={`${id}fr`}>Levantamento</label>
              <input id={`${id}fr`} className="input" type="date" min={today} value={from} onChange={(e) => { setFrom(e.target.value); if (e.target.value > to) setTo(e.target.value); }} />
            </div>
            <div className="field">
              <label htmlFor={`${id}to`}>Devolução</label>
              <input id={`${id}to`} className="input" type="date" min={from} value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor={`${id}c`}>Categoria</label>
              <select id={`${id}c`} className="select" value={cat} onChange={(e) => setCat(e.target.value)}>
                <option value="">Todas</option>
                {cats.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="field" aria-hidden="true" />
          </>
        )}
        <button type="submit" className="btn btn-primary">Pesquisar</button>
      </form>
    </section>
  );
}
