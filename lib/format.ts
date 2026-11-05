const EUR = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
export const eur = (n: number) => EUR.format(Math.round(n));
export const priceLabel = (n: number | null) => (n === null ? "Preço sob consulta" : eur(n));
export const kmLabel = (n: number | null) => (n === null ? "A confirmar" : n === 0 ? "0 km" : km(n));
export const km = (n: number) => `${n.toLocaleString("pt-PT")} km`;
export const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);

/** Prestação mensal (sistema francês). Simulação indicativa. */
export const monthlyPayment = (principal: number, annualRatePct: number, months: number) => {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  return r === 0 ? principal / months : (principal * r) / (1 - Math.pow(1 + r, -months));
};
