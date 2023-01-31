import React from 'react';
import { GetEducationLevel, GetEnglishLevel } from '../../../../services';

type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
};

export const EducationForm = (props: PropsFormUser) => {
  const { englishLevel } = GetEnglishLevel();
  const { educationLevel } = GetEducationLevel();

  const prevStep = () => {
    props.setCurrentStep(props.currentStep - 1);
  };

  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };

  return (
    <div>
      <div className="mt-10">
        <div className="grid gap-4 grid-cols-4">
          <div className="col-span-2 flex flex-col">
            <label>Nivel de educación</label>
            <select
              name=""
              id=""
              className="py-1.5 border-2 rounded-lg border-black"
            >
              <option value="">Seleccionar</option>
              {educationLevel &&
                educationLevel.map((niv, index) => (
                  <option key={index} value={niv.id}>
                    {niv.description}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Nivel de ingles</label>
            <select
              name=""
              id=""
              className=" py-1.5 border-2 rounded-lg border-black"
            >
              <option value="">Seleccionar</option>
              {englishLevel &&
                englishLevel.map((niv, index) => (
                  <option key={index} value={niv.id}>
                    {niv.description}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="mt-3">
          <div>
            <textarea
              className="w-full rounded-lg border-2 border-black p-2"
              name=""
              placeholder="¿Posee conocimientos previos?. ¿Cuales?"
              id=""
              rows={4}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
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
