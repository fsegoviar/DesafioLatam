import { ReactElement, createContext, useContext, useReducer } from 'react';

type StateType = {
  isOpenDialog: boolean;
};

export const initialState: StateType = {
  isOpenDialog: false
};

const enum REDUCER_ACTION_TYPE {
  OPEN_DIALOG,
  CLOSE_DIALOG
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.OPEN_DIALOG:
      return { ...state, isOpenDialog: true };
    case REDUCER_ACTION_TYPE.CLOSE_DIALOG:
      return { ...state, isOpenDialog: false };
    default:
      throw new Error();
  }
};

const useTableContext = (initialValues: typeof initialState) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const openDialog = () => dispatch({ type: REDUCER_ACTION_TYPE.OPEN_DIALOG });
  const closeDialog = () =>
    dispatch({ type: REDUCER_ACTION_TYPE.CLOSE_DIALOG });

  return { state, openDialog, closeDialog };
};

type UseTableContextType = ReturnType<typeof useTableContext>;

//* Valores globales
const initContextState: UseTableContextType = {
  state: initialState,
  openDialog: () => {},
  closeDialog: () => {}
};

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const TableContext =
  createContext<UseTableContextType>(initContextState);

export const TableProvider = ({
  children,
  ...initialState
}: ChildrenType & StateType): ReactElement => {
  return (
    <TableContext.Provider value={useTableContext(initialState)}>
      {children}
    </TableContext.Provider>
  );
};

//* initialstate para abrir modal de edición
type UseDialogCreateLinkType = {
  isOpenDialog: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

export const useDialogCreateLinkHook = (): UseDialogCreateLinkType => {
  const {
    state: { isOpenDialog },
    openDialog,
    closeDialog
  } = useContext(TableContext);

  return { isOpenDialog, closeDialog, openDialog };
};
