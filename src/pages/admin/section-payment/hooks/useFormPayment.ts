import { useContext } from 'react';
import { PaymentFormContext } from '../context/PaymentFormContext';
import { FormPaymentType, UpdateFormPayment } from '../../../../interfaces';

type UseFormPaymentType = {
  state: FormPaymentType;
  updateForm: (data: UpdateFormPayment) => void;
};

export const UseFormPayment = (): UseFormPaymentType => {
  const { state, updateForm } = useContext(PaymentFormContext);

  return { state, updateForm };
};
