import axios, { AxiosError } from 'axios';
import { useLayoutEffect, useRef, useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

type DialogCreateLinkTypes = {
  open: boolean;
  close: () => void;
  idRegister: any;
  actionToast: (action: string) => void;
  idItemDisabled: (value: any) => void;
};

export const DialogDeleteLink = ({
  open,
  close,
  idRegister,
  actionToast,
  idItemDisabled
}: DialogCreateLinkTypes) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    if (open) modalRef.current.style.display = 'flex';
  }, [open]);

  const closeModal = (): void => {
    setLoading(false);
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      close();
    }, 1000);
  };

  const disabledLink = async (): Promise<void> => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_BACKEND}/register_form/change_status`,
        {
          register_id: idRegister,
          status: 'Cancelado'
        },
        {
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
            // Authorization: `Bearer ${localStorage.getItem('token_user_latam')}`
          }
        }
      )
      .then((response: any) => {
        idItemDisabled(response.data.id);
        actionToast('delete');
        closeModal();
      })
      .catch((error: AxiosError) => console.log('Error:', error));
  };

  window.addEventListener(
    'click',
    (e: any) => e.target === modalRef.current && closeModal()
  );
  return (
    <div className="window-background" id="window-background" ref={modalRef}>
      <div
        className="window-container-notification"
        id="window-container"
        ref={containerRef}
      >
        {loading ? (
          <div className="absolute top-0 left-0 w-full h-full bg-white z-10 grid place-items-center rounded-xl">
            <div className="flex flex-col items-center">
              <ProgressSpinner />
              <h1>Cargando..</h1>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full flex justify-center items-center">
              <p className="my-5 text-xl text-center">
                ¿Está seguro que desea <strong>deshabilitar</strong> este
                enlace?
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-500 py-[9px] px-5 rounded-lg text-white"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="bg-red-500 py-[9px] px-5 rounded-lg text-white mx-2"
                onClick={disabledLink}
              >
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
