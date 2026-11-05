export type Body = "sedan" | "suv" | "hatch" | "pickup" | "van";
export type Fuel = "Gasolina" | "Diesel" | "Híbrido" | "Elétrico";
export type Gearbox = "Manual" | "Automática";

/** Cor com unidades em stock (0 = esgotada). */
export interface ColorStock {
  name: string;
  hex: string;
  qty: number;
}

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
  /** Fotografia real (data URL). Se vazia, usa-se a ilustração. */
  photo?: string;
  colors?: ColorStock[];
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
  photo?: string;
  colors?: ColorStock[];
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
