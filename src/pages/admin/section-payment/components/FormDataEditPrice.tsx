import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Career,
  Currency,
  FormEditPayment,
  FormPaymentType,
  PaymentMethod,
  SupplierId
} from '../../../../interfaces';
import { useDialogEditPriceHook } from '../context/TableContext';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { GetCareers, GetCurrencies } from '../../../../services';
import axios, { AxiosError } from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
// import axios, { AxiosError } from 'axios';

type PropsEditPrice = {
  actionToast: (action: string) => void;
  addData: (data: any) => void;
  id: number;
};

export const FormDataEditPrice = (props: PropsEditPrice) => {
  const { closeDialogEdit } = useDialogEditPriceHook();
  const { currencies } = GetCurrencies();
  const { careers } = GetCareers();
  const [cashType, setCashType] = useState<Currency>(null!);
  const [selectedCareers, setSelectedCareers] = useState<Career>(null!);
  const [checkTransbank, setCheckTransbank] = useState(false);
  const [checkPaypal, setCheckPaypal] = useState(false);
  const [checkFlow, setCheckFlow] = useState(false);
  const [checkOtherMethods, setCheckOtherMethods] = useState(false);
  const [checkPaymentQuotes, setCheckPaymentQuotes] = useState(false);
  const [checkPrepaid, setCheckPrepaid] = useState(false);
  const [checkISA, setCheckISA] = useState(false);
  const [errorCheck, setErrorCheck] = useState(false);
  const [valueQuotes, setValueQuotes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FormEditPayment | null>(null);
  const [valueQuotesTotal, setValueQuotesTotal] = useState(0);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormEditPayment>({
    defaultValues: { ...data }
  });

  const fetchData = async () => {
    setData(null);
    setLoading(true);
    let result;
    await axios
      .get(`${process.env.REACT_APP_API_BACKEND}/prices/${props.id}`, {
        headers: {
          Accept: 'application/json'
        }
      })
      .then((response) => {
        setData(response.data);
        reset(response.data);
      })
      .catch((error: AxiosError) => console.log('Error =>', error))
      .finally(() => {
        setInterval(() => setLoading(false), 1000);
      });

    return result;
  };

  useEffect(() => {
    fetchData();
    if (data) setValueQuotes(data.payment_methods[0].quotes_value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  useEffect(() => {
    if (data) {
      const findCareer = careers?.find(
        (career) => career.id === data.price.career_id
      );

      if (findCareer) setSelectedCareers(findCareer);

      setCashType(data.price.currency);

      initPaymentMethods();
      initPrice();
      initSuppliers();
      setValueQuotes(calculateValueQuotes());
      setValueQuotesTotal(getTotalValueQuotes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [careers]);

  const initPrice = () => {
    if (data) {
      setValue('price.name', data.price.name);
      setValue('price.tuition', data.price.tuition);
      setValue('price.comments', data.price.comments);
      setValue('price.currency_id', data.price.currency_id);
      setValue('price.career_id', data.price.career_id);
    }
  };

  const initPaymentMethods = () => {
    if (data) {
      for (const payment_method of data.payment_methods) {
        if (
          payment_method.description === 'Pago Cuota' &&
          payment_method.quotes_value
        ) {
          setCheckPaymentQuotes(true);
          setValue(
            `payment_methods.0.free_discount`,
            payment_method.free_discount
          );
          setValue(`payment_methods.0.quotes`, payment_method.quotes);
          setValue(
            `payment_methods.0.quotes_value`,
            payment_method.quotes_value
          );
          setValue(
            `payment_methods.0.reference_value`,
            payment_method.reference_value
          );
        }

        if (
          payment_method.description === 'Anticipado' &&
          payment_method.advance_discount
        ) {
          setCheckPrepaid(true);
          setValue(
            `payment_methods.1.advance_discount`,
            payment_method.advance_discount
          );
          setValue(
            `payment_methods.1.reference_value`,
            payment_method.reference_value
          );
        }
        if (payment_method.description === 'ISA' && payment_method.isa_value) {
          setCheckISA(true);
          setValue(`payment_methods.2.isa_percent`, payment_method.isa_percent);
          setValue(`payment_methods.2.isa_value`, payment_method.isa_value);
        }
      }
    }
  };

  const initSuppliers = () => {
    // console.log('Suppliers =>', props.data);
    if (data) {
      for (const supplier of data.price.suppliers) {
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
    }
  };

  const onSubmit: SubmitHandler<FormEditPayment> = async (resultForm) => {
    let requestData: FormPaymentType = {
      career_id: resultForm.price.career_id,
      comments: resultForm.price.comments,
      currency_id: resultForm.price.currency_id,
      payment_methods: [],
      name: resultForm.price.name,
      suppliers: [],
      tuition: resultForm.price.tuition
    };

    let suppliers: SupplierId[] = [];
    const clearArr: PaymentMethod[] = [];

    if (resultForm.payment_methods[0].quotes && checkPaymentQuotes === true)
      clearArr.push({
        payment_method_id: 1,
        quotes: resultForm.payment_methods[0].quotes,
        reference_value: resultForm.payment_methods[0].reference_value,
        quotes_value: resultForm.payment_methods[0].quotes_value,
        advance_discount: null,
        free_discount: resultForm.payment_methods[0].free_discount,
        isa_percent: null,
        isa_value: null
      });
    if (resultForm.payment_methods[1].advance_discount && checkPrepaid === true)
      clearArr.push({
        payment_method_id: 2,
        quotes: null,
        reference_value: resultForm.payment_methods[1].reference_value,
        quotes_value: null,
        advance_discount: resultForm.payment_methods[1].advance_discount,
        free_discount: null,
        isa_percent: null,
        isa_value: null
      });
    if (resultForm.payment_methods[2].isa_value && checkISA === true)
      clearArr.push({
        payment_method_id: 3,
        quotes: null,
        reference_value: null,
        quotes_value: null,
        advance_discount: null,
        free_discount: null,
        isa_percent: resultForm.payment_methods[2].isa_percent,
        isa_value: resultForm.payment_methods[2].isa_value
      });

    requestData.payment_methods = clearArr;

    suppliers = resultForm.price.suppliers.map((v: any) => {
      return { supplier_id: Number(v) };
    });

    requestData.suppliers = suppliers;

    setLoading(true);
    if (
      (checkFlow || checkISA || checkOtherMethods || checkTransbank) &&
      data
    ) {
      console.log('Data Price Id =>', data.price.id);
      await axios
        .post(
          `${process.env.REACT_APP_API_BACKEND}/prices/${data.price.id}`,
          requestData,
          {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          }
        )
        .then((response) => {
          console.log('Response Price =>', response.data);
          props.actionToast('edit');
          props.addData(response.data);
        })
        .catch((error: AxiosError) => {
          console.log('Error Price =>', error);
        })
        .finally(() => {
          setLoading(false);
          closeDialogEdit();
        });
    } else {
      setErrorCheck(true);
    }
  };

  const getTotalValueQuotes = () => {
    if (
      watch('payment_methods.0.reference_value') &&
      watch('payment_methods.0.free_discount')
    ) {
      return Math.round(
        Number(watch('payment_methods.0.reference_value')) -
          (Number(watch('payment_methods.0.free_discount')) / 100) *
            Number(watch('payment_methods.0.reference_value'))
      );
    }
    return 0;
  };

  const getTotalValuePrepaid = () => {
    if (
      watch('payment_methods.1.reference_value') &&
      watch('payment_methods.1.advance_discount')
    ) {
      return Math.round(
        Number(watch('payment_methods.1.reference_value')) -
          (Number(watch('payment_methods.1.advance_discount')) / 100) *
            Number(watch('payment_methods.1.reference_value'))
      );
    }
    return 0;
  };

  const getTotalValueIsa = () => {
    if (
      watch('payment_methods.2.isa_value') &&
      watch('payment_methods.2.isa_percent')
    ) {
      return Math.round(
        Number(watch('payment_methods.2.isa_value')) -
          (Number(watch('payment_methods.2.isa_percent')) / 100) *
            Number(watch('payment_methods.2.isa_value'))
      );
    }
    return 0;
  };

  const calculateValueQuotes = () => {
    const value = Math.round(
      Number(getValues(`payment_methods.0.reference_value`)) /
        Number(getValues(`payment_methods.0.quotes`))
    );
    setValueQuotes(value);
    setValue('payment_methods.0.quotes_value', value);

    return value;
  };

  const RequiredField = () => {
    return <span className="text-red-500 text-[12px]">Campo Requerido</span>;
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-10 grid place-items-center rounded-xl">
          <div className="flex flex-col items-center">
            <ProgressSpinner />
            <h1>Cargando..</h1>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="py-3 font-bold">Datos Principales</p>
            <hr className="py-3" />
            {/* Datos Principales */}
            <div className="grid grid-rows-1 grid-flow-col gap-4">
              <div className="flex flex-col">
                <label>Nombre</label>
                <input
                  type="text"
                  {...register('price.name', { required: true })}
                  className={
                    errors.price?.name
                      ? 'border-red-500 py-1 rounded-lg'
                      : 'py-1 rounded-lg '
                  }
                />
                {errors.price?.name && <RequiredField />}
              </div>
              <div className="flex flex-col">
                <label>Tipo de moneda</label>
                <Dropdown
                  value={cashType}
                  options={currencies}
                  optionLabel="code"
                  placeholder="Seleccionar Moneda"
                  className="w-full dropdown-form md:w-14rem"
                  {...register('price.currency_id', {
                    required: true,
                    onChange: (evt: DropdownChangeParams) => {
                      if (evt.value.id) setCashType(evt.value);
                    }
                  })}
                />
                {errors.price?.currency_id && <RequiredField />}
              </div>
              <div className={'flex flex-col'}>
                <label>Matricula</label>
                <input
                  type="number"
                  {...register('price.tuition', {
                    required: true,
                    valueAsNumber: true
                  })}
                  className={
                    errors.price?.tuition
                      ? 'border-red-500 py-1 rounded-lg'
                      : 'py-1 rounded-lg '
                  }
                />
                {errors.price?.tuition && <RequiredField />}
              </div>
              <div className="flex flex-col">
                <label>Programa</label>
                <Dropdown
                  value={selectedCareers}
                  options={careers}
                  optionLabel="description"
                  filter
                  placeholder="Seleccionar Curso"
                  className="w-full dropdown-form md:w-14rem"
                  {...register('price.career_id', {
                    required: true,
                    onChange: (evt: DropdownChangeParams) => {
                      if (evt.value.id) setSelectedCareers(evt.value);
                    }
                  })}
                />
                {errors.price?.career_id && <RequiredField />}
              </div>
            </div>
            {/* Formas de Pago */}
            <p className="font-bold text-xl py-3">Formas de pago</p>
            <hr className="py-3" />
            <label className="mx-2">
              <input
                type="checkbox"
                value={'Pago Cuota'}
                checked={checkPaymentQuotes}
                onChange={() => setCheckPaymentQuotes(!checkPaymentQuotes)}
              />{' '}
              <span className="font-bold text-lg">Pago en cuotas</span>
            </label>
            <div className={'grid grid-rows-1 grid-flow-col gap-4'}>
              <div className={'flex flex-col'}>
                <label>Valor de referencia</label>
                <input
                  type="text"
                  disabled={!checkPaymentQuotes}
                  {...register(`payment_methods.0.reference_value`, {
                    required: checkPaymentQuotes ?? true,
                    valueAsNumber: true
                  })}
                  className={
                    errors.price?.name
                      ? 'border-red-500 py-1 rounded-lg'
                      : 'py-1 rounded-lg '
                  }
                />
                {(() => {
                  if (
                    errors.payment_methods &&
                    errors.payment_methods[0]?.reference_value &&
                    checkPaymentQuotes
                  )
                    return <RequiredField />;
                })()}
              </div>
              <div className={'flex flex-col '}>
                <label>Número de cuotas</label>
                <input
                  type="number"
                  disabled={!checkPaymentQuotes}
                  {...register(`payment_methods.0.quotes`, {
                    required: checkPaymentQuotes ?? true,
                    valueAsNumber: true,
                    onChange: calculateValueQuotes
                  })}
                  className={
                    errors.payment_methods && errors.payment_methods[0]?.quotes
                      ? 'border-red-500 py-1 rounded-lg'
                      : 'py-1 rounded-lg '
                  }
                />
                {(() => {
                  if (
                    errors.payment_methods &&
                    errors.payment_methods[0]?.quotes &&
                    checkPaymentQuotes
                  )
                    return <RequiredField />;
                })()}
              </div>

              <div className={'flex flex-col '}>
                <label>Valor por cuota</label>
                <input
                  type="number"
                  disabled
                  value={valueQuotes}
                  className={'py-1 rounded-lg '}
                />
              </div>
              <div className={'flex flex-col'}>
                <label>Descuento cuotas (%)</label>
                <input
                  type="number"
                  disabled={!checkPaymentQuotes}
                  {...register(`payment_methods.0.free_discount`, {
                    required: checkPaymentQuotes ?? true,
                    valueAsNumber: true
                  })}
                  className={
                    errors.payment_methods &&
                    errors.payment_methods[0]?.free_discount
                      ? 'border-red-500 py-1 rounded-lg'
                      : 'py-1 rounded-lg '
                  }
                />
                {(() => {
                  if (
                    errors.payment_methods &&
                    errors.payment_methods[0]?.free_discount &&
                    checkPaymentQuotes
                  )
                    return <RequiredField />;
                })()}
              </div>
              <div className={'flex flex-col'}>
                <label>Total</label>
                <input
                  type="number"
                  disabled
                  className={'py-1 rounded-lg '}
                  value={valueQuotesTotal}
                  readOnly
                />
              </div>
            </div>
            {/* Pago Anticipado */}
            <div className="my-5">
              <label className="mx-2">
                <input
                  type="checkbox"
                  value={'Anticipado'}
                  checked={checkPrepaid}
                  onChange={() => setCheckPrepaid(!checkPrepaid)}
                />{' '}
                <span className="font-bold text-lg">Pago Anticipado</span>
              </label>
              <div className={'grid grid-rows-1 grid-flow-col gap-4'}>
                <div className={'flex flex-col'}>
                  <label>Valor de referencia</label>
                  <input
                    type="text"
                    disabled={!checkPrepaid}
                    {...register(`payment_methods.1.reference_value`, {
                      required: checkPrepaid ?? true,
                      valueAsNumber: true
                    })}
                    className={
                      errors.payment_methods &&
                      errors.payment_methods[1]?.reference_value
                        ? 'border-red-500 py-1 rounded-lg'
                        : 'py-1 rounded-lg '
                    }
                  />
                  {(() => {
                    if (
                      errors.payment_methods &&
                      errors.payment_methods[1]?.reference_value &&
                      checkPrepaid
                    )
                      return <RequiredField />;
                  })()}
                </div>
                <div className={'flex flex-col '}>
                  <label>Descuento anticipado (%)</label>
                  <input
                    type="number"
                    disabled={!checkPrepaid}
                    {...register(`payment_methods.1.advance_discount`, {
                      required: checkPrepaid ?? true,
                      valueAsNumber: true
                    })}
                    className={
                      errors.payment_methods &&
                      errors.payment_methods[1]?.advance_discount
                        ? 'border-red-500 py-1 rounded-lg'
                        : 'py-1 rounded-lg '
                    }
                  />
                  {(() => {
                    if (
                      errors.payment_methods &&
                      errors.payment_methods[1]?.advance_discount &&
                      checkPrepaid
                    )
                      return <RequiredField />;
                  })()}
                </div>
                <div className={'flex flex-col'}>
                  <label>Total</label>
                  <input
                    type="number"
                    disabled
                    className={'py-1 rounded-lg '}
                    value={getTotalValuePrepaid()}
                    readOnly
                  />
                </div>
              </div>
            </div>
            {/* Pago ISA */}
            <label className="mx-2">
              <input
                type="checkbox"
                value={'ISA'}
                checked={checkISA}
                onChange={() => setCheckISA(!checkISA)}
              />{' '}
              <span className="font-bold text-lg">Pago en ISA</span>
            </label>
            <div className={'grid grid-rows-1 grid-flow-col gap-4'}>
              <div className={'flex flex-col '}>
                <label>Valor ISA</label>
                <input
                  type="number"
                  disabled={!checkISA}
                  {...register(`payment_methods.2.isa_value`, {
                    required: checkISA ?? true,
                    valueAsNumber: true
                  })}
                  className={
                    errors.payment_methods &&
                    errors.payment_methods[2]?.isa_value
                      ? 'border-red-500 py-1 rounded-lg'
                      : 'py-1 rounded-lg '
                  }
                />
                {(() => {
                  if (
                    errors.payment_methods &&
                    errors.payment_methods[2]?.isa_value &&
                    checkISA
                  )
                    return <RequiredField />;
                })()}
              </div>
              <div className={'flex flex-col '}>
                <label>Descuento ISA (%)</label>
                <input
                  type="number"
                  disabled={!checkISA}
                  {...register(`payment_methods.2.isa_percent`, {
                    required: checkISA ?? true,
                    valueAsNumber: true
                  })}
                  className={
                    errors.payment_methods &&
                    errors.payment_methods[2]?.isa_percent
                      ? 'border-red-500 py-1 rounded-lg'
                      : 'py-1 rounded-lg '
                  }
                />
                {(() => {
                  if (
                    errors.payment_methods &&
                    errors.payment_methods[2]?.isa_percent &&
                    checkISA
                  )
                    return <RequiredField />;
                })()}
              </div>
              <div className={'flex flex-col '}>
                <label>Total</label>
                <input
                  type="number"
                  disabled
                  className={'py-1 rounded-lg '}
                  value={getTotalValueIsa()}
                  readOnly
                />{' '}
              </div>
            </div>
            {/* Comentarios */}
            <div className={'grid pt-5'}>
              <div className={'flex flex-col '}>
                <label>Motivo del descuento</label>
                <textarea
                  rows={3}
                  {...register('price.comments', { required: true })}
                  className={
                    errors.price?.comments
                      ? 'border-red-500  w-full border-2 rounded-lg p-3'
                      : 'border-2 border-black w-full rounded-lg p-3'
                  }
                />
                {errors.price?.comments && <RequiredField />}
              </div>
            </div>
            {/* Metodos de pago */}
            <p className="py-3 font-bold"> Métodos de Pago</p>
            <div>
              <label
                className="mx-2"
                onChange={() => setCheckTransbank(!checkTransbank)}
              >
                <input
                  type="checkbox"
                  value={'3'}
                  {...register('price.suppliers', {
                    required: true
                  })}
                  checked={checkTransbank}
                />
                Transbank
              </label>
              <label
                className="mx-2"
                onChange={() => setCheckPaypal(!checkPaypal)}
              >
                <input
                  type="checkbox"
                  value={'2'}
                  checked={checkPaypal}
                  {...register('price.suppliers', {
                    required: true
                  })}
                />{' '}
                Paypal
              </label>
              <label className="mx-2" onChange={() => setCheckFlow(!checkFlow)}>
                <input
                  type="checkbox"
                  value={'1'}
                  checked={checkFlow}
                  {...register('price.suppliers', {
                    required: true
                  })}
                />{' '}
                Flow
              </label>
              <label
                className="mx-2"
                onChange={() => setCheckOtherMethods(!checkOtherMethods)}
              >
                <input
                  type="checkbox"
                  value={'4'}
                  checked={checkOtherMethods}
                  {...register('price.suppliers', {
                    required: true
                  })}
                />{' '}
                Otro medio de pago
              </label>
              {errors.price?.suppliers && (
                <div>
                  <RequiredField />
                </div>
              )}
              {errorCheck && (
                <div>
                  <RequiredField />
                </div>
              )}
            </div>
            {/* Botones de acción */}
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
        </>
      )}
    </div>
  );
};
