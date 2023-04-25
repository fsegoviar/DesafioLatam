import { Dialog } from 'primereact/dialog';
import {
  PaymentFormProvider,
  initialValue
} from '../context/PaymentFormContext';
import { FormDataEditPrice } from './FormDataEditPrice';
import { useDialogEditPriceHook } from '../context/TableContext';

type PropsDialog = {
  id: number;
  actionToast: (actino: string) => void;
  addData: (data: any) => void;
};

export const DialogEditPricing = ({
  id,
  actionToast,
  addData
}: PropsDialog) => {
  const { isOpenDialogEdit, closeDialogEdit } = useDialogEditPriceHook();
  return (
    <Dialog
      visible={isOpenDialogEdit}
      header={'Editar Item'}
      draggable={false}
      resizable={false}
      modal
      className="p-fluid"
      onHide={closeDialogEdit}
    >
      <PaymentFormProvider {...initialValue}>
        <FormDataEditPrice
          actionToast={actionToast}
          id={id}
          addData={addData}
        />
      </PaymentFormProvider>
    </Dialog>
  );
};
