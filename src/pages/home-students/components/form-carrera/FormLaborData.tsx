import React from 'react';
import { GetWorkSituations } from '../../../../services';
import { useForm } from 'react-hook-form';

type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
  registerId: string;
  token: string;
  dataUser: any;
};

export const FormLaborData = (props: PropsFormUser) => {
  const { workSituations } = GetWorkSituations();
  const {} = useForm({
    defaultValues: {
      register_id: props.registerId,
      work_situation_id: null,
      linkedin: null,
      organization: null,
      position: null,
      rent: null
    }
  });

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
              {workSituations &&
                workSituations.map((niv, index) => (
                  <option key={index} value={niv.id}>
                    {niv.description}
                  </option>
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
