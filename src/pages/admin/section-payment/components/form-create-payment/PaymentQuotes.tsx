import React, { useState } from 'react';
import {  PropsPaymentFormTypes } from '../../../../../interfaces';
import { RequiredField } from '../../../../../components';

export const PaymentQuotes = ({
  register,
  errors,
  watch
}: PropsPaymentFormTypes) => {
  const [checkPaymentQuotes, setcheckPaymentQuotes] = useState(true);

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

  return (
    <>
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
              errors.payment_methods && errors.payment_methods[0]?.quotes_value
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
              errors.payment_methods && errors.payment_methods[0]?.free_discount
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
    </>
  );
};
