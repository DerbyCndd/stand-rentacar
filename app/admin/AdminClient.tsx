"use client";
import { useState } from "react";
import { useAdminSession, useLeads, useRentals, useVehicles } from "@/lib/store";
import { site } from "@/lib/site";
import { kz, uid } from "@/lib/format";
import type { Body, Fuel, Gearbox, RentalCar, RentCategory, Vehicle } from "@/lib/types";

const BODIES: [Body, string][] = [["sedan", "Berlina"], ["suv", "SUV / 4x4"], ["hatch", "Citadino"], ["pickup", "Pick-up"], ["van", "Carrinha / Minibus"]];
const FUELS: Fuel[] = ["Gasolina", "Diesel", "Híbrido", "Elétrico"];
const GEARS: Gearbox[] = ["Manual", "Automática"];
const CATS: RentCategory[] = ["Económico", "Compacto", "SUV", "Executivo", "Pickup", "Minibus"];

const blankVehicle = (): Vehicle => ({ id: "", brand: "", model: "", year: new Date().getFullYear(), km: 0, price: 0, fuel: "Gasolina", gearbox: "Automática", body: "sedan", color: "#2f3a33", seats: 5, engine: "", power: "", features: [], description: "", status: "disponivel", featured: false, isNew: false });
const blankRental = (): RentalCar => ({ id: "", brand: "", model: "", year: new Date().getFullYear(), category: "Compacto", pricePerDay: 0, fuel: "Gasolina", gearbox: "Automática", body: "sedan", color: "#2f3a33", seats: 5, bags: 2, features: [], available: true });

export function AdminClient() {
  const { state, login, logout } = useAdminSession();
  const [pw, setPw] = useState("");
  const [bad, setBad] = useState(false);
  const [tab, setTab] = useState<"leads" | "vehicles" | "rentals">("leads");

  if (state === "unknown") return null;

  if (state === "out")
    return (
      <div className="wrap section" style={{ maxWidth: 520 }}>
        <p className="kicker">Área de gestão</p>
        <h1 className="h2" style={{ margin: "12px 0 20px" }}>Entrar</h1>
        <form
          className="panel"
          onSubmit={(e) => {
            e.preventDefault();
            if (pw === site.adminPassword) login();
            else setBad(true);
          }}
          style={{ display: "grid", gap: 14 }}
        >
          <div className="field">
            <label htmlFor="pw">Palavra-passe</label>
            <input id="pw" className="input" type="password" autoComplete="current-password" value={pw} onChange={(e) => { setPw(e.target.value); setBad(false); }} aria-invalid={bad} aria-describedby="pwh" />
            {bad && <span className="err" role="alert">Palavra-passe incorreta.</span>}
          </div>
          <button className="btn btn-dark" type="submit">Entrar</button>
          <p id="pwh" className="hint">Demonstração: a palavra-passe está em <code>lib/site.ts</code>. Numa versão final, o acesso é protegido no servidor.</p>
        </form>
      </div>
    );

  return (
    <div className="wrap section admin" style={{ paddingBlock: "var(--space-6) var(--space-8)" }}>
      <div className="head-row" style={{ marginBottom: 20 }}>
        <div>
          <p className="kicker">Área de gestão</p>
          <h1 className="h2" style={{ marginTop: 10 }}>Painel</h1>
        </div>
        <button className="btn btn-ghost on-paper btn-sm" onClick={logout}>Sair</button>
      </div>
      <p className="notice" style={{ marginBottom: 22 }}>
        <strong>Modo demonstração.</strong> As alterações ficam guardadas <u>neste navegador</u> e aparecem de imediato no site. Para que todos os visitantes vejam as mudanças, ligue uma base de dados (ver README).
      </p>

      <div className="admin-tabs" role="tablist" aria-label="Secções">
        {([["leads", "Pedidos"], ["vehicles", "Viaturas à venda"], ["rentals", "Frota de aluguer"]] as const).map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === "leads" && <Leads />}
      {tab === "vehicles" && <VehiclesAdmin />}
      {tab === "rentals" && <RentalsAdmin />}
    </div>
  );
}

