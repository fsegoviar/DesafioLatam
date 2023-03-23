export type FormPaymentType = {
  career_id: number | null;
  currency_id: number | null;
  name: string;
  tuition: number | null;
  comments: string;
  payment_methods: PaymentMethod[];
  suppliers: SupplierId[];
};

export type SupplierId = {
  supplier_id: number;
};

export type FormEditPayment = {
  // id: number;
  // career: CareerType;
  // career_id: number;
  // comments: string;
  // currency: Currency;
  // currency_id: number;
  // name: string;
  // payment_methods: PaymentMethodEdit[];
  // suppliers: SupplierEditType[];
  // tuition: number;
  payment_methods: PaymentMethodEdit[];
  price: PriceEdit;
};

export type Currency = {
  id: number;
  description: string;
  code: string;
};

export type PaymentMethodEdit = {
  id: number;
  advance_discount: number;
  description: string;
  free_discount: number;
  isa_percent: number;
  isa_value: number;
  payment_method_id: number;
  price_id: number;
  quotes: number;
  quotes_value: number;
  reference_value: number;
};

export type PriceEdit = {
  id: number;
  career: CareerType;
  career_id: number;
  comments: string;
  currency: Currency;
  currency_id: number;
  name: string;
  tuition: number;
  suppliers: SupplierEditType[];
};

export type PivotEditType = {
  id: number;
  advance_discount: number | null;
  created_at: Date;
  free_discount: number | null;
  isa_percent: number | null;
  isa_value: number | null;
  payment_method_id: number;
  price_id: number;
  quotes: number | null;
  quotes_value: number | null;
  reference_value: number | null;
  updated_at: Date;
};

export type PaymentMethod = {
  payment_method_id: number | null;
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

export type SupplierEditType = {
  id: number;
  description: string;
  pivot: PivotSupplierEditType;
};

export type PivotSupplierEditType = {
  id: number;
  price_id: number;
  supplier_id: number;
  created_at: Date;
  updated_at: Date;
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
