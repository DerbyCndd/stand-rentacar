import type { Metadata } from "next";
import { Suspense } from "react";
import { AlugarClient } from "./AlugarClient";

export const metadata: Metadata = {
  title: "Rent a Car",
  description: "Alugue viaturas económicas, SUV, executivas, pick-ups e minibus em Luanda. Preço por dia, com ou sem motorista.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AlugarClient />
    </Suspense>
  );
}
