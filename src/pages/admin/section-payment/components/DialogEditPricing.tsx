import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';
import {
  PaymentFormProvider,
  initialValue
} from '../context/PaymentFormContext';
import { FormDataEditPrice } from './FormDataEditPrice';
import { useDialogEditPriceHook } from '../context/TableContext';
import { FormPaymentType } from '../../../../interfaces';
import { FormDataEditPayment } from './FormDataEditPayment';

export const DialogEditPricing = (data: FormPaymentType) => {
  const { isOpenDialogEdit, closeDialogEdit } = useDialogEditPriceHook();
  const [showPanel, setShowPanel] = useState<boolean>(false);

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
        {!showPanel ? (
          <>
            <FormDataEditPrice nextStep={setShowPanel} data={data} />
          </>
        ) : (
          <>
            <FormDataEditPayment
              data={data}
              closeModal={() => closeDialogEdit()}
              close={() => setShowPanel(false)}
            />
          </>
        )}
      </PaymentFormProvider>
    </Dialog>
  );
};
