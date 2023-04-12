import React from 'react';

export const LaboralComponent = () => {
  return (
    <>
      <div className="grid gap-4 grid-cols-8 ">
        <div className="col-span-4 flex flex-col">
          <label>Situación laboral</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Renta actual</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-8 flex flex-col">
          <label>Enlace linkedin</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Empresa donde trabaja</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Cargo</label>
          <input type="text" disabled />
        </div>
      </div>
    </>
  );
};
