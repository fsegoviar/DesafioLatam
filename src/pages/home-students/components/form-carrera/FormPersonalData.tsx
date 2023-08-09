import { useEffect, useState } from 'react';
import { GetIdentityTypes } from '../../../../services';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import './form-carrera-styles.css';
import axios, { AxiosError } from 'axios';
import { format, isBefore } from 'date-fns';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import ChileanRutify from 'chilean-rutify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { updatePersonalDataCarrera } from '../../../../store/slices/userDataFormSlice';

type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
  registerId: string;
  token: string;
};

export const FormPersonalData = (props: PropsFormUser) => {
  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado'
    ],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ],
    monthNamesShort: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic'
    ],
    today: 'Hoy',
    clear: 'Limpiar'
  });
  const [selectedIdentityType, setSelectedIdentityType] = useState('');
  const { indentityTypes } = GetIdentityTypes();
  const [birthday, setBirthday] = useState<string | Date>(
    new Date().toLocaleDateString()
  );
  const [listCountries, setListCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState<any>(null);
  const [nationalitySelected, setNationalitySelected] = useState<any>(null);
  const [inputRut, setInputRut] = useState('');
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm<any>({
    defaultValues: {
      name: user.user?.name ?? '',
      address: user.user?.address ?? '',
      birthday: user.user?.birthday ?? '',
      city: user.user?.city ?? '',
      country_id: user.user?.country_id ?? null,
      dni: user.user?.dni ?? '',
      email: user.user?.email ?? '',
      identity_type_id: user.user?.identity_type?.id ?? '',
      lastname: user.user?.lastname ?? '',
      phone: user.user?.phone ?? '',
      nationality: user.user?.nationality ?? null
    }
  });

  useEffect(() => {
    if (user) {
      if (user.user) {
        setInputRut(user.user?.dni ?? '');
        if (user.user.birthday) {
          const birthday = user.user.birthday.split('-');
          setBirthday(
            new Date(
              Number(birthday[0]),
              Number(birthday[1]) - 1,
              Number(birthday[2])
            )
          );
        } else {
          setBirthday(format(new Date(), 'yyyy-MM-dd'));
        }
      }
    }

    getCountries();
    //selecciono el id que viene del modelo y se lo paso a mi "Tipo de Identificación*"
    const userIdentityTypeId = user.user?.identity_type?.id ?? '';
    setSelectedIdentityType(userIdentityTypeId.toString());
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
          setNationalitySelected(findCountrie);
        }
      })
      .catch((error: AxiosError) => console.log('Error Countries =>', error));
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    // console.log('data submit =>', data);
    // data.user.nationality = nationalitySelected.description;

    if (countrySelected) data.country_id = countrySelected.id;
    if (selectedIdentityType) data.identity_type_id = selectedIdentityType;

    await axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/register_form/personal_info`,
        {
          register_id: props.registerId,
          ...data
        },
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
              step: 2
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

  const RenderRequiredField = () => {
    return <span className="font-light text-red-500">Campo requerido</span>;
  };

  const handleIdentityTypeChange = (event:any) => {
    setSelectedIdentityType(event.target.value.toString());
    setInputRut('');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10"
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
    >
      {/* Paso 1 - Datos personales */}

      <div className="grid gap-4 grid-cols-4 ">
        <div className="col-span-2 flex flex-col">
          <label>Nombre*</label>
          <input type="text" {...register('name', { required: true })} />
          {errors.name && <RenderRequiredField />}
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Apellidos*</label>
          <input type="text" {...register('lastname', { required: true })} />
          {errors.lastname && <RenderRequiredField />}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-4 mt-5">
        <div className="col-span-2  flex flex-col">
          <label>Tipo de Identificación*</label>
          <select
            name=""
            id=""
            className="w-full p-1.5 border-2 rounded-lg border-black"
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
            type="text"
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
                if (e.target.value !== '-' && e.target.value !== '') {
                  setInputRut(String(ChileanRutify.formatRut(e.target.value)));
                  setValue(
                    'dni',
                    String(ChileanRutify.formatRut(e.target.value))
                  );
                } else {
                  setInputRut('-');
                }
              }else{
                setInputRut(e.target.value);
                  setValue(
                    'dni',
                    String(e.target.value)
                  );
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
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="flex flex-col col-span-2">
          <label>País de residencia*</label>
          <Dropdown
            value={countrySelected}
            options={listCountries}
            optionLabel="description"
            filter
            className="dropdown-form"
            // onChange={(evt: DropdownChangeParams) => {
            //   if (evt.value.id) {
            //     setCountrySelected(evt.value);
            //   }
            // }}
            // required
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
        <div className="flex flex-col col-span-2">
          <label>Nacionalidad*</label>
          <Dropdown
            value={nationalitySelected}
            options={listCountries}
            optionLabel="nationality"
            filter
            className="dropdown-form"
            // onChange={(evt: DropdownChangeParams) => {
            //   if (evt.value.id) {
            //     setNationalitySelected(evt.value);
            //     setValue('nationality', evt.value.id);
            //   }
            // }}
            // required
            {...register('nationality', {
              required: true,
              onChange(evt: DropdownChangeParams) {
                if (evt.value.id) {
									setNationalitySelected(evt.value);
                  setValue('nationality', String(evt.value.nationality));
                }
              }
            })}
          />
          {errors.nationality?.type === 'required' && <RenderRequiredField />}
        </div>
      </div>
      <div className="grid gap-4 grid-cols-4 mt-5">
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
        <div className="col-span-2 flex flex-col">
          <label>Correo electrónico</label>
          <input
            type="email"
            readOnly
            {...register('email', {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
            })}
						disabled
          />
          {errors.email?.type === 'required' && <RenderRequiredField />}
          {errors.email?.type === 'pattern' && (
            <span className="text-red-500 text-sm font-light">
              Formato de correo no valido
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-5">
        {/* <div className="col-span-2 flex flex-col">
          <label>Fecha de nacimiento*</label>
          <Calendar
            // onChange={(e) => setDate(e.value)}
            className="style-calendar"
            dateFormat="yy-mm-dd"
            locale="es"
            value={birthday}
            {...register('birthday', {
              required: true,
              onChange: (evt) => {
                console.log('event => ', evt);
                console.log(
                  'Evento birthday: ' +
                    String(format(new Date(evt.target.value), 'yyyy-MM-dd'))
                );
                setValue(
                  'birthday',
                  String(format(new Date(evt.target.value), 'yyyy-MM-dd'))
                );
              },
              validate: (evt: any) => {
                const inputDate = evt.split('-');
                const myBirthday = new Date(
                  inputDate[0],
                  inputDate[1],
                  inputDate[2]
                );
                const today = new Date();
                if (isBefore(myBirthday, today)) {
                  console.log('PASAMOS');
                  return true;
                }
                return false;
              }
            })}
          />
          {errors.birthday && <RenderRequiredField />}
          {errors.birthday?.type === 'validate' && (
            <span className="font-light text-red-500">
              Fecha de nacimiento debe ser menor a la de hoy
            </span>
          )}
        </div> */}
        <div className="col-span-2 flex flex-col">
          <label>Fecha de nacimiento*</label>
          <Calendar
            className="style-calendar"
            dateFormat="dd-mm-yy"
            locale="es"
            placeholder="dd-mm-yyyy"
            value={birthday}
            {...register('birthday', {
              required: true,
              onChange: (evt) => {
								setBirthday(evt.value)
                if (evt.value) {
                  setValue(
                    'birthday',
                    String(format(new Date(evt.target.value), 'yyyy-MM-dd'))
                  );
                } else {
                  setValue('birthday', '');
                }
              },
              validate: (evt: any) => {
                const inputDate = evt.split('-');
                const myBirthday = new Date(
                  inputDate[0],
                  inputDate[1],
                  inputDate[2]
                );
                const today = new Date();
                if (isBefore(myBirthday, today)) {
                  return true;
                }
                return false;
              }
            })}
          />
          {errors.birthday && <RenderRequiredField />}
          {errors.birthday?.type === 'validate' && (
            <span className="font-light text-red-500">
              Fecha de nacimiento debe ser menor a la de hoy
            </span>
          )}
        </div>

        <div className="col-span-2 flex flex-col">
          <label>Ciudad de Residencia*</label>
          <input type="text" {...register('city', { required: true })} />
          {errors.city && <RenderRequiredField />}
        </div>
      </div>

      <div className="grid grid-cols-3 mt-5">
        <div className="flex flex-col col-span-3">
          <label>Dirección*</label>
          <input type="text" {...register('address', { required: true })} />
          {errors.address && <RenderRequiredField />}
        </div>
      </div>
      {/* Paso 4 - Registro */}
      <div className="mt-3">
        <div>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 flex flex-col">
              <label>Carrera a la cual te estas matriculando</label>
              <input
                type="text"
                placeholder={user.career?.description ?? ''}
                disabled={true}
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
