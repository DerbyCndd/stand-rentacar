"use client";
import { useId, useState } from "react";
import { kz, monthlyPayment } from "@/lib/format";

/** Simulador de financiamento (indicativo). A taxa anual é um parâmetro editável. */
export function FinanceSim({ price }: { price: number }) {
  const id = useId();
  const [down, setDown] = useState(30);
  const [months, setMonths] = useState(48);
  const [rate, setRate] = useState(14);

  const downValue = (price * down) / 100;
  const financed = price - downValue;
  const m = monthlyPayment(financed, rate, months);

  return (
    <div id="financiamento">
      <h3 className="h3">Simulador de financiamento</h3>
      <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
        <div className="field">
          <label htmlFor={`${id}d`}>Entrada: {down}% · {kz(downValue)}</label>
          <input id={`${id}d`} className="range" type="range" min={10} max={70} step={5} value={down} onChange={(e) => setDown(+e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor={`${id}m`}>Prazo: {months} meses</label>
          <input id={`${id}m`} className="range" type="range" min={12} max={84} step={12} value={months} onChange={(e) => setMonths(+e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor={`${id}r`}>Taxa anual indicativa: {rate}%</label>
          <input id={`${id}r`} className="range" type="range" min={6} max={24} step={1} value={rate} onChange={(e) => setRate(+e.target.value)} />
        </div>
      </div>
      <div className="total" aria-live="polite">
        <span>Prestação mensal</span>
        <strong>{kz(m)}</strong>
      </div>
      <p className="hint">Simulação indicativa, sem valor contratual. A taxa final depende da análise de crédito e da entidade financeira.</p>
    </div>
  );
}
