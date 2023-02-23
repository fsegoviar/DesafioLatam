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

  const sendEmail = () => {};

  return (
    <div className="window-background" id="window-background" ref={modalRef}>
      <div
        className="window-container"
        id="window-container"
        ref={containerRef}
      >
        <p className="my-5 text-2xl">Correo Electrónico</p>
        <div className="my-3">
          <p className="font-thin">Enlace</p>
          <div>
            <input
              type="text"
              value={''}
              className="border-r-0 py-2 rounded-lg w-8/12 bg-gray-300"
              style={{ border: '1px solid gray' }}
              disabled
            />
          </div>
        </div>
        <div className="my-3">
          <div>
            <p className="font-thin">Enviar Correo</p>
            <div>
              <input
                type="text"
                placeholder="Correo electrónico"
                className="border-r-0 py-2 rounded-none rounded-l-lg w-8/12"
                style={{ border: '1px solid gray' }}
              />
              <button
                type="button"
                className="bg-green-500 py-[9px] px-5 rounded-tr-lg rounded-br-lg text-white"
                onClick={sendEmail}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
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
