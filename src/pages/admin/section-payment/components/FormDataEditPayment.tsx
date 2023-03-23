import { useState } from 'react';
import {
  FormEditPayment,
  FormPaymentType,
  PaymentMethod
} from '../../../../interfaces';
import { UseFormPayment } from '../hooks/useFormPayment';
import axios, { AxiosError } from 'axios';
import { Tooltip } from 'primereact/tooltip';
import { BsFillInfoCircleFill } from 'react-icons/bs';

type FormPaymentProgramType = {
  data: FormEditPayment;
  close: () => void;
  closeModal: () => void;
};

export const FormDataEditPayment = (props: FormPaymentProgramType) => {
  const { state } = UseFormPayment();
  const [checkTransbank, setCheckTransbank] = useState(false);
  // const [supplierTransbank, setSupplierTransbank] = useState<PaymentMethod>();
  // () => {
  //   for (const supplier of props.data.suppliers) {
  //     if (supplier.description === 'Transbank') {
  //       setCheckTransbank(true);
  //       return {
  //         tuition: supplier.pivot.tuition,
  //         discount: supplier.pivot.discount,
  //         full_value: supplier.pivot.full_value,
  //         quotes: supplier.pivot.quotes,
  //         quotes_value: supplier.pivot.quotes_value,
  //         supplier_id: 3
  //       };
  //     }
  //   }

  //   return {
  //     tuition: 0,
  //     discount: 0,
  //     full_value: 0,
  //     quotes: 0,
  //     quotes_value: 0,
  //     supplier_id: 3
  //   };
  // }
  const [checkPaypal, setCheckPaypal] = useState(false);
  const [supplierPaypal] = useState<PaymentMethod>(() => {
    // for (const supplier of props.data.suppliers) {
    //   if (supplier.description === 'Paypal') {
    //     setCheckPaypal(true);
    //     return {
    //       tuition: supplier.pivot.tuition,
    //       discount: supplier.pivot.discount,
    //       full_value: supplier.pivot.full_value,
    //       quotes: supplier.pivot.quotes,
    //       quotes_value: supplier.pivot.quotes_value,
    //       supplier_id: 2
    //     };
    //   }
    // }

    return {
      payment_method_id: null,
      free_discount: null,
      advance_discount: null,
      quotes: null,
      quotes_value: null,
      reference_value: null,
      isa_value: null,
      isa_percent: null
    };
  });
  const [checkFlow, setCheckFlow] = useState(false);
  const [supplierFlow] = useState<PaymentMethod>(() => {
    // for (const supplier of props.data.suppliers) {
    //   if (supplier.description === 'Flow') {
    //     setCheckFlow(true);
    //     return {
    //       tuition: supplier.pivot.tuition,
    //       discount: supplier.pivot.discount,
    //       full_value: supplier.pivot.full_value,
    //       quotes: supplier.pivot.quotes,
    //       quotes_value: supplier.pivot.quotes_value,
    //       supplier_id: 1
    //     };
    //   }
    // }

    return {
      payment_method_id: null,
      free_discount: null,
      advance_discount: null,
      quotes: null,
      quotes_value: null,
      reference_value: null,
      isa_value: null,
      isa_percent: null
    };
  });

  const onSubmit = () => {
    let data: FormPaymentType = state;
    let suppliers: PaymentMethod[] = [];

    console.log('Checked => ', checkTransbank, checkPaypal, checkFlow);
    console.log('Data entrante =>', data);

    // if (checkTransbank) suppliers = [...suppliers, supplierTransbank];

    if (checkPaypal) suppliers = [...suppliers, supplierPaypal];

    if (checkFlow) suppliers = [...suppliers, supplierFlow];

    console.log('Suppliers => ', suppliers);

    data = { ...data, payment_methods: suppliers };

    console.log('Data enviada =>', data);

    axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/prices/${props.data.price.id}`,
        data,
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then((response) => {
        console.log('Response Price =>', response.data);
      })
      .catch((error: AxiosError) => {
        console.log('Error Price =>', error);
      })
      .finally(props.closeModal);
  };

  return (
    <div className="relative overflow-x-auto">
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
                  checked={checkTransbank}
                  onChange={(event) => {
                    setCheckTransbank(event.target.checked);
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </td>
            <td className="px-6 py-4">
              <input
                type="text"
                placeholder="Transbank"
                readOnly
                className={'py-3 rounded-lg '}
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                // value={supplierTransbank.tuition}
                // onChange={(event) =>
                //   setSupplierTransbank({
                //     ...supplierTransbank,
                //     tuition: Number(event.target.value)
                //   })
                // }
                className={'py-3 rounded-lg '}
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                // value={supplierTransbank.quotes}
                // onChange={(event) =>
                //   setSupplierTransbank({
                //     ...supplierTransbank,
                //     quotes: Number(event.target.value)
                //   })
                // }
                className={'py-3 rounded-lg '}
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                // value={supplierTransbank.quotes_value}
                // onChange={(event) =>
                //   setSupplierTransbank({
                //     ...supplierTransbank,
                //     quotes_value: Number(event.target.value)
                //   })
                // }
                className={'py-3 rounded-lg '}
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                // value={supplierTransbank.full_value}
                // onChange={(event) =>
                //   setSupplierTransbank({
                //     ...supplierTransbank,
                //     full_value: Number(event.target.value)
                //   })
                // }
                className={'py-3 rounded-lg '}
              />
            </td>
          </tr>
          {/* Paypal */}
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6">
              <div className="">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  checked={checkPaypal}
                  onChange={(event) => {
                    setCheckPaypal(event.target.checked);
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </td>
            <td className="px-6 py-4">
              <input
                type="text"
                placeholder="Paypal"
                readOnly
                className={'py-3 rounded-lg '}
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                // value={supplierPaypal.tuition}
                // onChange={(event) =>
                //   setSupplierPaypal({
                //     ...supplierPaypal,
                //     tuition: Number(event.target.value)
                //   })
                // }
                className={'py-3 rounded-lg '}
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                // value={supplierPaypal.quotes}
                // onChange={(event) =>
                //   setSupplierPaypal({
                //     ...supplierPaypal,
                //     quotes: Number(event.target.value)
                //   })
                // }
                className={'py-3 rounded-lg '}
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                // value={supplierPaypal.quotes_value}
                // onChange={(event) =>
                //   setSupplierPaypal({
                //     ...supplierPaypal,
                //     quotes_value: Number(event.target.value)
                //   })
                // }
                className={'py-3 rounded-lg '}
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                // value={supplierPaypal.full_value}
                // onChange={(event) =>
                //   setSupplierPaypal({
                //     ...supplierPaypal,
                //     full_value: Number(event.target.value)
                //   })
                // }
                className={'py-3 rounded-lg '}
              />
            </td>
          </tr>
          {/* Flow */}
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6">
              <div className="">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  checked={checkFlow}
                  onChange={(event) => {
                    setCheckFlow(event.target.checked);
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </td>
            <td className="px-6 py-4">
              <input
                type="text"
                placeholder="Flow"
                readOnly
                className={'py-3 rounded-lg '}
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                // value={supplierFlow.tuition}
                // onChange={(event) =>
                //   setSupplierFlow({
                //     ...supplierFlow,
                //     tuition: Number(event.target.value)
                //   })
                // }
                className={'py-3 rounded-lg '}
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                // value={supplierFlow.quotes}
                // onChange={(event) =>
                //   setSupplierFlow({
                //     ...supplierFlow,
                //     quotes: Number(event.target.value)
                //   })
                // }
                className={'py-3 rounded-lg '}
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                // value={supplierFlow.quotes_value}
                // onChange={(event) =>
                //   setSupplierFlow({
                //     ...supplierFlow,
                //     quotes_value: Number(event.target.value)
                //   })
                // }
                className={'py-3 rounded-lg '}
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                // value={supplierFlow.full_value}
                // onChange={(event) =>
                //   setSupplierFlow({
                //     ...supplierFlow,
                //     full_value: Number(event.target.value)
                //   })
                // }
                className={'py-3 rounded-lg '}
              />
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
          onClick={() => onSubmit()}
          className="m-1 px-5 rounded-lg text-white bg-green-500"
          style={{ border: '3px solid rgb(34 197 94)' }}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};