import React from 'react';

type PropsFormUser = {
  currentStep: number;
  setCurrentStep: (value: number) => void;
};

export const SelectPayment = (props: PropsFormUser) => {
  const prevStep = () => {
    props.setCurrentStep(props.currentStep - 1);
  };

  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };

  return (
    <form method="post" className="mt-5 ">
      <div className="flex justify-center py-5">
        <label className="text-center font-bold text-[20px]">
          Forma de pago
        </label>
      </div>
      <div className="flex">
        <div className="card m-4">
          <p className="font-bold text-sky-500 text-[18px] text-center">
            Cuotas mensuales
          </p>
          <ul className="py-7 font-bold">
            <li>Hasta 3 MSI</li>
            <li>Hasta 9 MSI</li>
            <li>Hasta 12 MSI</li>
          </ul>
          <p className="font-bold text-center text-[20px] px-5">
            <span className="font-bold text-sky-500 text-3xl">+ 40%</span> de
            descuento
          </p>
        </div>
        <div className="card m-4">
          <p className="font-bold text-sky-500 text-[18px] px-5 text-center">
            Pago anticipado tarjetas o transferencia
          </p>
          <ul className="py-7 font-bold">
            <li>1 cuota</li>
          </ul>
          <p className="font-bold text-center text-[20px] px-5">
            <span className="font-bold text-sky-500 text-3xl">+ 60%</span> de
            descuento
          </p>
        </div>
        <div className="card m-4">
          <p className="font-bold text-sky-500 text-[18px] text-center">
            Acuerdo ingresos compartidos (ISA)
          </p>
          <ul className="py-7 font-bold px-12">
            <li className="text-left">
              15% sueldo en 18 cuotas o hasta llegar al arancel total
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-5">
        <select className="border-2 rounded-lg p-2">
          <option value="">Cuotas mensuales</option>
          <option value="">Pago anticipado tarjetas o transferencias</option>
          <option value="">Acuerdo ingresos compartidos (ISA)</option>
        </select>
        <label className="mt-5">Número de Cuotas</label>
        <select className="w-36 border-2 rounded-lg p-2">
          <option value="">1</option>
        </select>
      </div>
      <div>
        <div className="flex flex-col justify-end items-end mt-5">
          <p className="border-2 py-2 px-7 rounded-lg m-1">1 cuota $22.500</p>
          <p className="border-2 py-2 px-7 rounded-lg m-1 font-bold text-2xl">
            60%
          </p>
          <label className="text-gray-500 text-sm">* Descuento aplicado</label>
          <p className="font-bold mt-5 text-3xl">Total: $9000</p>
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
    </form>
  );
};
