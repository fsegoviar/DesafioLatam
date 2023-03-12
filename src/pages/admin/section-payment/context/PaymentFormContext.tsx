import { ReactElement, createContext, useReducer } from 'react';
import { FormPaymentType, UpdateFormPayment } from '../../../../interfaces';

// type FormPaymentValuesType = {};

// type StateType = {
//   showPanel: boolean;
// };

export const initialValue: FormPaymentType = {
  career_id: null,
  currency_id: null,
  name: '',
  tuition: null,
  comments: '',
  payment_methods: [],
  suppliers: []
};

const enum REDUCE_ACTION_TYPE {
  UPDATE_FORM
}

type ReducerAction = {
  type: REDUCE_ACTION_TYPE;
  payloand?: FormPaymentType | UpdateFormPayment;
};

//* Reducer Config

const reducer = (
  state: FormPaymentType,
  action: ReducerAction
): FormPaymentType => {
  switch (action.type) {
    case REDUCE_ACTION_TYPE.UPDATE_FORM:
      state = Object.assign(state, action.payloand);
      return { ...state };
    default:
      throw new Error();
  }
};

const usePaymentFormContext = (initialValue: FormPaymentType) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const updateForm = (data: UpdateFormPayment) =>
    dispatch({ type: REDUCE_ACTION_TYPE.UPDATE_FORM, payloand: data });

  return { state, updateForm };
};

//* UseContext and Providers Config

type UsePaymentFormContextType = ReturnType<typeof usePaymentFormContext>;

const initContextState: UsePaymentFormContextType = {
  state: initialValue,
  updateForm: () => {}
};

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const PaymentFormContext =
  createContext<UsePaymentFormContextType>(initContextState);

export const PaymentFormProvider = ({
  children,
  ...initialValue
}: ChildrenType & FormPaymentType) => {
  return (
    <PaymentFormContext.Provider value={usePaymentFormContext(initialValue)}>
      {children}
    </PaymentFormContext.Provider>
  );
};
