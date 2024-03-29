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
import { DialogDeleteLink } from './DialogDeleteLink';
import { isBefore } from 'date-fns';

export const TableLinks = () => {
  const [openCreateLink, setOpenCreateLink] = useState(false);
  const [openSendEmail, setOpenSendEmail] = useState(false);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const { registers, loading } = GetRegisters();
  const [idRegister, setIdRegister] = useState();
  const [careerId, setCareerId] = useState();
  const { toast, showSuccess, showSuccessEdit, showSuccessDelete } =
    NotificationComponent();
  const [openEditLink, setOpenEditLink] = useState(false);
  const [openDeleteLink, setOpenDeleteLink] = useState(false);
  const [userSelected, setUserSelected] = useState(null!);
  const [listRegisters, setListRegisters] = useState<any[]>([]);
  const [newValue, setNewValue] = useState<any>(null!);
  const [editValue, setEditValue] = useState();
  const [idItemDisabled, setIdItemDisabled] = useState<any>(null!);
  const [labelTooltip, setLabelTooltip] = useState('Copiar');

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

  //* Delete value
  useEffect(() => {
    if (idItemDisabled) {
      let newListRegister = listRegisters;
      let findIndex = listRegisters.findIndex(
        (item) => item.id === idItemDisabled
      );
      if (findIndex) {
        newListRegister[findIndex].status = 'Cancelado';
        setListRegisters(newListRegister);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idItemDisabled]);

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
    'user.email': {
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
    },
    status: {
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
            Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token_hhrr_latam')}`
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
      case 'delete':
        showSuccessDelete();
        break;

      default:
        break;
    }
  };

  const renderState = (rowData: any) => {
    switch (rowData.status) {
      case 'Completado':
        return (
          <span
            style={{ backgroundColor: 'green', color: '#FFFFFF' }}
            className="px-2 py-1 rounded-full"
          >
            {rowData.status}
          </span>
        );
      case 'Registrado':
        return (
          <span
            style={{ backgroundColor: '#CB8C22', color: '#FFFFFF' }}
            className="px-2 py-1 rounded-full"
          >
            {rowData.status}
          </span>
        );
      case 'Contrato Firmado':
        return (
          <span
            style={{ backgroundColor: '#CB8C22', color: '#FFFFFF' }}
            className="px-2 py-1 rounded-full"
          >
            {rowData.status}
          </span>
        );
      case 'Enviado':
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
            {rowData.status}
          </span>
        );
      default:
        break;
    }
  };

  const actionEdit = (rowData: any) => {
    return (
      <div className="flex">
        {rowData.status !== 'Cancelado' && (
          <>
            <div style={{ margin: '0 2px' }}>
              <Button
                icon="pi pi-pencil"
                data-te-toggle="tooltip"
                title="Editar"
                className="p-button-rounded p-button-text p-button-warning"
                onClick={() => {
									setCareerId(rowData.career_id)
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
            <div style={{ margin: '0 2px' }}>
              <Button
                icon="pi pi-trash"
                data-te-toggle="tooltip"
                title="Deshabilitar"
                className="p-button-rounded p-button-text p-button-danger"
                onClick={() => {
                  setIdRegister(rowData.id);
                  setOpenDeleteLink(true);
                }}
              />
            </div>
            <div style={{ margin: '0 2px' }}>
              <Button
                icon="pi pi-copy"
                data-te-toggle="tooltip"
                title="Clipboard"
                className="p-button-rounded p-button-text"
                tooltip={labelTooltip}
                tooltipOptions={{
                  position: 'bottom',
                  mouseTrack: false,
                  mouseTrackTop: 15
                }}
                onClick={() => {
                  handleClipboard(rowData.id);
                }}
              />
            </div>
          </>
        )}
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

  const renderToken = (row: any) => {
    let dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() + 3);
		if(row.status === 'Cancelado'){
			return (
        <span
          style={{ backgroundColor: 'red', color: '#FFFFFF' }}
          className="px-2 py-1 rounded-full"
        >
          Expirado
        </span>
      );
		}
    if (isBefore(new Date(row.created_at), dateLimit)) {
      return (
        <span
          style={{ backgroundColor: 'green', color: '#FFFFFF' }}
          className="px-2 py-1 rounded-full"
        >
          Activo
        </span>
      );
    } else {
      return (
        <span
          style={{ backgroundColor: 'red', color: '#FFFFFF' }}
          className="px-2 py-1 rounded-full"
        >
          Vencido
        </span>
      );
    }
  };

  const handleClipboard = async (registerId: number) => {
    let aux = document.createElement('input');

    await axios
      .get(
        `${process.env.REACT_APP_API_BACKEND}/registers/${registerId}/copy_link`,
        {
          headers: {
            Accept: 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token_hhrr_latam')}`
          }
        }
      )
      .then((response: any) => {
        console.log('CopyLink =>', response.data);
        aux.setAttribute('value', response.data);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand('copy');
        document.body.removeChild(aux);
        setLabelTooltip('Copiado!');
        setTimeout(() => {
          setLabelTooltip('Copiar');
        }, 1000);
      })
      .catch((error: AxiosError) => console.log('Error => ', error));
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
        <Column
          filter
          showFilterMenu={false}
          filterPlaceholder="Buscar por correo"
          field="user.email"
          header={'Correo'}
          sortable
        ></Column>
        <Column body={renderForm} header={'Formulario'}></Column>
        <Column body={renderToken} header={'Token'}></Column>
        <Column
          body={renderState}
          field="status"
          sortable
          filter
          filterPlaceholder="Buscar por estado"
          showFilterMenu={false}
          header={'Estado'}
        ></Column>
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
          careerId={careerId}
          open={openEditLink}
          close={() => setOpenEditLink(false)}
          actionToast={actionToast}
          editData={setEditValue}
        />
      )}
      {openDeleteLink && (
        <DialogDeleteLink
          idRegister={idRegister}
          open={openDeleteLink}
          close={() => setOpenDeleteLink(false)}
          actionToast={actionToast}
          idItemDisabled={setIdItemDisabled}
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
