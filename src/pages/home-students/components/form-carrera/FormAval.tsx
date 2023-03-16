import React, { useState } from 'react';
import { GetIdentityTypes } from '../../../../services';

type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
};
export const FormAval = (props: PropsFormUser) => {
  const { indentityTypes } = GetIdentityTypes();
  const [isBilling, setIsBilling] = useState(true);

  const prevStep = () => {
    props.setCurrentStep(props.currentStep - 1);
  };

  /*
  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };
*/

  return (
    <form className={'mt-10'}>
      <div className="my-5 flex justify-center">
        <div className="mt-1 mx-5">
          <input
            type="radio"
            name="tipo"
            id="si"
            checked={!isBilling}
            onChange={() => setIsBilling(false)}
          />
          <label htmlFor="si" className="ml-1">
            Tengo Aval
          </label>
        </div>
        <div className="mt-1 mx-5">
          <input
            type="radio"
            name="tipo"
            id="no"
            checked={isBilling}
            onChange={() => setIsBilling(true)}
          />
          <label htmlFor="no" className="ml-1">
            No tengo Aval
          </label>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-4">
        <div className="col-span-2 flex flex-col">
          <label>Nombre Aval</label>
          <input type="text" />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Apellidos Aval</label>
          <input type="text" />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-4 mt-5">
        <div className="col-span-2 flex flex-col">
          <label>Dirección</label>
          <input type="text" />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Número de teléfono</label>
          <input type="text" />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-4 mt-5">
        <div className="col-span-2  flex flex-col">
          <label>Tipo de Identificación</label>
          <select
            name=""
            id=""
            className="w-full p-1.5 border-2 rounded-lg border-black"
          >
            <option value="" disabled>
              Seleccionar
            </option>
            {indentityTypes &&
              indentityTypes.map((niv, index) => (
                <option key={index} value={niv.id}>
                  {niv.description}
                </option>
              ))}
          </select>
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Número de identificación</label>
          <input type="number" />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-4 mt-5">
        <div className="col-span-4 flex flex-col">
          <label>Liquidaciones de Renta</label>
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 dark:border-neutral-600 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 dark:text-neutral-200 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 dark:file:bg-neutral-700 file:px-3 file:py-[0.32rem] file:text-neutral-700 dark:file:text-neutral-100 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
            type="file"
            id="formFileMultiple"
            multiple
          />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-4 mt-5">
        <div className="col-span-4 flex flex-col">
          <label>Historial Crediticio (Dicom, Buró Crédito)</label>
          <div className={'flex my-4'}>
            <div className="mt-1 mx-5">
              <input type="radio" name="tipo" id="si" />
              <label htmlFor="si" className="ml-1">
                Sí
              </label>
            </div>
            <div className="mt-1 mx-5">
              <input type="radio" name="tipo" id="no" />
              <label htmlFor="no" className="ml-1">
                No
              </label>
            </div>
          </div>
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 dark:border-neutral-600 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 dark:text-neutral-200 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 dark:file:bg-neutral-700 file:px-3 file:py-[0.32rem] file:text-neutral-700 dark:file:text-neutral-100 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
            type="file"
            id="formFileMultiple"
            multiple
          />
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button className="btn-prev m-1" onClick={() => prevStep()}>
          Atras
        </button>
        <button className="btn m-1" type="submit">
          Siguiente
        </button>
      </div>
    </form>
  );
};
