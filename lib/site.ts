/** Dados da empresa. Edite aqui: nome, contactos e morada aparecem em todo o site. */
export const site = {
  name: "AutoFerasa",
  /** Endereço público do site (sem "/" final). Quando tiver domínio próprio, troque aqui. */
  url: "https://derbycndd.github.io/stand-rentacar",
  tagline: "Stand automóvel & Rent a Car em Braga",
  description:
    "O poder de escolher! Usados, novos e seminovos. Venda, troca e retoma, financiamento até 24h e entregas em todo o país.",
  phone: "+351 933 210 514",
  /** Apenas dígitos, com indicativo (usado nos links de WhatsApp). */
  whatsapp: "351933210514",
  email: "grupoferasa.info@gmail.com",
  instagram: "https://www.instagram.com/autoferasa",
  facebook: "https://www.facebook.com/share/1FDp5eo8p7/",
  /** Catálogo de viaturas no WhatsApp Business. */
  catalog: "https://wa.me/c/351933210514",
  address: "Rua Padre Manuel Guimarães 5M1, n.º 26, 2.º Esq., Real, 4700-284 Braga",
  hours: [["Todos os dias", "09:00 – 18:00"]] as const,
  /** Palavra-passe de demonstração do painel. Em produção use autenticação a sério (ver README). */
  adminPassword: "admin123",
};

export const wa = (msg: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
