import React from 'react';
import { Navbar } from '../../components';

export const RejectPaymentPage = () => {
  return (
    <>
      <Navbar />
      <div
        className="pt-48 p-10 w-full h-auto min-h-screen flex justify-center"
        style={{ background: '#F9F9F9' }}
      >
        <div className={'flex flex-col items-center'}>
          <h1 className={'text-4xl'}>
            Ha ocurrido un problema al realizar el pago{' '}
          </h1>
          <button className="btn">Reintentar</button>
        </div>
      </div>
    </>
  );
};
