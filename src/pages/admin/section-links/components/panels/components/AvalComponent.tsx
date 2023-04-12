import React from 'react';

export const AvalComponent = () => {
  return (
    <>
      <div className="grid gap-4 grid-cols-8 ">
        <div className="col-span-4 flex flex-col">
          <label>Nombre aval</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Apellido aval</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Número de identificación</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Teléfono</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-8 flex flex-col">
          <label>Dirección</label>
          <input type="text" disabled />
        </div>
      </div>
    </>
  );
};
