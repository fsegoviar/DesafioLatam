import React, { useEffect } from 'react';
import { Navbar } from '../../components';
import axios, { AxiosError } from 'axios';

export const FinishPaymentPage = () => {
  const fetchUpdateDataUser = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_BACKEND}/hubspot/client`, {
        register_id: localStorage.getItem('register_id'),
        email: 'jherrera@lisit.cl'
      },
			{
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
				}
			})
      .then((response: any) => console.log('Success =>', response.data))
      .catch((error: AxiosError) =>
        console.log('Error Update data user => ', error)
      );
  };

  useEffect(() => {
    fetchUpdateDataUser();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="pt-48 p-10 w-full h-auto min-h-screen flex justify-center"
        style={{ background: '#F9F9F9' }}
      >
        <div className={'flex flex-col items-center'}>
          <h1 className={'text-4xl'}>¡Has realizado tu pago con éxito!</h1>
          <h2 className={'text-7xl font-bold pt-3 text-center'}>
            Bienvenido a Desafío Latam
          </h2>
          <img
            src={require('../../assets/images/pago_finalizado.png')}
            alt={'pago_finalizado'}
          />
        </div>
      </div>
    </>
  );
};
