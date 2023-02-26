import React, { useLayoutEffect, useRef } from 'react';

type DialogCreateLinkTypes = {
  open: boolean;
  close: () => void;
};

export const DialogSendEmail = (props: DialogCreateLinkTypes) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    if (props.open) modalRef.current.style.display = 'flex';
  }, [props.open]);

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

  return (
    <div className="window-background" id="window-background" ref={modalRef}>
      <div
        className="window-container-notification"
        id="window-container"
        ref={containerRef}
      >
        <div className="w-full flex justify-center items-center">
          <p className="my-5 text-2xl">¡Correo enviado exitosamente!</p>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-gray-500 py-[9px] px-5 rounded-lg text-white"
            onClick={closeModal}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
