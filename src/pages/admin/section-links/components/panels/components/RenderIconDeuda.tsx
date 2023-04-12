import { BsCreditCard2BackFill } from 'react-icons/bs';

export const RenderIconDeuda = (options: any) => {
  return (
    <button
      type="button"
      className="flex items-center  mx-2"
      onClick={options.onClick}
    >
      <BsCreditCard2BackFill size={32} className="mr-2" />
      {options.titleElement}
    </button>
  );
};
