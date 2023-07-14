import { Button } from 'primereact/button';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Career,
  Currency,
  FormEditPayment,
  FormPaymentType,
  PaymentMethod,
  SupplierId
} from '../../../../interfaces';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { GetCareers, GetCurrencies } from '../../../../services';
import axios, { AxiosError } from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
// import axios, { AxiosError } from 'axios';

type PropsEditPrice = {
  actionToast: (action: string) => void;
  addData: (data: any) => void;
  id: number;
  close: () => void;
};

export const FormDataEditPrice = (props: PropsEditPrice) => {
  const { currencies } = GetCurrencies();
  const { careers } = GetCareers();
  const [cashType, setCashType] = useState<Currency>({id: 0, description:'', code:''});
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

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
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
      })
      .catch((error: AxiosError) => console.log('Error =>', error))
      .finally(() => {
        setInterval(() => setLoading(false), 1000);
      });

    return result;
  };

  useLayoutEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setValueQuotes(data.payment_methods[0].quotes_value);
      initPaymentMethods();
      initPrice();
      initSuppliers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data) {
      const findCareer = careers?.find(
        (career) => career.id === data.price.career_id
      );

      if (findCareer) setSelectedCareers(findCareer);

      setCashType(data.price.currency);

      setValueQuotes(calculateValueQuotes());
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
      setCashType(data.price.currency);
    }
  };

  const initPaymentMethods = () => {
    if (data) {
      for (const payment_method of data.payment_methods) {
        if (
          payment_method.description === 'Pago Cuota' &&
          payment_method.reference_value
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
          payment_method.reference_value
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
          case 'Otro':
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
      currency_id: cashType.id,
      payment_methods: [],
      name: resultForm.price.name,
      suppliers: [],
      tuition: resultForm.price.tuition
    };

    let suppliers: SupplierId[] = [];
    const clearArr: PaymentMethod[] = [];

    if (resultForm.payment_methods[0].reference_value && checkPaymentQuotes === true)
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
    if (resultForm.payment_methods[1].reference_value && checkPrepaid === true)
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
    // suppliers = resultForm.price.suppliers.length === 1 ? [{ supplier_id: parseInt(resultForm.price.suppliers.toString()) }] :resultForm.price.suppliers.map((v: any) => {
    //   return { supplier_id: Number(v) };
    // });

    if(checkFlow){
      suppliers.push({ supplier_id: 1});
    }
    if(checkPaypal){
      suppliers.push({ supplier_id: 2});
    }    
    if(checkTransbank){
      suppliers.push({ supplier_id: 3});
    }
    if(checkOtherMethods){
      suppliers.push({ supplier_id: 4});
    }
    console.log(suppliers);

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
          props.close();
        })
        .catch((error: AxiosError) => {
          console.log('Error Price =>', error);
        })
        .finally(() => {
          setLoading(false);
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

    if (
      watch('payment_methods.0.reference_value') !== 0 ||
      watch('payment_methods.0.reference_value') !== undefined
    ) {
      return Number(watch('payment_methods.0.reference_value'));
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

    if (
      watch('payment_methods.1.reference_value') !== 0 ||
      watch('payment_methods.1.reference_value') !== undefined
    ) {
      return Number(watch('payment_methods.1.reference_value'));
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

    if (
      watch('payment_methods.2.isa_percent') !== 0 ||
      watch('payment_methods.2.isa_percent') !== undefined
    ) {
      return Number(watch('payment_methods.2.isa_value'));
    }

    return 0;
  };

  const calculateValueQuotes = () => {
    // const value = Math.round(
    //   Number(getValues(`payment_methods.0.reference_value`)) /
    //     Number(getValues(`payment_methods.0.quotes`))
    // );
    // setValueQuotes(value);
    // setValue('payment_methods.0.quotes_value', value);

    let value = 0;
    if (
      watch('payment_methods.0.reference_value') &&
      watch('payment_methods.0.quotes')
    ) {
      value = Math.round(
        Number(getValues(`payment_methods.0.reference_value`)) /
          Number(getValues(`payment_methods.0.quotes`))
      );
    }

    if (
      watch('payment_methods.0.quotes') === 0 ||
      watch('payment_methods.0.quotes') === undefined || isNaN(watch('payment_methods.0.quotes'))
    ) {
      value = Number(watch('payment_methods.0.reference_value'));
    }

    setValueQuotes(value);
    setValue('payment_methods.0.quotes_value', value);

    return value;
  };

  const calculateValueQuotesWithDiscount = () => {
    let valuesPerQuotes=0;
    let valuePerQuotesWhitDiscount = 0;
    if (
      watch('payment_methods.0.reference_value') &&
      watch('payment_methods.0.free_discount')
    ) {
      valuesPerQuotes = Math.round(
        Number(watch('payment_methods.0.reference_value')) /
          Number(watch('payment_methods.0.quotes'))
      );
      if (
        watch('payment_methods.0.quotes') === 0 ||
        watch('payment_methods.0.quotes') === undefined || isNaN(watch('payment_methods.0.quotes'))
      ) {
        valuesPerQuotes = Number(watch('payment_methods.0.reference_value'));
      }

      valuePerQuotesWhitDiscount = Math.round(
        valuesPerQuotes -
          (Number(watch('payment_methods.0.free_discount')) / 100) *
            valuesPerQuotes
      );

      return valuePerQuotesWhitDiscount;
    }

    if (
      watch('payment_methods.0.free_discount') === 0 ||
      watch('payment_methods.0.free_discount') === undefined || isNaN(watch('payment_methods.0.free_discount'))
    ) {
      console.log(watch('payment_methods.0.reference_value'));
      console.log(watch('payment_methods.0.quotes'));
      if(watch('payment_methods.0.quotes') === 0 && watch('payment_methods.0.free_discount') === 0){
        valuePerQuotesWhitDiscount = Number(watch('payment_methods.0.reference_value'));
        return valuePerQuotesWhitDiscount;
      }
      valuePerQuotesWhitDiscount = Math.round(
        Number(watch('payment_methods.0.reference_value')) /
          Number(watch('payment_methods.0.quotes'))
      );
      return valuePerQuotesWhitDiscount;
    }
    
    return 0;
  };

  const RequiredField = () => {
    return <span className="text-red-500 text-[12px]">Campo Requerido</span>;
  };

  const checkHandler = (id:string) => {
    if(id.toString() !== "4"){
      setCheckPaypal(false);      
    }
    if(id.toString() !== "1"){
      setCheckFlow(false);      
    }
  }

  const setChangeCheckPaypal = (check:boolean) => {
    setCheckPaypal(!checkPaypal);
    if((check === true && cashType.id === 4) || (check === true && cashType.id === 5)){
      setCheckPaypal(true);
    }else{
      setCheckPaypal(false);
      setCheckFlow(false);
    }
  }

  const setChangeCheckFlow = (check:boolean) => {    
    setCheckFlow(!checkFlow);
    if(check === true && cashType.id === 1){
      setCheckFlow(true);
    }else{
      setCheckFlow(false);
      setCheckPaypal(false);
    }
  }

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
                      if (evt.value.id) 
                      {
                        setCashType(evt.value)
                        checkHandler(evt.value.id);
                      }
                    }
                  })}
                />
                {errors.price?.currency_id && <RequiredField />}
              </div>
              <div className={'flex flex-col'}>
                <label>Matricula</label>
                <input
                  type="text"
                  onKeyDown={(input: any) => {
                    const esNumero =
                      (input.keyCode >= 48 && input.keyCode <= 57) || // números de teclado normal
                      (input.keyCode >= 96 && input.keyCode <= 105) ||
                      input.keyCode === 75 ||
                      input.keyCode === 8; // números del teclado numérico
      
                    if (!esNumero) {
                      input.preventDefault(); // detiene la propagación del evento
                    }
                  }}
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
                  disabled
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
              <div className="flex flex-col mt-6">               
                <Button
                icon="pi pi-question-circle"
                data-te-toggle="tooltip"
                className="p-button-rounded p-button-text p-button-warning"
                tooltip="No se puede modificar el programa seleccionado!"
                tooltipOptions={{
                  position: 'bottom',
                  mouseTrack: false,
                  mouseTrackTop: 15
                }}
                onClick={(e) => {
                  e.preventDefault();
                }}
              />                                      
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
                  onKeyDown={(input: any) => {
                    const esNumero =
                      (input.keyCode >= 48 && input.keyCode <= 57) || // números de teclado normal
                      (input.keyCode >= 96 && input.keyCode <= 105) ||
                      input.keyCode === 75 ||
                      input.keyCode === 8; // números del teclado numérico
      
                    if (!esNumero) {
                      input.preventDefault(); // detiene la propagación del evento
                    }
                  }}
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
                  type="text"
                  disabled={!checkPaymentQuotes}
                  onKeyDown={(input: any) => {
                    const esNumero =
                      (input.keyCode >= 48 && input.keyCode <= 57) || // números de teclado normal
                      (input.keyCode >= 96 && input.keyCode <= 105) ||
                      input.keyCode === 75 ||
                      input.keyCode === 8; // números del teclado numérico
      
                    if (!esNumero) {
                      input.preventDefault(); // detiene la propagación del evento
                    }
                  }}
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
                  type="text"
                  disabled={!checkPaymentQuotes}
                  onKeyDown={(input: any) => {
                    const esNumero =
                      (input.keyCode >= 48 && input.keyCode <= 57) || // números de teclado normal
                      (input.keyCode >= 96 && input.keyCode <= 105) ||
                      input.keyCode === 75 ||
                      input.keyCode === 8; // números del teclado numérico
      
                    if (!esNumero) {
                      input.preventDefault(); // detiene la propagación del evento
                    }
                  }}
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
                <label>Valor cuota con descuento</label>
                <input
                  type="number"
                  disabled
                  className={'py-1 rounded-lg '}
                  value={calculateValueQuotesWithDiscount()}
                />
              </div>
              <div className={'flex flex-col'}>
                <label>Total</label>
                <input
                  type="number"
                  disabled
                  className={'py-1 rounded-lg '}
                  value={getTotalValueQuotes()}
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
                    onKeyDown={(input: any) => {
                      const esNumero =
                        (input.keyCode >= 48 && input.keyCode <= 57) || // números de teclado normal
                        (input.keyCode >= 96 && input.keyCode <= 105) ||
                        input.keyCode === 75 ||
                        input.keyCode === 8; // números del teclado numérico
        
                      if (!esNumero) {
                        input.preventDefault(); // detiene la propagación del evento
                      }
                    }}
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
                    type="text"
                    disabled={!checkPrepaid}
                    onKeyDown={(input: any) => {
                      const esNumero =
                        (input.keyCode >= 48 && input.keyCode <= 57) || // números de teclado normal
                        (input.keyCode >= 96 && input.keyCode <= 105) ||
                        input.keyCode === 75 ||
                        input.keyCode === 8; // números del teclado numérico
        
                      if (!esNumero) {
                        input.preventDefault(); // detiene la propagación del evento
                      }
                    }}
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
                  type="text"
                  disabled={!checkISA}
                  onKeyDown={(input: any) => {
                    const esNumero =
                      (input.keyCode >= 48 && input.keyCode <= 57) || // números de teclado normal
                      (input.keyCode >= 96 && input.keyCode <= 105) ||
                      input.keyCode === 75 ||
                      input.keyCode === 8; // números del teclado numérico
      
                    if (!esNumero) {
                      input.preventDefault(); // detiene la propagación del evento
                    }
                  }}
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
                  type="text"
                  disabled={!checkISA}
                  onKeyDown={(input: any) => {
                      const esNumero =
                        (input.keyCode >= 48 && input.keyCode <= 57) || // números de teclado normal
                        (input.keyCode >= 96 && input.keyCode <= 105) ||
                        input.keyCode === 75 ||
                        input.keyCode === 8; // números del teclado numérico
        
                      if (!esNumero) {
                        input.preventDefault(); // detiene la propagación del evento
                      }
                    }}
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
              <div style={{ display: cashType.id === 4 || cashType.id === 5 ? 'inline' : 'none' }}>
              <label
                className="mx-2"
                onChange={() => setChangeCheckPaypal(!checkPaypal)}
              >
                <input
                  type="checkbox"
                  value={'2'}
                  { ...checkPaypal === true ? 
                  {...register('price.suppliers', {
                    required: true
                  })}
                  :{...register('price.suppliers', {
                    required: false
                  })}}
                  checked={checkPaypal}
                  onChange={() => setChangeCheckPaypal(!checkPaypal)}
                />{' '}
                Paypal
              </label>
              </div>
              <div style={{ display: cashType.id === 1 ? 'inline' : 'none' }}>
              <label className="mx-2" onChange={() => setChangeCheckFlow(!checkFlow)}>
                <input
                  type="checkbox"
                  value={'1'}                  
                  {...register('price.suppliers', {
                    required: true
                  })}
                  checked={checkFlow}
                  onChange={() => setChangeCheckFlow(!checkFlow)}
                />{' '}
                Flow
              </label>
              </div>
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
                onClick={props.close}
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
