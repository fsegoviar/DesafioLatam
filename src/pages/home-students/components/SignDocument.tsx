import React from 'react';

type PropsFormUser = {
  currentStep: number;
  setCurrentStep: (value: number) => void;
};

export const SignDocument = (props: PropsFormUser) => {
  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };

  return (
    <div className={'container-firma'}>
      <h1 className={'text-5xl font-bold w-3/5 text-center'}>
        Firma acuerdo vía Docusign
      </h1>
      {/* Falta la imagen de firma */}
      <img
        src={require('../../../assets/images/img_firma.png')}
        className={'w-3/5 py-5'}
        alt={'firma-docusign'}
      />
      <div className="flex justify-end mt-5">
        <button className="btn" type="submit" onClick={() => nextStep()}>
          Firmar ahora
        </button>
      </div>
    </div>
  );
};
