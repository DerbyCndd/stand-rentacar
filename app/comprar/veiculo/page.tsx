import type { Metadata } from "next";
import { Suspense } from "react";
import { VeiculoClient } from "./VeiculoClient";

export const metadata: Metadata = { title: "Detalhe da viatura" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <VeiculoClient />
    </Suspense>
  );
}
