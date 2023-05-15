import { Dialog } from 'primereact/dialog';
import {
  PaymentFormProvider,
  initialValue
} from '../context/PaymentFormContext';
import { FormDataEditPrice } from './FormDataEditPrice';

type PropsDialog = {
  id: number;
  actionToast: (actino: string) => void;
  addData: (data: any) => void;
  open: boolean;
  close: () => void;
};

export const DialogEditPricing = ({
  id,
  actionToast,
  addData,
  open,
  close
}: PropsDialog) => {
  return (
    <Dialog
      visible={open}
      header={'Editar Item'}
      draggable={false}
      resizable={false}
      modal
      className="p-fluid"
      onHide={close}
    >
      <PaymentFormProvider {...initialValue}>
        <FormDataEditPrice
          actionToast={actionToast}
          id={id}
          addData={addData}
          close={close}
        />
      </PaymentFormProvider>
    </Dialog>
  );
};
