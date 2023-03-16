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
// import axios, { AxiosError } from 'axios';

type PropsEditPrice = {
  data: FormEditPayment;
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

  // const [checkPaymentQuotes, setcheckPaymentQuotes] = useState(() =>
  //   props.data.payment_methods[0]?.pivot?.quotes_value ? true : false
  // );
  // const [checkPrepaid, setCheckPrepaid] = useState(() =>
  //   props.data.payment_methods[1]?.pivot?.advance_discount ? true : false
  // );
  // const [checkISA, setCheckISA] = useState(() =>
  //   props.data.payment_methods[2]?.pivot?.isa_value ? true : false
  // );
  const [checkPaymentQuotes, setCheckPaymentQuotes] = useState(false);
  const [checkPrepaid, setCheckPrepaid] = useState(false);
  const [checkISA, setCheckISA] = useState(false);
  const [defaultISAValue, setDefaultISAValue] = useState<any>();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm<FormEditPayment>({
    defaultValues: { ...props.data }
  });

  useEffect(() => {
    const findCareer = careers?.find(
      (career) => career.id === props.data.career_id
    );

    if (findCareer) setSelectedCareers(findCareer);

    setCashType(props.data.currency);
    // setSelectedCareers(props.data.career);
    // console.log('Effect =>', props.data.career);
    // console.log('Careers =>', careers);
    initPaymentMethods();
    initSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [careers]);

  const initPaymentMethods = () => {
    for (const payment_method of props.data.payment_methods) {
      switch (payment_method.description) {
        case 'Anticipado':
          setCheckPrepaid(true);
          break;
        case 'Pago Cuota':
          setCheckPaymentQuotes(true);
          break;
        case 'ISA':
          setCheckISA(true);
          setDefaultISAValue({
            id: 3,
            description: 'ISA',
            pivot: {
              id: 1,
              quotes: null,
              advance_discount: null,
              free_discount: null,
              isa_percent: payment_method.pivot.isa_percent,
              isa_value: payment_method.pivot.isa_value,
              quotes_value: null,
              payment_method_id: 3,
              price_id: payment_method.pivot.price_id,
              reference_value: null,
              created_at: payment_method.pivot.created_at,
              updated_at: payment_method.pivot.updated_at
            }
          });
          break;
      }
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

  const onSubmit: SubmitHandler<FormEditPayment> = async (data) => {
    console.log('Edit =>', data);

    let requestData: FormPaymentType = {
      career_id: data.career_id,
      comments: data.comments,
      currency_id: data.currency_id,
      payment_methods: [],
      name: data.name,
      suppliers: [],
      tuition: data.tuition
    };

    let suppliers: SupplierId[] = [];
    const clearArr: PaymentMethod[] = [];

    if (data.payment_methods[0].pivot.quotes && checkPaymentQuotes === true)
      clearArr.push({
        payment_method_id: 1,
        quotes: data.payment_methods[0].pivot.quotes_value,
        reference_value: data.payment_methods[0].pivot.reference_value,
        quotes_value: data.payment_methods[0].pivot.quotes_value,
        advance_discount: null,
        free_discount: data.payment_methods[0].pivot.free_discount,
        isa_percent: null,
        isa_value: null
      });
    if (data.payment_methods[1].pivot.advance_discount && checkPrepaid === true)
      clearArr.push({
        payment_method_id: 2,
        quotes: null,
        reference_value: data.payment_methods[1].pivot.reference_value,
        quotes_value: null,
        advance_discount: data.payment_methods[1].pivot.advance_discount,
        free_discount: null,
        isa_percent: null,
        isa_value: null
      });
    if (data.payment_methods[2].pivot.isa_value && checkISA === true)
      clearArr.push({
        payment_method_id: 3,
        quotes: null,
        reference_value: null,
        quotes_value: null,
        advance_discount: null,
        free_discount: null,
        isa_percent: data.payment_methods[2].pivot.isa_percent,
        isa_value: data.payment_methods[2].pivot.isa_value
      });

    requestData.payment_methods = clearArr;

    suppliers = data.suppliers.map((v: any) => {
      return { supplier_id: Number(v.id) };
    });

    requestData.suppliers = suppliers;

    console.log('Data a enviar =>', requestData);

    /*    await axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/prices/${props.data.id}`,
        requestData,
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
      });*/
  };

  const getTotalValueQuotes = () => {
    if (
      watch('payment_methods.0.pivot.reference_value') &&
      watch('payment_methods.0.pivot.free_discount')
    ) {
      return Math.round(
        Number(watch('payment_methods.0.pivot.reference_value')) -
          (Number(watch('payment_methods.0.pivot.free_discount')) / 100) *
            Number(watch('payment_methods.0.pivot.reference_value'))
      );
    }
    return 0;
  };

  const getTotalValuePrepaid = () => {
    if (
      watch('payment_methods.1.pivot.reference_value') &&
      watch('payment_methods.1.pivot.advance_discount')
    ) {
      return Math.round(
        Number(watch('payment_methods.1.pivot.reference_value')) -
          (Number(watch('payment_methods.1.pivot.advance_discount')) / 100) *
            Number(watch('payment_methods.1.pivot.reference_value'))
      );
    }
    return 0;
  };

  const getTotalValueIsa = () => {
    if (
      watch('payment_methods.2.pivot.isa_value') &&
      watch('payment_methods.2.pivot.isa_percent')
    ) {
      return Math.round(
        Number(watch('payment_methods.2.pivot.isa_value')) -
          (Number(watch('payment_methods.2.pivot.isa_percent')) / 100) *
            Number(watch('payment_methods.2.pivot.isa_value'))
      );
    }
    return 0;
  };

  const RequiredField = () => {
    return <span className="text-red-500 text-[12px]">Campo Requerido</span>;
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="py-3 font-bold">Datos Principales</p>
        <hr className="py-3" />
        {/* Datos Principales */}
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
              {...register('currency_id', {
                required: true,
                onChange: (evt: DropdownChangeParams) => {
                  if (evt.value.id) setCashType(evt.value);
                }
              })}
            />
            {errors.currency_id && <RequiredField />}
          </div>
          <div className={'flex flex-col'}>
            <label>Matricula</label>
            <input
              type="number"
              {...register('tuition', { required: true, valueAsNumber: true })}
              className={
                errors.tuition
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {errors.tuition && <RequiredField />}
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
              {...register('career_id', {
                required: true,
                onChange: (evt: DropdownChangeParams) => {
                  if (evt.value.id) setSelectedCareers(evt.value);
                }
              })}
            />
            {errors.career_id && <RequiredField />}
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
              {...register(`payment_methods.0.pivot.reference_value`, {
                required: checkPaymentQuotes ?? true,
                valueAsNumber: true
              })}
              className={
                errors.name
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {(() => {
              if (
                errors.payment_methods &&
                errors.payment_methods[0]?.pivot?.reference_value &&
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
              {...register(`payment_methods.0.pivot.quotes`, {
                required: checkPaymentQuotes ?? true,
                valueAsNumber: true
              })}
              className={
                errors.payment_methods &&
                errors.payment_methods[0]?.pivot?.quotes
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {(() => {
              if (
                errors.payment_methods &&
                errors.payment_methods[0]?.pivot?.quotes &&
                checkPaymentQuotes
              )
                return <RequiredField />;
            })()}
          </div>

          <div className={'flex flex-col '}>
            <label>Valor por cuota</label>
            <input
              type="number"
              disabled={!checkPaymentQuotes}
              {...register(`payment_methods.0.pivot.quotes_value`, {
                required: checkPaymentQuotes ?? true,
                valueAsNumber: true
              })}
              className={
                errors.payment_methods &&
                errors.payment_methods[0]?.pivot?.quotes_value
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {(() => {
              if (
                errors.payment_methods &&
                errors.payment_methods[0]?.pivot?.quotes_value &&
                checkPaymentQuotes
              )
                return <RequiredField />;
            })()}
          </div>
          <div className={'flex flex-col'}>
            <label>Descuento cuotas (%)</label>
            <input
              type="number"
              disabled={!checkPaymentQuotes}
              {...register(`payment_methods.0.pivot.free_discount`, {
                required: checkPaymentQuotes ?? true,
                valueAsNumber: true
              })}
              className={
                errors.payment_methods &&
                errors.payment_methods[0]?.pivot?.free_discount
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {(() => {
              if (
                errors.payment_methods &&
                errors.payment_methods[0]?.pivot?.free_discount &&
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
                {...register(`payment_methods.1.pivot.reference_value`, {
                  required: checkPrepaid ?? true,
                  valueAsNumber: true
                })}
                className={
                  errors.payment_methods &&
                  errors.payment_methods[1]?.pivot?.reference_value
                    ? 'border-red-500 py-1 rounded-lg'
                    : 'py-1 rounded-lg '
                }
              />
              {(() => {
                if (
                  errors.payment_methods &&
                  errors.payment_methods[1]?.pivot?.reference_value &&
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
                {...register(`payment_methods.1.pivot.advance_discount`, {
                  required: checkPrepaid ?? true,
                  valueAsNumber: true
                })}
                className={
                  errors.payment_methods &&
                  errors.payment_methods[1]?.pivot?.advance_discount
                    ? 'border-red-500 py-1 rounded-lg'
                    : 'py-1 rounded-lg '
                }
              />
              {(() => {
                if (
                  errors.payment_methods &&
                  errors.payment_methods[1]?.pivot?.advance_discount &&
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
              value={defaultISAValue?.pivot?.isa_value}
              disabled={!checkISA}
              {...register(`payment_methods.2.pivot.isa_value`, {
                required: checkISA ?? true,
                valueAsNumber: true
              })}
              className={
                errors.payment_methods &&
                errors.payment_methods[2]?.pivot?.isa_value
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {(() => {
              if (
                errors.payment_methods &&
                errors.payment_methods[2]?.pivot?.isa_value &&
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
              {...register(`payment_methods.2.pivot.isa_percent`, {
                required: checkISA ?? true,
                valueAsNumber: true
              })}
              className={
                errors.payment_methods &&
                errors.payment_methods[2]?.pivot?.isa_percent
                  ? 'border-red-500 py-1 rounded-lg'
                  : 'py-1 rounded-lg '
              }
            />
            {(() => {
              if (
                errors.payment_methods &&
                errors.payment_methods[2]?.pivot?.isa_percent &&
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
              {...register('comments', { required: true })}
              className={
                errors.comments
                  ? 'border-red-500  w-full border-2 rounded-lg p-3'
                  : 'border-2 border-black w-full rounded-lg p-3'
              }
            />
            {errors.comments && <RequiredField />}
          </div>
        </div>
        {/* Metodos de pago */}
        <p className="py-3 font-bold"> Métodos de Pago</p>
        <div>
          <label className="mx-2">
            <input
              type="checkbox"
              value={'3'}
              {...register('suppliers', {
                required: true
              })}
              checked={checkTransbank}
            />
            Transbank
          </label>
          <label className="mx-2">
            <input
              type="checkbox"
              value={'2'}
              {...register('suppliers', {
                required: true
              })}
              checked={checkPaypal}
            />{' '}
            Paypal
          </label>
          <label className="mx-2">
            <input
              type="checkbox"
              value={'1'}
              checked={checkFlow}
              {...register('suppliers', { required: true })}
            />{' '}
            Flow
          </label>
          <label className="mx-2">
            <input
              type="checkbox"
              value={'4'}
              {...register('suppliers', {
                required: true,
                onChange: (evt) => setCheckOtherMethods(evt.target.checked)
              })}
              checked={checkOtherMethods}
            />{' '}
            Otro medio de pago
          </label>
          {errors.suppliers && (
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
    </div>
  );
};
