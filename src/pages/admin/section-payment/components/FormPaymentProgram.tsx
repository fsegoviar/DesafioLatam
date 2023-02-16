import { useState } from 'react';
import { UseFormPayment } from '../hooks/useFormPayment';
import { GetFormsPayments } from '../../../../services';
import { PaymentMethod, SupplierType } from '../../../../interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import axios, { AxiosError } from 'axios';

type FormPaymentProgramType = {
  close: () => void;
  closeModal: () => void;
};

export const FormPaymentProgram = (props: FormPaymentProgramType) => {
  const { updateForm, state } = UseFormPayment();
  const { paymentForms } = GetFormsPayments();
  const [selectedPaymentForm, setSelectedPaymentForm] = useState<SupplierType>(
    null!
  );
  const {
    handleSubmit,
    register,
    setValue,
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

  const handleChangePaymentForm = (data: SupplierType) => {
    setValue('supplier_id', data.id);
    setSelectedPaymentForm(data);
  };

  const RequiredField = () => {
    return <span className="text-red-500 text-[12px]">Campo Requerido</span>;
  };

  return (
    <div className="relative overflow-x-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tipo
              </th>
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td>
                <input
                  type="text"
                  {...register('discount')}
                  className={
                    errors.discount
                      ? 'border-red-500 py-3 rounded-lg'
                      : 'py-3 rounded-lg '
                  }
                />
                {errors.discount && <RequiredField />}
              </td>
              <td className="px-6 py-4">
                <Dropdown
                  value={selectedPaymentForm}
                  options={paymentForms}
                  onChange={(e) => handleChangePaymentForm(e.value)}
                  optionLabel="description"
                  placeholder="Seleccionar Curso"
                  className="w-full md:w-14rem"
                />
                {errors.supplier_id && <RequiredField />}
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
              {/* <td className="px-6 py-4 flex justify-center">
              <div
                className={
                  'bg-green-500 flex justify-center items-center rounded-full w-8 h-8'
                }
              >
                <TiPlus size={24} className={'text-white'} />
              </div>
            </td> */}
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
