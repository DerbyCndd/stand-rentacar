import type { Metadata } from "next";
import { AdminClient } from "./AdminClient";

export const metadata: Metadata = { title: "Área de gestão", robots: { index: false, follow: false } };

export default function Page() {
  return <AdminClient />;
}
