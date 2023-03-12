export type FormPaymentType = {
  // career_id: number;
  // currency_id: number;
  // name: string;
  // value: string;
  // free_discount: string;
  // advance_discount: string;
  // tuition: string;
  // comments: string;
  // quotes: number;
  // quotes_value: number;
  // full_value: number;
  // reference_value: number;
  // payment_methods: SupplierId[];
  // payment_method: string;
  career_id: number | null;
  currency_id: number | null;
  name: string;
  tuition: number | null;
  comment: string;
  payment_methods: PaymentMethod[];
  suppliers: SupplierId[];
};

export type SupplierId = {
  supplier_id: number;
};

export type FormEditPayment = {
  id: number;
  career_id: number;
  career: CareerType;
  currency_id: number;
  currency: Currency;
  name: string;
  value: string;
  free_discount: string;
  advance_discount: string;
  tuition: string;
  comments: string;
  quotes: number;
  quotes_value: number;
  full_value: number;
  reference_value: number;
  payment_methods: SupplierId[];
  suppliers: any[];
  payment_method: string;
};

export type Currency = {
  id: number;
  description: string;
  code: string;
};

export type PaymentMethod = {
  // supplier_id: number;
  // tuition: number;
  // quotes: number;
  // quotes_value: number;
  // full_value: number;
  // discount: number;
  free_discount: number | null;
  advance_discount: number | null;
  quotes: number | null;
  quotes_value: number | null;
  reference_value: number | null;
  isa_value: number | null;
  isa_percent: number | null;
};

export type SupplierType = {
  id: number;
  description: string;
  pivot: PivotType;
};

export type PivotType = {
  created_at: string;
  discount: number;
  full_value: number;
  price_id: number;
  quotes: number;
  quotes_value: number;
  supplier_id: number;
  tuition: number;
  updated_at: string;
};

export class UpdateFormPayment implements Partial<FormPaymentType> {}

export type CareerType = {
  id: number;
  description: string;
};

export interface PaymentType extends FormPaymentType {
  id?: number;
  career: CareerType;
}
