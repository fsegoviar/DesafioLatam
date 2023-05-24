import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import GoogleLogin from '@leecheuk/react-google-login';
import { GoogleLoginButton } from 'react-social-login-buttons';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const [errorLogin, setErrorLogin] = useState(false);
  const navigate= useNavigate();

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: String(process.env.REACT_APP_KEY_GOOGLE),
        scope: 'email'
      });
    };

    gapi.load('client:auth2', start);
  }, []);

  const response = async (data: any) => {
    //console.log('response =>', data);

    await axios.post(`${process.env.REACT_APP_API_BACKEND}/google/verification`, {
      access_token: data.accessToken
    },{
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response: any) => {
        console.log('Response verification =>', response);
        if(response.data.error === 401){
          setErrorLogin(true)
        }
        else{
          localStorage.setItem('token_hhrr_latam', response.data.accessToken)
          navigate('/servicio_cliente')
        }
      })
      .catch((error: AxiosError) => {
        console.log('Error verification =>', error)

      });
  };

  return (
    <div className='w-full h-screen flex justify-center items-center '>
      <div
        id='container-login'
        className='border-2 w-3/12 h-3/6 rounded-3xl shadow-lg shadow-gray-500/30'
      >
        <div className='mt-5 w-full h-2/6 flex justify-center'>
          <div>
            <img
              src={require('../../assets/images/logo-academia-slogan.png')}
              alt='logodesafio'
            />
          </div>
        </div>
        <div className='mt-10 flex justify-center'>
          <div className={'flex flex-col'}>
            <GoogleLogin
              clientId={String(process.env.REACT_APP_KEY_GOOGLE)}
              buttonText='Login'
              onSuccess={response}
              onFailure={response}
              render={(renderProps: any) => (
                <GoogleLoginButton
                  onClick={renderProps.onClick}
                  text={'Iniciar con Google'}
                  style={{
                    background: '#3686a3',
                    color: '#FFFFFF'
                  }}
                  activeStyle={{
                    background: '#59aac8'
                  }}
                />
              )}
              cookiePolicy={'single_host_origin'}
            />
            {errorLogin && <span className={'text-center text-red-500'}>Usuario no autorizado</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
