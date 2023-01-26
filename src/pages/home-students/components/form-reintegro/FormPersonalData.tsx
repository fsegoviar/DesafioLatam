type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
};

export const FormPersonalData = (props: PropsFormUser) => {
  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };
  return (
    <div className="mt-10">
      <div className="grid gap-4 grid-cols-4 ">
        <div className="col-span-2 flex flex-col">
          <label>Nombre</label>
          <input type="text" disabled />
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Apellidos</label>
          <input type="text" />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-4 mt-5">
        <div className="col-span-2  flex flex-col">
          <label>Tipo de Identificación</label>
          <select
            name=""
            id=""
            className="w-full p-1.5 border-2 rounded-lg border-black"
          >
            <option value="" disabled>
              Seleccionar
            </option>
            <option value="">Rut</option>
            <option value="">Pasaporte</option>
          </select>
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Número de identificación</label>
          <input type="text" />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-4 mt-5">
        <div className="w-full flex flex-col col-span-2">
          <label>Código teléfonico</label>
          <select
            name=""
            id=""
            className="w-full py-1.5 border-2 rounded-lg border-black "
          >
            <option value="">Seleccionar</option>
            <option value="">(+569)</option>
            <option value="">(+521)</option>
          </select>
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Número teléfonico</label>
          <input type="text" />
        </div>
      </div>
      <div className="grid grid-cols-4 mt-5">
        <div className="col-span-4 flex flex-col">
          <label>Correo electrónico</label>
          <input type="email" />
        </div>
      </div>

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
      </div>

      <div className="flex justify-end mt-5">
        <button className="btn m-1" type="button" onClick={() => nextStep()}>
          Siguiente
        </button>
      </div>
    </div>
  );
};
