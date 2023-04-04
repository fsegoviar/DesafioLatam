import axios, { AxiosError } from 'axios';

type PropsFormUser = {
  currentStep: number;
  setCurrentStep: (value: number) => void;
};

export const SignDocument = (props: PropsFormUser) => {
  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };

  const handleSigninDocument = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/docusign/sign`,
        {
          register_id: Number(localStorage.getItem('register_id')),
          payment_method: 'Anticipado'
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token_ds')}`
          }
        }
      )
      .then((response: any) => {
        console.log('Fima Documento =>', response.data);
        window.location.replace(response.data);
        // const link: any = document.createElement('a');
        // link.href = response.data;
        // link.setAttribute('target', '_blank'); //or any other extension
        // document.body.appendChild(link);
        // link.click();
      })
      .catch((error: AxiosError) =>
        console.log('Error Docusign Firma =>', error)
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
        <div className="flex justify-center mt-5">
          <button
            className="btn mx-2"
            type="submit"
            onClick={handleSigninDocument}
          >
            Firmar Documento
          </button>
          <button className="btn" onClick={nextStep}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
