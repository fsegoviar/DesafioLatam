import React from 'react';

type PropsPanel = {
  dataUser: any;
};
export const LaboralComponent = (props: PropsPanel) => {
  return (
    <>
      <div className="grid gap-4 grid-cols-8 ">
        <div className="col-span-4 flex flex-col">
          <label>Situación laboral</label>
          <input type="text" value={props.dataUser.user.empleability?.work_situation?.description ?? ''} disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Renta actual</label>
          <input type="text" value={props.dataUser.user.empleability?.rent ?? ''} disabled />
        </div>
        <div className="col-span-8 flex flex-col">
          <label>Enlace linkedin</label>
          <input type="text" value={props.dataUser.user.empleability?.linkedin ?? ''} disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Empresa donde trabaja</label>
          <input type="text" value={props.dataUser.user.empleability?.organization ?? ''} disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Cargo</label>
          <input type="text" value={props.dataUser.user.empleability?.position ?? ''} disabled />
        </div>
      </div>
    </>
  );
};
