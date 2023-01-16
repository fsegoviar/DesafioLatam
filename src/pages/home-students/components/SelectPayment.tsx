import React, { useState } from 'react';

type PropsFormUser = {
  currentStep: number;
  setCurrentStep: (value: number) => void;
};

export const SelectPayment = (props: PropsFormUser) => {
  const [cardSelected1, setCardSelected1] = useState(false);
  const [cardSelected2, setCardSelected2] = useState(false);
  const [cardSelected3, setCardSelected3] = useState(false);

  const prevStep = () => {
    props.setCurrentStep(props.currentStep - 1);
  };

  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };

  const selectCard = (key: string) => {
    setCardSelected1(false);
    setCardSelected2(false);
    setCardSelected3(false);

    switch (key) {
      case '1':
        setCardSelected1(true);
        break;
      case '2':
        setCardSelected2(true);
        break;
      case '3':
        setCardSelected3(true);
        break;
    }
  };

  return (
    <form method="post" className="mt-5 ">
      <div className="flex justify-center py-5">
        <label className="text-center font-bold text-[20px]">
          Forma de pago
        </label>
      </div>
      <div className="flex">
        {/* <div className={`card m-4 ${cardSelected1 && 'card-selected'}`} onClick={() => selectCard('1')}>
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
        </div> */}
        <div
          className={`card m-4 p-3 ${cardSelected1 && 'card-selected'}`}
          onClick={() => selectCard('1')}
        >
          <p className="font-bold text-sky-500 text-[18px] text-center">
            Cuotas mensuales
          </p>
          <p className="text-[12px] font-light text-center py-2 text-gray-500">
            Paga en hasta 12 cuotas mensuales con diferentes medios de pago en
            la fecha que más te convenga
          </p>
          <p className="text-[14px] font-bold">Matrícula $22.500 CLP</p>
          <p className="text-sky-500 font-bold text-lg">+</p>
          <p className="text-sky-500 font-bold text-2xl text-center">
            10 cuotas de $125.000 CLP
          </p>
          <p className="text-sm pt-2">
            Valor Referencia:{' '}
            <span className="line-through">$9.000.000 CLP</span>
          </p>
          <p className="font-bold">Descuento: 90%</p>
          <p className="font-bold text-center text-sky-500 text-sm pt-2">
            Total a pagar: $1.250.000 CLP
          </p>
        </div>
        {/* <div
          className={`card m-4 ${cardSelected2 && 'card-selected'}`}
          onClick={() => selectCard('2')}
        >
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
        </div> */}
        <div
          className={`card m-4 p-3 ${cardSelected2 && 'card-selected'}`}
          onClick={() => selectCard('2')}
        >
          <p className="font-bold text-sky-500 text-[18px] text-center">
            Pago anticipado tarjetas o transferencia
          </p>
          <p className="text-[12px] font-light text-center py-2 text-gray-500">
            Paga antes de comenzar y obtén un descuento especial. Todos los
            medios de pago disponibles.
          </p>
          <p className="text-[14px] font-bold">Matrícula $22.500 CLP</p>
          <p className="text-sky-500 font-bold text-lg">+</p>
          <p className="text-sky-500 font-bold text-2xl text-center">
            $1.100.000 CLP
          </p>
          <p className="text-sm pt-2">
            Valor Referencia:{' '}
            <span className="line-through">$9.000.000 CLP</span>
          </p>
          <p className="font-bold">Descuento: 95%</p>
          <p className="font-bold text-center text-sky-500 text-sm pt-2">
            Total a Pagar $1.100.000
          </p>
        </div>
        {/* <div
          className={`card m-4 ${cardSelected3 && 'card-selected'}`}
          onClick={() => selectCard('3')}
        >
          <p className="font-bold text-sky-500 text-[18px] text-center">
            Acuerdo ingresos compartidos (ISA)
          </p>
          <ul className="py-7 font-bold px-12">
            <li className="text-left">
              15% sueldo en 18 cuotas o hasta llegar al arancel total
            </li>
          </ul>
        </div> */}
        <div
          className={`card m-4 p-3 ${cardSelected3 && 'card-selected'}`}
          onClick={() => selectCard('3')}
        >
          <p className="font-bold text-sky-500 text-[18px] text-center">
            Acuerdo ingresos compartidos (ISA)
          </p>
          <p className="text-[12px] font-light text-center py-2 text-gray-500">
            Modelo de financiamiento donde solo comienzas a pagar una vez
            consigues trabajo, sin costo inicial
          </p>
          <p className="text-[14px] font-bold">Matrícula $22.500 CLP</p>
          <p className="text-sky-500 font-bold text-lg">+</p>
          <p className="text-sky-500 font-bold text-2xl text-center">
            15% de tus ingresos
          </p>
          <p className="font-bold text-center text-sky-500 text-sm pt-2">
            Hasta pagar $3.500.000
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-5">
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
