import { MdAttachMoney } from 'react-icons/md';

export const RenderIconFacturacion = (options: any) => {
  return (
    <button
      type="button"
      className="flex items-center mx-2"
      onClick={options.onClick}
    >
      <MdAttachMoney size={32} className="mr-2" />
      {options.titleElement}
    </button>
  );
};
