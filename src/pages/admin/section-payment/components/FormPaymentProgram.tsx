import { TiPlus } from 'react-icons/ti';

export const FormPaymentProgram = () => {
  return (
    <div className="relative overflow-x-auto">
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
            <th scope="col" className="px-6 py-3">
              Descuento
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <input type="text" />
            </th>
            <td className="px-6 py-4">
              <input type="text" />
            </td>
            <td className="px-6 py-4">
              <input type="text" />
            </td>
            <td className="px-6 py-4">
              <input type="text" />
            </td>
            <td className="px-6 py-4">
              <input type="text" />
            </td>
            <td className="px-6 py-4">
              <input type="text" />
            </td>
            <td className="px-6 py-4 flex justify-center">
              <div
                className={
                  'bg-green-500 flex justify-center items-center rounded-full w-8 h-8'
                }
              >
                <TiPlus size={24} className={'text-white'} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
