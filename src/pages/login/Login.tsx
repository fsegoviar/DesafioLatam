import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import GoogleLogin from '@leecheuk/react-google-login';
import { GoogleLoginButton } from 'react-social-login-buttons';

export const Login = () => {
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: String(process.env.REACT_APP_KEY_GOOGLE),
        scope: 'email'
      });
    };

    gapi.load('client:auth2', start);
  }, []);

  const response = (data: any) => {
    console.log('response =>', data);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div
        id="container-login"
        className="border-2 w-3/12 h-3/6 rounded-3xl shadow-lg shadow-gray-500/30"
      >
        <div className="mt-5 w-full h-2/6 flex justify-center">
          <div>
            <img
              src={require('../../assets/images/logo-academia-slogan.png')}
              alt="logodesafio"
            />
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <div>
            <GoogleLogin
              clientId={String(process.env.REACT_APP_KEY_GOOGLE)}
              buttonText="Login"
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
          </div>
        </div>
      </div>
    </div>
  );
};
