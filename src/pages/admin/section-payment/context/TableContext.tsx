import { ReactElement, createContext, useContext, useReducer } from 'react';

type StateType = {
  isOpenDialog: boolean;
  isOpenDialogEdit: boolean;
};

export const initialState: StateType = {
  isOpenDialog: false,
  isOpenDialogEdit: false
};

const enum REDUCER_ACTION_TYPE {
  OPEN_DIALOG,
  CLOSE_DIALOG,
  OPEN_DIALOG_EDIT,
  CLOSE_DIALOG_EDIT
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
    case REDUCER_ACTION_TYPE.OPEN_DIALOG_EDIT:
      return { ...state, isOpenDialogEdit: true };
    case REDUCER_ACTION_TYPE.CLOSE_DIALOG_EDIT:
      return { ...state, isOpenDialogEdit: false };
    default:
      throw new Error();
  }
};

const useTableContext = (initialValues: typeof initialState) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const openDialog = () => dispatch({ type: REDUCER_ACTION_TYPE.OPEN_DIALOG });
  const closeDialog = () =>
    dispatch({ type: REDUCER_ACTION_TYPE.CLOSE_DIALOG });
  const openDialogEdit = () =>
    dispatch({ type: REDUCER_ACTION_TYPE.OPEN_DIALOG_EDIT });
  const closeDialogEdit = () =>
    dispatch({ type: REDUCER_ACTION_TYPE.CLOSE_DIALOG_EDIT });

  return { state, openDialog, closeDialog, openDialogEdit, closeDialogEdit };
};

type UseTableContextType = ReturnType<typeof useTableContext>;

//* Valores globales
const initContextState: UseTableContextType = {
  state: initialState,
  openDialog: () => {},
  closeDialog: () => {},
  openDialogEdit: () => {},
  closeDialogEdit: () => {}
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

type UseDialogEditPriceType = {
  isOpenDialogEdit: boolean;
  openDialogEdit: () => void;
  closeDialogEdit: () => void;
};

export const useDialogEditPriceHook = (): UseDialogEditPriceType => {
  const {
    state: { isOpenDialogEdit },
    openDialogEdit,
    closeDialogEdit
  } = useContext(TableContext);

  return { isOpenDialogEdit, openDialogEdit, closeDialogEdit };
};
