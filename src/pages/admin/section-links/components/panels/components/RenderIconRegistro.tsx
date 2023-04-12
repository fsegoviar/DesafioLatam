import { HiOutlineDocumentText } from 'react-icons/hi';

export const RenderIconRegistro = (options: any) => {
  return (
    <button
      type="button"
      className="flex items-center  mx-2"
      onClick={options.onClick}
    >
      <HiOutlineDocumentText size={32} className="mr-2" />
      {options.titleElement}
    </button>
  );
};
