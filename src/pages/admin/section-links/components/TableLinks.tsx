import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { DialogCreateLink } from './DialogCreateLink';
import { GetRegisters } from '../../../../services';
import { DialogSendEmail } from './DialogSendEmail';
import axios, { AxiosError } from 'axios';
import { CgFileDocument } from 'react-icons/cg';
import { DialogEditLink } from './DialogEditLink';
import { DialogForm } from './DialogForm';
import { NotificationComponent } from '../../../../components/NotificationComponent';
import { Toast } from 'primereact/toast';

export const TableLinks = () => {
  const [openCreateLink, setOpenCreateLink] = useState(false);
  const [openSendEmail, setOpenSendEmail] = useState(false);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const { registers, loading } = GetRegisters();
  const [idRegister, setIdRegister] = useState();
  const { toast, showSuccess, showSuccessEdit } = NotificationComponent();
  const [openEditLink, setOpenEditLink] = useState(false);
  const [userSelected, setUserSelected] = useState(null!);
  const [listRegisters, setListRegisters] = useState<any[]>([]);
  const [newValue, setNewValue] = useState<any>(null!);
  const [editValue, setEditValue] = useState();

  // * Initial state
  useEffect(() => {
    if (registers) {
      setListRegisters(registers);
      console.log('Register :>> ', registers);
    }
  }, [registers]);

  // * Add values
  useEffect(() => {
    console.log('newValue => ', newValue);
    if (newValue) {
      let newListRegisters = listRegisters;
      newListRegisters.push(newValue[0]);
      setListRegisters(newListRegisters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newValue]);

  // * update values
  useEffect(() => {
    console.log('editValue =>', editValue);
    if (editValue) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editValue]);

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

  const handleOpenFormUser = (dataUser: any) => {
    setOpenDialogForm(true);
    setUserSelected(dataUser);
  };

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
          onClick={() => handleOpenFormUser(rowData)}
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

  const renderDate = (row: any) => {
    return <div> {new Date(row.created_at).toLocaleDateString('en-GB')}</div>;
  };

  const renderTuition = (row: any) => {
    return <div> {formatPrice(row.price.tuition)}</div>;
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-ES', {}).format(value);
  };

  return (
    <>
      <Toast ref={toast} />
      <DataTable
        value={listRegisters}
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
          body={renderDate}
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
        <Column body={renderTuition} header={'Matricula'} sortable></Column>
        <Column field="user.email" header={'Correo'} sortable></Column>
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
          actionToast={actionToast}
          addData={setNewValue}
        />
      )}
      {openEditLink && (
        <DialogEditLink
          idRegister={idRegister}
          open={openEditLink}
          close={() => setOpenEditLink(false)}
          actionToast={actionToast}
          editData={setEditValue}
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
          userData={userSelected}
          close={() => setOpenDialogForm(false)}
        />
      )}
    </>
  );
};
