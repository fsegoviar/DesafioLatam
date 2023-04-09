import { useEffect, useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import {
  BsFillPersonFill,
  BsFillPersonPlusFill,
  BsCreditCard2BackFill
} from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { MdAttachMoney } from 'react-icons/md';
import { RiLockFill } from 'react-icons/ri';
import { CursoPersonal } from './panels/view-curso/CursoPersonal';
import { CursoEducacion } from './panels/view-curso/CursoEducacion';

type DialogType = {
  open: boolean;
  close: () => void;
  userData: any;
};

export const DialogForm = (props: DialogType) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    console.log('Data Selected =>', props.userData);

    if (props.open) modalRef.current.style.display = 'flex';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = (): void => {
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      props.close();
    }, 1000);
  };

  window.addEventListener(
    'click',
    (e: any) => e.target === modalRef.current && closeModal()
  );

  //Renders
  const renderIconEducacion = (options: any) => {
    return (
      <button
        type="button"
        className="flex items-center mx-2"
        onClick={options.onClick}
      >
        <BsFillPersonFill size={32} className="mr-2" />
        {options.titleElement}
      </button>
    );
  };

  const renderIconEmpleabilidad = (options: any) => {
    return (
      <button
        type="button"
        className="flex items-center mx-2"
        onClick={options.onClick}
      >
        <BsFillPersonPlusFill size={32} className="mr-2" />
        {options.titleElement}
      </button>
    );
  };

  const renderIconRegistro = (options: any) => {
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

  const renderIconDeuda = (options: any) => {
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

  const renderIconFacturacion = (options: any) => {
    return (
      <button
        type="button"
        className="flex items-center  mx-2"
        onClick={options.onClick}
      >
        <MdAttachMoney size={32} className="mr-2" />
        {options.titleElement}
      </button>
    );
  };

  const renderIconInfoPago = (options: any) => {
    return (
      <button
        type="button"
        className="flex items-center mx-2"
        onClick={options.onClick}
      >
        <RiLockFill size={32} className="mr-2" />
        {options.titleElement}
      </button>
    );
  };

  const renderIconPersonal = (options: any) => {
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

  return (
    <div className="window-background" id="window-background" ref={modalRef}>
      <div
        className="window-container width-form"
        id="w
        indow-container"
        ref={containerRef}
      >
        <p className="text-xl font-bold text-center pb-5">
          Formulario de Curso
        </p>
        <TabView>
          <TabPanel header="Personal" headerTemplate={renderIconPersonal}>
            <CursoPersonal />
          </TabPanel>
          <TabPanel header="Educación" headerTemplate={renderIconEducacion}>
            <CursoEducacion />
          </TabPanel>
          <TabPanel
            header="Empleabilidad"
            headerTemplate={renderIconEmpleabilidad}
          >
            <p>Panel 3</p>
          </TabPanel>
          <TabPanel header="Registro" headerTemplate={renderIconRegistro}>
            <p>Panel 4</p>
          </TabPanel>
          <TabPanel header="Deuda" headerTemplate={renderIconDeuda}>
            <p>Panel 5</p>
          </TabPanel>
          <TabPanel header="Facturación" headerTemplate={renderIconFacturacion}>
            <p>Panel 6</p>
          </TabPanel>
          <TabPanel header="Info de pago" headerTemplate={renderIconInfoPago}>
            <p>Panel 7</p>
          </TabPanel>
        </TabView>
        <div className="mt-5  w-full flex justify-end">
          <button
            className="m-1 px-5 rounded-lg text-white bg-gray-500"
            style={{ border: '3px solid gray' }}
            onClick={() => closeModal()}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
