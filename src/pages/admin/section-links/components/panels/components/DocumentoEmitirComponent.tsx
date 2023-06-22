import React from 'react';

type PropsPanel = {
  dataUser: any;
};

export const DocumentoEmitirComponent = (props: PropsPanel) => {
  return (
    <>
      <div className="grid gap-4 grid-cols-8 ">
        <div className="col-span-4 flex flex-col justify-center h-100">
          <label>
            Tipo: <b>{props.dataUser.billing.document_type.description}</b>
          </label>
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Razón social</label>
          <input
            type="text"
            value={props.dataUser.billing?.business_name ?? ''}
            disabled
          />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Rut de la empresa</label>
          <input
            type="text"
            value={props.dataUser.billing?.dni ?? ''}
            disabled
          />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Giro</label>
          <input
            type="text"
            value={props.dataUser.billing?.business_line ?? ''}
            disabled
          />
        </div>
        <div className="col-span-8 flex flex-col">
          <label>Dirección</label>
          <input
            type="text"
            value={props.dataUser.billing?.address ?? ''}
            disabled
          />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Correo empresa</label>
          <input
            type="text"
            value={props.dataUser.billing?.email ?? ''}
            disabled
          />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Teléfono empresa</label>
          <input
            type="text"
            value={props.dataUser.billing?.phone ?? ''}
            disabled
          />
        </div>
      </div>
    </>
  );
};
