import React, { useState } from 'react';
import { useDialogCreateLinkHook } from '../context/TableContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { initialValue } from '../context/PaymentFormContext';
import { UseFormPayment } from '../hooks/useFormPayment';
import { Career, FormPaymentType } from '../../../../interfaces';
import { Dropdown } from 'primereact/dropdown';
import { GetCareers } from '../../../../services';

type StepsType = {
  nextStep: (value: boolean) => void;
};

const mockDataCash = [
  {
    id: 1,
    name: 'CLP'
  },
  {
    id: 2,
    name: 'MXN'
  },
  {
    id: 3,
    name: 'USD'
  },
  {
    id: 4,
    name: 'COL'
  },
  {
    id: 5,
    name: 'SOL'
  }
];

export const FormDataProgram = ({ nextStep }: StepsType) => {
  const { closeDialog } = useDialogCreateLinkHook();
  const { updateForm } = UseFormPayment();
  const [selectedCareers, setSelectedCareers] = useState<Career>(null!);
  const { careers } = GetCareers();
  const [cashType, setCashType] = useState('');
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<FormPaymentType>({
    defaultValues: { ...initialValue }
  });

  const onSubmit: SubmitHandler<FormPaymentType> = (data) => {
    updateForm(data);
    //* Almaceno la data del formulario
    // Todo : Falta agregar los tipos de la tabla de precios

    nextStep(true);
  };

  const handleChangeCareer = async (value: Career) => {
    console.log('Value change career =>', value);
    setSelectedCareers(value);

    setValue('career_id', value.id);
  };

  const RequiredField = () => {
    return <span className="text-red-500 text-[12px]">Campo Requerido</span>;
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-rows-1 grid-flow-col gap-4">
          <div className="flex flex-col">
            <label>Nombre</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-3 rounded-lg'
                  : 'py-3 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
          <div className="flex flex-col">
            <label>Tipo de moneda</label>
            <Dropdown
              value={cashType}
              options={mockDataCash}
              onChange={(e) => setCashType(e.value)}
              optionLabel="name"
              placeholder="Seleccionar Moneda"
              className="w-full md:w-14rem"
            />
            {errors.name && <RequiredField />}
          </div>
          <div className="flex flex-col">
            <label>Valor del programa (USD)</label>
            <input
              type="text"
              {...register('value', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-3 rounded-lg'
                  : 'py-3 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <div className={'grid grid-rows-1 grid-flow-col gap-4 mt-5'}>
          <div className={'flex flex-col'}>
            <label>Descuento cuotas (%)</label>
            <input
              type="text"
              {...register('advance_discount', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-3 rounded-lg'
                  : 'py-3 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col '}>
            <label>Descuento anticipado (%)</label>
            <input
              type="text"
              {...register('free_discount', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-3 rounded-lg'
                  : 'py-3 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col'}>
            <label>Matricula (USD)</label>
            <input
              type="text"
              {...register('tuition', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-3 rounded-lg'
                  : 'py-3 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <div className={'grid grid-rows-1 grid-flow-col gap-4 mt-5'}>
          <div className="flex flex-col">
            <label>Programa</label>
            <Dropdown
              value={selectedCareers}
              options={careers}
              onChange={(e) => handleChangeCareer(e.value)}
              optionLabel="description"
              filter
              placeholder="Seleccionar Curso"
              className="w-full md:w-14rem"
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <div className={'grid pt-5'}>
          <div className={'flex flex-col '}>
            <label>Motivo del descuento</label>
            <textarea
              rows={3}
              {...register('comments', { required: true })}
              className={
                errors.name
                  ? 'border-red-500  w-full border-2 rounded-lg p-3'
                  : 'border-2 border-black w-full rounded-lg p-3'
              }
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <div className={'flex justify-end mt-5'}>
          <button
            className="m-1 px-5 rounded-lg text-white bg-gray-500"
            style={{ border: '3px solid gray' }}
            onClick={closeDialog}
          >
            Cancelar
          </button>
          <button
            className="m-1 px-5 rounded-lg text-white bg-green-500"
            style={{ border: '3px solid rgb(34 197 94)' }}
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};
