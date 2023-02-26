export type FormPaymentType = {
  career_id: number;
  name: string;
  value: string;
  free_discount: string;
  advance_discount: string;
  currency_id: number;
  tuition: string;
  comments: string;
  payment_methods: PaymentMethod[];
};

export type FormEditPayment = {
  advance_discount: string;
  career: CareerType;
  career_id: number;
  comments: string;
  currency: Currency;
  currency_id: number;
  free_discount: number;
  id: number;
  name: string;
  tuition: number;
  value: number;
};

export type Currency = {
  id: number;
  description: string;
  code: string;
};

export type PaymentMethod = {
  supplier_id: number;
  tuition: number;
  quotes: number;
  quotes_value: number;
  full_value: number;
  discount: number;
};

export type SupplierType = {
  id: number;
  description: string;
};

export class UpdateFormPayment implements Partial<FormPaymentType> {}

export type CareerType = {
  id: number;
  description: string;
  prices: any[];
  sis_program_id: number;
};

export interface PaymentType extends FormPaymentType {
  id?: number;
  career: CareerType;
}
