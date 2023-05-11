import axios, { AxiosError } from 'axios';
import { ReactNode, useEffect, useState } from 'react';

type PropsFormUser = {
  currentStep: number;
  setCurrentStep: (value: number) => void;
  registerId: string;
  token: string;
  prices: any[];
  dataUser: any;
  paymentSelected: (value: string) => void;
  tuition: number;
};

export const SelectPayment = (props: PropsFormUser) => {
  const [cardSelected1, setCardSelected1] = useState(false);
  const [cardSelected2, setCardSelected2] = useState(false);
  const [cardSelected3, setCardSelected3] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [count, setCount] = useState(0);
  const [activeCount, setActiveCount] = useState(false);
  const [listPaymentMethods, setListPaymentMethods] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [nQuotes, setNQuotes] = useState(0);

  const fetchData = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_BACKEND}/registers/${props.registerId}/payment_methods`
      )
      .then((response) => {
        console.log('Response PAyment =>', response.data);

        setListPaymentMethods(response.data);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevStep = () => {
    props.setCurrentStep(props.currentStep - 1);
  };

  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };

  const handleNextStep = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/registers/${localStorage.getItem(
          'register_id'
        )}/step`,
        {
          step: cardSelected2 ? props.currentStep + 2 : props.currentStep + 1
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then((response: any) => {
        console.log('Step =>', response.data);
        cardSelected2
          ? props.setCurrentStep(props.currentStep + 2)
          : nextStep();
      })
      .catch((error: AxiosError) => console.log('Error Aval =>', error));
  };

  const selectCard = (key: string, element: any) => {
    setCardSelected2(false);

    switch (key) {
      case '1':
        console.log(
          'Element =>',
          formatPrice(
            element.pivot.reference_value -
              (element.pivot.free_discount / 100) *
                element.pivot.reference_value
          )
        );
        setTotalValue(
          element.pivot.reference_value -
            (element.pivot.free_discount / 100) * element.pivot.reference_value
        );
        setNQuotes(element.pivot.quotes);
        localStorage.setItem('paymentMethod', 'Pago en cuotas');
        localStorage.setItem('payment_method_id', key);
        localStorage.setItem(
          'total_amount',
          String(
            element.pivot.reference_value -
              (element.pivot.free_discount / 100) *
                element.pivot.reference_value
          )
        );
        setActiveCount(true);
        setCardSelected1(true);
        setCardSelected2(false);
        setCardSelected3(false);
        setDiscount(element.pivot.free_discount);
        break;
      case '2':
        setTotalValue(
          element.pivot.reference_value -
            (element.pivot.advance_discount / 100) *
              element.pivot.reference_value
        );
        localStorage.setItem('paymentMethod', 'Pago anticipado');
        localStorage.setItem('payment_method_id', key);
        localStorage.setItem(
          'total_amount',
          String(
            element.pivot.reference_value -
              (element.pivot.advance_discount / 100) *
                element.pivot.reference_value
          )
        );
        setDiscount(element.pivot.advance_discount);
        setCardSelected1(false);
        setCardSelected2(true);
        setCardSelected3(false);
        setDisabledBtn(false);
        setActiveCount(false);
        localStorage.setItem('paymentQuotes', '0');
        break;
      case '3':
        setDiscount(element.pivot.isa_percent);
        localStorage.setItem('paymentMethod', 'Pago en ISA');
        localStorage.setItem('payment_method_id', key);
        localStorage.setItem('total_amount', String(props.tuition));
        setCardSelected1(false);
        setCardSelected2(false);
        setCardSelected3(true);
        setDisabledBtn(false);
        setActiveCount(false);
        localStorage.setItem('paymentQuotes', '0');
        break;
    }
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-ES', {}).format(Math.round(value));
  };

  return (
    <form method="post" className="mt-5 ">
      <div className="flex justify-center py-5">
        <label className="text-center font-bold text-[20px]">
          Forma de pago
        </label>
      </div>
      <div className="flex justify-center">
        {listPaymentMethods.map((element: any, index) => {
          switch (element.description) {
            case 'Pago Cuota':
              return (
                <div
                  key={index}
                  className={`card m-4 p-3 ${cardSelected1 && 'card-selected'}`}
                  onClick={() => selectCard('1', element)}
                >
                  <p className="font-bold text-sky-500 text-[18px] text-center">
                    Cuotas mensuales
                  </p>
                  <p className="text-[12px] font-light text-center py-2 text-gray-500">
                    Paga en hasta {element.pivot.quotes} cuotas mensuales con
                    diferentes medios de pago en la fecha que más te convenga
                  </p>
                  <p className="text-[14px] font-bold">
                    Matrícula ${formatPrice(props.tuition)}
                  </p>
                  <p className="text-sky-500 font-bold text-lg">+</p>
                  <p className="text-sky-500 font-bo1ld text-2xl text-center">
                    {element.pivot.quotes} cuotas de $
                    {formatPrice(
                      element.pivot.quotes_value -
                        (element.pivot.quotes_value *
                          element.pivot.free_discount) /
                          100
                    )}{' '}
                    CLP
                  </p>
                  <p className="text-sm pt-2">
                    Valor Referencia:{' '}
                    <span className="line-through">
                      ${formatPrice(element.pivot.reference_value)} CLP
                    </span>
                  </p>
                  <p className="font-bold">
                    Descuento: {element.pivot.free_discount}%
                  </p>
                  <p className="font-bold text-center text-sky-500 text-sm pt-2">
                    Total a pagar: $
                    {formatPrice(
                      element.pivot.reference_value -
                        (element.pivot.free_discount / 100) *
                          element.pivot.reference_value
                    )}{' '}
                    CLP
                  </p>
                </div>
              );
            case 'Anticipado':
              return (
                <div
                  key={index}
                  className={`card m-4 p-3 ${cardSelected2 && 'card-selected'}`}
                  onClick={() => selectCard('2', element)}
                >
                  <p className="font-bold text-sky-500 text-[18px] text-center">
                    Pago anticipado tarjetas o transferencia
                  </p>
                  <p className="text-[12px] font-light text-center py-2 text-gray-500">
                    Paga antes de comenzar y obtén un descuento especial. Todos
                    los medios de pago disponibles.
                  </p>
                  <p className="text-[14px] font-bold">
                    Matrícula ${formatPrice(props.dataUser.price.tuition)}{' '}
                    {props.dataUser.price.currency.code}
                  </p>
                  <p className="text-sky-500 font-bold text-lg">+</p>
                  <p className="text-sky-500 font-bold text-2xl text-center">
                    ${formatPrice(element.pivot.reference_value)}{' '}
                    {props.dataUser.price.currency.code}
                  </p>
                  <p className="text-sm pt-2">
                    Valor Referencia:{' '}
                    <span className="line-through">
                      ${formatPrice(element.pivot.reference_value)}{' '}
                      {props.dataUser.price.currency.code}
                    </span>
                  </p>
                  <p className="font-bold">
                    Descuento: {element.pivot.advance_discount}%
                  </p>
                  <p className="font-bold text-center text-sky-500 text-sm pt-2">
                    Total a Pagar $
                    {formatPrice(
                      element.pivot.reference_value -
                        (element.pivot.advance_discount / 100) *
                          element.pivot.reference_value
                    )}
                  </p>
                </div>
              );
            case 'ISA':
              return (
                <div
                  key={index}
                  className={`card m-4 p-3 ${cardSelected3 && 'card-selected'}`}
                  onClick={() => selectCard('3', element)}
                >
                  <p className="font-bold text-sky-500 text-[18px] text-center">
                    Acuerdo ingresos compartidos (ISA)
                  </p>
                  <p className="text-[12px] font-light text-center py-2 text-gray-500">
                    Modelo de financiamiento donde solo comienzas a pagar una
                    vez consigues trabajo, sin costo inicial
                  </p>
                  <p className="text-[14px] font-bold">
                    Matrícula ${formatPrice(props.tuition)}
                  </p>
                  <p className="text-sky-500 font-bold text-lg">+</p>
                  <p className="text-sky-500 font-bold text-2xl text-center">
                    15% de tus ingresos
                  </p>
                  <p className="font-bold text-center text-sky-500 text-sm pt-2">
                    Hasta pagar $3.500.000
                  </p>
                </div>
              );
            default:
              return <></>;
          }
        })}
      </div>
      {activeCount && (
        <>
          <div className="flex flex-col items-center justify-center mt-5">
            <select
              className="w-48 border-2 rounded-lg p-2"
              onChange={(evt: any) => {
                setCount(evt.target.value);
                if (cardSelected1) {
                  localStorage.setItem(
                    'paymentQuotes',
                    String(evt.target.value)
                  );
                }
                setDisabledBtn(false);
              }}
            >
              <option value={''}>Nº de cuotas</option>;
              {(() => {
                let items: ReactNode[] = [];
                for (let i = 1; i <= nQuotes; i++) {
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
            <div className="flex flex-col justify-end items-end mt-5">
              <div className="border-2 rounded-lg flex flex-col justify-end items-end ">
                <p className="py-2 px-7 rounded-lg m-1">
                  Matrícula ${formatPrice(props.tuition)}
                </p>
                <p className="py-2 px-7 rounded-lg m-1">{`${count} cuotas de $ ${formatPrice(
                  Math.round(Number(totalValue / count))
                )}`}</p>
                <p className="py-2 px-7 rounded-lg m-1 font-bold text-2xl">
                  {discount}%
                </p>
                <label className="text-gray-500 text-sm m-1">
                  * Descuento aplicado
                </label>
              </div>
              <p className="font-bold mt-5 text-3xl">
                Total: ${formatPrice(props.tuition + totalValue)}
              </p>
            </div>
          )}
        </>
      )}
      <div className="flex justify-end mt-5">
        <button className="btn-prev m-1" onClick={() => prevStep()}>
          Atras
        </button>
        <button
          className={` m-1 ${
            !disabledBtn
              ? 'btn'
              : 'bg-gray-400 text-white rounded-[0.75rem] px-7 py-1 '
          }`}
          disabled={disabledBtn}
          type="button"
          onClick={handleNextStep}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
