import React, { useEffect, useState } from 'react';
import { GetEducationLevel, GetEnglishLevel } from '../../../../services';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RequiredField } from '../../../../components';
import axios, { AxiosError } from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { updateDataEducation } from '../../../../store/slices/userDataFormSlice';

type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
  registerId: string;
  token: string;
};

export const EducationForm = (props: PropsFormUser) => {
  const { englishLevel } = GetEnglishLevel();
  const { educationLevel } = GetEducationLevel();
  const [educationLevelSelected, setEducationLevelSelected] = useState<any>();
  const [englishLevelSelected, setEnglishLevelSelected] = useState<any>();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    defaultValues: {
      description: user.user?.education?.description ?? '',
      educational_level_id: user.user?.education?.educational_level_id ?? null,
      english_level_id: user.user?.education?.english_level_id ?? null
    }
  });

  useEffect(() => {
    if (user.user?.education) {
      const findEnglishLevel = englishLevel?.find(
        (item) => item.id === user.user?.education?.english_level_id
      );

      const findEducationLevel = educationLevel?.find(
        (item) => item.id === user.user?.education?.educational_level_id
      );
      setEducationLevelSelected(findEducationLevel);
      setEnglishLevelSelected(findEnglishLevel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [englishLevel, educationLevel]);

  const prevStep = () => {
    props.setCurrentStep(props.currentStep - 1);
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log('DATA =>', data);

    const findEnglishLevel = englishLevel?.find(
      (item) => item.id === englishLevelSelected.id
    );

    const findEducationLevel = educationLevel?.find(
      (item) => item.id === educationLevelSelected.id
    );
    if (findEnglishLevel) data.english_level_id = findEnglishLevel.id;
    if (findEducationLevel) data.educational_level_id = findEducationLevel.id;

    await axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/register_form/education`,
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
        dispatch(updateDataEducation(data));
        axios
          .post(
            `${
              process.env.REACT_APP_API_BACKEND
            }/registers/${localStorage.getItem('register_id')}/step`,
            {
              step: 3
            },
            {
              headers: {
                'Access-Control-Allow-Origin': '*'
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

  return (
    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 grid-cols-4">
        <div className="col-span-2 flex flex-col">
          <label>Nivel de educación*</label>

          <Dropdown
            value={educationLevelSelected}
            options={educationLevel}
            optionLabel="description"
            className="w-full dropdown-form md:w-14rem"
            {...register('educational_level_id', {
              required: true,
              onChange: (evt) => {
                if (evt.value.id) setEducationLevelSelected(evt.value);
              }
            })}
          />
          {errors.educational_level_id && <RequiredField />}
        </div>
        <div className="col-span-2 flex flex-col">
          <label>Nivel de ingles*</label>

          <Dropdown
            value={englishLevelSelected}
            options={englishLevel}
            optionLabel="description"
            className="w-full dropdown-form md:w-14rem"
            {...register('english_level_id', {
              required: true,
              onChange: (evt) => {
                if (evt.value.id) setEnglishLevelSelected(evt.value);
              }
            })}
          />
          {errors.english_level_id && <RequiredField />}
        </div>
      </div>
      <div className="mt-3">
        <div>
          <textarea
            className="w-full rounded-lg border-2 border-black p-2 resize-none"
            placeholder="¿Posee conocimientos previos?. ¿Cuales? *"
            id=""
            rows={4}
            {...register('description', {
              required: true,
              maxLength: 250
            })}
          ></textarea>
          {errors.description?.type === 'required' && <RequiredField />}
          {errors.description?.type === 'maxLength' && (
            <span className="text-red-500 text-sm font-light">
              Supera el máximo de 250 caracteres.
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <p className="mt-3 text-sm font-light">
          ( * ) Esta información ayuda a nuestro equipo de asesores/as de
          empleabilidad a buscar las mejores alternativas laborales para ti
        </p>
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
