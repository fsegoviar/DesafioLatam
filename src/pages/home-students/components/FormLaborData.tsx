import React from 'react';

type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
};

export const FormLaborData = (props: PropsFormUser) => {
  const situaciones = [
    'Estudiante',
    'Desempleado',
    'Independiente',
    'Contrato tiempo completo',
    'Contatro medio tiempo',
    'Pensionado'
  ];

  const prevStep = () => {
    props.setCurrentStep(props.currentStep - 1);
  };

  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };

  return (
    <div>
      {/* Paso 3 - Empleabilidad */}
      <div className="mt-10">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 flex flex-col">
            <label>Situación Laboral</label>
            <select
              name=""
              id=""
              className="w-full py-1.5 border-2 rounded-lg  border-black"
            >
              <option value="">Seleccionar</option>
              {situaciones.map((situacion) => (
                <option value="">{situacion}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Renta Actual</label>
            <input type="text" />
          </div>
        </div>
        <div className="col-span-2 flex flex-col mt-3">
          <label>Enlace LinkedIn</label>
          <input type="text" />
        </div>
        <div className="grid grid-cols-4 mt-3 gap-4">
          <div className="col-span-2 flex flex-col">
            <label>Empresa donde trabaja</label>
            <input type="text" />
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Cargo</label>
            <input type="text" />
          </div>
        </div>
      </div>
      {/* Paso 4 - Registro */}
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
        <div className="flex justify-end">
          <p className="mt-3 text-sm font-light">
            ( * ) Esta información ayuda a nuestro equipo de asesores/as de
            empleabilidad a buscar las mejores alternativas laborales para ti
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button className="btn-prev m-1" onClick={() => prevStep()}>
          Atras
        </button>
        <button className="btn m-1" type="button" onClick={() => nextStep()}>
          Siguiente
        </button>
      </div>
    </div>
  );
};
