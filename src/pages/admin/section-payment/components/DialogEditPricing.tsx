import { Dialog } from 'primereact/dialog';
import React from 'react';
import {
  PaymentFormProvider,
  initialValue
} from '../context/PaymentFormContext';
import { FormDataEditPrice } from './FormDataEditPrice';
import { useDialogEditPriceHook } from '../context/TableContext';
import { FormPaymentType } from '../../../../interfaces';

export const DialogEditPricing = (data: FormPaymentType) => {
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
        <FormDataEditPrice {...data} />
      </PaymentFormProvider>
    </Dialog>
  );
};
