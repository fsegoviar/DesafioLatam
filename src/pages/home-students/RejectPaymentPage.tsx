import { Navbar } from '../../components';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export const RejectPaymentPage = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate(
      `/formulario/${localStorage.getItem(
        'type_form'
      )}?register=${localStorage.getItem(
        'register_id'
      )}&token=${localStorage.getItem('token_user_latam')}`
    );
  };

  return (
    <>
      <Navbar />
      <div
        className="pt-48 p-10 w-full h-auto min-h-screen flex justify-center"
        style={{ background: '#F9F9F9' }}
      >
        <div className={'flex flex-col items-center'}>
          <h1 className={'text-4xl'}>¡Ups, algo salió mal! </h1>
          <img
            src={require('../../assets/images/pago_rechazado.png')}
            className={'my-5'}
            alt={'pago_rechazado'}
          />
          <button className="btn" onClick={() => handleRestart()}>
            Reintentar
          </button>
        </div>
      </div>
    </>
  );
};