/* ───────── Pedidos ───────── */
function Leads() {
  const { list, save } = useLeads();
  const open = list.filter((l) => !l.done).length;
  return (
    <>
      <div className="stat-row">
        <div className="stat"><b>{list.length}</b>Pedidos recebidos</div>
        <div className="stat"><b>{open}</b>Por tratar</div>
      </div>
      {list.length === 0 ? (
        <div className="empty"><h2 className="h3">Ainda não há pedidos</h2><p className="muted">Quando alguém preencher um formulário no site, aparece aqui.</p></div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Data</th><th>Tipo</th><th>Cliente</th><th>Assunto</th><th>Estado</th><th><span className="sr">Ações</span></th></tr></thead>
            <tbody>
              {list.map((l) => (
                <tr key={l.id}>
                  <td>{new Date(l.createdAt).toLocaleString("pt-PT", { dateStyle: "short", timeStyle: "short" })}</td>
                  <td>{l.kind}</td>
                  <td><strong>{l.name}</strong><br /><a href={`tel:${l.phone}`}>{l.phone}</a>{l.email && <><br />{l.email}</>}</td>
                  <td style={{ maxWidth: 320 }}>{l.subject}{l.message && <div className="hint" style={{ whiteSpace: "pre-line" }}>{l.message}</div>}</td>
                  <td><span className={`badge${l.done ? " off" : " warn"}`}>{l.done ? "Tratado" : "Novo"}</span></td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-ghost on-paper btn-sm" onClick={() => save(list.map((x) => (x.id === l.id ? { ...x, done: !x.done } : x)))}>{l.done ? "Reabrir" : "Marcar tratado"}</button>
                      <button className="btn btn-danger btn-sm" onClick={() => { if (confirm(`Apagar o pedido de ${l.name}?`)) save(list.filter((x) => x.id !== l.id)); }}>Apagar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

/* ───────── Campos comuns ───────── */
function Text({ id, label, value, onChange, type = "text", required, ...rest }: { id: string; label: string; value: string | number; onChange: (v: string) => void; type?: string; required?: boolean } & Record<string, unknown>) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}{required && " *"}</label>
      <input id={id} className="input" type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} {...rest} />
    </div>
  );
}
function Pick<T extends string>({ id, label, value, options, onChange }: { id: string; label: string; value: T; options: readonly (T | [T, string])[]; onChange: (v: T) => void }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} className="select" value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((o) => { const [v, l] = Array.isArray(o) ? o : [o, o]; return <option key={v} value={v}>{l}</option>; })}
      </select>
    </div>
  );
}

