import { GrUserWorker } from 'react-icons/gr';

export const RenderIconEmpleabilidad = (options: any) => {
  return (
    <button
      type="button"
      className="flex items-center mx-2"
      onClick={options.onClick}
    >
      <GrUserWorker size={32} className="mr-2" />
      {options.titleElement}
    </button>
  );
};
