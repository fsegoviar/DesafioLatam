import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { DialogTablePricing } from './DialogTablePricing';
import { HeaderTable } from './HeaderTable';

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

const mockData: DataTableType[] = [
  {
    id: '1',
    nombre: 'Tabla Full Stack beca',
    curso: 'Full Stack JS',
    valor: '49000',
    dsctoCuot: '0',
    dsctoAnt: '50',
    matricula: '0',
    motivo: 'Sin descuento'
  }
];

export const TablePrices = () => {
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
        value={mockData}
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
          field="nombre"
          filter
          filterPlaceholder={'Buscar por tabla'}
          header={'Tabla de precios'}
          sortable
        ></Column>
        <Column
          field="curso"
          filter
          filterPlaceholder={'Buscar por programa'}
          header={'Programa'}
          sortable
        ></Column>
        <Column field="valor" header={'Valor de referencia'} sortable></Column>
        <Column field="dsctoCuot" header={'Dcto. Cuotas'} sortable></Column>
        <Column field="dsctoAnt" header={'Dscto. Anticipado'} sortable></Column>
        <Column field="matricula" header={'Matricula'} sortable></Column>
        <Column field="motivo" header={'Motivo descuento'} sortable></Column>
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
