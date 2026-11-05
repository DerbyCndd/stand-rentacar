export const kz = (n: number) => `${Math.round(n).toLocaleString("pt-PT")} Kz`;
export const km = (n: number) => `${n.toLocaleString("pt-PT")} km`;
export const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);

/** Prestação mensal (sistema francês). Simulação indicativa. */
export const monthlyPayment = (principal: number, annualRatePct: number, months: number) => {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  return r === 0 ? principal / months : (principal * r) / (1 - Math.pow(1 + r, -months));
};
