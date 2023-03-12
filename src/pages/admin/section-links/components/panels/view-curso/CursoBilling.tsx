import React from 'react';

export const CursoBilling = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <p className="font-bold text-2xl">Documento a emitir</p>

        <div className="flex justify-center">
          <div className="mt-1 mx-5">
            <input type="radio" name="tipo" id="si" checked={true} />
            <label htmlFor="si" className="ml-1">
              Factura
            </label>
          </div>
          <div className="mt-1 mx-5">
            <input type="radio" name="tipo" id="no" />
            <label htmlFor="no" className="ml-1">
              Boleta
            </label>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="grid gap-4 grid-cols-4 ">
          <div className="col-span-2 flex flex-col">
            <label>Tipo Documentos</label>
            <input type="text" disabled={true} />
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Razón Social</label>
            <input type="text" disabled={true} />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-4 ">
          <div className="col-span-2 flex flex-col">
            <label>Rut Empresa</label>
            <input type="text" disabled={true} />
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Giro</label>
            <input type="text" disabled={true} />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 ">
          <div className="col-span-2 flex flex-col">
            <label>Dirección</label>
            <input type="text" disabled={true} />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-4 ">
          <div className="col-span-2 flex flex-col">
            <label>Email Empresa</label>
            <input type="email" disabled={true} />
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Teléfono Empresa</label>
            <input type="text" disabled={true} />
          </div>
        </div>
      </div>
    </>
  );
};
