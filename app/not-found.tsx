import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap section" style={{ textAlign: "center" }}>
      <p className="kicker">Erro 404</p>
      <h1 className="display" style={{ margin: "16px 0", fontSize: "clamp(2.4rem,7vw,5rem)" }}>Saiu da estrada</h1>
      <p className="lead muted" style={{ margin: "0 auto 24px" }}>A página que procura não existe ou foi movida.</p>
      <Link prefetch={false} className="btn btn-dark" href="/">Voltar ao início</Link>
    </div>
  );
}
