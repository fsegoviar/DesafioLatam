import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react';
import {
  PaymentFormProvider,
  initialValue
} from '../context/PaymentFormContext';
import { FormDataEditPrice } from './FormDataEditPrice';
import { useDialogEditPriceHook } from '../context/TableContext';
import { FormDataEditPayment } from './FormDataEditPayment';
import axios, { AxiosError } from 'axios';

type PropsDialog = {
  id: number;
};

export const DialogEditPricing = ({ id }: PropsDialog) => {
  const { isOpenDialogEdit, closeDialogEdit } = useDialogEditPriceHook();
  const [showPanel, setShowPanel] = useState<boolean>(false);
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
          <>Cargando...</>
        ) : (
          <>
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
          </>
        )}
      </PaymentFormProvider>
    </Dialog>
  );
};
