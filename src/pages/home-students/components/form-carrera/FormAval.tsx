import React, { useState } from 'react';
import { GetIdentityTypes } from '../../../../services';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { AxiosError } from 'axios';

type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
  registerId: string;
};

type AvalType = {
  identity_type_id: number | null;
  name: string;
  lastname: string;
  dni: string;
  phone: number | null;
  address: string;
  liquidaciones: File[] | null;
  historiales: File[] | null;
};

export const FormAval = (props: PropsFormUser) => {
  const { indentityTypes } = GetIdentityTypes();
  const [isBilling, setIsBilling] = useState(true);
  const [isEnableHistorical, setIsEnableHistorical] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AvalType>({
    defaultValues: {
      identity_type_id: null,
      name: '',
      lastname: '',
      dni: '',
      phone: null,
      address: '',
      liquidaciones: null,
      historiales: null
    }
  });

  const prevStep = () => {
    props.setCurrentStep(props.currentStep - 1);
  };

  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };

  const onSubmit: SubmitHandler<AvalType> = (data) => {
    if (isBilling) {
      nextStep();
    } else {
      console.log('DATA AVAL =>', data);

      let formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('identity_type_id', String(data.identity_type_id));
      formData.append('lastname', data.lastname);
      formData.append('dni', data.dni);
      formData.append('phone', String(data.phone));
      formData.append('register_id', String(props.registerId));
      if (data.liquidaciones) {
        for (const liquidacion of data.liquidaciones) {
          formData.append('liquidaciones[]', new Blob([liquidacion]));
        }
      }

      if (data.historiales) {
        for (const historiales of data.historiales) {
          formData.append('historiales[]', new Blob([historiales]));
        }
      }

      axios
        .post(
          `${process.env.REACT_APP_API_BACKEND}/register_form/guarantee`,
          formData,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then((response: any) => {
          console.log('Response Aval =>', response.data);
        })
        .catch((error: AxiosError) => console.log('Error Aval =>', error))
        .finally(async () => {
          await axios
            .post(
              `${
                process.env.REACT_APP_API_BACKEND
              }/registers/${localStorage.getItem('register_id')}/step`,
              {
                step: 6
              },
              {
                headers: {
                  'Access-Control-Allow-Origin': '*'
                }
              }
            )
            .then((response: any) => {
              console.log('Step =>', response.data);
              nextStep();
            })
            .catch((error: AxiosError) => console.log('Error Aval =>', error));
        });
    }
  };

  const RequiredField = () => {
    return <span className="text-red-500 text-sm">Campo requerido</span>;
  };

  return (
    <>
      <div className="bg-gray-200 py-5 px-3 rounded-lg mt-10">
        <p>
          Si no cuentas con una renta mínima mensual de $450.000 demosteable o
          tienes tu historial crediticio con deuda, necesitas un aval.
        </p>
      </div>
      <div className="my-5 flex justify-center">
        <div className="mt-1 mx-5">
          <input
            type="radio"
            name="tipo"
            id="si"
            checked={!isBilling}
            onChange={() => setIsBilling(false)}
          />
          <label htmlFor="si" className="ml-1">
            Necesito Aval
          </label>
        </div>
        <div className="mt-1 mx-5">
          <input
            type="radio"
            name="tipo"
            id="no"
            checked={isBilling}
            onChange={() => setIsBilling(true)}
          />
          <label htmlFor="no" className="ml-1">
            No tengo Aval
          </label>
        </div>
      </div>
      <form className={'mt-10'} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-4">
          <div className="col-span-2 flex flex-col">
            <label>Nombre Aval</label>
            <input
              type="text"
              disabled={isBilling}
              {...register('name', { required: !isBilling ?? true })}
            />
            {errors.name && <RequiredField />}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Apellidos Aval</label>
            <input
              type="text"
              disabled={isBilling}
              {...register('lastname', { required: !isBilling ?? true })}
            />
            {errors.lastname && <RequiredField />}
          </div>
        </div>
        <div className="grid gap-4 grid-cols-4 mt-5">
          <div className="col-span-2 flex flex-col">
            <label>Dirección</label>
            <input
              type="text"
              disabled={isBilling}
              {...register('address', { required: !isBilling ?? true })}
            />
            {errors.address && <RequiredField />}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Número de teléfono</label>
            <input
              type="text"
              disabled={isBilling}
              {...register('phone', { required: !isBilling ?? true })}
            />
            {errors.phone && <RequiredField />}
          </div>
        </div>
        <div className="grid gap-4 grid-cols-4 mt-5">
          <div className="col-span-2  flex flex-col">
            <label>Tipo de Identificación</label>
            <select
              id=""
              className={`w-full p-1.5 border-2 rounded-lg ${
                isBilling ? 'border-gray-400' : ' border-black'
              }`}
              disabled={isBilling}
              {...register('identity_type_id', {
                required: !isBilling ?? true
              })}
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
            {errors.identity_type_id && <RequiredField />}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Número de identificación</label>
            <input
              type="number"
              disabled={isBilling}
              {...register('dni', { required: !isBilling ?? true })}
            />
            {errors.dni && <RequiredField />}
          </div>
        </div>
        <div className="grid gap-4 grid-cols-4 mt-5">
          <div className="col-span-4 flex flex-col">
            <label>Liquidaciones de Renta</label>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 dark:border-neutral-600 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 dark:text-neutral-200 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 dark:file:bg-neutral-700 file:px-3 file:py-[0.32rem] file:text-neutral-700 dark:file:text-neutral-100 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
              type="file"
              id="formFileMultiple"
              multiple
              disabled={isBilling}
              {...register('liquidaciones', { required: !isBilling ?? true })}
            />
            {errors.liquidaciones && <RequiredField />}
          </div>
        </div>
        <div className="grid gap-4 grid-cols-4 mt-5">
          <div className="col-span-4 flex flex-col">
            <label>Historial Crediticio (Dicom, Buró Crédito)</label>
            <div className={'flex my-4'}>
              <div className="mt-1 mx-5">
                <input
                  type="radio"
                  name="tipo"
                  id="si"
                  disabled={isBilling}
                  onChange={() => setIsEnableHistorical(false)}
                />
                <label htmlFor="si" className="ml-1">
                  Sí
                </label>
              </div>
              <div className="mt-1 mx-5">
                <input
                  type="radio"
                  name="tipo"
                  id="no"
                  disabled={isBilling}
                  onChange={() => setIsEnableHistorical(true)}
                />
                <label htmlFor="no" className="ml-1">
                  No
                </label>
              </div>
            </div>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 dark:border-neutral-600 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 dark:text-neutral-200 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 dark:file:bg-neutral-700 file:px-3 file:py-[0.32rem] file:text-neutral-700 dark:file:text-neutral-100 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
              type="file"
              id="formFileMultiple"
              multiple
              disabled={isBilling || isEnableHistorical}
              {...register('historiales', {
                required: (!isBilling && !isEnableHistorical) ?? true
              })}
            />
            {errors.historiales && <RequiredField />}
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
    </>
  );
};
