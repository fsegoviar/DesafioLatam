import { Dialog } from 'primereact/dialog';
import { useDialogCreateLinkHook } from '../context/TableContext';
import { FormDataProgram } from './FormDataProgram';
import {
  PaymentFormProvider,
  initialValue
} from '../context/PaymentFormContext';

export const DialogTablePricing = () => {
  const { isOpenDialog, closeDialog } = useDialogCreateLinkHook();

  return (
    <Dialog
      visible={isOpenDialog}
      header={'Crear tabla de precios'}
      draggable={false}
      resizable={false}
      modal
      className="p-fluid"
      onHide={closeDialog}
    >
      <PaymentFormProvider {...initialValue}>
        <div>
          <FormDataProgram />
        </div>
      </PaymentFormProvider>
    </Dialog>
  );
};
