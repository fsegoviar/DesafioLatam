import { SubmitHandler, useForm } from 'react-hook-form';
import { GetIdentityTypes } from '../../../../services';
import axios, { AxiosError } from 'axios';
import ChileanRutify from 'chilean-rutify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { updatePersonalDataCarrera } from '../../../../store/slices/userDataFormSlice';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';

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
  const [selectedIdentityType, setSelectedIdentityType] = useState('');
  const { indentityTypes } = GetIdentityTypes();
  const [inputRut, setInputRut] = useState('');
  const [listCountries, setListCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState<any>(null);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: user.user?.name ?? '',
      identity_type_id: user.user?.identity_type?.id ?? '',
      lastname: user.user?.lastname ?? '',
      dni: user.user?.dni ?? '',
      phone: user.user?.phone ?? '',
      email: user.user?.email ?? '',
			country_id: user.user?.country_id ?? null,
    }
  });

  useEffect(() => {
    if (user.user?.dni) setInputRut(user.user?.dni);
		const userIdentityTypeId = user.user?.identity_type?.id ?? '';
    setSelectedIdentityType(userIdentityTypeId.toString());
		getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	const getCountries = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BACKEND}/countries`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
					}
				}
			)
      .then((response: any) => {
        setListCountries(response.data);
        const findCountrie = response.data.find((data: any) => {
          if (user.user && user.user.country_id) {
            if (data.id === user.user.country_id) return data;
          }
          return null;
        });

        if (findCountrie) {
          setCountrySelected(findCountrie);
        }
      })
      .catch((error: AxiosError) => console.log('Error Countries =>', error));
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
		if (selectedIdentityType) data.identity_type_id = selectedIdentityType;
		if (countrySelected) data.country_id = countrySelected.id;
    await axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/register_form/personal_info`,
        { register_id: props.registerId, ...data },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${props.token}`
          }
        }
      )
      .then(() => {
        // console.log('Response User =>', response.data);
        dispatch(updatePersonalDataCarrera(data));
        axios
          .post(
            `${
              process.env.REACT_APP_API_BACKEND
            }/registers/${localStorage.getItem('register_id')}/step`,
            {
              step: props.currentStep + 1
            },
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
								Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
              }
            }
          )
          .then(() => {
            // console.log('Step =>', response.data);
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

  const handleIdentityTypeChange = (event:any) => {
    setSelectedIdentityType(event.target.value);
    setInputRut('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="grid gap-4 grid-cols-4 ">
        <div className="col-span-2 flex flex-col">
          <label>Nombre*</label>
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
          <label>Apellidos*</label>
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
          <label>Tipo de Identificación*</label>
          <select
            className="w-full p-1.5 border-2 rounded-lg border-black"
            // onChange={(e) => {
            //   setValue('identity_type_id', Number(e.target.value));
            // }}
            value={selectedIdentityType}
            onChange={handleIdentityTypeChange}
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
          <label>Número de identificación*</label>
          <input
            value={inputRut}
            disabled={!selectedIdentityType} // Agregamos el atributo disabled
            onKeyDown={(input: any) => {
              if(selectedIdentityType === "1" || selectedIdentityType === ""){
              const esNumero =
                (input.keyCode >= 48 && input.keyCode <= 57) || // números de teclado normal
                (input.keyCode >= 96 && input.keyCode <= 105) ||
                input.keyCode === 75 ||
                input.keyCode === 8; // números del teclado numérico

              if (!esNumero) {
                input.preventDefault(); // detiene la propagación del evento
              }}
              else{
                const key = input.key;
                // Expresión regular que coincide con caracteres especiales
                const specialCharsRegex = /[!@#$%^&*(),.?":{}¨¨|<>/+~´´áéíóúÁÉÍÓÚ]/;
                const isValidChar =
                  (key >= "0" && key <= "9") || // Números del teclado normal
                  (key >= "a" && key <= "z") || // Letras minúsculas
                  (key >= "A" && key <= "Z") || // Letras mayúsculas
                  key === "-" || key === "0"; // Carácter guion ("-") y tecla "0" del teclado numérico

                if (!isValidChar || specialCharsRegex.test(key)) {
                  input.preventDefault(); // Detiene la propagación del evento
                }
              }
            }}
            {...register('dni', {
              required: true,
              onChange: (e) => {
                if(selectedIdentityType === "1" || selectedIdentityType === ""){
                if (e.target.value !== '-') {
                  setInputRut(String(ChileanRutify.formatRut(e.target.value)));
                  setValue(
                    'dni',
                    String(ChileanRutify.formatRut(e.target.value))
                  );
                } else {
                  setInputRut('');
                }
              }else{
                setInputRut(e.target.value);
                  setValue(
                    'dni',
                    String(e.target.value)
                  );
              }},
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
          <label>Correo electrónico*</label>
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
          <label>Número teléfonico*</label>
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

      <div className="grid gap-4 grid-cols-4 mt-5">
				<div className="col-span-2 flex flex-col">
					<label>País de residencia*</label>
					<Dropdown
						value={countrySelected}
						options={listCountries}
						optionLabel="description"
						filter
						className="dropdown-form"
						{...register('country_id', {
							required: true,
							onChange(evt: DropdownChangeParams) {
								if (evt.value.id) {
									setCountrySelected(evt.value);
									setValue('country_id', Number(evt.value.id));
								}
							}
						})}
					/>
					{errors.country_id?.type === 'required' && <RenderRequiredField />}
				</div>
				<div className="col-span-2 flex flex-col">
					<label>Carrera a la cual te estas matriculando</label>
					<input
						type="text"
						placeholder={user.career?.description ?? ''}
						disabled={true}
					/>
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
