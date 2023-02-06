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
      <PaymentFormProvider showPanel={initialValue.showPanel}>
        {!showPanel ? (
          <div>
            <FormDataProgram nextStep={setShowPanel} />
          </div>
        ) : (
          <div>
            <div>
              <FormPaymentProgram />
            </div>
            <div className={'flex justify-end'}>
              <button
                className={'btn-prev m-1'}
                onClick={() => setShowPanel(false)}
              >
                Atras
              </button>
              <button className={'btn m-1'} onClick={closeDialog}>
                Guardar
              </button>
            </div>
          </div>
        )}
      </PaymentFormProvider>
    </Dialog>
  );
};
