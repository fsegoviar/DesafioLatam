import axios, { AxiosError } from 'axios';
import { SupplierTypeUser } from '../../../interfaces';
import { useEffect, useState } from 'react';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

type PropsFinishPayment = {
  suppliers: SupplierTypeUser[];
  dataUser: any;
};

export const SimpleFinishPayment = ({
  suppliers,
  dataUser
}: PropsFinishPayment) => {
  // const navigate = useNavigate();
  // const [setLoadingTransbank, setSetLoadingTransbank] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({
    description: '',
    quotes: ''
  });

  useEffect(() => {
    console.log('Suppliers FinishPayment', suppliers);
    console.log('dataUser FinishPayment', dataUser);
    setPaymentMethod({
      description: String(localStorage.getItem('paymentMethod')),
      quotes: String(localStorage.getItem('paymentQuotes'))
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTransbankTransaction = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/transbank/start_purchase`,
        {
          register_id: String(localStorage.getItem('register_id')),
          total: dataUser.price.tuition,
          payment_method_id: String(localStorage.getItem('payment_method_id'))
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
          amount: dataUser.price.tuition,
          currency: String(dataUser.price.currency.code),
          register_id: String(localStorage.getItem('register_id')),
          payment_method_id: String(localStorage.getItem('payment_method_id'))
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then((response: any) => {
        // window.location.replace(response);
        console.log('Paypal =>', response.data);
        window.location.replace(response.data);
      })
      .catch((error: AxiosError) => console.log('Error Paypal =>', error));
  };

  const handleTransactionFlow = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/flow/pay`,
        {
          register_id: String(localStorage.getItem('register_id')),
          amount: dataUser.price.tuition,
          currency: String(dataUser.price.currency.code),
          email: String(dataUser.user.email),
          payment_method_id: String(localStorage.getItem('payment_method_id'))
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
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
        <div className="flex flex-col col-span-2">
          <label>Carrera</label>
          <input
            type="text"
            placeholder={dataUser.career.description}
            readOnly
          />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-2 mt-3">
        <div className="flex flex-col">
          <label>Forma de pago</label>
          <input type="text" placeholder={paymentMethod.description} readOnly />
        </div>
        <div className="flex flex-col">
          <label>Número de cuotas</label>
          <input type="text" placeholder={paymentMethod.quotes} readOnly />
        </div>
      </div>
      <div className={'mt-5'}>
        <label className={'font-bold text-lg'}>Pasarela de pago</label>
        <div className={'mt-5 flex justify-center '}>
          {suppliers.map((supplier) => {
            switch (supplier.description) {
              case 'Transbank':
                return (
                  <div className="relative w-[200px] h-[100px] m-4 ">
                    <div
                      className="w-full h-full bg-center bg-cover bg-no-repeat rounded-xl shadow-xl cursor-pointer"
                      style={{
                        backgroundImage: `url(${require('../../../assets/images/webpay.png')})`
                      }}
                      onClick={() => handleTransbankTransaction()}
                    ></div>
                  </div>
                );
              case 'Paypal':
                return (
                  <>
                    {(() => {
                      if (dataUser.price.currency.code === 'CLP') {
                        return <></>;
                      } else {
                        return (
                          <>
                            <div className="relative bg-white rounded-xl m-4 w-[200px] h-[100px]">
                              <div
                                className="w-full h-full bg-center bg-contain bg-no-repeat rounded-xl shadow-xl cursor-pointer"
                                style={{
                                  backgroundImage: `url(${require('../../../assets/images/new-paypal-logo.jpg')})`
                                }}
                                onClick={() => handleTransactionPaypal()}
                              ></div>
                            </div>
                          </>
                        );
                      }
                    })()}
                  </>
                );
              case 'Flow':
                return (
                  <>
                    <div className="relative bg-white rounded-xl m-4 w-[200px] h-[100px]">
                      <div
                        className="w-full h-full bg-center bg-contain bg-no-repeat rounded-xl shadow-xl cursor-pointer"
                        style={{
                          backgroundImage: `url(${require('../../../assets/images/flow.png')})`
                        }}
                        onClick={() => handleTransactionFlow()}
                      ></div>
                    </div>
                  </>
                );
              case 'Otro medio':
                return (
                  <>
                    <div className="relative bg-white rounded-xl m-4 w-[200px] h-[100px]">
                      <div
                        className="w-full h-full flex justify-center items-center rounded-xl shadow-xl cursor-pointer"
                        onClick={() => handleOtherMethodPayment()}
                      >
                        <p>Otro medio de pago</p>
                      </div>
                    </div>
                  </>
                );
              default:
                return <></>;
            }
          })}
          {/* <div className="relative w-[200px] h-[100px] m-4">
            <div
              className="w-full h-full bg-center bg-cover bg-no-repeat rounded-xl shadow-xl cursor-pointer"
              style={{
                backgroundImage: `url(${require('../../../assets/images/webpay.png')})`
              }}
              onClick={() => handleTransbankTransaction()}
            ></div>
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
          </div> */}
        </div>
      </div>
      <div className={'mt-5 flex flex-col items-end'}>
        {/* <label className={'font-bold py-5 text-3xl'}>
          Total: $
          {new Intl.NumberFormat('es-ES', {}).format(dataUser.price.tuition)}
        </label> */}
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
