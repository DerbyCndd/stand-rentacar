import Link from "next/link";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link prefetch={false} href="/" className="logo" aria-label={`${site.name} – página inicial`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/logos/autoferasa.jpg")} alt="" width={140} height={56} className="logo-img" />
            </Link>
            <p className="muted" style={{ marginTop: 14, maxWidth: "34ch" }}>
              {site.description}
            </p>
            <a className="partner" href="https://autonarciso.pt" target="_blank" rel="noopener noreferrer" aria-label="Parceiro oficial: Auto Narciso (abre autonarciso.pt)">
              <span>Parceiro oficial</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/logos/auto-narciso-logo.png")} alt="Auto Narciso – Comércio Automóvel" width={148} height={55} />
            </a>
          </div>
          <div>
            <h4>Explorar</h4>
            <ul>
              <li><Link prefetch={false} href="/comprar/">Viaturas à venda</Link></li>
              <li><Link prefetch={false} href="/alugar/">Rent a Car</Link></li>
              <li><Link prefetch={false} href="/comprar/#financiamento">Financiamento</Link></li>
              <li><Link prefetch={false} href="/contactos/">Contactos</Link></li>
            </ul>
          </div>
          <div>
            <h4>Horário</h4>
            <ul>
              {site.hours.map(([d, h]) => (
                <li key={d}>
                  <span style={{ color: "var(--on-dark)" }}>{d}</span>
                  <br />
                  <span className="muted">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Fale connosco</h4>
            <ul>
              <li><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>{site.address}</li>
              <li><a href={site.catalog} target="_blank" rel="noopener noreferrer">Catálogo no WhatsApp</a></li>
              <li style={{ marginTop: 6 }}><SocialIcons /></li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <span>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</span>
          <Link prefetch={false} href="/admin/">Área de gestão</Link>
        </div>
      </div>
    </footer>
  );
}
