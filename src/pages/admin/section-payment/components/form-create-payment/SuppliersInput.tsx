import React from 'react';
import { RequiredField } from '../../../../../components';
import {  PropsSuppliersFormTypes } from '../../../../../interfaces';

export const SuppliersInput = ({register, errors} : PropsSuppliersFormTypes) => {
  return (
    <>
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
    </>
  );
};