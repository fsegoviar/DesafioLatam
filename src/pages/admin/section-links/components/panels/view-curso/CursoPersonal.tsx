import React from 'react';

export const CursoPersonal = () => {
  return (
    <>
      <div className="grid gap-4 grid-cols-8 ">
        <div className="col-span-2 flex flex-col">
          <label>Nombre</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Apellidos</label>
          <input type="text" />
        </div>
        <div className="col-span-2  flex flex-col">
          <label>Tipo de Identificación</label>
          <input type="text" />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Número de identificación</label>
          <input type="text" />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-8 mt-5">
        <div className="w-full flex flex-col col-span-2">
          <label>Código teléfonico</label>
          <input type="text" />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Número teléfonico</label>
          <input type="text" />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Correo electrónico</label>
          <input type="email" />
        </div>
      </div>
      <div className="mt-3">
        <div>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2 flex flex-col">
              <label>Carrera a la cual te estas matriculando</label>
              <input type="text" />
            </div>
            <div className="col-span-2 flex flex-col">
              <label>Generación a la que matrícula</label>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
