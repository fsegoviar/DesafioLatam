import { SubmitHandler, useForm } from 'react-hook-form';
import { GetIdentityTypes } from '../../../../services';
import axios, { AxiosError } from 'axios';
import ChileanRutify from 'chilean-rutify';
import { useEffect, useState } from 'react';

type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
  registerId: string;
  token: string;
  dataUser: any;
};

export const FormPersonalData = (props: PropsFormUser) => {
  const { indentityTypes } = GetIdentityTypes();
  const [inputRut, setInputRut] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      register_id: props.registerId,
      career: props.dataUser?.career,
      name: props.dataUser?.user.name,
      identity_type_id: props.dataUser?.user.identity_type?.id,
      lastname: props.dataUser?.user.lastname,
      dni: props.dataUser?.user.dni,
      phone: props.dataUser?.user.phone,
      email: props.dataUser?.user.email
    }
  });

  useEffect(() => {
    if (props.dataUser?.user.dni) setInputRut(props.dataUser?.user.dni);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log('data submit =>', data);
    await axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/register_form/personal_info`,
        data,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${props.token}`
          }
        }
      )
      .then((response: any) => {
        console.log('Response User =>', response.data);
        axios
          .post(
            `${
              process.env.REACT_APP_API_BACKEND
            }/registers/${localStorage.getItem('register_id')}/step`,
            {
              step: 2
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
      })
      .catch((error: AxiosError) =>
        console.log('Error fetchDataUser =>', error)
      );
  };

  const RenderRequiredField = ({ text = 'Campo Requerido' }) => {
    return <span className="font-light text-red-500">{text}</span>;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="grid gap-4 grid-cols-4 ">
        <div className="col-span-2 flex flex-col">
          <label>Nombre</label>
          <input
            type="text"
            {...register('name', { required: true, maxLength: 20 })}
          />
          {errors.name?.type === 'required' && <RenderRequiredField />}
          {errors.name?.type === 'maxLength' && (
            <RenderRequiredField text="Máximo de caracteres 20" />
          )}
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Apellidos</label>
          <input
            type="text"
            {...register('lastname', { required: true, maxLength: 30 })}
          />
          {errors.name?.type === 'required' && <RenderRequiredField />}
          {errors.name?.type === 'maxLength' && (
            <RenderRequiredField text="Máximo de caracteres 30" />
          )}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-4 mt-5">
        <div className="col-span-2  flex flex-col">
          <label>Tipo de Identificación</label>
          <select
            className="w-full p-1.5 border-2 rounded-lg border-black"
            onChange={(e) => {
              setValue('identity_type_id', Number(e.target.value));
            }}
          >
            <option value="" disabled>
              Seleccionar
            </option>
            {indentityTypes &&
              indentityTypes.map((niv, index) => (
                <option key={index} value={niv.id}>
                  {niv.description}
                </option>
              ))}
          </select>
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Número de identificación</label>
          <input
            value={inputRut}
            {...register('dni', {
              required: true,
              onChange: (e) => {
                if (e.target.value !== '-') {
                  setInputRut(String(ChileanRutify.formatRut(e.target.value)));
                  setValue(
                    'dni',
                    String(ChileanRutify.formatRut(e.target.value))
                  );
                } else {
                  setInputRut('');
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

      <div className="grid gap-4 grid-cols-4 mt-5">
        <div className="col-span-2 flex flex-col">
          <label>Correo electrónico</label>
          <input
            type="email"
            {...register('email', {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
            })}
          />
          {errors.email?.type === 'required' && <RenderRequiredField />}
          {errors.email?.type === 'pattern' && (
            <span className="text-red-500 text-sm font-light">
              Formato de correo no valido
            </span>
          )}
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Número teléfonico</label>
          <input
            type="number"
            {...register('phone', {
              required: true,
              minLength: 5,
              maxLength: 15
            })}
          />
          {errors.phone?.type === 'required' && <RenderRequiredField />}
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

      <div className="mt-3">
        <div>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 flex flex-col">
              <label>Carrera a la cual te estas matriculando</label>
              <input
                type="text"
                value={getValues('career.description')}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button className="btn m-1" type="submit">
          Siguiente
        </button>
      </div>
    </form>
  );
};
