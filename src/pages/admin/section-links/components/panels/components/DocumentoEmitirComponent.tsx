import React from 'react';

export const DocumentoEmitirComponent = () => {
  return (
    <>
      <div className="grid gap-4 grid-cols-8 ">
        <div className="col-span-4 flex flex-col justify-center h-100">
          <label>
            Tipo: <b>Factura</b>
          </label>
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Razón social</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Rut de la empresa</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Giro</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-8 flex flex-col">
          <label>Dirección</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Correo empresa</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Teléfono empresa</label>
          <input type="text" disabled />
        </div>
      </div>
    </>
  );
};
