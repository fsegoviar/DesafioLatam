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
          <img
            src={require('../../assets/images/pago_rechazado.png')}
            className={'my-5'}
            alt={'pago_rechazado'}
          />
          <h1 className={'text-4xl'}>
            Algo salió mal, por favor inténtalo nuevamente o comunicate con
            nosotros{' '}
          </h1>
          <button
            className={
              'bg-green-500 hover:bg-green-400 text-white font-medium px-7 py-1 rounded-xl'
            }
            onClick={() =>
              navigate(
                'https://api.whatsapp.com/send/?phone=56951177975&text=Hola%21+Tengo+problemas+con+el+pago&type=phone_number&app_absent=0'
              )
            }
          >
            <div
              className={
                'px-2 bg-no-repeat bg-center bg-cover w-[20px] h-[20px]'
              }
              style={{
                backgroundImage: `url(${require('../../assets/images/ico_wsp.png')})`
              }}
            ></div>
            Contactar con Whatsapp
          </button>
          <button className="btn" onClick={() => handleRestart()}>
            Reintentar
          </button>
        </div>
      </div>
    </>
  );
};
