import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

type PropsFormUser = {
  currentStep: number;
  setCurrentStep: (value: number) => void;
  paymentMethod: string;
};

export const SignDocument = (props: PropsFormUser) => {
  const user = useSelector((state: RootState) => state.user);

  console.log('User =>', user);

  const nextStep = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/registers/${localStorage.getItem(
          'register_id'
        )}/step`,
        {
          step: props.currentStep + 1
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then((response: any) => {
        console.log('Step =>', response.data);
        props.setCurrentStep(props.currentStep + 1);
      })
      .catch((error: AxiosError) => console.log('Error Aval =>', error));
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
        // console.log('Fima Documento =>', response.data);
        window.location.replace(response.data);
      })
      .catch((error: AxiosError) =>
        console.log('Error Docusign Firma =>', error)
      );
  };

  return (
    <div className="flex justify-center">
      <div className={'container-firma'}>
        <h1 className={'text-4xl font-bold w-3/5 text-center'}>
          Firma acuerdo vía DocuSign
        </h1>
        {/* Falta la imagen de firma */}
        <img
          src={require('../../../assets/images/img_firma.png')}
          className={'w-2/5 py-5'}
          alt={'firma-docusign'}
        />
        <div className="flex justify-center mt-5">
          <button
            className={`mx-2 ${
              user.status === 'Contrato Firmado'
                ? 'bg-gray-400 text-white rounded-[0.75rem] px-7 py-1 cursor-default'
                : 'btn'
            }`}
            type="submit"
            onClick={handleSigninDocument}
            disabled={user.status === 'Contrato Firmado'}
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
