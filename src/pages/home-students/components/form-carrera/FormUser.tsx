import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TiArrowUp } from 'react-icons/ti';

type FormType = {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoIdentificacion: string;
  numIdentificacion: string;
  codPais: string;
  numTelefono: string;
  correo: string;
  fechaNacimiento: string;
  nivelEducacional: string;
  nivelIngles: string;
  conocimientosPrevios: string;
  descripcionEducacion: string; // ¿Cuales?
  situacionLaboral: string;
  linkLinkedin: string;
  empresaActual: string;
  cargo: string;
  renta: number;
  carreraMatricula: string;
  genracion: string;
};

type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
};

export const FormUser = (props: PropsFormUser) => {
  const { handleSubmit } = useForm<FormType>();
  const [showStep1, setShowStep1] = useState(false);
  const [showStep2, setShowStep2] = useState(true);
  const [showStep3, setShowStep3] = useState(true);
  const [showStep4, setShowStep4] = useState(true);

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);
    props.currentStep === props.stepsLength
      ? props.setComplete(true)
      : props.setCurrentStep(props.currentStep + 1);
  };

  return (
    <form method="post" className="mt-5" onSubmit={handleSubmit(onSubmit)}>
      {/* Paso 1 - Datos personales */}
      <div
        className={'container-layout flex justify-between'}
        onClick={() => setShowStep1(!showStep1)}
      >
        <label className={'text-gray-700 cursor-pointer'}>
          {' '}
          Datos personales
        </label>
        <TiArrowUp
          className={` animation-arrow cursor-pointer ${
            showStep1 && 'rotate-180'
          }`}
          size={32}
        />
      </div>
      <div
        className={` content-step ${
          showStep1 ? 'collapse-step-1' : 'expand-step-1'
        }`}
      >
        <div className={`flex`}>
          <input type="text" placeholder="Nombre" disabled />
          <input type="text" placeholder="Apellido Paterno" />
          <input type="text" placeholder="Apellido Materno" />
          <input type="text" placeholder="Tipo de Identificación" />
        </div>
        <div className="grid grid-cols-3">
          <input type="text" placeholder="Número de identificación" />
          <input type="text" placeholder="Código del país" />
          <input type="text" placeholder="Número de teléfono" />
        </div>
        <div className="grid grid-cols-3">
          <input type="email" placeholder="Correo electrónico" />
          <input type="text" placeholder="Dirección" />
          <input type="text" placeholder="Fecha de nacimiento" />
        </div>
        <div className="grid grid-cols-3">
          <input type="text" placeholder="Ciudad" />
          <input type="text" placeholder="País de residencia" />
          <input type="text" placeholder="Nacionalidad" />
        </div>
      </div>
      {/* Paso 2 - Educación */}
      <div className="mt-5">
        <div
          className={'container-layout flex justify-between'}
          onClick={() => setShowStep2(!showStep2)}
        >
          <label className={'text-gray-700 cursor-pointer'}>Educación</label>
          <TiArrowUp
            className={` animation-arrow cursor-pointer ${
              showStep2 && 'rotate-180'
            }`}
            size={32}
          />
        </div>
        <div
          className={` content-step ${
            showStep2 ? 'collapse-step-1' : 'expand-step-2'
          }`}
        >
          <div className="grid grid-cols-2">
            <input type="text" placeholder="Nivel educacional" />
            <input type="text" placeholder="Nivel de ingles" />
          </div>
          <div className="grid grid-cols-2">
            <input type="text" placeholder="¿Posee conocimientos previos?" />
            <input type="text" placeholder="¿Cuales?" />
          </div>
        </div>
      </div>
      {/* Paso 3 - Empleabilidad */}
      <div className="mt-3">
        <div
          className={'container-layout flex justify-between'}
          onClick={() => setShowStep3(!showStep3)}
        >
          <label className={'text-gray-700 cursor-pointer'}>
            Empleabilidad
          </label>
          <TiArrowUp
            className={` animation-arrow cursor-pointer ${
              showStep3 && 'rotate-180'
            }`}
            size={32}
          />
        </div>
        <div
          className={` content-step ${
            showStep3 ? 'collapse-step-1' : 'expand-step-2'
          }`}
        >
          <div className="grid grid-cols-2">
            <input type="text" placeholder="Situación laboral" />
            <input type="text" placeholder="Link Linkedin" />
          </div>
          <div className="grid grid-cols-3">
            <input type="text" placeholder="Empresa donde trabaja" />
            <input type="text" placeholder="Cargo" />
            <input type="text" placeholder="Renta Actual" />
          </div>
        </div>
      </div>
      {/* Paso 4 - Registro */}
      <div className="mt-3">
        <div
          className={'container-layout flex justify-between'}
          onClick={() => setShowStep4(!showStep4)}
        >
          <label className={'text-gray-700 cursor-pointer'}>Registro</label>
          <TiArrowUp
            className={` animation-arrow cursor-pointer ${
              showStep4 && 'rotate-180'
            }`}
            size={32}
          />
        </div>
        <div
          className={` content-step ${
            showStep4 ? 'collapse-step-1' : 'expand-step-2'
          }`}
        >
          <div className="grid grid-cols-3">
            <input
              type="text"
              className="col-span-2"
              placeholder="Carrera a la cual te estas matriculando"
            />
            <input type="text" placeholder="Generación a la que matrícula" />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button className="btn" type="submit">
          Siguiente
        </button>
      </div>
    </form>
  );
};
