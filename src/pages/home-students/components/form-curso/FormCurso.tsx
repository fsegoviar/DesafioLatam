import { useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { FormPersonalData } from './FormPersonalData';
import { SignDocument } from '../SignDocument';
import { FormBilling } from './FormBilling';
import { SimpleFinishPayment } from '../SimpleFinishPayment';

export const FormCurso = () => {
  const steps = [
    'Datos personales',
    'Documento a emitir',
    'Forma de pago',
    'Firma de acuerdo',
    'Finalizar pago'
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

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
        switch (currentStep) {
          case 1:
            return (
              <FormPersonalData
                currentStep={currentStep}
                setComplete={setComplete}
                setCurrentStep={setCurrentStep}
                stepsLength={steps.length}
              />
            );
          case 2:
            return (
              <FormBilling
                currentStep={currentStep}
                setComplete={setComplete}
                setCurrentStep={setCurrentStep}
                stepsLength={steps.length}
              />
            );
          case 3:
            return (
              // <SelectPayment
              //   registerId={String(params.get('register'))}
              //   token={String(params.get('token'))}
              //   prices={[...dataUser[0].price]}
              //   currentStep={currentStep}
              //   setCurrentStep={setCurrentStep}
              // />
              <></>
            );
          case 4:
            return (
              <SignDocument
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            );
          case 5:
            return <SimpleFinishPayment />;
          default:
            break;
        }
      })()}
    </div>
  );
};
