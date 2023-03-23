import { Dialog } from 'primereact/dialog';
import { useDialogCreateLinkHook } from '../context/TableContext';
import {
  PaymentFormProvider,
  initialValue
} from '../context/PaymentFormContext';
import { FormDataProgram } from './FormDataProgram';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState } from 'react';

type PropsDialogPrice = {
  actionToast: (action: string) => void;
  addData: (data: any) => void;
};

export const DialogTablePricing = ({
  actionToast,
  addData
}: PropsDialogPrice) => {
  const { isOpenDialog, closeDialog } = useDialogCreateLinkHook();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Dialog
        visible={isOpenDialog}
        header={'Crear tabla de precios'}
        draggable={false}
        resizable={false}
        modal
        className="p-fluid w-9/12 relative"
        onHide={closeDialog}
      >
        <PaymentFormProvider {...initialValue}>
          <>
            {loading && (
              <div className="absolute top-0 left-0 w-full h-full bg-white z-10 grid place-items-center rounded-xl">
                <div className="flex flex-col items-center">
                  <ProgressSpinner />
                  <h1>Cargando..</h1>
                </div>
              </div>
            )}
            <FormDataProgram
              actionToast={actionToast}
              isLoad={setLoading}
              addData={addData}
            />
          </>
        </PaymentFormProvider>
      </Dialog>
    </>
  );
};
