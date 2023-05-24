import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';


const AuthLogin = ({children}: {children: ReactElement}) => {
	const location = useLocation();

	if (localStorage.getItem("token_hhrr_latam") === null) {
		return <Navigate to="/login" state={{ path: location.pathname }} />;
	}

	return children;
}

export default AuthLogin;
