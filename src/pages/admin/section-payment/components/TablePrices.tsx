import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { DialogTablePricing } from './DialogTablePricing';
import { HeaderTable } from './HeaderTable';
import { useDialogEditPriceHook } from '../context/TableContext';
import { DialogEditPricing } from './DialogEditPricing';
import {
  PaymentFormProvider,
  initialValue
} from '../context/PaymentFormContext';
import { UseFormPayment } from '../hooks/useFormPayment';
import { useState } from 'react';
import { GetPricesTable } from '../../../../services/Prices';

export const TablePrices = () => {
  let { listPrices, loading } = GetPricesTable();
  const { openDialogEdit } = useDialogEditPriceHook();
  const { updateForm } = UseFormPayment();
  const [rowSelected, setRowSelected] = useState<any>(null!);

  const filters = {
    nombre: {
      value: '',
      matchMode: FilterMatchMode.CONTAINS
    },
    curso: {
      value: '',
      matchMode: FilterMatchMode.CONTAINS
    }
  };

  const actionEdit = (rowData: any) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text p-button-warning "
        data-te-toggle="tooltip"
        title="Editar"
        onClick={() => {
          setRowSelected(rowData);
          updateForm(rowData);
          openDialogEdit();
        }}
      />
    );
  };

  return (
    <PaymentFormProvider {...initialValue}>
      <>
        <DataTable
          value={listPrices}
          responsiveLayout="stack"
          breakpoint="960px"
          dataKey="id"
          rows={15}
          filters={filters}
          loading={loading}
          filterDisplay="row"
          paginator
          className="shadow-lg shadow-gray-500/30"
          header={<HeaderTable />}
        >
          <Column field="id" header={'Id'} sortable></Column>
          <Column
            field="name"
            filter
            filterPlaceholder={'Buscar por tabla'}
            header={'Tabla de precios'}
            sortable
          ></Column>
          <Column
            field={'career.description'}
            filter
            filterPlaceholder={'Buscar por programa'}
            header={'Programa'}
            sortable
          ></Column>

          <Column field="tuition" header={'Matricula'} sortable></Column>
          <Column
            field="comments"
            header={'Motivo descuento'}
            sortable
          ></Column>
          <Column
            body={actionEdit}
            exportable={false}
            style={{ minWidth: '8rem' }}
          ></Column>
        </DataTable>
        <DialogTablePricing />
        {rowSelected && <DialogEditPricing id={rowSelected.id} />}
      </>
    </PaymentFormProvider>
  );
};
