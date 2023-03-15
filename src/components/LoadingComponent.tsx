import { ProgressSpinner } from 'primereact/progressspinner';

export const LoadingComponent = () => {
  return (
    <div className={'w-full h-full relative'}>
      <div className="absolute w-full h-full top-0
      left-0 flex justify-center items-center
      bg-red-500
      ">
        <ProgressSpinner />
      </div>
    </div>
  );
};
