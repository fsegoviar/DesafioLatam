import { ReactElement, createContext, useReducer } from 'react';

type FormPaymentType = {
  name: string;
  program: string;
  valueProgram: string;
  discountCuot: string;
  discountAnt: string;
  matricula: string;
  motive: string;
};

export class UpdateFormPayment implements Partial<FormPaymentType> {}

type FormPaymentValuesType = {};

type StateType = {
  showPanel: boolean;
};

export const initialValue: StateType = {
  showPanel: false
};

const enum REDUCE_ACTION_TYPE {
  NEXT_STEP,
  PREVIOUS_STEP,
  UPDATE_FORM
}

type ReducerAction = {
  type: REDUCE_ACTION_TYPE;
  payloand?: FormPaymentType | UpdateFormPayment;
};

//* Reducer Config

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCE_ACTION_TYPE.NEXT_STEP:
      return { ...state, showPanel: true };
    case REDUCE_ACTION_TYPE.PREVIOUS_STEP:
      return { ...state, showPanel: false };
    default:
      throw new Error();
  }
};

const usePaymentFormContext = (initialValue: StateType) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const nextStep = () => dispatch({ type: REDUCE_ACTION_TYPE.NEXT_STEP });
  const previousStep = () =>
    dispatch({ type: REDUCE_ACTION_TYPE.PREVIOUS_STEP });

  return { state, nextStep, previousStep };
};

//* UseContext and Providers Config

type UsePaymentFormContextType = ReturnType<typeof usePaymentFormContext>;

const initContextState: UsePaymentFormContextType = {
  state: initialValue,
  nextStep: () => {},
  previousStep: () => {}
};

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const PaymentFormContext =
  createContext<UsePaymentFormContextType>(initContextState);

export const PaymentFormProvider = ({
  children,
  ...initialValue
}: ChildrenType & StateType) => {
  return (
    <PaymentFormContext.Provider value={usePaymentFormContext(initialValue)}>
      {children}
    </PaymentFormContext.Provider>
  );
};
