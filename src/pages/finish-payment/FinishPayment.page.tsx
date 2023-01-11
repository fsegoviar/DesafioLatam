import React from 'react';
import { Navbar } from '../../components';

export const FinishPaymentPage = () => {
  return (
    <>
      <Navbar />
      <div
        className='pt-48 p-10 w-full h-auto min-h-screen flex justify-center'
        style={{ background: '#F9F9F9' }}
      >
        <div className={'flex flex-col items-center'}>
          <h1 className={'text-4xl'}>¡Has realizado tu pago con éxito!</h1>
          <h2 className={'text-7xl font-bold pt-3 text-center'}>Bienvenido a Desafío Latam</h2>
          <img src={require('../../assets/images/pago_finalizado.png')} alt={'pago_finalizado'} />
        </div>
      </div>
    </>
  );
};

