import { Button } from 'primereact/button';
import { useDialogCreateLinkHook } from '../context/TableContext';

export const HeaderTable = () => {
  const { openDialog } = useDialogCreateLinkHook();

  return (
    <div className="table-header flex justify-between">
      <h5 className="mx-0 my-1">Tabla de precios</h5>
      <Button
        icon="pi pi-plus"
        label="Nueva Tabla"
        className="p-button-success p-button-sm"
        onClick={openDialog}
      />
    </div>
  );
};
