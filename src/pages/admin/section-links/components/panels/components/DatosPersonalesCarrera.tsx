import React from 'react';

type PropsDatosPersonalesCarrera = {
  dataUser: any;
};

export const DatosPersonalesCarrera = (props: PropsDatosPersonalesCarrera) => {
  return (
    <>
      <div className="grid gap-4 grid-cols-8 ">
        <div className="col-span-2 flex flex-col">
          <label>Nombre</label>
          <input type="text" value={props.dataUser.user.name ?? ''} disabled />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Apellidos</label>
          <input
            type="text"
            value={props.dataUser.user.lastname ?? ''}
            disabled
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Número de identificación</label>
          <input
            type="text"
            value={props.dataUser.user.identity_type?.description ?? ''}
            disabled
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Número teléfonico</label>
          <input type="text" value={props.dataUser.user.phone ?? ''} disabled />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>País</label>
          <input
            type="text"
            value={props.dataUser.user.country?.description ?? ''}
            disabled
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Nacionalidad</label>
          <input
            type="text"
            value={props.dataUser.user.country?.nationality ?? ''}
            disabled
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Ciudad</label>
          <input type="text" value={props.dataUser.user.city ?? ''} disabled />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Dirección</label>
          <input
            type="text"
            value={props.dataUser.user.address ?? ''}
            disabled
          />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-8 mt-5">
        <div className="col-span-4 flex flex-col">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={props.dataUser.user.email ?? ''}
            disabled
          />
        </div>
        <div className="col-span-4 flex flex-col">
          <label>Carrera a la cual te estas matriculando</label>
          <input type="text" disabled />
        </div>
      </div>
    </>
  );
};
