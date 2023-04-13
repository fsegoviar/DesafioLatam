import React from 'react';

type PropsPanel = {
  dataUser: any;
};

export const AvalComponent = (props: PropsPanel) => {
  return (
    <>
      <div className="grid gap-4 grid-cols-8 ">
        <div className="col-span-4 flex flex-col">
          <label>Nombre aval</label>
          <input type="text" value={props.dataUser.guarantee?.name ?? ''} disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Apellido aval</label>
          <input type="text" value={props.dataUser.guarantee?.lastname ?? ''} disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Número de identificación</label>
          <input type="text" value={props.dataUser.guarantee?.dni ?? ''} disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Teléfono</label>
          <input type="text" value={props.dataUser.guarantee?.phone ?? ''} disabled />
        </div>
        <div className="col-span-8 flex flex-col">
          <label>Dirección</label>
          <input type="text" value={props.dataUser.guarantee?.address ?? ''} disabled />
        </div>
      </div>
    </>
  );
};
