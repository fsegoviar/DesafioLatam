import axios, { AxiosError } from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

export const SimpleFinishPayment = () => {
  // const navigate = useNavigate();
  // const [setLoadingTransbank, setSetLoadingTransbank] = useState(false);

  const handleTransbankTransaction = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/transbank/start_purchase`,
        {
          register_id: 1,
          total: 1000
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then((response: any) => {
        window.location.replace(response.data);
      })
      .catch((error: AxiosError) => console.log('Error Transbank =>', error));
  };

  const handleTransactionPaypal = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/paypal/pay`,
        {
          amount: 1000,
          currency: 'USD'
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then((response: any) => {
        // window.location.replace(response);
        //TODO: Falta la implementación
      })
      .catch((error: AxiosError) => console.log('Error Paypal =>', error));
  };

  const handleTransactionFlow = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/flow/pay`,
        {
          register_id: 1,
          amount: 1000,
          currency: 'CLP',
          email: 'jherrera@lisit.cl'
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then((response: any) => {
        console.log('Response Flow =>', response.data);
        window.location.replace(response.data);
      })
      .catch((error: AxiosError) => console.log('Error Flow =>', error));
  };

  const handleOtherMethodPayment = () => {
    axios
      .post(
        `${
          process.env.REACT_APP_API_BACKEND
        } /registers/${1}/notification-payment`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then((response: any) => {
        console.log('Response Flow =>', response.data);
      })
      .catch((error: AxiosError) => console.log('Error Flow =>', error));
  };

  return (
    <form method={'post'} className={'mt-5 w-full'}>
      <label className={'font-bold text-lg'}>Resumen</label>
      <div className="grid gap-4 grid-cols-2 mt-3">
        <div className="flex flex-col">
          <label>Carrera</label>
          <input type="text" placeholder="Carrera" readOnly />
        </div>
        <div className="flex flex-col">
          <label>Generación de matrícula</label>
          <input type="text" placeholder="Generación" readOnly />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-2 mt-3">
        <div className="flex flex-col">
          <label>Forma de pago</label>
          <input type="text" placeholder="Cuotas mensuales" readOnly />
        </div>
        <div className="flex flex-col">
          <label>Número de cuotas</label>
          <input type="text" placeholder="Cuotas mensuales" readOnly />
        </div>
      </div>
      <div className={'mt-5'}>
        <label className={'font-bold text-lg'}>Pasarela de pago</label>
        <div className={'mt-5 flex justify-center '}>
          <div className="relative w-[200px] h-[100px] m-4">
            <div
              className="w-full h-full bg-center bg-cover bg-no-repeat rounded-xl shadow-xl cursor-pointer"
              style={{
                backgroundImage: `url(${require('../../../assets/images/webpay.png')})`
              }}
              onClick={() => handleTransbankTransaction()}
            ></div>
          </div>
          <div className="relative bg-white rounded-xl m-4 w-[200px] h-[100px]">
            <div
              className="w-full h-full bg-center bg-contain bg-no-repeat rounded-xl shadow-xl"
              style={{
                backgroundImage: `url(${require('../../../assets/images/new-paypal-logo.jpg')})`
              }}
              onClick={() => handleTransactionPaypal()}
            ></div>
          </div>
          <div className="relative bg-white rounded-xl m-4 w-[200px] h-[100px]">
            <div
              className="w-full h-full bg-center bg-contain bg-no-repeat rounded-xl shadow-xl"
              style={{
                backgroundImage: `url(${require('../../../assets/images/flow.png')})`
              }}
              onClick={() => handleTransactionFlow()}
            ></div>
          </div>
          <div className="relative bg-white rounded-xl m-4 w-[200px] h-[100px]">
            <div
              className="w-full h-full flex justify-center items-center rounded-xl shadow-xl"
              onClick={() => handleOtherMethodPayment()}
            >
              <p>Otro medio de pago</p>
            </div>
          </div>
        </div>
      </div>
      <div className={'mt-5 flex flex-col items-end'}>
        <label className={'font-bold py-5 text-3xl'}>Total: $13500</label>
        {/* <button
          className="btn"
          type="submit"
          onClick={() => navigate('/pago_finalizado')}
        >
          Finalizar pago
        </button> */}
      </div>
    </form>
  );
};
