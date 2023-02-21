import { useState } from 'react';

import { Dialog } from 'primereact/dialog';
import { useDialogCreateLinkHook } from '../context/TableContext';
import { FormDataProgram } from './FormDataProgram';
import { FormPaymentProgram } from './FormPaymentProgram';
import {
  PaymentFormProvider,
  initialValue
} from '../context/PaymentFormContext';

export const DialogTablePricing = () => {
  const { isOpenDialog, closeDialog } = useDialogCreateLinkHook();
  const [showPanel, setShowPanel] = useState<boolean>(false);

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
        {!showPanel ? (
          <>
            <div>
              <FormDataProgram nextStep={setShowPanel} />
            </div>
          </>
        ) : (
          <div>
            <FormPaymentProgram
              close={() => setShowPanel(false)}
              closeModal={() => closeDialog()}
            />
          </div>
        )}
      </PaymentFormProvider>
    </Dialog>
  );
};
