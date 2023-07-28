import axios, { AxiosError } from 'axios';
import { SupplierTypeUser } from '../../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
  const navigate = useNavigate();
  // const [setLoadingTransbank, setSetLoadingTransbank] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.status === 'Completado') {
      navigate('/pago_aprobado');
    }
  }, [navigate, user]);

  const handleTransbankTransaction = () => {
    if (user.purchase) {
      axios
        .post(
          `${process.env.REACT_APP_API_BACKEND}/transbank/start_purchase`,
          {
            register_id: String(localStorage.getItem('register_id')),
            total: user.purchase.total,
            payment_method_id: user.purchase.payment_method_id
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
							Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
            }
          }
        )
        .then((response: any) => {
          window.location.replace(response.data);
        })
        .catch((error: AxiosError) => {
          console.log('Error Transbank =>', error);
          navigate('/error_transbank');
        });
    }
  };

  const handleTransactionPaypal = () => {
    if (user.purchase) {
      axios
        .post(
          `${process.env.REACT_APP_API_BACKEND}/paypal/pay`,
          {
            amount: user.purchase.total,
            currency: String(dataUser.price.currency.code),
            register_id: String(localStorage.getItem('register_id')),
            payment_method_id: user.purchase.payment_method_id
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
							Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
            }
          }
        )
        .then((response: any) => {
          // window.location.replace(response);
          console.log('Paypal =>', response.data);
          window.location.replace(response.data);
        })
        .catch((error: AxiosError) => console.log('Error Paypal =>', error));
    }
  };

  const handleTransactionFlow = () => {
    if (user.purchase) {
      axios
        .post(
          `${process.env.REACT_APP_API_BACKEND}/flow/pay`,
          {
            register_id: String(localStorage.getItem('register_id')),
            amount: user.purchase.total,
            currency: String(dataUser.price.currency.code),
            email: String(dataUser.user.email),
            payment_method_id: user.purchase.payment_method_id
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${localStorage.getItem(
                'token_user_latam'
              )}`
            }
          }
        )
        .then((response: any) => {
          console.log('Response Flow =>', response.data);
          window.location.replace(response.data);
        })
        .catch((error: AxiosError) => console.log('Error Flow =>', error));
    }
  };

  const handleOtherMethodPayment = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BACKEND}/registers/${dataUser.id}/notification-payment`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
						Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
          }
        }
      )
      .then((response: any) => {
        console.log('Response Flow =>', response.data);
        window.location.replace('/pago_aprobado');
        // navigate('/pago_aprobado');
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
          <input
            type="text"
            placeholder={user.purchase?.payment_method?.description ?? ''}
            readOnly
          />
        </div>
        <div className="flex flex-col">
          <label>Número de cuotas</label>
          <input
            type="text"
            placeholder={String(user.purchase?.quotes)}
            readOnly
          />
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
              case 'Otro':
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
