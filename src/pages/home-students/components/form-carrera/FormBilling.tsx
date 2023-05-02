import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RequiredField } from '../../../../components';
import axios, { AxiosError } from 'axios';
import ChileanRutify from 'chilean-rutify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { updateDataBilling } from '../../../../store/slices/userDataFormSlice';
import { UserBilling } from '../../../../store/slices/userData.interface';

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
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      ...user
      // address: props.dataUser.billing?.address ?? '',
      // business_line: props.dataUser.billing?.business_line ?? '',
      // business_name: props.dataUser.billing?.business_name ?? '',
      // dni: props.dataUser.billing?.dni ?? '',
      // document_type_id: props.dataUser.billing?.document_type_id ?? null,
      // email: props.dataUser.billing?.email ?? '',
      // phone: props.dataUser.billing?.phone ?? null,
      // representative_dni: props.dataUser.billing?.representative_dni ?? '',
      // representative_fullname:
      //   props.dataUser.billing?.representative_fullname ?? ''
    }
  });

  useEffect(() => {
    if (user.billing && user.billing.address) {
      setIsBilling(false);
      setInputRut(user.billing.dni ?? '');
      setInputRutRepresentative(user.billing.representative_dni ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevStep = () => {
    props.setCurrentStep(props.currentStep - 1);
  };

  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };

  const onSubmit: SubmitHandler<any> = async (dataBillingForm: any) => {
    console.log('Submit Billing =>', dataBillingForm);

    if (isBilling && dataBillingForm.billing) {
      const dataBilling = {
        id: null,
        document_type_id: 1,
        address: '',
        business_line: '',
        business_name: '',
        dni: '',
        email: '',
        phone: null,
        representative_dni: '',
        representative_fullname: ''
      };
      await axios
        .post(`${process.env.REACT_APP_API_BACKEND}/register_form/billing`, {
          ...dataBilling,
          register_id: props.registerId
        })
        .then((response: any) => {
          console.log('Response Billing =>', response.data);
          dispatch(updateDataBilling(dataBilling));
          nextStep();
        })
        .catch((error: AxiosError) => console.log('Error Billing =>', error));
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_BACKEND}/register_form/billing`, {
          ...dataBillingForm.billing,
          register_id: props.registerId
        })
        .then((response: any) => {
          console.log('Response Billing =>', response.data);
          const resultBilling: UserBilling = {
            ...dataBillingForm.billing,
            id: null
          };
          dispatch(updateDataBilling(resultBilling));
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
                setValue('billing.document_type_id', 2);
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
                setValue('billing.document_type_id', 1);
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
              {...register('billing.business_name', {
                required: !isBilling ?? true
              })}
            />
            {errors.billing?.business_name && <RequiredField />}
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
              {...register('billing.dni', {
                required: !isBilling ?? true,
                onChange: (e) => {
                  if (e.target.value !== '-' && e.target.value !== '') {
                    setInputRut(
                      String(ChileanRutify.formatRut(e.target.value))
                    );
                    setValue(
                      'billing.dni',
                      String(ChileanRutify.formatRut(e.target.value))
                    );
                  } else {
                    setInputRut('-');
                  }
                },
                validate: (v: any) => {
                  return ChileanRutify.validRut(v);
                }
              })}
            />
            {errors.billing?.dni?.type === 'required' && (
              <span className="text-red-500 text-sm font-light">
                Rut requerido
              </span>
            )}
            {errors.billing?.dni?.type === 'validate' && (
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
              {...register('billing.business_line', {
                required: !isBilling ?? true
              })}
            />
            {errors.billing?.business_line && <RequiredField />}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Dirección</label>
            <input
              type="text"
              disabled={isBilling}
              {...register('billing.address', { required: !isBilling ?? true })}
            />
            {errors.billing?.address && <RequiredField />}
          </div>
        </div>

        <div className="grid gap-4 grid-cols-4 ">
          <div className="col-span-2 flex flex-col">
            <label>Email Empresa</label>
            <input
              type="email"
              disabled={isBilling}
              {...register('billing.email', { required: !isBilling ?? true })}
            />
            {errors.billing?.email && <RequiredField />}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Teléfono Empresa</label>
            <input
              type="number"
              disabled={isBilling}
              {...register('billing.phone', {
                required: !isBilling ?? true,
                minLength: !isBilling ? 5 : 0,
                maxLength: !isBilling ? 15 : 999
              })}
            />
            {errors.billing?.phone?.type === 'required' && <RequiredField />}
            {errors.billing?.phone?.type === 'maxLength' && (
              <span className="text-red-500 text-sm font-light">
                Debe tener menos de 15 digitos
              </span>
            )}
            {errors.billing?.phone?.type === 'minLength' && (
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
              {...register('billing.representative_fullname', {
                required: !isBilling ?? true
              })}
            />
            {errors.billing?.representative_fullname?.type === 'required' && (
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
              {...register('billing.representative_dni', {
                required: !isBilling ?? true,
                onChange: (e) => {
                  if (e.target.value !== '-' && e.target.value !== '') {
                    setInputRutRepresentative(
                      String(ChileanRutify.formatRut(e.target.value))
                    );
                    setValue(
                      'billing.representative_dni',
                      String(ChileanRutify.formatRut(e.target.value))
                    );
                  } else {
                    setInputRutRepresentative('-');
                  }
                },
                validate: (v: any) => {
                  return ChileanRutify.validRut(v);
                }
              })}
            />
            {errors.billing?.representative_dni?.type === 'required' && (
              <span className="text-red-500 text-sm font-light">
                Rut requerido
              </span>
            )}
            {errors.billing?.representative_dni?.type === 'validate' && (
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
