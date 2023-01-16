import { Navbar } from '../../components';
import React, { useState } from 'react';
import { TiTick } from 'react-icons/ti';
import './styles.css';
import { FormPersonalData } from './components/FormPersonalData';
import { SelectPayment } from './components/SelectPayment';
import { SignDocument } from './components/SignDocument';
import { FinishPayment } from './components/FinishPayment';
import { FormLaborData } from './components/FormLaborData';
import { EducationForm } from './components/EducationForm';

export const HomeStudentsPage = () => {
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
  return (
    <>
      <Navbar />
      <div
        className="pt-48 p-10 w-full h-auto min-h-screen flex justify-center"
        style={{ background: '#F9F9F9' }}
      >
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-between">
              {steps?.map((step, index) => (
                <div
                  key={index}
                  className={`step-item ${
                    currentStep === index + 1 && 'active'
                  } ${(index + 1 < currentStep || complete) && 'complete'}`}
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
                return <FinishPayment />;
              default:
                break;
            }
          })()}
        </div>
      </div>
    </>
  );
};
