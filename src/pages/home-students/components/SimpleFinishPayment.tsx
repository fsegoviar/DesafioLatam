import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SimpleFinishPayment = () => {
  const navigate = useNavigate();

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
              className="w-full h-full bg-center bg-cover bg-no-repeat rounded-xl shadow-xl"
              style={{
                backgroundImage: `url(${require('../../../assets/images/webpay.png')})`
              }}
            ></div>
          </div>
          <div className="relative bg-white rounded-xl m-4 w-[200px] h-[100px]">
            <div
              className="w-full h-full bg-center bg-contain bg-no-repeat rounded-xl shadow-xl"
              style={{
                backgroundImage: `url(${require('../../../assets/images/new-paypal-logo.jpg')})`
              }}
            ></div>
          </div>
          <div className="relative bg-white rounded-xl m-4 w-[200px] h-[100px]">
            <div
              className="w-full h-full bg-center bg-contain bg-no-repeat rounded-xl shadow-xl"
              style={{
                backgroundImage: `url(${require('../../../assets/images/flow.png')})`
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className={'mt-5 flex flex-col items-end'}>
        <label className={'font-bold py-5 text-3xl'}>Total: $13500</label>
        <button
          className="btn"
          type="submit"
          onClick={() => navigate('/pago_finalizado')}
        >
          Finalizar pago
        </button>
      </div>
    </form>
  );
};
