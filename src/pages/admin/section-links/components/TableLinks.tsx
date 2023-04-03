import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { DialogCreateLink } from './DialogCreateLink';
import { GetRegisters } from '../../../../services';
import { DialogSendEmail } from './DialogSendEmail';
import axios, { AxiosError } from 'axios';
import { CgFileDocument } from 'react-icons/cg';
import { DialogEditLink } from './DialogEditLink';
import { DialogForm } from './DialogForm';

export const TableLinks = () => {
  const [openCreateLink, setOpenCreateLink] = useState(false);
  const [openSendEmail, setOpenSendEmail] = useState(false);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const { registers, loading } = GetRegisters();
  const [idRegister, setIdRegister] = useState();
  const [openEditLink, setOpenEditLink] = useState(false);

  const filters = {
    'user.name': {
      value: '',
      matchMode: FilterMatchMode.CONTAINS
    },
    created_at: {
      value: '',
      matchMode: FilterMatchMode.CONTAINS
    },
    'career.description': {
      value: '',
      matchMode: FilterMatchMode.CONTAINS
    }
  };

  const sendEmail = async (id: string) => {
    await axios
      .get(
        `${process.env.REACT_APP_API_BACKEND}/registers/${id}/notification`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      .then((response: any) => {
        console.log('Notificacion Enviada =>', response.data);
        setOpenSendEmail(true);
      })
      .catch((error: AxiosError) => console.log('Error => ', error));
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
            data-te-toggle="tooltip"
            title="Editar"
            className="p-button-rounded p-button-text p-button-warning"
            onClick={() => {
              setIdRegister(rowData.id);
              setOpenEditLink(true);
            }}
          />
        </div>
        <div style={{ margin: '0 2px' }}>
          <Button
            icon="pi pi-send"
            className="p-button-rounded p-button-text"
            data-te-toggle="tooltip"
            title="Enviar correo"
            onClick={() => sendEmail(rowData.id)}
          />
        </div>
      </div>
    );
  };

  const renderForm = (rowData: any) => {
    return (
      <div className="flex justify-center">
        <CgFileDocument
          onClick={() => setOpenDialogForm(true)}
          size={24}
          className="cursor-pointer"
          data-te-toggle="tooltip"
          title="Ver formulario"
        />
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
        emptyMessage={'No se encontraron datos'}
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
          showFilterMenu={false}
          filterPlaceholder={'Buscar por fecha'}
          header={'Fecha'}
          sortable
        ></Column>
        <Column
          field="user.name"
          filter
          showFilterMenu={false}
          filterPlaceholder={'Buscar por nombre'}
          header={'Usuario'}
          sortable
        ></Column>
        <Column
          field="career.description"
          filter
          showFilterMenu={false}
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
        <Column body={renderForm} header={'Formulario'}></Column>
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
      {openEditLink && (
        <DialogEditLink
          idRegister={idRegister}
          open={openEditLink}
          close={() => setOpenEditLink(false)}
        />
      )}
      {openSendEmail && (
        <DialogSendEmail
          open={openSendEmail}
          close={() => setOpenSendEmail(false)}
        />
      )}
      {openDialogForm && (
        <DialogForm
          open={openDialogForm}
          close={() => setOpenDialogForm(false)}
        />
      )}
    </>
  );
};
