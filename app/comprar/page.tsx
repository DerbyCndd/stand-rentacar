import type { Metadata } from "next";
import { Suspense } from "react";
import { ComprarClient } from "./ComprarClient";

export const metadata: Metadata = {
  title: "Viaturas à venda",
  description: "Veja as viaturas novas e usadas do nosso stand: SUV, berlinas, citadinos e pick-ups, com garantia e financiamento.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ComprarClient />
    </Suspense>
  );
}
