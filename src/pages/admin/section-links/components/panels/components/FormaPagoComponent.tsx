import React from 'react';

export const FormaPagoComponent = () => {
  return (
    <>
      <div className="grid gap-4 grid-cols-8 ">
        <div className="col-span-8 flex flex-col justify-center items-center h-100 w-100">
          <label>
            Forma de pago: <b>Pago en Cuotas</b>
          </label>
        </div>
      </div>
    </>
  );
};
