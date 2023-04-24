import { useEffect, useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { useSearchParams } from 'react-router-dom';
import { FormPersonalData } from '../form-curso/FormPersonalData';
import { FormBilling } from '../form-carrera/FormBilling';
import { SelectPayment } from '../SelectPayment';
import { SignDocument } from '../SignDocument';
import { SimpleFinishPayment } from '../SimpleFinishPayment';
import axios, { AxiosError } from 'axios';

export const FormReintegro = () => {
  const steps = [
    'Datos personales',
    'Documento a emitir',
    'Forma de pago',
    'Firma de acuerdo',
    'Finalizar pago'
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [dataUser, setDataUser] = useState<any>([]);
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchDataUser();
    localStorage.setItem('type_form', 'registro_reintegro');
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
        setCurrentStep(response.data[0].step);
      })
      .catch((error: AxiosError) => {
        console.log('Error fetchDataUser =>', error);
        setError(true);
      })
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
          if (!error) {
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
                  <FormBilling
                    registerId={String(params.get('register'))}
                    dataUser={dataUser[0]}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                  />
                );
              case 3:
                return (
                  <SelectPayment
                    registerId={String(params.get('register'))}
                    token={String(params.get('token'))}
                    prices={[dataUser[0].price]}
                    dataUser={dataUser[0]}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    paymentSelected={setPaymentMethodSelected}
                    tuition={dataUser[0].price.tuition}
                  />
                );
              case 4:
                return (
                  <SignDocument
                    currentStep={currentStep}
                    paymentMethod={paymentMethodSelected}
                    setCurrentStep={setCurrentStep}
                  />
                );
              case 5:
                return (
                  <SimpleFinishPayment
                    dataUser={dataUser[0]}
                    suppliers={dataUser[0].price.suppliers}
                  />
                );
              default:
                break;
            }
          } else {
            return (
              <div className="text-center font-bold w-100 py-40">
                <p>Hubo un error al cargar los datos</p>
              </div>
            );
          }
        }
      })()}
    </div>
  );
};
