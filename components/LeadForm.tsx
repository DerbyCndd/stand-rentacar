"use client";
import { useId, useState } from "react";
import type { Lead } from "@/lib/types";
import { addLead } from "@/lib/store";
import { wa } from "@/lib/site";

type Props = {
  kind: Lead["kind"];
  subject: string;
  presetMessage?: string;
  cta?: string;
  showMessage?: boolean;
  /** Linhas extra anexadas à mensagem (ex.: datas, extras escolhidos). */
  details?: string;
};

/** Formulário acessível: validação em linha, estado de sucesso, guarda o pedido e oferece WhatsApp. */
export function LeadForm({ kind, subject, presetMessage = "", cta = "Enviar pedido", showMessage = true, details = "" }: Props) {
  const uidp = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(presetMessage);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Indique o seu nome.";
    if (phone.replace(/\D/g, "").length < 9) e.phone = "Indique um telefone com pelo menos 9 dígitos.";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = "O e-mail não parece válido.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const full = [message, details].filter(Boolean).join("\n");
  const waText = `Olá! Sou ${name || "(nome)"}. ${subject}.${full ? `\n${full}` : ""}\nTelefone: ${phone}`;

  if (sent) {
    return (
      <div className="notice ok" role="status">
        <strong>Pedido enviado.</strong> Vamos contactá-lo em breve. Para acelerar, envie também por WhatsApp:
        <div style={{ marginTop: 12 }}>
          <a className="btn btn-wa btn-sm" href={wa(waText)} target="_blank" rel="noopener noreferrer">
            Continuar no WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(ev) => {
        ev.preventDefault();
        if (!validate()) return;
        addLead({ kind, name: name.trim(), phone: phone.trim(), email: email.trim(), subject, message: full });
        setSent(true);
      }}
      style={{ display: "grid", gap: 14 }}
    >
      <div className="field">
        <label htmlFor={`${uidp}n`}>Nome *</label>
        <input id={`${uidp}n`} className="input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uidp}ne` : undefined} />
        {errors.name && <span id={`${uidp}ne`} className="err">{errors.name}</span>}
      </div>
      <div className="field">
        <label htmlFor={`${uidp}p`}>Telefone *</label>
        <input id={`${uidp}p`} className="input" type="tel" inputMode="tel" autoComplete="tel" placeholder="9XX XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uidp}pe` : undefined} />
        {errors.phone && <span id={`${uidp}pe`} className="err">{errors.phone}</span>}
      </div>
      <div className="field">
        <label htmlFor={`${uidp}e`}>E-mail (opcional)</label>
        <input id={`${uidp}e`} className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uidp}ee` : undefined} />
        {errors.email && <span id={`${uidp}ee`} className="err">{errors.email}</span>}
      </div>
      {showMessage && (
        <div className="field">
          <label htmlFor={`${uidp}m`}>Mensagem</label>
          <textarea id={`${uidp}m`} className="textarea" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
      )}
      <button type="submit" className="btn btn-dark">{cta}</button>
      <p className="hint">Ao enviar, aceita que o contactemos sobre este pedido. Não partilhamos os seus dados.</p>
    </form>
  );
}
