import { Link } from 'react-router-dom';

export const NavLink = () => {
  return (
    <div className="w-full bg-white h-14 drop-shadow-xl flex items-center px-10">
      <Link to={'/servicio_cliente'} className="mx-1 text-blue-400">
        <i className="pi pi-link mr-2"></i>Enlaces
      </Link>
      <Link to={'/tabla_precios'} className="mx-5 text-blue-400">
        <i className="pi pi-table mr-1"></i>Tabla de precios
      </Link>
    </div>
  );
};
