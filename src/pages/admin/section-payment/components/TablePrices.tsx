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
import { useEffect, useState } from 'react';
import { GetPricesTable } from '../../../../services/Prices';
import { NotificationComponent } from '../../../../components/NotificationComponent';
import { Toast } from 'primereact/toast';
import { PaymentType } from '../../../../interfaces';

export const TablePrices = () => {
  let { listPrices, loading } = GetPricesTable();
  const { openDialogEdit } = useDialogEditPriceHook();
  const { updateForm } = UseFormPayment();
  const [rowSelected, setRowSelected] = useState<any>(null!);
  const { toast, showSuccess, showSuccessEdit } = NotificationComponent();
  const [newValue, setNewValue] = useState();
  const [editValue, setEditValue] = useState<any>();
  const [arrPrices, setArrPrices] = useState<PaymentType[]>([]);

  useEffect(() => {
    if (listPrices) setArrPrices(listPrices);
  }, [listPrices]);

  useEffect(() => {
    if (newValue) {
      console.log('NewValue =>', newValue);
      let newArr = arrPrices;
      newArr.push(newValue);
      setArrPrices(newArr);
    }
  }, [arrPrices, newValue]);

  useEffect(() => {
    if (editValue) {
      console.log('Edit Value =>', editValue);
      console.log('ArrPrices =>', arrPrices);
      const findIndex = arrPrices.findIndex(
        (price) => price.id === editValue.id
      );
      if (findIndex) {
        let newArr = arrPrices;
        newArr[findIndex] = editValue;
        setArrPrices(newArr);
      }
    }
  }, [arrPrices, editValue]);

  const actionToast = (action: string) => {
    switch (action) {
      case 'success':
        showSuccess();
        break;
      case 'edit':
        showSuccessEdit();
        break;

      default:
        break;
    }
  };

  const filters = {
    name: {
      value: '',
      matchMode: FilterMatchMode.CONTAINS
    },
    'career.description': {
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
        <Toast ref={toast} />
        <DataTable
          value={arrPrices}
          responsiveLayout="stack"
          breakpoint="960px"
          dataKey="id"
          emptyMessage={'No se encontraron datos'}
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
            showFilterMenu={false}
            filterPlaceholder={'Buscar por tabla'}
            header={'Tabla de precios'}
            sortable
          ></Column>
          <Column
            field={'career.description'}
            filter
            showFilterMenu={false}
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
        <DialogTablePricing actionToast={actionToast} addData={setNewValue} />
        {rowSelected && (
          <DialogEditPricing
            actionToast={actionToast}
            addData={setEditValue}
            id={rowSelected.id}
          />
        )}
      </>
    </PaymentFormProvider>
  );
};
