import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';

export const FormularioResponsePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
		getStatus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	const getStatus = async (): Promise<void> => {
		await axios
				.post(
					`${process.env.REACT_APP_API_BACKEND}/register_form/validate_envelope`,
					{
						register_id: localStorage.getItem('register_id'),
					},
					{
						headers: {
							Accept: 'application/json',
							'Access-Control-Allow-Origin': '*',
							Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
						}
					}
				)
				.then((response: any) => {
					navigate(
						`/formulario/${localStorage.getItem(
							'type_form'
						)}?register=${localStorage.getItem(
							'register_id'
						)}&token=${localStorage.getItem('token_user_latam')}`
					);
				})
				.catch((error: AxiosError) => console.log('Error:', error));
	}

  return <div className='relative h-screen w-screen flex justify-center items-center'><ProgressSpinner /></div>;
};
