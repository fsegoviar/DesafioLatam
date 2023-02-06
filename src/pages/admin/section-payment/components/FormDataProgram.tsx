import React from 'react';
import { useDialogCreateLinkHook } from '../context/TableContext';
import { useForm } from 'react-hook-form';
import { UpdateFormPayment } from '../context/PaymentFormContext';

type StepsType = {
  nextStep: (value: boolean) => void;
};

export const FormDataProgram = ({ nextStep }: StepsType) => {
  const { closeDialog } = useDialogCreateLinkHook();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateFormPayment>();

  return (
    <div>
      <form action="">
        <div className={'flex'}>
          <div className={'flex flex-col mx-5 my-2'}>
            <label>Nombre</label>
            <input type="text" />
          </div>
          <div className={'flex flex-col mx-5 my-2'}>
            <label>Programa</label>
            <input type="text" />
          </div>
          <div className={'flex flex-col mx-5 my-2'}>
            <label>Valor del programa</label>
            <input type="text" />
          </div>
        </div>
        <div className={'flex'}>
          <div className={'flex flex-col mx-5 my-2'}>
            <label>Descuento cuotas (%)</label>
            <input type="text" />
          </div>
          <div className={'flex flex-col mx-5 my-2'}>
            <label>Descuento anticipado (%)</label>
            <input type="text" />
          </div>
          <div className={'flex flex-col mx-5 my-2'}>
            <label>Matricula</label>
            <input type="text" />
          </div>
        </div>
        <div className={'flex w-full'}>
          <div className={'flex flex-col mx-5 my-2 w-full'}>
            <label>Motivo del descuento</label>
            <textarea className={'border-2 border-black w-full'} rows={3} />
          </div>
        </div>
      </form>

      <div className={'flex justify-end mt-5'}>
        <button className={'btn-prev m-1'} onClick={closeDialog}>
          Cerrar
        </button>
        <button className={'btn m-1'} onClick={() => nextStep(true)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};
