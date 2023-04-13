import React from 'react';

type PropsPanel = {
  dataUser: any;
};

export const CursoPersonal = (props: PropsPanel) => {
  return (
    <>
      <div className="grid gap-4 grid-cols-8 ">
        <div className="col-span-2 flex flex-col">
          <label>Nombre</label>
          <input type="text" value={props.dataUser.user?.name ?? ''} disabled />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Apellidos</label>
          <input type="text" value={props.dataUser.user?.lastname ?? ''} disabled />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Número de identificación</label>
          <input type="text" value={props.dataUser.user?.dni ?? ''} disabled />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Número teléfonico</label>
          <input type="text" value={props.dataUser.user?.phone ?? ''} disabled />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-8 mt-5">
        <div className="col-span-4 flex flex-col">
          <label>Correo electrónico</label>
          <input type="email" value={props.dataUser.user?.email ?? ''} disabled />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Carrera a la cual te estas matriculando</label>
          <input type="text" value={props.dataUser.career?.description ?? ''} disabled />
        </div>
      </div>
    </>
  );
};
