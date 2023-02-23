import { FormPaymentType } from '../../../../interfaces';

type FormPaymentProgramType = {
  data: FormPaymentType;
  close: () => void;
  closeModal: () => void;
};

export const FormDataEditPayment = (props: FormPaymentProgramType) => {
  return <div>FormDataEditPayment</div>;
};
