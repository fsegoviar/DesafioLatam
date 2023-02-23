import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { DialogCreateLink } from './DialogCreateLink';
import { GetRegisters } from '../../../../services';
import { DialogSendEmail } from './DialogSendEmail';

export const TableLinks = () => {
  const [openCreateLink, setOpenCreateLink] = useState(false);
  const [openSendEmail, setOpenSendEmail] = useState(false);
  const { registers, loading } = GetRegisters();

  console.log('Registers =>', registers);

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
    switch (rowData.status) {
      case 'Validado':
        return (
          <span
            style={{ backgroundColor: 'green', color: '#FFFFFF' }}
            className="px-2 py-1 rounded-full"
          >
            {rowData.status}
          </span>
        );
      case 'Completado':
        return (
          <span
            style={{ backgroundColor: '#CB8C22', color: '#FFFFFF' }}
            className="px-2 py-1 rounded-full"
          >
            {rowData.status}
          </span>
        );
      case 'Pendiente':
        return (
          <span
            style={{ backgroundColor: 'red', color: '#FFFFFF' }}
            className="px-2 py-1 rounded-full"
          >
            {rowData.status}
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
            onClick={() => setOpenSendEmail(true)}
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
          onClick={() => setOpenCreateLink(true)}
        />
      </div>
    );
  };

  return (
    <>
      <DataTable
        value={registers}
        loading={loading}
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
          field="created_at"
          filter
          filterPlaceholder={'Buscar por fecha'}
          header={'Fecha'}
          sortable
        ></Column>
        <Column
          field="user.name"
          filter
          filterPlaceholder={'Buscar por nombre'}
          header={'Usuario'}
          sortable
        ></Column>
        <Column
          field="career.description"
          filter
          filterPlaceholder={'Buscar por programa'}
          header={'Programa'}
          sortable
        ></Column>
        <Column field="price.value" header={'Valor'} sortable></Column>
        <Column
          field="price.free_discount"
          header={'Descuento'}
          sortable
        ></Column>
        <Column field={`price.value`} header={'Total'} sortable></Column>
        <Column body={renderState} header={'Estado'}></Column>
        <Column
          body={actionEdit}
          exportable={false}
          style={{ minWidth: '8rem' }}
        ></Column>
      </DataTable>
      {openCreateLink && (
        <DialogCreateLink
          open={openCreateLink}
          close={() => setOpenCreateLink(false)}
        />
      )}
      {openSendEmail && (
        <DialogSendEmail
          open={openSendEmail}
          close={() => setOpenSendEmail(false)}
        />
      )}
    </>
  );
};
