import axios, { AxiosError } from 'axios';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useRef, useState } from 'react';
import { GetCareers } from '../../../../services';
import { Career, CareerPrice, RegisterLinkType } from '../../../../interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';

type DialogEditLinkTypes = {
  idRegister: any;
  open: boolean;
  close: () => void;
  actionToast: (action: string) => void;
  editData: (data: any) => void;
};

export const DialogEditLink = (props: DialogEditLinkTypes) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const [inputEmail, setInputEmail] = useState('');
  const [selectedCareers, setSelectedCareers] = useState<Career>(null!);
  const [selectForm, setSelectForm] = useState<any>(null!);
  const [nameUser, setNameUser] = useState<string | number>(null!);
  const { handleSubmit } = useForm<RegisterLinkType>();
  const [loading, setLoading] = useState(false);
  const { careers } = GetCareers();
  const forms = [
    { name: 'Formulario de carrera', id: 1 },
    { name: 'Formulario de cursos', id: 2 },
    { name: 'Formulario de reintegro', id: 3 },
    { name: 'Formulario de talleres', id: 4 }
  ];

  useEffect(() => {
    console.log('Edit => ', props.idRegister);

    if (props.open) modalRef.current.style.display = 'flex';

    const fetch = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BACKEND}/hubspot/clients`,
          {
            headers: {
              Accept: 'application/json'
            }
          }
        );

        console.log('Response Get Clients =>', response.data);
      } catch (error) {
        console.log('Error Clients =>', error);
      }
    };

    const fetchRegister = async () => {
      setLoading(true);
      await axios
        .get(
          `${process.env.REACT_APP_API_BACKEND}/registers/${props.idRegister}`,
          {
            headers: {
              Accept: 'application/json'
            }
          }
        )
        .then(async (response: any) => {
          console.log('RegisterSelected => ', response.data);

          const findForm = forms.find(
            (form) => form.id === response.data[0].form_type_id
          );

          console.log('Find Form =>', findForm);

          setSelectForm(findForm);
          setInputEmail(response.data[0].user.email);
          setNameUser(
            `${response.data[0].user.name} ${response.data[0].user.lastname}`
          );
          // TODO: Falta obtener las carreras según el id que se entrega o bien añadirla al objeto response
          // await axios
          //   .get(
          //     `${process.env.REACT_APP_API_BACKEND}/careers/${response.data[0].career_id}/generations`
          //   )
          //   .then((response: any) =>
          //     console.log('response careers:>> ', response.data)
          //   );
        })
        .catch((error: AxiosError) => console.log('Error =>', error))
        .finally(() => setLoading(false));
    };

    fetch();
    fetchRegister();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  // const initData = () => {
  //   setValue('email', props.data.user.email);
  //   setInputEmail(props.data.user.email);
  //   setNameUser(`${props.data.user.name} ${props.data.user.lastname}`);
  // };

  const closeModal = (): void => {
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      props.close();
    }, 1000);
  };

  window.addEventListener(
    'click',
    (e: any) => e.target === modalRef.current && closeModal()
  );

  const handleChangeCareer = async (value: Career) => {
    console.log('Value change career =>', value);
    setSelectedCareers(value);
    // setValue('career_id', value.id);

    const response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/careers/${value.id}/generations`,
      {
        headers: {
          Accept: 'applicatino/json'
        }
      }
    );

    console.log('Response Generations => ', response.data);
  };

  const searchUserByEmail = async () => {
    // const email = inputEmail;
    // setValue('email', email);

    const response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/hubspot/client/${inputEmail}/email`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    console.log('Response Search by Email =>!', response.data);

    setNameUser(
      `${response.data.results[0].properties.firstname} ${response.data.results[0].properties.lastname}`
    );

    // setValue('name', response.data.results[0].properties.firstname);
    // setValue('lastname', response.data.results[0].properties.lastname);
    // setValue('lastname2', '');

    console.log('Response Hubspot by Email =>', response);
  };

  const handleChangeFormType = (value: { id: number; name: string }) => {
    setSelectForm(value);
    // setValue('form_type_id', value.id);
  };

  const handleChangeRadio = (row: CareerPrice) => {
    console.log('Radio Selected => ', row);
    // setValue('price_id', row.id);
  };

  const onSubmit: SubmitHandler<RegisterLinkType> = async (data) => {
    console.log('OnSubmit Form Link => ', data);
    await axios
      .post(`${process.env.REACT_APP_API_BACKEND}/registers`, data, {
        headers: {
          Accept: 'application/json'
        }
      })
      .then((response: any) => {
        props.editData(response.data);
        props.actionToast('edit');
      })
      .catch((error: AxiosError) => console.log('Error onSubmit =>', error))
      .finally(() => closeModal());
  };

  return (
    <div className="window-background" id="window-background" ref={modalRef}>
      <div
        className="window-container"
        id="window-container"
        ref={containerRef}
      >
        <p className="text-2xl">Editar Enlace</p>
        {loading ? (
          <p>Cargando....</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div>
                <p className="font-thin">Usuario</p>
                <div>
                  <input
                    type="text"
                    value={inputEmail}
                    placeholder="Correo electrónico"
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="border-r-0 py-2 rounded-none rounded-l-lg w-8/12"
                    style={{ border: '1px solid gray' }}
                  />
                  <button
                    type="button"
                    className="bg-green-500 py-[9px] px-5 rounded-tr-lg rounded-br-lg text-white"
                    onClick={searchUserByEmail}
                  >
                    Buscar
                  </button>
                </div>
              </div>
              <div>
                <p className="font-thin">Cursos</p>
                <div>
                  <Dropdown
                    value={selectedCareers}
                    options={careers}
                    onChange={(e) => handleChangeCareer(e.value)}
                    optionLabel="description"
                    filter
                    placeholder="Seleccionar Curso"
                    className="w-full md:w-14rem"
                  />
                </div>
              </div>
              <div className="mt-5">
                <p className="font-thin">Nombre de usuario</p>
                <div>
                  <input
                    type="text"
                    value={nameUser}
                    className="border-r-0 py-2 rounded-lg w-10/12 bg-gray-300"
                    style={{ border: '1px solid gray' }}
                    disabled
                  />
                </div>
              </div>
              <div className="mt-5">
                <p className="font-thin">Tipo de Formulario</p>
                <div>
                  <Dropdown
                    value={selectForm}
                    options={forms}
                    onChange={(e) => handleChangeFormType(e.value)}
                    optionLabel="name"
                    placeholder="Seleccionar Formulario"
                    className="w-full md:w-14rem"
                  />
                </div>
              </div>
            </div>
            {selectedCareers && (
              <div className="mt-5 col-span-12">
                <p className="font-thin">Tabla de precios</p>
                <div>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th></th>
                        <th scope="col" className="px-6 py-3">
                          Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Matricula
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Descuento
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Valor total
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Comentarios
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCareers.prices.map((price, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <input
                                type="radio"
                                name="select-row"
                                onChange={() => handleChangeRadio(price)}
                              />
                            </td>
                            <td>{price.name}</td>
                            <td>{price.tuition}</td>
                            <td>{price.free_discount}</td>
                            <td>{price.value}</td>
                            <td>{price.comments}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="mt-5  w-full flex justify-end">
              <button
                className="m-1 px-5 rounded-lg text-white bg-gray-500"
                style={{ border: '3px solid gray' }}
                onClick={() => closeModal()}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="m-1 px-5 rounded-lg text-white bg-green-500"
                style={{ border: '3px solid rgb(34 197 94)' }}
              >
                Editar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
