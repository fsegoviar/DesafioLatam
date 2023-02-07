type PropsForm = {
  setOpen: (value: boolean) => void;
  setShowPanel: (value: boolean) => void;
};
export const FormDataProgram = (props: PropsForm) => {
  return (
    <div>
      <div className={'flex'}>
        <div className={'flex flex-col mx-5 my-2'}>
          <label>Nombre</label>
          <input type="text" />
        </div>
        <div className={'flex flex-col mx-5 my-2'}>
          <label>Programa</label>
          <input type="text" />
        </div>
        <div className={'flex flex-col mx-5 my-2'}>
          <label>Valor del programa</label>
          <input type="text" />
        </div>
      </div>
      <div className={'flex'}>
        <div className={'flex flex-col mx-5 my-2'}>
          <label>Descuento cuotas (%)</label>
          <input type="text" />
        </div>
        <div className={'flex flex-col mx-5 my-2'}>
          <label>Descuento anticipado (%)</label>
          <input type="text" />
        </div>
        <div className={'flex flex-col mx-5 my-2'}>
          <label>Matricula</label>
          <input type="text" />
        </div>
      </div>
      <div className={'flex w-full'}>
        <div className={'flex flex-col mx-5 my-2 w-full'}>
          <label>Motivo del descuento</label>
          <textarea className={'border-2 border-black w-full'} rows={3} />
        </div>
      </div>

      <div className={'flex justify-end mt-5'}>
        <button className={'btn-prev m-1'} onClick={() => props.setOpen(false)}>
          Cerrar
        </button>
        <button className={'btn m-1'} onClick={() => props.setShowPanel(true)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};
