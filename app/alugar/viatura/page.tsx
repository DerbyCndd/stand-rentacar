import type { Metadata } from "next";
import { Suspense } from "react";
import { ViaturaClient } from "./ViaturaClient";

export const metadata: Metadata = { title: "Reservar viatura" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ViaturaClient />
    </Suspense>
  );
}
