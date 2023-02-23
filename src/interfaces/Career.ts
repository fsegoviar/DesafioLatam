export interface Career {
  id: number;
  description: string;
  prices: CareerPrice[];
  sis_program_id: number;
}

export interface CareerPrice {
  advance_discount: number;
  career_id: number;
  comments: string;
  created_at: string;
  currency_id: number;
  free_discount: number;
  id: number;
  name: string;
  suppliers: CareerSupplier[];
  tuition: number;
  updated_at: string;
  value: number;
}

export interface CareerSupplier {
  description: string;
  id: number;
  pivot: Pivot;
}

export interface Pivot {
  created_at: string;
  discount: number;
  full_value: number;
  price_id: number;
  quotes: number;
  quotes_value: number;
  supplier_id: number;
  tuition: number;
  updated_at: string;
}
