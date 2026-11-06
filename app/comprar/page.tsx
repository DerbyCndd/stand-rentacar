import type { Metadata } from "next";
import { Suspense } from "react";
import { ComprarClient } from "./ComprarClient";

export const metadata: Metadata = {
  title: "Carros usados e seminovos à venda em Braga",
  description: "Carros usados, seminovos e novos à venda em Braga: BMW, Mercedes-Benz, Audi, Volkswagen, MINI e mais. Garantia de 18 meses, financiamento até 24h e retoma da sua viatura.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ComprarClient />
    </Suspense>
  );
}
