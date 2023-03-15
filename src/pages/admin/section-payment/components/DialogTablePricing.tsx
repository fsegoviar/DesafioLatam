import { Dialog } from 'primereact/dialog';
import { useDialogCreateLinkHook } from '../context/TableContext';
import {
  PaymentFormProvider,
  initialValue
} from '../context/PaymentFormContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormPaymentType } from '../../../../interfaces';
import React from 'react';
import {
  PaymentISA,
  PaymentPrepaid,
  PrincipalInputs,
  SuppliersInput
} from './form-create-payment';
import { PaymentQuotes } from './form-create-payment/PaymentQuotes';
import { RequiredField } from '../../../../components';

export const DialogTablePricing = () => {
  const { isOpenDialog, closeDialog } = useDialogCreateLinkHook();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormPaymentType>({
    defaultValues: { ...initialValue }
  });

  const onSubmit: SubmitHandler<FormPaymentType> = (data) => {
    console.log('DATA => ', data);
  };

  return (
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="py-3 font-bold">Datos Principales</p>
          <hr className="py-3" />
          <PrincipalInputs register={register} errors={errors} setValue={setValue} />
          <p className="font-bold text-xl py-3">Formas de pago</p>
          <hr className="py-3" />
          <PaymentQuotes register={register} errors={errors} watch={watch} />
          <PaymentPrepaid register={register} errors={errors} watch={watch} />
          <PaymentISA register={register} errors={errors} watch={watch} />
          {/* Comentarios */}
          <div className={'grid pt-5'}>
            <div className={'flex flex-col '}>
              <label>Motivo del descuento</label>
              <textarea
                rows={3}
                {...register('comments', { required: true })}
                className={
                  errors.comments
                    ? 'border-red-500  w-full border-2 rounded-lg p-3'
                    : 'border-2 border-black w-full rounded-lg p-3'
                }
              />
              {errors.comments && <RequiredField />}
            </div>
          </div>
          <SuppliersInput register={register} errors={errors} />
          <div className={'flex justify-end mt-5'}>
            <button
              className="m-1 px-5 rounded-lg text-white bg-gray-500"
              style={{ border: '3px solid gray' }}
              onClick={closeDialog}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="m-1 px-5 rounded-lg text-white bg-green-500"
              style={{ border: '3px solid rgb(34 197 94)' }}
            >
              Crear
            </button>
          </div>
        </form>
      </PaymentFormProvider>
    </Dialog>
  );
};
