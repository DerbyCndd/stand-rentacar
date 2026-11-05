import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link prefetch={false} href="/" className="logo">
              <i aria-hidden="true">K</i>
              {site.name}
            </Link>
            <p className="muted" style={{ marginTop: 14, maxWidth: "34ch" }}>
              {site.description}
            </p>
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
