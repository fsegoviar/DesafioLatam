import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FinishPayment = () => {

  const navigate = useNavigate();

  return (
    <form method={'post'} className={'mt-5 w-full'}>
      <label className={'font-bold text-lg'}>Facturación</label>
      <div className='grid grid-cols-2'>
        <input type='text' placeholder='Tipo de documentos' />
        <input type='text' placeholder='Razón social' />
      </div>
      <div className='grid grid-cols-2 mt-3'>
        <input type='text' placeholder='RUT social' />
        <input type='text' placeholder='Giro' />
      </div>
      <div className='grid grid-cols-2 mt-3'>
        <input type='text' placeholder='Dirección de la empresa' />
        <input type='text' placeholder='Email empresa' />
      </div>
      <div className={'mt-3'}>
        <input type='text' placeholder='Teléfono empresa' />
      </div>
      <div className={'my-3 flex justify-end'}>
        <label className={'text-sm'}> Usar la misma información que usaste al registrarte </label>
        <input type='checkbox' name='' id='' />
      </div>
      <label className={'font-bold text-lg'}>Forma de pago</label>
      <div className={'mt-3 flex flex-col'}>
        <input type='text' placeholder='Cuotas mensuales' />
      </div>
      <div className={'mt-3 flex flex-col '}>
        <label className={'text-center'}>Número de Cuotas</label>
        <input type='text' placeholder='3 meses sin interes' />
      </div>
      <div className={'mt-5'}>
        <label className={'font-bold text-lg'}>Pasarela de pago</label>
        <div className={'mt-5 flex '}>
          <div
            className={'border-2 w-1/3 text-center m-2 py-3 border-red-500 text-red-500 rounded-lg shadow shadow-red-500'}>Transbank
          </div>
          <div className={'border-2 w-1/3 text-center m-2 py-3 border-sky-500 text-sky-500 rounded-lg'}>Paypal</div>
          <div className={'border-2 w-1/3 text-center m-2 py-3 border-green-500 text-green-500 rounded-lg'}>Flow</div>
        </div>
      </div>
      <div className={'mt-5 flex flex-col items-end'}>
        <label className={'font-bold py-5 text-3xl'}>Total: $13500</label>
        <button className='btn' type='submit' onClick={() => navigate('/pago_finalizado')}>
          Finalizar pago
        </button>
      </div>
    </form>
  );
};

