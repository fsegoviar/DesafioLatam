import React, { useEffect, useState } from 'react';
import { GetIdentityTypes } from '../../../../services';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PersonalDataUser } from '../../../../interfaces';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import './form-carrera-styles.css';
import axios, { AxiosError } from 'axios';
import { format } from 'date-fns';
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

  const { indentityTypes } = GetIdentityTypes();
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [listCountries, setListCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState<any>(null!);
  const [nationalitySelected, setNationalitySelected] = useState<any>(null!);
  const [codePhone, setCodePhone] = useState('');
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm<PersonalDataUser>({
    defaultValues: {
      register_id: props.registerId,
      name: props.dataUser?.user.name,
      identity_type_id: 1,
      lastname: props.dataUser?.user.lastname,
      dni: props.dataUser?.user.dni,
      phone: props.dataUser?.user.phone,
      email: props.dataUser?.user.email,
      birthday: props.dataUser?.user.birthday,
      city: props.dataUser?.user.city,
      country_id: 5,
      nationality: props.dataUser?.user.nationality,
      address: props.dataUser?.user.address
    }
  });

  useEffect(() => {
    if (props.dataUser) {
      let fecha = new Date(String(props.dataUser.user.birthday));
      fecha.setDate(fecha.getDate() + 1);
      setBirthday(fecha);
    }

    getCountries();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCountries = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BACKEND}/countries`)
      .then((response: any) => {
        setListCountries(response.data);

        const findCountrie = response.data.find(
          (data: any) => data.id === props.dataUser?.user.country.id
        );

        if (findCountrie) {
          setCountrySelected(findCountrie);
          setNationalitySelected(findCountrie);
        }
      })
      .catch((error: AxiosError) => console.log('Error Countries =>', error));
  };

  const onSubmit: SubmitHandler<PersonalDataUser> = async (data) => {
    console.log('data submit =>', data);
    data.nationality = nationalitySelected.description;
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

  const RenderRequiredField = () => {
    return <span className="font-light text-red-500">Campo requerido</span>;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      {/* Paso 1 - Datos personales */}

      <div className="grid gap-4 grid-cols-4 ">
        <div className="col-span-2 flex flex-col">
          <label>Nombre</label>
          <input type="text" {...register('name', { required: true })} />
          {errors.name && <RenderRequiredField />}
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Apellidos</label>
          <input type="text" {...register('lastname', { required: true })} />
          {errors.lastname && <RenderRequiredField />}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-4 mt-5">
        <div className="col-span-2  flex flex-col">
          <label>Tipo de Identificación</label>
          <select
            name=""
            id=""
            className="w-full p-1.5 border-2 rounded-lg border-black"
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
            type="number"
            {...register('dni', {
              required: true
            })}
          />
          {errors.dni && <RenderRequiredField />}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="flex flex-col col-span-2">
          <label>País de residencia</label>
          <Dropdown
            value={countrySelected}
            options={listCountries}
            optionLabel="description"
            filter
            className="dropdown-form"
            onChange={(evt: DropdownChangeParams) => {
              if (evt.value.id) {
                setCountrySelected(evt.value);
                setValue('country_id', Number(evt.value.id));
                setCodePhone(String(evt.value.number_code));
              }
            }}
            required
          />
          {errors.country_id && <RenderRequiredField />}
        </div>
        <div className="flex flex-col col-span-2">
          <label>Nacionalidad</label>
          <Dropdown
            value={nationalitySelected}
            options={listCountries}
            optionLabel="nationality"
            filter
            className="dropdown-form"
            onChange={(evt: DropdownChangeParams) => {
              if (evt.value.id) {
                setNationalitySelected(evt.value);
                setValue('nationality', evt.value.id);
              }
            }}
            required
          />
          {errors.nationality && <RenderRequiredField />}
        </div>
      </div>
      <div className="grid gap-4 grid-cols-4 mt-5">
        <div className="w-full flex flex-col col-span-2">
          <label>Código teléfonico</label>
          <input type="text" value={codePhone} disabled />
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
      <div className="grid grid-cols-4 mt-5">
        <div className="col-span-4 flex flex-col">
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
      </div>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="col-span-2 flex flex-col">
          <label>Fecha de nacimiento</label>
          <Calendar
            // onChange={(e) => setDate(e.value)}
            className="style-calendar"
            dateFormat="yy-mm-dd"
            locale="es"
            value={birthday}
            {...register('birthday', {
              required: true,
              onChange: (evt) =>
                setValue(
                  'birthday',
                  format(new Date(evt.target.value), 'yyyy-MM-dd')
                )
            })}
          />
          {errors.birthday && <RenderRequiredField />}
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Ciudad</label>
          <input type="text" {...register('city', { required: true })} />
          {errors.city && <RenderRequiredField />}
        </div>
      </div>

      <div className="grid grid-cols-3 mt-5">
        <div className="flex flex-col col-span-3">
          <label>Dirección</label>
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
                placeholder={props.dataUser?.career?.description ?? ''}
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
