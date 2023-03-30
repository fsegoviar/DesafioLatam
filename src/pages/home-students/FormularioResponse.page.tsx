import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const FormularioResponsePage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem('token_ds', String(params.get('token_ds')));
    navigate(
      `/formulario/${localStorage.getItem(
        'type_form'
      )}?register=${localStorage.getItem(
        'register_id'
      )}&token=${localStorage.getItem('token_user_latam')}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Cargando..</div>;
};
