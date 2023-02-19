// import { useState } from 'react';
import { UseFormPayment } from '../hooks/useFormPayment';
// import { GetFormsPayments } from '../../../../services';
import { PaymentMethod } from '../../../../interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Tooltip } from 'primereact/tooltip';

type FormPaymentProgramType = {
  close: () => void;
  closeModal: () => void;
};

export const FormPaymentProgram = (props: FormPaymentProgramType) => {
  const { updateForm, state } = UseFormPayment();
  // const { paymentForms } = GetFormsPayments();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<PaymentMethod>();

  const onSubmit: SubmitHandler<PaymentMethod> = (data) => {
    let newState = state;
    newState.payment_methods = [data];
    console.log('NewState =>', newState);
    updateForm(newState);

    axios
      .post(`${process.env.REACT_APP_API_BACKEND}/prices`, newState, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        console.log('Response Price =>', response.data);
      })
      .catch((error: AxiosError) => {
        console.log('Error Price =>', error);
      })
      .finally(props.closeModal);
  };

  // const handleChangePaymentForm = (data: SupplierType) => {
  //   setValue('supplier_id', data.id);
  // };

  const RequiredField = () => {
    return <span className="text-red-500 text-[12px]">Campo Requerido</span>;
  };

  return (
    <div className="relative overflow-x-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-5 pb-3">
          <Tooltip target=".custom-target-icon" />
          <BsFillInfoCircleFill
            size={24}
            className="custom-target-icon"
            data-pr-tooltip="Marca la casilla para habilitar cada forma de pago."
            data-pr-position="right"
            data-pr-at="right+5 top"
            data-pr-my="left center-2"
          />
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Proveedor
              </th>
              <th scope="col" className="px-6 py-3">
                Matricula
              </th>
              <th scope="col" className="px-6 py-3">
                # Cuotas
              </th>
              <th scope="col" className="px-6 py-3">
                Valor Cuota
              </th>
              <th scope="col" className="px-6 py-3">
                Arancel total
              </th>
              {/* <th scope="col" className="px-6 py-3">
              Descuento
            </th> */}
            </tr>
          </thead>
          <tbody>
            {/* Transbank */}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6">
                <div className="">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  placeholder="Transbank"
                  readOnly
                  {...register('tuition')}
                  className={
                    errors.tuition
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  {...register('tuition')}
                  className={
                    errors.tuition
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.tuition && <RequiredField />}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  {...register('quotes')}
                  className={
                    errors.quotes
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.quotes && <RequiredField />}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  {...register('quotes_value')}
                  className={
                    errors.quotes_value
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.quotes_value && <RequiredField />}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  {...register('full_value')}
                  className={
                    errors.full_value
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.full_value && <RequiredField />}
              </td>
            </tr>
            {/* Paypal */}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6">
                <div className="">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  placeholder="Paypal"
                  readOnly
                  {...register('tuition')}
                  className={
                    errors.tuition
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  {...register('tuition')}
                  className={
                    errors.tuition
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.tuition && <RequiredField />}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  {...register('quotes')}
                  className={
                    errors.quotes
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.quotes && <RequiredField />}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  {...register('quotes_value')}
                  className={
                    errors.quotes_value
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.quotes_value && <RequiredField />}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  {...register('full_value')}
                  className={
                    errors.full_value
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.full_value && <RequiredField />}
              </td>
            </tr>
            {/* Flow */}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6">
                <div className="">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  placeholder="Flow"
                  readOnly
                  {...register('tuition')}
                  className={
                    errors.tuition
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  {...register('tuition')}
                  className={
                    errors.tuition
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.tuition && <RequiredField />}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  {...register('quotes')}
                  className={
                    errors.quotes
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.quotes && <RequiredField />}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  {...register('quotes_value')}
                  className={
                    errors.quotes_value
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.quotes_value && <RequiredField />}
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  {...register('full_value')}
                  className={
                    errors.full_value
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.full_value && <RequiredField />}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-5  w-full flex justify-end">
          <button
            className="m-1 px-5 rounded-lg text-white bg-gray-500"
            style={{ border: '3px solid gray' }}
            onClick={() => props.close()}
          >
            Regresar
          </button>
          <button
            type="submit"
            className="m-1 px-5 rounded-lg text-white bg-green-500"
            style={{ border: '3px solid rgb(34 197 94)' }}
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
