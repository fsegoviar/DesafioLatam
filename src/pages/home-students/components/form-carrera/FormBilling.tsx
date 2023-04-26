import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BillingType } from '../../../../interfaces/Billing';
import { RequiredField } from '../../../../components';
import axios, { AxiosError } from 'axios';
import ChileanRutify from 'chilean-rutify';

type PropsFormUser = {
  currentStep: number;
  setCurrentStep: (value: number) => void;
  dataUser: any;
  registerId: string;
};

export const FormBilling = (props: PropsFormUser) => {
  const [isBilling, setIsBilling] = useState(true);
  const [inputRut, setInputRut] = useState('');
  const [inputRutRepresentative, setInputRutRepresentative] = useState('');
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm<BillingType>({
    defaultValues: {
      address: props.dataUser.billing?.address ?? '',
      business_line: props.dataUser.billing?.business_line ?? '',
      business_name: props.dataUser.billing?.business_name ?? '',
      dni: props.dataUser.billing?.dni ?? '',
      document_type_id: props.dataUser.billing?.document_type_id ?? null,
      email: props.dataUser.billing?.email ?? '',
      phone: props.dataUser.billing?.phone ?? null,
      representative_dni: props.dataUser.billing?.representative_dni ?? '',
      representative_fullname:
        props.dataUser.billing?.representative_fullname ?? ''
    }
  });

  useEffect(() => {
    if (props.dataUser.billing?.address) {
      setIsBilling(false);
      setInputRut(props.dataUser.billing?.dni);
      setInputRutRepresentative(props.dataUser.billing?.representative_dni);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevStep = () => {
    props.setCurrentStep(props.currentStep - 1);
  };

  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };

  const onSubmit: SubmitHandler<BillingType> = async (data) => {
    console.log('Submit Billing =>', data);

    if (isBilling) {
      await axios
        .post(`${process.env.REACT_APP_API_BACKEND}/register_form/billing`, {
          document_type_id: '1',
          register_id: props.registerId,
          address: '',
          business_line: '',
          business_name: '',
          dni: '',
          email: '',
          phone: '',
          representative_dni: '',
          representative_fullname: ''
        })
        .then((response: any) => {
          console.log('Response Billing =>', response.data);
          nextStep();
        })
        .catch((error: AxiosError) => console.log('Error Billing =>', error));
    } else {
      console.log('DATA BILLING =>', {
        ...data,
        register_id: props.registerId
      });
      await axios
        .post(`${process.env.REACT_APP_API_BACKEND}/register_form/billing`, {
          ...data,
          register_id: props.registerId
        })
        .then((response: any) => {
          console.log('Response Billing =>', response.data);
          nextStep();
        })
        .catch((error: AxiosError) => console.log('Error Billing =>', error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="flex flex-col items-center">
        <p className="font-bold text-2xl">Documento a emitir</p>

        <div className="flex justify-center">
          <div className="mt-1 mx-5">
            <input
              type="radio"
              name="tipo"
              id="si"
              checked={!isBilling}
              onChange={() => {
                setIsBilling(false);
                setValue('document_type_id', 2);
              }}
            />
            <label htmlFor="si" className="ml-1">
              Factura
            </label>
          </div>
          <div className="mt-1 mx-5">
            <input
              type="radio"
              name="tipo"
              id="no"
              checked={isBilling}
              onChange={() => {
                setIsBilling(true);
                setValue('document_type_id', 1);
              }}
            />
            <label htmlFor="no" className="ml-1">
              Boleta
            </label>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="grid gap-4 grid-cols-4 ">
          <div className="col-span-2 flex flex-col">
            <label>Razón Social</label>
            <input
              type="text"
              disabled={isBilling}
              {...register('business_name', { required: !isBilling ?? true })}
            />
            {errors.business_name && <RequiredField />}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Rut Empresa</label>
            <input
              type="text"
              disabled={isBilling}
              value={inputRut}
              onKeyDown={(input: any) => {
                const esNumero =
                  (input.keyCode >= 48 && input.keyCode <= 57) || // números de teclado normal
                  (input.keyCode >= 96 && input.keyCode <= 105) ||
                  input.keyCode === 8; // números del teclado numérico

                if (!esNumero) {
                  input.preventDefault(); // detiene la propagación del evento
                }
              }}
              {...register('dni', {
                required: !isBilling ?? true,
                onChange: (e) => {
                  if (e.target.value !== '-' && e.target.value !== '') {
                    setInputRut(
                      String(ChileanRutify.formatRut(e.target.value))
                    );
                    setValue(
                      'dni',
                      String(ChileanRutify.formatRut(e.target.value))
                    );
                  } else {
                    setInputRut('-');
                  }
                },
                validate: (v) => {
                  return ChileanRutify.validRut(v);
                }
              })}
            />
            {errors.dni?.type === 'required' && (
              <span className="text-red-500 text-sm font-light">
                Rut requerido
              </span>
            )}
            {errors.dni?.type === 'validate' && (
              <span className="text-red-500 text-sm font-light">
                Rut invalido
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-4 grid-cols-4 ">
          <div className="col-span-2 flex flex-col">
            <label>Giro</label>
            <input
              type="text"
              disabled={isBilling}
              {...register('business_line', {
                required: !isBilling ?? true
              })}
            />
            {errors.business_line && <RequiredField />}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Dirección</label>
            <input
              type="text"
              disabled={isBilling}
              {...register('address', { required: !isBilling ?? true })}
            />
            {errors.address && <RequiredField />}
          </div>
        </div>

        <div className="grid gap-4 grid-cols-4 ">
          <div className="col-span-2 flex flex-col">
            <label>Email Empresa</label>
            <input
              type="email"
              disabled={isBilling}
              {...register('email', { required: !isBilling ?? true })}
            />
            {errors.email && <RequiredField />}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Teléfono Empresa</label>
            <input
              type="number"
              disabled={isBilling}
              {...register('phone', {
                required: !isBilling ?? true,
                minLength: !isBilling ? 5 : 0,
                maxLength: !isBilling ? 15 : 999
              })}
            />
            {errors.phone?.type === 'required' && <RequiredField />}
            {errors.phone?.type === 'maxLength' && (
              <span className="text-red-500 text-sm font-light">
                Debe tener menos de 15 digitos
              </span>
            )}
            {errors.phone?.type === 'minLength' && (
              <span className="text-red-500 text-sm font-light">
                Debe tener más de 5 digitos
              </span>
            )}
          </div>
        </div>
        <div className="grid gap-4 grid-cols-4 ">
          <div className="col-span-2 flex flex-col">
            <label>Nombre representante</label>
            <input
              type="text"
              disabled={isBilling}
              {...register('representative_fullname', {
                required: !isBilling ?? true
              })}
            />
            {errors.representative_fullname?.type === 'required' && (
              <RequiredField />
            )}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Rut del representante</label>
            <input
              type="text"
              disabled={isBilling}
              onKeyDown={(input: any) => {
                const esNumero =
                  (input.keyCode >= 48 && input.keyCode <= 57) || // números de teclado normal
                  (input.keyCode >= 96 && input.keyCode <= 105) ||
                  input.keyCode === 8; // números del teclado numérico

                if (!esNumero) {
                  input.preventDefault(); // detiene la propagación del evento
                }
              }}
              value={inputRutRepresentative}
              {...register('representative_dni', {
                required: !isBilling ?? true,
                onChange: (e) => {
                  if (e.target.value !== '-' && e.target.value !== '') {
                    setInputRutRepresentative(
                      String(ChileanRutify.formatRut(e.target.value))
                    );
                    setValue(
                      'representative_dni',
                      String(ChileanRutify.formatRut(e.target.value))
                    );
                  } else {
                    setInputRutRepresentative('-');
                  }
                },
                validate: (v) => {
                  return ChileanRutify.validRut(v);
                }
              })}
            />
            {errors.representative_dni?.type === 'required' && (
              <span className="text-red-500 text-sm font-light">
                Rut requerido
              </span>
            )}
            {errors.representative_dni?.type === 'validate' && (
              <span className="text-red-500 text-sm font-light">
                Rut invalido
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button className="btn-prev m-1" onClick={() => prevStep()}>
          Atras
        </button>
        <button className="btn m-1" type="submit">
          Siguiente
        </button>
      </div>
    </form>
  );
};
