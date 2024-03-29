import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from './NavLink';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const closeSession = () => {
    localStorage.removeItem('token_hhrr_latam')
    navigate("/login")
  }

  return (
    <div className="fixed w-full top-0 z-40">
      <div className="w-full bg-gray-600 h-20">
        <div className="flex m-auto h-full items-center justify-between px-10">
          <div>
            <img
              src={require('./../assets/images/logo-academia-ne.png')}
              alt=""
              className="w-3/12"
            />
          </div>
					{(location.pathname === '/servicio_cliente' || location.pathname === '/tabla_precios') && (
						<p className={'text-white text-2xl cursor-pointer'} onClick={closeSession}>
							Cerrar Sesión
						</p>
       	 	)}
        </div>
      </div>
      {(location.pathname === '/servicio_cliente' ||
        location.pathname === '/tabla_precios') && <NavLink />}
    </div>
  );
};
