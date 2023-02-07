import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { DialogTablePricing } from './DialogTablePricing';
import { HeaderTable } from './HeaderTable';
import { GetPricesTable } from '../../../../services/Prices';

type DataTableType = {
  id: string;
  nombre: string;
  curso: string;
  valor: string;
  dsctoCuot: string;
  dsctoAnt: string;
  matricula: string;
  motivo: string;
};

export const TablePrices = () => {
  const { listPrices } = GetPricesTable();

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

  const actionEdit = (rowData: DataTableType) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text p-button-warning"
      />
    );
  };

  return (
    <>
      <DataTable
        value={listPrices}
        responsiveLayout="stack"
        breakpoint="960px"
        dataKey="id"
        rows={15}
        filters={filters}
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
        <Column field="value" header={'Valor de referencia'} sortable></Column>
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
        <Column field="comments" header={'Motivo descuento'} sortable></Column>
        <Column
          body={actionEdit}
          exportable={false}
          style={{ minWidth: '8rem' }}
        ></Column>
      </DataTable>
      <DialogTablePricing />
    </>
  );
};
