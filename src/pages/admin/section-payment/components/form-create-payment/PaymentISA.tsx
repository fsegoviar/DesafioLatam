import { PropsPaymentFormTypes } from '../../../../../interfaces';
import React, { useState } from 'react';
import { RequiredField } from '../../../../../components';

export const PaymentISA = ({ register, errors, watch }: PropsPaymentFormTypes) => {
  const [checkISA, setCheckISA] = useState(true);

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
    <>
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
    </>
  );
};