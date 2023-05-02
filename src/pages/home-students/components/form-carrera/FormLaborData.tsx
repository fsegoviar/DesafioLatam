import React, { useEffect, useState } from 'react';
import { GetWorkSituations } from '../../../../services';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { RequiredField } from '../../../../components';
import axios, { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { updateDataLabor } from '../../../../store/slices/userDataFormSlice';
import { UpdateOnlyLabor } from '../../../../store/slices/userData.interface';

type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
  registerId: string;
  token: string;
  dataUser: any;
};

export const FormLaborData = (props: PropsFormUser) => {
  const { workSituations } = GetWorkSituations();
  const [laborSituation, setLaborSituation] = useState<any>();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ...user
      // register_id: props.registerId,
      // work_situation_id:
      //   props.dataUser.user.empleability?.work_situation_id ?? null,
      // linkedin: props.dataUser.user.empleability?.linkedin ?? '',
      // organization: props.dataUser.user.empleability?.organization ?? '',
      // position: props.dataUser.user.empleability?.position ?? '',
      // rent: props.dataUser.user.empleability?.rent ?? null
    }
  });

  useEffect(() => {
    if (user.user && user.user.empleability) {
      const findWorkSituation = workSituations?.find(
        (item) => item.id === user.user?.empleability?.work_situation_id
      );
      if (findWorkSituation) setLaborSituation(findWorkSituation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workSituations]);

  const prevStep = () => {
    props.setCurrentStep(props.currentStep - 1);
  };

  const nextStep = () => {
    props.setCurrentStep(props.currentStep + 1);
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (data.user && data.user.empleability) {
      data.work_situation_id = laborSituation.id;

      const dataResult: UpdateOnlyLabor = {
        work_situation_id: data.work_situation_id,
        linkedin: data.user.empleability.linkedin,
        organization: data.user.empleability.organization,
        position: data.user.empleability.position,
        rent: data.user.empleability.rent
      };

      await axios
        .post(
          `${process.env.REACT_APP_API_BACKEND}/register_form/empleability`,
          {
            register_id: props.registerId,
            ...dataResult
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${props.token}`
            }
          }
        )
        .then((response: any) => {
          console.log('Response =>', response.data);
          dispatch(updateDataLabor(dataResult));
          axios
            .post(
              `${
                process.env.REACT_APP_API_BACKEND
              }/registers/${localStorage.getItem('register_id')}/step`,
              {
                step: 4
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
        })
        .catch((error: AxiosError) => console.log('Error =>', error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Paso 3 - Empleabilidad */}
      <div className="mt-10">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 flex flex-col">
            <label>Situación Laboral</label>
            <Dropdown
              value={laborSituation}
              options={workSituations}
              optionLabel="description"
              className="w-full dropdown-form md:w-14rem"
              {...register('user.empleability.work_situation_id', {
                required: true,
                onChange: (evt) => {
                  if (evt.value.id) setLaborSituation(evt.value);
                }
              })}
            />
            {errors.user?.empleability?.work_situation_id && <RequiredField />}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Renta Actual</label>
            <input
              type="number"
              {...register('user.empleability.rent', {
                required: true,
                min: 0
              })}
            />
            {errors.user?.empleability?.rent && <RequiredField />}
          </div>
        </div>
        <div className="col-span-2 flex flex-col mt-3">
          <label>Enlace LinkedIn</label>
          <input
            type="text"
            placeholder={'https://www.google.com'}
            {...register('user.empleability.linkedin', {
              required: true,
              pattern:
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/([^\s]*))?$/
            })}
          />
          {errors.user?.empleability?.linkedin?.type === 'required' && (
            <RequiredField />
          )}
          {errors.user?.empleability?.linkedin?.type === 'pattern' && (
            <span className="text-red-500 text-sm font-light">
              Formato URL no valido
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 mt-3 gap-4">
          <div className="col-span-2 flex flex-col">
            <label>Empresa donde trabaja</label>
            <input
              type="text"
              {...register('user.empleability.organization', {
                required: true
              })}
            />
            {errors.user?.empleability?.organization && <RequiredField />}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Cargo</label>
            <input
              type="text"
              {...register('user.empleability.position', { required: true })}
            />
            {errors.user?.empleability?.position && <RequiredField />}
          </div>
        </div>
        <div className="flex justify-end">
          <p className="mt-3 text-sm font-light">
            ( * ) Esta información ayuda a nuestro equipo de asesores/as de
            empleabilidad a buscar las mejores alternativas laborales para ti
          </p>
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
