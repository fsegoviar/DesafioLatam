import { useEffect, useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { FormPersonalData } from './FormPersonalData';
import { EducationForm } from './EducationForm';
import { FormLaborData } from './FormLaborData';
import { SelectPayment } from '../SelectPayment';
import { SignDocument } from '../SignDocument';
import { SimpleFinishPayment } from '../SimpleFinishPayment';
import { useSearchParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { FormAval } from './FormAval';

export const FormCarrera = () => {
  const steps = [
    'Datos personales',
    'Educación',
    'Datos laborales',
    'Forma de pago',
    'Aval',
    'Firma de acuerdo',
    'Finalizar pago'
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [dataUser, setDataUser] = useState<any>([]);
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDataUser();
    localStorage.setItem('type_form', 'registro_carrera');
    localStorage.setItem('register_id', String(params.get('register')));
    localStorage.setItem('token_user_latam', String(params.get('token')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDataUser = async () => {
    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_API_BACKEND}/registers/${params.get(
          'register'
        )}/form`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${params.get('token')}`
          }
        }
      )
      .then((response: any) => {
        console.log('Response User =>', response.data);
        setDataUser(response.data);
      })
      .catch((error: AxiosError) =>
        console.log('Error fetchDataUser =>', error)
      )
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between">
          {steps?.map((step, index) => (
            <div
              key={index}
              className={`step-item ${currentStep === index + 1 && 'active'} ${
                (index + 1 < currentStep || complete) && 'complete'
              }`}
            >
              <p className="text-gray-500">{step}</p>
              <div className="step">
                {index + 1 < currentStep || complete ? (
                  <TiTick size={24} />
                ) : (
                  index + 1
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {(() => {
        if (loading) {
          return <span>Cargando...</span>;
        } else {
          switch (currentStep) {
            case 1:
              return (
                <FormPersonalData
                  registerId={String(params.get('register'))}
                  token={String(params.get('token'))}
                  dataUser={dataUser[0]}
                  currentStep={currentStep}
                  setComplete={setComplete}
                  setCurrentStep={setCurrentStep}
                  stepsLength={steps.length}
                />
              );
            case 2:
              return (
                <EducationForm
                  registerId={String(params.get('register'))}
                  token={String(params.get('token'))}
                  dataUser={dataUser[0]}
                  currentStep={currentStep}
                  setComplete={setComplete}
                  setCurrentStep={setCurrentStep}
                  stepsLength={steps.length}
                />
              );
            case 3:
              return (
                <FormLaborData
                  registerId={String(params.get('register'))}
                  token={String(params.get('token'))}
                  dataUser={dataUser[0]}
                  currentStep={currentStep}
                  setComplete={setComplete}
                  setCurrentStep={setCurrentStep}
                  stepsLength={steps.length}
                />
              );
            case 4:
              return (
                <SelectPayment
                  registerId={String(params.get('register'))}
                  token={String(params.get('token'))}
                  prices={[dataUser[0].price]}
                  dataUser={dataUser[0]}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              );
            case 5:
              return (
                <FormAval
                  registerId={String(params.get('register'))}
                  currentStep={currentStep}
                  setComplete={setComplete}
                  setCurrentStep={setCurrentStep}
                  stepsLength={steps.length}
                />
              );
            case 6:
              return (
                <SignDocument
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              );
            case 7:
              return <SimpleFinishPayment />;
            default:
              break;
          }
        }
      })()}
    </div>
  );
};
