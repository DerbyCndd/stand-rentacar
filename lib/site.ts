/** Dados da empresa. Edite aqui: nome, contactos e morada aparecem em todo o site. */
export const site = {
  name: "Kwanza Motors",
  tagline: "Stand automóvel & Rent a Car em Luanda",
  description:
    "Viaturas novas e usadas com garantia, financiamento à medida e aluguer de viaturas com ou sem motorista. Atendimento rápido por WhatsApp.",
  phone: "+244 900 000 000",
  /** Apenas dígitos, com indicativo (usado nos links de WhatsApp). */
  whatsapp: "244900000000",
  email: "geral@kwanzamotors.example",
  address: "Av. 21 de Janeiro, Luanda, Angola",
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
