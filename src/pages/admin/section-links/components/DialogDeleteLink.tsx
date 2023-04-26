import React, { useLayoutEffect, useRef } from 'react';

type DialogCreateLinkTypes = {
  open: boolean;
  close: () => void;
  idRegister: any;
  actionToast: (action: string) => void;
};

export const DialogDeleteLink = ({ open, close }: DialogCreateLinkTypes) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    if (open) modalRef.current.style.display = 'flex';
  }, [open]);

  const closeModal = (): void => {
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      close();
    }, 1000);
  };

  const disabledLink = async (): Promise<void> => {};

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
        <div className="w-full flex justify-center items-center">
          <p className="my-5 text-xl text-center">
            ¿Está seguro que desea <strong>deshabilitar</strong> este enlace?
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
      </div>
    </div>
  );
};
