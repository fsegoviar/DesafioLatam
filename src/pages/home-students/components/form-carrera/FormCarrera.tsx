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

export const FormCarrera = () => {
  const steps = [
    'Datos personales',
    'Educación',
    'Datos laborales',
    'Forma de pago',
    'Firma de acuerdo',
    'Finalizar pago'
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDataUser = async () => {
    setLoading(true);
    axios
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
                  currentStep={currentStep}
                  setComplete={setComplete}
                  setCurrentStep={setCurrentStep}
                  stepsLength={steps.length}
                />
              );
            case 3:
              return (
                <FormLaborData
                  currentStep={currentStep}
                  setComplete={setComplete}
                  setCurrentStep={setCurrentStep}
                  stepsLength={steps.length}
                />
              );
            case 4:
              return (
                <SelectPayment
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              );
            case 5:
              return (
                <SignDocument
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              );
            case 6:
              return <SimpleFinishPayment />;
            default:
              break;
          }
        }
      })()}
    </div>
  );
};
