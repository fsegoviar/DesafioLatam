import { TabPanel, TabView } from 'primereact/tabview';
import {
  BsCreditCard2BackFill,
  BsFillPersonFill,
  BsFillPersonPlusFill
} from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { MdAttachMoney } from 'react-icons/md';
import { RiLockFill } from 'react-icons/ri';

export const PanelCarrera = () => {
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

  return (
    <>
      <p className="text-xl font-bold text-center pb-5">
        Formulario de Carrera
      </p>
      <TabView>
        <TabPanel header="Personal" headerTemplate={renderIconPersonal}>
          <p>Panel 1</p>
        </TabPanel>
        <TabPanel header="Educación" headerTemplate={renderIconEducacion}>
          <p>Panel 2</p>
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
    </>
  );
};
