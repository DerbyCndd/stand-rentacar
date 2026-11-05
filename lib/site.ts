/** Dados da empresa. Edite aqui: nome, contactos e morada aparecem em todo o site. */
export const site = {
  name: "AutoFerasa",
  tagline: "Stand automóvel & Rent a Car em Braga",
  description:
    "Viaturas novas e usadas com garantia, financiamento à medida e aluguer de viaturas com ou sem motorista. Atendimento rápido por WhatsApp.",
  phone: "+351 933 210 514",
  /** Apenas dígitos, com indicativo (usado nos links de WhatsApp). */
  whatsapp: "351933210514",
  email: "grupoferasa.info@gmail.com",
  address: "Rua Padre Manuel Guimarães 5M1, n.º 26, 2.º Esq., Real, 4700-284 Braga",
  hours: [
    ["Segunda a sexta", "08:00 – 18:00"],
    ["Sábado", "09:00 – 14:00"],
    ["Domingo", "Fechado (aluguer 24h por marcação)"],
  ] as const,
  /** Palavra-passe de demonstração do painel. Em produção use autenticação a sério (ver README). */
  adminPassword: "admin123",
};

export const wa = (msg: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
