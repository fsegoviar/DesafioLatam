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
  } = useForm<UpdateOnlyLabor>({
    defaultValues: {
      work_situation_id: user.user?.empleability?.work_situation_id ?? 0,
      linkedin: user.user?.empleability?.linkedin ?? '',
      organization: user.user?.empleability?.organization ?? '',
      position: user.user?.empleability?.position ?? '',
      rent: user.user?.empleability?.rent ?? 0
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
    data.work_situation_id = laborSituation.id;

    await axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/register_form/empleability`,
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
        // console.log('Response =>', response.data);
        dispatch(updateDataLabor(data));
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
          .then(() => {
            // console.log('Step =>', response.data);
            nextStep();
          })
          .catch((error: AxiosError) => console.log('Error Aval =>', error));
      })
      .catch((error: AxiosError) => console.log('Error =>', error));
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
              {...register('work_situation_id', {
                required: true,
                onChange: (evt) => {
                  if (evt.value.id) setLaborSituation(evt.value);
                }
              })}
            />
            {errors.work_situation_id && <RequiredField />}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Renta Actual</label>
            <input
              type="number"
              {...register('rent', {
                required: true,
                min: 0
              })}
            />
            {errors.rent && <RequiredField />}
          </div>
        </div>
        <div className="col-span-2 flex flex-col mt-3">
          <label>Enlace LinkedIn</label>
          <input
            type="text"
            placeholder={'https://www.google.com'}
            {...register('linkedin', {
              required: true,
              pattern:
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/([^\s]*))?$/
            })}
          />
          {errors.linkedin?.type === 'required' && <RequiredField />}
          {errors.linkedin?.type === 'pattern' && (
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
              {...register('organization', {
                required: true
              })}
            />
            {errors.organization && <RequiredField />}
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Cargo</label>
            <input type="text" {...register('position', { required: true })} />
            {errors.position && <RequiredField />}
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
