import { BsFillPersonFill } from 'react-icons/bs';

export const RenderIconPersonal = (options: any) => {
  return (
    <button
      type="button"
      className="flex items-center"
      onClick={options.onClick}
    >
      <BsFillPersonFill size={32} className="mr-2" />
      {options.titleElement}
    </button>
  );
};
