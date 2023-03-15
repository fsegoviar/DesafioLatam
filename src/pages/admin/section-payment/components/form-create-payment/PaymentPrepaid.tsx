import React, { useState } from 'react';
import { PropsPaymentFormTypes } from '../../../../../interfaces';
import { RequiredField } from '../../../../../components';

export const PaymentPrepaid = ({ register, errors, watch }: PropsPaymentFormTypes) => {
  const [checkPrepaid, setCheckPrepaid] = useState(true);

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

  return (
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
  );
};