/* ───────── Viaturas à venda ───────── */
function VehiclesAdmin() {
  const { list, save, reset } = useVehicles();
  const [f, setF] = useState<Vehicle>(blankVehicle());
  const [feat, setFeat] = useState("");
  const editing = !!f.id;
  const set = <K extends keyof Vehicle>(k: K, v: Vehicle[K]) => setF((p) => ({ ...p, [k]: v }));
  const clear = () => { setF(blankVehicle()); setFeat(""); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const item: Vehicle = { ...f, id: f.id || uid(), features: feat.split(",").map((s) => s.trim()).filter(Boolean) };
    save(editing ? list.map((x) => (x.id === item.id ? item : x)) : [item, ...list]);
    clear();
  };

  return (
    <div className="admin-grid">
      <form className="panel" onSubmit={submit}>
        <h2 className="h3" style={{ marginBottom: 14 }}>{editing ? "Editar viatura" : "Nova viatura"}</h2>
        <div className="form-grid">
          <Text id="vb" label="Marca" required value={f.brand} onChange={(v) => set("brand", v)} />
          <Text id="vm" label="Modelo" required value={f.model} onChange={(v) => set("model", v)} />
          <Text id="vy" label="Ano" type="number" required value={f.year} onChange={(v) => set("year", +v)} min={1990} max={2100} />
          <Text id="vk" label="Quilómetros" type="number" value={f.km} onChange={(v) => set("km", +v)} min={0} />
          <div className="full"><Text id="vp" label="Preço (Kz)" type="number" required value={f.price} onChange={(v) => set("price", +v)} min={0} /></div>
          <Pick id="vf" label="Combustível" value={f.fuel} options={FUELS} onChange={(v) => set("fuel", v)} />
          <Pick id="vg" label="Caixa" value={f.gearbox} options={GEARS} onChange={(v) => set("gearbox", v)} />
          <Pick id="vbody" label="Carroçaria" value={f.body} options={BODIES} onChange={(v) => set("body", v)} />
          <div className="field"><label htmlFor="vc">Cor (ilustração)</label><input id="vc" className="input" type="color" value={f.color} onChange={(e) => set("color", e.target.value)} style={{ padding: 4 }} /></div>
          <Text id="ve" label="Motor" value={f.engine} onChange={(v) => set("engine", v)} />
          <Text id="vw" label="Potência" value={f.power} onChange={(v) => set("power", v)} />
          <Text id="vs" label="Lugares" type="number" value={f.seats} onChange={(v) => set("seats", +v)} min={1} max={20} />
          <Pick id="vst" label="Estado" value={f.status} options={[["disponivel", "Disponível"], ["reservado", "Reservado"], ["vendido", "Vendido"]]} onChange={(v) => set("status", v)} />
          <div className="full field"><label htmlFor="vfe">Equipamento (separado por vírgulas)</label><input id="vfe" className="input" value={feat} onChange={(e) => setFeat(e.target.value)} placeholder="Câmara 360°, Bancos em pele" /></div>
          <div className="full field"><label htmlFor="vd">Descrição</label><textarea id="vd" className="textarea" value={f.description} onChange={(e) => set("description", e.target.value)} /></div>
          <label className="check"><input type="checkbox" checked={f.featured} onChange={(e) => set("featured", e.target.checked)} /> Destaque na página inicial</label>
          <label className="check"><input type="checkbox" checked={f.isNew} onChange={(e) => set("isNew", e.target.checked)} /> Viatura nova</label>
        </div>
        <div className="actions" style={{ marginTop: 16 }}>
          <button className="btn btn-dark" type="submit">{editing ? "Guardar alterações" : "Adicionar viatura"}</button>
          {editing && <button type="button" className="btn btn-ghost on-paper" onClick={clear}>Cancelar</button>}
        </div>
      </form>

      <div>
        <div className="toolbar"><p><strong>{list.length}</strong> viaturas</p>
          <button className="btn btn-ghost on-paper btn-sm" onClick={() => { if (confirm("Repor os dados de exemplo? As suas alterações a viaturas serão perdidas.")) reset(); }}>Repor exemplos</button></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Viatura</th><th>Preço</th><th>Estado</th><th><span className="sr">Ações</span></th></tr></thead>
            <tbody>
              {list.map((v) => (
                <tr key={v.id}>
                  <td><strong>{v.brand} {v.model}</strong><br /><span className="muted">{v.year} · {v.fuel}</span></td>
                  <td>{kz(v.price)}</td>
                  <td>
                    <span className={`badge${v.status === "disponivel" ? "" : v.status === "reservado" ? " warn" : " off"}`}>{v.status === "disponivel" ? "Disponível" : v.status === "reservado" ? "Reservado" : "Vendido"}</span>
                    {v.featured && <> <span className="badge warn">Destaque</span></>}
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-ghost on-paper btn-sm" onClick={() => { setF(v); setFeat(v.features.join(", ")); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Editar</button>
                      <button className="btn btn-ghost on-paper btn-sm" onClick={() => save(list.map((x) => (x.id === v.id ? { ...x, status: x.status === "vendido" ? "disponivel" : "vendido" } : x)))}>{v.status === "vendido" ? "Reativar" : "Marcar vendido"}</button>
                      <button className="btn btn-danger btn-sm" onClick={() => { if (confirm(`Apagar ${v.brand} ${v.model}?`)) { save(list.filter((x) => x.id !== v.id)); if (f.id === v.id) clear(); } }}>Apagar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ───────── Frota de aluguer ───────── */
function RentalsAdmin() {
  const { list, save, reset } = useRentals();
  const [f, setF] = useState<RentalCar>(blankRental());
  const [feat, setFeat] = useState("");
  const editing = !!f.id;
  const set = <K extends keyof RentalCar>(k: K, v: RentalCar[K]) => setF((p) => ({ ...p, [k]: v }));
  const clear = () => { setF(blankRental()); setFeat(""); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const item: RentalCar = { ...f, id: f.id || uid(), features: feat.split(",").map((s) => s.trim()).filter(Boolean) };
    save(editing ? list.map((x) => (x.id === item.id ? item : x)) : [item, ...list]);
    clear();
  };

  return (
    <div className="admin-grid">
      <form className="panel" onSubmit={submit}>
        <h2 className="h3" style={{ marginBottom: 14 }}>{editing ? "Editar viatura da frota" : "Nova viatura na frota"}</h2>
        <div className="form-grid">
          <Text id="rb" label="Marca" required value={f.brand} onChange={(v) => set("brand", v)} />
          <Text id="rm" label="Modelo" required value={f.model} onChange={(v) => set("model", v)} />
          <Text id="ry" label="Ano" type="number" value={f.year} onChange={(v) => set("year", +v)} min={1990} max={2100} />
          <Pick id="rc" label="Categoria" value={f.category} options={CATS} onChange={(v) => set("category", v)} />
          <div className="full"><Text id="rp" label="Preço por dia (Kz)" type="number" required value={f.pricePerDay} onChange={(v) => set("pricePerDay", +v)} min={0} /></div>
          <Pick id="rf" label="Combustível" value={f.fuel} options={FUELS} onChange={(v) => set("fuel", v)} />
          <Pick id="rg" label="Caixa" value={f.gearbox} options={GEARS} onChange={(v) => set("gearbox", v)} />
          <Pick id="rbody" label="Carroçaria" value={f.body} options={BODIES} onChange={(v) => set("body", v)} />
          <div className="field"><label htmlFor="rcol">Cor (ilustração)</label><input id="rcol" className="input" type="color" value={f.color} onChange={(e) => set("color", e.target.value)} style={{ padding: 4 }} /></div>
          <Text id="rs" label="Lugares" type="number" value={f.seats} onChange={(v) => set("seats", +v)} min={1} max={20} />
          <Text id="rbags" label="Malas" type="number" value={f.bags} onChange={(v) => set("bags", +v)} min={0} max={20} />
          <div className="full field"><label htmlFor="rfe">Incluído (separado por vírgulas)</label><input id="rfe" className="input" value={feat} onChange={(e) => setFeat(e.target.value)} placeholder="Ar condicionado, Bluetooth" /></div>
          <label className="check full"><input type="checkbox" checked={f.available} onChange={(e) => set("available", e.target.checked)} /> Disponível para aluguer</label>
        </div>
        <div className="actions" style={{ marginTop: 16 }}>
          <button className="btn btn-dark" type="submit">{editing ? "Guardar alterações" : "Adicionar à frota"}</button>
          {editing && <button type="button" className="btn btn-ghost on-paper" onClick={clear}>Cancelar</button>}
        </div>
      </form>

      <div>
        <div className="toolbar"><p><strong>{list.length}</strong> viaturas na frota</p>
          <button className="btn btn-ghost on-paper btn-sm" onClick={() => { if (confirm("Repor os dados de exemplo da frota?")) reset(); }}>Repor exemplos</button></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Viatura</th><th>Preço/dia</th><th>Estado</th><th><span className="sr">Ações</span></th></tr></thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.brand} {r.model}</strong><br /><span className="muted">{r.category} · {r.seats} lugares</span></td>
                  <td>{kz(r.pricePerDay)}</td>
                  <td><span className={`badge${r.available ? "" : " off"}`}>{r.available ? "Disponível" : "Indisponível"}</span></td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-ghost on-paper btn-sm" onClick={() => { setF(r); setFeat(r.features.join(", ")); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Editar</button>
                      <button className="btn btn-ghost on-paper btn-sm" onClick={() => save(list.map((x) => (x.id === r.id ? { ...x, available: !x.available } : x)))}>{r.available ? "Marcar alugada" : "Marcar livre"}</button>
                      <button className="btn btn-danger btn-sm" onClick={() => { if (confirm(`Apagar ${r.brand} ${r.model} da frota?`)) { save(list.filter((x) => x.id !== r.id)); if (f.id === r.id) clear(); } }}>Apagar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
