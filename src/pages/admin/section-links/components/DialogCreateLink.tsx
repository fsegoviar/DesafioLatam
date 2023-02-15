import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import '../styles.css';

type DialogCreateLinkTypes = {
  open: boolean;
  close: () => void;
};

export const DialogCreateLink = (props: DialogCreateLinkTypes) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectForm, setSelectForm] = useState(null);
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  const forms = [
    { name: 'Formulario de talleres' },
    { name: 'Formulario de cursos' },
    { name: 'Formulario de reintegro' }
  ];

  useEffect(() => {
    if (props.open) modalRef.current.style.display = 'flex';
  }, [props.open]);

  const closeModal = (): void => {
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      props.close();
    }, 1000);
  };

  window.addEventListener(
    'click',
    (e: any) => e.target === modalRef.current && closeModal()
  );

  return (
    <div className="window-background" id="window-background" ref={modalRef}>
      <div
        className="window-container"
        id="window-container"
        ref={containerRef}
      >
        <p className="text-2xl">Crear Enlace</p>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <p className="font-thin">Usuario</p>
            <div>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="border-r-0 py-2 rounded-none rounded-l-lg w-8/12"
                style={{ border: '1px solid gray' }}
              />
              <button className="bg-green-500 py-[9px] px-5 rounded-tr-lg rounded-br-lg text-white">
                Buscar
              </button>
            </div>
          </div>
          <div>
            <p className="font-thin">Cursos</p>
            <div>
              <Dropdown
                value={selectedCity}
                options={cities}
                onChange={(e) => setSelectedCity(e.value)}
                optionLabel="name"
                placeholder="Select a City"
                className="w-full md:w-14rem"
              />
            </div>
          </div>
          <div className="mt-5">
            <p className="font-thin">Valor de curso $USD</p>
            <div>
              <input
                type="text"
                className="border-r-0 py-2 rounded-lg w-10/12 bg-gray-300"
                style={{ border: '1px solid gray' }}
                disabled
              />
            </div>
          </div>
          <div className="mt-5">
            <p className="font-thin">Tipo de Formulario</p>
            <div>
              <Dropdown
                value={selectForm}
                options={forms}
                onChange={(e) => setSelectForm(e.value)}
                optionLabel="name"
                placeholder="Seleccionar Formulario"
                className="w-full md:w-14rem"
              />
            </div>
          </div>
        </div>
        <div className="mt-5  w-full flex justify-end">
          <button
            className="m-1 px-5 rounded-lg text-white bg-gray-500"
            style={{ border: '3px solid gray' }}
            onClick={() => closeModal()}
          >
            Cancelar
          </button>
          <button
            className="m-1 px-5 rounded-lg text-white bg-green-500"
            style={{ border: '3px solid rgb(34 197 94)' }}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};
