import { useLocation } from 'react-router-dom';
import { NavLink } from './NavLink';

export const Navbar = () => {
  const location = useLocation();

  return (
    <div className="fixed w-full top-0 z-10">
      <div className="w-full bg-gray-600 h-20">
        <div className="flex m-auto h-full items-center justify-between px-10">
          <div>
            <img
              src={require('./../assets/images/logo-academia-ne.png')}
              alt=""
              className="w-3/12"
            />
          </div>
          <div>
            <h2 className="text-2xl text-white">Administrador</h2>
          </div>
        </div>
      </div>
      {(location.pathname === '/servicio_cliente' ||
        location.pathname === '/tabla_precios') && <NavLink />}
    </div>
  );
};
