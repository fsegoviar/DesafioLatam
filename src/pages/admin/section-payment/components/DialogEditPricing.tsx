import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react';
import {
  PaymentFormProvider,
  initialValue
} from '../context/PaymentFormContext';
import { FormDataEditPrice } from './FormDataEditPrice';
import { useDialogEditPriceHook } from '../context/TableContext';
import axios, { AxiosError } from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';

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
  const [data, setData] = useState(null!);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_BACKEND}/prices/${id}`, {
          headers: {
            Accept: 'application/json'
          }
        })
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error: AxiosError) => console.log('Error =>', error))
        .finally(() => setLoading(false));
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
        {loading ? (
          <div className="absolute top-0 left-0 w-full h-full bg-white z-10 grid place-items-center rounded-xl">
            <div className="flex flex-col items-center">
              <ProgressSpinner />
              <h1>Cargando..</h1>
            </div>
          </div>
        ) : (
          <>
            <FormDataEditPrice
              actionToast={actionToast}
              isLoad={setLoading}
              addData={addData}
              data={data}
            />
          </>
        )}
      </PaymentFormProvider>
    </Dialog>
  );
};
