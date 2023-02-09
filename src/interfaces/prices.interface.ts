export type FormPaymentType = {
  career_id: number;
  name: string;
  value: string;
  free_discount: string;
  advance_discount: string;
  tuition: string;
  comments: string;
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
