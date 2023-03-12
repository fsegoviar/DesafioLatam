import React, { useState } from 'react';
import { useDialogCreateLinkHook } from '../context/TableContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { initialValue } from '../context/PaymentFormContext';
import {
  Career,
  Currency,
  FormPaymentType,
  SupplierId
} from '../../../../interfaces';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { GetCareers, GetCurrencies } from '../../../../services';
import '../payment-styles.css';
import axios, { AxiosError } from 'axios';

export const FormDataProgram = () => {
  const { closeDialog } = useDialogCreateLinkHook();
  const { currencies } = GetCurrencies();
  const [selectedCareers, setSelectedCareers] = useState<Career>(null!);
  const { careers } = GetCareers();
  const [cashType, setCashType] = useState<Currency>(null!);
  //Estados para metodos de pago
  const [checkPaymentQuotes, setcheckPaymentQuotes] = useState(true);
  const [checkPrepaid, setCheckPrepaid] = useState(true);
  const [checkISA, setCheckISA] = useState(true);
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors }
  } = useForm<FormPaymentType>({
    defaultValues: { ...initialValue }
  });

  const onSubmit: SubmitHandler<FormPaymentType> = (data) => {
    data.currency_id = cashType.id;
    data.career_id = Number(selectedCareers.id);

    if (checkPaymentQuotes) data.payment_methods.splice(0, 1);
    if (checkPrepaid) data.payment_methods.splice(0, 1);
    let suppliers: SupplierId[] = [];

    suppliers = getValues('payment_methods').map((v: any) => {
      return { supplier_id: v };
    });

    data.suppliers = suppliers;

    console.log('Data form =>', data);

    // // data = { ...data, payment_methods: suppliers };

    // console.log('Data a ingresar =>', data);

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
  };

  const RequiredField = () => {
    return <span className="text-red-500 text-[12px]">Campo Requerido</span>;
  };

  const getTotalValueQuotes = () => {
    if (
      watch('payment_methods.0.reference_value') &&
      watch('payment_methods.0.free_discount')
    ) {
      return Math.round(
        Number(watch('payment_methods.0.reference_value')) -
          (Number(watch('payment_methods.0.free_discount')) / 100) *
            Number(watch('payment_methods.0.reference_value'))
      );
    }
    return 0;
  };

  const getTotalValuePrepaid = () => {
    if (
      watch('payment_methods.1.reference_value') &&
      watch('payment_methods.1.advance_discount')
    ) {
      return Math.round(
        Number(watch('payment_methods.1.reference_value')) -
          (Number(watch('payment_methods.1.advance_discount')) / 100) *
            Number(watch('payment_methods.1.reference_value'))
      );
    }
    return 0;
  };

  const getTotalValueIsa = () => {
    if (
      watch('payment_methods.2.isa_value') &&
      watch('payment_methods.2.isa_percent')
    ) {
      return Math.round(
        Number(watch('payment_methods.2.isa_value')) -
          (Number(watch('payment_methods.2.isa_percent')) / 100) *
            Number(watch('payment_methods.2.isa_value'))
      );
    }
    return 0;
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="py-3 font-bold">Datos Principales</p>
        <hr className="py-3" />
        {/* Datos Principales */}
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
        {/* Formas de Pago */}
        <p className="font-bold text-xl py-3">Formas de pago</p>
        <hr className="py-3" />
        <label className="mx-2">
          <input
            type="checkbox"
            value={'Pago Cuota'}
            onChange={() => setcheckPaymentQuotes(!checkPaymentQuotes)}
          />{' '}
          <span className="font-bold text-lg">Pago en cuotas</span>
        </label>
        <div className={'grid grid-rows-1 grid-flow-col gap-4'}>
          <div className={'flex flex-col'}>
            <label>Valor de referencia</label>
            <input
              type="text"
              disabled={checkPaymentQuotes}
              {...register(`payment_methods.0.reference_value`, {
                required: !checkPaymentQuotes ?? true,
                valueAsNumber: true
              })}
              className={
                errors.name
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {(() => {
              if (
                errors.payment_methods &&
                errors.payment_methods[0]?.reference_value &&
                !checkPaymentQuotes
              )
                return <RequiredField />;
            })()}
          </div>
          <div className={'flex flex-col '}>
            <label>Número de cuotas</label>
            <input
              type="number"
              disabled={checkPaymentQuotes}
              {...register(`payment_methods.0.quotes`, {
                required: !checkPaymentQuotes ?? true,
                valueAsNumber: true
              })}
              className={
                errors.payment_methods && errors.payment_methods[0]?.quotes
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {(() => {
              if (
                errors.payment_methods &&
                errors.payment_methods[0]?.quotes &&
                !checkPaymentQuotes
              )
                return <RequiredField />;
            })()}
          </div>

          <div className={'flex flex-col '}>
            <label>Valor por cuota</label>
            <input
              type="number"
              disabled={checkPaymentQuotes}
              {...register(`payment_methods.0.quotes_value`, {
                required: !checkPaymentQuotes ?? true,
                valueAsNumber: true
              })}
              className={
                errors.payment_methods &&
                errors.payment_methods[0]?.quotes_value
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {(() => {
              if (
                errors.payment_methods &&
                errors.payment_methods[0]?.quotes_value &&
                !checkPaymentQuotes
              )
                return <RequiredField />;
            })()}
          </div>
          <div className={'flex flex-col'}>
            <label>Descuento cuotas (%)</label>
            <input
              type="number"
              disabled={checkPaymentQuotes}
              {...register(`payment_methods.0.free_discount`, {
                required: !checkPaymentQuotes ?? true,
                valueAsNumber: true
              })}
              className={
                errors.payment_methods &&
                errors.payment_methods[0]?.free_discount
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {(() => {
              if (
                errors.payment_methods &&
                errors.payment_methods[0]?.free_discount &&
                !checkPaymentQuotes
              )
                return <RequiredField />;
            })()}
          </div>
          <div className={'flex flex-col'}>
            <label>Total</label>
            <input
              type="number"
              disabled
              className={'py-1 rounded-lg '}
              value={getTotalValueQuotes()}
              readOnly
            />
          </div>
        </div>
        {/* Pago Anticipado */}
        <div className="my-5">
          <label className="mx-2">
            <input
              type="checkbox"
              value={'Anticipado'}
              onChange={() => setCheckPrepaid(!checkPrepaid)}
            />{' '}
            <span className="font-bold text-lg">Pago Anticipado</span>
          </label>
          <div className={'grid grid-rows-1 grid-flow-col gap-4'}>
            <div className={'flex flex-col'}>
              <label>Valor de referencia</label>
              <input
                type="text"
                disabled={checkPrepaid}
                {...register(`payment_methods.1.reference_value`, {
                  required: !checkPrepaid ?? true,
                  valueAsNumber: true
                })}
                className={
                  errors.payment_methods &&
                  errors.payment_methods[1]?.reference_value
                    ? 'border-red-500 py-1 rounded-lg'
                    : 'py-1 rounded-lg '
                }
              />
              {(() => {
                if (
                  errors.payment_methods &&
                  errors.payment_methods[1]?.reference_value &&
                  !checkPrepaid
                )
                  return <RequiredField />;
              })()}
            </div>
            <div className={'flex flex-col '}>
              <label>Descuento anticipado (%)</label>
              <input
                type="number"
                disabled={checkPrepaid}
                {...register(`payment_methods.1.advance_discount`, {
                  required: !checkPrepaid ?? true,
                  valueAsNumber: true
                })}
                className={
                  errors.payment_methods &&
                  errors.payment_methods[1]?.advance_discount
                    ? 'border-red-500 py-1 rounded-lg'
                    : 'py-1 rounded-lg '
                }
              />
              {(() => {
                if (
                  errors.payment_methods &&
                  errors.payment_methods[1]?.advance_discount &&
                  !checkPrepaid
                )
                  return <RequiredField />;
              })()}
            </div>
            <div className={'flex flex-col'}>
              <label>Total</label>
              <input
                type="number"
                disabled
                className={'py-1 rounded-lg '}
                value={getTotalValuePrepaid()}
                readOnly
              />
            </div>
          </div>
        </div>
        {/* Pago ISA */}
        <label className="mx-2">
          <input
            type="checkbox"
            value={'ISA'}
            onChange={() => setCheckISA(!checkISA)}
          />{' '}
          <span className="font-bold text-lg">Pago en ISA</span>
        </label>
        <div className={'grid grid-rows-1 grid-flow-col gap-4'}>
          <div className={'flex flex-col '}>
            <label>Valor ISA</label>
            <input
              type="number"
              disabled={checkISA}
              {...register(`payment_methods.2.isa_value`, {
                required: !checkISA ?? true,
                valueAsNumber: true
              })}
              className={
                errors.payment_methods && errors.payment_methods[2]?.isa_value
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {(() => {
              if (
                errors.payment_methods &&
                errors.payment_methods[2]?.isa_value &&
                !checkISA
              )
                return <RequiredField />;
            })()}
          </div>
          <div className={'flex flex-col '}>
            <label>Descuento ISA (%)</label>
            <input
              type="number"
              disabled={checkISA}
              {...register(`payment_methods.2.isa_percent`, {
                required: !checkISA ?? true,
                valueAsNumber: true
              })}
              className={
                errors.payment_methods && errors.payment_methods[2]?.isa_percent
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {(() => {
              if (
                errors.payment_methods &&
                errors.payment_methods[2]?.isa_percent &&
                !checkISA
              )
                return <RequiredField />;
            })()}
          </div>
          <div className={'flex flex-col '}>
            <label>Total</label>
            <input
              type="number"
              disabled
              className={'py-1 rounded-lg '}
              value={getTotalValueIsa()}
              readOnly
            />{' '}
          </div>
        </div>
        {/* Comentarios */}
        <div className={'grid pt-5'}>
          <div className={'flex flex-col '}>
            <label>Motivo del descuento</label>
            <textarea
              rows={3}
              {...register('comment', { required: true })}
              className={
                errors.comment
                  ? 'border-red-500  w-full border-2 rounded-lg p-3'
                  : 'border-2 border-black w-full rounded-lg p-3'
              }
            />
            {errors.comment && <RequiredField />}
          </div>
        </div>
        {/* Metodos de pago */}
        <p className="py-3 font-bold"> Métodos de Pago</p>
        <div>
          <label className="mx-2">
            <input
              type="checkbox"
              value={'3'}
              {...register('suppliers', {
                required: true
              })}
            />
            Transbank
          </label>
          <label className="mx-2">
            <input
              type="checkbox"
              value={'2'}
              {...register('suppliers', {
                required: true
              })}
            />{' '}
            Paypal
          </label>
          <label className="mx-2">
            <input
              type="checkbox"
              value={'1'}
              {...register('suppliers', { required: true })}
            />{' '}
            Flow
          </label>
          <label className="mx-2">
            <input
              type="checkbox"
              value={'4'}
              {...register('suppliers', { required: true })}
            />{' '}
            Otro medio de pago
          </label>
          {errors.suppliers && (
            <div>
              <RequiredField />
            </div>
          )}
        </div>
        {/* Botones de acción */}
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
    </div>
    // <div className="w-full">
    //   <form onSubmit={handleSubmit(onSubmit)}>

    //   </form>
    // </div>
  );
};
