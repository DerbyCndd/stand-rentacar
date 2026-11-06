import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { SocialIcons } from "@/components/SocialIcons";
import { site, wa } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contactos e morada do stand em Braga",
  description: "Fale connosco por WhatsApp, telefone ou visite o stand em Braga. Marque uma visita ou peça uma proposta.",
};

export default function Page() {
  return (
    <>
      <section className="dark" style={{ paddingBlock: "clamp(40px,6vw,72px)" }}>
        <div className="wrap">
          <p className="kicker">Contactos</p>
          <h1 className="display" style={{ marginTop: 14, fontSize: "clamp(2.4rem,6vw,4.6rem)" }}>Fale connosco</h1>
          <p className="lead muted" style={{ marginTop: 14 }}>O caminho mais rápido é o WhatsApp. Se preferir, deixe os seus dados e ligamos.</p>
        </div>
      </section>
      <section className="section" style={{ paddingBlock: "var(--space-7) var(--space-8)" }}>
        <div className="wrap detail">
          <div className="panel">
            <h2 className="h3" style={{ marginBottom: 16 }}>Envie uma mensagem</h2>
            <LeadForm kind="Contacto" subject="Contacto através do site" cta="Enviar mensagem" />
          </div>
          <div>
            <div className="panel">
              <h2 className="h3">Stand</h2>
              <p style={{ marginTop: 10 }}>{site.address}</p>
              <p style={{ marginTop: 6 }}><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></p>
              <p style={{ marginTop: 6 }}><a href={`mailto:${site.email}`}>{site.email}</a></p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
                <a className="btn btn-wa btn-sm" href={wa("Olá! Gostaria de mais informações.")} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <a className="btn btn-ghost on-paper btn-sm" href={site.catalog} target="_blank" rel="noopener noreferrer">Catálogo</a>
                <SocialIcons small />
                <a className="btn btn-dark btn-sm" href={`https://www.google.com/maps/search/${encodeURIComponent(site.address)}`} target="_blank" rel="noopener noreferrer">Ver no mapa</a>
              </div>
            </div>
            <div className="panel">
              <h2 className="h3">Horário</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "grid", gap: 8 }}>
                {site.hours.map(([d, h]) => (
                  <li key={d} className="row" style={{ borderBottom: "1px dashed var(--line-paper)" }}><span>{d}</span><strong>{h}</strong></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
