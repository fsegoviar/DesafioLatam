import { ReactNode, useState } from 'react';

type PropsFormUser = {
  currentStep: number;
  setCurrentStep: (value: number) => void;
};

export const SelectPayment = (props: PropsFormUser) => {
  const [cardSelected1, setCardSelected1] = useState(false);
  const [cardSelected2, setCardSelected2] = useState(false);
  const [cardSelected3, setCardSelected3] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [count, setCount] = useState(0);
  const [activeCount, setActiveCount] = useState(false);

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
        setTotalValue(1_250_000);
        setCardSelected1(true);
        setActiveCount(true);
        setDiscount(90);
        break;
      case '2':
        setTotalValue(1_100_000);
        setDiscount(95);
        setCardSelected2(true);
        setActiveCount(true);
        break;
      case '3':
        setDiscount(0);
        setCardSelected3(true);
        setActiveCount(false);
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
      {activeCount && (
        <>
          <div className="flex flex-col items-center justify-center mt-5">
            <select
              className="w-48 border-2 rounded-lg p-2"
              onChange={(evt: any) => {
                setCount(evt.target.value);
              }}
            >
              <option value={''}>Nº de cuotas</option>;
              {(() => {
                let items: ReactNode[] = [];
                for (let i = 1; i < 13; i++) {
                  items.push(
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                }
                return items;
              })()}
            </select>
          </div>
          {count > 0 && (
            <div>
              <div className="flex flex-col justify-end items-end mt-5">
                <div className="border-2 rounded-lg flex flex-col justify-end items-end ">
                  <p className="py-2 px-7 rounded-lg m-1">Matrícula $22.500</p>
                  <p className="py-2 px-7 rounded-lg m-1">{`${count} cuotas de $ ${Math.round(
                    Number(totalValue / count)
                  )}`}</p>
                  <p className="py-2 px-7 rounded-lg m-1 font-bold text-2xl">
                    {discount}%
                  </p>
                  <label className="text-gray-500 text-sm m-1">
                    * Descuento aplicado
                  </label>
                </div>
                <p className="font-bold mt-5 text-3xl">
                  Total: ${22_500 + totalValue}
                </p>
              </div>
            </div>
          )}
        </>
      )}
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
