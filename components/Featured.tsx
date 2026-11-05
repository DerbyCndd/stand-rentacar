"use client";
import { useVehicles } from "@/lib/store";
import { VehicleCard } from "./Cards";

export function Featured() {
  const { list } = useVehicles();
  const items = list.filter((v) => v.featured && v.status !== "vendido").slice(0, 3);
  if (!items.length) return <p className="muted">Em breve novas viaturas em destaque.</p>;
  return (
    <div className="grid">
      {items.map((v) => (
        <VehicleCard key={v.id} v={v} />
      ))}
    </div>
  );
}
