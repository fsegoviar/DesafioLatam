import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormPaymentType, PaymentType } from '../../../../interfaces';
import { useDialogEditPriceHook } from '../context/TableContext';
import { UseFormPayment } from '../hooks/useFormPayment';
import axios, { AxiosError } from 'axios';

type PropsEditPrice = {
  data: FormPaymentType;
  nextStep: (value: boolean) => void;
};

export const FormDataEditPrice = (props: PropsEditPrice) => {
  const { closeDialogEdit } = useDialogEditPriceHook();
  const { updateForm } = UseFormPayment();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<PaymentType>({
    defaultValues: { ...props.data }
  });

  const onSubmit: SubmitHandler<PaymentType> = (data) => {
    console.log('Edit =>', data);
    updateForm(data);
    //* Almaceno la data del formulario
    // Todo: Falta agregar los tipos de la tabla de precios
    axios
      .post(`${process.env.REACT_APP_API_BACKEND}/prices/${data.id}`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        console.log('Response Price =>', response.data);
        closeDialogEdit();
      })
      .catch((error: AxiosError) => {
        console.log('Error Price =>', error);
      });
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
          <button className={'btn-prev m-1'} onClick={closeDialogEdit}>
            Cerrar
          </button>
          <button type="submit" className={'btn m-1'}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
