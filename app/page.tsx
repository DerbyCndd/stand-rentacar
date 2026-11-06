import Link from "next/link";
import { asset } from "@/lib/asset";
import { HeroSearch } from "@/components/HeroSearch";
import { HeroBrands } from "@/components/HeroBrands";
import { SocialIcons } from "@/components/SocialIcons";
import { Featured } from "@/components/Featured";
import { site, wa } from "@/lib/site";

const categories = [
  ["Económico", "Cidade e poupança", "Preço sob consulta"],
  ["Compacto", "Conforto diário", "Preço sob consulta"],
  ["SUV", "Espaço e robustez", "Preço sob consulta"],
  ["Executivo", "Com ou sem motorista", "Preço sob consulta"],
  ["Pickup", "Trabalho e campo", "Preço sob consulta"],
  ["Minibus", "Grupos até 14 pessoas", "Preço sob consulta"],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="kicker">Stand &amp; Rent a Car · Braga</p>
            <h1 className="display" style={{ marginTop: 18 }}>
              O poder de <span>escolher!</span>
            </h1>
            <p className="lead muted" style={{ marginTop: 22 }}>
              O teu novo carro espera por ti! Compra com garantia e financiamento à medida, ou aluga por um dia, uma semana ou o tempo que precisares.
            </p>
            <ul className="hero-points">
              <li>Usados, Novos &amp; Seminovos</li>
              <li>Venda • Troca • Retoma</li>
              <li>Financiamento até 24h*</li>
              <li>Entregas em todo o país</li>
            </ul>
            <a className="partner" href="https://autonarciso.pt" target="_blank" rel="noopener noreferrer" aria-label="Parceiro oficial: Auto Narciso (abre autonarciso.pt)">
              <span>Parceiro oficial</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/logos/auto-narciso-logo.png")} alt="Auto Narciso – Comércio Automóvel" width={148} height={55} />
            </a>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
              <a className="btn btn-primary" href={site.catalog} target="_blank" rel="noopener noreferrer">Ver catálogo no WhatsApp</a>
              <SocialIcons />
            </div>
          </div>
          <div className="hero-art">
            {/* eslint-disable @next/next/no-img-element */}
            <div className="hero-photos">
              <img className="big" src={asset("/hero/stand-autoferasa.jpg")} alt="Cliente a entrar num carro preto à porta do stand AutoFerasa" />
              <img src={asset("/cars/golf-8-gti-clubsport-01.jpg")} alt="Volkswagen Golf 8 GTI Clubsport vermelho" loading="lazy" />
              <img src={asset("/cars/mercedes-a180-01.jpg")} alt="Mercedes-Benz Classe A branco" loading="lazy" />
            </div>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
        <div className="wrap">
          <HeroBrands />
        </div>
      </section>

      <div className="wrap">
        <HeroSearch />
      </div>

      <section className="section" aria-labelledby="destaques">
        <div className="wrap">
          <div className="head-row">
            <div>
              <p className="kicker">Stand</p>
              <h2 id="destaques" className="h2" style={{ marginTop: 12 }}>Viaturas em destaque</h2>
            </div>
            <Link prefetch={false} className="btn btn-dark" href="/comprar/">Ver todas as viaturas</Link>
          </div>
          <Featured />
        </div>
      </section>

      <section className="section dark" aria-labelledby="rent">
        <div className="wrap split">
          <div>
            <p className="kicker">Rent a Car</p>
            <h2 id="rent" className="h2" style={{ marginTop: 12 }}>Alugue em três passos</h2>
            <ol className="steps">
              <li>
                <div>
                  <h3 className="h3">Escolha as datas e a viatura</h3>
                  <p className="muted">Veja o preço total antes de reservar. Sem surpresas.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3 className="h3">Confirme por WhatsApp</h3>
                  <p className="muted">Enviamos o pedido já preenchido. Confirmamos a disponibilidade na hora.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3 className="h3">Levante ou receba no local</h3>
                  <p className="muted">No stand, na sua morada ou no aeroporto. Documentos e seguro tratados.</p>
                </div>
              </li>
            </ol>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
              <Link prefetch={false} className="btn btn-primary" href="/alugar/">Ver frota</Link>
              <a className="btn btn-ghost" href={wa("Olá! Quero alugar uma viatura.")} target="_blank" rel="noopener noreferrer">Reservar por WhatsApp</a>
            </div>
          </div>
          <div>
            <div className="cat-grid" style={{ marginTop: 0 }}>
              {categories.map(([name, d, p]) => (
                <Link prefetch={false} key={name} className="cat" href={`/alugar/?cat=${encodeURIComponent(name)}`}>
                  <b>{name}</b>
                  <span>{d}</span>
                  <span style={{ color: "var(--amber)" }}>{p}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="porque">
        <div className="wrap">
          <p className="kicker">Porquê {site.name}</p>
          <h2 id="porque" className="h2" style={{ marginTop: 12, maxWidth: "18ch" }}>Menos burocracia, mais estrada.</h2>
          <div className="why">
            {[
              ["✓", "Viaturas inspecionadas", "Cada viatura passa por uma revisão técnica antes de ser anunciada."],
              ["€", "Preços transparentes", "Preço de venda e custo total de aluguer sempre visíveis, sem taxas escondidas."],
              ["%", "Financiamento à medida", "Simule a prestação na própria página e peça uma proposta sem compromisso."],
              ["24h", "Apoio por WhatsApp", "Fale connosco quando lhe der jeito, inclusive em caso de avaria durante o aluguer."],
            ].map(([i, t, d]) => (
              <div key={t}>
                <span className="ico" aria-hidden="true">{i}</span>
                <h3 className="h3">{t}</h3>
                <p className="muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-2" aria-labelledby="visita">
        <div className="wrap band">
          <div>
            <p className="kicker">Visite o stand</p>
            <h2 id="visita" className="h2" style={{ marginTop: 12 }}>Venha ver e experimentar.</h2>
            <p className="lead muted" style={{ marginTop: 16 }}>{site.address}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "grid", gap: 6 }}>
              {site.hours.map(([d, h]) => (
                <li key={d}><strong>{d}:</strong> <span className="muted">{h}</span></li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
              <Link prefetch={false} className="btn btn-primary" href="/contactos/">Marcar visita</Link>
              <a className="btn btn-ghost" href={`https://www.google.com/maps/search/${encodeURIComponent(site.address)}`} target="_blank" rel="noopener noreferrer">Abrir no mapa</a>
            </div>
          </div>
          <div className="hero-art" style={{ transform: "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="car-photo" src={asset("/cars/mini-clubman-hampton-01.jpg")} alt="MINI Cooper Clubman Hampton 50 Anos" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
