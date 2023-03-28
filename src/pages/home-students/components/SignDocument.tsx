import axios, { AxiosError } from 'axios';
import React from 'react';

type PropsFormUser = {
  currentStep: number;
  setCurrentStep: (value: number) => void;
};

export const SignDocument = (props: PropsFormUser) => {
  // const nextStep = () => {
  //   props.setCurrentStep(props.currentStep + 1);
  // };

  const handleConnectDocusign = () => {
    axios
      .get(`${process.env.REACT_APP_API_BACKEND}/connect-docusign`)
      .then((response: any) => {
        console.log('Response Docusign =>', response.data);
        window.location.replace(response.data);
      })
      .catch((error: AxiosError) =>
        console.log('Error Docusign connection =>', error)
      );
  };

  return (
    <div className="flex justify-center">
      <div className={'container-firma'}>
        <h1 className={'text-4xl font-bold w-3/5 text-center'}>
          Firma acuerdo vía Docusign
        </h1>
        {/* Falta la imagen de firma */}
        <img
          src={require('../../../assets/images/img_firma.png')}
          className={'w-2/5 py-5'}
          alt={'firma-docusign'}
        />
        <div className="flex justify-end mt-5">
          <button className="btn" type="submit" onClick={handleConnectDocusign}>
            Firmar ahora
          </button>
        </div>
      </div>
    </div>
  );
};
