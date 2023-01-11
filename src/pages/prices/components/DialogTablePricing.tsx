import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { FormDataProgram } from './FormDataProgram';
import { FormPaymentProgram } from './FormPaymentProgram';

type PropsDialog = {
  open: boolean,
  setOpen: (value: boolean) => void;
}
export const DialogTablePricing = (props: PropsDialog) => {

  const [showPanel, setShowPanel] = useState(false);

  return (
    <Dialog
      visible={props.open}
      header={
        'Crear tabla de precios'
      }

      draggable={false}
      resizable={false}
      modal
      className='p-fluid'
      onHide={() => props.setOpen(false)}
    >
      {!showPanel ?
        <div>
          <FormDataProgram setOpen={props.setOpen} setShowPanel={setShowPanel} />
        </div> :
        <div>
          {/* Forma de pago*/}
          <div>
            <FormPaymentProgram />
          </div>
          <div className={'flex justify-end'}>
            <button className={'btn-prev m-1'} onClick={() => setShowPanel(false)}>Atras</button>
            <button className={'btn m-1'} onClick={() => setShowPanel(true)}>Guardar</button>
          </div>

        </div>
      }

    </Dialog>
  );
};

