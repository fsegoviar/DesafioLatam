import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Currency, FormEditPayment } from '../../../../interfaces';
import { useDialogEditPriceHook } from '../context/TableContext';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { GetCareers, GetCurrencies } from '../../../../services';
import axios, { AxiosError } from 'axios';

type PropsEditPrice = {
  data: FormEditPayment;
  nextStep: (value: boolean) => void;
};

export const FormDataEditPrice = (props: PropsEditPrice) => {
  const { closeDialogEdit } = useDialogEditPriceHook();
  const { currencies } = GetCurrencies();
  const { careers } = GetCareers();
  const [cashType, setCashType] = useState<Currency>(null!);
  const [career, setCareer] = useState<any>(null!);
  const [checkISA, setCheckISA] = useState(false);
  const [checkAnticipado, setCheckAnticipado] = useState(false);
  const [checkCuotas, setCheckCuotas] = useState(false);
  const [checkTransbank, setCheckTransbank] = useState(false);
  const [checkPaypal, setCheckPaypal] = useState(false);
  const [checkFlow, setCheckFlow] = useState(false);
  const [checkOtherMethods, setCheckOtherMethods] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<FormEditPayment>({
    defaultValues: {
      advance_discount: props.data.advance_discount,
      career_id: props.data.career_id,
      comments: props.data.comments,
      currency_id: props.data.currency_id,
      currency: props.data.currency,
      free_discount: props.data.free_discount,
      career: props.data.career,
      name: props.data.name,
      tuition: props.data.tuition,
      reference_value: props.data.reference_value,
      full_value: props.data.full_value,
      quotes: props.data.quotes,
      quotes_value: props.data.quotes_value,
      value: props.data.value,
      payment_methods: props.data.payment_methods,
      payment_method: props.data.payment_method
    }
  });

  useEffect(() => {
    setCashType(props.data.currency);
    setCareer(props.data.career);
    // console.log('Effect =>', props.data.career);
    // console.log('Careers =>', careers);
    initRadioButtons();
    initSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [careers]);

  const initRadioButtons = () => {
    switch (props.data.payment_method) {
      case 'Anticipado':
        setCheckAnticipado(true);
        break;
      case 'ISA':
        setCheckISA(true);
        break;
      case 'Pago Cuota':
        setCheckCuotas(true);
        break;
      default:
        break;
    }
  };

  const initSuppliers = () => {
    for (const supplier of props.data.suppliers) {
      switch (supplier.description) {
        case 'Transbank':
          setCheckTransbank(true);
          break;
        case 'Paypal':
          setCheckPaypal(true);
          break;
        case 'Flow':
          setCheckFlow(true);
          break;
        case 'Otro metodo':
          setCheckOtherMethods(true);
          break;
        default:
          break;
      }
    }
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log('Edit =>', data);
    // updateForm(data);
    // props.nextStep(true);

    const parsePaymentMethods = data.payment_methods.map((data: any) => {
      return { supplier_id: Number(data) };
    });

    const prepareData = {
      career_id: data.career_id,
      currency_id: data.currency_id,
      name: data.name,
      value: Number(data.value),
      free_discount: data.free_discount,
      advance_discount: data.advance_discount,
      tuition: data.tuition,
      comments: data.comments,
      payment_methods: parsePaymentMethods,
      quotes: data.quotes,
      quotes_value: data.quotes_value,
      full_value: data.full_value,
      reference_value: data.reference_value,
      payment_method: data.payment_method
    };

    axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/prices/${props.data.id}`,
        prepareData,
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then((response) => {
        console.log('Response Price =>', response.data);
      })
      .catch((error: AxiosError) => {
        console.log('Error Price =>', error);
      });
  };

  const RequiredField = () => {
    return <span className="text-red-500 text-[12px]">Campo Requerido</span>;
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="py-3 font-bold">Datos Principales</p>
        <hr className="py-3" />
        <div className="grid grid-rows-1 grid-flow-col gap-4">
          <div className="flex flex-col">
            <label>Nombre</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
          <div className="flex flex-col">
            <label>Tipo de moneda</label>
            <Dropdown
              value={cashType}
              options={currencies}
              optionLabel="code"
              placeholder="Seleccionar Moneda"
              className="w-full dropdown-form md:w-14rem"
              {...register('currency', {
                required: true,
                onChange: (evt: DropdownChangeParams) => {
                  if (evt.value.id) {
                    setCashType(evt.value);
                    setValue('currency_id', evt.value.id);
                  }
                }
              })}
            />
            {errors.name && <RequiredField />}
          </div>

          <div className="flex flex-col">
            <label>Programa</label>
            <Dropdown
              value={career}
              options={careers}
              // onChange={(e) => handleChangeCareer(e.value)}
              optionLabel="description"
              filter
              placeholder="Seleccionar Curso"
              className="w-full dropdown-form md:w-14rem"
              {...register('career', {
                required: true,
                onChange: (evt: DropdownChangeParams) => {
                  console.log('event change =>', evt);

                  if (evt.value.id) {
                    setCareer(evt.value);
                    setValue('career_id', evt.value.id);
                  }
                }
              })}
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <p className="font-bold py-3">Valores del programa</p>
        <hr className="py-3" />
        <div className={'grid grid-rows-1 grid-flow-col gap-4'}>
          <div className="flex flex-col">
            <label>Valor del programa</label>
            <input
              type="number"
              {...register('value', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
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
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col'}>
            <label>Valor de referencia</label>
            <input
              type="number"
              {...register('reference_value', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col'}>
            <label>Arancel Total</label>
            <input
              type="number"
              {...register('full_value', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <p className="font-bold pt-5 pb-3">Descuentos del programa</p>
        <hr className="py-3" />
        <div className={'grid grid-rows-1 grid-flow-col gap-4'}>
          <div className={'flex flex-col'}>
            <label>Descuento cuotas (%)</label>
            <input
              type="number"
              {...register('advance_discount', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col '}>
            <label>Descuento anticipado (%)</label>
            <input
              type="number"
              {...register('free_discount', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col '}>
            <label>Número de cuotas</label>
            <input
              type="number"
              {...register('quotes', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
          <div className={'flex flex-col '}>
            <label>Valor por cuota</label>
            <input
              type="number"
              {...register('quotes_value', { required: true })}
              className={
                errors.name
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {errors.name && <RequiredField />}
          </div>
        </div>
        <div className={'grid pt-5'}>
          <div className={'flex flex-col '}>
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
        <p className="py-3 font-bold">Formas de pago</p>
        <div>
          <label className="mx-2">
            <input
              type="radio"
              value={'Pago Cuota'}
              checked={checkCuotas}
              {...register('payment_method', {
                required: true,
                onChange: () => {
                  setCheckCuotas(true);
                }
              })}
            />{' '}
            Pago en cuotas
          </label>
          <label className="mx-2">
            <input
              type="radio"
              value={'Anticipado'}
              checked={checkAnticipado}
              {...register('payment_method', {
                required: true,
                onChange: () => {
                  setCheckAnticipado(true);
                }
              })}
            />{' '}
            Pago anticipado
          </label>
          <label className="mx-2">
            <input
              type="radio"
              value={'ISA'}
              checked={checkISA}
              {...register('payment_method', {
                required: true,
                onChange: () => {
                  setCheckISA(true);
                }
              })}
            />{' '}
            Pago en ISA
          </label>
          {errors.payment_method && (
            <div>
              <RequiredField />
            </div>
          )}
        </div>
        <p className="py-3 font-bold"> Métodos de Pago</p>
        <div>
          <label className="mx-2">
            <input
              type="checkbox"
              checked={checkTransbank}
              value={'3'}
              {...register('payment_methods', {
                required: true,
                onChange: () => {
                  setCheckTransbank(!checkTransbank);
                }
              })}
            />
            Transbank
          </label>
          <label className="mx-2">
            <input
              type="checkbox"
              value={'2'}
              checked={checkPaypal}
              {...register('payment_methods', {
                required: true,
                onChange: () => {
                  setCheckPaypal(!checkPaypal);
                }
              })}
            />{' '}
            Paypal
          </label>
          <label className="mx-2">
            <input
              type="checkbox"
              value={'1'}
              checked={checkFlow}
              {...register('payment_methods', {
                required: true,
                onChange: () => {
                  setCheckFlow(!checkFlow);
                }
              })}
            />{' '}
            Flow
          </label>
          <label className="mx-2">
            <input
              type="checkbox"
              value={'4'}
              checked={checkOtherMethods}
              {...register('payment_methods', {
                required: true,
                onChange: () => {
                  setCheckOtherMethods(!checkOtherMethods);
                }
              })}
            />{' '}
            Otro medio de pago
          </label>
          {errors.payment_methods && (
            <div>
              <RequiredField />
            </div>
          )}
        </div>
        <div className={'flex justify-end mt-5'}>
          <button
            className="m-1 px-5 rounded-lg text-white bg-gray-500"
            style={{ border: '3px solid gray' }}
            onClick={closeDialogEdit}
          >
            Cancelar
          </button>
          <button
            className="m-1 px-5 rounded-lg text-white bg-green-500"
            style={{ border: '3px solid rgb(34 197 94)' }}
            type="submit"
          >
            Editar
          </button>
        </div>
      </form>
    </div>
  );
};
