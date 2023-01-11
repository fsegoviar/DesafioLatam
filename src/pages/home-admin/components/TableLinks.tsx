import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const mockData = [
  {
    id: '1',
    usuario: 'Julio Milán',
    estado: 'Validado',
    fecha: '12-12-2022',
    curso: 'Data Science',
    valor: '200',
    dsc: '50',
    total: '150'
  },
  {
    id: '2',
    usuario: 'Andres Restrepo',
    estado: 'Completado',
    fecha: '13-12-2022',
    curso: 'Diseño UI/UX',
    valor: '300',
    dsc: '100',
    total: '200'
  },
  {
    id: '3',
    usuario: 'Sofía León',
    estado: 'Pendiente',
    fecha: '14-12-2022',
    curso: 'Desarrollo Front End',
    valor: '500',
    dsc: '150',
    total: '350'
  },
  {
    id: '4',
    usuario: 'Juan Perez',
    estado: 'Cancelado',
    fecha: '14-12-2022',
    curso: 'Desarrollo Front End',
    valor: '300',
    dsc: '50',
    total: '250'
  }
];

export const TableLinks = () => {
  const filters = {
    usuario: {
      value: '',
      matchMode: FilterMatchMode.CONTAINS
    },
    fecha: {
      value: '',
      matchMode: FilterMatchMode.CONTAINS
    },
    curso: {
      value: '',
      matchMode: FilterMatchMode.CONTAINS
    }
  };

  const renderState = (rowData: any) => {
    switch (rowData.estado) {
      case 'Validado':
        return (
          <span
            style={{ backgroundColor: 'green', color: '#FFFFFF' }}
            className="px-2 py-1 rounded-full"
          >
            {rowData.estado}
          </span>
        );
      case 'Completado':
        return (
          <span
            style={{ backgroundColor: '#CB8C22', color: '#FFFFFF' }}
            className="px-2 py-1 rounded-full"
          >
            {rowData.estado}
          </span>
        );
      case 'Pendiente':
        return (
          <span
            style={{ backgroundColor: 'red', color: '#FFFFFF' }}
            className="px-2 py-1 rounded-full"
          >
            {rowData.estado}
          </span>
        );
      case 'Cancelado':
        return (
          <span
            style={{ backgroundColor: 'black', color: '#FFFFFF' }}
            className="px-2 py-1 rounded-full"
          >
            {rowData.estado}
          </span>
        );
      default:
        break;
    }
  };

  const actionEdit = (rowData: any) => {
    return (
      <div className="flex">
        <div style={{ margin: '0 2px' }}>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-text p-button-warning"
          />
        </div>
        <div style={{ margin: '0 2px' }}>
          <Button
            icon="pi pi-send"
            className="p-button-rounded p-button-text "
          />
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="table-header flex justify-between">
        <h5 className="mx-0 my-1">Enlaces</h5>
        <Button
          icon="pi pi-plus"
          label="Nuevo Enlace"
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
        field="fecha"
        filter
        filterPlaceholder={'Buscar por fecha'}
        header={'Fecha'}
        sortable
      ></Column>
      <Column
        field="usuario"
        filter
        filterPlaceholder={'Buscar por nombre'}
        header={'Usuario'}
        sortable
      ></Column>
      <Column
        field="curso"
        filter
        filterPlaceholder={'Buscar por curso'}
        header={'Curso'}
        sortable
      ></Column>
      <Column field="valor" header={'Valor $USD'} sortable></Column>
      <Column field="dsc" header={'Dcto. $USD'} sortable></Column>
      <Column field="total" header={'Total $USD'} sortable></Column>
      <Column body={renderState} header={'Estado'}></Column>
      <Column
        body={actionEdit}
        exportable={false}
        style={{ minWidth: '8rem' }}
      ></Column>
    </DataTable>
  );
};
