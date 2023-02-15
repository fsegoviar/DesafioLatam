import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { DialogTablePricing } from './DialogTablePricing';
import { HeaderTable } from './HeaderTable';
import { PaymentType } from '../../../../interfaces';
import { useDialogEditPriceHook } from '../context/TableContext';
import { DialogEditPricing } from './DialogEditPricing';
import {
  PaymentFormProvider,
  initialValue
} from '../context/PaymentFormContext';
import { UseFormPayment } from '../hooks/useFormPayment';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const TablePrices = () => {
  // const { listPrices, loading } = GetPricesTable();
  const { openDialogEdit } = useDialogEditPriceHook();
  const { updateForm } = UseFormPayment();
  const [rowSelected, setRowSelected] = useState<PaymentType>(null!);
  const [listPrices, setListPrices] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BACKEND}/prices`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );
      console.log('Response ListPrices =>', response);
      setListPrices(response.data);
    } catch (error) {
      console.log('Error =>', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const actionEdit = (rowData: PaymentType) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text p-button-warning"
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
          <Column
            field="value"
            header={'Valor de referencia'}
            sortable
          ></Column>
          <Column
            field="advance_discount"
            header={'Dcto. Cuotas'}
            sortable
          ></Column>
          <Column
            field="free_discount"
            header={'Dscto. Anticipado'}
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
        {rowSelected && <DialogEditPricing {...rowSelected} />}
      </>
    </PaymentFormProvider>
  );
};
