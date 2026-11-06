"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { asset } from "@/lib/asset";
import { site, wa } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Início" },
  { href: "/comprar/", label: "Comprar" },
  { href: "/alugar/", label: "Alugar" },
  { href: "/contactos/", label: "Contactos" },
];

export function Header() {
  const path = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="header">
      <div className="wrap header-in">
        <Link prefetch={false} href="/" className="logo" aria-label={`${site.name} – página inicial`} onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/logos/autoferasa.jpg")} alt="" width={110} height={44} className="logo-img" />
        </Link>
        <nav id="menu" className={`nav${open ? " open" : ""}`} aria-label="Principal">
          {links.map((l) => (
            <Link prefetch={false} key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
        <ThemeToggle />
        <a className="btn btn-primary btn-sm header-cta" href={wa("Olá! Gostaria de mais informações.")} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
        </div>
      </div>
    </header>
  );
}
