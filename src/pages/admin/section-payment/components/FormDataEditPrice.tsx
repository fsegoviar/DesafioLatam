import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Career,
  CareerType,
  Currency,
  FormEditPayment
} from '../../../../interfaces';
import { useDialogEditPriceHook } from '../context/TableContext';
import { UseFormPayment } from '../hooks/useFormPayment';
import axios, { AxiosError } from 'axios';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { GetCareers, GetCurrencies } from '../../../../services';

type PropsEditPrice = {
  data: FormEditPayment;
  nextStep: (value: boolean) => void;
};

export const FormDataEditPrice = (props: PropsEditPrice) => {
  const { closeDialogEdit } = useDialogEditPriceHook();
  const { updateForm } = UseFormPayment();
  const { currencies } = GetCurrencies();
  const [cashType, setCashType] = useState<Currency>(null!);
  const [selectedCareers, setSelectedCareers] = useState<CareerType>(null!);
  const { careers } = GetCareers();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<FormEditPayment>({
    defaultValues: { ...props.data }
  });

  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initData = (): void => {
    setSelectedCareers(props.data.career);
    setCashType(props.data.currency);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log('Edit =>', data);
    updateForm(data);
    //* Almaceno la data del formulario
    // Todo: Falta agregar los tipos de la tabla de precios
    axios
      .post(`${process.env.REACT_APP_API_BACKEND}/prices/${data.id}`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        console.log('Response Price =>', response.data);
        closeDialogEdit();
      })
      .catch((error: AxiosError) => {
        console.log('Error Price =>', error);
      });
  };

  const handleChangeCareer = async (value: Career) => {
    console.log('Value change career =>', value);
    setSelectedCareers(value);

    setValue('career_id', value.id);
  };

  const RequiredField = () => {
    return <span className="text-red-500 text-[12px]">Campo Requerido</span>;
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'grid grid-rows-1 grid-flow-col gap-4'}>
          <div className={'flex flex-col'}>
            <label>Nombre</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-3 rounded-lg'
                  : 'py-3 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
          <div className="flex flex-col">
            <label>Tipo de moneda</label>
            <Dropdown
              value={cashType}
              options={currencies}
              onChange={(e: DropdownChangeParams) => {
                setCashType(e.value);
                setValue('currency_id', e.value.id);
              }}
              optionLabel="code"
              placeholder="Seleccionar Moneda"
              className="w-full md:w-14rem"
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col'}>
            <label>Valor del programa</label>
            <input
              type="number"
              {...register('value', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-3 rounded-lg'
                  : 'py-3 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <div className={'grid grid-rows-1 grid-flow-col gap-4 mt-5'}>
          <div className={'flex flex-col'}>
            <label>Descuento cuotas (%)</label>
            <input
              type="number"
              {...register('advance_discount', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-3 rounded-lg'
                  : 'py-3 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col'}>
            <label>Descuento anticipado (%)</label>
            <input
              type="number"
              {...register('free_discount', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-3 rounded-lg'
                  : 'py-3 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col'}>
            <label>Matricula</label>
            <input
              type="number"
              {...register('tuition', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-3 rounded-lg'
                  : 'py-3 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <div className={'grid grid-rows-1 grid-flow-col gap-4 mt-5'}>
          <div className="flex flex-col">
            <label>Programa</label>
            <Dropdown
              value={selectedCareers}
              options={careers}
              onChange={(e) => handleChangeCareer(e.value)}
              optionLabel="description"
              filter
              placeholder="Seleccionar Curso"
              className="w-full md:w-14rem"
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <div className={'grid pt-5'}>
          <div className={'flex flex-col'}>
            <label>Motivo del descuento</label>
            <textarea
              rows={3}
              {...register('comments', { required: true })}
              className={
                errors.name
                  ? 'border-red-500  w-full border-2 rounded-lg p-3'
                  : 'border-2 border-black w-full rounded-lg p-3'
              }
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <div className={'flex justify-end mt-5'}>
          <button
            className="m-1 px-5 rounded-lg text-white bg-gray-500"
            style={{ border: '3px solid gray' }}
            onClick={closeDialogEdit}
          >
            Cerrar
          </button>
          <button
            className="m-1 px-5 rounded-lg text-white bg-green-500"
            style={{ border: '3px solid rgb(34 197 94)' }}
            onClick={() => props.nextStep(true)}
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};
