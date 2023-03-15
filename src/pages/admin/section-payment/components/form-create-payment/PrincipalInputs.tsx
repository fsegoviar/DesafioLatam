import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Career, Currency, FormPaymentType } from '../../../../../interfaces';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react';
import { RequiredField } from '../../../../../components';
import { GetCareers, GetCurrencies } from '../../../../../services';

type PropsPrincipalTypes = {
  register: UseFormRegister<FormPaymentType>,
  errors: FieldErrors<FormPaymentType>,
  setValue: UseFormSetValue<FormPaymentType>
}
export const PrincipalInputs = ({ register, errors, setValue }: PropsPrincipalTypes) => {

  const { currencies } = GetCurrencies();
  const [selectedCareers, setSelectedCareers] = useState<Career>(null!);
  const { careers } = GetCareers();
  const [cashType, setCashType] = useState<Currency>(null!);


  useEffect(() => {
    if(cashType)
    {
      console.log("CASHTYPE =>", cashType);
      setValue("currency_id", cashType.id)
    }
  }, [cashType, setValue])

  return (
    <div className="grid grid-rows-1 grid-flow-col gap-4">
      <div className="flex flex-col">
        <label>Nombre</label>
        <input
          type="text"
          {...register('name', { required: true })}
          className={
            errors.name
              ? 'border-red-500 py-1 rounded-lg'
              : 'py-1 rounded-lg '
          }
        />
        {errors.name && <RequiredField />}
      </div>
      <div className="flex flex-col">
        <label>Tipo de moneda</label>
        <Dropdown
          value={cashType}
          options={currencies}
          optionLabel="code"
          placeholder="Seleccionar Moneda"
          className="w-full dropdown-form md:w-14rem"
          {...register('currency_id', {
            required: true,
            onChange: (evt: DropdownChangeParams) => {
              if (evt.value.id) setCashType(evt.value);
            }
          })}
        />
        {errors.currency_id && <RequiredField />}
      </div>
      <div className={'flex flex-col'}>
        <label>Matricula</label>
        <input
          type="number"
          {...register('tuition', { required: true, valueAsNumber: true })}
          className={
            errors.tuition
              ? 'border-red-500 py-1 rounded-lg'
              : 'py-1 rounded-lg '
          }
        />
        {errors.tuition && <RequiredField />}
      </div>
      <div className="flex flex-col">
        <label>Programa</label>
        <Dropdown
          value={selectedCareers}
          options={careers}
          optionLabel="description"
          filter
          placeholder="Seleccionar Curso"
          className="w-full dropdown-form md:w-14rem"
          {...register('career_id', {
            required: true,
            onChange: (evt: DropdownChangeParams) => {
              if (evt.value.id) setSelectedCareers(evt.value);
            }
          })}
        />
        {errors.career_id && <RequiredField />}
      </div>
    </div>
  );
};