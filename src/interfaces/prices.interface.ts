export type FormPaymentType = {
  career_id: number;
  name: string;
  value: string;
  free_discount: string;
  advance_discount: string;
  tuition: string;
  comments: string;
  payment_methods: PaymentMethod[];
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
};

export interface PaymentType extends FormPaymentType {
  id?: number;
  career: CareerType;
}
