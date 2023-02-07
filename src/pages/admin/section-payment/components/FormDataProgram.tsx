import React from 'react';
import { useDialogCreateLinkHook } from '../context/TableContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { initialValue } from '../context/PaymentFormContext';
import { useFormPayment } from '../hooks/useFormPayment';
import { FormPaymentType } from '../../../../interfaces';
import axios, { AxiosError } from 'axios';

type StepsType = {
  nextStep: (value: boolean) => void;
};

export const FormDataProgram = ({ nextStep }: StepsType) => {
  const { closeDialog } = useDialogCreateLinkHook();
  const { updateForm } = useFormPayment();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormPaymentType>({
    defaultValues: { ...initialValue }
  });

  const onSubmit: SubmitHandler<FormPaymentType> = (data) => {
    updateForm(data);
    //* Almaceno la data del formulario
    // Todo : Falta agregar los tipos de la tabla de precios
    axios
      .post(`${process.env.REACT_APP_API_BACKEND}/prices`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        console.log('Response Price =>', response.data);
      })
      .catch((error: AxiosError) => {
        console.log('Error Price =>', error);
      });
    nextStep(true);
  };

  const RequiredField = () => {
    return <span className="text-red-500 text-[12px]">Campo Requerido</span>;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'flex'}>
          <div className={'flex flex-col mx-5 my-2'}>
            <label>Nombre</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col mx-5 my-2'}>
            <label>Programa</label>
            <input
              type="text"
              {...register('career_id', { required: true })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col mx-5 my-2'}>
            <label>Valor del programa</label>
            <input
              type="text"
              {...register('value', { required: true })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <div className={'flex'}>
          <div className={'flex flex-col mx-5 my-2'}>
            <label>Descuento cuotas (%)</label>
            <input
              type="text"
              {...register('advance_discount', { required: true })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col mx-5 my-2'}>
            <label>Descuento anticipado (%)</label>
            <input
              type="text"
              {...register('free_discount', { required: true })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col mx-5 my-2'}>
            <label>Matricula</label>
            <input
              type="text"
              {...register('tuition', { required: true })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <div className={'flex w-full'}>
          <div className={'flex flex-col mx-5 my-2 w-full'}>
            <label>Motivo del descuento</label>
            <textarea
              rows={3}
              {...register('comments', { required: true })}
              className={
                errors.name
                  ? 'border-red-500  w-full border-2'
                  : 'border-2 border-black w-full'
              }
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <div className={'flex justify-end mt-5'}>
          <button className={'btn-prev m-1'} onClick={closeDialog}>
            Cerrar
          </button>
          <button type="submit" className={'btn m-1'}>
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};
