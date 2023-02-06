import { useContext } from 'react';
import {
  FormPaymentType,
  PaymentFormContext,
  UpdateFormPayment
} from '../context/PaymentFormContext';

type UseFormPaymentType = {
  state: FormPaymentType;
  updateForm: (data: UpdateFormPayment) => void;
};

export const useFormPayment = (): UseFormPaymentType => {
  const { state, updateForm } = useContext(PaymentFormContext);

  return { state, updateForm };
};
