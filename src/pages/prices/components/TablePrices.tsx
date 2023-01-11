import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const mockData = [
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

  const actionEdit = (rowData: any) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text p-button-warning"
      />
    );
  };

  const renderHeader = () => {
    return (
      <div className="table-header flex justify-between">
        <h5 className="mx-0 my-1">Tabla de precios</h5>
        <Button
          icon="pi pi-plus"
          label="Nueva Tabla"
          className="p-button-success p-button-sm"
        />
      </div>
    );
  };

  return (
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
      header={renderHeader}
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
        filterPlaceholder={'Buscar por curso'}
        header={'Curso'}
        sortable
      ></Column>
      <Column field="valor" header={'Valor Curso'} sortable></Column>
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
  );
};
