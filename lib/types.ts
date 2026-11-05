export type Body = "sedan" | "suv" | "hatch" | "pickup" | "van";
export type Fuel = "Gasolina" | "Diesel" | "Híbrido" | "Elétrico";
export type Gearbox = "Manual" | "Automática";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  price: number;
  fuel: Fuel;
  gearbox: Gearbox;
  body: Body;
  color: string;
  seats: number;
  engine: string;
  power: string;
  features: string[];
  description: string;
  status: "disponivel" | "reservado" | "vendido";
  featured: boolean;
  isNew: boolean;
}

export type RentCategory = "Económico" | "Compacto" | "SUV" | "Executivo" | "Pickup" | "Minibus";

export interface RentalCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: RentCategory;
  pricePerDay: number;
  fuel: Fuel;
  gearbox: Gearbox;
  body: Body;
  color: string;
  seats: number;
  bags: number;
  features: string[];
  available: boolean;
}

export interface Lead {
  id: string;
  kind: "Reserva" | "Visita" | "Financiamento" | "Contacto";
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  done: boolean;
}
