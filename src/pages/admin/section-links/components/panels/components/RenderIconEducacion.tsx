import { BsFillBookFill } from 'react-icons/bs';

export const RenderIconEducacion = (options: any) => {
  return (
    <button
      type="button"
      className="flex items-center mx-2"
      onClick={options.onClick}
    >
      <BsFillBookFill size={32} className="mr-2" />
      {options.titleElement}
    </button>
  );
};
