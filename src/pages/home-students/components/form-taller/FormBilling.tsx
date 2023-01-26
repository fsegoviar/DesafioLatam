import React, { useState } from 'react';

type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
};

export const FormBilling = (props: PropsFormUser) => {
  const [isBilling, setIsBilling] = useState(true);

  const prevStep = () => {
    props.setCurrentStep(props.currentStep - 1);
  };

  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col items-center">
        <p className="font-bold text-2xl">Documento a emitir</p>

        <div className="flex justify-center">
          <div className="mt-1 mx-5">
            <input
              type="radio"
              name="tipo"
              id="si"
              checked={!isBilling}
              onChange={() => setIsBilling(false)}
            />
            <label htmlFor="si" className="ml-1">
              Factura
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
              Boleta
            </label>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="grid gap-4 grid-cols-4 ">
          <div className="col-span-2 flex flex-col">
            <label>Tipo Documentos</label>
            <input type="text" disabled={isBilling} />
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Razón Social</label>
            <input type="text" disabled={isBilling} />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-4 ">
          <div className="col-span-2 flex flex-col">
            <label>Rut Empresa</label>
            <input type="text" disabled={isBilling} />
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Giro</label>
            <input type="text" disabled={isBilling} />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 ">
          <div className="col-span-2 flex flex-col">
            <label>Dirección</label>
            <input type="text" disabled={isBilling} />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-4 ">
          <div className="col-span-2 flex flex-col">
            <label>Email Empresa</label>
            <input type="email" disabled={isBilling} />
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Teléfono Empresa</label>
            <input type="text" disabled={isBilling} />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button className="btn-prev m-1" onClick={() => prevStep()}>
          Atras
        </button>
        <button className="btn m-1" type="button" onClick={() => nextStep()}>
          Siguiente
        </button>
      </div>
    </div>
  );
};
